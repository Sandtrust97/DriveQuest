import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Award, 
  BookOpen, 
  Shield, 
  Bell, 
  LogOut, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
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
        <h2 className="font-bold text-slate-900">Mi Perfil</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto w-full">
        {/* Tarjeta de Información Personal */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border-2 border-blue-200 shadow-inner">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Estudiante DriveQuest</h3>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
              <Mail className="w-3.5 h-3.5" /> usuario@drivequest.app
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            <Shield className="w-3.5 h-3.5" /> Licencia Tipo B1 / A2
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Completado</p>
              <p className="text-base font-bold text-slate-800">45%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Exámenes</p>
              <p className="text-base font-bold text-slate-800">2 Aprobados</p>
            </div>
          </div>
        </div>

        {/* Opciones de Configuración */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Ajustes</h4>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => handleNavigation("/progress", "progress")}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Ver Estadísticas Detalladas</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Notificaciones de Recordatorio</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Botón Cerrar Sesión */}
        <div className="pt-2">
          <Button
            onClick={() => handleNavigation("/", "welcome")}
            variant="outline"
            className="w-full py-6 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
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
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium text-xs space-y-1"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Progreso</span>
        </button>

        <button 
          onClick={() => handleNavigation("/profile", "profile")}
          className="flex flex-col items-center text-blue-600 font-medium text-xs space-y-1"
        >
          <User className="w-5 h-5" />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
}