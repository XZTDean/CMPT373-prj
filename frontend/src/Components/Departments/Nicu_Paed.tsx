import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Nicu_Paed() {
    return (
        <div id="wrapper">
            <h1 id="title">Nicu_Paed Home Page</h1>
            <div id="Hcontainer">
                <div id="caseStudy" className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/nicu_paed/casestudyPg">Case Study</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Case Study will Due on:</div>
                </div>
                <div id="data" className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/nicu_paed/datainputPg">Data</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Data Submission will Due on:</div>
                </div>
                <div id="empofMth" className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/nicu_paed/empofmthpg">Employee Of Month</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Case Study will Due on:</div>
                </div>
                <div id="bioMech" className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/nicu_paed/biomech">Biomechanic Support</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">No message</div>
                </div>
                <div id="pointsTally" className="with_border">
                    <div>Your current points tally is:</div>
                    <div className="inner_mssg">employee_score</div>
                </div>
            </div>
        </div>
    );
}


export default Nicu_Paed;