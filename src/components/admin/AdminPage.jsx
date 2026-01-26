import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CPUUsageWidget from "./charts/CPUUsageWidget";
import RAMUsageWidget from "./charts/RAMUsageWidget";
import TemperatureWidget1 from "./charts/TemperatureWidget1";
import TemperatureWidget2 from "./charts/TemperatureWidget2";
import {
  PageContainer,
  AdminHeader,
  TopBarBg,
  LogoContainer,
  LogoImg,
  SearchContainer,
  SearchIcon,
  SearchIconWrapper,
  SearchIconFallback,
  SearchInput,
  NotificationIcon,
  NotificationIconWrapper,
  NotificationIconFallback,
  ProfileContainer,
  ProfileAvatar,
  ProfileDropdown,
  ProfileName,
  AdminContent,
  Sidebar,
  SidebarMenu,
  MenuItem,
  MenuItemActive,
  MenuIcon,
  MenuIconEmoji,
  MenuText,
  WidgetsGrid,
  Widget,
  WidgetTitle,
  EmptyWidget,
  EmptyText,
  CreditsCard,
  CreditsTitle,
  CreditsVersion,
} from "./AdminPage.styles";
import {
  imgLogoRemovebgPreview2,
  imgTopBarBg,
  imgIconOtherSearch,
  imgIconSocialNotifications,
  imgAvatarMan15,
} from "../../constants/constants";

export default function AdminPage() {
  const { auth } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState("raspberry");

  const menuItems = [
    { id: "raspberry", label: "Raspberry Pi", icon: "📊", iconType: "emoji" },
    { id: "people", label: "People", icon: "👥", iconType: "emoji" },
    { id: "projects", label: "Projects", icon: "📁", iconType: "emoji" },
    { id: "calendar", label: "Calendar", icon: "📅", iconType: "emoji" },
    { id: "training", label: "Training", icon: "💻", iconType: "emoji" },
    { id: "timesheet", label: "Timesheet", icon: "⏰", iconType: "emoji" },
    { id: "reports", label: "Reports", icon: "📊", iconType: "emoji" },
    { id: "administration", label: "Administration", icon: "⚙️", iconType: "emoji" },
    { id: "help", label: "Help", icon: "❓", iconType: "emoji" },
  ];

  const userName = auth?.userName || "홍길동";

  return (
    <PageContainer>
      <AdminHeader>
        <TopBarBg src={imgTopBarBg} alt="top bar" onError={(e) => { e.target.style.display = 'none'; }} />
        <LogoContainer>
          <LogoImg src={imgLogoRemovebgPreview2} alt="ReacTrip Logo" onError={(e) => { e.target.style.display = 'none'; }} />
        </LogoContainer>
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon 
              src={imgIconOtherSearch} 
              alt="search" 
              onError={(e) => { 
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = 'block';
              }} 
            />
            <SearchIconFallback style={{ display: 'none' }}>🔍</SearchIconFallback>
          </SearchIconWrapper>
          <SearchInput type="text" placeholder="Quick search" />
        </SearchContainer>
        <NotificationIconWrapper>
          <NotificationIcon 
            src={imgIconSocialNotifications} 
            alt="notifications" 
            onError={(e) => { 
              e.target.style.display = 'none';
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = 'block';
            }} 
          />
          <NotificationIconFallback style={{ display: 'none' }}>🔔</NotificationIconFallback>
        </NotificationIconWrapper>
        <ProfileContainer>
          <ProfileAvatar src={imgAvatarMan15} alt="avatar" onError={(e) => { e.target.style.display = 'none'; }} />
          <ProfileName>{userName}, 관리자님</ProfileName>
          <ProfileDropdown>▼</ProfileDropdown>
        </ProfileContainer>
      </AdminHeader>

      <AdminContent>
        <Sidebar>
          <SidebarMenu>
            {menuItems.map((item) =>
              activeMenu === item.id ? (
                <MenuItemActive key={item.id} onClick={() => setActiveMenu(item.id)}>
                  {item.iconType === "emoji" ? (
                    <MenuIconEmoji>{item.icon}</MenuIconEmoji>
                  ) : (
                    <MenuIcon src={item.icon} alt={item.label} onError={(e) => { e.target.style.display = 'none'; }} />
                  )}
                  <MenuText>{item.label}</MenuText>
                </MenuItemActive>
              ) : (
                <MenuItem key={item.id} onClick={() => setActiveMenu(item.id)}>
                  {item.iconType === "emoji" ? (
                    <MenuIconEmoji>{item.icon}</MenuIconEmoji>
                  ) : (
                    <MenuIcon src={item.icon} alt={item.label} onError={(e) => { e.target.style.display = 'none'; }} />
                  )}
                  <MenuText>{item.label}</MenuText>
                </MenuItem>
              )
            )}
          </SidebarMenu>
          <CreditsCard>
            <CreditsTitle>ReacTrip</CreditsTitle>
            <CreditsVersion>Version: 1.0.0.11</CreditsVersion>
          </CreditsCard>
        </Sidebar>

        <WidgetsGrid>
          <Widget>
            <CPUUsageWidget />
          </Widget>
          <Widget>
            <RAMUsageWidget />
          </Widget>
          <Widget>
            <TemperatureWidget1 />
          </Widget>
          <Widget>
            <TemperatureWidget2 />
          </Widget>
        </WidgetsGrid>
      </AdminContent>
    </PageContainer>
  );
}
