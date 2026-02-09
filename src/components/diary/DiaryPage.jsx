import { Outlet } from "react-router-dom";
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
          <Outlet />
        </Content>
      </Section>
    </PageContainer>
  );
}
