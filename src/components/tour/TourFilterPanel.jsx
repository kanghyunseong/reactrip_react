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
  { regionNo: 2, regionName: "인천" },
  { regionNo: 3, regionName: "경기" },
  { regionNo: 4, regionName: "세종" },
  { regionNo: 5, regionName: "강원도" },
  { regionNo: 6, regionName: "제주도" },
  { regionNo: 7, regionName: "충청남도" },
  { regionNo: 8, regionName: "충청북도" },
  { regionNo: 9, regionName: "전라남도" },
  { regionNo: 10, regionName: "전라북도" },
  { regionNo: 11, regionName: "경상남도" },
  { regionNo: 12, regionName: "경상북도" },
];

// TODO: 테마 옵션 하드코딩 - 백엔드 API에서 받아오도록 수정 필요
const THEME_OPTIONS = [
  { themeNo: null, themeName: "전체" },
  { themeNo: 1, themeName: "호캉스" },
  { themeNo: 2, themeName: "전통 문화" },
  { themeNo: 3, themeName: "액티비티" },
  { themeNo: 4, themeName: "자연/풍경" },
  { themeNo: 5, themeName: "바다/해변" },
  { themeNo: 6, themeName: "캠핑/차박" },
  { themeNo: 7, themeName: "전시/공연" },
  { themeNo: 8, themeName: "계절 꽃놀이" },
  { themeNo: 9, themeName: "식도락/맛집" },
  { themeNo: 10, themeName: "기타" },
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