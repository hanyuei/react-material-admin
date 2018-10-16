import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from './routes';
import App from "./pages/index"
import registerServiceWorker from './registerServiceWorker';
import './styles.scss';
require('./favicon.ico');


// import 'font-awesome/css/font-awesome.css';
// import 'flexboxgrid/css/flexboxgrid.css';

render(
  // <Router>{routes}</Router>, document.getElementById('root')
  <Router><App /></Router>, document.getElementById('root')
);
registerServiceWorker();

