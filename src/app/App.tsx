import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { useAppStore, getUserAvatarStorageKey } from "./store/useAppStore";
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

function NativeBackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listener: PluginListenerHandle | undefined;
    let disposed = false;

    const setup = async () => {
      const handle = await CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        const path = currentPathRef.current;
        const isPrimaryScreen = path === "/" || path === "/dashboard";

        // Solo se cierra la app desde la pantalla principal.
        if (isPrimaryScreen) {
          CapacitorApp.exitApp();
          return;
        }

        // Una vista anidada (por ejemplo, la lectura de un módulo teórico)
        // puede consumir el evento para volver a su pantalla anterior.
        const backEvent = new CustomEvent("drivequest:hardware-back", { cancelable: true });
        const shouldNavigate = window.dispatchEvent(backEvent);
        if (!shouldNavigate) return;

        if (canGoBack) {
          navigate(-1);
        } else {
          navigate("/dashboard", { replace: true });
        }
      });

      if (disposed) {
        await handle.remove();
      } else {
        listener = handle;
      }
    };

    setup().catch((error) => {
      console.error("No se pudo registrar el botón físico de retroceso:", error);
    });

    return () => {
      disposed = true;
      listener?.remove();
    };
  }, [navigate]);

  return null;
}

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
        const savedAvatar = localStorage.getItem(getUserAvatarStorageKey(currentUser.id));

        useAppStore.setState({ 
          user: currentUser,
          userName: name,
          userEmail: currentUser.email || "usuario@drivequest.app",
          userAvatar: savedAvatar,
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
          userAvatar: null,
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
      <NativeBackButtonHandler />
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