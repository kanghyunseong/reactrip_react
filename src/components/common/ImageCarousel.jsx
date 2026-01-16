import React, { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { imgRectangle4, imgRectangle6, imgVector, imgVector1 } from "../../constants/constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  SwiperContainer,
  StyledSwiper,
  SlideImage,
  VectorContainer,
  VectorImg,
  ArrowButton,
  GradientOverlay,
  CustomPagination,
  PaginationDot
} from "./ImageCarousel.styles";

export default function ImageCarousel() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // 이미지 배열 (필요에 따라 더 추가 가능)
  const images = [
    { src: imgRectangle6, number: "02" },
    { src: imgRectangle4, number: "01" },
    { src: imgRectangle6, number: "03" },
    { src: imgRectangle4, number: "04" },
    { src: imgRectangle6, number: "05" },
  ];

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <>
      <SwiperContainer data-node-id="2:209">
        <StyledSwiper
          modules={[Navigation, Pagination]}
          direction="vertical"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          speed={800}
          pagination={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideImage alt={`Slide ${index + 1}`} src={image.src} />
            </SwiperSlide>
          ))}
        </StyledSwiper>
        <CustomPagination>
          {images.map((_, index) => (
            <PaginationDot
              key={index}
              $active={index === activeIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </CustomPagination>
      </SwiperContainer>
      <VectorContainer style={{ inset: "49.76% 42.57% 47.54% 56.67%" }} data-name="Vector" data-node-id="2:211">
        <VectorImg alt="" src={imgVector} />
      </VectorContainer>
      <ArrowButton 
        className="swiper-button-prev-custom"
        style={{ left: "calc(83.33% + 58px)", width: "50px", height: "50px", top: "527px" }}
        onClick={handlePrev}
      >
        <div style={{ flex: "none", transform: "rotate(180deg) scaleY(-1)" }}>
          <div style={{ width: "50px", height: "50px" }} data-name="eva:arrow-ios-back-outline" data-node-id="2:212" />
        </div>
      </ArrowButton>
      <GradientOverlay data-node-id="2:213" />
      <ArrowButton 
        className="swiper-button-next-custom"
        style={{ inset: "49.76% 9.29% 47.54% 89.95%" }}
        onClick={handleNext}
      >
        <div style={{ flex: "none", height: "29.169px", transform: "rotate(180deg) scaleY(-1)", width: "14.581px" }}>
          <div style={{ position: "relative", width: "100%", height: "100%" }} data-name="Vector" data-node-id="2:216">
            <VectorImg alt="" src={imgVector1} />
          </div>
        </div>
      </ArrowButton>
    </>
  );
}
