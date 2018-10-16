import { render } from 'react-dom';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './styles.scss';
require('./favicon.ico');


// import 'font-awesome/css/font-awesome.css';
// import 'flexboxgrid/css/flexboxgrid.css';

render(
  // <Router>{routes}</Router>, document.getElementById('root')
  routes, document.getElementById('root')
);
registerServiceWorker();

