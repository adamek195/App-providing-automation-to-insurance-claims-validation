import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React, { Component } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../Styles/SideBarMenu.css';
import history from '../../History';

class AccidentsSideBar extends Component {
    render() {
        return(
        <div>
            <SideNav id="sideBarMenu"
                onSelect={(selected) => {
                    if(selected === 'home'){
                        history.push("/home")
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
            }}>
                <SideNav.Toggle id="sideBarMenuToggle"/>
                <SideNav.Nav defaultSelected="accidents">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Strona głowna
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="policies">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Polisy
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="newAccident">
                        <NavIcon>
                            <i className="fa fa-fw fa-car" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Zgłoś szkodę
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="accidents">
                        <NavIcon>
                            <i className="fa fa-fw fa-exclamation" style={{color: 'black', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color: 'black'}} >
                            Zgłoszone szkody
                        </NavText>
                    </NavItem>
            </SideNav.Nav>
        </SideNav>
    </div>
    );
    }
}

export default AccidentsSideBar;