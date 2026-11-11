import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { PRACTICE_CASES, type PracticeCase } from "../data/practiceCases";
import { useAppStore } from "../store/useAppStore";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";

interface PracticeScreenProps {
  onNavigate?: (screen: string) => void;
}

/** Pestañas de filtrado por categoría (alineadas con los ejes temáticos del manual de la ANSV). */
type PracticeTab = "todas" | "normas" | "senales" | "seguridad" | "vehiculos" | "motocicletas";
type PracticeCategory = Exclude<PracticeTab, "todas">;

const CATEGORY_TABS: { id: PracticeTab; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "normas", label: "Normas" },
  { id: "senales", label: "Señales" },
  { id: "seguridad", label: "Seguridad" },
  { id: "vehiculos", label: "Vehículos" },
  { id: "motocicletas", label: "Motocicletas" },
];

const CATEGORY_LABELS: Record<PracticeCategory, string> = {
  normas: "Normas",
  senales: "Señales",
  seguridad: "Seguridad",
  vehiculos: "Vehículos",
  motocicletas: "Motocicletas",
};

/**
 * Deriva la categoría de cada caso a partir del eje temático del tema en el
 * manual oficial de la ANSV (el dataset de casos no se altera):
 * - 1.x, 2.1.2.x, 3, 4 y Glosario → Normas
 * - 2.1.3.x → Señales
 * - 2.1.4.x, 2.3.x y 2.4.2/2.4.3 → Vehículos
 * - 2.2.x → Motocicletas
 * - Demás temas (siniestros, saberes transversales, actores vulnerables) → Seguridad
 */
const getCategoryForCase = (topic: string): PracticeCategory => {
  if (topic.startsWith("2.1.3")) return "senales";
  if (topic.startsWith("2.1.4")) return "vehiculos";
  if (topic.startsWith("2.2")) return "motocicletas";
  if (topic.startsWith("2.3") || topic.startsWith("2.4.2") || topic.startsWith("2.4.3")) {
    return "vehiculos";
  }
  if (
    topic.startsWith("1.") ||
    topic.startsWith("2.1.2") ||
    topic.startsWith("3.") ||
    topic.startsWith("4.") ||
    topic.startsWith("Glosario")
  ) {
    return "normas";
  }
  return "seguridad";
};

export function PracticeScreen({ onNavigate }: PracticeScreenProps) {
  const navigate = useNavigate();

  // ✅ Progreso global de casos resueltos desde Zustand
  const completedIds = useAppStore((state) => state.completedPracticeIds);
  const markPracticeCompleted = useAppStore((state) => state.markPracticeCompleted);

  const [activeTab, setActiveTab] = useState<PracticeTab>("todas");
  const [selectedCase, setSelectedCase] = useState<PracticeCase | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // El botón físico "atrás" de Android primero vuelve de la resolución del caso
  // a la lista de selección (mismo comportamiento que la lectura de un módulo).
  useEffect(() => {
    const handleHardwareBack = (event: Event) => {
      if (!selectedCase) return;
      event.preventDefault();
      setSelectedCase(null);
      setSelectedOption(null);
      setIsAnswered(false);
    };

    window.addEventListener("drivequest:hardware-back", handleHardwareBack);
    return () => window.removeEventListener("drivequest:hardware-back", handleHardwareBack);
  }, [selectedCase]);

  const filteredCases = PRACTICE_CASES.filter((item) => {
    if (activeTab === "todas") return true;
    return getCategoryForCase(item.topic) === activeTab;
  });

  const progressPercentage = Math.round((completedIds.length / PRACTICE_CASES.length) * 100);

  const handleOpenCase = (item: PracticeCase) => {
    setSelectedCase(item);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleBackToList = () => {
    setSelectedCase(null);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !selectedCase) return;
    setIsAnswered(true);
    markPracticeCompleted(selectedCase.id);
  };

  const handleBack = () => {
    if (selectedCase) {
      handleBackToList();
    } else {
      if (onNavigate) onNavigate("dashboard");
      navigate("/dashboard");
    }
  };

  const selectedFeedback =
    isAnswered && selectedOption !== null && selectedCase
      ? selectedOption === selectedCase.correctOptionIndex
        ? selectedCase.correctFeedback
        : selectedCase.incorrectFeedback[selectedOption]
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">
          {selectedCase ? "Resolución del Caso" : "Práctica de Casos Reales"}
        </h2>
        <div className="w-8"></div>
      </div>

      {selectedCase ? (
        /* Vista de Resolución del Caso */
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Car className="w-3.5 h-3.5" /> {CATEGORY_LABELS[getCategoryForCase(selectedCase.topic)]}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-snug">
              {selectedCase.title}
            </h3>

            {/* Tarjeta del Escenario */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Escenario de Manejo
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed text-justify">
                {selectedCase.scenario}
              </p>
            </div>

            {/* Opciones */}
            <div className="space-y-3">
              {selectedCase.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === selectedCase.correctOptionIndex;

                let buttonStyles = "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyles = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium";
                  } else if (isSelected && !isCorrect) {
                    buttonStyles = "border-rose-500 bg-rose-50 text-rose-900 font-medium";
                  }
                } else if (isSelected) {
                  buttonStyles = "border-emerald-600 bg-emerald-50/50 text-emerald-900 font-medium";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start justify-between space-x-3 ${buttonStyles}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación posterior a responder */}
            {isAnswered && (
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">Retroalimentación:</span>
                <p className="text-justify">{selectedFeedback}</p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="pt-4 pb-6">
            {!isAnswered ? (
              <Button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold shadow-md"
              >
                Comprobar Respuesta
              </Button>
            ) : (
              <Button
                onClick={handleBackToList}
                className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver a la Lista de Casos
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Lista de Casos */
        <div className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full">
          {/* Tarjeta de Progreso de Casos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-blue-600">
                <Car className="w-4 h-4" /> Avance de Casos
              </span>
              <span>{completedIds.length} de {PRACTICE_CASES.length} Completados</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Filtros por Categoría */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
            {filteredCases.map((item) => {
              const isDone = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleOpenCase(item)}
                  className="w-full p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all text-left flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.scenario}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold mt-1">
                      {CATEGORY_LABELS[getCategoryForCase(item.topic)]}
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
