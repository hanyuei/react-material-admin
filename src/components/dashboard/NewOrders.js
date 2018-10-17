import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {white, purple} from '@material-ui/core/colors';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import Typography from '@material-ui/core/Typography';

const NewOrders = (props) => {

  const styles = {
    paper: {
      backgroundColor: purple[500],
      height: 150
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px'
    },
    header: {
      fontSize: 24,
      fontWeight: Typography.fontWeightLight,
      color: 'white',
      backgroundColor: purple[600],
      padding: 10,
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

NewOrders.propTypes = {
  data: PropTypes.array
};

export default NewOrders;
