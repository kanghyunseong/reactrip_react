import React, { useContext, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
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
  Layout,
  Sidebar,
  NavGroup,
  NavItem,
  NavItemActive,
  NavIcon,
  NavText,
  NavTitle,
  NavDesc,
  Main,
  SectionHeader,
  SectionTitle,
  SectionSub,
} from "./ui/AdminUI.styles";

const AdminLayout = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [globalSearch, setGlobalSearch] = useState("");

  const userName = auth?.userName || "관리자";

  const menuItems = useMemo(
    () => [
      { id: "dashboard", path: "/admin/dashboard", icon: "📌", title: "대시보드", desc: "요약/현황" },
      { id: "sensors", path: "/admin/sensors", icon: "🌡️", title: "모니터링", desc: "온도/CPU/RAM" },
      { id: "members", path: "/admin/members", icon: "👥", title: "회원 관리", desc: "/api/admin/members" },
      { id: "travel", path: "/admin/travel", icon: "🗺️", title: "여행지 관리", desc: "/api/admin/travel" },
      { id: "notices", path: "/admin/notices", icon: "📣", title: "공지 관리", desc: "/api/admin/notices" },
      { id: "diaries", path: "/admin/diaries", icon: "📓", title: "일기 관리", desc: "/api/admin/community/diaries" },
      { id: "comments", path: "/admin/comments", icon: "💬", title: "댓글 관리", desc: "/api/admin/community/comments" },
    ],
    []
  );

  const currentMeta = menuItems.find((m) => location.pathname.startsWith(m.path));
  const isDashboard = location.pathname === "/admin/dashboard" || location.pathname === "/admin";

  return (
    <Page>
      <Topbar>
        <TopbarInner>
          <Brand>
            <BrandMark />
            <BrandTitle>
              <BrandName>ReacTrip Admin</BrandName>
              <BrandSub>관리자 콘솔</BrandSub>
            </BrandTitle>
          </Brand>

          <TopbarRight>
            <Search>
              <span style={{ opacity: 0.6 }}>🔎</span>
              <SearchInput
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="(옵션) 전역 검색"
              />
            </Search>
            <Pill>
              <Avatar />
              <UserName>{userName}</UserName>
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
    </Page>
  );
};

export default AdminLayout;
