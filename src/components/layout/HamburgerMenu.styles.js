import styled from "styled-components";

export const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  right: 40px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
  padding: 8px;
  transition: all 0.3s;

  & > div {
    background-color: ${(p) => (p.$light ? "#2c2c2c" : "white")};
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const HamburgerLine = styled.div`
  width: 28px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
`;
