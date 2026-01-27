import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  CloseButton,
  MenuList,
  MenuItem,
  MenuDivider
} from "./DrawerNavigator.styles";

export default function DrawerNavigator({ isOpen, onClose }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  const role = localStorage.getItem("role");
  const isAdmin = String(role || "").toUpperCase().includes("ADMIN");

  const handleMenuClick = (path) => {
    onClose();
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    alert("로그아웃 되었습니다");
    onClose();
    navigate("/");
  }

  if (!isOpen) return null;

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <DrawerContainer>
        <DrawerHeader>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DrawerHeader>
        <MenuList>
          <MenuItem onClick={() => handleMenuClick("/")}>홈</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/schedule")}>일정</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/tour")}>투어</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/roulette")}>룰렛</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/diarys")}>일기</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/contact")}>연락처</MenuItem>
          <MenuDivider />
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <MenuItem onClick={() => handleMenuClick("/admin/dashboard")}>관리자 페이지</MenuItem>
              ) : null}
              <MenuItem onClick={() => handleMenuClick("/mypage")}>마이페이지</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem> 
            </>
          ) : (
            <>
              <MenuItem onClick={() => handleMenuClick("/login")}>로그인</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/signup")}>회원가입</MenuItem>
            </>
          )}
        </MenuList>
      </DrawerContainer>
    </>
  );
}
