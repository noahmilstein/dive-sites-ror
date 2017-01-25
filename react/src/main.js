import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './pages/navLayout/NavBar';
import DivePage from './pages/homePage/DivePage';
import NewDive from './pages/newDivePage/NewDive.js'
import UserPage from './pages/userPage/UserPage.js'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={DivePage}/>
        <Route path='dives' component={DivePage}/>
        <Route path='dives/new' component={NewDive}/>
        <Route path='users(/:id)' component={UserPage}/>
      </Route>
    </Router>,
    document.getElementById('app')
  )
})

$(document).ready(function() {
  $('.erb').hide();
})
