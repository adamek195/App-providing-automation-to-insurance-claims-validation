import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../../History.js';
import { isUserSignedIn, setAuthorizationToken, jwtToLocalStorage } from "../../Helpers.js";
import { authenticateUrl } from "../../ConstUrls"
import menu from '../../Images/menu-logo.jpg';
import '../../Styles/SignIn.css';

class SignIn extends Component {

    state = {
        email: "",
        password: "",
        incorrectCredentials: false,

        errors: {
            email: false,
            password: false,
        }
    }

    messages = {
        email_incorrect: 'Brak @ w emailu',
        password_incorrect: 'Hasło musi mieć przynajmniej 8 znaków',
        credentials_incorrect: 'Niepoprawna nazwa użytkownika lub hasło'
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            incorrectCredentials: false
        });
    }

    formValidation() {
        let email = false;
        let password = false;
        let correct = false;
        if (this.state.email.indexOf('@') !== -1) {
          email = true;
        }
        if (this.state.password.length >= 8) {
            password = true;
        }
        if (email && password) {
          correct = true
        }

        return ({
          correct,
          email,
          password,
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()
        const validation = this.formValidation()
        if (validation.correct) {
            this.handleSigningIn();

            this.setState({
                errors: {
                    email: false,
                    password: false,
                }
            });
        } else {
            this.setState({
              errors: {
                email: !validation.email,
                password: !validation.password,
              }
            })
        }
      }

    handleSigningIn = () => {
        this.authenticateUser()
            .then((response) => {
                jwtToLocalStorage(response)
                setAuthorizationToken(response)
            })
            .then(() => {
                if (isUserSignedIn()) {
                    history.push("/home");
                }
            });
    }

    authenticateUser = () => {
        let credentials = {
            email: this.state.email,
            passwordHash: this.state.password
        }
        return axios.post(authenticateUrl, credentials)
            .then((response) => {
                return response.data})
            .catch(() => {
                this.setState({
                    incorrectCredentials: true
                })
            });
      }

    render() {
      return(
        <form className="authentication-form">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <img id="menu-logo" src={menu} alt="Menu" />
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
                        <label>Hasło</label>
                        <input name="password"
                            type="password"
                            className="form-control"
                            placeholder="Wprowadź swoje hasło"
                            value={this.state.password}
                            onChange={this.handleChange} />
                            {this.state.errors.password && <span style={{ fontSize: '15px'}}>{this.messages.password_incorrect}</span>}
                        </div>
                    <br />
                    <div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}>Zaloguj się
                        </button>
                    </div>
                    {this.state.incorrectCredentials && <span style={{ fontSize: '15px', color: 'red' }}>{this.messages.credentials_incorrect}</span>}
                    <div className="d-flex justify-content-center">
                        <p className="p-2">Nie masz konta?</p>
                        <Link className="nav-link p-2" to={"/sign-up"}>Zarejestruj się</Link>
                    </div>
                </div>
          </div>
        </form>
      );
    }
}

export default SignIn;
