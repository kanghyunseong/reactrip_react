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
          <Description>
            여행의 추억을 일기로 기록하세요. 
            사진과 함께 소중한 순간들을 남겨보세요.
          </Description>

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
