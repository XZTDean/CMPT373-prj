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
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-departments-modal">Add New Department</button>
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

            {/* Modal */}
            <div className="modal fade" id="add-departments-modal" aria-labelledby="modal-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-label">Create New Department</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="department-name-input" className="form-label">Password</label>
                            <input className="form-control" id="department-name-input" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}


export default Departments;
