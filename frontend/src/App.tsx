import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Employees from './Components/Employees/Employees'
import Maternity from './Components/Departments/Maternity'
import Rehab from './Components/Departments/Rehab'
import Nicu_Paed from './Components/Departments/Nicu_Paed'
import CommunityHealth from './Components/Departments/CommunityHealth'
import Navbar from './Components/Navbar/Navbar'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


const HomePage: React.FC = () =>{
    return (
        <div>My Home Page</div>
    );
}

function App() {
  return (
    <>

      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/maternity">Maternity</Link>
            </li>
            <li>
              <Link to="/rehab">Rehab</Link>
            </li>
            <li>
              <Link to="/nicu_paed">Nicu_Paed</Link>
            </li>
            <li>
              <Link to="/communityhealth">CommunityHealth</Link>
            </li>
          </ul>
        </nav>

        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
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

          <Route path="/nicu_paed">
            <Nicu_Paed />
          </Route>

          <Route path="/communityhealth">
            <CommunityHealth />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
