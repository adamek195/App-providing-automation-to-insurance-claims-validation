import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewAccidentSideBar from '../MenuComponents/NewAccidentSideBar';
import axios from 'axios';
import '../../Styles/NewAccident.css';
import history from '../../History';
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"

class NewAccident extends Component {

    state = {
        selectedPolicy: "",
        guiltyPartyAccidentDatetime: "",
        guiltyPartyAccidentDescription: "",
        guiltyPartyPolicyNumber: "",
        guiltyPartyRegistrationNumber: "",
        accidentImage: "",
        guiltyPartyAccidentError: false,

        errors: {
            guiltyPartyAccidentDatetime: false,
            guiltyPartyAccidentDescription: false,
        }
    }

    messages = {
        guiltyPartyAccidentDatetime_incorrect: 'Data zdarzenia jest wymagana',
        guiltyPartyAccidentDescription_incorrect: 'Opis zdarzenia jest wymagany',
        server_error: "Wprowadzone dane o szkodzie są nieprawidłowe. Spróbuj jeszcze raz"
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
            [name]: value,
            guiltyPartyAccidentError: false
        });
    }

    handleChangeGuiltyPartyAccidentImage = (event) => {
        this.setState({
            accidentImage: event.target.files[0]
          })
    }

    formValidationGuiltyPartyAccident() {
        let guiltyPartyAccidentDatetime =  false;
        let guiltyPartyAccidentDescription = false;
        let correct = false;
        if(this.state.guiltyPartyAccidentDatetime !== ''){
            guiltyPartyAccidentDatetime = true;
        }
        if(this.state.guiltyPartyAccidentDescription.length > 0){
            guiltyPartyAccidentDescription = true;
        }
        if (guiltyPartyAccidentDatetime && guiltyPartyAccidentDescription) {
          correct = true
        }
        return ({
            guiltyPartyAccidentDatetime,
            guiltyPartyAccidentDescription,
            correct,
        })
    }

    handleSubmitGuiltyPartyAccident = (e) => {
        e.preventDefault()
        const validation = this.formValidationGuiltyPartyAccident();
        if (validation.correct){
            this.addGuiltyPartyAccident();

            this.setState({
                errors: {
                    guiltyPartyAccidentDatetime: false,
                    guiltyPartyAccidentDescription: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    guiltyPartyAccidentDatetime: !validation.guiltyPartyAccidentDatetime,
                    guiltyPartyAccidentDescription: !validation.guiltyPartyAccidentDescription,
              }
            })
        }
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
                if(response.status === 201)
                    history.push("/accidents")
                if(response.status === 500)
                    history.push("/internal-server-error");
                if(response.status === 401)
                    history.push("/unauthorized");
            })
            .catch(() => {
                this.setState({
                    guiltyPartyAccidentError: true
                })
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
                                    {this.state.errors.guiltyPartyAccidentDatetime && <span style={{ fontSize: '15px'}}>{this.messages.guiltyPartyAccidentDatetime_incorrect}</span>}
                                </div>
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Opis</label>
                                    <textarea name="guiltyPartyAccidentDescription" style={{height: '100px'}}
                                        className="form-control"
                                        placeholder="Wprowadź opis zdarzenia"
                                        value={this.state.guiltyPartyAccidentDescription}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                        {this.state.errors.guiltyPartyAccidentDescription && <span style={{ fontSize: '15px'}}>{this.messages.guiltyPartyAccidentDescription_incorrect}</span>}
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
                                {this.state.guiltyPartyAccidentError && <span style={{ fontSize: '15px', color: 'red'}}>{this.messages.server_error}</span>}
                                <div className="text-center">
                                    <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleSubmitGuiltyPartyAccident}>Zgłoś szkodę
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>}
                {this.state.selectedPolicy === "UserPolicy" &&
                <div className="d-flex justify-content-center">
                    <div className="accidents-manager-user">
                        <div className="accidents-inner-user">
                            <h5 style={{textAlign: 'center'}}>Moje ubezpieczenie (AC)</h5>
                            <i className="fa fa-fw fa-taxi" id="new-policy-icon" style={{color: 'black' , fontSize: '3em' }} />
                            <div className="form-group p-mx-5">
                                <label>Numer polisy</label>
                                <input name="userPolicyNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer swojej polisy"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Data zdarzenia</label>
                                <input name="userAccidentDateTime"
                                    type="date"
                                    className="form-control"
                                    placeholder="Wprowadź datę zdarzenia"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Opis zdarzenia</label>
                                <textarea name="userAccidentDescription"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź opis zdarzenia"
                                    />
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="accidentImage"
                                    type="file"
                                    className="form-control"
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="accidents-manager-user">
                        <div className="accidents-inner-user">
                            <h5 style={{textAlign: 'center'}}>Moje ubezpieczenie (OC)</h5>
                            <i className="fa fa-fw fa-taxi" id="new-policy-icon" style={{color: 'black' , fontSize: '3em' }} />
                            <div className="form-group p-mx-5">
                                <label>Numer polisy</label>
                                <input name="userPolicyNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer swojej polisy"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Data zdarzenia</label>
                                <input name="userAccidentDateTime"
                                    type="date"
                                    className="form-control"
                                    placeholder="Wprowadź datę zdarzenia"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Opis zdarzenia</label>
                                <textarea name="userAccidentDescription"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź opis zdarzenia"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Numer rejestracyjny poszkodowanego</label>
                                <input name="victimRegistrationNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer rejestracyjny poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Imię poszkodowanego</label>
                                <input name="victimFirstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź imię poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Naziwsko poszkodowanego</label>
                                <input name="victimLastName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź nazwisko poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="accidentImage"
                                    type="file"
                                    className="form-control"
                                    />
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default NewAccident;