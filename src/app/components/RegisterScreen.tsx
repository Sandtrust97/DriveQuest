import { supabase } from "../Lib/supabase";
import { useAppStore } from "../store/useAppStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";



interface RegisterScreenProps {
  onNavigate?: (screen: string) => void;
}

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const navigate = useNavigate();

  const setUserData = useAppStore((state) => state.setUserData);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 // Dentro de RegisterScreen.tsx:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Registro de usuario en la autenticación de Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    if (error) {
      alert("Error al registrarse: " + error.message);
      return;
    }

    if (data.user) {
      setUserData(formData.fullName, formData.email);
      if (onNavigate) onNavigate("dashboard");
      navigate("/dashboard");
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleBack = () => {
    if (onNavigate) {
      onNavigate("welcome");
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">Crear Cuenta</h2>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full">
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 mx-auto rounded-2xl flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Empieza tu aprendizaje</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Regístrate para guardar tu avance teórico, historial de exámenes y estadísticas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre Completo */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold text-slate-700">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="pl-9 py-5 rounded-xl border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-9 py-5 rounded-xl border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-9 py-5 rounded-xl border-slate-200 bg-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-200 mt-2 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Crear Cuenta e Iniciar
            </Button>
          </form>
        </div>

        <div className="py-6 text-center">
          <p className="text-xs text-slate-400">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate("dashboard");
                navigate("/dashboard");
              }}
              className="text-blue-600 font-semibold underline hover:text-blue-700"
            >
              Ingresar directamente
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}