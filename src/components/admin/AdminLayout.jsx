import React, { useContext, useMemo, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosAuth } from "../../api/api";
import GlobalSearchModal from "./features/common/GlobalSearchModal";
import {
  Page,
  Topbar,
  TopbarInner,
  Brand,
  BrandMark,
  BrandTitle,
  BrandName,
  BrandSub,
  TopbarRight,
  Search,
  SearchInput,
  Pill,
  Avatar,
  UserName,
  UserNameText,
  UserRole,
  Layout,
  Sidebar,
  NavGroup,
  NavItem,
  NavItemActive,
  NavIcon,
  NavText,
  NavTitle,
  NavDesc,
  SidebarFooter,
  SidebarButton,
  SidebarButtonDanger,
  Main,
  SectionHeader,
  SectionTitle,
  SectionSub,
} from "./ui/AdminUI.styles";

const AdminLayout = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [globalSearch, setGlobalSearch] = useState("");
  const [userName, setUserName] = useState("관리자");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      // 1. auth에서 가져오기 시도
      if (auth?.userName) {
        setUserName(auth.userName);
        return;
      }
      
      // 2. localStorage에서 직접 가져오기
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
        return;
      }

      // 3. API에서 사용자 정보 가져오기
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const userInfo = await axiosAuth.getActual("/api/members/mypage");
          if (userInfo?.memberName) {
            setUserName(userInfo.memberName);
            localStorage.setItem("userName", userInfo.memberName);
          } else if (userInfo?.userId) {
            setUserName(userInfo.userId);
          }
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
          // API 실패 시 userId나 email 사용
          const userId = auth?.userId || localStorage.getItem("userId");
          const email = auth?.email || localStorage.getItem("email");
          if (userId) {
            setUserName(userId);
          } else if (email) {
            setUserName(email.split("@")[0]);
          }
        }
      } else {
        // 토큰이 없으면 userId나 email 사용
        const userId = auth?.userId || localStorage.getItem("userId");
        const email = auth?.email || localStorage.getItem("email");
        if (userId) {
          setUserName(userId);
        } else if (email) {
          setUserName(email.split("@")[0]);
        }
      }
    };

    fetchUserName();
  }, [auth]);

  const getRoleDisplay = () => {
    const role = auth?.role || localStorage.getItem("role");
    if (!role) return "권한 없음";
    
    const roleMap = {
      "ROLE_ADMIN": "관리자",
      "ROLE_USER": "사용자",
      "ADMIN": "관리자",
      "USER": "사용자",
    };
    
    return roleMap[role] || role;
  };

  const menuItems = useMemo(
    () => [
      { id: "dashboard", path: "/admin/dashboard", icon: "📊", title: "대시보드", desc: "요약/현황" },
      { id: "sensors", path: "/admin/sensors", icon: "📈", title: "모니터링", desc: "온도/CPU/RAM" },
      { id: "members", path: "/admin/members", icon: "👤", title: "회원 관리", desc: "/api/admin/members" },
      { id: "travel", path: "/admin/travel", icon: "📍", title: "여행지 관리", desc: "/api/admin/travel" },
      { id: "notices", path: "/admin/notices", icon: "📢", title: "공지 관리", desc: "/api/admin/notices" },
      { id: "diaries", path: "/admin/diaries", icon: "📝", title: "일기 관리", desc: "/api/admin/community/diaries" },
      { id: "comments", path: "/admin/comments", icon: "💭", title: "댓글 관리", desc: "/api/admin/community/comments" },
    ],
    []
  );

  const currentMeta = menuItems.find((m) => location.pathname.startsWith(m.path));
  const isDashboard = location.pathname === "/admin/dashboard" || location.pathname === "/admin";

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && globalSearch.trim()) {
      setIsSearchModalOpen(true);
    }
  };

  const handleSearchFocus = () => {
    if (globalSearch.trim()) {
      setIsSearchModalOpen(true);
    }
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Page>
      <Topbar>
        <TopbarInner>
          <Brand>
            <BrandMark>R</BrandMark>
            <BrandTitle>
              <BrandName>ReacTrip Admin</BrandName>
              <BrandSub>관리자 콘솔</BrandSub>
            </BrandTitle>
          </Brand>

          <TopbarRight>
            <Search>
              <span style={{ opacity: 0.7, fontSize: "13px" }}>🔍</span>
              <SearchInput
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={handleSearchFocus}
                placeholder="전역 검색 (Enter 또는 클릭)"
              />
            </Search>
            <Pill>
              <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>
              <UserName>
                <UserNameText>{userName}</UserNameText>
                <UserRole>{getRoleDisplay()}</UserRole>
              </UserName>
            </Pill>
          </TopbarRight>
        </TopbarInner>
      </Topbar>

      <Layout>
        <Sidebar>
          <NavGroup>
            {menuItems.map((m) => {
              const isActive = location.pathname.startsWith(m.path);
              return isActive ? (
                <NavItemActive key={m.id} type="button" onClick={() => navigate(m.path)}>
                  <NavIcon>{m.icon}</NavIcon>
                  <NavText>
                    <NavTitle>{m.title}</NavTitle>
                    <NavDesc>{m.desc}</NavDesc>
                  </NavText>
                </NavItemActive>
              ) : (
                <NavItem key={m.id} type="button" onClick={() => navigate(m.path)}>
                  <NavIcon>{m.icon}</NavIcon>
                  <NavText>
                    <NavTitle>{m.title}</NavTitle>
                    <NavDesc>{m.desc}</NavDesc>
                  </NavText>
                </NavItem>
              );
            })}
          </NavGroup>
          <SidebarFooter>
            <SidebarButton type="button" onClick={handleGoHome}>
              <NavIcon>🏠</NavIcon>
              <NavText>
                <NavTitle>메인페이지</NavTitle>
              </NavText>
            </SidebarButton>
            <SidebarButtonDanger type="button" onClick={handleLogout}>
              <NavIcon>🚪</NavIcon>
              <NavText>
                <NavTitle>로그아웃</NavTitle>
              </NavText>
            </SidebarButtonDanger>
          </SidebarFooter>
        </Sidebar>

        <Main>
          {!isDashboard && currentMeta ? (
            <SectionHeader>
              <div>
                <SectionTitle>{currentMeta.title}</SectionTitle>
                <SectionSub>{currentMeta.desc}</SectionSub>
              </div>
            </SectionHeader>
          ) : null}

          <Outlet />
        </Main>
      </Layout>

      <GlobalSearchModal
        open={isSearchModalOpen}
        searchTerm={globalSearch}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </Page>
  );
};

export default AdminLayout;
