import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import PdfSideBar from '../MenuComponents/PdfSideBar';

class PdfGenerator extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <PdfSideBar />
                <h1>Wygeneruj plik pdf</h1>
            </div>
        );
    }
}

export default PdfGenerator;