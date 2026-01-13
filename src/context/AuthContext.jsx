import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userNo: null,
    userName: null,
    userId: null,
    phone: null,
    email: null,
    birthDay: null,
    licenseUrl: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    provider: null,
    isAuthenticated: false,
  });

  // 앱 최초 실행 시 localStorage → 상태 복구
  useEffect(() => {
    const userNo = localStorage.getItem("userNo");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");
    const birthDay = localStorage.getItem("birthDay");
    const licenseUrl = localStorage.getItem("licenseUrl");
    const refreshToken = localStorage.getItem("refreshToken");
    const provider = localStorage.getItem("provider");
    const accessToken = localStorage.getItem("accessToken");

    if (
      accessToken &&
      refreshToken &&
      userNo &&
      userName &&
      userId &&
      role &&
      phone &&
      email &&
      birthDay &&
      licenseUrl
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth({
        userNo,
        userName,
        userId,
        role,
        phone,
        email,
        birthDay,
        licenseUrl,
        accessToken,
        provider: provider || null,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  // 로그인 성공 시 실행되는 함수
  const login = (
    accessToken,
    refreshToken,
    userNo,
    userName,
    userId,
    role,
    phone,
    email,
    birthDay,
    licenseUrl,
    provider
  ) => {
    setAuth({
      userNo,
      userName,
      userId,
      role,
      phone,
      email,
      birthDay,
      licenseUrl,
      accessToken,
      refreshToken,
      provider: provider || null,
      isAuthenticated: true,
    });

    localStorage.setItem("userNo", userNo);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("birthDay", birthDay);
    localStorage.setItem("licenseUrl", licenseUrl);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    if (provider) {
      localStorage.setItem("provider", provider);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setAuth({
      userNo: null,
      userName: null,
      userId: null,
      phone: null,
      email: null,
      birthDay: null,
      licenseUrl: null,
      accessToken: null,
      refreshToken: null,
      provider: null,
      role: null,
      isAuthenticated: false,
    });

    localStorage.removeItem("provider");
    localStorage.removeItem("userNo");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("birthDay");
    localStorage.removeItem("licenseUrl");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");

    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
