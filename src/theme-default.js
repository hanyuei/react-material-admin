import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  blue,
  grey,
  purple,
  green,
  pink,
  red,
  black
} from "@material-ui/core/colors";

console.log("blue[600]", blue[600]);
console.log("grey[900]:", grey[900]);
console.log("black:", black);
const themeDefault = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },

  // palette: {
  //   primary: {
  //     light: purple[300],
  //     main: purple[500],
  //     dark: purple[700],
  //   },
  //   secondary: {
  //     light: green[300],
  //     main: green[500],
  //     dark: green[700],
  //   },
  // },
  error: red,
  appBar: {
    height: 57,
    color: blue[600]
  },
  drawer: {
    width: 240,
    color: grey[900],
    backgroundColor: black
  },
  raisedButton: {
    primaryColor: blue[600]
  }
  //useNextVariants: true,
});

export default themeDefault;
