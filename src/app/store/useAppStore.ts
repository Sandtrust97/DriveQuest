import { create } from "zustand";
import { supabase } from '../Lib/supabase';
import { User } from '@supabase/supabase-js';

interface AppState {
  // Estado de Autenticación de Supabase
  user: User | null;
  loading: boolean;
  checkSession: () => Promise<void>;
  signUp: (email: string, pass: string) => Promise<{ error: any }>;
  signIn: (email: string, pass: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;

  // Datos del estudiante
  userName: string;
  userEmail: string;
  setUserData: (name: string, email: string) => void;

  // Progreso de módulos teóricos
  completedModuleIds: number[];
  markModuleCompleted: (id: number) => void;

  // Historial de simulacros de examen
  examHistory: { date: string; score: number; total: number; percentage: number }[];
  addExamResult: (score: number, total: number) => void;

  // Métricas calculadas para el Dashboard y Progreso
  getOverallProgress: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Estado inicial Auth
  user: null,
  loading: true,

  // Verificar la sesión de Supabase al cargar
  checkSession: async () => {
    try {
      set({ loading: true });
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      
      set({ 
        user: currentUser,
        userEmail: currentUser?.email || "usuario@drivequest.app"
      });
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  // Registro en Supabase
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error && data.user) {
      set({ 
        user: data.user,
        userEmail: data.user.email || email 
      });
    }
    return { error };
  },

  // Inicio de sesión en Supabase
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error && data.user) {
      set({ 
        user: data.user,
        userEmail: data.user.email || email 
      });
    }
    return { error };
  },

  // Cierre de sesión en Supabase
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  // Datos del estudiante
  userName: "Estudiante DriveQuest",
  userEmail: "usuario@drivequest.app",

  setUserData: (name, email) => set({ userName: name, userEmail: email }),

  // Módulos
  completedModuleIds: [1, 2],
  markModuleCompleted: (id) =>
    set((state) => ({
      completedModuleIds: state.completedModuleIds.includes(id)
        ? state.completedModuleIds
        : [...state.completedModuleIds, id],
    })),

  // Simulacros
  examHistory: [
    { date: "2026-10-01", score: 2, total: 3, percentage: 67 },
  ],
  addExamResult: (score, total) => {
    const percentage = Math.round((score / total) * 100);
    const newRecord = {
      date: new Date().toISOString().split("T")[0],
      score,
      total,
      percentage,
    };
    set((state) => ({
      examHistory: [newRecord, ...state.examHistory],
    }));
  },

  // Progreso Global
  getOverallProgress: () => {
    const { completedModuleIds, examHistory } = get();
    const totalModules = 4;
    const moduleProgress = (completedModuleIds.length / totalModules) * 50;

    const lastExam = examHistory[0];
    const examProgress = lastExam ? (lastExam.percentage / 100) * 50 : 0;

    return Math.min(100, Math.round(moduleProgress + examProgress));
  },
}));