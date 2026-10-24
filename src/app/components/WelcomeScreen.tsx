import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CarFront, ArrowRight, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const navigate = useNavigate();

  const handleStart = () => {
    if (onNavigate) onNavigate("register");
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 justify-between p-6 max-w-md mx-auto">
      {/* Contenido Superior: Logo e Identidad */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-12">
        {/* Nuevo Ícono de DriveQuest */}
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

      {/* Botón de Acción Principal y Nota Legal */}
      <div className="space-y-4 pb-6 w-full">
        <Button
          onClick={handleStart}
          className="w-full py-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-lg shadow-lg shadow-blue-600/25 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span>Comenzar</span>
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-xs text-center text-slate-400 max-w-xs mx-auto">
          Al continuar, aceptas dar el primer paso para ser un conductor responsable.
        </p>
      </div>
    </div>
  );
}