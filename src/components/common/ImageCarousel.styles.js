import styled from "styled-components";
import { Swiper } from "swiper/react";

export const SwiperContainer = styled.div`
  position: absolute;
  height: 44.5rem;
  left: calc(58.33% - 0.125rem);
  top: 12.25rem;
  width: 37.125rem;
  max-width: calc(100vw - 2.5rem);
  z-index: 5;
  overflow: visible;

  @media (max-width: 1400px) {
    left: calc(55% - 0.125rem);
    width: 31.25rem;
    height: 40.625rem;
  }

  @media (max-width: 1024px) {
    width: 28.125rem;
    max-width: calc(100vw - 2.5rem);
    height: 37.5rem;
    left: calc(55% - 0.125rem);
    top: 11.25rem;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    height: 25rem;
    left: 1.25rem;
    top: 9.375rem;
  }
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  
  /* Swiper 기본 pagination 숨기기 */
  .swiper-pagination {
    display: none !important;
  }
  
  .swiper-pagination-bullet {
    display: none !important;
  }
  
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    overflow: hidden;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-origin: center center;
    filter: brightness(0.7);
  }
  
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  
  .swiper-slide-active {
    z-index: 10;
    transform: scale(1.05);
    opacity: 1;
    filter: brightness(1);
    
    img {
      transform: scale(1);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 
                  0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }
  
  .swiper-slide-prev {
    z-index: 5;
    transform: scale(0.88) translateY(30px);
    opacity: 0.75;
    filter: brightness(0.6);
    
    img {
      transform: scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }
  }
  
  .swiper-slide-next {
    z-index: 5;
    transform: scale(0.88) translateY(-30px);
    opacity: 0.75;
    filter: brightness(0.6);
    
    img {
      transform: scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }
  }
  
  .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
    opacity: 0.4;
    transform: scale(0.8);
    filter: brightness(0.5);
    
    img {
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
  }

  /* 좌/우 네비게이션 화살표(바깥쪽) */
  .swiper-button-prev,
  .swiper-button-next {
    color: rgba(255, 255, 255, 0.9);
    width: 3.25rem;
    height: 3.25rem;
    z-index: 20;
    filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.45));
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 2.25rem;
    font-weight: 800;
  }

  /* 화살표를 좌/우로 캐러셀 '밖'에 배치 */
  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    bottom: auto;
    left: auto;
    right: auto;
    margin: 0;
    transform: translateY(-50%) scale(1);
  }

  .swiper-button-prev {
    left: -3.75rem;
  }

  .swiper-button-next {
    right: -3.75rem;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    opacity: 0.85;
    transform: translateY(-50%) scale(1.08);
  }

  .swiper-button-prev:active,
  .swiper-button-next:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    .swiper-button-prev {
      left: 0.5rem;
    }
    .swiper-button-next {
      right: 0.5rem;
    }
  }
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VectorContainer = styled.div`
  position: absolute;
`;

export const VectorImg = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  background: linear-gradient(
    to bottom, 
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 30%,
    rgba(0, 0, 0, 0.1) 70%,
    rgba(0, 0, 0, 0.15) 100%
  );
  height: 44.5rem;
  left: calc(58.33% - 0.125rem);
  box-shadow: 1.25rem 1.25rem 4.375rem 0px rgba(0, 0, 0, 0.6),
              inset 0 0 6.25rem rgba(0, 0, 0, 0.2);
  top: 12.25rem;
  width: 37.125rem;
  z-index: 6;
  pointer-events: none;
  border: 0.0625rem solid rgba(255, 255, 255, 0.05);
`;

export const CustomPagination = styled.div`
  position: absolute;
  bottom: 1.875rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.9375rem;
  z-index: 7;
  pointer-events: none;
`;

export const PaginationDot = styled.div`
  width: ${props => props.$active ? '0.75rem' : '0.625rem'};
  height: ${props => props.$active ? '0.75rem' : '0.625rem'};
  border-radius: 50%;
  background-color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: auto;
  box-shadow: ${props => props.$active 
    ? '0 0 10px rgba(255, 255, 255, 0.6), 0 2px 5px rgba(0, 0, 0, 0.3)' 
    : '0 2px 5px rgba(0, 0, 0, 0.2)'};

  &:hover {
    transform: scale(1.3);
    background-color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  }
`;
