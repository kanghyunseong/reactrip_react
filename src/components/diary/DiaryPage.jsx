import React from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description
} from "./DiaryPage.styles";



export default function DiaryPage() {
  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Title>DIARY</Title>
          <Description>
            여행의 추억을 일기로 기록하세요. 
            사진과 함께 소중한 순간들을 남겨보세요.
          </Description>
        </Content>
      </Section>
    </PageContainer>
  );
}
