import React, { useState } from "react";
import DataTable from "../../../common/ui/DataTable";
import Pagination from "../../../common/ui/Pagination";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton } from "../../ui/AdminUI.styles";

const CommentsSection = () => {
  // 화면만: 더미 상태(axios 연동 시 교체)
  const [keyword, setKeyword] = useState("");
  const [pageInfo] = useState({ currentPage: 1, maxPage: 1 });
  const rows = [];

  // 로직은 사용자 구현(axios 연결 지점)
  const onSearch = () => {};
  const onReset = () => setKeyword("");
  const onPageChange = () => {};
  const onView = () => {};
  const onDelete = () => {};

  const columns = [
    { key: "commentNo", label: "번호", thStyle: { width: 90 } },
    { key: "commentContent", label: "내용", thStyle: { width: 360 } },
    { key: "memberName", label: "작성자", thStyle: { width: 120 } },
    { key: "diaryTitle", label: "일기", thStyle: { width: 240 } },
    { key: "commentStatus", label: "상태", thStyle: { width: 90 } },
    { key: "createdDate", label: "작성일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "view",
      label: "상세",
      variant: "primary",
      onClick: (row) => onView(row),
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
            placeholder="댓글 내용/작성자 검색(연동 예정)"
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch}>
            검색
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton type="button" onClick={onReset}>
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
      </Toolbar>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.commentNo}
        actions={actions}
        emptyTitle="댓글 데이터가 없습니다"
        emptyDesc="일기에 댓글이 달리면 여기서 관리할 수 있어요."
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />
    </>
  );
};

export default CommentsSection;
