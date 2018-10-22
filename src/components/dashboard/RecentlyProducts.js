import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { grey, cyan } from "@material-ui/core/colors";
import Wallpaper from "@material-ui/icons/Wallpaper";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: 300,
    backgroundColor: cyan[600],
    color: "white"
  }
};

const RecentlyProducts = props => {
  const { classes } = props;
  const iconButtonElement = (
    <IconButton touch={true} tooltipPosition="bottom-left">
      <MoreVertIcon color={grey[400]} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>View</MenuItem>
    </IconMenu>
  );

  return (
    <Paper>
      <List
        subheader={
          <ListSubheader classes={{ root: classes.subheader }}>
            Recent Products
          </ListSubheader>
        }
      >
        {props.data.map(item => (
          <ListItem>
            <Avatar>
              <Wallpaper />
            </Avatar>
            <ListItemText primary={item.title} secondary={item.text} />
            <ListItemSecondaryAction>
              {/* {rightIconMenu} */}
              {rightIconMenu}
              <MoreVertIcon color={grey[400]} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

RecentlyProducts.propTypes = {
  data: PropTypes.array
};

export default withStyles(styles)(RecentlyProducts);
