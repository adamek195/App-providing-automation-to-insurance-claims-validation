import React, {Component} from 'react';
import './Styles/App.css';
import SignIn from "./Components/AuthenticationComponents/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return(
      <SignIn />
    );
  }
}

export default App;
