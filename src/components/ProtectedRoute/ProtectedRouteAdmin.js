import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin({children}) {
    const {user} = useContext(AuthContext);
    return user.role === "admin" ? children : <Navigate to="/" />;
}


