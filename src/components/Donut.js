import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

class Donut extends React.Component {

  render() {
    const {participantDuration, hostDuration} = this.props; // in seconds
    if ((participantDuration === 0) && (hostDuration > 0)) {
      console.log("Here here!");
    }
    const hostMinutes = hostDuration / 60;
    const participantMinutes = participantDuration / 60;
    //console.log(hostMinutes, participantMinutes, participantDuration);
    var tt = "";  // Tooltip
    try {
      const size = 22;
      var value, color, thickness;
      if (hostDuration === -1) {
        // Make and empty circle
        thickness = 1;
        value = 100;  
        color = "secondary";
        tt = "No meeting in this timeslot";
      } else if (participantDuration === 0) {
        // Did not attend
        value = 100;
        color = "primary";
        thickness = 1;
        tt = `Did not attend`
      } else {
        // Attended
        value = Math.round(100 * participantDuration / hostDuration);
        color = "primary";
        thickness = 22;
        tt = `Attended ${Math.round(participantMinutes)} of ${Math.round(hostMinutes)} minutes`
      }
      return (
        <Tooltip title={tt} placement="top-start">
          <CircularProgress
            size={`${size}%`}
            value={value}
            thickness={thickness}
            variant="static"
            color={color}
          />
        </Tooltip>
      );
    }
    catch (error) {
      console.log(error)
    }
  };
}

export default Donut;