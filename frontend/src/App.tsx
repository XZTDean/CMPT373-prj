import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Employees from './Components/Employees/Employees'
import Maternity from './Components/Departments/Maternity'

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
        {/* <Navbar /> */}
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
          </ul>
        </nav>
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
