import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useAppStore } from "../store/useAppStore"; // Importar el store
import { 
  BookOpen, 
  Car, 
  FileCheck, 
  TrendingUp, 
  User, 
  LogOut, 
  ChevronRight,
  Award
} from "lucide-react";

interface DashboardProps {
  onNavigate?: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const navigate = useNavigate();

  // Conectar con Zustand
  const userName = useAppStore((state) => state.userName);
  const getOverallProgress = useAppStore((state) => state.getOverallProgress);
  const overallProgress = getOverallProgress();

  const handleNavigation = (path: string, screenName: string) => {
    if (onNavigate) onNavigate(screenName);
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 pb-20">
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-100">Bienvenido de nuevo</p>
              <h2 className="text-xl font-bold">{userName}</h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation("/", "welcome")}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300" /> Nivel de Preparación
            </span>
            <span className="font-bold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 bg-blue-950/30" />
          <p className="text-xs text-blue-100">
            Completa más módulos o exámenes para subir tu porcentaje.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Módulos Principales</h3>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleNavigation("/theory", "theory")}
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Módulo Teórico</h4>
                <p className="text-xs text-slate-500">Señales, normas y seguridad vial</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={() => handleNavigation("/practice", "practice")}
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Práctica Interactiva</h4>
                <p className="text-xs text-slate-500">Casos de conducción y maniobras</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </button>

          <button
            onClick={() => handleNavigation("/exam", "exam")}
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-purple-200 transition-all text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Simulacro de Examen</h4>
                <p className="text-xs text-slate-500">Prueba con tiempo oficial</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center">
        <button onClick={() => handleNavigation("/dashboard", "dashboard")} className="flex flex-col items-center text-blue-600 font-medium text-xs space-y-1">
          <BookOpen className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        <button onClick={() => handleNavigation("/progress", "progress")} className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium text-xs space-y-1">
          <TrendingUp className="w-5 h-5" />
          <span>Progreso</span>
        </button>

        <button onClick={() => handleNavigation("/profile", "profile")} className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium text-xs space-y-1">
          <User className="w-5 h-5" />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
}