import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserNavBar from '../MenuComponents/UserNavBar';
import DocumentSideBar from '../MenuComponents/DocumentSideBar';
import axios from 'axios';
import history from '../../History';
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"
import { policiesUrl } from "../../ConstUrls"
import { userAccidentsUrl } from "../../ConstUrls"
import '../../Styles/DocumentGenerator.css';

class DocumentGenerator extends Component {
    state = {
        selectedPolicy: "",
        guiltyPartyAccidentId: "",
        policies: [],
        policyNumber: "",
        userAccidentId: "",
        guiltyPartyAccidentDocumentError: false,
        policyNumberError: false,
        userAccidentDocumentError: false,
    }

    messages = {
        guiltyPartyAccident_error: 'Nie można wygenerować dokumentu o takim numerze zdarzenia.',
        policyNumberError_error: 'Nie posiadasz polisy o takim numerze',
        userAccident_error: 'Nie można wygenerować dokumentu o takim numerze polisy i zdarzenia.',
    }

    componentDidMount() {
        this.getPolicies()
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
            userAccidentDocumentError: false,
        });
    }

    handleChangeGuiltyPartyAccidents = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            guiltyPartyAccidentDocumentError: false,
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

    generateUserAccidentDocument = (e) => {
        e.preventDefault()
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.policyNumber)
        if((policy === undefined) ||(policy === null)){
            this.setState({
                policyNumberError: true,
            })
        }else{
            if(policy.typeOfInsurance === 'AC'){
                let generateDocumentRequest = `${userAccidentsUrl}/${policy.id}/${this.state.userAccidentId}/Documents/AC`
                axios({
                    url: generateDocumentRequest,
                    method: 'POST',
                    responseType: 'blob',
                }).then((response) => {
                    if(response.status === 500)
                            history.push("/internal-server-error");
                    if(response.status === 401)
                        history.push("/unauthorized");
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'szkoda.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(() => {
                    this.setState({
                        userAccidentDocumentError: true
                    })
                });
            }
            else if(policy.typeOfInsurance === 'OC'){
                let generateDocumentRequest = `${userAccidentsUrl}/${policy.id}/${this.state.userAccidentId}/Documents/OC`
                axios({
                    url: generateDocumentRequest,
                    method: 'POST',
                    responseType: 'blob',
                }).then((response) => {
                    if(response.status === 500)
                            history.push("/internal-server-error");
                    if(response.status === 401)
                        history.push("/unauthorized");
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'szkoda.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(() => {
                    this.setState({
                        userAccidentDocumentError: true
                    })
                });
            }
        }
    }

    generateGuiltyPartyAccidentDocument = () => {
        let generateDocumentRequest = `${guiltyPartyAccidentsUrl}/${this.state.guiltyPartyAccidentId}/Documents`
        axios({
            url: generateDocumentRequest,
            method: 'POST',
            responseType: 'blob',
        }).then((response) => {
            if(response.status === 500)
                    history.push("/internal-server-error");
            if(response.status === 401)
                history.push("/unauthorized");
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'szkoda.pdf');
            document.body.appendChild(link);
            link.click();
        })
        .catch(() => {
            this.setState({
                guiltyPartyAccidentDocumentError: true
            })
        });
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <DocumentSideBar />
                <div className="accidents-document-manager-wrapper">
                    <div className="accidents-document-manager-inner">
                        <h3 style={{textAlign: 'center'}}>Wygeneruj dokument ze szkodą</h3>
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
                    <div className="accidents-document-manager-wrapper">
                        <div className="accidents-document-manager-inner">
                            <h4 style={{textAlign: 'center'}}>Wygeneruj dokument ze zgłoszoną szkodą z własnej polisy</h4>
                            <div className="d-flex justify-content-center">
                                <input name="policyNumber" style={{margin: '10px', width:'250px'}}
                                    type="text"
                                    className="form-control"
                                    placeholder="Numer polisy ubezpieczeniowej"
                                    value={this.state.policyNumber}
                                    onChange={this.handleChangeUserAccidents}/>
                                <p className="p-2">Nie pamietasz numer swojej polisy?</p>
                                <Link className="nav-link p-2" to={"/policies"}>Zobacz polisy</Link>
                            </div>
                            {this.state.policyNumberError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.policyNumberError_error}</span>}
                            <div className="d-flex justify-content-center">
                                <input name="userAccidentId" style={{margin: '10px', width:'250px'}}
                                    type="number"
                                    className="form-control"
                                    placeholder="Numer szkody"
                                    value={this.state.userAccidentId}
                                    onChange={this.handleChangeUserAccidents}/>
                                <p className="p-2">Nie pamietasz numeru szkody?</p>
                                <Link className="nav-link p-2" to={"/accidents"}>Zobacz szkody</Link>
                            </div>
                            <div>
                                <button type="submit" style={{margin: '10px'}}
                                        className="btn btn-primary p-2"
                                        onClick={this.generateUserAccidentDocument}>Wygeneruj dokument
                                </button>
                            </div>
                            {this.state.userAccidentDocumentError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.userAccident_error}</span>}
                        </div>
                    </div>
                </div>}
                {this.state.selectedPolicy === "GuiltyPartyPolicy" &&
                <div>
                    <div className="accidents-document-manager-wrapper">
                        <div className="accidents-document-manager-inner">
                            <h4 style={{textAlign: 'center'}}>Wygeneruj dokument ze zgłoszoną szkodą z polisy sprawcy</h4>
                            <div className="d-flex justify-content-center">
                                <input name="guiltyPartyAccidentId" style={{margin: '10px', width:'250px'}}
                                    type="number"
                                    className="form-control"
                                    placeholder="Numer szkody"
                                    value={this.state.guiltyPartyAccidentId}
                                    onChange={this.handleChangeGuiltyPartyAccidents}/>
                                <p className="p-2">Nie pamietasz numeru szkody?</p>
                                <Link className="nav-link p-2" to={"/accidents"}>Zobacz szkody</Link>
                            </div>
                            <div>
                                <button type="submit" style={{margin: '10px'}}
                                        className="btn btn-primary p-2"
                                        onClick={this.generateGuiltyPartyAccidentDocument}>Wygeneruj dokument
                                </button>
                            </div>
                            {this.state.guiltyPartyAccidentDocumentError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.guiltyPartyAccident_error}</span>}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default DocumentGenerator;