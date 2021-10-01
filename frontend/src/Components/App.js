import React, {Component} from 'react';
import './App.css';
import SignIn from "./AuthenticationComponents/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return(
      <SignIn />
    );
  }
}

export default App;
