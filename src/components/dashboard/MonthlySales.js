import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import GlobalStyles from "../../styles.scss";

import { withStyles } from "@material-ui/core/styles";

const MonthlySales = ({ data, theme }) => {
  const styles = {
    paper: {
      backgroundColor: theme.palette.secondary[600],
      height: 150
    },
    div: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "95%",
      height: 85
    },
    header: {
      color: "white",
      backgroundColor: theme.palette.secondary[600],
      padding: 10,
      fontSize: 24
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        Monthly Sales
      </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="uv" fill={theme.palette.primary[200]} />
            <XAxis
              dataKey="name"
              stroke="none"
              tick={{ fill: theme.palette.common.white }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

MonthlySales.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object
};

export default withStyles(null, { withTheme: true })(MonthlySales);
