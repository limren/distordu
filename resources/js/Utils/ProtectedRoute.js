import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isAuth }) => {
    if (!isAuth) {
        return <Navigate to="login" replace />;
    } else {
        return children;
    }
};
