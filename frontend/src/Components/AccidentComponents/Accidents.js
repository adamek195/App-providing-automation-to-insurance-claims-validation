import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import AccidentsSideBar from '../MenuComponents/AccidentsSideBar';

class Accidents extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <AccidentsSideBar />
                <h1>Wypadki</h1>
            </div>
        );
    }
}

export default Accidents;