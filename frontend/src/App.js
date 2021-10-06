import React, {Component} from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from './History';
import axios from 'axios';
import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthorizationToken, getJwtTokenFromLocalStorage } from "./Helpers";
import SignIn from "./Components/AuthenticationComponents/SignIn";
import SignUp from "./Components/AuthenticationComponents/SignUp";
import Spinner from "./Components/ErrorComponents/LoaderSpinner";
import Unauthorized from "./Components/ErrorComponents/Unauthorized";
import InternalServerError from "./Components/ErrorComponents/InternalServerError";
import Home from "./Components/MenuComponents/Home";
import NewAccident from './Components/AccidentComponents/NewAccident';
import Accidents from './Components/AccidentComponents/Accidents';
import Policies from './Components/PolicyComponents/Policies'
import NewPolicy from './Components/PolicyComponents/NewPolicy'
import PdfGenerator from './Components/AccidentComponents/PdfGenerator'

class App extends Component {

  constructor() {
    super();

    this.state = {
      loading: false
    };

    axios.interceptors.request.use((config) => {
      this.setState({
        loading: true
      })
      return config;
    } , (error) => {
      console.log(error);
      return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
      this.setState({
        loading: false
      })
      return response;

    }, error => {
      console.log(error);
      this.setState({
        loading: false
      })
      if (error.response && error.response.status === 401) {
        history.push("/unauthorized");
        return error;
      }
      if (error.response && error.response.status === 500) {
        history.push("/internal-server-error");
        return error;
      }
      console.log(error);

      return Promise.reject(error)
    })

    let jwtToken = getJwtTokenFromLocalStorage();
    if (jwtToken !== 'undefined' && jwtToken !== null) {
      setAuthorizationToken(jwtToken);
    }
  }

  render() {
    return(
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/internal-server-error" component={InternalServerError} />
            <Route path="/home" component={Home} />
            <Route path="/policies" component={Policies} />
            <Route path="/new-policy" component={NewPolicy} />
            <Route path="/accidents" component={Accidents} />
            <Route path="/new-accident" component={NewAccident} />
            <Route path="/pdf" component={PdfGenerator} />
          </Switch>
          <Spinner loading={this.state.loading} />
        </div>
      </Router>
    );
  }
}

export default App;
