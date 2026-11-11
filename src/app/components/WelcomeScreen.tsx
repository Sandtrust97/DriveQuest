import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, LogIn } from "lucide-react";
import logoImg from "../../assets/Logo.png";

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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 justify-between px-6 pt-4 pb-6 max-w-md mx-auto">
      {/* Contenido Superior: Logo e Identidad */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Logo de DriveQuest (incluye el nombre de la marca) */}
        <img
          src={logoImg}
          alt="Logo de DriveQuest"
          className="w-80 h-80 max-w-full object-contain drop-shadow-lg mb-3"
        />

        {/* Descripción */}
        <div className="space-y-3 px-2">
          <p className="text-slate-500 text-base leading-relaxed max-w-xs mx-auto">
            Aprende las normas de tránsito, practica exámenes y obtén tu licencia de conducción a tu ritmo.
          </p>
        </div>
      </div>

      {/* Acciones de Selección: Registro e Inicio de Sesión */}
      <div className="space-y-3 w-full">
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