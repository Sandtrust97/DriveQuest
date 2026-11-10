import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Lib/supabase";
import { useAppStore } from "../store/useAppStore";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  generateExam,
  evaluateExam,
  EXAM_CONFIG,
  type ExamQuestion,
  type ExamEvaluation,
} from "../data/examBank";
import { 
  ArrowLeft, 
  Clock, 
  XCircle, 
  RotateCcw, 
  Award 
} from "lucide-react";

interface ExamScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ExamScreen({ onNavigate }: ExamScreenProps) {
  const navigate = useNavigate();

  const addExamResult = useAppStore((state) => state.addExamResult);

  // Examen generado desde el banco de preguntas (estructura oficial ANSV:
  // 40 preguntas = 12 de actitudes + 28 de conocimientos en 4 núcleos).
  const [exam, setExam] = useState<ExamQuestion[]>(() => generateExam());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(exam.length).fill(null)
  );
  // Temporizador regresivo oficial: 50 minutos.
  const [timeLeft, setTimeLeft] = useState(EXAM_CONFIG.timeLimitSeconds);
  const [isFinished, setIsFinished] = useState(false);
  // Garantiza que el resultado se registre una sola vez (envío manual o automático).
  const resultsSubmittedRef = useRef(false);

  // Temporizador del examen
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const handleSelectOption = (index: number) => {
    if (isFinished) return;
    setSelectedOption(index);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = index;
    setAnswers(updatedAnswers);
  };

  // Guardar en la base de datos de Supabase
  const saveResultToCloud = async (finalScore: number, totalQuestions: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("exam_results").insert({
          user_id: user.id,
          score: finalScore,
          total: totalQuestions,
          percentage: Math.round((finalScore / totalQuestions) * 100),
        });
      }
    } catch (err) {
      console.error("Error al guardar el examen en Supabase:", err);
    }
  };

  // Cálculo de resultados: puntajes separados de conocimientos y actitudes.
  // Regla oficial ANSV: se aprueba únicamente con ≥80% en conocimientos Y
  // ≥80% en actitudes.
  const evaluation: ExamEvaluation = useMemo(
    () => evaluateExam(exam, answers),
    [exam, answers]
  );

  const score = evaluation.totalScore;
  const percentage = evaluation.percentage;
  const isApproved = evaluation.passed;

  // Finaliza el examen: envío manual ("Finalizar Examen") o automático (tiempo agotado).
  const finishExam = () => {
    if (resultsSubmittedRef.current) return;
    resultsSubmittedRef.current = true;

    const finalEvaluation = evaluateExam(exam, answers);
    setIsFinished(true);

    // Guardar localmente en la tienda global (Zustand)
    addExamResult(finalEvaluation.totalScore, finalEvaluation.totalQuestions, {
      knowledgeScore: finalEvaluation.knowledgeScore,
      knowledgeTotal: finalEvaluation.knowledgeTotal,
      attitudesScore: finalEvaluation.attitudesScore,
      attitudesTotal: finalEvaluation.attitudesTotal,
      knowledgePercentage: finalEvaluation.knowledgePercentage,
      attitudesPercentage: finalEvaluation.attitudesPercentage,
      passed: finalEvaluation.passed,
    });

    // Guardar en la nube (Supabase)
    saveResultToCloud(finalEvaluation.totalScore, finalEvaluation.totalQuestions);
  };

  // Envío automático al finalizar el tiempo límite (50 minutos).
  useEffect(() => {
    if (isFinished || timeLeft > 0) return;
    finishExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isFinished]);

  const handleNext = () => {
    if (currentQuestionIndex < exam.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(answers[nextIndex]);
    } else {
      finishExam();
    }
  };

  const handleRestart = () => {
    const newExam = generateExam();
    resultsSubmittedRef.current = false;
    setExam(newExam);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers(Array(newExam.length).fill(null));
    setTimeLeft(EXAM_CONFIG.timeLimitSeconds);
    setIsFinished(false);
  };

  const handleBack = () => {
    if (onNavigate) onNavigate("dashboard");
    navigate("/dashboard");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = exam[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">Simulacro de Examen</h2>
        {!isFinished && (
          <div className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Pantalla de Resultados al finalizar */}
      {isFinished ? (
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="text-center space-y-4 pt-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg ${
              isApproved ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
            }`}>
              {isApproved ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {isApproved ? "¡Examen Aprobado!" : "Sigue Practicando"}
            </h3>
            
            <p className="text-sm text-slate-500">
              {isApproved 
                ? "Has alcanzado el puntaje mínimo requerido: 80% o más en conocimientos y en actitudes."
                : "Necesitas un mínimo del 80% en conocimientos y del 80% en actitudes para aprobar."}
            </p>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 my-6">
              <div className="flex justify-between text-sm font-medium">
                <span>Puntuación:</span>
                <span className="font-bold">{score} / {exam.length}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Conocimientos:</span>
                <span className="font-bold">{evaluation.knowledgeScore} / {evaluation.knowledgeTotal} ({evaluation.knowledgePercentage}%)</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Actitudes:</span>
                <span className="font-bold">{evaluation.attitudesScore} / {evaluation.attitudesTotal} ({evaluation.attitudesPercentage}%)</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <p className="text-xs text-right text-slate-400">{percentage}% Obtenido</p>
            </div>
          </div>

          <div className="space-y-3 pb-6">
            <Button onClick={handleRestart} variant="outline" className="w-full py-6 rounded-xl flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reintentar Examen
            </Button>
            <Button onClick={handleBack} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Volver al Inicio
            </Button>
          </div>
        </div>
      ) : (
        /* Vista de Preguntas */
        <div className="flex-1 p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="space-y-6">
            {/* Barra de progreso de preguntas */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Pregunta {currentQuestionIndex + 1} de {exam.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / exam.length) * 100)}%</span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / exam.length) * 100} className="h-1.5" />
            </div>

            {/* Texto de la pregunta */}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.text}
            </h3>

            {/* Opciones de respuesta */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start space-x-3 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                      isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-slate-400"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón Siguiente / Finalizar */}
          <div className="pt-6 pb-4">
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold shadow-md"
            >
              {currentQuestionIndex === exam.length - 1 ? "Finalizar Examen" : "Siguiente Pregunta"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
