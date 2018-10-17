import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './pages/App';
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
      <Route exact path="/login" component={Login}/>
      <Route path="/" component={App}/>
    </div>
  </Router>
)