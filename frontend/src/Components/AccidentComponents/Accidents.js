import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../../History.js';
import { policiesUrl } from "../../ConstUrls"
import { userAccidentsUrl } from "../../ConstUrls"
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"
import UserNavBar from '../MenuComponents/UserNavBar';
import AccidentsSideBar from '../MenuComponents/AccidentsSideBar';
import '../../Styles/Accidents.css';

class Accidents extends Component {
    state = {
        selectedPolicy: "",
        userAccidents: [],
        guiltyPartyAccidents: [],
        policies: [],
        policyNumber: "",
        typeOfInsurance: "",
        guiltyPartyAccidentId: "",
        userAccidentId: "",
        policyNumberError: false,
        accidentIdError: false,
    }

    messages = {
        policyNumber_notFind: 'Nie posiadasz polisy o takim numerze',
        accidentId_notFind: 'Nie posiadasz zgłoszonej szkody o takim identyfikatorze',
        server_error: 'Coś poszło nie tak spróbuj jeszcze raz'
    }

    componentDidMount() {
        this.getPolicies()
        this.getGuiltyPartyAccidents()
    }

    handleChangeRadioButton = (event) => {
        const value = event.target.value;
        this.setState({
            selectedPolicy: value
        });
    }

    handleChangeUserAccidents = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            policyNumberError: false,
            accidentIdError: false,
        });
    }

    handleChangeGuiltyPartyAccidents = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            accidentIdError: false,
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

    getUserAccidents = (e) => {
        e.preventDefault()
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.policyNumber)
        console.log(policy)
        if((policy === undefined) ||(policy === null)){
            this.setState({
                userAccidents: [],
                policyNumberError: true,
            })
        }
        else{
            let getRequest = `${userAccidentsUrl}/${policy.id}`
            axios.get(getRequest)
            .then((response) => {
                this.setState({
                    userAccidents: response.data,
                    typeOfInsurance: policy.typeOfInsurance,
                })
            })
            .catch(() => {
                console.log("błąd wypadek")
            })
        }
    }

    changeToUpdateUserAccident = (e) => {
        e.preventDefault()
        let accident = this.state.userAccidents.find(accident => accident.id === parseInt(this.state.userAccidentId))
        if((accident === undefined) || (accident === null))
            this.setState({
                accidentIdError: true,
            })
        else{
            console.log("Tu bedzie update");
        }
    }

    deleteUserAccident = (e) => {
        e.preventDefault()
        let accident = this.state.userAccidents.find(accident => accident.id === parseInt(this.state.userAccidentId))
        if((accident === undefined) ||(accident === null))
            this.setState({
                accidentIdError: true,
            })
        else{
            console.log("Tu będzie usunięcie");
        }
    }

    getGuiltyPartyAccidents() {
        axios.get(guiltyPartyAccidentsUrl)
        .then((response) => {
            this.setState({
                guiltyPartyAccidents: response.data
            })
        })
        .catch(() => {
            history.push("/unauthorized");
        })
    }

    changeToUpdateGuiltyPartyAccident = (e) => {
        e.preventDefault()
        let accident = this.state.guiltyPartyAccidents.find(accident => accident.id === parseInt(this.state.guiltyPartyAccidentId))
        if((accident === undefined) || (accident === null))
            this.setState({
                accidentIdError: true,
            })
        else{
            console.log("Tu bedzie update");
        }
    }

    deleteGuiltyPartyAccident = (e) => {
        e.preventDefault()
        let accident = this.state.guiltyPartyAccidents.find(accident => accident.id === parseInt(this.state.guiltyPartyAccidentId))
        if((accident === undefined) ||(accident === null))
            this.setState({
                accidentIdError: true,
            })
        else{
            console.log("Tu będzie usunięcie");
        }
    }

    renderUserAccidentOC = (accident) => {
        let accidentDate = new Date(accident.accidentDateTime)
        let parseAccidentDate = accidentDate.getFullYear() + "-" + ('0' + (accidentDate.getMonth()+1)).slice(-2) + "-" + ('0' + accidentDate.getDate()).slice(-2);
        let victim = accident.victimFirstName + " " + accident.victimLastName;
        let victimRegistrationNumber = accident.victimRegistrationNumber
        return (
            <tr key={accident.id}>
              <i className="fa fa-fw fa-car" style={{color: 'black', marginRight:'10px', fontSize: '1.5em' }}/>
              <td>{accident.id}</td>
              <td>{parseAccidentDate}</td>
              <td>{accident.accidentDescription}</td>
              <td>{victimRegistrationNumber}</td>
              <td>{victim}</td>
            </tr>
        )
    }

    renderUserAccidentAC = (accident) => {
        let accidentDate = new Date(accident.accidentDateTime)
        let parseAccidentDate = accidentDate.getFullYear() + "-" + ('0' + (accidentDate.getMonth()+1)).slice(-2) + "-" + ('0' + accidentDate.getDate()).slice(-2);
        return (
            <tr key={accident.id}>
              <i className="fa fa-fw fa-car" style={{color: 'black', marginRight:'10px', fontSize: '1.5em' }}/>
              <td>{accident.id}</td>
              <td>{parseAccidentDate}</td>
              <td>{accident.accidentDescription}</td>
            </tr>
        )
    }

    renderGuiltyPartyAccident = (accident) => {
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
                    <h4 style={{textAlign: 'center'}}>Właściciel polisy</h4>
                        <form className="d-flex justify-content-center">
                            <div className="radio" style={{marginRight: '20px'}}>
                                <label>
                                <input
                                    type="radio"
                                    value="UserPolicy"
                                    checked={this.state.selectedPolicy === "UserPolicy"}
                                    onChange={this.handleChangeRadioButton}
                                />
                                Własna polisa
                                </label>
                            </div>
                            <div className="radio" style={{marginLeft: '20px'}}>
                                <label>
                                <input
                                    type="radio"
                                    value="GuiltyPartyPolicy"
                                    checked={this.state.selectedPolicy === "GuiltyPartyPolicy"}
                                    onChange={this.handleChangeRadioButton}
                                />
                                Polisa sprawcy
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.selectedPolicy === "UserPolicy" &&
                <div>
                    <div className="accidents-manager-wrapper">
                        <div className="accidents-manager-inner">
                            <h4 style={{textAlign: 'center'}}>Zarządzaj szkodami zgłoszonymi z własnej polisy</h4>
                            <div className="d-flex justify-content-center">
                                    <input name="policyNumber" style={{margin: '10px', width:'300px'}}
                                            type="text"
                                            className="form-control"
                                            placeholder="Numer polisy ubezpieczeniowej"
                                            value={this.state.policyNumber}
                                            onChange={this.handleChangeUserAccidents}/>
                                    <button type="submit" style={{margin: '10px'}}
                                        className="btn btn-primary p-2"
                                        onClick={this.getUserAccidents}>Zobacz szkody
                                    </button>
                                    <p className="p-2">Nie pamietasz numer swojej polisy?</p>
                                    <Link className="nav-link p-2" to={"/policies"}>Zobacz polisy</Link>
                            </div>
                            {this.state.policyNumberError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.policyNumber_notFind}</span>}
                            <hr style={{color: 'black', backgroundColor: 'black',height: 3}}/>
                            <div className="d-flex justify-content-center">
                                <input name="userAccidentId" style={{margin: '10px', width:'310px'}}
                                        type="number"
                                        className="form-control"
                                        placeholder="Numer szkody do edycji lub usunięcia"
                                        value={this.state.userAccidentId}
                                        onChange={this.handleChangeUserAccidents}/>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.changeToUpdateUserAccident}>Edytuj szkodę
                                </button>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.deleteUserAccident}>Usuń szkodę
                                </button>
                                <br />
                            </div>
                            {this.state.accidentIdError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.accidentId_notFind}</span>}
                        </div>
                    </div>
                    {this.state.typeOfInsurance === "OC" &&
                    <div className="table-inner">
                        <table class="table table-bordered" id="accidents-table">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Numer szkody</th>
                                <th scope="col">Data wypadku</th>
                                <th scope="col">Opis</th>
                                <th scope="col">Numer rejestracyjny poszkodowanego</th>
                                <th scope="col">Poszkodowany</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.userAccidents.map(this.renderUserAccidentOC)}
                            </tbody>
                        </table>
                    </div>}
                    {this.state.typeOfInsurance === "AC" &&
                    <div className="table-inner">
                        <table class="table table-bordered" id="accidents-table">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Numer szkody</th>
                                <th scope="col">Data wypadku</th>
                                <th scope="col">Opis</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.userAccidents.map(this.renderUserAccidentAC)}
                            </tbody>
                        </table>
                    </div>}
                </div>}
                {this.state.selectedPolicy === "GuiltyPartyPolicy" &&
                <div>
                    <div className="accidents-manager-wrapper">
                        <div className="accidents-manager-inner">
                            <h4 style={{textAlign: 'center'}}>Zarządzaj szkodami zgłoszonymi z polisy sprawcy</h4>
                            <div className="d-flex justify-content-center">
                                <input name="guiltyPartyAccidentId" style={{margin: '10px', width:'310px'}}
                                        type="number"
                                        className="form-control"
                                        placeholder="Numer szkody do edycji lub usunięcia"
                                        value={this.state.guiltyPartyAccidentId}
                                        onChange={this.handleChangeGuiltyPartyAccidents}/>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.changeToUpdateGuiltyPartyAccident}>Edytuj szkodę
                                </button>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.deleteGuiltyPartyAccident}>Usuń szkodę
                                </button>
                                <br />
                            </div>
                            {this.state.accidentIdError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.accidentId_notFind}</span>}
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
                                {this.state.guiltyPartyAccidents.map(this.renderGuiltyPartyAccident)}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Accidents;