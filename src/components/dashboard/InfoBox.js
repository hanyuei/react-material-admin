import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { grey } from "@material-ui/core/colors";

class InfoBox extends React.Component {
  render() {
    const { color, title, value, Icon } = this.props;
    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 90,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: 400,
        fontSize: 18,
        color: grey[800]
      },
      text: {
        fontSize: 20,
        fontWeight: 300,
        color: grey[800]
      },
      iconSpan: {
        float: "left",
        height: 90,
        width: 90,
        textAlign: "center",
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%"
      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <div style={{ color: "white" }}>
            <Icon style={styles.icon} />
          </div>
        </span>
        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default InfoBox;
