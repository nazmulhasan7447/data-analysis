import React from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../../axios/Interceptors";
import { LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/Authentication";

const Logout = ()=> {

    const navigate = useNavigate();

    const useAuthStatus = useAuth();

    const logOutHandler = () =>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        authFetch.defaults.headers['Authorization'] = null;
        useAuthStatus.logoutStatusChangeHandler();
        navigate('/', {replace: true});
    };

    return (
        <a className="dropdown-item" onClick={logOutHandler}>
            <Link to="/">Log Out</Link>
        </a>
    );
}

export default Logout;