import React from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user.email ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
