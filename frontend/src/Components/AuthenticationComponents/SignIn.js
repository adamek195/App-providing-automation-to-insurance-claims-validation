import React, { Component } from "react";
import axios from 'axios';
import menu from '../../Images/menu-logo.jpg';
import { toast } from "react-toastify";

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        accept: false,
        correct: false,
        token: "",

        errors: {
            email: false,
            password: false,
        }
    }


    messages = {
        email_incorrect: 'Brak @ w emailu',
        password_incorrect: 'Hasło musi mieć przynajmniej 8 znaków',
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
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
            console.log("Jest dobrze w chuj")
            this.setState({
                errors: {
                    email: false,
                    pass: false,
                }
            })
        } else {
            this.setState({
              errors: {
                email: !validation.email,
                password: !validation.password,
              }
            })
        }
      }

      /*authenticateUser = () => {
        let credentials = {
            email: this.state.email,
            password: this.state.token
        }

        return axios.post(authenticateUrl, credentials)
            .then((response) => {return response.data})
            .catch(() => {
                toast.error("Nieprawidłowe dane do logowania")
                history.push("/unauthorized")
            })
      }*/

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
                            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
                    </div>
                    <br />
                    <div className="form-group p-mx-5">
                        <label>Password</label>
                        <input name="password"
                            type="password"
                            className="form-control"
                            placeholder="Wprowadź swoje hasło"
                            value={this.state.password}
                            onChange={this.handleChange} />
                            {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
                        </div>
                    <br />
                    <div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}>Sign in
                        </button>
                    </div>
                </div>
          </div>
        </form>
      );
    }
}

export default SignIn;
