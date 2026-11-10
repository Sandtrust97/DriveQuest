import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { PRACTICE_CASES } from "../data/practiceCases";
import { useAppStore } from "../store/useAppStore";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Car,
  ChevronRight
} from "lucide-react";

interface PracticeScreenProps {
  onNavigate?: (screen: string) => void;
}

export function PracticeScreen({ onNavigate }: PracticeScreenProps) {
  const navigate = useNavigate();
  const markPracticeCompleted = useAppStore((state) => state.markPracticeCompleted);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCase = PRACTICE_CASES[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    markPracticeCompleted(currentCase.id);
    if (selectedOption === currentCase.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_CASES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleBack = () => {
    if (onNavigate) onNavigate("dashboard");
    navigate("/dashboard");
  };

  const selectedFeedback =
    isAnswered && selectedOption !== null
      ? selectedOption === currentCase.correctOptionIndex
        ? currentCase.correctFeedback
        : currentCase.incorrectFeedback[selectedOption]
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">Práctica de Casos Reales</h2>
        <div className="w-8"></div>
      </div>

      {isCompleted ? (
        /* Pantalla de Finalización */
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="text-center space-y-4 pt-10">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center shadow-lg">
              <Car className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">¡Sesión de Práctica Completada!</h3>
            <p className="text-sm text-slate-500">
              Analizaste exitosamente los escenarios tácticos de conducción.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 my-6">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Aciertos Totales</span>
              <p className="text-3xl font-extrabold text-slate-900">{score} / {PRACTICE_CASES.length}</p>
            </div>
          </div>

          <div className="space-y-3 pb-6">
            <Button onClick={handleRestart} variant="outline" className="w-full py-6 rounded-xl flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Repetir Práctica
            </Button>
            <Button onClick={handleBack} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Volver al Inicio
            </Button>
          </div>
        </div>
      ) : (
        /* Vista del Ejercicio */
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="space-y-6">
            {/* Progreso */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Caso {currentIndex + 1} de {PRACTICE_CASES.length}</span>
                <span>{currentCase.title}</span>
              </div>
              <Progress value={((currentIndex + 1) / PRACTICE_CASES.length) * 100} className="h-1.5" />
            </div>

            {/* Tarjeta del Escenario */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Escenario de Manejo
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {currentCase.scenario}
              </p>
            </div>

            {/* Opciones */}
            <div className="space-y-3">
              {currentCase.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentCase.correctOptionIndex;

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

            {/* Explicación posterior a responder */}
            {isAnswered && (
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">Retroalimentación:</span>
                <p>{selectedFeedback}</p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="pt-6 pb-4">
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
                onClick={handleNext}
                className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
              >
                Siguiente Caso
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
