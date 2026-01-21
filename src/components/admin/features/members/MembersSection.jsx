import React, { useState } from "react";
import AdminTable from "../../ui/AdminTable";
import Pagination from "../../ui/Pagination";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton } from "../../ui/AdminUI.styles";

const MembersSection = () => {
  // 화면만: 더미 상태(axios 연동 시 교체)
  const [keyword, setKeyword] = useState("");
  const [pageInfo] = useState({ currentPage: 1, maxPage: 1 });
  const rows = [];

  // 로직은 사용자 구현(axios 연결 지점)
  const onSearch = () => {};
  const onReset = () => setKeyword("");
  const onPageChange = () => {};
  const onDelete = () => {};
  const onUpdateRole = () => {};
  const columns = [
    { key: "memberNo", label: "회원번호", thStyle: { width: 90 } },
    { key: "memberName", label: "이름", thStyle: { width: 120 } },
    { key: "email", label: "이메일", thStyle: { width: 220 } },
    { key: "phone", label: "전화번호", thStyle: { width: 160 } },
    { key: "birthday", label: "생년월일", thStyle: { width: 140 } },
    {
      key: "memberRole",
      label: "권한",
      thStyle: { width: 140 },
      render: (r) => (r?.memberRole ? r.memberRole : "-"),
    },
    { key: "enrollDate", label: "가입일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "role-user",
      label: "USER",
      variant: "primary",
      onClick: (row) => onUpdateRole(row, "ROLE_USER"),
    },
    {
      key: "role-admin",
      label: "ADMIN",
      variant: "primary",
      onClick: (row) => onUpdateRole(row, "ROLE_ADMIN"),
    },
    {
      key: "delete",
      label: "삭제",
      variant: "danger",
      onClick: (row) => onDelete(row),
    },
  ];

  const currentPage = pageInfo?.currentPage ?? 1;
  const maxPage = pageInfo?.maxPage ?? 1;

  return (
    <>
      <Toolbar>
        <ToolbarLeft>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="이름/이메일/전화번호로 검색"
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch}>
            검색
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton type="button" onClick={onReset}>
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
        <ToolbarRight>
          <ToolbarPrimaryButton type="button" disabled>
            (예정) 엑셀 다운로드
          </ToolbarPrimaryButton>
        </ToolbarRight>
      </Toolbar>

      <AdminTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.memberNo}
        actions={actions}
        emptyTitle="회원 데이터가 없습니다"
        emptyDesc="검색 조건을 바꾸거나, 데이터를 불러오면 여기서 바로 관리할 수 있어요."
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />
    </>
  );
};

export default MembersSection;

