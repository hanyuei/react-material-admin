import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => {
  return {
    chevronIcon: {
      float: "right",
      marginLeft: "auto"
    },
    subMenus: {
      paddingLeft: 20
    },
    popupSubMenus: {
      backgroundColor: "rgb(33, 33, 33)",
      color: "white",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
    },
    menuItem: {
      padding: "10px 16px",
      color: "white",
      fontSize: 14,
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    },
    miniMenuItem: {
      color: "white",
      margin: "10px 0",
      fontSize: 14,
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    },
    miniIcon: {
      margin: "0 auto",
      color: "white",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.5)
      },
      minWidth: "24px"
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
            <ListItemIcon className={classes.miniIcon}>{menu.icon}</ListItemIcon>
          </MenuItem>
        </Link>
      );
    }

    return (
      <MenuItem key={key} classes={{ root: classes.miniMenuItem }} onClick={this.handleClick}>
        <ListItemIcon className={classes.miniIcon}>{menu.icon}</ListItemIcon>
        <div
          ref={el => {
            this.anchor = el;
          }}
          style={{ position: "absolute", right: 0 }}
        />

        <Menu classes={{ paper: classes.popupSubMenus }} open={open} anchorEl={anchorEl}>
          {menu.subMenus.map((subMenu, index) => (
            <Link key={index} to={subMenu.link}>
              <MenuItem key={index} classes={{ root: classes.menuItem }}>
                <ListItemIcon style={{ color: "white" }}>{subMenu.icon}</ListItemIcon>
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
        <ListItem key={key} classes={{ root: classes.menuItem }} onClick={this.handleClick}>
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
          <List component="div" disablePadding classes={{ root: classes.subMenus }}>
            {menu.subMenus.map((subMenu, index) => (
              <Link key={index} to={subMenu.link}>
                <MenuItem key={index} classes={{ root: classes.menuItem }}>
                  <ListItemIcon style={{ color: "white" }}>{subMenu.icon}</ListItemIcon>
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

const StyledNestMenuItem = withStyles(styles, { withTheme: true })(NestedMenuItem);
const Menus = props =>
  props.menus.map((menu, index) => <StyledNestMenuItem key={index} menu={menu} navDrawerOpen={props.navDrawerOpen} />);
Menus.propTypes = {
  menus: PropTypes.array,
  navDrawerOpen: PropTypes.bool
};
export default Menus;
