import React, { Component } from 'react';
import UserNavBar from '../MenuComponents/UserNavBar';
import DocumentSideBar from '../MenuComponents/DocumentSideBar';

class DocumentGenerator extends Component {
    render() {
        return(
            <div>
                <UserNavBar />
                <DocumentSideBar />
                <h1>Wygeneruj plik pdf</h1>
            </div>
        );
    }
}

export default DocumentGenerator;