import React from "react";
import TextField from "@material-ui/core/TextField";
import { white, blue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";

const SearchBox = () => {
  const styles = {
    iconButton: {
      float: "left",
      paddingTop: 17
    },
    textField: {
      color: "white",
      backgroundColor: blue[500],
      borderRadius: 2,
      height: 35
    },
    inputStyle: {
      color: "white",
      paddingLeft: 5
    },
    hintStyle: {
      height: 16,
      paddingLeft: 5,
      color: white
    }
  };

  return (
    <div>
      <IconButton style={styles.iconButton}>
        <Search color={white} />
      </IconButton>
      <TextField
        hintText="Search..."
        underlineShow={false}
        fullWidth={true}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default SearchBox;
