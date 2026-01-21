import { Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import DiaryList from "./Diarys/DiaryList";
import DiaryDetail from "./Diarys/DiaryDetail";
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

          {/* 🔥 여기 중요 */}
          <Routes>
            <Route index element={<DiaryList />} />
            <Route path="detail/:diaryNo" element={<DiaryDetail />} />
          </Routes>

        </Content>
      </Section>
    </PageContainer>
  );
}
