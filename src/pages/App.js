import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import Data from "../data";
import Dashboard from "./DashboardPage";
import Form from "./FormPage";
import Table from "./TablePage";
import NotFound from "./NotFoundPage";

const styles = theme => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: theme.drawer.width
    // width: `calc(100% - ${theme.drawer.width}px)`
  },
  containerFull: {
    paddingLeft: theme.drawer.miniWidth
    // width: `calc(100% - ${theme.drawer.miniWidth}px)`
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    const { classes } = this.props;
    const { navDrawerOpen } = this.state;

    return (
      <div>
        <Header
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
            this
          )}
          navDrawerOpen={navDrawerOpen}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          menus={Data.menus}
          username="User Admin"
        />

        <div
          className={classNames(
            classes.container,
            !navDrawerOpen && classes.containerFull
          )}
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/form" component={Form} />
            <Route path="/table" component={Table} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default withStyles(styles)(App);
