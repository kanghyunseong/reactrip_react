import { 
  PanelContainer,
  FilterSection,
  FilterTitle,
  FilterSelect,
  ResetButton 
} from "./TourFilterPanel.styles";

export default function TourFilterPanel({
  regions,
  themes,
  selectedRegion,
  selectedTheme,
  onRegionChange,
  onThemeChange,
  onReset,
}) {
  return (
    <PanelContainer>
      <FilterSection>
        <FilterTitle>지역</FilterTitle>
        <FilterSelect 
          value={selectedRegion || ""} 
          onChange={(e) => onRegionChange(e.target.value || null)}
        >
          <option value="">전체 지역</option>
          {regions.map((region, index) => (
            <option key={region.regionNo != null ? `region-${region.regionNo}` : `region-i-${index}`} value={region.regionNo}>
              {region.regionName}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      <FilterSection>
        <FilterTitle>테마</FilterTitle>
        <FilterSelect 
          value={selectedTheme || ""} 
          onChange={(e) => onThemeChange(e.target.value || null)}
        >
          <option value="">전체 테마</option>
          {themes.map((theme, index) => (
            <option key={theme.themeNo != null ? `theme-${theme.themeNo}` : `theme-i-${index}`} value={theme.themeNo}>
              {theme.themeName}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      <ResetButton onClick={onReset}>
        초기화
      </ResetButton>
    </PanelContainer>
  );
}