import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../../History.js';
import { policiesUrl } from "../../ConstUrls"
import { accidentsUrl } from "../../ConstUrls"
import UserNavBar from '../MenuComponents/UserNavBar';
import AccidentsSideBar from '../MenuComponents/AccidentsSideBar';
import '../../Styles/Accidents.css';

class Accidents extends Component {
    state = {
        accidents: [],
        policies: [],
        policyNumber: "",
    }

    componentDidMount() {
        this.getPolicies()
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    getPolicies() {
        axios.get(policiesUrl)
        .then((response) => {
            this.setState({
                policies: response.data
            })
        })
        .catch(() => {
            history.push("/unauthorized");
        })
    }

    getAccidents = (e) => {
        e.preventDefault()
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.policyNumber)
        if(policy === undefined || null){
            console.log("błąd");
            this.setState({
                accidents: []
            })
        }
        else{
            let getRequest = `${accidentsUrl}/${policy.id}`
            axios.get(getRequest)
            .then((response) => {
                this.setState({
                    accidents: response.data,
                })
            })
            .catch(() => {
                console.log("błąd wypadek")
            })
        }
    }

    renderAccident = (accident) => {
        let accidentDate = new Date(accident.accidentDateTime)
        let parseAccidentDate = accidentDate.getFullYear() + "-" + ('0' + (accidentDate.getMonth()+1)).slice(-2) + "-" + ('0' + accidentDate.getDate()).slice(-2);
        return (
            <tr key={accident.id}>
              <i className="fa fa-fw fa-car" style={{color: 'black', marginRight:'10px', fontSize: '1.5em' }}/>
              <td>{accident.id}</td>
              <td>{parseAccidentDate}</td>
              <td>{accident.accidentDescription}</td>
              <td>{accident.guiltyPartyPolicyNumber}</td>
              <td>{accident.guiltyPartyRegistrationNumber}</td>
            </tr>
        )
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
                <div className="table-inner">
                    <table class="table table-bordered" id="accidents-table">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Numer szkody</th>
                            <th scope="col">Data wypadku</th>
                            <th scope="col">Opis</th>
                            <th scope="col">Numer polisy sprawcy</th>
                            <th scope="col">Numer rejestracyjny sprawcy</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.accidents.map(this.renderAccident)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Accidents;