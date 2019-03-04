import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Data from "../../../data";
import styles from "./tableColumnStyle";

const borderedTableStyle = theme => ({
  table: {
    border: "1px solid rgba(0, 0, 0, 0.12)"
  }
});

const BorderedTable = ({ classes }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Bordered Table
        </Typography>
        <Divider />
        <Table classes={{ root: classes.table }}>
          <TableHead>
            <TableRow>
              <TableCell style={styles.columns.id}>ID</TableCell>
              <TableCell style={styles.columns.name}>Name</TableCell>
              <TableCell style={styles.columns.price}>Price</TableCell>
              <TableCell style={styles.columns.category}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.tablePage.items.slice(0, 5).map(item => (
              <TableRow className={classes.row} key={item.id}>
                <TableCell style={styles.columns.id}>{item.id}</TableCell>
                <TableCell style={styles.columns.name}>{item.name}</TableCell>
                <TableCell style={styles.columns.price}>{item.price}</TableCell>
                <TableCell style={styles.columns.category}>
                  {item.category}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withStyles(borderedTableStyle, { withTheme: true })(
  BorderedTable
);
