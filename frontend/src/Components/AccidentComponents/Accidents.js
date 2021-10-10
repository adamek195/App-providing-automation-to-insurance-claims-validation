import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../../History.js';
import UserNavBar from '../MenuComponents/UserNavBar';
import AccidentsSideBar from '../MenuComponents/AccidentsSideBar';
import '../../Styles/Accidents.css';

class Accidents extends Component {
    state = {
        accidents: [],
        policies: [],
        policyNumber: "",
    }
    render() {
        return(
            <div>
                <UserNavBar />
                <AccidentsSideBar />
                <div className="accidents-manager-wrapper">
                    <div className="accidents-manager-inner">
                    <h3 style={{textAlign: 'center'}}>Zarządzaj szkodami</h3>
                        <div className="d-flex justify-content-center">
                                <input name="policyNumber" style={{margin: '10px', width:'300px'}}
                                        type="text"
                                        className="form-control"
                                        placeholder="Numer polisy ubezpieczeniowej"
                                        value={this.state.policyNumber}
                                        onChange={this.handleChange}/>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.getAccidents}>Zobacz szkody
                                </button>
                                <p className="p-2">Nie pamietasz numer swojej polisy?</p>
                                <Link className="nav-link p-2" to={"/policies"}>Zobacz polisy</Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Accidents;