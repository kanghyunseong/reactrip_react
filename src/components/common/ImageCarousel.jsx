import React, { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { imgRectangle4, imgRectangle6 } from "../../constants/constants";
import "swiper/css";
import "swiper/css/navigation";
import {
  SwiperContainer,
  StyledSwiper,
  SlideImage,
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
          modules={[Autoplay, Navigation]}
          direction="vertical"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          speed={800}
          pagination={false}
          navigation={true}
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
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
      <GradientOverlay data-node-id="2:213" />
    </>
  );
}
