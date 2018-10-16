import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {blue600, grey900} from '@material-ui/core/colors';

const themeDefault = createMuiTheme({
  palette: {
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