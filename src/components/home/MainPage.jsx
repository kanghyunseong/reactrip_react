import React, { useEffect, useRef } from "react";
import Background from "../common/Background";
import Header from "../layout/Header";
import HeroSection from "./HeroSection";
import ImageCarousel from "../common/ImageCarousel";
import Footer from "../layout/Footer";
import AboutSection from "../about/AboutSection";
import { MainPageContainer, HeroSectionContainer } from "./MainPage.styles";

export default function MainPage() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = React.useState("home");
  const activeSectionRef = useRef("home");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollEffects = (currentScroll, windowHeight) => {
      const container = containerRef.current;
      if (!container) return;

      const snapSections = container.querySelectorAll("[data-snap-section]");
      snapSections.forEach((el) => {
        const sectionTop = el.offsetTop;
        const sectionCenter = sectionTop + el.offsetHeight / 2;
        const viewportCenter = currentScroll + windowHeight / 2;
        const delta = Math.abs(sectionCenter - viewportCenter);

        // 0~1 정규화 (가까울수록 1)
        const t = Math.min(1, delta / (windowHeight * 0.9));
        const raw = 1 - t;

        // easeOutCubic (부드럽지만 티 나게)
        const active = 1 - Math.pow(1 - raw, 3);
        el.style.setProperty("--snap-active", active.toFixed(4));
      });
    };

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = container.scrollTop;
          const sections = ["home", "about"];
          const windowHeight = window.innerHeight;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (!section) continue;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
              currentScroll >= sectionTop - windowHeight / 2 &&
              currentScroll < sectionTop + sectionHeight - windowHeight / 2
            ) {
              if (activeSectionRef.current !== sections[i]) {
                activeSectionRef.current = sections[i];
                setActiveSection(sections[i]);
              }
              break;
            }
          }

          updateScrollEffects(currentScroll, windowHeight);
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MainPageContainer ref={containerRef} data-name="MainPage" data-node-id="2:136">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSectionContainer id="home" data-snap-section>
        <Background />
        <HeroSection onMoreClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection && containerRef.current) {
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection("about");
          }
        }} />
        <ImageCarousel />
        <Footer />
      </HeroSectionContainer>
      <AboutSection />
    </MainPageContainer>
  );
}