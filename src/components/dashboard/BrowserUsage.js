import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import GlobalStyles from "../../styles.scss";
import { orange } from "@material-ui/core/colors";

const BrowserUsage = props => {
  const styles = {
    paper: {
      minHeight: 344,
      padding: 0
    },
    legend: {
      paddingTop: 20
    },
    pieChartDiv: {
      height: 290,
      textAlign: "center"
    },
    header: {
      fontSize: 24,
      fontWeight: 300,
      backgroundColor: orange[600],
      color: "white",
      lineHeight: "48px",
      paddingLeft: "10px"
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        Browser Usage
      </div>

      <div style={GlobalStyles.clear} />

      <div style={styles.pieChartDiv}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              nameKey="name"
              colorKey="color"
              innerRadius={60}
              outerRadius={100}
              data={props.data}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

BrowserUsage.propTypes = {
  data: PropTypes.array
};

export default BrowserUsage;
