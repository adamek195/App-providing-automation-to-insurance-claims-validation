import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewAccidentSideBar from '../MenuComponents/NewAccidentSideBar';
import axios from 'axios';
import '../../Styles/NewAccident.css';
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"

class NewAccident extends Component {

    state = {
        selectedPolicy: "",
        guiltyPartyAccidentDatetime: "",
        guiltyPartyAccidentDescription: "",
        guiltyPartyPolicyNumber: "",
        guiltyPartyRegistrationNumber: "",
        accidentImage: "",
    }

    handleChangeRadioButton = (event) => {
        const value = event.target.value;
        this.setState({
            selectedPolicy: value,
        });
    }

    handleChangeGuiltyPartyAccident = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handleChangeGuiltyPartyAccidentImage = (event) => {
        this.setState({
            accidentImage: event.target.files[0]
          })
    }

    handleSubmitGuiltyPartyAccident = (e) => {
        e.preventDefault()
        this.addGuiltyPartyAccident();
    }

    addGuiltyPartyAccident = () => {
        const data = new FormData()
        data.append('AccidentDateTime', this.state.guiltyPartyAccidentDatetime.toString());
        data.append('AccidentDescription', this.state.guiltyPartyAccidentDescription);
        data.append('GuiltyPartyPolicyNumber', this.state.guiltyPartyPolicyNumber);
        data.append('GuiltyPartyRegistrationNumber', this.state.guiltyPartyRegistrationNumber);
        data.append('AccidentImage', this.state.accidentImage);

        axios.post(guiltyPartyAccidentsUrl, data)
            .then((response) => {
                console.warn(response);
            })

    }

    render() {
        return(
            <div>
                <UserNavBar />
                <NewAccidentSideBar />
                <div className="accidents-manager-wrapper">
                    <div className="accidents-manager-inner">
                    <h3 style={{textAlign: 'center'}}>Zgłoś szkodę</h3>
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
                    <form>
                        <div className="accidents-manager-wrapper-guilty-oc">
                            <div className="accidents-manager-inner-guilty-oc">
                                <h3 style={{textAlign: 'center'}}>Ubezpieczenie sprawcy (OC)</h3>
                                <i className="fa fa-fw fa-taxi" id="new-accident-icon" style={{color: 'black' , fontSize: '3.5em' }} />
                                <div className="form-group p-mx-5">
                                    <label>Data wypadku</label>
                                    <input name="guiltyPartyAccidentDatetime"
                                        type="date"
                                        className="form-control"
                                        placeholder="Wprowadź datę wypadku"
                                        value={this.state.guiltyPartyAccidentDatetime}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                </div>
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Opis</label>
                                    <textarea name="guiltyPartyAccidentDescription" style={{height: '100px'}}
                                        className="form-control"
                                        placeholder="Wprowadź opis zdarzenia"
                                        value={this.state.guiltyPartyAccidentDescription}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                </div>
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Numer polisy sprawcy</label>
                                    <input name="guiltyPartyPolicyNumber"
                                        type="text"
                                        className="form-control"
                                        placeholder="Wprowadź numer polisy sprawcy"
                                        value={this.state.guiltyPartyPolicyNumber}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                </div>
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Numer rejestracyjny sprawcy</label>
                                    <input name="guiltyPartyRegistrationNumber"
                                        type="text"
                                        className="form-control"
                                        placeholder="Wprowadź numer rejestracyjny sprawcy"
                                        value={this.state.guiltyPartyRegistrationNumber}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                </div>
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Zdjęcie</label>
                                    <input name="accidentImage"
                                        type="file"
                                        className="form-control"
                                        onChange={this.handleChangeGuiltyPartyAccidentImage}/>
                                </div>
                                <br/>
                                <div>
                                    <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleSubmitGuiltyPartyAccident}>Zgłoś szkodę
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>}
            </div>
        );
    }
}

export default NewAccident;