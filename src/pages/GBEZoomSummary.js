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
import Typography from "@material-ui/core/Typography";
import styles from "./Table/BasicTables/tableColumnStyle";
import tableData from "../data";
import { endpoint, key, databaseId } from "../config.js";
import { CosmosClient } from "@azure/cosmos"
// TODO move get of summary back to data access
//const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container("meetings");

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc') // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)


// Return duration as "134 m"
function durationFormat(duration) {
  //var hours = Math.floor(duration / 3600).toString();
  //var minutes = Math.floor((duration % 3600) / 60).toString();
  //return hours+"h " + minutes + "m";
  return Math.floor((duration / 60).toString() + "m");
}

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
      if (t.format("d") === 5 ) {  //special case of Friday
          if ((startTime >= 505 && (startTime <= 625 ))) // 8:25 to 10:25
          result.zoom = 4;      // it's the Friday 8:30
      }
  };
  result.day = dayjs(firstReportDateUTC).diff(startTimeUTC,"day");
  console.log(result, t.format("YYYY-MM-DDTHH:mm"));
  return result;
}

// transform the meeting data
function createGBESummary(host, startDate, endDate, meetings) {
  console.log("reportGBEWeeklySummary");
  
  var pList = [];
  const numDays =  1 + dayjs(endDate).diff(startDate, 'day');
  const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DD");

  // Do data transformation to show minutes spent in each available Zoom by day
  meetings.forEach((m) => {
      var pos = GBEZoomNumber(m.start_time, startDateUTC);
      console.log("pos", pos, m.start_time);
      var participants = m.participants;
      participants.forEach((p) => {
          var found;
          if (pList.length > 0) {
              found = pList.find((e) => e.name === p.name);
          }
          if (found !== undefined) {
              if (pos.zoom >= 0) {
                  found.days[pos.day].zooms[pos.zoom] += p.duration / 60;
              }
          } else {
              // Make a new paricipant with buckets for paricipation by day and Zoom number
              p.days = new Array(numDays);
             for (var i=0; i<p.days.length;i++){
                  const a = [0, 0, 0, 0, 0]; 
                  p.days[i] = {zooms: a};
              }
              pList.push(p);
          }
      });
  });
  console.log(pList);
  return pList;       //List of participant with time in each meeting
}

async function fetchData(host, startDate, endDate) {

  const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DDThh:mm:ss");
  const endDateUTC  = dayjs(endDate).utc().format("YYYY-MM-DDThh:mm:ss");
  const querySpec = {
      query: `SELECT * FROM meetings m WHERE m.start_time >= '${startDateUTC}' and m.end_time <= '${endDateUTC}' and startswith(m.topic, '${host}')`
  };
  console.log(querySpec.query);
  try {
      //console.log(container.items);
      const { resources: items } = await container.items  // meetings
        .query(querySpec)
        .fetchAll();
      console.log("Retrieved meetings", items);
      return items;
  } 
  catch (err) {
      console.log(err);
      return null
  }
  
}

class GBEZoomSummary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      meetings: [],
      host: "Rachel Gossett",
      startDate: "2020-10-05",
      endDate: "2020-10-09"
      }
  }
    
  componentDidMount() {
    // fetch('https://some-api.com/harry-potter')
    // .then((response) => response.json())
    // .then(booksList => {
    //     this.setState({ books: booksList });
    // });
    var m = fetchData(this.state.host, this.state.startDate, this.state.endDate);
    console.log("retrieved2", m)
  }
    

  render() {
    console.log(this.state);
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            GBE Zoom Summary
          </Typography>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.columns.id}>ID</TableCell>
                <TableCell style={styles.columns.name}>Name</TableCell>
                <TableCell style={styles.columns.price}>Price</TableCell>
                <TableCell style={styles.columns.category}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.tablePage.items.slice(0, 5).map(item => (
                <TableRow key={item.id} hover={true}>
                  <TableCell style={styles.columns.id}>{item.id}</TableCell>
                  <TableCell style={styles.columns.name}>{item.name}</TableCell>
                  <TableCell style={styles.columns.price}>{item.price}</TableCell>
                  <TableCell style={styles.columns.category}>
                    {item.category}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
}

GBEZoomSummary.propTypes = {
  meetings: PropTypes.array,
  host: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default GBEZoomSummary;
