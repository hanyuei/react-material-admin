import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ContentAdd from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import SimpleTable from "./BasicTables/SimpleTable";
import StripedTable from "./BasicTables/StripedTable";
import BorderTable from "./BasicTables/BorderTable";
import HoverTable from "./BasicTables/HoverTable";

const TablePage = () => {
  const styles = {
    floatingActionButton: {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed"
    }
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <SimpleTable />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StripedTable />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <BorderTable />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <HoverTable />
        </Grid>
      </Grid>
      <Link to="/form">
        <Button mini={true} variant="fab" style={styles.floatingActionButton} color="secondary">
          <ContentAdd />
        </Button>
      </Link>
    </div>
  );
};

export default withStyles(null, { withTheme: true })(TablePage);
