import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue600, grey900, purple, green } from '@material-ui/core/colors';

const themeDefault = createMuiTheme({
  // palette: {
  // },

  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600,
  },
  useNextVariants: true,
});


export default themeDefault;