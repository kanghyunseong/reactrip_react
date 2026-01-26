import React from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description
} from "./SchedulePage.styles";

export default function SchedulePage() {
  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Title>SCHEDULE</Title>
          <Description>
            여행 일정을 계획하고 관리하세요. 
            실시간으로 일정을 확인하고 수정할 수 있습니다.
          </Description>
        </Content>
      </Section>
    </PageContainer>
  );
}
