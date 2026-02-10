import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { imgLogoRemovebgPreview1 } from "../../constants/constants";
import HamburgerMenu from "./HamburgerMenu";
import DrawerNavigator from "./DrawerNavigator";
import {
  NavContainer,
  LogoContainer,
  LogoImg,
  NavText,
  NavLink,
  RouletteText
} from "./Header.styles";

export default function Header({ activeSection = "home", setActiveSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const isLightPage =
    location.pathname.startsWith("/diarys") ||
    location.pathname.startsWith("/tour") ||
    location.pathname.startsWith("/schedule") ||
    location.pathname.startsWith("/contact") ||
    location.pathname.startsWith("/roulette");

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        if (setActiveSection) {
          setActiveSection(sectionId);
        }
      }
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const homeSection = document.getElementById("home");
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // 메인 페이지에 있으면 맨 위로 스크롤
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (setActiveSection) {
        setActiveSection("home");
      }
    }
  };

  return (
    <>
      <NavContainer data-node-id="5:162">
        <LogoContainer 
          data-name="Logo-removebg-preview 1" 
          data-node-id="3:3"
          onClick={handleLogoClick}
        >
          <LogoImg alt="ReacTrip Logo" src={imgLogoRemovebgPreview1} onError={(e) => { e.target.style.display = 'none'; }} />
        </LogoContainer>
        <NavText 
          data-node-id="2:139"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
          $light={isLightPage}
        >
          ReacTrip
        </NavText>
      </NavContainer>
      <NavLink 
        style={{ left: "calc(20% - 30px)" }} 
        data-node-id="2:171"
        onClick={() => scrollToSection("about")}
        $light={isLightPage}
      >
        ABOUT
      </NavLink>
      <NavLink 
        style={{ left: "calc(30% - 50px)" }} 
        data-node-id="2:172"
        onClick={() => handleNavigation("/schedule")}
        $light={isLightPage}
      >
        SCHEDULE
      </NavLink>
      <NavLink 
        style={{ left: "calc(40% - 25px)" }} 
        data-node-id="2:173"
        onClick={() => handleNavigation("/tour")}
        $light={isLightPage}
      >
        TOUR
      </NavLink>
      <RouletteText 
        style={{ left: "calc(50% - 68.5px)" }}
        data-node-id="2:174"
        onClick={() => handleNavigation("/roulette")}
        $light={isLightPage}
      >
        <p>ROULETTE</p>
        <p>&nbsp;</p>
      </RouletteText>
      <NavLink 
        style={{ left: "calc(60% - 30px)" }} 
        data-node-id="58:666"
        onClick={() => handleNavigation("/diarys")}
        $light={isLightPage}
      >
        DIARY
      </NavLink>
      <NavLink 
        style={{ left: "calc(70% - 45px)" }} 
        data-node-id="5:7"
        onClick={() => handleNavigation("/contact")}
        $light={isLightPage}
      >
        CONTACT
      </NavLink>
      <HamburgerMenu 
        isOpen={isDrawerOpen} 
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        $light={isLightPage}
      />
      <DrawerNavigator 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}
