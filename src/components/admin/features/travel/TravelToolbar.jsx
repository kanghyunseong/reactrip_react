import React from "react";
import { 
  Toolbar, ToolbarLeft, ToolbarRight, Input, 
  ToolbarPrimaryButton 
} from "../../ui/AdminUI.styles";

const TravelToolbar = ({ 
  keyword, setKeyword, onSearch, onReset, 
  onSyncApi, syncing, onAdd, loading 
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
          검색
        </ToolbarPrimaryButton>
        <ToolbarPrimaryButton type="button" onClick={onReset} disabled={loading}>
          초기화
        </ToolbarPrimaryButton>
      </ToolbarLeft>
      
      <ToolbarRight>
        <ToolbarPrimaryButton type="button" onClick={onSyncApi} disabled={syncing}>
          {syncing ? "동기화 중..." : "API 동기화"}
        </ToolbarPrimaryButton>
        <ToolbarPrimaryButton type="button" onClick={onAdd}>
          여행지 등록
        </ToolbarPrimaryButton>
      </ToolbarRight>
    </Toolbar>
  );
};

export default TravelToolbar;
