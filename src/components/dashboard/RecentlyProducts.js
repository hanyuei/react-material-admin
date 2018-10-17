import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {List, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { grey, cyan, pink } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Wallpaper from '@material-ui/icons/Wallpaper';

const RecentlyProducts = (props) => {

  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: Typography.fontWeightLight,
      backgroundColor: cyan[600],
      color: 'white'
    }
  };

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey[400]} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>View</MenuItem>
    </IconMenu>
  );

  console.log("Recently products:", props.data)
  return (
    <Paper>
      Hello work
      {props.data.map(item => <div>{item.title} {item.text}</div>)}
      {/* <List subheader={<ListSubheader classes={styles.subheader}>Recent Products</ListSubheader>}>
        {props.data.map(item =>
            <ListItem>
              <Avatar icon={<Wallpaper />} />
              <ListItemText primary={item.title} secondary={item.text} />
              <ListItemSecondaryAction>
                {rightIconMenu}
              </ListItemSecondaryAction>
            </ListItem>
          )}
        }
        {props.data.map(item =>
          <div key={item.title}>
            <ListItem
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.title}
              secondaryText={item.text}
              rightIconButton={rightIconMenu}
            /> 
            <Divider inset={true} />
          </div>
        )}
      </List> */}
    </Paper>
  );
};

RecentlyProducts.propTypes = {
  data: PropTypes.array
};

export default RecentlyProducts;
