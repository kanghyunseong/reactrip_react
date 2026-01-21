import React, { useState } from "react";
import AdminTable from "../../ui/AdminTable";
import Pagination from "../../ui/Pagination";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton } from "../../ui/AdminUI.styles";
import NoticeFormModal from "../../ui/forms/NoticeFormModal";

const NoticesSection = () => {
  // 화면만: 더미 상태(axios 연동 시 교체)
  const [keyword, setKeyword] = useState("");
  const [pageInfo] = useState({ currentPage: 1, maxPage: 1 });
  const rows = [];

  // 로직은 사용자 구현(axios 연결 지점)
  const onSearch = () => {};
  const onReset = () => setKeyword("");
  const onPageChange = () => {};
  const onDelete = () => {};

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "noticeNo", label: "번호", thStyle: { width: 90 } },
    { key: "noticeTitle", label: "제목", thStyle: { width: 360 } },
    { key: "noticeStatus", label: "상태", thStyle: { width: 90 } },
    { key: "count", label: "조회수", thStyle: { width: 90 } },
    { key: "createdDate", label: "작성일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "edit",
      label: "수정",
      variant: "primary",
      onClick: (row) => {
        setSelected(row);
        setFormMode("edit");
        setIsFormOpen(true);
      },
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
            placeholder="제목/내용 검색(연동 예정)"
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch}>
            검색
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton type="button" onClick={onReset}>
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
        <ToolbarRight>
          <ToolbarPrimaryButton
            type="button"
            onClick={() => {
              setSelected(null);
              setFormMode("create");
              setIsFormOpen(true);
            }}
          >
            공지 등록
          </ToolbarPrimaryButton>
        </ToolbarRight>
      </Toolbar>

      <AdminTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.noticeNo}
        actions={actions}
        emptyTitle="공지 데이터가 없습니다"
        emptyDesc="'공지 등록'을 눌러 새 공지를 작성하세요."
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />

      <NoticeFormModal
        open={isFormOpen}
        mode={formMode}
        initialValue={selected}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(form, file) => {
          setIsFormOpen(false);
        }}
      />
    </>
  );
};

export default NoticesSection;
