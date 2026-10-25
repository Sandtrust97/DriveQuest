import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CarFront, ArrowRight, Sparkles, LogIn } from "lucide-react";

interface WelcomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const navigate = useNavigate();

  const handleRegister = () => {
    if (onNavigate) onNavigate("register");
    navigate("/register");
  };

  const handleLogin = () => {
    if (onNavigate) onNavigate("login");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 justify-between p-6 max-w-md mx-auto">
      {/* Contenido Superior: Logo e Identidad */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-12">
        {/* Ícono de DriveQuest */}
        <div className="relative">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all">
            <CarFront className="w-12 h-12 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-full border-2 border-slate-50 shadow-sm">
            <Sparkles className="w-4 h-4 text-slate-900" />
          </div>
        </div>

        {/* Título y Descripción */}
        <div className="space-y-3 px-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            DriveQuest
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-xs mx-auto">
            Aprende las normas de tránsito, practica exámenes y obtén tu licencia de conducción a tu ritmo.
          </p>
        </div>
      </div>

      {/* Acciones de Selección: Registro e Inicio de Sesión */}
      <div className="space-y-3 pb-6 w-full">
        <Button
          onClick={handleRegister}
          className="w-full py-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-lg shadow-lg shadow-blue-600/25 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span>Crear Cuenta Nueva</span>
          <ArrowRight className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          onClick={handleLogin}
          className="w-full py-6 border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-2xl text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <LogIn className="w-5 h-5 text-slate-600" />
          <span>Iniciar Sesión</span>
        </Button>

        <p className="text-xs text-center text-slate-400 max-w-xs mx-auto pt-2">
          Al continuar, aceptas dar el primer paso para ser un conductor responsable.
        </p>
      </div>
    </div>
  );
}