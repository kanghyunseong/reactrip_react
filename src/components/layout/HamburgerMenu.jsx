import React from "react";
import { HamburgerButton, HamburgerLine } from "./HamburgerMenu.styles";

export default function HamburgerMenu({ isOpen, onClick }) {
  return (
    <HamburgerButton onClick={onClick} $isOpen={isOpen}>
      <HamburgerLine />
      <HamburgerLine />
      <HamburgerLine />
    </HamburgerButton>
  );
}
