import styled from "styled-components";

export const AboutPage1 = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
`;

export const AboutPage2 = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
`;

export const AboutBackground = styled.div`
  position: absolute;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
`;

export const AboutBackgroundImg = styled.img`
  position: absolute;
  inset: 0;
  max-width: none;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: block;
`;

export const AboutOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  position: absolute;
  height: 600px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  max-width: calc(100vw - 250px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
  z-index: 2;

  @media (max-width: 1400px) {
    right: 50px;
    width: 450px;
    height: 550px;
    max-width: calc(100vw - 200px);
  }

  @media (max-width: 1024px) {
    width: 400px;
    max-width: calc(100vw - 200px);
    height: 500px;
    right: 50px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    max-width: calc(100vw - 40px);
    height: 300px;
    right: 20px;
    top: 200px;
    transform: none;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 20px;
  display: block;
`;

export const ImageContainer2 = styled.div`
  position: absolute;
  height: 600px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 400px;
    height: 500px;
    right: 50px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    height: 300px;
    right: 20px;
    top: 200px;
    transform: none;
  }
`;

export const BackgroundImage2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 20px;
  display: block;
`;

export const Title = styled.h1`
  position: absolute;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  line-height: 1.2;
  left: 12.5625rem;
  max-width: calc(100vw - 15.625rem);
  font-style: normal;
  font-size: 9rem;
  text-transform: uppercase;
  color: white;
  top: 12.5rem;
  margin: 0;
  z-index: 5;

  @media (max-width: 1400px) {
    left: 9.375rem;
    font-size: 7.5rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    font-size: 6.25rem;
    left: 9.375rem;
    top: 11.25rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 768px) {
    font-size: 3.125rem;
    left: 1.25rem;
    top: 9.375rem;
    max-width: calc(100vw - 2.5rem);
  }
`;

export const Title2 = styled.h1`
  position: absolute;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  line-height: 1.2;
  left: 12.5625rem;
  max-width: calc(100vw - 15.625rem);
  font-style: normal;
  font-size: 9rem;
  text-transform: uppercase;
  color: #af4f4f;
  top: 12.5rem;
  margin: 0;
  z-index: 5;

  @media (max-width: 1400px) {
    left: 9.375rem;
    font-size: 7.5rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    font-size: 6.25rem;
    left: 9.375rem;
    top: 11.25rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 768px) {
    font-size: 3.125rem;
    left: 1.25rem;
    top: 9.375rem;
    max-width: calc(100vw - 2.5rem);
  }
`;

export const LeftContent = styled.div`
  position: absolute;
  left: 12.9375rem;
  top: 28.125rem;
  width: 37.5rem;
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
    top: 26.25rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    top: 21.875rem;
  }
`;

export const DescriptionText = styled.div`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 500;
  line-height: 1.8;
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`;

export const DescriptionParagraph = styled.p`
  margin: 0 0 15px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const LoginButton = styled.div`
  position: absolute;
  border: 0.125rem solid white;
  height: 4.5625rem;
  right: 6.25rem;
  top: 57.5rem;
  width: 16.4375rem;
  max-width: calc(100vw - 12.5rem);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1400px) {
    right: 3.125rem;
    max-width: calc(100vw - 9.375rem);
  }

  @media (max-width: 1024px) {
    right: 3.125rem;
    width: 13.75rem;
    max-width: calc(100vw - 9.375rem);
    height: 3.75rem;
    top: 53.125rem;
  }

  @media (max-width: 768px) {
    right: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 3.125rem;
    top: 46.875rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const LoginText = styled.span`
  text-transform: capitalize;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
