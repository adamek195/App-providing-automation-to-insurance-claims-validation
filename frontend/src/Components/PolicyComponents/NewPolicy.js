import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import NewPolicySideBar from '../MenuComponents/NewPolicySideBar';

class NewPolicy extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <NewPolicySideBar />
                <h1>Dodaj polisę</h1>
            </div>
        );
    }
}

export default NewPolicy;