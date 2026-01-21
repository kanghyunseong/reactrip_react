import React from "react";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton, Spinner } from "../../ui/AdminUI.styles";

const TravelToolbar = ({
  keyword,
  setKeyword,
  loading,
  onSearch,
  onReset,
  searchKeyword,
  totalCount,
  onSyncApi,
  syncing,
  onAddTravel,
}) => {
  return (
    <Toolbar>
      <ToolbarLeft>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && onSearch()}
          placeholder="여행지명/주소 검색..."
          disabled={loading}
        />
        <ToolbarPrimaryButton type="button" onClick={onSearch} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </ToolbarPrimaryButton>
        <ToolbarPrimaryButton type="button" onClick={onReset} disabled={loading}>
          초기화
        </ToolbarPrimaryButton>
        {searchKeyword && (
          <span style={{
            fontSize: "0.85rem",
            color: "rgba(15, 23, 42, 0.6)",
            fontWeight: "600",
            whiteSpace: "nowrap"
          }}>
            '{searchKeyword}' 검색 결과: {totalCount}건
          </span>
        )}
      </ToolbarLeft>
      <ToolbarRight>
        <ToolbarPrimaryButton type="button" onClick={onSyncApi} disabled={syncing}>
          {syncing ? (
            <>
              <Spinner $small />
              동기화 중...
            </>
          ) : (
            "API 동기화"
          )}
        </ToolbarPrimaryButton>
        <ToolbarPrimaryButton
          type="button"
          onClick={onAddTravel}
        >
          여행지 등록
        </ToolbarPrimaryButton>
      </ToolbarRight>
    </Toolbar>
  );
};

export default TravelToolbar;
