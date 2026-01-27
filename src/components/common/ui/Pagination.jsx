import React from "react";
import { PageButton, PageInfo, PaginationWrap } from "./CommonUI.styles";

const Pagination = ({ page = 1, maxPage = 1, onChange }) => {
  const canPrev = page > 1;
  const canNext = page < maxPage;

  return (
    <PaginationWrap>
      <PageButton type="button" disabled={!canPrev} onClick={() => onChange?.(1)}>
        처음
      </PageButton>
      <PageButton type="button" disabled={!canPrev} onClick={() => onChange?.(page - 1)}>
        이전
      </PageButton>
      <PageInfo>
        {page} / {maxPage}
      </PageInfo>
      <PageButton type="button" disabled={!canNext} onClick={() => onChange?.(page + 1)}>
        다음
      </PageButton>
      <PageButton type="button" disabled={!canNext} onClick={() => onChange?.(maxPage)}>
        마지막
      </PageButton>
    </PaginationWrap>
  );
};

export default Pagination;

