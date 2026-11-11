import { create } from "zustand";
import { supabase } from '../Lib/supabase';
import { User } from '@supabase/supabase-js';
import { PRACTICE_CASES } from '../data/practiceCases';

/**
 * Detalle del resultado del examen teórico según la norma oficial ANSV
 * (Resolución No. 20253040037125): 40 preguntas (12 de actitudes y 28 de
 * conocimientos), con aprobación únicamente al obtener ≥80% en conocimientos
 * Y ≥80% en actitudes.
 */
export interface ExamResultDetails {
  knowledgeScore: number;
  knowledgeTotal: number;
  attitudesScore: number;
  attitudesTotal: number;
  knowledgePercentage: number;
  attitudesPercentage: number;
  passed: boolean;
}

export interface ExamRecord {
  date: string;
  score: number;
  total: number;
  percentage: number;
  knowledgeScore?: number;
  knowledgeTotal?: number;
  attitudesScore?: number;
  attitudesTotal?: number;
  knowledgePercentage?: number;
  attitudesPercentage?: number;
  /** Aprobación según regla oficial: ≥80% en conocimientos Y ≥80% en actitudes. */
  passed?: boolean;
}

export interface StoredProgress {
  completedModuleIds: number[];
  completedPracticeIds: number[];
  examHistory: ExamRecord[];
  studyTimeMinutes: number;
  questionsAnsweredCount: number;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string;
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
  userAvatar: string | null;
  setUserData: (name: string, email: string) => void;
  setUserAvatar: (avatar: string | null) => void;

  // Preferencias de recordatorios
  reminderEnabled: boolean;
  reminderTime: string;
  setReminderSettings: (enabled: boolean, time: string) => void;

  // Progreso Teórico
  completedModuleIds: number[];
  markModuleCompleted: (id: number) => void;

  // Progreso Práctico
  completedPracticeIds: number[];
  markPracticeCompleted: (id: number) => void;

  // Historial de Exámenes (40 preguntas: 12 actitudes + 28 conocimientos, regla ANSV)
  examHistory: ExamRecord[];
  addExamResult: (score: number, total: number, details?: ExamResultDetails) => void;

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

const TOTAL_THEORY_MODULES = 41;
const TOTAL_PRACTICE_CASES = PRACTICE_CASES.length;

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

// Helpers de LocalStorage para la foto de perfil
export const getUserAvatarStorageKey = (userId: string) => `drivequest_avatar_${userId}`;

const loadUserAvatar = (userId: string): string | null => {
  try {
    return localStorage.getItem(getUserAvatarStorageKey(userId));
  } catch (error) {
    console.error("Error al cargar la foto de perfil:", error);
    return null;
  }
};

// Helpers de LocalStorage para los recordatorios diarios
const REMINDER_STORAGE_KEY = "drivequest_reminder_settings";
const DEFAULT_REMINDER_TIME = "19:00";

const loadReminderSettings = (): ReminderSettings => {
  try {
    const saved = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<ReminderSettings>;
      return {
        enabled: Boolean(parsed?.enabled),
        time:
          typeof parsed?.time === "string" && /^\d{2}:\d{2}$/.test(parsed.time)
            ? parsed.time
            : DEFAULT_REMINDER_TIME,
      };
    }
  } catch (error) {
    console.error("Error al cargar los recordatorios:", error);
  }
  return { enabled: false, time: DEFAULT_REMINDER_TIME };
};

const saveReminderSettings = (settings: ReminderSettings) => {
  try {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error al guardar los recordatorios:", error);
  }
};

const initialReminderSettings = loadReminderSettings();

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
      const savedAvatar = currentUser ? loadUserAvatar(currentUser.id) : null;

      set({ 
        user: currentUser,
        userName: name,
        userEmail: currentUser?.email || "usuario@drivequest.app",
        userAvatar: savedAvatar,
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
        userAvatar: null,
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
      const savedAvatar = loadUserAvatar(data.user.id);

      set({ 
        user: data.user,
        userName: name,
        userEmail: data.user.email || email,
        userAvatar: savedAvatar,
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
      userAvatar: null,
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
  userAvatar: null,

  setUserData: (name, email) => set({ userName: name, userEmail: email }),

  setUserAvatar: (avatar) => {
    const userId = get().user?.id;
    if (userId) {
      try {
        if (avatar) {
          localStorage.setItem(getUserAvatarStorageKey(userId), avatar);
        } else {
          localStorage.removeItem(getUserAvatarStorageKey(userId));
        }
      } catch (error) {
        console.error("Error al guardar la foto de perfil:", error);
      }
    }
    set({ userAvatar: avatar });
  },

  // Preferencias de recordatorios (persistidas en el dispositivo)
  reminderEnabled: initialReminderSettings.enabled,
  reminderTime: initialReminderSettings.time,

  setReminderSettings: (enabled, time) => {
    saveReminderSettings({ enabled, time });
    set({ reminderEnabled: enabled, reminderTime: time });
  },

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
  addExamResult: (score, total, details) => {
    const percentage = Math.round((score / total) * 100);
    const newRecord: ExamRecord = {
      date: new Date().toISOString().split("T")[0],
      score,
      total,
      percentage,
      ...(details ?? {}),
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
    // Regla oficial ANSV: el examen se aprueba únicamente con ≥80% en
    // conocimientos Y ≥80% en actitudes (respaldo histórico: ≥80% general).
    return examHistory.filter((e) => e.passed ?? e.percentage >= 80).length;
  },

  getFormattedStudyTime: () => {
    const { studyTimeMinutes } = get();
    if (studyTimeMinutes === 0) return "0.0 hrs";
    if (studyTimeMinutes < 60) return `${studyTimeMinutes} min`;
    return `${(studyTimeMinutes / 60).toFixed(1)} hrs`;
  }
}));