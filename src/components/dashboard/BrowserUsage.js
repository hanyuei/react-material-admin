import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import GlobalStyles from "../../styles.scss";

const BrowserUsage = props => {
  const styles = {
    paper: {
      minHeight: 344,
      padding: 10
    },
    legend: {
      paddingTop: 20
    },
    pieChartDiv: {
      height: 290,
      textAlign: "center"
    }
  };

  return (
    <Paper style={styles.paper}>
      <span style={GlobalStyles.title}>Browser Usage</span>

      <div style={GlobalStyles.clear} />

      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  innerRadius={80}
                  outerRadius={130}
                  data={props.data}
                  fill="#8884d8"
                >
                  {props.data.map(item => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={styles.legend}>
            <div style={styles.legend}>
              <List>
                {props.data.map(item => (
                  <ListItem key={item.name}>
                    <Avatar
                      style={{
                        backgroundColor: item.color,
                        marginRight: "10px"
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    {item.name}
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

BrowserUsage.propTypes = {
  data: PropTypes.array
};

export default BrowserUsage;
