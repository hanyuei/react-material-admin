import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './pages/index';
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";

// import NotFoundPage from './containers/NotFoundPage';
// import LoginPage from './containers/LoginPage';
// import FormPage from './containers/FormPage';
// import TablePage from './containers/TablePage';
// import Dashboard from './containers/DashboardPage';

// export default (
//   <Route>
//     <Route path="login" component={LoginPage}/>
//     <Route path="/" component={App}>
//       <IndexRoute component={Dashboard}/>
//       <Route path="dashboard" component={Dashboard}/>
//       <Route path="form" component={FormPage}/>
//       <Route path="table" component={TablePage}/>
//       <Route path="*" component={NotFoundPage}/>
//     </Route>
//   </Route>
// );


export default (
  <Router>
    <div>
      <h1 >Hello world</h1>
      <Route exact path="/" component={Index}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>
)