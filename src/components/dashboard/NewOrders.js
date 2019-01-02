import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { withStyles } from "@material-ui/core/styles";

const NewOrders = ({ data, theme }) => {
  const styles = {
    paper: {
      backgroundColor: theme.palette.primary[600],
      height: 150
    },
    div: {
      height: 95,
      padding: "5px 15px 0 15px"
    },
    header: {
      fontSize: 24,
      fontWeight: 300,
      color: "white",
      backgroundColor: theme.palette.primary[600],
      padding: 10
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke={theme.palette.secondary[500]}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

NewOrders.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object
};

export default withStyles(null, { withTheme: true })(NewOrders);
