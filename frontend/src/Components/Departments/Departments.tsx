import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Api from "../../API/Api";

type Department = {
    id: number,
    name: string,
    blurb: string
}

class Departments extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        
        Api.Departments.getDepartments().then(data => {
            this.setState({
                departments: data
            })
        })

    }

    render() {
        const departments = this.state.departments
        return (
            <>
            <div className="card mx-auto w-75 my-5">
                
                <h1 className="card-header card-title text-center display-4">Departments</h1>
                <div className="card-body">
                <div className="d-grid gap-2 col-6 mx-auto mb-3">
                    <button className="btn btn-primary" type="button">Add New Department</button>
                </div>
                
                <ul className="list-group">
                    {departments.map(function(d: any, idx: number){ 
                         return (
                            <li className="list-group-item text-center display-6" key={idx}>
                                {
                                <Link to={{
                                    pathname: `/departments/${d.id}`,
                                    state: {
                                        name: d.name,
                                        id: d.id
                                    }
                                }}>
                                    {d.name}
                                </Link> 
                                }
                                
                            </li>
                            )
                    })}
                </ul>
                </div>
            </div>
            </>
        )
    }
}


export default Departments;
