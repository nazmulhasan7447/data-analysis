import React, {createContext, useState, useContext} from "react";
import { parseJwt } from "../parser/Parser";
import jwt_code from 'jwt-decode';
import authFetch from "../../axios/Interceptors";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const exp = parseJwt(localStorage.getItem('access_token'))?.exp;

    let currentDate = new Date();
    let timeNow = currentDate.getTime() + ((2*23.8*60*60*1000));

    if ( exp ) {
        if (exp * 1000 < timeNow) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            authFetch.defaults.headers['Authorization'] = null;
        }
    }

    const access_token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

    const [isAuthenticated, setIsAuthenticated] = useState(access_token ? true : false);

    const loginStatusChangeHandler = () =>{
        setIsAuthenticated(true);
    };

    const logoutStatusChangeHandler = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{loginStatusChangeHandler, isAuthenticated, logoutStatusChangeHandler}}>{children}</AuthContext.Provider>
    );
};


export const useAuth = () =>{
    return useContext(AuthContext);
}


