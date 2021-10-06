import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import PoliciesSideBar from '../MenuComponents/PoliciesSideBar';
import axios from 'axios';
import { policiesUrl } from "../../ConstUrls"
import history from '../../History';
import '../../Styles/Policies.css';

class Policies extends Component {

    state = {
        policies: []
    }

    componentDidMount() {
        this.getPolicies()
    }

    getPolicies() {
        axios.get(policiesUrl)
        .then((response) => {
            this.setState({
                policies: response.data
            })
        })
        .catch(() => {
            history.push("/unauthorized");
        })
    }

    renderPolicy(policy){
        let creationDate = new Date(policy.policyCreationDate)
        let parseCreationDate = creationDate.getFullYear() + "-" + ('0' + (creationDate.getMonth()+1)).slice(-2) + "-" + ('0' + creationDate.getDate()).slice(-2);
        let expireDate = new Date(policy.policyExpireDate)
        let expireCreationDate = expireDate.getFullYear() + "-" + ('0' + (expireDate.getMonth()+1)).slice(-2) + "-" + ('0' + expireDate.getDate()).slice(-2);
        return (
            <tr key={policy.id}>
              <i className="fa fa-fw fa-file-text" style={{color: 'black', fontSize: '1.5em' }}/>
              <td>{policy.policyNumber}</td>
              <td>{parseCreationDate}</td>
              <td>{expireCreationDate}</td>
              <td>{policy.company}</td>
              <td>{policy.typeOfInsurance}</td>
              <td>{policy.registrationNumber}</td>
              <td>{policy.mark}</td>
              <td>{policy.model}</td>
            </tr>
        )
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <PoliciesSideBar />
                <div className="table-inner">
                    <table class="table table-bordered" id="policies-table">
                        <thead class="thead-light">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Numer Polisy</th>
                            <th scope="col">Data utworzenia</th>
                            <th scope="col">Data wygaśnięcia</th>
                            <th scope="col">Ubezpieczyciel</th>
                            <th scope="col">Ubezpieczenie</th>
                            <th scope="col">Numer rejestracyjny</th>
                            <th scope="col">Marka</th>
                            <th scope="col">Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.policies.map(this.renderPolicy)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Policies;