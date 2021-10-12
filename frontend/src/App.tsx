import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Employees from './Components/Employees/Employees'
import Navbar from './Components/Navbar/Navbar'
import Maternity from './Components/Departments/Maternity'
import Rehab from './Components/Departments/Rehab'
import NicuPaed from './Components/Departments/NicuPaed'
import CommunityHealth from './Components/Departments/CommunityHealth'
import Messages from './Components/Messages/Messages'
import Leaderboard from './Components/Leaderboard/Leaderboard'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Redirect to="/login" />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/employees">
            <Employees />
          </Route>

          <Route path="/maternity">
            <Maternity />
          </Route>

          <Route path="/rehab">
            <Rehab />
          </Route>

          <Route path="/nicu-paed">
            <NicuPaed />
          </Route>

          <Route path="/communityhealth">
            <CommunityHealth />
          </Route>

          <Route path="/messages">
            <Messages />
          </Route>

          <Route path="/leaderboard">
            <Leaderboard />
          </Route>


        </Switch>
      </Router>
    </>
  );
}

export default App;
