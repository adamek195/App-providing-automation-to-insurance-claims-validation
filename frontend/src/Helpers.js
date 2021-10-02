import axios from "axios";
import history from './History.js';

export const isUserSignedIn = () => {
    let jwtToken = localStorage.getItem("JWT");
    if (jwtToken !== undefined && jwtToken !== null) {
        return true;
    }
    else {
        return false;
    }
}

export const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    delete axios.defaults.headers.common['Authorization'];
}

export const removeToken = () => {
    localStorage.removeItem("JWT")
    history.push("sign-in")
}

export const jwtToLocalStorage = (token) => {
    localStorage.setItem("JWT", token)
}

export const getJwtTokenFromLocalStorage = () => {
    return localStorage.getItem("JWT")
}