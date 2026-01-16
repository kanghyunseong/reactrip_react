import styled from "styled-components";

export const AboutPage1 = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
`;

export const AboutPage2 = styled.section`
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
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
  left: 201px;
  font-style: normal;
  font-size: 144px;
  text-transform: uppercase;
  color: white;
  top: 200px;
  margin: 0;
  z-index: 5;
`;

export const Title2 = styled.h1`
  position: absolute;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  line-height: 1.2;
  left: 201px;
  font-style: normal;
  font-size: 144px;
  text-transform: uppercase;
  color: #af4f4f;
  top: 200px;
  margin: 0;
  z-index: 5;

  @media (max-width: 1024px) {
    font-size: 100px;
    left: 150px;
    top: 180px;
  }

  @media (max-width: 768px) {
    font-size: 50px;
    left: 20px;
    top: 150px;
  }
`;

export const LeftContent = styled.div`
  position: absolute;
  left: 207px;
  top: 450px;
  width: 600px;
  z-index: 5;

  @media (max-width: 1024px) {
    left: 150px;
    width: 500px;
    top: 420px;
  }

  @media (max-width: 768px) {
    left: 20px;
    width: calc(100% - 40px);
    top: 350px;
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
  border: 2px solid white;
  height: 73px;
  right: 100px;
  top: 920px;
  width: 263px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    right: 50px;
    width: 220px;
    height: 60px;
    top: 850px;
  }

  @media (max-width: 768px) {
    right: 20px;
    width: calc(100% - 40px);
    height: 50px;
    top: 750px;
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
