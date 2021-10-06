import React, { Component } from 'react';
import UserNavBar from './UserNavBar';
import HomeSideBar from './HomeSideBar';
import axios from 'axios';
import { userUrl } from "../../ConstUrls"
import history from '../../History';
import home from '../../Images/home.jpg';
import '../../Styles/Home.css';

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
                <form>
                    <div className="home-wrapper">
                        <div className="home-inner">
                            <h3>Witaj {this.state.firstName} {this.state.lastName}</h3>
                            <div style={{textAlign:'right'}}>
                                <img id="home-image" src={home} alt="home"  />
                            </div>
                            <h4>Zautomatyzuj rozliczanie swoich szkód samochodowych</h4>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Home;