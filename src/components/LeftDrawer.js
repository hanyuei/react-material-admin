import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
// import {spacing, Typography} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {white, blue600} from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const drawStyles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  }
})

const LeftDrawer = (props) => {
  let { navDrawerOpen, classes } = props;
  
  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: Typography.textFullWhite,
      // lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: Typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer docked={true} open={navDrawerOpen} variant="persistent" 
      classes={{
        paper: classes.drawerPaper,
      }}
    >
        <div style={styles.logo}>
          Material Admin
        </div>
        <div style={styles.avatar.div}>
          <Avatar src="https://material-ui.com/static/images/uxceo-128.jpg"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.username}</span>
        </div>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

// export default LeftDrawer;
export default withStyles(drawStyles, { withTheme: true })(LeftDrawer);