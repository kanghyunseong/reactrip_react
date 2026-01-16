// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { auth, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontSize: "1.2em" }}>
        인증 상태를 확인 중입니다...
      </div>
    );
  }

  const isAuthenticated = auth?.accessToken;

  const hasRequiredRole = auth?.role?.includes(requiredRole);

  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/members/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
