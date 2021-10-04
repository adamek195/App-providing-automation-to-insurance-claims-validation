import React, { Component } from 'react';
import UserNavBar from './UserNavBar';
import HomeSideBar from './HomeSideBar';

class Home extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <HomeSideBar />
                <h1>MENU</h1>
            </div>
        );
    }
}

export default Home;