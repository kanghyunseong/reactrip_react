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

  /* 스크롤 시 섹션 전환 효과(스냅 유지) */
  [data-snap-section] {
    --snap-active: 1;
    will-change: transform, opacity;
    transform-style: preserve-3d;
    backface-visibility: hidden;

    /* 티 나게: 깊이감(rotateX) + 큰 이동/스케일 */
    transform: perspective(1200px)
      translate3d(0, calc((1 - var(--snap-active)) * 90px), 0)
      rotateX(calc((1 - var(--snap-active)) * 10deg))
      scale(calc(0.92 + var(--snap-active) * 0.08));

    /* 티 나게: 멀어질수록 블러/채도/밝기 감소 */
    filter: blur(calc((1 - var(--snap-active)) * 6px))
      saturate(calc(0.7 + var(--snap-active) * 0.3))
      brightness(calc(0.8 + var(--snap-active) * 0.2));

    opacity: calc(0.25 + var(--snap-active) * 0.75);
  }
  
  @media (prefers-reduced-motion: reduce) {
    [data-snap-section] {
      transform: none;
      filter: none;
      opacity: 1;
    }
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
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;
