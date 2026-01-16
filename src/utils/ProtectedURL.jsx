// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { auth } = useContext(AuthContext);

  const isAuthenticated = auth?.accessToken;

  // role이 문자열인 경우와 배열인 경우 모두 처리
  const hasRequiredRole = requiredRole
    ? auth?.role === requiredRole || auth?.role?.includes(requiredRole)
    : true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRequiredRole) {
    alert("관리자 권한이 필요합니다.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
