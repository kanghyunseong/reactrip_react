import React from "react";
import { HamburgerButton, HamburgerLine } from "./HamburgerMenu.styles";

export default function HamburgerMenu({ isOpen, onClick, $light }) {
  return (
    <HamburgerButton onClick={onClick} $isOpen={isOpen} $light={$light}>
      <HamburgerLine />
      <HamburgerLine />
      <HamburgerLine />
    </HamburgerButton>
  );
}
