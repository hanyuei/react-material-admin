import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './pages/index';
// import NotFoundPage from './containers/NotFoundPage';
// import LoginPage from './containers/LoginPage';
// import FormPage from './containers/FormPage';
// import TablePage from './containers/TablePage';
// import Dashboard from './containers/DashboardPage';

// export default (
  // <Route>
  //   <Route path="login" component={LoginPage}/>
  //   <Route path="/" component={App}>
  //     <IndexRoute component={Dashboard}/>
  //     <Route path="dashboard" component={Dashboard}/>
  //     <Route path="form" component={FormPage}/>
  //     <Route path="table" component={TablePage}/>
  //     <Route path="*" component={NotFoundPage}/>
  //   </Route>
  // </Route>
// );


export default (
  <Route>
    <Route path="/" component={Index}>
    </Route>
  </Route>
)