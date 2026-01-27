// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const decodeJwtPayload = (token) => {
  try {
    if (!token) return null;
    const parts = String(token).split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ requiredRole, children }) => {
  const { auth } = useContext(AuthContext);

  const accessToken = auth?.accessToken || localStorage.getItem("accessToken");
  const tokenRole = decodeJwtPayload(accessToken)?.role;
  const role = auth?.role || localStorage.getItem("role") || tokenRole;

  const isAuthenticated = Boolean(accessToken);

  const normalizeRoleTokens = (v) => {
    const raw = String(v || "").trim();
    if (!raw) return [];
    // examples: "ROLE_ADMIN", "[ROLE_ADMIN]", "[ROLE_ADMIN, ROLE_USER]"
    const cleaned = raw.replace(/[\[\]]/g, "").replace(/\s+/g, "");
    return cleaned
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.toUpperCase());
  };
  const requiredTokens = normalizeRoleTokens(requiredRole);
  const currentTokens = normalizeRoleTokens(role);

  // role이 문자열인 경우와 배열인 경우 모두 처리
  const hasRequiredRole = requiredRole
    ? requiredTokens.every((req) => {
        if (currentTokens.includes(req)) return true;
        // requiredRole을 "ROLE_ADMIN"으로 두고, 실제 role이 "ADMIN" 같이 저장된 케이스도 허용
        if (req.includes("ADMIN") && currentTokens.some((c) => c.includes("ADMIN"))) return true;
        return false;
      })
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
