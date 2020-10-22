//Render a box that shows percentage of meeting the student attended
import React from "react";
import PropTypes from "prop-types";
import {
  grey
} from "@material-ui/core/colors";

class MeetingBox extends React.Component {
  render() {
    const {
      studentDuration,
      hostDuration
    } = this.props;
    
    const styles = {
      noMeeting: {
        display: "block",
        fontWeight: 400,
        fontSize: 18,
        color: grey[800]
      },
      meetingBox: {
        margin: 3,
        width: 20,
        height: 50,
        border: "1 solid black",
        position: "relative"
      },
      
      attended: {
        //          content:"\A",
        position: "absolute",
        background: "black",
        top: 0,
        bottom: 0,
        left: 0,
        width: 20,
        height: 25
      }
    }
    
    return ( 
      <div className = {styles.meetingBox} >3</div>
    )

  }
}

MeetingBox.propTypes = {
  studentDuration: PropTypes.number,
  hostDuration: PropTypes.number,
};

export default MeetingBox;
