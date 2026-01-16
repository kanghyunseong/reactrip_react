import styled from "styled-components";

export const BackgroundImageContainer = styled.div`
  position: absolute;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

export const BackgroundImg = styled.img`
  position: absolute;
  inset: 0;
  max-width: none;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: high-quality;
  -ms-interpolation-mode: bicubic;
  image-rendering: auto;
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`;
