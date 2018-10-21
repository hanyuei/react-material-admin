import React from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { pink, grey } from "@material-ui/core/colors";
import ContentCreate from "@material-ui/icons/Create";
import ContentAdd from "@material-ui/icons/Add";
import PageBase from "../components/PageBase";
import Data from "../data";

console.log("ContentCreate:", ContentCreate);

const TablePage = () => {
  const styles = {
    floatingActionButton: {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed"
    },
    editButton: {
      fill: grey[500]
    },
    columns: {
      id: {
        width: "10%"
      },
      name: {
        width: "40%"
      },
      price: {
        width: "20%"
      },
      category: {
        width: "20%"
      },
      edit: {
        width: "10%"
      }
    }
  };

  return (
    <PageBase title="Table Page" navigation="Application / Table Page">
      <div>
        <Link to="/form">
          <Button
            mini={true}
            variant="fab"
            style={styles.floatingActionButton}
            backgroundColor={pink[500]}
          >
            <ContentAdd />
          </Button>
        </Link>

        <Table>
          <TableHead>
            <TableHead />
            <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.name}>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.price}>
              Price
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.category}>
              Category
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.edit}>
              Edit
            </TableHeaderColumn>
          </TableHead>
          <TableBody>
            {Data.tablePage.items.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>
                  {item.id}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.name}>
                  {item.name}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.price}>
                  {item.price}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.category}>
                  {item.category}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <Button
                      mini={true}
                      variant="fab"
                      zDepth={0}
                      backgroundColor={grey[200]}
                      iconStyle={styles.editButton}
                    >
                      <ContentCreate />
                    </Button>
                  </Link>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageBase>
  );
};

export default TablePage;
