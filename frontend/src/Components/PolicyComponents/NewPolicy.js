import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewPolicySideBar from '../MenuComponents/NewPolicySideBar';
import history from '../../History';
import axios from 'axios';
import '../../Styles/NewPolicy.css';
import { policiesUrl } from "../../ConstUrls"

class NewPolicy extends Component {

    state ={
        policyNumber: "",
        policyCreationDate: "",
        policyExpireDate: "",
        company: "",
        typeOfInsurance: "",
        registrationNumber: "",
        mark: "",
        model: "",
        badRequestError: false,

        errors: {
            policyNumber: false,
            policyCreationDate: false,
            policyExpireDate: false,
            company: false,
            typeOfInsurance: false,
            registrationNumber: false,
            mark: false,
            model: false,
        }
    }

    messages = {
        policyNumber_incorrect: 'Numer polisy jest wymagany',
        policyCreationDate_incorrect: 'Data jest wymagana',
        policyExpireDate_incorrect: 'Data jest wymagana',
        company_incorrect: 'Nazwa ubezpieczyciela jest wymagana',
        typeOfInsurance_incorrect: 'Nieprawidłowy rodzaj ubezpieczenia (OC/AC)',
        registrationNumber_incorrect: 'Numer rejestracyjny samochodu jest wymagany',
        mark_incorrect: 'Marka samochodu jest wymagana',
        model_incorrect: 'Model samochodu jest wymagany',
        server_error: 'Nie można dodać polisy o takich danych',
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            badRequestError: false
        });
    }

    formValidation() {
        let policyNumber = false;
        let policyCreationDate = false;
        let policyExpireDate = false;
        let company = false;
        let typeOfInsurance = false;
        let registrationNumber = false;
        let mark = false;
        let model = false;
        let correct = false;
        if(this.state.policyNumber.length > 0){
            policyNumber = true;
        }
        if(this.state.policyCreationDate !== ''){
            policyCreationDate = true;
        }
        if(this.state.policyExpireDate !== ''){
            policyExpireDate = true;
        }
        if(this.state.company.length > 0){
            company = true;
        }
        if(this.state.typeOfInsurance === 'AC' || this.state.typeOfInsurance === 'OC'){
            typeOfInsurance = true;
        }
        if(this.state.registrationNumber.length > 0){
            registrationNumber = true;
        }
        if(this.state.mark.length > 0){
            mark = true;
        }
        if(this.state.model.length > 0){
            model = true;
        }
        if (policyNumber && policyCreationDate && policyExpireDate && company &&
            typeOfInsurance && registrationNumber && mark && model) {
          correct = true
        }
        return ({
            policyNumber,
            policyCreationDate,
            policyExpireDate,
            company,
            typeOfInsurance,
            registrationNumber,
            mark,
            model,
            correct,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const validation = this.formValidation();
        if (validation.correct) {
            this.addPolicy();

            this.setState({
                errors: {
                    policyNumber: false,
                    policyCreationDate: false,
                    policyExpireDate: false,
                    company: false,
                    typeOfInsurance: false,
                    registrationNumber: false,
                    mark: false,
                    model: false,
                }
            });
        }else {
            this.setState({
                errors: {
                    policyNumber: !validation.policyNumber,
                    policyCreationDate: !validation.policyCreationDate,
                    policyExpireDate: !validation.policyExpireDate,
                    company: !validation.company,
                    typeOfInsurance: !validation.typeOfInsurance,
                    registrationNumber: !validation.registrationNumber,
                    mark: !validation.mark,
                    model: !validation.model,
              }
            })
        }
    }

    addPolicy = () => {
        let postData = {
            policyNumber: this.state.policyNumber,
            policyCreationDate: this.state.policyCreationDate,
            policyExpireDate: this.state.policyExpireDate,
            company: this.state.company,
            typeOfInsurance: this.state.typeOfInsurance,
            registrationNumber: this.state.registrationNumber,
            mark: this.state.mark,
            model: this.state.model,
        }
        axios.post(policiesUrl, postData)
            .then((response) =>{
                if(response.status === 201)
                    history.push("/policies")
                if(response.status === 500)
                    history.push("/internal-server-error");
                if(response.status === 401)
                    history.push("/unauthorized");
            })
            .catch(() => {
                this.setState({
                    badRequestError: true
                })
            })
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <NewPolicySideBar />
                <form>
                    <div className="new-policy-wrapper">
                        <div className="new-policy-inner">
                            <i className="fa fa-fw fa-file" id="new-policy-icon" style={{color: 'black' , fontSize: '3.5em' }} />
                            <div className="form-group p-mx-5">
                            <label>Numer polisy</label>
                            <input name="policyNumber"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź numer polisy"
                                value={this.state.policyNumber}
                                onChange={this.handleChange}/>
                                {this.state.errors.policyNumber && <span style={{ fontSize: '15px'}}>{this.messages.policyNumber_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Data utowrzenia polisy</label>
                            <input name="policyCreationDate"
                                type="date"
                                className="form-control"
                                value={this.state.policyCreationDate}
                                onChange={this.handleChange}/>
                                {this.state.errors.policyCreationDate && <span style={{ fontSize: '15px'}}>{this.messages.policyCreationDate_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Data wygaśnięcia polisy</label>
                            <input name="policyExpireDate"
                                type="date"
                                className="form-control"
                                value={this.state.policyExpireDate}
                                onChange={this.handleChange}/>
                                {this.state.errors.policyExpireDate && <span style={{ fontSize: '15px'}}>{this.messages.policyExpireDate_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Ubezpieczyciel</label>
                            <input name="company"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź nazwę ubezpieczyciela"
                                value={this.state.company}
                                onChange={this.handleChange}/>
                                {this.state.errors.company && <span style={{ fontSize: '15px'}}>{this.messages.company_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Typ ubezpieczenia</label>
                            <input name="typeOfInsurance"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź typ ubezpieczenia (OC/AC)"
                                value={this.state.typeOfInsurance}
                                onChange={this.handleChange}/>
                                {this.state.errors.typeOfInsurance && <span style={{ fontSize: '15px'}}>{this.messages.typeOfInsurance_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Numer rejestracyjny</label>
                            <input name="registrationNumber"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź numer rejestracyjny"
                                value={this.state.registrationNumber}
                                onChange={this.handleChange}/>
                                {this.state.errors.registrationNumber && <span style={{ fontSize: '15px'}}>{this.messages.registrationNumber_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Marka samochodu</label>
                            <input name="mark"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź markę samochodu"
                                value={this.state.mark}
                                onChange={this.handleChange}/>
                                {this.state.errors.mark && <span style={{ fontSize: '15px'}}>{this.messages.mark_incorrect}</span>}
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Model samochodu</label>
                            <input name="model"
                                type="text"
                                className="form-control"
                                placeholder="Wprowadź model samochodu"
                                value={this.state.model}
                                onChange={this.handleChange}/>
                                {this.state.errors.model && <span style={{ fontSize: '15px'}}>{this.messages.model_incorrect}</span>}
                            </div>
                            <br />
                            {this.state.badRequestError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.server_error}</span>}
                            <br />
                            <div className="text-center">
                                <button type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}>Dodaj polisę
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewPolicy;