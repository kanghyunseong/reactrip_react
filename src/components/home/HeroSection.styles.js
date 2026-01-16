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

export const MoreText = styled.p`
  position: absolute;
  text-transform: capitalize;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  height: 1.75rem;
  line-height: normal;
  left: calc(8.33% + 9.3125rem);
  font-style: normal;
  font-size: 1.5rem;
  color: white;
  top: 47.5rem;
  width: 3.8125rem;
  margin: 0;
  cursor: pointer;
  transition: opacity 0.3s;
  z-index: 5;

  &:hover {
    opacity: 0.8;
  }
`;

export const MainTitle = styled.div`
  position: absolute;
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-weight: 900;
  line-height: 10rem;
  left: 12.5625rem;
  max-width: calc(100vw - 15.625rem);
  text-transform: lowercase;
  font-style: normal;
  font-size: 9rem;
  color: white;
  top: 16.8125rem;
  z-index: 5;

  @media (max-width: 1400px) {
    left: 9.375rem;
    font-size: 7.5rem;
    line-height: 8.75rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    font-size: 6.25rem;
    line-height: 7.5rem;
    left: 9.375rem;
    top: 15.625rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 768px) {
    font-size: 3.75rem;
    line-height: 5rem;
    left: 1.25rem;
    top: 12.5rem;
    max-width: calc(100vw - 2.5rem);
  }
`;

export const TitleLine = styled.p`
  margin: 0;
`;

export const MoreButton = styled.div`
  position: absolute;
  border: 0.125rem solid white;
  height: 4.5625rem;
  left: calc(8.33% + 3rem);
  top: 46.0625rem;
  width: 16.4375rem;
  max-width: calc(100vw - 12.5rem);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 5;

  @media (max-width: 1400px) {
    left: 9.375rem;
    max-width: calc(100vw - 9.375rem);
  }

  @media (max-width: 1024px) {
    left: 9.375rem;
    width: 13.75rem;
    max-width: calc(100vw - 9.375rem);
    height: 3.75rem;
    top: 43.75rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 3.125rem;
    top: 40.625rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DescriptionText = styled.div`
  position: absolute;
  text-transform: capitalize;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 500;
  line-height: 1.5625rem;
  left: 12.9375rem;
  font-size: 1.125rem;
  color: white;
  top: 38.3125rem;
  width: 38.6875rem;
  max-width: calc(100vw - 15.625rem);
  z-index: 5;

  @media (max-width: 1400px) {
    left: 9.375rem;
    width: 34.375rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    left: 9.375rem;
    width: 31.25rem;
    max-width: calc(100vw - 12.5rem);
    font-size: 1rem;
    top: 36.25rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    font-size: 0.875rem;
    top: 31.25rem;
  }
`;

export const DescriptionParagraph = styled.p`
  margin: 0;
`;
