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

    // 스크롤 효과는 제거했지만, 헤더 하이라이트(activeSection)는 유지(비용 최소화)
    const handleScroll = () => {
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
