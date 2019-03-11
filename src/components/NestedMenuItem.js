import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = () => {
  return {
    chevronIcon: {
      float: "right",
      marginLeft: "auto"
    },
    subMenus: {
      marginLeft: 20
    },
    menuItem: {
      color: "white",
      fontSize: 14
    }
  };
};

class NestedMenuItem extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  anchor = null;

  handleClick = event => {
    event.stopPropagation();
    this.setState({
      open: !this.state.open,
      anchorEl: this.anchor
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });

    // A bit of a hack, but we have no other way of closing the whole tree
    // without cooperating with the parent Menu
    document
      .querySelectorAll("div[class^=\"MuiBackdrop-\"]")
      .forEach(backdrop => {
        backdrop.click();
      });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { menu, key, classes, navDrawerOpen } = this.props;
    const { open } = this.state;

    // no sub menus
    if (!menu.subMenus || !menu.subMenus.length) {
      return (
        <Link key={key} to={menu.link}>
          <MenuItem classes={{ root: classes.menuItem }}>
            <ListItemIcon style={{ color: "white" }}>{menu.icon}</ListItemIcon>
            <span>{menu.text}</span>
          </MenuItem>
        </Link>
      );
    }

    // TODO when navDrawerOpen is false,
    // Implement the menus for hover on the icon in `mini left drawer`
    return (
      <div>
        <ListItem
          key={key}
          classes={{ root: classes.menuItem }}
          onClick={this.handleClick}
        >
          <ListItemIcon style={{ color: "white" }}>{menu.icon}</ListItemIcon>
          <span>{menu.text}</span>
          {open ? (
            <ExpandLess className={classes.chevronIcon} />
          ) : (
            <ExpandMore className={classes.chevronIcon} />
          )}
        </ListItem>
        {/* only open when the menu is open and Nav Drawer is open */}
        <Collapse
          in={this.state.open && navDrawerOpen}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            disablePadding
            classes={{ root: classes.subMenus }}
          >
            {menu.subMenus.map((subMenu, index) => (
              <Link key={index} to={subMenu.link}>
                <MenuItem key={index} classes={{ root: classes.menuItem }}>
                  <ListItemIcon style={{ color: "white" }}>
                    {subMenu.icon}
                  </ListItemIcon>
                  <span>{subMenu.text}</span>
                </MenuItem>
              </Link>
            ))}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NestedMenuItem);
