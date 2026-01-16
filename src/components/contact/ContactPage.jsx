import React from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description
} from "./ContactPage.styles";

export default function ContactPage() {
  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Title>CONTACT</Title>
          <Description>
            문의사항이 있으시면 언제든지 연락주세요. 
            빠르고 친절하게 답변드리겠습니다.
          </Description>
        </Content>
      </Section>
    </PageContainer>
  );
}
