import React, {Component} from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from './History';
import './Styles/App.css';
import SignIn from "./Components/AuthenticationComponents/SignIn";
import SignUp from "./Components/AuthenticationComponents/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return(
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
