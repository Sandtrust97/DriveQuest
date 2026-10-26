import { create } from "zustand";
import { supabase } from '../Lib/supabase';
import { User } from '@supabase/supabase-js';

export interface ExamRecord {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export interface StoredProgress {
  completedModuleIds: number[];
  completedPracticeIds: number[];
  examHistory: ExamRecord[];
  studyTimeMinutes: number;
  questionsAnsweredCount: number;
}

export interface AppState {
  // Autenticación de Supabase
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

  // Progreso Teórico
  completedModuleIds: number[];
  markModuleCompleted: (id: number) => void;

  // Progreso Práctico
  completedPracticeIds: number[];
  markPracticeCompleted: (id: number) => void;

  // Historial de Exámenes
  examHistory: ExamRecord[];
  addExamResult: (score: number, total: number) => void;

  // Métricas de Estudio
  studyTimeMinutes: number;
  addStudyTime: (minutes: number) => void;
  questionsAnsweredCount: number;

  // Getters Dinámicos de Progreso Real
  getTheoryProgress: () => number;
  getPracticeProgress: () => number;
  getExamProgress: () => number;
  getOverallProgress: () => number;
  getPassedExamsCount: () => number;
  getFormattedStudyTime: () => string;
}

const TOTAL_THEORY_MODULES = 4;
const TOTAL_PRACTICE_CASES = 5;

// Helpers de LocalStorage asociando datos al ID único del usuario
const getStorageKey = (userId: string) => `drivequest_progress_${userId}`;

const loadUserProgress = (userId: string): StoredProgress | null => {
  try {
    const saved = localStorage.getItem(getStorageKey(userId));
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error("Error al cargar progreso del usuario:", error);
  }
  return null;
};

const saveUserProgress = (userId: string | undefined, data: StoredProgress) => {
  if (!userId) return;
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
  } catch (error) {
    console.error("Error al guardar progreso del usuario:", error);
  }
};

// Sintaxis estricta de Zustand
export const useAppStore = create<AppState>()((set, get) => ({
  user: null,
  loading: true,

  checkSession: async () => {
    try {
      set({ loading: true });
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      
      const name = currentUser?.user_metadata?.full_name 
        || currentUser?.email?.split('@')[0] 
        || "Estudiante DriveQuest";

      const savedProgress = currentUser ? loadUserProgress(currentUser.id) : null;

      set({ 
        user: currentUser,
        userName: name,
        userEmail: currentUser?.email || "usuario@drivequest.app",
        completedModuleIds: savedProgress?.completedModuleIds || [],
        completedPracticeIds: savedProgress?.completedPracticeIds || [],
        examHistory: savedProgress?.examHistory || [],
        studyTimeMinutes: savedProgress?.studyTimeMinutes || 0,
        questionsAnsweredCount: savedProgress?.questionsAnsweredCount || 0
      });
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error && data?.user) {
      const name = data.user.user_metadata?.full_name || email.split('@')[0];
      set({ 
        user: data.user,
        userName: name,
        userEmail: data.user.email || email,
        completedModuleIds: [],
        completedPracticeIds: [],
        examHistory: [],
        studyTimeMinutes: 0,
        questionsAnsweredCount: 0
      });
    }
    return { error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error && data?.user) {
      const name = data.user.user_metadata?.full_name || email.split('@')[0];
      const savedProgress = loadUserProgress(data.user.id);

      set({ 
        user: data.user,
        userName: name,
        userEmail: data.user.email || email,
        completedModuleIds: savedProgress?.completedModuleIds || [],
        completedPracticeIds: savedProgress?.completedPracticeIds || [],
        examHistory: savedProgress?.examHistory || [],
        studyTimeMinutes: savedProgress?.studyTimeMinutes || 0,
        questionsAnsweredCount: savedProgress?.questionsAnsweredCount || 0
      });
    }
    return { error };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ 
      user: null, 
      userName: "Estudiante DriveQuest", 
      userEmail: "usuario@drivequest.app",
      completedModuleIds: [],
      completedPracticeIds: [],
      examHistory: [],
      studyTimeMinutes: 0,
      questionsAnsweredCount: 0
    });
  },

  // Datos de usuario
  userName: "Estudiante DriveQuest",
  userEmail: "usuario@drivequest.app",

  setUserData: (name, email) => set({ userName: name, userEmail: email }),

  // Módulos Teóricos
  completedModuleIds: [],
  markModuleCompleted: (id) =>
    set((state) => {
      if (state.completedModuleIds.includes(id)) return state;
      const updatedModules = [...state.completedModuleIds, id];
      const updatedQuestions = state.questionsAnsweredCount + 10;
      const updatedTime = state.studyTimeMinutes + 15;

      if (state.user?.id) {
        saveUserProgress(state.user.id, {
          completedModuleIds: updatedModules,
          completedPracticeIds: state.completedPracticeIds,
          examHistory: state.examHistory,
          studyTimeMinutes: updatedTime,
          questionsAnsweredCount: updatedQuestions
        });
      }

      return {
        completedModuleIds: updatedModules,
        questionsAnsweredCount: updatedQuestions,
        studyTimeMinutes: updatedTime
      };
    }),

  // Casos Prácticos
  completedPracticeIds: [],
  markPracticeCompleted: (id) =>
    set((state) => {
      if (state.completedPracticeIds.includes(id)) return state;
      const updatedPractice = [...state.completedPracticeIds, id];
      const updatedTime = state.studyTimeMinutes + 10;

      if (state.user?.id) {
        saveUserProgress(state.user.id, {
          completedModuleIds: state.completedModuleIds,
          completedPracticeIds: updatedPractice,
          examHistory: state.examHistory,
          studyTimeMinutes: updatedTime,
          questionsAnsweredCount: state.questionsAnsweredCount
        });
      }

      return {
        completedPracticeIds: updatedPractice,
        studyTimeMinutes: updatedTime
      };
    }),

  // Historial de Exámenes
  examHistory: [],
  addExamResult: (score, total) => {
    const percentage = Math.round((score / total) * 100);
    const newRecord = {
      date: new Date().toISOString().split("T")[0],
      score,
      total,
      percentage,
    };

    set((state) => {
      const updatedExams = [newRecord, ...state.examHistory];
      const updatedQuestions = state.questionsAnsweredCount + total;
      const updatedTime = state.studyTimeMinutes + 20;

      if (state.user?.id) {
        saveUserProgress(state.user.id, {
          completedModuleIds: state.completedModuleIds,
          completedPracticeIds: state.completedPracticeIds,
          examHistory: updatedExams,
          studyTimeMinutes: updatedTime,
          questionsAnsweredCount: updatedQuestions
        });
      }

      return {
        examHistory: updatedExams,
        questionsAnsweredCount: updatedQuestions,
        studyTimeMinutes: updatedTime
      };
    });
  },

  studyTimeMinutes: 0,
  addStudyTime: (minutes) => set((state) => ({ studyTimeMinutes: state.studyTimeMinutes + minutes })),
  questionsAnsweredCount: 0,

  // Getters de Progreso Real
  getTheoryProgress: () => {
    const { completedModuleIds } = get();
    return Math.min(100, Math.round((completedModuleIds.length / TOTAL_THEORY_MODULES) * 100));
  },

  getPracticeProgress: () => {
    const { completedPracticeIds } = get();
    return Math.min(100, Math.round((completedPracticeIds.length / TOTAL_PRACTICE_CASES) * 100));
  },

  getExamProgress: () => {
    const { examHistory } = get();
    if (examHistory.length === 0) return 0;
    const sum = examHistory.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / examHistory.length);
  },

  getOverallProgress: () => {
    const { getTheoryProgress, getPracticeProgress, getExamProgress } = get();
    const theory = getTheoryProgress();
    const practice = getPracticeProgress();
    const exam = getExamProgress();
    return Math.round((theory * 0.4) + (practice * 0.3) + (exam * 0.3));
  },

  getPassedExamsCount: () => {
    const { examHistory } = get();
    return examHistory.filter(e => e.percentage >= 80).length;
  },

  getFormattedStudyTime: () => {
    const { studyTimeMinutes } = get();
    if (studyTimeMinutes === 0) return "0.0 hrs";
    if (studyTimeMinutes < 60) return `${studyTimeMinutes} min`;
    return `${(studyTimeMinutes / 60).toFixed(1)} hrs`;
  }
}));