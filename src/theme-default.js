import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { blue, grey, pink, red, black } from "@material-ui/core/colors";

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
    backgroundColor: black,
    miniWidth: 56
  },
  raisedButton: {
    primaryColor: blue[600]
  },
  typography: {
    useNextVariants: true
  }
});

export default themeDefault;
