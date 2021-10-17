import React, { Component } from 'react';
import history from '../../History';
import { guiltyPartyAccidentsUrl } from "../../ConstUrls"
import axios from 'axios';
import '../../Styles/UpdateGuiltyPartyAccident.css';

class UpdateGuiltyPartyAccident extends Component {
    state = {
        guiltyPartyAccidentId: this.props.guiltyPartyAccidentId,
        guiltyPartyAccidentDateTime: "",
        guiltyPartyAccidentDescription: "",
        guiltyPartyPolicyNumber: "",
        guiltyPartyRegistrationNumber: "",
        guiltyPartyAccidentImage: "",
        guiltyPartyAccidentError: false,

        errors: {
            guiltyPartyAccidentDateTime: false,
            guiltyPartyAccidentDescription: false,
        }
    }

    messages = {
        guiltyPartyAccidentDateTime_incorrect: 'Data zdarzenia jest wymagana',
        guiltyPartyAccidentDescription_incorrect: 'Opis zdarzenia jest wymagany',
        server_error: "Wprowadzone dane o szkodzie są nieprawidłowe. Spróbuj jeszcze raz"
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
            guiltyPartyAccidentImage: event.target.files[0]
          })
    }

    formValidationGuiltyPartyAccident() {
        let guiltyPartyAccidentDateTime =  false;
        let guiltyPartyAccidentDescription = false;
        let correct = false;
        if(this.state.guiltyPartyAccidentDateTime !== ''){
            guiltyPartyAccidentDateTime = true;
        }
        if(this.state.guiltyPartyAccidentDescription.length > 0){
            guiltyPartyAccidentDescription = true;
        }
        if (guiltyPartyAccidentDateTime && guiltyPartyAccidentDescription) {
          correct = true
        }
        return ({
            guiltyPartyAccidentDateTime,
            guiltyPartyAccidentDescription,
            correct,
        })
    }

    handleSubmitGuiltyPartyAccident = (e) => {
        e.preventDefault()
        const validation = this.formValidationGuiltyPartyAccident();
        if (validation.correct){
            this.updateGuiltyPartyAccident();

            this.setState({
                errors: {
                    guiltyPartyAccidentDateTime: false,
                    guiltyPartyAccidentDescription: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    guiltyPartyAccidentDateTime: !validation.guiltyPartyAccidentDateTime,
                    guiltyPartyAccidentDescription: !validation.guiltyPartyAccidentDescription,
              }
            })
        }
    }

    updateGuiltyPartyAccident = () => {
        let updateRequest = `${guiltyPartyAccidentsUrl}/${this.state.guiltyPartyAccidentId}`
        const data = new FormData()
        data.append('AccidentDateTime', this.state.guiltyPartyAccidentDateTime.toString());
        data.append('AccidentDescription', this.state.guiltyPartyAccidentDescription);
        data.append('GuiltyPartyPolicyNumber', this.state.guiltyPartyPolicyNumber);
        data.append('GuiltyPartyRegistrationNumber', this.state.guiltyPartyRegistrationNumber);
        data.append('AccidentImage', this.state.guiltyPartyAccidentImage);

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
                    guiltyPartyAccidentError: true
                })
            })
    }

    render() {
        return(
            <div>
                <form>
                    <div className="accidents-manager-wrapper-guilty-oc">
                        <div className="accidents-manager-inner-guilty-oc">
                            <h3 style={{textAlign: 'center'}}>Ubezpieczenie sprawcy (OC)</h3>
                            <i className="fa fa-fw fa-taxi" id="new-accident-icon" style={{color: 'black' , fontSize: '3.5em' }} />
                            <div className="form-group p-mx-5">
                            <label>Data wypadku</label>
                            <input name="guiltyPartyAccidentDateTime"
                                type="date"
                                className="form-control"
                                placeholder="Wprowadź datę wypadku"
                                value={this.state.guiltyPartyAccidentDateTime}
                                onChange={this.handleChangeGuiltyPartyAccident}/>
                        </div>
                        {this.state.errors.guiltyPartyAccidentDateTime && <span style={{ fontSize: '15px'}}>{this.messages.guiltyPartyAccidentDateTime_incorrect}</span>}
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
        </div>
        );
    }
}

export default UpdateGuiltyPartyAccident;