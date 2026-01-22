import React from "react";
import { Surface, SectionHeader, SectionTitle, SectionSub } from "../../ui/AdminUI.styles";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Surface)`
  padding: 1rem;
`;

const KPI = styled.div`
  font-weight: 900;
  font-size: 1.5rem;
  margin-top: 0.25rem;
`;

const Label = styled.div`
  color: rgba(15, 23, 42, 0.62);
  font-weight: 800;
  font-size: 0.9rem;
`;

const DashboardSection = () => {
  return (
    <>
      <SectionHeader>
        <div>
          <SectionTitle>대시보드</SectionTitle>
          <SectionSub>관리 항목 요약(연동 전: 더미 카드)</SectionSub>
        </div>
      </SectionHeader>

      <Grid>
        <Card>
          <Label>회원</Label>
          <KPI>—</KPI>
        </Card>
        <Card>
          <Label>여행지</Label>
          <KPI>—</KPI>
        </Card>
        <Card>
          <Label>공지/일기/댓글</Label>
          <KPI>—</KPI>
        </Card>
      </Grid>
    </>
  );
};

export default DashboardSection;

