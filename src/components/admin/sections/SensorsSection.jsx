import React from "react";
import styled from "styled-components";
import CPUUsageWidget from "../charts/CPUUsageWidget";
import RAMUsageWidget from "../charts/RAMUsageWidget";
import TemperatureWidget1 from "../charts/TemperatureWidget1";
import TemperatureWidget2 from "../charts/TemperatureWidget2";
import { Surface, SectionHeader, SectionTitle, SectionSub } from "../ui/AdminUI.styles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const WidgetCard = styled(Surface)`
  padding: 0;
  overflow: hidden;
  min-height: 22rem;
`;

const SensorsSection = () => {
  return (
    <>
      <SectionHeader>
        <div>
          <SectionTitle>모니터링(온도/자원)</SectionTitle>
          <SectionSub>기존 위젯 UI를 섹션으로 분리(연동/로직은 유지)</SectionSub>
        </div>
      </SectionHeader>

      <Grid>
        <WidgetCard>
          <CPUUsageWidget />
        </WidgetCard>
        <WidgetCard>
          <RAMUsageWidget />
        </WidgetCard>
        <WidgetCard>
          <TemperatureWidget1 />
        </WidgetCard>
        <WidgetCard>
          <TemperatureWidget2 />
        </WidgetCard>
      </Grid>
    </>
  );
};

export default SensorsSection;

