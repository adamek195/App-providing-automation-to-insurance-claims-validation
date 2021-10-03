import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Error.css";

class InternalServerError extends Component {
    render() {
        return(
            <form>
                <label type="text" style={{ fontSize: '50px' }} className="error">500 - Internal Server Error</label>
                <br />
                <div className="d-flex justify-content-center">
                    <label style={{ fontSize: '25px' }} type="text" className="p-2">Błąd po stronie serwera</label>
                    <Link style={{ fontSize: '25px' }} className="nav-link p-2 text-white" to={"/sign-in"}>Zaloguj się</Link>
                </div>
                <br />
            </form>
        );
    }
}

export default InternalServerError;