import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React, { Component } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../Styles/SideBarMenu.css';
import history from '../../History';

class NewAccidentSideBar extends Component {
    render() {
        return(
        <div>
            <SideNav id="sideBarMenu" style={{position: 'fixed'}}
                onSelect={(selected) => {
                    if(selected === 'home'){
                        history.push("/home")
                    }
                    if(selected === 'newPolicy'){
                        history.push("/new-policy")
                    }
                    if(selected === 'policies'){
                        history.push("/policies")
                    }
                    if(selected === 'newAccident'){
                        history.push("/new-accident")
                    }
                    if(selected === 'accidents'){
                        history.push("/accidents")
                    }
                    if(selected === 'document'){
                        history.push("/document")
                    }
            }}>
                <SideNav.Toggle id="sideBarMenuToggle"/>
                <SideNav.Nav defaultSelected="newAccident">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Strona głowna
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="newPolicy">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Dodaj polisę
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="policies">
                        <NavIcon>
                            <i className="fa fa-fw fa-file-text" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Polisy
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="newAccident">
                        <NavIcon>
                            <i className="fa fa-fw fa-taxi" aria-hidden="true" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Zgłoś szkodę
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="accidents">
                        <NavIcon>
                            <i className="fa fa-fw fa-car" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Zgłoszone szkody
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="document">
                        <NavIcon>
                            <i className="fa fa-fw fa-file-pdf-o" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Wygeneruj dokument
                        </NavText>
                    </NavItem>
            </SideNav.Nav>
        </SideNav>
    </div>
    );
    }
}

export default NewAccidentSideBar;