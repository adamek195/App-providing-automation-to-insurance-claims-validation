import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import PoliciesSideBar from '../MenuComponents/PoliciesSideBar';

class Policies extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <PoliciesSideBar />
                <h1>POLISY</h1>
            </div>
        );
    }
}

export default Policies;