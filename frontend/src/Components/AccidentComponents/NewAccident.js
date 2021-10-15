import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewAccidentSideBar from '../MenuComponents/NewAccidentSideBar';
import axios from 'axios';
import '../../Styles/NewAccident.css';
import history from '../../History';
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"
import { policiesUrl } from "../../ConstUrls"

class NewAccident extends Component {

    state = {
        selectedPolicy: "",
        policyNumberError: "",
        policies: [],
        policyId: "",

        guiltyPartyAccidentDatetime: "",
        guiltyPartyAccidentDescription: "",
        guiltyPartyPolicyNumber: "",
        guiltyPartyRegistrationNumber: "",
        guiltyPartyAccidentImage: "",
        guiltyPartyAccidentError: false,

        userPolicyNumberAC: "",
        userAccidentDateTimeAC: "",
        userAccidentDescriptionAC: "",
        userAccidentImageAC: "",
        userAccidentACError: false,

        errors: {
            userPolicyTypeOfInsuranceAC: false,
            userAccidentDateTimeAC: false,
            userAccidentDescriptionAC: false,
            guiltyPartyAccidentDatetime: false,
            guiltyPartyAccidentDescription: false,
        }
    }

    messages = {
        policyNumber_notFind: 'Nie posiadasz polisy o takim numerze',
        userPolicyTypeOfInsuranceAC_incorrect: 'Zły rodzaj polisy',
        userAccidentDateTimeAC_incorrect: 'Data zdarzenia jest wymagana',
        userAccidentDescriptionAC_incorrect: 'Opis zdarzenia  jest wymagany',
        guiltyPartyAccidentDatetime_incorrect: 'Data zdarzenia jest wymagana',
        guiltyPartyAccidentDescription_incorrect: 'Opis zdarzenia jest wymagany',
        server_error: "Wprowadzone dane o szkodzie są nieprawidłowe. Spróbuj jeszcze raz"
    }

    componentDidMount() {
        this.getPolicies()
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

    handleChangeUserAccidentAC = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            userAccidentACError: false,
            policyNumberError: false,
        });
    }

    handleChangeGuiltyPartyAccidentImage = (event) => {
        this.setState({
            guiltyPartyAccidentImage: event.target.files[0]
          })
    }

    handleUserAccidentImageAC = (event) => {
        this.setState({
            userAccidentImageAC: event.target.files[0]
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

    formValidationUserAccidentAC() {
        let userAccidentDatetimeAC =  false;
        let userAccidentDescriptionAC = false;
        let userPolicyTypeOfInsuranceAC = false;
        let correct = false;
        let policy = this.state.policies.find(policy => policy.policyNumber === this.state.userPolicyNumberAC)
        if((policy === undefined) ||(policy === null)){
            this.setState({
                policyNumberError: true,
            })
        }else {
            this.setState({
               policyId: policy.id,
            })
            if(this.state.userAccidentDateTimeAC !== ''){
                userAccidentDatetimeAC = true;
            }
            if(this.state.userAccidentDescriptionAC.length > 0){
                userAccidentDescriptionAC = true;
            }
            if(policy.typeOfInsurance === "AC"){
                userPolicyTypeOfInsuranceAC = true;
            }
            if (userAccidentDatetimeAC && userAccidentDescriptionAC && userPolicyTypeOfInsuranceAC) {
                correct = true
            }
        }
        return ({
            userPolicyTypeOfInsuranceAC,
            userAccidentDatetimeAC,
            userAccidentDescriptionAC,
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

    handleSubmitUserAccidentAC = (e) => {
        e.preventDefault()
        const validation = this.formValidationUserAccidentAC();
        if (validation.correct){
            console.log("jest git");

            this.setState({
                errors: {
                    userPolicyTypeOfInsuranceAC: false,
                    userAccidentDateTimeAC: false,
                    userAccidentDescriptionAC: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    userPolicyTypeOfInsuranceAC: !validation.userPolicyTypeOfInsuranceAC,
                    userAccidentDateTimeAC: !validation.userAccidentDateTimeAC,
                    userAccidentDescriptionAC: !validation.userAccidentDescriptionAC,
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
        data.append('AccidentImage', this.state.guiltyPartyAccidentImage);

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
                                </div>
                                {this.state.errors.guiltyPartyAccidentDatetime && <span style={{ fontSize: '15px'}}>{this.messages.guiltyPartyAccidentDatetime_incorrect}</span>}
                                <br/>
                                <div className="form-group p-mx-5">
                                    <label>Opis</label>
                                    <textarea name="guiltyPartyAccidentDescription" style={{height: '100px'}}
                                        className="form-control"
                                        placeholder="Wprowadź opis zdarzenia"
                                        value={this.state.guiltyPartyAccidentDescription}
                                        onChange={this.handleChangeGuiltyPartyAccident}/>
                                </div>
                                {this.state.errors.guiltyPartyAccidentDescription && <span style={{ fontSize: '15px'}}>{this.messages.guiltyPartyAccidentDescription_incorrect}</span>}
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
                                    <input name="guiltyPartyAccidentImage"
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
                                <input name="userPolicyNumberAC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer swojej polisy"
                                    value={this.state.userPolicyNumberAC}
                                    onChange={this.handleChangeUserAccidentAC}/>
                            </div>
                            {this.state.policyNumberError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.policyNumber_notFind}</span>}
                            {this.state.errors.userPolicyTypeOfInsuranceAC && <span style={{ fontSize: '15px' , color: 'red'}}>{this.messages.userPolicyTypeOfInsuranceAC_incorrect}</span>}
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Data zdarzenia</label>
                                <input name="userAccidentDateTimeAC"
                                    type="date"
                                    className="form-control"
                                    placeholder="Wprowadź datę zdarzenia"
                                    value={this.state.userAccidentDateTimeAC}
                                    onChange={this.handleChangeUserAccidentAC}/>
                            </div>
                            {this.state.errors.userAccidentDateTimeAC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDateTimeAC_incorrect}</span>}
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Opis zdarzenia</label>
                                <textarea name="userAccidentDescriptionAC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź opis zdarzenia"
                                    value={this.state.userAccidentDescriptionAC}
                                    onChange={this.handleChangeUserAccidentAC}/>
                            </div>
                            {this.state.errors.userAccidentDescriptionAC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDescriptionAC_incorrect}</span>}
                            <br />
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="userAccidentImageAC"
                                    type="file"
                                    className="form-control"
                                    onChange={this.handleUserAccidentImageAC}/>
                            </div>
                            <br />
                            <div className="text-center">
                                    <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleSubmitUserAccidentAC}>Zgłoś szkodę
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className="accidents-manager-user">
                        <div className="accidents-inner-user">
                            <h5 style={{textAlign: 'center'}}>Moje ubezpieczenie (OC)</h5>
                            <i className="fa fa-fw fa-taxi" id="new-policy-icon" style={{color: 'black' , fontSize: '3em' }} />
                            <div className="form-group p-mx-5">
                                <label>Numer polisy</label>
                                <input name="userPolicyNumberOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer swojej polisy"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Data zdarzenia</label>
                                <input name="userAccidentDateTimeOC"
                                    type="date"
                                    className="form-control"
                                    placeholder="Wprowadź datę zdarzenia"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Opis zdarzenia</label>
                                <textarea name="userAccidentDescriptionOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź opis zdarzenia"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Numer rejestracyjny poszkodowanego</label>
                                <input name="victimRegistrationNumberOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer rejestracyjny poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Imię poszkodowanego</label>
                                <input name="victimFirstNameOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź imię poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Naziwsko poszkodowanego</label>
                                <input name="victimLastNameOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź nazwisko poszkodowanego"
                                    />
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="userAccidentImageOC"
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