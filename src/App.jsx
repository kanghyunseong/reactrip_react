import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/home/MainPage";
import SchedulePage from "./components/schedule/SchedulePage";
import TourListPage from "./components/tour/TourListPage";
import TourDetailPage from "./components/tour/TourDetailPage";
import RoulettePage from "./components/roulette/RoulettePage";
import DiaryPage from "./components/diary/DiaryPage";
import ContactPage from "./components/contact/ContactPage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardSection from "./components/admin/features/dashboard/DashboardSection";
import SensorsSection from "./components/admin/features/sensors/SensorsSection";
import MembersSection from "./components/admin/features/members/MembersSection";
import TravelSection from "./components/admin/features/travel/TravelSection";
import NoticesSection from "./components/admin/features/notices/NoticesSection";
import DiariesSection from "./components/admin/features/diaries/DiariesSection";
import CommentsSection from "./components/admin/features/comments/CommentsSection";
import MyPage from "./components/my/myPage";
import ProtectedRoute from "./utils/ProtectedURL";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScheduleCreate from "./components/schedule/ScheduleCreate";
import ScheduleEdit from "./components/schedule/ScheduleEdit";
import ScheduleDetail from "./components/schedule/ScheduleDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedules/create" element={<ScheduleCreate />} />
        <Route path="/schedules/:scheduleNo" element={<ScheduleDetail />} />
        <Route path="/schedules/:scheduleNo/edit" element={<ScheduleEdit/>} />
        <Route path="/tour" element={<TourListPage />} />
        <Route path="/tour/:travelNo" element={<TourDetailPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
        <Route path="/diarys" element={<DiaryPage />} />
        <Route path="/diarys/*" element={<DiaryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage/>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardSection />} />
          <Route path="sensors" element={<SensorsSection />} />
          <Route path="members" element={<MembersSection />} />
          <Route path="travel" element={<TravelSection />} />
          <Route path="notices" element={<NoticesSection />} />
          <Route path="diaries" element={<DiariesSection />} />
          <Route path="comments" element={<CommentsSection />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
