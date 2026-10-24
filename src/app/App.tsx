import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { Dashboard } from "./components/Dashboard";
import { TheoryScreen } from "./components/TheoryScreen";
import { PracticeScreen } from "./components/PracticeScreen";
import { ExamScreen } from "./components/ExamScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/theory" element={<TheoryScreen />} />
          <Route path="/practice" element={<PracticeScreen />} />
          <Route path="/exam" element={<ExamScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          {/* Redirección para rutas inexistentes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}