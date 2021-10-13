import React, { Component } from 'react';
import axios from 'axios';
import { policiesUrl } from "../../ConstUrls"
import history from '../../History';
import UpdatePolicy from './UpdatePolicy';
import UserNavBar from '../MenuComponents/UserNavBar';
import PoliciesSideBar from '../MenuComponents/PoliciesSideBar';
import '../../Styles/Policies.css';

class Policies extends Component {

    state = {
        policies: [],
        policyNumber: "",
        policyId: "",
        policyNavigator: "policies",
        policyNumberError: false,
        deleteServerError: false,
    }

    messages = {
        policyNumber_notFind: 'Nie posiadasz polisy o takim numerze',
        server_error: 'Coś poszło nie tak spróbuj jeszcze raz'
    }

    componentDidMount() {
        this.getPolicies()
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            policyNumberError: false,
            deleteServerError: false,
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

    deletePolicy = (e) => {
        e.preventDefault()
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.policyNumber)
        if((policy === undefined) || (policy === null))
            this.setState({
                policyNumberError: true,
            })
        else{
            let deleteRequest = `${policiesUrl}/${policy.id}`
            axios.delete(deleteRequest)
            .then((response) => {
                if(response.status === 500)
                    history.push("/internal-server-error");
                if(response.status === 401)
                    history.push("/unauthorized");
                })
            .then(() => {
                this.componentDidMount()
            })
            .catch(() => {
                this.setState({
                    deleteServerError: true
                })
            })
        }
    }

    changeToUpdatePolicy = (e) => {
        e.preventDefault()
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.policyNumber)
        if((policy === undefined) || (policy === null))
            this.setState({
                policyNumberError: true,
            })
        else{
            this.setState({
                policyId: policy.id,
                policyNavigator: 'update-policy',
            })
        }
    }

    renderPolicy(policy){
        let creationDate = new Date(policy.policyCreationDate)
        let parseCreationDate = creationDate.getFullYear() + "-" + ('0' + (creationDate.getMonth()+1)).slice(-2) + "-" + ('0' + creationDate.getDate()).slice(-2);
        let expireDate = new Date(policy.policyExpireDate)
        let expireCreationDate = expireDate.getFullYear() + "-" + ('0' + (expireDate.getMonth()+1)).slice(-2) + "-" + ('0' + expireDate.getDate()).slice(-2);
        return (
            <tr key={policy.id}>
              <i className="fa fa-fw fa-file-text" style={{color: 'black', fontSize: '1.5em' }}/>
              <td>{policy.policyNumber}</td>
              <td>{parseCreationDate}</td>
              <td>{expireCreationDate}</td>
              <td>{policy.company}</td>
              <td>{policy.typeOfInsurance}</td>
              <td>{policy.registrationNumber}</td>
              <td>{policy.mark}</td>
              <td>{policy.model}</td>
            </tr>
        )
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <PoliciesSideBar />
               {this.state.policyNavigator === "policies" && (
                <div>
                    <div className="policies-manager-wrapper">
                        <div className="policies-manager-inner">
                            <h3 style={{textAlign: 'center'}}>Zarządzaj polisami</h3>
                            <div className="d-flex justify-content-center">
                                <input name="policyNumber" style={{margin: '10px', width:'300px'}}
                                        type="text"
                                        className="form-control"
                                        placeholder="Numer polisy do edycji lub usunięcia"
                                        value={this.state.policyNumber}
                                        onChange={this.handleChange}/>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.changeToUpdatePolicy}>Edytuj polisę
                                </button>
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.deletePolicy}>Usuń polisę
                                </button>
                                <br />
                            </div>
                            {this.state.policyNumberError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.policyNumber_notFind}</span>}
                            {this.state.deleteServerError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.server_error}</span>}
                        </div>
                    </div>
                    <div className="table-inner">
                        <table class="table table-bordered" id="policies-table">
                            <thead class="thead-light">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Numer Polisy</th>
                                <th scope="col">Data utworzenia</th>
                                <th scope="col">Data wygaśnięcia</th>
                                <th scope="col">Ubezpieczyciel</th>
                                <th scope="col">Ubezpieczenie</th>
                                <th scope="col">Numer rejestracyjny</th>
                                <th scope="col">Marka</th>
                                <th scope="col">Model</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.policies.map(this.renderPolicy)}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
                {this.state.policyNavigator === "update-policy" && <UpdatePolicy policyId={this.state.policyId} />}
            </div>
        );
    }
}

export default Policies;