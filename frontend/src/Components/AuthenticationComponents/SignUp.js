import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../../History.js';
import { registerUrl } from "../../ConstUrls"
import '../../Styles/SignUp.css';

class SignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        personalIdentityNumber: "",
        phoneNumber: "",
        city: "",
        postalCode: "",
        address: "",
        password: "",
        repeatPassword: "",
        registerError: false,

        errors: {
            firstName: false,
            lastName: false,
            email: false,
            personalIdentityNumber: false,
            phoneNumber: false,
            city: false,
            postalCode: false,
            address: false,
            password: false,
            repeatPassword: false,
        }
    }

    messages = {
        firstName_incorrect: 'Imię jest wymagane',
        lastName_incorrect: 'Naziwsko jest wymagane',
        email_incorrect: 'Brak @ w emailu',
        personalIdentityNumber_incorrect: 'Pesel musi składać się z 11 cyfr',
        phoneNumber_incorrect: 'Numer telefonu musi składać się z 9 cyfr',
        city_incorrect: 'Miasto jest wymagane',
        postalCode_incorrect: 'nieprawidłowy format kodu pocztowego',
        address_incorrect: 'Adres zamieszkania jest wymagany',
        password_incorrect: 'Hasło musi mieć przynajmniej 8 znaków',
        repeatPassword_incorrect: 'Hasła nie są takie same',
        register_incorrect: 'Użytkownik o takim emailu już istnieje lub wystąpił błąd podczas rejestracji',
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            registerError: false
        });
    }

    formValidation() {
        let firstName = false;
        let lastName = false;
        let email = false;
        let personalIdentityNumber = false;
        let phoneNumber = false;
        let city = false;
        let postalCode = false;
        let address = false;
        let password = false;
        let repeatPassword = false;
        let correct = false;
        if(this.state.firstName.length > 0){
            firstName = true;
        }
        if(this.state.lastName.length > 0){
            lastName = true;
        }
        if (this.state.email.indexOf('@') !== -1) {
          email = true;
        }
        if(/^\d+$/.test(this.state.personalIdentityNumber) && this.state.personalIdentityNumber.length === 11){
            personalIdentityNumber = true;
        }
        if(/^\d+$/.test(this.state.phoneNumber) && this.state.phoneNumber.length === 9){
            phoneNumber = true;
        }
        if(this.state.city.length > 0){
            city = true;
        }
        if(isNaN(this.state.postalCode) && this.state.postalCode.length === 6){
            postalCode = true;
        }
        if(this.state.address.length > 0)
            address = true;
        if (this.state.password.length >= 8) {
            password = true;
        }
        if(this.state.password === this.state.repeatPassword){
            repeatPassword = true;
        }
        if (firstName && lastName && email && personalIdentityNumber && phoneNumber &&  city &&
            postalCode && address && password && repeatPassword) {
          correct = true
        }
        return ({
            firstName,
            lastName,
            email,
            personalIdentityNumber,
            phoneNumber,
            city,
            postalCode,
            address,
            password,
            repeatPassword,
            correct,
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()
        const validation = this.formValidation();
        if (validation.correct) {
            this.registerUser();

            this.setState({
                errors: {
                    firstName: false,
                    lastName: false,
                    email: false,
                    personalIdentityNumber: false,
                    phoneNumber: false,
                    city: false,
                    postalCode: false,
                    address: false,
                    password: false,
                    repeatPassword: false,
                }
            });
        }else {
            this.setState({
              errors: {
                    firstName: !validation.firstName,
                    lastName: !validation.lastName,
                    email: !validation.email,
                    personalIdentityNumber: !validation.personalIdentityNumber,
                    phoneNumber: !validation.phoneNumber,
                    city: !validation.city,
                    postalCode: !validation.postalCode,
                    address: !validation.address,
                    password: !validation.password,
                    repeatPassword: !validation.repeatPassword,
              }
            })
        }
    }

    registerUser = () => {
        let postData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            personalIdentitynumber: this.state.personalIdentityNumber,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            postalCode: this.state.postalCode,
            address: this.state.address,
            passwordHash: this.state.password
        }
        axios.post(registerUrl, postData)
            .then((response) => {
                if(response.status === 201)
                    history.push("/sign-in");
                if(response.status === 500)
                history.push("/internal-server-error");
            })
            .catch(() => {
                this.setState({
                    registerError: true
                })
            })
    }

    render() {
        return(
          <form>
              <div className="register-wrapper">
                  <div className="register-inner">
                      <h3>Zarejestruj się</h3>
                      <div className="form-group p-mx-5">
                          <label>Imię</label>
                          <input name="firstName"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swoje imię"
                              value={this.state.firstName}
                              onChange={this.handleChange}/>
                              {this.state.errors.firstName && <span style={{ fontSize: '15px'}}>{this.messages.firstName_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Nazwisko</label>
                          <input name="lastName"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swoje nazwisko"
                              value={this.state.lastName}
                              onChange={this.handleChange}/>
                              {this.state.errors.lastName && <span style={{ fontSize: '15px'}}>{this.messages.lastName_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Email</label>
                          <input name="email"
                              type="email"
                              className="form-control"
                              placeholder="Wprowadź swój email"
                              value={this.state.email}
                              onChange={this.handleChange}/>
                              {this.state.errors.email && <span style={{ fontSize: '15px'}}>{this.messages.email_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Pesel</label>
                          <input name="personalIdentityNumber"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swój pesel"
                              value={this.state.personalIdentityNumber}
                              onChange={this.handleChange}/>
                              {this.state.errors.personalIdentityNumber && <span style={{ fontSize: '15px'}}>{this.messages.personalIdentityNumber_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Numer telefonu</label>
                          <input name="phoneNumber"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swój numer telefonu"
                              value={this.state.phoneNumber}
                              onChange={this.handleChange}/>
                              {this.state.errors.phoneNumber && <span style={{ fontSize: '15px'}}>{this.messages.phoneNumber_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Miasto</label>
                          <input name="city"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź miasto zamieszkania"
                              value={this.state.city}
                              onChange={this.handleChange}/>
                              {this.state.errors.city && <span style={{ fontSize: '15px'}}>{this.messages.city_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Kod pocztowy</label>
                          <input name="postalCode"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź kod pocztowy"
                              value={this.state.postalCode}
                              onChange={this.handleChange}/>
                              {this.state.errors.postalCode && <span style={{ fontSize: '15px'}}>{this.messages.postalCode_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Adres zamieszkania</label>
                          <input name="address"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swój adres zamieszkania"
                              value={this.state.address}
                              onChange={this.handleChange}/>
                              {this.state.errors.address && <span style={{ fontSize: '15px'}}>{this.messages.address_incorrect}</span>}
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Hasło</label>
                          <input name="password"
                              type="password"
                              className="form-control"
                              placeholder="Wprowadź swoje hasło"
                              value={this.state.password}
                              onChange={this.handleChange}/>
                              {this.state.errors.password && <span style={{ fontSize: '15px'}}>{this.messages.password_incorrect}</span>}
                          </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Powtórz hasło</label>
                          <input name="repeatPassword"
                              type="password"
                              className="form-control"
                              placeholder="Wprowadź swoje hasło jeszcze raz"
                              value={this.state.repeatPassword}
                              onChange={this.handleChange}/>
                              {this.state.errors.repeatPassword && <span style={{ fontSize: '15px'}}>{this.messages.repeatPassword_incorrect}</span>}
                          </div>
                      <br />
                      <div>
                          <button type="submit"
                              className="btn btn-primary"
                              onClick={this.handleSubmit}>Zarejestruj się
                          </button>
                      </div>
                      {this.state.registerError && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.register_incorrect}</span>}
                      <div className="d-flex justify-content-center">
                        <p className="p-2">Jesteś już zarejestrowany?</p>
                        <Link className="nav-link p-2" to={"/sign-in"}>Zaloguj się</Link>
                      </div>
                  </div>
            </div>
          </form>
        );
    }
}

export default SignUp;