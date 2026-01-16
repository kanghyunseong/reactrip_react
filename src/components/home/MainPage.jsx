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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }
        
        const currentScroll = containerRef.current.scrollTop;
        const sections = ["home", "about"];
        const windowHeight = window.innerHeight;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentScroll >= sectionTop - windowHeight / 2 && 
                currentScroll < sectionTop + sectionHeight - windowHeight / 2) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
        
        ticking = false;
      });
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // 초기 실행
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  return (
    <MainPageContainer ref={containerRef} data-name="MainPage" data-node-id="2:136">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSectionContainer id="home">
        <Background />
        <HeroSection onMoreClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection && containerRef.current) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
