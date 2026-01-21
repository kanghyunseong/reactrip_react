import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardSection from "./features/dashboard/DashboardSection";
import SensorsSection from "./features/sensors/SensorsSection";
import MembersSection from "./features/members/MembersSection";
import TravelSection from "./features/travel/TravelSection";
import NoticesSection from "./features/notices/NoticesSection";
import DiariesSection from "./features/diaries/DiariesSection";
import CommentsSection from "./features/comments/CommentsSection";
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

export default function AdminPage() {
  const { auth } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");

  // 화면만: 더미 데이터(axios 연동 시 교체)
  const [keyword, setKeyword] = useState("");
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, maxPage: 1 });
  const rows = [];

  const userName = auth?.userName || "관리자";

  const menuItems = useMemo(
    () => [
      { id: "dashboard", icon: "📌", title: "대시보드", desc: "요약/현황" },
      { id: "sensors", icon: "🌡️", title: "모니터링", desc: "온도/CPU/RAM" },
      { id: "members", icon: "👥", title: "회원 관리", desc: "/api/admin/members" },
      { id: "travel", icon: "🗺️", title: "여행지 관리", desc: "/api/admin/travel" },
      { id: "notices", icon: "📣", title: "공지 관리", desc: "/api/admin/notices" },
      { id: "diaries", icon: "📓", title: "일기 관리", desc: "/api/admin/community/diaries" },
      { id: "comments", icon: "💬", title: "댓글 관리", desc: "/api/admin/community/comments" },
    ],
    []
  );

  const currentMeta = menuItems.find((m) => m.id === activeMenu);

  // 로직은 사용자 구현(axios 연결 지점만 남김)
  const actions = {
    onSearch: () => {},
    onReset: () => setKeyword(""),
    onPageChange: (p) => setPageInfo((prev) => ({ ...prev, currentPage: p })),
    onCreate: () => {},
    onEdit: () => {},
    onView: () => {},
    onDelete: () => {},
    onUpdateRole: () => {},
    onToggleStatus: () => {},
    onSyncApi: () => {},
  };

  return (
    <Page>
      <Topbar>
        <TopbarInner>
          <Brand>
            <BrandMark />
            <BrandTitle>
              <BrandName>ReacTrip Admin</BrandName>
              <BrandSub>관리자 콘솔 (화면만 구성)</BrandSub>
            </BrandTitle>
          </Brand>

          <TopbarRight>
            <Search>
              <span style={{ opacity: 0.6 }}>🔎</span>
              <SearchInput
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="(옵션) 전역 검색 UI"
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
            {menuItems.map((m) =>
              m.id === activeMenu ? (
                <NavItemActive key={m.id} type="button" onClick={() => setActiveMenu(m.id)}>
                  <NavIcon>{m.icon}</NavIcon>
                  <NavText>
                    <NavTitle>{m.title}</NavTitle>
                    <NavDesc>{m.desc}</NavDesc>
                  </NavText>
                </NavItemActive>
              ) : (
                <NavItem key={m.id} type="button" onClick={() => setActiveMenu(m.id)}>
                  <NavIcon>{m.icon}</NavIcon>
                  <NavText>
                    <NavTitle>{m.title}</NavTitle>
                    <NavDesc>{m.desc}</NavDesc>
                  </NavText>
                </NavItem>
              )
            )}
          </NavGroup>
        </Sidebar>

        <Main>
          {activeMenu !== "dashboard" ? (
            <SectionHeader>
              <div>
                <SectionTitle>{currentMeta?.title}</SectionTitle>
                <SectionSub>{currentMeta?.desc}</SectionSub>
              </div>
            </SectionHeader>
          ) : null}

          {activeMenu === "dashboard" ? (
            <DashboardSection />
          ) : null}

          {activeMenu === "sensors" ? <SensorsSection /> : null}

          {activeMenu === "members" ? (
            <MembersSection
              keyword={keyword}
              onKeywordChange={setKeyword}
              onSearch={actions.onSearch}
              onReset={actions.onReset}
              onDelete={actions.onDelete}
              onUpdateRole={actions.onUpdateRole}
              pageInfo={pageInfo}
              rows={rows}
              onPageChange={actions.onPageChange}
            />
          ) : null}

          {activeMenu === "travel" ? (
            <TravelSection
              keyword={keyword}
              onKeywordChange={setKeyword}
              onSearch={actions.onSearch}
              onReset={actions.onReset}
              onCreate={actions.onCreate}
              onEdit={actions.onEdit}
              onToggleStatus={actions.onToggleStatus}
              onSyncApi={actions.onSyncApi}
              pageInfo={pageInfo}
              rows={rows}
              onPageChange={actions.onPageChange}
            />
          ) : null}

          {activeMenu === "notices" ? (
            <NoticesSection
              keyword={keyword}
              onKeywordChange={setKeyword}
              onSearch={actions.onSearch}
              onReset={actions.onReset}
              onCreate={actions.onCreate}
              onEdit={actions.onEdit}
              onDelete={actions.onDelete}
              pageInfo={pageInfo}
              rows={rows}
              onPageChange={actions.onPageChange}
            />
          ) : null}

          {activeMenu === "diaries" ? (
            <DiariesSection
              keyword={keyword}
              onKeywordChange={setKeyword}
              onSearch={actions.onSearch}
              onReset={actions.onReset}
              onView={actions.onView}
              onDelete={actions.onDelete}
              pageInfo={pageInfo}
              rows={rows}
              onPageChange={actions.onPageChange}
            />
          ) : null}

          {activeMenu === "comments" ? (
            <CommentsSection
              keyword={keyword}
              onKeywordChange={setKeyword}
              onSearch={actions.onSearch}
              onReset={actions.onReset}
              onView={actions.onView}
              onDelete={actions.onDelete}
              pageInfo={pageInfo}
              rows={rows}
              onPageChange={actions.onPageChange}
            />
          ) : null}
        </Main>
      </Layout>
    </Page>
  );
}
