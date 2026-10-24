import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  BookOpen, 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  User 
} from "lucide-react";

interface ProgressScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ProgressScreen({ onNavigate }: ProgressScreenProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string, screenName: string) => {
    if (onNavigate) {
      onNavigate(screenName);
    }
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleNavigation("/dashboard", "dashboard")} 
          className="text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">Estadísticas de Progreso</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto w-full">
        {/* Tarjeta Resumen Principal */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-100 font-medium">Nivel de Preparación General</p>
              <h3 className="text-3xl font-extrabold mt-1">45%</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/20">
              <TrendingUp className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          <Progress value={45} className="h-2 bg-blue-950/40" />
          <p className="text-xs text-blue-100 leading-relaxed">
            Estás a la mitad del camino para completar el plan de estudios obligatorio antes de presentar el examen teórico final.
          </p>
        </div>

        {/* Métricas Clave */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-500">Tiempo de Estudio</span>
            </div>
            <p className="text-xl font-bold text-slate-900">4.5 hrs</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-500">Preguntas Vistas</span>
            </div>
            <p className="text-xl font-bold text-slate-900">48 / 120</p>
          </div>
        </div>

        {/* Desglose por Módulos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Desglose de Conocimientos</h4>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            {/* Módulo Teórico */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-slate-700">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Lecciones Teóricas
                </span>
                <span className="font-bold text-slate-900">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            {/* Práctica táctica */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-slate-700">
                  <Award className="w-4 h-4 text-emerald-600" /> Casos Prácticos
                </span>
                <span className="font-bold text-slate-900">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>

            {/* Simulacros de Examen */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-slate-700">
                  <FileCheck className="w-4 h-4 text-purple-600" /> Simulacros de Examen
                </span>
                <span className="font-bold text-slate-900">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Menú Inferior */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center">
        <button 
          onClick={() => handleNavigation("/dashboard", "dashboard")}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium text-xs space-y-1"
        >
          <BookOpen className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        <button 
          onClick={() => handleNavigation("/progress", "progress")}
          className="flex flex-col items-center text-blue-600 font-medium text-xs space-y-1"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Progreso</span>
        </button>

        <button 
          onClick={() => handleNavigation("/profile", "profile")}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium text-xs space-y-1"
        >
          <User className="w-5 h-5" />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
}