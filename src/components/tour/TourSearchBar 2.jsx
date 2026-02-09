import {
  SearchBarContainer,
  SearchInput,
  SearchButton,
  SearchIcon,
} from "./TourSearchBar.styles";

export default function TourSearchBar({ keyword, onKeywordChange, onSearch }) {
  // Enter 키 입력 시 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="여행지 이름을 검색하세요 (예: 감천문화마을)"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={onSearch}>
        <SearchIcon>🔍</SearchIcon>
      </SearchButton>
    </SearchBarContainer>
  );
}