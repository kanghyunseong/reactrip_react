import styled from "styled-components";

export const MainPageContainer = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  
  /* 기본 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  /* 스크롤 부드럽게 */
  -webkit-overflow-scrolling: touch;
`;

export const HeroSectionContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;
