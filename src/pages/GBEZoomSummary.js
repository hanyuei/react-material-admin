import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import styles from "./Table/BasicTables/tableColumnStyle";
import tableData from "../data";

const GBEZoomSummary = () => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Table Hover
        </Typography>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.columns.id}>ID</TableCell>
              <TableCell style={styles.columns.name}>Name</TableCell>
              <TableCell style={styles.columns.price}>Price</TableCell>
              <TableCell style={styles.columns.category}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.tablePage.items.slice(0, 5).map(item => (
              <TableRow key={item.id} hover={true}>
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

export default GBEZoomSummary;
