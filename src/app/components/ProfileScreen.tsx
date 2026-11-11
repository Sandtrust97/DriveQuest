import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppStore } from "../store/useAppStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { requestNotificationPermission, syncDailyReminder } from "../Lib/reminders";
import { toast } from "sonner";
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
  TrendingUp,
  Camera,
  Clock
} from "lucide-react";

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const navigate = useNavigate();

  // Conectar con Zustand para obtener datos reales del usuario y métricas
  const userName = useAppStore((state) => state.userName);
  const userEmail = useAppStore((state) => state.userEmail);
  const userAvatar = useAppStore((state) => state.userAvatar);
  const setUserAvatar = useAppStore((state) => state.setUserAvatar);
  const reminderEnabled = useAppStore((state) => state.reminderEnabled);
  const reminderTime = useAppStore((state) => state.reminderTime);
  const setReminderSettings = useAppStore((state) => state.setReminderSettings);
  const getOverallProgress = useAppStore((state) => state.getOverallProgress);
  const getPassedExamsCount = useAppStore((state) => state.getPassedExamsCount);
  const logout = useAppStore((state) => state.logout);

  const overallProgress = getOverallProgress();
  const passedExams = getPassedExamsCount();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [draftReminderEnabled, setDraftReminderEnabled] = useState(reminderEnabled);
  const [draftReminderTime, setDraftReminderTime] = useState(reminderTime);
  const [savingReminder, setSavingReminder] = useState(false);

  const openReminderSettings = () => {
    setDraftReminderEnabled(reminderEnabled);
    setDraftReminderTime(reminderTime);
    setReminderOpen(true);
  };

  // El botón físico "atrás" de Android cierra primero el modal de recordatorios.
  useEffect(() => {
    const handleHardwareBack = (event: Event) => {
      if (!reminderOpen) return;
      event.preventDefault();
      setReminderOpen(false);
    };

    window.addEventListener("drivequest:hardware-back", handleHardwareBack);
    return () => window.removeEventListener("drivequest:hardware-back", handleHardwareBack);
  }, [reminderOpen]);

  const handleSaveReminderSettings = async () => {
    setSavingReminder(true);
    try {
      if (draftReminderEnabled) {
        const granted = await requestNotificationPermission();
        if (!granted) {
          toast.error("Activa los permisos de notificaciones para usar los recordatorios.");
          return;
        }
      }

      setReminderSettings(draftReminderEnabled, draftReminderTime);
      await syncDailyReminder(draftReminderEnabled, draftReminderTime);

      toast.success(
        draftReminderEnabled
          ? `Recordatorio diario activado a las ${draftReminderTime}`
          : "Recordatorio diario desactivado"
      );
      setReminderOpen(false);
    } catch (error) {
      console.error("Error al guardar los recordatorios:", error);
      toast.error("No se pudieron guardar los recordatorios.");
    } finally {
      setSavingReminder(false);
    }
  };

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Permite volver a seleccionar el mismo archivo más adelante.
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecciona un archivo de imagen válido.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen debe pesar menos de 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUserAvatar(reader.result);
        toast.success("Foto de perfil actualizada.");
      }
    };
    reader.onerror = () => toast.error("No se pudo leer la imagen seleccionada.");
    reader.readAsDataURL(file);
  };

  const handleNavigation = (path: string, screenName: string) => {
    if (onNavigate) {
      onNavigate(screenName);
    }
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    if (onNavigate) onNavigate("welcome");
    navigate("/");
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
          <div className="relative">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border-2 border-blue-200 shadow-inner overflow-hidden"
              aria-label="Cambiar foto de perfil"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={`Foto de perfil de ${userName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10" />
              )}
              <span className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <Camera className="w-5 h-5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:bg-blue-700 transition-colors"
              aria-label="Subir nueva foto de perfil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{userName}</h3>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
              <Mail className="w-3.5 h-3.5" /> {userEmail}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            <Shield className="w-3.5 h-3.5" /> Licencia Tipo B1 / A2
          </div>
        </div>

        {/* Estadísticas Rápidas Dinámicas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Completado</p>
              <p className="text-base font-bold text-slate-800">{overallProgress}%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Exámenes</p>
              <p className="text-base font-bold text-slate-800">{passedExams} {passedExams === 1 ? "Aprobado" : "Aprobados"}</p>
            </div>
          </div>
        </div>

        {/* Opciones de Configuración */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Ajustes</h4>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={openReminderSettings}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
              aria-haspopup="dialog"
            >
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
            onClick={handleLogout}
            variant="outline"
            className="w-full py-6 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Modal de Recordatorios */}
      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              <Bell className="w-5 h-5 text-blue-600" />
              Recordatorios de Estudio
            </DialogTitle>
            <DialogDescription>
              Configura un recordatorio diario para mantener tu preparación al día.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-800">Recordatorio diario</p>
                <p className="text-xs text-slate-500">Recibe un aviso para estudiar cada día.</p>
              </div>
              <Switch
                checked={draftReminderEnabled}
                onCheckedChange={setDraftReminderEnabled}
                aria-label="Activar recordatorio diario"
              />
            </div>

            <div className={`space-y-2 transition-opacity ${draftReminderEnabled ? "opacity-100" : "opacity-50"}`}>
              <label
                htmlFor="reminder-time"
                className="text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-slate-500" />
                Hora del recordatorio
              </label>
              <Input
                id="reminder-time"
                type="time"
                value={draftReminderTime}
                onChange={(event) => setDraftReminderTime(event.target.value)}
                disabled={!draftReminderEnabled}
                className="h-11 rounded-xl border-slate-200"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setReminderOpen(false)}
              disabled={savingReminder}
              className="rounded-xl border-slate-200"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSaveReminderSettings}
              disabled={savingReminder || (draftReminderEnabled && !draftReminderTime)}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {savingReminder ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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