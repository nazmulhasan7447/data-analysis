import { Children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authentication";


const RequireAuth = ({children}) =>{
    const userLoggedInStatus = useAuth().isAuthenticated;

    if (!userLoggedInStatus) {
        return <Navigate to="/login"></Navigate>
    }

    return children;
}


export default RequireAuth;

