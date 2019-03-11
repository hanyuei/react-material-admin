import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { fade } from "@material-ui/core/styles/colorManipulator";

// import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => {
  return {
    chevronIcon: {
      float: "right",
      marginLeft: "auto"
    },
    subMenus: {
      marginLeft: 20
    },
    popupSubMenus: {
      backgroundColor: "rgb(33, 33, 33)",
      color: "white",
      boxShadow:
        "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
    },
    menuItem: {
      color: "white",
      fontSize: 14
    },
    miniMenuItem: {
      color: "white",
      fontSize: 14,
      paddingLeft: 0
    },
    iconHover: {
      margin: theme.spacing.unit * 2,
      color: "white",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.5)
      }
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
  };

  // in mini drawer mode, show icon and popup sub menus
  renderMiniMenus() {
    // eslint-disable-next-line react/prop-types
    const { menu, key, classes } = this.props;
    const { open, anchorEl } = this.state;

    // no sub menus
    if (!menu.subMenus || !menu.subMenus.length) {
      return (
        <Link key={key} to={menu.link}>
          <MenuItem classes={{ root: classes.miniMenuItem }}>
            <ListItemIcon className={classes.iconHover}>
              {menu.icon}
            </ListItemIcon>
            {/* only show icon in Mini Drawer mode */}
            {/* <span>{menu.text}</span> */}
          </MenuItem>
        </Link>
      );
    }

    return (
      <MenuItem
        key={key}
        classes={{ root: classes.miniMenuItem }}
        onClick={this.handleClick}
      >
        <ListItemIcon className={classes.iconHover}>{menu.icon}</ListItemIcon>
        <div
          ref={el => {
            this.anchor = el;
          }}
          style={{ position: "absolute", right: 0 }}
        />

        <Menu
          classes={{ paper: classes.popupSubMenus }}
          open={open}
          anchorEl={anchorEl}
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
        </Menu>
      </MenuItem>
    );
  }

  renderLargeMenus() {
    // eslint-disable-next-line react/prop-types
    const { menu, key, classes } = this.props;
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
            <ExpandMore className={classes.chevronIcon} />
          ) : (
            <KeyboardArrowRight className={classes.chevronIcon} />
          )}
        </ListItem>

        {/* only open when the menu is open and Nav Drawer is open */}
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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

  render() {
    const { navDrawerOpen } = this.props;
    if (navDrawerOpen) {
      return this.renderLargeMenus();
    } else {
      return this.renderMiniMenus();
    }
  }
}

NestedMenuItem.propTypes = {
  key: PropTypes.string,
  menu: PropTypes.object,
  classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(NestedMenuItem);
