import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import '../../bootstrap5/bootstrap-5.0.0-beta1-dist/bootstrap.min.css';
// import '../../bootstrap5/bootstrap-5.0.0-beta1-dist/bootstrap.bundle.min.js';
//             <div className="text-center text-success fs-1">看到我居中，颜色绿色表示起作用了！</div>

function Maternity() {
    return (
        <div id="wrapper">
            <h1 id="title">Maternity Home Page</h1>
            <div id="Hcontainer">
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/casestudyPg">Case Study</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Case Study will Due on:</div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/datainputPg">Data</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Data Submission will Due on:</div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/empofmthPg">Employees</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">A list of employees</div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/biomechPg">BioMech Support</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">No messages</div>
                </div>
                <div id="pointsTally" className="with_border">
                    <div id="pointsTally_header">Your current points tally is:</div>
                    <div className="inner_mssg">Employee's score</div>
                </div>
            </div>
        </div>
    );
}


export default Maternity;