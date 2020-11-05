import React from "react";
//import { Link } from "react-router-dom";
import { purple, orange } from "@material-ui/core/colors";
import Assessment from "@material-ui/icons/Assessment";
import Face from "@material-ui/icons/Face";
//import ThumbUp from "@material-ui/icons/ThumbUp";
//import ShoppingCart from "@material-ui/icons/ShoppingCart";
import InfoBox from "../components/dashboard/InfoBox";
//import NewOrders from "../components/dashboard/NewOrders";
//import MonthlySales from "../components/dashboard/MonthlySales";
//import BrowserUsage from "../components/dashboard/BrowserUsage";
//import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";
//import Data from "../data";

const DashboardPage = () => {
  return (
    <div>
      <h3 style={globalStyles.navigation}>Dashboard (not real data)</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <InfoBox Icon={Assessment} color={purple[600]} title="Engaged" value="332" />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InfoBox Icon={Face} color={orange[600]} title="Absent" value="50" />
        </Grid>
      </Grid>

      {/*
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <NewOrders data={Data.dashBoardPage.newOrders} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MonthlySales data={Data.dashBoardPage.monthlySales} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RecentlyProducts data={Data.dashBoardPage.recentProducts} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BrowserUsage data={Data.dashBoardPage.browserUsage} />
        </Grid>
      </Grid>
      */}
    </div>
  );
};

export default DashboardPage;
