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
    }

    handleChangeRadioButton = (event) => {
        const value = event.target.value;
        this.setState({
            selectedPolicy: value
        });
    }

    handleChangeGuiltyPartyAccidents = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    generateGuiltyPartyAccidentDocument = () => {
        let generateDocumentRequest = `${guiltyPartyAccidentsUrl}/${this.state.guiltyPartyAccidentId}/Documents`
        axios({
            url: generateDocumentRequest,
            method: 'POST',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'szkoda.pdf');
            document.body.appendChild(link);
            link.click();
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
                                <button type="submit" style={{margin: '10px'}}
                                    className="btn btn-primary p-2"
                                    onClick={this.generateGuiltyPartyAccidentDocument}>Wygeneruj dokument
                                </button>
                                <p className="p-2">Nie pamietasz numeru szkody?</p>
                                <Link className="nav-link p-2" to={"/accidents"}>Zobacz szkody</Link>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default DocumentGenerator;