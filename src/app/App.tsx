import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import { supabase } from "./Lib/supabase";
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
  const { user, loading, checkSession } = useAppStore();

  useEffect(() => {
    checkSession();

    // Sincronizar automáticamente el estado de Supabase Auth con Zustand y LocalStorage
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      
      if (currentUser) {
        const name = currentUser.user_metadata?.full_name 
          || currentUser.email?.split('@')[0] 
          || "Estudiante DriveQuest";

        // Cargar el progreso guardado para este usuario específico
        const savedKey = `drivequest_progress_${currentUser.id}`;
        const savedData = localStorage.getItem(savedKey);
        const parsed = savedData ? JSON.parse(savedData) : null;

        useAppStore.setState({ 
          user: currentUser,
          userName: name,
          userEmail: currentUser.email || "usuario@drivequest.app",
          completedModuleIds: parsed?.completedModuleIds || [],
          completedPracticeIds: parsed?.completedPracticeIds || [],
          examHistory: parsed?.examHistory || [],
          studyTimeMinutes: parsed?.studyTimeMinutes || 0,
          questionsAnsweredCount: parsed?.questionsAnsweredCount || 0
        });
      } else {
        // Limpiar estado si se cierra sesión
        useAppStore.setState({ 
          user: null,
          userName: "Estudiante DriveQuest",
          userEmail: "usuario@drivequest.app",
          completedModuleIds: [],
          completedPracticeIds: [],
          examHistory: [],
          studyTimeMinutes: 0,
          questionsAnsweredCount: 0
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <p className="text-slate-600 font-medium animate-pulse">Cargando DriveQuest...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <Routes>
          {/* Rutas Públicas */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace /> : <WelcomeScreen />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterScreen initialMode="register" />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterScreen initialMode="login" />} 
          />

          {/* Rutas Protegidas */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/theory" 
            element={user ? <TheoryScreen /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/practice" 
            element={user ? <PracticeScreen /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/exam" 
            element={user ? <ExamScreen /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/progress" 
            element={user ? <ProgressScreen /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfileScreen /> : <Navigate to="/" replace />} 
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}