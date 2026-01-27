import React from "react";
import { SectionHeader, SectionTitle, SectionSub } from "../../ui/AdminUI.styles";
import DashboardCharts from "./DashboardCharts";

const DashboardSection = () => {
  return (
    <>
      <SectionHeader>
        <div>
          <SectionTitle>대시보드</SectionTitle>
          <SectionSub>최근 활동/분포 요약</SectionSub>
        </div>
      </SectionHeader>
      <DashboardCharts />
    </>
  );
};

export default DashboardSection;

