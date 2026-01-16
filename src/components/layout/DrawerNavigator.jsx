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

  const handleMenuClick = (path) => {
    onClose();
    if (path) {
      navigate(path);
    }
  };

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
          <MenuItem onClick={() => handleMenuClick("/diary")}>일기</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/contact")}>연락처</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => handleMenuClick("/login")}>로그인</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/signup")}>회원가입</MenuItem>
        </MenuList>
      </DrawerContainer>
    </>
  );
}
