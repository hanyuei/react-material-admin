import React from "react";
import PropTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { availableThemes } from "../theme";

const style = () => ({
  BackdropRoot: {
    backgroundColor: "transparent"
  },
  selectThemeBtn: {
    backgroundColor: "rgb(250, 250, 250)",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    height: "40px",
    margin: "16px 0",
    cursor: "pointer",
    "&.hover": {
      boxShadow: "inset 0 0 0 20px rgba(0,0,0,.24)"
    }
  }
});

const RightDrawer = ({ rightDrawerOpen, handleChangeRightDrawer, handleChangeTheme, classes }) => (
  <Drawer
    variant="temporary"
    anchor={"right"}
    open={rightDrawerOpen}
    onClose={handleChangeRightDrawer}
    // use transparent background
    ModalProps={{
      BackdropProps: {
        classes: { root: classes.BackdropRoot }
      }
    }}
  >
    <div style={{ width: 240, padding: 16 }}>
      <h6 style={{ paddingBottom: "10px" }}>Theme Setting</h6>
      {availableThemes.map(theme => (
        <div
          style={{ paddingLeft: "5px" }}
          key={theme.title}
          onClick={() => handleChangeTheme(theme)}
          className={classes.selectThemeBtn}
        >
          <em>{theme.title}</em>
          <Grid container>
            <Grid item xs={5}>
              <div style={{ height: "10px", background: theme.primary[500] }} />
            </Grid>
            <Grid item xs={5}>
              <div style={{ height: "10px", background: theme.secondary[500] }} />
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  </Drawer>
);

RightDrawer.propTypes = {
  rightDrawerOpen: PropTypes.bool,
  handleChangeRightDrawer: PropTypes.func,
  handleChangeTheme: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(style)(RightDrawer);
