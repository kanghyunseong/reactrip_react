import styled from "styled-components";

export const LineContainer = styled.div`
  position: absolute;
  height: 0;
`;

export const LineImg = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;

export const VerticalLineContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RotatedLine = styled.div`
  flex: none;
  transform: rotate(90deg);
`;

export const GithubIcon = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  overflow: hidden;
  width: 40px;
  height: 40px;
  z-index: 100;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

export const IconContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GithubSvg = styled.svg`
  width: 100%;
  height: 100%;
  color: #24292e;
  transition: color 0.3s;
  
  ${GithubIcon}:hover & {
    color: #0366d6;
  }
`;
