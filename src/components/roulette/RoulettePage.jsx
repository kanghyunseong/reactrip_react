import React from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description
} from "./RoulettePage.styles";

export default function RoulettePage() {
  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Title>ROULETTE</Title>
          <Description>
            룰렛을 돌려 랜덤 여행지를 추천받으세요. 
            새로운 모험을 시작할 준비가 되셨나요?
          </Description>
        </Content>
      </Section>
    </PageContainer>
  );
}
