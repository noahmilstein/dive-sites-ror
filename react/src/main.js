import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import NewDive from './components/NewDive.js'
// import routes from './components/routes'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import DivePage from './components/DivePage';
// import NavBar from './components/NavBar';

// $(function() {
//   <Router history={browserHistory} routes={routes}
//     document.getElementById('app')
//   );
// });

// $(function() {
//   ReactDOM.render(
//     <App />,
//     document.getElementById('app')
//   );
// });

$(function() {
  ReactDOM.render(
    <Router history={hashHistory} >
      <Route path='/' component={DivePage} >
        <Route path='/dives/new' component={NewDive} />
      </Route>
    </Router>,
    document.getElementById('app')
  )
})
// $(function() {
//   ReactDOM.render(
//     <Router history={hashHistory} >
//       <Route path='/' component={DivePage} >
//         <IndexRoute component={NavBar} />
//         <Route path='/dives/new' component={NewDive} />
//       </Route>
//     </Router>,
//     document.getElementById('app')
//   )
// })
