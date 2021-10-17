import React, { Component } from 'react';
import history from '../../History';
import { userAccidentsUrl } from "../../ConstUrls"
import axios from 'axios';
import '../../Styles/UpdateUserAccident.css';

class UpdateUserAccident extends Component {
    state = {
        policyId: this.props.policyId,
        userAccidentId: this.props.userAccidentId,
        typeOfInsurance: this.props.typeOfInsurance,

        userAccidentDateTimeAC: "",
        userAccidentDescriptionAC: "",
        userAccidentImageAC: "",
        userAccidentACError: false,

        userAccidentDateTimeOC: "",
        userAccidentDescriptionOC: "",
        userAccidentImageOC: "",
        victimRegistrationNumber: "",
        victimFirstName: "",
        VictimLastName: "",
        userAccidentOCError: false,

        errors: {
            userAccidentDateTimeAC: false,
            userAccidentDescriptionAC: false,
            userAccidentDateTimeOC: false,
            userAccidentDescriptionOC: false,
        }
    }
    messages = {
        userAccidentDateTime_incorrect: 'Data zdarzenia jest wymagana',
        userAccidentDescription_incorrect: 'Opis zdarzenia  jest wymagany',
        server_error: "Wprowadzone dane o szkodzie są nieprawidłowe. Spróbuj jeszcze raz"
    }

    handleChangeUserAccidentAC = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            userAccidentACError: false,
        });
    }

    handleChangeUserAccidentOC = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            userAccidentOCError: false,
        });
    }

    handleUserAccidentImageAC = (event) => {
        this.setState({
            userAccidentImageAC: event.target.files[0]
          })
    }

    handleUserAccidentImageOC = (event) => {
        this.setState({
            userAccidentImageOC: event.target.files[0]
          })
    }

    formValidationUserAccidentAC() {
        let userAccidentDateTimeAC =  false;
        let userAccidentDescriptionAC = false;
        let correct = false;
        if(this.state.userAccidentDateTimeAC !== ''){
            userAccidentDateTimeAC = true;
        }
        if(this.state.userAccidentDescriptionAC.length > 0){
            userAccidentDescriptionAC = true;
        }
        if( userAccidentDateTimeAC && userAccidentDescriptionAC){
            correct = true;
        }
        return ({
            userAccidentDateTimeAC,
            userAccidentDescriptionAC,
            correct,
        })
    }

    formValidationUserAccidentOC() {
        let userAccidentDateTimeOC =  false;
        let userAccidentDescriptionOC = false;
        let correct = false;
        if(this.state.userAccidentDateTimeOC !== ''){
            userAccidentDateTimeOC = true;
        }
        if(this.state.userAccidentDescriptionOC.length > 0){
            userAccidentDescriptionOC = true;
        }
        if(userAccidentDateTimeOC && userAccidentDescriptionOC){
            correct = true;
        }
        return ({
            userAccidentDateTimeOC,
            userAccidentDescriptionOC,
            correct,
        })
    }

    handleSubmitUserAccidentAC = (e) => {
        e.preventDefault()
        const validation = this.formValidationUserAccidentAC();
        if (validation.correct){
            this.updateUserAccidentAC();

            this.setState({
                errors: {
                    userAccidentDateTimeAC: false,
                    userAccidentDescriptionAC: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    userAccidentDateTimeAC: !validation.userAccidentDateTimeAC,
                    userAccidentDescriptionAC: !validation.userAccidentDescriptionAC,
              },
            })
        }
    }

    handleSubmitUserAccidentOC = (e) => {
        e.preventDefault()
        const validation = this.formValidationUserAccidentOC();
        if (validation.correct){
            this.updateUserAccidentOC()

            this.setState({
                errors: {
                    userAccidentDateTimeOC: false,
                    userAccidentDescriptionOC: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    userAccidentDateTimeOC: !validation.userAccidentDateTimeOC,
                    userAccidentDescriptionOC: !validation.userAccidentDescriptionOC,
              },
            })
        }
    }

    updateUserAccidentAC = () => {
        let updateRequest = `${userAccidentsUrl}/${this.state.policyId}/${this.state.userAccidentId}`
        const data = new FormData()
        data.append('AccidentDateTime', this.state.userAccidentDateTimeAC.toString());
        data.append('AccidentDescription', this.state.userAccidentDescriptionAC);
        data.append('AccidentImage', this.state.userAccidentImageAC);

        axios.put(updateRequest, data)
            .then((response) => {
                if(response.status === 500)
                    history.push("/internal-server-error");
                if(response.status === 401)
                    history.push("/unauthorized");
            })
            .then(() => {
                window.location.reload(false);
            })
            .catch(() => {
                this.setState({
                    userAccidentACError: true
                })
            })
    }

    updateUserAccidentOC = () => {
        let updateRequest = `${userAccidentsUrl}/${this.state.policyId}/${this.state.userAccidentId}`
        const data = new FormData()
        data.append('AccidentDateTime', this.state.userAccidentDateTimeOC.toString());
        data.append('AccidentDescription', this.state.userAccidentDescriptionOC);
        data.append('VictimRegistrationNumber', this.state.victimRegistrationNumber);
        data.append('VictimFirstName', this.state.victimFirstName);
        data.append('VictimLastName', this.state.victimLastName);
        data.append('AccidentImage', this.state.userAccidentImageOC);

        axios.put(updateRequest, data)
            .then((response) => {
                if(response.status === 500)
                    history.push("/internal-server-error");
                if(response.status === 401)
                    history.push("/unauthorized");
            })
            .then(() => {
                window.location.reload(false);
            })
            .catch(() => {
                this.setState({
                    userAccidentOCError: true
                })
            })
    }

    render() {
        return(
            <div>
                {this.state.typeOfInsurance === "AC" && (
                    <div className="accidents-manager-update-user">
                        <div className="accidents-inner-update-user">
                            <h5 style={{textAlign: 'center'}}>Moje ubezpieczenie (AC)</h5>
                            <i className="fa fa-fw fa-taxi" id="new-policy-icon" style={{color: 'black' , fontSize: '3em' }} />
                            <div className="form-group p-mx-5">
                                <label>Data zdarzenia</label>
                                <input name="userAccidentDateTimeAC"
                                    type="date"
                                    className="form-control"
                                    placeholder="Wprowadź datę zdarzenia"
                                    value={this.state.userAccidentDateTimeAC}
                                    onChange={this.handleChangeUserAccidentAC}/>
                            </div>
                            {this.state.errors.userAccidentDateTimeAC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDateTime_incorrect}</span>}
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
                            {this.state.errors.userAccidentDescriptionAC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDescription_incorrect}</span>}
                            <br />
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="userAccidentImageAC"
                                    type="file"
                                    className="form-control"
                                    onChange={this.handleUserAccidentImageAC}/>
                            </div>
                            <br />
                            {this.state.userAccidentACError && <span style={{ fontSize: '15px', color: 'red'}}>{this.messages.server_error}</span>}
                            <div className="text-center">
                                <button type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmitUserAccidentAC}>Edytuj szkodę
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.typeOfInsurance === "OC" && (
                    <div className="accidents-manager-update-user">
                        <div className="accidents-inner-update-user">
                            <h5 style={{textAlign: 'center'}}>Moje ubezpieczenie (OC)</h5>
                            <i className="fa fa-fw fa-taxi" id="new-policy-icon" style={{color: 'black' , fontSize: '3em' }} />
                            <div className="form-group p-mx-5">
                            <label>Data zdarzenia</label>
                            <input name="userAccidentDateTimeOC"
                                type="date"
                                className="form-control"
                                placeholder="Wprowadź datę zdarzenia"
                                value={this.state.userAccidentDateTimeOC}
                                onChange={this.handleChangeUserAccidentOC}/>
                            </div>
                            {this.state.errors.userAccidentDateTimeOC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDateTime_incorrect}</span>}
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Opis zdarzenia</label>
                                <textarea name="userAccidentDescriptionOC"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź opis zdarzenia"
                                    value={this.state.userAccidentDescriptionOC}
                                    onChange={this.handleChangeUserAccidentOC}/>
                            </div>
                            {this.state.errors.userAccidentDescriptionOC && <span style={{ fontSize: '15px'}}>{this.messages.userAccidentDescription_incorrect}</span>}
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Numer rejestracyjny poszkodowanego</label>
                                <input name="victimRegistrationNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź numer rejestracyjny poszkodowanego"
                                    value={this.state.victimRegistrationNumber}
                                    onChange={this.handleChangeUserAccidentOC}/>
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Imię poszkodowanego</label>
                                <input name="victimFirstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź imię poszkodowanego"
                                    value={this.state.victimFirstName}
                                    onChange={this.handleChangeUserAccidentOC}/>
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Naziwsko poszkodowanego</label>
                                <input name="victimLastName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Wprowadź nazwisko poszkodowanego"
                                    value={this.state.victimLastName}
                                    onChange={this.handleChangeUserAccidentOC}/>
                            </div>
                            <br/>
                            <div className="form-group p-mx-5">
                                <label>Zdjęcie</label>
                                <input name="userAccidentImageOC"
                                    type="file"
                                    className="form-control"
                                    onChange={this.handleUserAccidentImageOC}/>
                            </div>
                            <br/>
                            {this.state.userAccidentOCError && <span style={{ fontSize: '15px', color: 'red'}}>{this.messages.server_error}</span>}
                            <div className="text-center">
                                <button type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmitUserAccidentOC}>Edytuj szkodę
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default UpdateUserAccident;