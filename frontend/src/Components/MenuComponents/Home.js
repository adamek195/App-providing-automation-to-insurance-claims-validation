import React, { Component } from 'react';
import UserNavBar from './UserNavBar';
import HomeSideBar from './HomeSideBar';
import axios from 'axios';
import { userUrl } from "../../ConstUrls"
import history from '../../History';

class Home extends Component {

    state = {
        firstName: "",
        lastName: "",
    }

    componentDidMount() {
        this.getUser()
    }

    getUser() {
        axios.get(userUrl)
        .then((response) => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            })
        })
        .catch(() => {
            history.push("/unauthorized");
        })
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <HomeSideBar />
                <h1>Witaj {this.state.firstName} {this.state.lastName}</h1>
            </div>
        );
    }
}

export default Home;