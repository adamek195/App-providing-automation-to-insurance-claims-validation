import React, { Component } from 'react';
import { removeToken } from "../../Helpers";

class UserNavBar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-sm bg-light" >
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="sign-button" style={{ paddingRight: '20px', paddingTop: '5px', paddingBottom: '5px'}}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                onClick={() => { removeToken() }}>Wyloguj się
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default UserNavBar;