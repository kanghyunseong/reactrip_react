import { useState } from "react";
import {
  FilterContainer,
  FilterHeader,
  FilterTitle,
  ResetButton,
  FilterSection,
  FilterLabel,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownArrow,
} from "./TourFilterPanel.styles";

// TODO: 지역 옵션 하드코딩 - 백엔드 API에서 받아오도록 수정 필요
const REGION_OPTIONS = [
  { regionNo: null, regionName: "전체" },
  { regionNo: 1, regionName: "서울" },
  { regionNo: 2, regionName: "경기" },
  { regionNo: 3, regionName: "충청도" },
  { regionNo: 4, regionName: "강원도" },
  { regionNo: 5, regionName: "부산" },
  { regionNo: 6, regionName: "경상도" },
  { regionNo: 7, regionName: "전라도" },
  { regionNo: 8, regionName: "제주" },
];

// TODO: 테마 옵션 하드코딩 - 백엔드 API에서 받아오도록 수정 필요
const THEME_OPTIONS = [
  { themeNo: null, themeName: "전체" },
  { themeNo: 1, themeName: "자연" },
  { themeNo: 2, themeName: "역사" },
  { themeNo: 3, themeName: "관광" },
  { themeNo: 4, themeName: "체험" },
  { themeNo: 5, themeName: "실내 등" },
];

export default function TourFilterPanel({
  selectedRegion,
  selectedTheme,
  onRegionChange,
  onThemeChange,
  onReset,
}) {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // 선택된 지역 이름 가져오기
  const getSelectedRegionName = () => {
    const region = REGION_OPTIONS.find((r) => r.regionNo === selectedRegion);
    return region ? region.regionName : "전체";
  };

  // 선택된 테마 이름 가져오기
  const getSelectedThemeName = () => {
    const theme = THEME_OPTIONS.find((t) => t.themeNo === selectedTheme);
    return theme ? theme.themeName : "전체";
  };

  // 지역 선택 핸들러
  const handleRegionSelect = (regionNo) => {
    onRegionChange(regionNo);
    setIsRegionOpen(false);
  };

  // 테마 선택 핸들러
  const handleThemeSelect = (themeNo) => {
    onThemeChange(themeNo);
    setIsThemeOpen(false);
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>🔍 필터</FilterTitle>
        <ResetButton onClick={onReset}>🔄 초기화</ResetButton>
      </FilterHeader>

      {/* 지역 필터 */}
      <FilterSection>
        <FilterLabel>지역</FilterLabel>
        <Dropdown>
          <DropdownButton
            onClick={() => setIsRegionOpen(!isRegionOpen)}
            $isOpen={isRegionOpen}
          >
            {getSelectedRegionName()}
            <DropdownArrow $isOpen={isRegionOpen}>▼</DropdownArrow>
          </DropdownButton>
          {isRegionOpen && (
            <DropdownMenu>
              {REGION_OPTIONS.map((region) => (
                <DropdownItem
                  key={region.regionNo || "all"}
                  onClick={() => handleRegionSelect(region.regionNo)}
                  $active={selectedRegion === region.regionNo}
                >
                  {region.regionName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </FilterSection>

      {/* 테마 필터 */}
      <FilterSection>
        <FilterLabel>테마</FilterLabel>
        <Dropdown>
          <DropdownButton
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            $isOpen={isThemeOpen}
          >
            {getSelectedThemeName()}
            <DropdownArrow $isOpen={isThemeOpen}>▼</DropdownArrow>
          </DropdownButton>
          {isThemeOpen && (
            <DropdownMenu>
              {THEME_OPTIONS.map((theme) => (
                <DropdownItem
                  key={theme.themeNo || "all"}
                  onClick={() => handleThemeSelect(theme.themeNo)}
                  $active={selectedTheme === theme.themeNo}
                >
                  {theme.themeName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </FilterSection>
    </FilterContainer>
  );
}