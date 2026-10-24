import { create } from "zustand";

interface AppState {
  // Datos del estudiante
  userName: string;
  userEmail: string;
  setUserData: (name: string, email: string) => void;

  // Progreso de módulos teóricos (IDs de módulos completados)
  completedModuleIds: number[];
  markModuleCompleted: (id: number) => void;

  // Historial de simulacros de examen
  examHistory: { date: string; score: number; total: number; percentage: number }[];
  addExamResult: (score: number, total: number) => void;

  // Métricas calculadas para el Dashboard y Progreso
  getOverallProgress: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  userName: "Estudiante DriveQuest",
  userEmail: "usuario@drivequest.app",

  setUserData: (name, email) => set({ userName: name, userEmail: email }),

  completedModuleIds: [1, 2], // Módulos por defecto completados
  markModuleCompleted: (id) =>
    set((state) => ({
      completedModuleIds: state.completedModuleIds.includes(id)
        ? state.completedModuleIds
        : [...state.completedModuleIds, id],
    })),

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

  getOverallProgress: () => {
    const { completedModuleIds, examHistory } = get();
    const totalModules = 4; // Total de módulos teóricos
    const moduleProgress = (completedModuleIds.length / totalModules) * 50;

    const lastExam = examHistory[0];
    const examProgress = lastExam ? (lastExam.percentage / 100) * 50 : 0;

    return Math.min(100, Math.round(moduleProgress + examProgress));
  },
}));