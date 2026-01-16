import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  left: 4.75rem;
  top: 1.125rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  max-width: calc(100vw - 9.5rem);

  @media (max-width: 1024px) {
    left: 2.5rem;
    top: 0.9375rem;
    max-width: calc(100vw - 5rem);
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    top: 0.625rem;
    max-width: calc(100vw - 2.5rem);
  }
`;

export const LogoContainer = styled.div`
  height: 4.0625rem;
  width: 10.375rem;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    height: 3.4375rem;
    width: 8.75rem;
  }

  @media (max-width: 768px) {
    height: 2.8125rem;
    width: 7.5rem;
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
  height: 2.125rem;
  line-height: normal;
  font-style: normal;
  color: #faf5f5;
  font-size: 1.5rem;
  margin: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  margin-left: 0;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
    height: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    height: 1.5rem;
  }
`;

export const NavLink = styled.p`
  position: fixed;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  line-height: normal;
  font-style: normal;
  font-size: 1.5rem;
  color: white;
  top: 3.6875rem;
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
    font-size: 1.25rem;
    top: 3.4375rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    top: 3.125rem;
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
  height: 1.0625rem;
  line-height: normal;
  left: calc(50% - 4.28125rem);
  font-style: normal;
  font-size: 1.5rem;
  color: white;
  top: 3.6875rem;
  width: 8.5625rem;
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
    font-size: 1.25rem;
    top: 3.4375rem;
    left: calc(50% - 3.5625rem);
    width: 7.125rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    top: 3.125rem;
    left: calc(50% - 2.875rem);
    width: 5.75rem;
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
