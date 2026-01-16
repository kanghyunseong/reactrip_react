import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fafafa;
  overflow-x: hidden;
  max-width: 100vw;
`;

export const AdminHeader = styled.header`
  position: relative;
  width: 100%;
  min-height: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 100;
  max-width: 100vw;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  @media (max-width: 1200px) {
    padding: 0 0.75rem;
  }
  
  @media (max-width: 768px) {
    height: 3.75rem;
    min-height: 3.75rem;
    padding: 0 0.5rem;
  }
`;

export const TopBarBg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  
  &[src=""], &[src*="localhost:3845"] {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.3125rem;
  width: 9.375rem;
  height: 3.6875rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    width: 7.5rem;
    height: 2.9375rem;
    top: 0.375rem;
  }
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const SearchContainer = styled.div`
  position: absolute;
  left: 18rem;
  top: 1.625rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 1200px) {
    left: 12.5rem;
    top: 1.25rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchIconWrapper = styled.div`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
`;

export const SearchIconFallback = styled.span`
  font-size: 1rem;
  display: none;
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  color: #8e8e93;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.03125rem;
  padding: 0;
  width: 12.5rem;
  max-width: 12.5rem;
  
  &::placeholder {
    color: #8e8e93;
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 1200px) {
    width: 9.375rem;
    max-width: 9.375rem;
    font-size: 0.75rem;
  }
`;

export const NotificationIconWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
`;

export const NotificationIconFallback = styled.span`
  font-size: 1.125rem;
  display: none;
`;

export const ProfileContainer = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  backdrop-filter: blur(10px);
  
  @media (max-width: 1200px) {
    left: 1rem;
    gap: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  @media (max-width: 768px) {
    left: 0.5rem;
    gap: 0.5rem;
    top: 0.625rem;
    padding: 0.25rem 0.5rem;
  }
`;

// ProfileSheet는 스타일로 대체됨 (제거)

export const ProfileAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

export const ProfileName = styled.p`
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.875rem;
  letter-spacing: 0.009375rem;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: 1200px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.125rem;
    display: none;
  }
`;

export const ProfileDropdown = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  user-select: none;
  
  &:hover {
    color: rgba(0, 0, 0, 0.87);
  }
`;

export const AdminContent = styled.div`
  display: flex;
  margin-top: 5rem;
  min-height: calc(100vh - 5rem);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-top: 3.75rem;
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 16rem;
  min-width: 16rem;
  background: white;
  border-radius: 0.875rem;
  margin: 1rem;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
  position: sticky;
  top: 6rem;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    width: 13.75rem;
    min-width: 13.75rem;
    margin: 0.75rem;
    padding: 1.25rem 0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    margin: 0;
    border-radius: 0;
    position: relative;
    top: 0;
    max-height: 60vh;
    overflow-y: auto;
  }
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const MenuIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  
  &[src=""], &[src*="localhost:3845"] {
    display: none;
  }
`;

export const MenuIconEmoji = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

export const MenuText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  letter-spacing: 0.00625rem;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  height: 2.5rem;
  
  &:hover {
    background: rgba(47, 128, 237, 0.05);
  }
`;

export const MenuItemActive = styled(MenuItem)`
  background: rgba(47, 128, 237, 0.1);
  border-left: 0.25rem solid #2f80ed;
  
  ${MenuText} {
    color: #2f80ed;
    font-weight: 500;
  }
`;

export const WidgetsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  align-content: start;
  width: 100%;
  min-width: 0;
  
  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

export const Widget = styled.div`
  background: white;
  border-radius: 0.875rem;
  padding: 0;
  height: 29.5rem;
  min-height: 29.5rem;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 1200px) {
    height: 25rem;
    min-height: 25rem;
  }
  
  @media (max-width: 768px) {
    height: 21.875rem;
    min-height: 21.875rem;
  }
`;

export const WidgetTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.0125rem;
  color: #000;
  margin: 2rem 2rem 1.25rem 2rem;
`;

export const EmptyWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 6.25rem);
  padding: 2rem;
`;

export const EmptyText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.0075rem;
  color: #8e8e93;
  margin: 0;
  text-align: center;
`;

export const CreditsCard = styled.div`
  margin-top: auto;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CreditsTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.02625rem;
  color: #000;
  margin: 0 0 0.5rem 0;
`;

export const CreditsVersion = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.0075rem;
  color: #8e8e93;
  margin: 0;
`;
