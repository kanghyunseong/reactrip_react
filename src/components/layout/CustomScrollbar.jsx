import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

const ScrollbarContainer = styled.div`
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`;

const ScrollbarTrack = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  pointer-events: auto;
  cursor: pointer;
  z-index: 1000;
`;

const ScrollbarThumb = styled.div`
  position: absolute;
  right: 0;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1px;
  transition: height 0.2s ease, top 0.2s ease, background-color 0.2s ease;
  pointer-events: auto;
  cursor: grab;
  z-index: 1001;

  &:active {
    cursor: grabbing;
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const SectionIndicator = styled.div`
  position: absolute;
  right: -1px;
  width: 4px;
  height: ${props => props.active ? '30px' : '12px'};
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 2px;
  transition: all 0.3s ease;
  pointer-events: auto;
  cursor: pointer;
  z-index: 1002;

  &:hover {
    height: 30px;
    background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  }
`;

export default function CustomScrollbar({ activeSection, setActiveSection, scrollPosition, onScroll, containerRef }) {
  const sections = ["home", "about"];
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const updateScrollbar = () => {
      if (!containerRef?.current) return;
      
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;
      const scrollableHeight = contentHeight - containerHeight;
      const scrollbarHeight = window.innerHeight * 0.6; // 60vh

      if (scrollableHeight > 0 && scrollableHeight > 10) {
        const thumbHeightRatio = containerHeight / contentHeight;
        const newThumbHeight = Math.max(scrollbarHeight * thumbHeightRatio, 20);
        setThumbHeight(newThumbHeight);

        const currentScroll = container.scrollTop || scrollPosition;
        const scrollRatio = Math.min(1, Math.max(0, currentScroll / scrollableHeight));
        const maxThumbTop = scrollbarHeight - newThumbHeight;
        setThumbTop(scrollRatio * maxThumbTop);
      } else {
        setThumbHeight(0);
        setThumbTop(0);
      }
    };

    updateScrollbar();
    const interval = setInterval(updateScrollbar, 100); // 주기적으로 업데이트
    window.addEventListener("resize", updateScrollbar);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, [scrollPosition, containerRef]);

  const scrollTo = useCallback((targetPosition, smooth = true) => {
    if (!containerRef?.current) return;
    const container = containerRef.current;
    
    // 스크롤 위치가 거의 같으면 업데이트하지 않음
    if (Math.abs(container.scrollTop - targetPosition) < 5) {
      return;
    }
    
    if (smooth) {
      // 기본 브라우저 smooth 스크롤 사용 (더 부드러움)
      container.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      container.scrollTop = targetPosition;
      // 즉시 스크롤의 경우 바로 onScroll 호출
      if (onScroll) {
        requestAnimationFrame(() => {
          onScroll(targetPosition);
        });
      }
    }
  }, [containerRef, onScroll]);

  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    isDraggingRef.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = scrollPosition;

    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current || !containerRef?.current) return;
      
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;
      const scrollableHeight = contentHeight - containerHeight;
      const scrollbarHeight = window.innerHeight * 0.6;

      const deltaY = moveEvent.clientY - dragStartY.current;
      const deltaRatio = deltaY / scrollbarHeight;
      const deltaScroll = deltaRatio * scrollableHeight;
      const newScroll = Math.max(0, Math.min(scrollableHeight, dragStartScroll.current + deltaScroll));

      scrollTo(newScroll, false); // 드래그 중에는 즉시 스크롤
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      // 드래그 종료 후 약간의 딜레이를 두고 스냅 (드래그가 완전히 끝난 후)
      setTimeout(() => {
        isDraggingRef.current = false;
        if (containerRef?.current) {
          const currentPos = containerRef.current.scrollTop;
          const snapPosition = snapToNearestSection(currentPos, 0);
          if (snapPosition !== null && Math.abs(currentPos - snapPosition) > 50) {
            scrollTo(snapPosition, true);
          }
        }
      }, 100);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTrackClick = (e) => {
    if (!containerRef?.current || !trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const scrollbarHeight = trackRect.height;
    const clickRatio = clickY / scrollbarHeight;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const contentHeight = container.scrollHeight;
    const scrollableHeight = contentHeight - containerHeight;
    const targetScroll = clickRatio * scrollableHeight;

    scrollTo(targetScroll);
  };

  const handleSectionClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && containerRef?.current) {
      const targetPosition = section.offsetTop;
      scrollTo(targetPosition, true);
      if (setActiveSection) {
        setActiveSection(sectionId);
      }
    }
  };

  const getSectionPosition = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section || !containerRef?.current) return 20; // padding-top
    
    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const contentHeight = container.scrollHeight;
    const scrollableHeight = contentHeight - containerHeight;
    const scrollbarHeight = window.innerHeight * 0.6;
    const trackHeight = scrollbarHeight - 40; // padding 제외

    if (scrollableHeight <= 0) return 20;
    
    const sectionTop = section.offsetTop;
    const sectionRatio = sectionTop / scrollableHeight;
    const position = 20 + (sectionRatio * trackHeight); // padding-top + 계산된 위치
    
    return Math.max(20, Math.min(position, scrollbarHeight - 20)); // padding 범위 내로 제한
  };

  const snapToNearestSection = useCallback((currentScroll, scrollDirection = null) => {
    if (!containerRef?.current) return currentScroll;
    
    const sections = ["home", "about"];
    const windowHeight = window.innerHeight;
    let nearestSection = null;
    let minDistance = Infinity;
    let currentSectionIndex = -1;

    // 현재 섹션 찾기
    sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // 현재 스크롤 위치가 섹션 내부에 있는지 확인
        if (currentScroll >= sectionTop - windowHeight * 0.3 && 
            currentScroll < sectionBottom - windowHeight * 0.3) {
          currentSectionIndex = index;
        }
        
        const distance = Math.abs(currentScroll - sectionTop);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = sectionTop;
        }
      }
    });

    // 스크롤 방향을 고려하여 다음/이전 섹션으로 이동
    if (scrollDirection && currentSectionIndex >= 0) {
      if (scrollDirection > 0 && currentSectionIndex < sections.length - 1) {
        // 아래로 스크롤 중이고 다음 섹션이 있으면
        const nextSection = document.getElementById(sections[currentSectionIndex + 1]);
        if (nextSection) {
          const currentSection = document.getElementById(sections[currentSectionIndex]);
          const currentSectionBottom = currentSection ? currentSection.offsetTop + currentSection.offsetHeight : 0;
          
          // 현재 섹션의 70% 이상 지나갔으면 다음 섹션으로
          if (currentScroll >= currentSectionBottom - windowHeight * 0.3) {
            return nextSection.offsetTop;
          }
        }
      } else if (scrollDirection < 0 && currentSectionIndex > 0) {
        // 위로 스크롤 중이고 이전 섹션이 있으면
        const prevSection = document.getElementById(sections[currentSectionIndex - 1]);
        if (prevSection) {
          const currentSection = document.getElementById(sections[currentSectionIndex]);
          const currentSectionTop = currentSection ? currentSection.offsetTop : 0;
          
          // 현재 섹션의 30% 이하에 있으면 이전 섹션으로
          if (currentScroll <= currentSectionTop + windowHeight * 0.3) {
            return prevSection.offsetTop;
          }
        }
      }
    }

    // 스크롤 방향이 없거나 섹션 전환이 필요 없으면 가장 가까운 섹션으로
    return nearestSection !== null ? nearestSection : currentScroll;
  }, [containerRef]);

  useEffect(() => {
    let scrollTimeout;
    let lastScrollTime = 0;
    let lastScrollTop = 0;
    let scrollDirection = 0;
    let isScrolling = false;
    let wheelTimeout;
    let isWheeling = false;

    // 스크롤 이벤트 감지 (트랙패드와 마우스 휠 모두 지원)
    const handleScroll = () => {
      if (!containerRef?.current) return;
      
      const container = containerRef.current;
      const currentScroll = container.scrollTop;
      const currentTime = Date.now();
      
      // onScroll 콜백 호출
      if (onScroll) {
        requestAnimationFrame(() => {
          onScroll(currentScroll);
        });
      }
      
      // 스크롤 방향 감지
      if (currentScroll > lastScrollTop) {
        scrollDirection = 1; // 아래로
      } else if (currentScroll < lastScrollTop) {
        scrollDirection = -1; // 위로
      }
      
      lastScrollTop = currentScroll;
      lastScrollTime = currentTime;
      isScrolling = true;
      
      // 스크롤이 멈춘 후 가장 가까운 섹션으로 스냅 (더 부드럽게)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const timeSinceLastScroll = Date.now() - lastScrollTime;
        // 마지막 스크롤 후 500ms 이상 지났고, 휠 이벤트가 끝났고, 드래그 중이 아닐 때만 스냅
        if (timeSinceLastScroll >= 500 && !isWheeling && !isDraggingRef.current) {
          const currentPos = container.scrollTop;
          const snapPosition = snapToNearestSection(currentPos, scrollDirection);
          
          // 스냅 위치가 현재 위치와 충분히 다를 때만 스냅 (임계값 증가로 덜 공격적)
          if (snapPosition !== null && Math.abs(currentPos - snapPosition) > 150) {
            scrollTo(snapPosition, true);
          }
          isScrolling = false;
        }
      }, 500);
    };

    // 마우스 휠 이벤트 (기본 스크롤 사용, 스냅 타이밍만 추적)
    const handleWheel = (e) => {
      if (!containerRef?.current) return;
      
      // 휠 이벤트 발생 시 스냅을 잠시 지연
      isWheeling = true;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isWheeling = false;
      }, 200);
      
      // 기본 스크롤 동작을 완전히 허용 (preventDefault 호출 안 함)
      // 브라우저의 기본 부드러운 스크롤 사용
    };

    const container = containerRef?.current;
    if (container) {
      // 스크롤 이벤트 리스너 추가
      container.addEventListener("scroll", handleScroll, { passive: true });
      // 휠 이벤트는 기본 스크롤을 사용하므로 passive: true로 설정
      // 트랙패드 감지만 하고 기본 동작은 방해하지 않음
      container.addEventListener("wheel", handleWheel, { passive: true });
      
      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleWheel);
        clearTimeout(scrollTimeout);
        clearTimeout(wheelTimeout);
      };
    }
  }, [containerRef, snapToNearestSection, scrollTo, onScroll]);

  return (
    <ScrollbarContainer>
      <ScrollbarTrack ref={trackRef} onClick={handleTrackClick} />
      <ScrollbarThumb
        style={{
          height: `${thumbHeight}px`,
          top: `${thumbTop}px`
        }}
        onMouseDown={handleThumbMouseDown}
      />
      {sections.map((sectionId) => {
        const sectionTop = getSectionPosition(sectionId);
        return (
          <SectionIndicator
            key={sectionId}
            active={activeSection === sectionId}
            style={{ top: `${sectionTop}px` }}
            onClick={() => handleSectionClick(sectionId)}
          />
        );
      })}
    </ScrollbarContainer>
  );
}
