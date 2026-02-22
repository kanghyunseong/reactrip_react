import styled from "styled-components";

export const AboutPage1 = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  height: 100dvh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow-x: hidden;
  overflow-y: hidden;
  /* 상단 Hero와 배경 겹침 방지: 자체 레이어로 분리 */
  isolation: isolate;
  background: #1c1c1c;
  z-index: 1;
  /* 섹션 상단 경계 명확화 */
  box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.06);
`;

export const AboutPage2 = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  height: 100dvh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow-x: hidden;
  overflow-y: hidden;
  isolation: isolate;
  background: #1c1c1c;
  z-index: 1;
`;

export const AboutBackground = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  /* 배경 이미지가 섹션 안에서만 보이도록 클리핑 */
  overflow: hidden;
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
  background-color: rgba(0, 0, 0, 0.45);
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

export const ImageContainer = styled.div`
  position: absolute;
  height: 37.5rem;
  right: 6.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 31.25rem;
  max-width: calc(100vw - 15.625rem);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1.25rem;
  z-index: 2;

  @media (max-width: 1400px) {
    right: 3.125rem;
    width: 28.125rem;
    height: 34.375rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    width: 25rem;
    max-width: calc(100vw - 12.5rem);
    height: 31.25rem;
    right: 3.125rem;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 18.75rem;
    right: 1.25rem;
    top: 12.5rem;
    transform: none;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 1.25rem;
  display: block;
`;

export const ImageContainer2 = styled.div`
  position: absolute;
  height: 37.5rem;
  right: 6.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 31.25rem;
  max-width: calc(100vw - 15.625rem);
  border-radius: 1.25rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (max-width: 1400px) {
    right: 3.125rem;
    width: 28.125rem;
    height: 34.375rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    width: 25rem;
    max-width: calc(100vw - 12.5rem);
    height: 31.25rem;
    right: 3.125rem;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 18.75rem;
    right: 1.25rem;
    top: 12.5rem;
    transform: none;
  }
`;

export const BackgroundImage2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 1.25rem;
  display: block;
`;

export const SectionLabel = styled.span`
  position: absolute;
  left: 12.5625rem;
  top: 4rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.7);
  z-index: 6;
  @media (max-width: 768px) {
    left: 1.25rem;
    top: 3rem;
  }
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
  z-index: 6;

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
  z-index: 6;

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
  top: 36rem;
  bottom: 10rem;
  width: 37.5rem;
  max-width: calc(100vw - 15.625rem);
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.75rem;

  /* 내부 스크롤바 표시(얇게) */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.45) rgba(255, 255, 255, 0.12); /* Firefox */

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.45);
    border-radius: 999px;
    border: 2px solid rgba(255, 255, 255, 0.12);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 1400px) {
    left: 9.375rem;
    width: 34.375rem;
    max-width: calc(100vw - 12.5rem);
  }

  @media (max-width: 1024px) {
    left: 9.375rem;
    width: 31.25rem;
    max-width: calc(100vw - 12.5rem);
    top: 32rem;
    bottom: 8.5rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    top: 33.5rem;
    bottom: 7.5rem;
  }
`;

export const DescriptionText = styled.div`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 500;
  line-height: 1.8;
  color: white;
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;

export const DescriptionParagraph = styled.p`
  margin: 0 0 0.9375rem 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const LoginButton = styled.div`
  position: absolute;
  border: 0.125rem solid white;
  height: 4.5625rem;
  right: 6.25rem;
  bottom: 3.75rem;
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
    bottom: 3.25rem;
  }

  @media (max-width: 768px) {
    right: 1.25rem;
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 3.125rem;
    bottom: 2.5rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const LoginText = styled.span`
  text-transform: capitalize;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;
