import React from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description
} from "./TourPage.styles";

export default function TourPage() {
  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Title>TOUR</Title>
          <Description>
            다양한 여행 코스를 탐색하고 선택하세요. 
            추천 여행지와 인기 명소를 확인할 수 있습니다.
          </Description>
        </Content>
      </Section>
    </PageContainer>
  );
}
