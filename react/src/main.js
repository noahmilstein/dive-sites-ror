import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import DivePage from './components/DivePage';
import NewDive from './components/NewDive.js'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={DivePage}/>
        <Route path='dives' component={DivePage}/>
        <Route path='dives/new' component={NewDive}/>
      </Route>
    </Router>,
    document.getElementById('app')
  )
})

// $(document).ready(function() {
//   $('#erb').hide();
// })
$(document).ready(function() {
  $('.erb').hide();
})
