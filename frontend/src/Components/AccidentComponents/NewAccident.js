import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewAccidentSideBar from '../MenuComponents/NewAccidentSideBar';

class NewAccident extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <NewAccidentSideBar />
                <h1>OC/AC</h1>
            </div>
        );
    }
}

export default NewAccident;