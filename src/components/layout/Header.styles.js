import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  left: 76px;
  top: 18px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (max-width: 1024px) {
    left: 40px;
    top: 15px;
  }

  @media (max-width: 768px) {
    left: 20px;
    top: 10px;
  }
`;

export const LogoContainer = styled.div`
  height: 65px;
  width: 166px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    height: 55px;
    width: 140px;
  }

  @media (max-width: 768px) {
    height: 45px;
    width: 120px;
  }
`;

export const LogoImg = styled.img`
  position: absolute;
  inset: 0;
  max-width: none;
  object-fit: contain;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: block;
`;

export const GroupContainer = styled.div`
  position: absolute;
  z-index: 3;
  inset: 5.28% 4.17% 92.87% 94.58%;
`;

export const GroupImg = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;

export const NavText = styled.p`
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: 700;
  height: 34px;
  line-height: normal;
  font-style: normal;
  color: #faf5f5;
  font-size: 24px;
  margin: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  margin-left: 0;

  @media (max-width: 1024px) {
    font-size: 20px;
    height: 28px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    height: 24px;
  }
`;

export const NavLink = styled.p`
  position: fixed;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  line-height: normal;
  font-style: normal;
  font-size: 24px;
  color: white;
  top: 59px;
  margin: 0;
  padding-bottom: 0;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 100;
  text-decoration: none !important;
  border-bottom: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 20px;
    top: 55px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    top: 50px;
  }

  &:hover {
    opacity: 0.8;
    text-decoration: none !important;
    border-bottom: none !important;
  }

  &:active,
  &:focus {
    text-decoration: none !important;
    border-bottom: none !important;
    outline: none !important;
  }

  &::before,
  &::after {
    display: none !important;
    content: none !important;
  }
`;

export const RouletteText = styled.div`
  position: fixed;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  height: 17px;
  line-height: normal;
  left: calc(50% - 68.5px);
  font-style: normal;
  font-size: 24px;
  color: white;
  top: 59px;
  width: 137px;
  padding-bottom: 0;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 100;
  text-decoration: none !important;
  border-bottom: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 20px;
    top: 55px;
    left: calc(50% - 57px);
    width: 114px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    top: 50px;
    left: calc(50% - 46px);
    width: 92px;
  }

  &:hover {
    opacity: 0.8;
    text-decoration: none !important;
    border-bottom: none !important;
  }

  &:active,
  &:focus {
    text-decoration: none !important;
    border-bottom: none !important;
    outline: none !important;
  }

  &::before,
  &::after {
    display: none !important;
    content: none !important;
  }

  p {
    margin: 0;
    text-decoration: none !important;
    border-bottom: none !important;
  }
`;
