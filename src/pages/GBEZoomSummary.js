import React from "react";
import PropTypes from "prop-types"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
// import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import dataAccess from "../dataAccess.js";
import Donut from "../components/Donut.js";

/*
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const classes = useStyles();
*/

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc') // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)



/*
// Return duration as "134 m"
function durationFormat(duration) {
  //var hours = Math.floor(duration / 3600).toString();
  //var minutes = Math.floor((duration % 3600) / 60).toString();
  //return hours+"h " + minutes + "m";
  return Math.floor((duration / 60).toString() + "m");
}
*/

// Return the bucket positions for the meeting at startTimeUTC
function GBEZoomNumber(startTimeUTC, firstReportDateUTC) {
  var result = {day: -1, zoom: -1};
  const t = dayjs(startTimeUTC).tz("America/Los_Angeles");     //Local 
  const startTime = (t.hour() * 60) + (t.minute());    // in minutes from midnight

  // ["08:30", "09:30", "13:30", "14:30"];   
  const zt = [510, 570, 810, 870];  
  var diff;
  // Figure the zoom index
  for (var i = 0; i < zt.length; i++) {
      diff = startTime - zt[i];
      if ( (diff >= -5) && (diff <= 15) ) { // Meeting started 5 min early to 15 min late from scheduled time
          result.zoom = i;
      }
      if (t.format("d") === "5" ) {  //special case of Friday
          if ((startTime >= 505 && (startTime <= 625 ))) { // 8:25 to 10:25
            result.zoom = 4;      // it's the Friday 8:30
            console.log("Friday zoom!");
          }
      }
  };
  result.day = dayjs(startTimeUTC).diff(firstReportDateUTC,"day");
  return result;
}

// transform the meeting data
function createGBESummary(host, startDate, endDate, meetings) {
  
  var pList = [];

  const numDays =  1 + dayjs(endDate).diff(startDate, 'day');
  const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DD");

  // Do data transformation to show minutes spent in each available Zoom by day
  meetings.forEach((m) => {

      var hostDuration = m.participants[0].duration;

      var pos = GBEZoomNumber(m.start_time, startDateUTC);
      //console.log("pos", pos, m.participants.length, m.start_time);
      m.pos = pos;
      var participants = m.participants;

      if ((pos.zoom >= 0) && (pos.day >=0)) {
        // This is an instructional meeting so scan the particpants
        participants.forEach((p) => {
          var found;
          if (pList.length > 0) {
              found = pList.find((e) => e.name === p.name);
          }
          if (found) {  //It was found
              found.days[pos.day].zooms[pos.zoom].duration += p.duration; // Add to number of minutes
              found.days[pos.day].zooms[pos.zoom].hostDuration = hostDuration; // Add to number of minutes
          } else {
            // Make a new plist entry with buckets for paricipation by day and Zoom number
            if (p.duration > 90) {
              var pNew = {...p};
              pNew.days = new Array(numDays);
              for (var i=0; i<numDays;i++){
                  const a = [
                    {duration: 0, hostDuration: -1},
                    {duration: 0, hostDuration: -1},
                    {duration: 0, hostDuration: -1},
                    {duration: 0, hostDuration: -1},
                    {duration: 0, hostDuration: -1},
                  ]; 
                  pNew.days[i] = {zooms: a};
              }
              pNew.days[pos.day].zooms[pos.zoom].duration += p.duration; // Add to number of minutes
              pNew.days[pos.day].zooms[pos.zoom].hostDuration = hostDuration; // Add to number of minutes
              pList.push(pNew);
            } 
          }
        });
      }
  });

  // Sometimes the host may not be the first participant in the list so...
  const hostIndex = pList.findIndex(p => p.name === host);
  if (hostIndex > 0) {
    const theHost = pList[hostIndex];
    var newList = [theHost];
    pList = newList.concat(pList.slice(0, hostIndex).concat(pList.slice(hostIndex + 1, pList.length)))
  }

  const sortedParticipants = pList.slice(0, 1).concat(pList.slice(1, pList.length).sort( (a, b) => {
    if (a.name > b.name) return 1;
    if (b.name  > a.name) return -1;
    return 0;
  }));

  // Take another pass through the participants to fill in hostDuration for all meetings
  meetings.forEach((m) => {
    var hostDuration = m.participants[0].duration;
    var pos = GBEZoomNumber(m.start_time, startDateUTC);
    try {
      sortedParticipants.forEach((p) => {
        if ((pos.zoom >= 0) && (pos.day >=0)) {
          p.days[pos.day].zooms[pos.zoom].hostDuration = hostDuration; 
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  });

  return {participants: sortedParticipants, numDays: numDays};       //List of participant with time in each meeting
}


class GBEZoomSummary extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      meetings: [],
      participants: [],
      host: "",
      endDate: dayjs().format("YYYY-MM-DD"),
      startDate: dayjs().add(-4, 'day').format("YYYY-MM-DD"),
      numDays: 5,
      }
  }
    
  async fetchTheData() {
    // ? set loading and error states?
    // Create query

    const {host, startDate, endDate} = this.state;
    
    if (host === "") {
      // Initial loading state
      return
    }

    var meetings;

    const query = this.composeQuery(host, startDate, endDate);
    
    meetings = await dataAccess.meetingsFetch(query);

    if (meetings) {
      const {numDays, participants} = createGBESummary(host, startDate, endDate, meetings);
      this.setState({...this.state, 
        participants: participants,
        meetings: meetings, 
        numDays: numDays});
    } else {
      this.setState({...this.state,
        participants: [],
        meetings: [],
        numDays: 0,
      });
    }
  }
  
  async componentDidMount() {
    this.fetchTheData();
  }

  async componentDidUpdate(prevProps, prevState) {
    //console.log(prevState, this.state)
    if ( (this.state.host === prevState.host) &&
         (this.state.startDate === prevState.startDate) &&
         (this.state.endDate === prevState.endDate)) {
    } else {
      await this.fetchTheData();
    }
  }
  

  // Render each meeting with which scheduled session it is.
  renderMeetingList() {
    const { meetings } = this.state;
    var rows = [];

    if (meetings.length <= 0) return;

    rows.push(<h2 key={1001}>Meetings</h2>);
    rows.push(<p key={1002}></p>);
    rows.push(<em key={1003}><p>If an instructional Zoom does not appear on this list, please contact Mark </p></em>);
  
    // Todo render as list
    meetings.forEach(m => {
      const numParticipants = m.participants ? m.participants.length : 0;
      const meetingDate = dayjs(m.start_time).tz("America/Los_Angeles").format("ddd MM-DD hh:mm");
      const duration = Math.round(m.duration / 60);
      const s = `${meetingDate} (${m.pos.zoom >= 0 ? zoomTimesShort[m.pos.zoom] : "other"}) ${numParticipants} participants for ${duration}m`;
      rows.push(<p key={m.id}>{s}</p>);
    });
    return rows;
  }

  composeQuery(host, startDate, endDate) {
    const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DDThh:mm:ss");
    // Add 24 hours to end date to make query inclusive of end date's meetings
    const endDateUTC  = dayjs(endDate).utc().add(1, "day").format("YYYY-MM-DDThh:mm:ss");
    return `SELECT * FROM meetings m WHERE m.start_time >= '${startDateUTC}' and m.end_time <= '${endDateUTC}' and startswith(m.topic, '${host}')`
  }

  renderForm() {
    const {host, startDate, endDate} = this.state;
  
    const hostChange = (event) => {
      this.setState({...this.state, host: event.target.value});
    };
  
    const startDateChange = (date) => {
      const d = dayjs(date).format("YYYY-MM-DD");
      this.setState({...this.state, startDate: d});
    };
  
    const endDateChange = (date) => {
      const d = dayjs(date).format("YYYY-MM-DD");
      this.setState({...this.state, endDate: d});
    };
  
    // - {host} {startDate} to {endDate}
    var options = [];
    options.push(<option key={"x"} value={""}>{""}</option>)
    gbeStaff.forEach(s => {
      const opt = <option key={s.name} value={s.name}>{s.name}</option>
      options.push(opt);
    });
    //todo <FormControl className={classes.formControl}>
    return(
      <div>
         <Grid container justify="space-around">
      <FormControl>
        <InputLabel htmlFor="host-native-simple">Teacher</InputLabel>
        <Select
          native
          value={host}
          onChange={hostChange}
          inputProps={{
            name: 'host',
            id: 'host-native-simple',
          }}
        >
          {options}
        </Select>
      </FormControl>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <KeyboardDatePicker
             disableToolbar
             variant="inline"
             format="yyyy-MM-dd"
             margin="normal"
             id="startDate"
             label="Start Date"
             value={dayjs(startDate).utc()}
             onChange={startDateChange}
             autoOk={true}
             disableFuture={true}
             maxDate={dayjs(endDate).utc()}
             KeyboardButtonProps={{
               'aria-label': 'change date',
             }}
           />
           <KeyboardDatePicker
             disableToolbar
             variant="inline"
             format="yyyy-MM-dd"
             margin="normal"
             id="endDate"
             label="End Date"
             value={dayjs(endDate).utc()}
             onChange={endDateChange}
             autoOk={true}
             disableFuture={true}
             minDate={dayjs(startDate).utc()}
             KeyboardButtonProps={{
               'aria-label': 'change date',
             }}
           />
       </MuiPickersUtilsProvider>
       </Grid>
      </div>
    )
  }

  renderHeadings() {

    var cols = [];
    const {numDays, startDate} = this.state;
    const dt = dayjs(startDate);

    if (numDays <= 0) return;

    cols.push(<TableCell key={-1}>Participant</TableCell>);

    for (var d=0; d < numDays; d++) {
      const colDate = dt.add(d, 'day');
      cols.push(<TableCell key={d}>{colDate.format("ddd")}<br/>{colDate.format("MM-DD")}</TableCell>);
    }
    return cols;
  }

  renderParticipant(p) {
    const {startDate} = this.state;
    
    var dayZooms=[];

    if (! p.days) {
      console.log("blek")
    }
    for (var d=0; d < this.state.numDays; d++) {
      var zooms = [];
      var dow = dayjs(startDate + "T00:00:00").add(d, 'day').format("ddd");
      
      if (dow === "Fri") {
        //Friday only has one zoom
        zooms.push(<Donut participantDuration={p.days[d].zooms[4].duration} hostDuration={p.days[d].zooms[4].hostDuration} />)
      } else {
        // other days
        for (var z=0; z < p.days[d].zooms.length - 1; z++) {
          //console.log(d, z, p.days[d].zooms[z].duration, p.days[d].zooms[z].hostDuration)
          zooms.push(<Donut participantDuration={p.days[d].zooms[z].duration} hostDuration={p.days[d].zooms[z].hostDuration} />)
        }
      }
      dayZooms.push(
        <TableCell >{zooms}</TableCell>
      )
    }

    if (!p || this.state.numDays === 0) {
      p = (<p>No meetings</p>);
      return (<TableRow key={p.name} hover={true}>
        <TableCell>No regular meetings found.</TableCell>
      </TableRow>)
    } else {
      return (
        <TableRow key={p.name} hover={true}>
          <TableCell>{p.name}</TableCell>
          {dayZooms}
        </TableRow>
        )
    }
  }
  
  renderSummary() {
    const {participants} = this.state;

    return (
    <>
    {participants.length > 0 ? <Table>
    <TableHead>
      <TableRow>
        {this.renderHeadings()}
      </TableRow>
    </TableHead>
      <TableBody>
        {participants.map((p /*, index*/) => (
          this.renderParticipant(p)
        ))}
    </TableBody>
    </Table> : <p>No meetings found</p>}
    {this.renderMeetingList()}
    </>      
    )         
  }

  render() {
    const { loading, hasError } = this.state;

    return (
    <Card>
      <CardContent>
        {this.renderForm()}
        <Divider />
        {loading ? <div>Loading...</div> : 
          hasError ? <div>Error occured.</div> : this.renderSummary()}
      </CardContent>
    </Card>
    );
  }

}

GBEZoomSummary.propTypes = {
  meetings: PropTypes.array,
  host: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default GBEZoomSummary;
