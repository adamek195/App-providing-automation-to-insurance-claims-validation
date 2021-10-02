import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { authenticateUrl } from "../../ConstUrls"
import { toast } from "react-toastify";
import '../../Styles/SignUp.css';

class SignUp extends Component {

    render() {
        return(
          <form>
              <div className="register-wrapper">
                  <div className="auth-inner">
                      <h3>Zarejestruj się</h3>
                      <div className="form-group p-mx-5">
                          <label>Imię</label>
                          <input name="firsName"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swoje imię"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Nazwisko</label>
                          <input name="lastName"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swoje nazwisko"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Email</label>
                          <input name="email"
                              type="email"
                              className="form-control"
                              placeholder="Wprowadź swój email"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Pesel</label>
                          <input name="personalIdentitynumber"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swój pesel"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Miasto</label>
                          <input name="city"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź miasto zamieszkania"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Kod pocztowy</label>
                          <input name="postalCode"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź kod pocztowy"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Adres zamieszkania</label>
                          <input name="personalIdentitynumber"
                              type="text"
                              className="form-control"
                              placeholder="Wprowadź swój adres zamieszkania"/>
                      </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Hasło</label>
                          <input name="password"
                              type="password"
                              className="form-control"
                              placeholder="Wprowadź swoje hasło"
                              />
                          </div>
                      <br />
                      <div className="form-group p-mx-5">
                          <label>Powtórz hasło</label>
                          <input name="repeatPassword"
                              type="password"
                              className="form-control"
                              placeholder="Wprowadź swoje hasło jeszcze raz"
                              />
                          </div>
                      <br />
                      <div>
                          <button type="submit"
                              className="btn btn-primary"
                              onClick={this.handleSubmit}>Zarejestruj się
                          </button>
                      </div>
                      <br />
                      <div className="d-flex">
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