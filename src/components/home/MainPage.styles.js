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
  scroll-behavior: auto;
  scroll-snap-type: none;

  /* 스크롤 효과/스냅 제거: 모든 입력 장치(마우스/트랙패드)에서 동일하게 부드럽게 */
  [data-snap-section] {
    transform: none;
    opacity: 1;
  }
  
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
  scroll-snap-align: none;
  scroll-snap-stop: normal;
`;
