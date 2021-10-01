import React, { Component } from "react";
import menu from '../../Images/menu-logo.jpg';

class SignIn extends Component {
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
                            placeholder="Enter your email"
                        />
                    </div>
                    <br />
                    <div className="form-group p-mx-5">
                        <label>Password</label>
                        <input name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"/>
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
