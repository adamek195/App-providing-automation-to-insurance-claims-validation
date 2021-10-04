import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "../../Styles/LoaderSpinner.css";

class Spinner extends Component {

    render() {
        if (this.props.loading)
            return (
                <div className="spinner">
                    <Loader type="ThreeDots" color="black" height="100" width="100" />
                </div>
            )
        else
            return null
    }
}


export default Spinner;