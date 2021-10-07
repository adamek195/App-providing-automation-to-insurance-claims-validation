import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewPolicySideBar from '../MenuComponents/NewPolicySideBar';
import '../../Styles/NewPolicy.css';

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
        policyCreationDate_incorrect: 'Zły format daty',
        policyExpireDate_incorrect: 'Zły format daty',
        company_incorrect: 'Nazwa ubezpieczyciela jest wymagana',
        typeOfInsurance_incorrect: 'Nieprawidłowy rodzaj ubezpieczenia (OC/AC)',
        registrationNumber_incorrect: 'Numer rejestracyjny samochodu jest wymagany',
        mark_incorrect: 'Marka samochodu jest wymagana',
        model_incorrect: 'Model samochodu jest wymagany'
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
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
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Data utowrzenia polisy</label>
                            <input name="policyCreationDate"
                                type="date"
                                className="form-control"
                                value={this.state.policyCreationDate}
                                onChange={this.handleChange}/>
                            </div>
                            <br />
                            <div className="form-group p-mx-5">
                            <label>Data wygaśnięcia polisy</label>
                            <input name="policyExpireDate"
                                type="date"
                                className="form-control"
                                value={this.state.policyExpireDate}
                                onChange={this.handleChange}/>
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
                            </div>
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