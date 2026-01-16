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
  width: 30px;
  height: 30px;
  z-index: 100;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
`;

export const IconImg = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;
