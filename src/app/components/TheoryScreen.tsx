import { useAppStore } from "../store/useAppStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert, 
  Compass, 
  AlertTriangle, 
  ChevronRight
} from "lucide-react";
import { THEORY_MODULES, type TheoryModule } from "../data/theoryModules";

interface TheoryScreenProps {
  onNavigate?: (screen: string) => void;
}

export function TheoryScreen({ onNavigate }: TheoryScreenProps) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"todas" | "senales" | "normas" | "seguridad">("todas");
  const [selectedModule, setSelectedModule] = useState<TheoryModule | null>(null);

  // El botón físico "atrás" de Android primero cierra la lectura del módulo.
  useEffect(() => {
    const handleHardwareBack = (event: Event) => {
      if (!selectedModule) return;
      event.preventDefault();
      setSelectedModule(null);
    };

    window.addEventListener("drivequest:hardware-back", handleHardwareBack);
    return () => window.removeEventListener("drivequest:hardware-back", handleHardwareBack);
  }, [selectedModule]);

 // ✅ REEMPLAZA EL ESTADO LOCAL DE COMPLETEDIDS POR ZUSTAND:
  const completedIds = useAppStore((state) => state.completedModuleIds);
  const markModuleCompleted = useAppStore((state) => state.markModuleCompleted);

  const filteredModules = THEORY_MODULES.filter((m) => {
    if (activeTab === "todas") return true;
    return m.category === activeTab;
  });

  const progressPercentage = Math.round((completedIds.length / THEORY_MODULES.length) * 100);

  const handleMarkAsCompleted = (id: number) => {
    if (!completedIds.includes(id)) {
      markModuleCompleted(id);
    }
    setSelectedModule(null);
  };

  const handleBack = () => {
    if (selectedModule) {
      setSelectedModule(null);
    } else {
      if (onNavigate) onNavigate("dashboard");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">
          {selectedModule ? "Lectura del Módulo" : "Módulo Teórico"}
        </h2>
        <div className="w-8"></div>
      </div>

      {selectedModule ? (
        /* Vista de Detalle de Lectura */
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" /> {selectedModule.readTime} de lectura
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-snug">
              {selectedModule.title}
            </h3>

            <p className="text-sm text-slate-500 italic border-l-2 border-blue-500 pl-3 py-1 text-justify">
              {selectedModule.description}
            </p>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed space-y-3 text-justify">
              <p>{selectedModule.content}</p>
            </div>
          </div>

          <div className="pt-4 pb-6">
            <Button
              onClick={() => handleMarkAsCompleted(selectedModule.id)}
              className={`w-full py-6 font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 ${
                completedIds.includes(selectedModule.id)
                  ? "bg-slate-800 hover:bg-slate-900 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {completedIds.includes(selectedModule.id) ? "Módulo Completado" : "Marcar como Leído"}
            </Button>
          </div>
        </div>
      ) : (
        /* Lista de Módulos */
        <div className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full">
          {/* Tarjeta de Progreso del Módulo */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-blue-600">
                <BookOpen className="w-4 h-4" /> Avance de Lecciones
              </span>
              <span>{completedIds.length} de {THEORY_MODULES.length} Completadas</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Filtros por Categoría */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "todas", label: "Todas" },
              { id: "senales", label: "Señales" },
              { id: "normas", label: "Normas" },
              { id: "seguridad", label: "Seguridad" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lista de Tarjetas */}
          <div className="space-y-3">
            {filteredModules.map((item) => {
              const isDone = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedModule(item)}
                  className="w-full p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all text-left flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isDone ? "bg-emerald-500" : "bg-amber-400"}`} />
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    <span className="inline-block text-[10px] text-slate-400 font-medium pt-1">
                      {item.readTime}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}