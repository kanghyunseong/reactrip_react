import { Routes, Route } from "react-router-dom";
import MainPage from "./components/home/MainPage";
import SchedulePage from "./components/schedule/SchedulePage";
import TourPage from "./components/tour/TourPage";
import RoulettePage from "./components/roulette/RoulettePage";
import DiaryPage from "./components/diary/DiaryPage";
import ContactPage from "./components/contact/ContactPage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import AdminPage from "./components/admin/AdminPage";
// import ProtectedRoute from "./utils/ProtectedURL"; // 개발 단계 임시 주석 처리
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/tour" element={<TourPage />} />
      <Route path="/roulette" element={<RoulettePage />} />
      <Route path="/diarys/*" element={<DiaryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* 개발 단계: 권한 체크 임시 비활성화 */}
      <Route path="/admin" element={<AdminPage />} />
      {/* 프로덕션 배포 시 아래 코드로 변경
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      */}
    </Routes>
  );
}

export default App;
