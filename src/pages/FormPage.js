import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import PageBase from "../components/PageBase";

const FormPage = () => {
  const styles = {
    toggleDiv: {
      marginTop: 20,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey[400],
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: "right"
    },
    saveButton: {
      marginLeft: 5
    }
  };

  return (
    <PageBase title="Form Page" navigation="Application / Form Page">
      <form>
        <TextField
          hintText="Name"
          label="Name"
          fullWidth={true}
          margin="normal"
        />

        <FormControl fullWidth={true}>
          <InputLabel htmlFor="City">City</InputLabel>
          <Select
            inputProps={{
              name: "City",
              id: "City"
            }}
            fullWidth={true}
            margin="normal"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"London"}>London</MenuItem>
            <MenuItem value={"Paris"}>Paris</MenuItem>
            <MenuItem value={"Rome"}>Rome</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="expirationDate"
          label="Expiration Date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          fullWidth={true}
        />

        <div style={styles.toggleDiv}>
          <FormControlLabel control={<Switch />} label="Disabled" />
        </div>
        <Divider />

        <div style={styles.buttons}>
          <Link to="/">
            <Button variant="contained">Cancel</Button>
          </Link>

          <Button
            style={styles.saveButton}
            variant="contained"
            type="submit"
            color="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </PageBase>
  );
};

export default FormPage;
