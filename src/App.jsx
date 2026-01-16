import { Routes, Route } from "react-router-dom";
import MainPage from "./components/home/MainPage";
import SchedulePage from "./components/schedule/SchedulePage";
import TourPage from "./components/tour/TourPage";
import RoulettePage from "./components/roulette/RoulettePage";
import DiaryPage from "./components/diary/DiaryPage";
import ContactPage from "./components/contact/ContactPage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/tour" element={<TourPage />} />
      <Route path="/roulette" element={<RoulettePage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
