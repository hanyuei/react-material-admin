import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './pages/App';
import Login from "./pages/LoginPage";

export default (
  <Router>
    <div>
      <Route path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>
)