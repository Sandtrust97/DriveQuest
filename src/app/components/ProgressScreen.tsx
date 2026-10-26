import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Car, 
  FileCheck 
} from "lucide-react";

export function ProgressScreen() {
  const navigate = useNavigate();

  const getOverallProgress = useAppStore((state) => state.getOverallProgress);
  const getTheoryProgress = useAppStore((state) => state.getTheoryProgress);
  const getPracticeProgress = useAppStore((state) => state.getPracticeProgress);
  const getExamProgress = useAppStore((state) => state.getExamProgress);
  const getFormattedStudyTime = useAppStore((state) => state.getFormattedStudyTime);
  const questionsAnsweredCount = useAppStore((state) => state.questionsAnsweredCount);

  const overallProgress = getOverallProgress();
  const theoryProgress = getTheoryProgress();
  const practiceProgress = getPracticeProgress();
  const examProgress = getExamProgress();
  const studyTimeFormatted = getFormattedStudyTime();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Encabezado */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-bold text-slate-900">Estadísticas de Progreso</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Nivel de Preparación General */}
        <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-500/20 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-100 font-medium">Nivel de Preparación General</p>
              <h1 className="text-4xl font-extrabold mt-1">{overallProgress}%</h1>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
              <TrendingUp className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          <Progress value={overallProgress} className="h-2.5 bg-blue-950/40" />
          <p className="text-xs text-blue-100 leading-relaxed">
            {overallProgress === 0
              ? "Empieza a completar módulos teóricos y simulacros para registrar tu progreso."
              : "Continúa respondiendo módulos para estar listo para tu examen real."}
          </p>
        </div>

        {/* Tarjetas Metrícas Rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-600">Tiempo de Estudio</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{studyTimeFormatted}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-600">Preguntas Vistas</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{questionsAnsweredCount} / 120</p>
          </div>
        </div>

        {/* Desglose de Conocimientos */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Desglose de Conocimientos</h3>

          {/* Lecciones Teóricas */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" /> Lecciones Teóricas
              </span>
              <span className="font-bold text-slate-900">{theoryProgress}%</span>
            </div>
            <Progress value={theoryProgress} className="h-2 bg-slate-100" />
          </div>

          {/* Casos Prácticos */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600" /> Casos Prácticos
              </span>
              <span className="font-bold text-slate-900">{practiceProgress}%</span>
            </div>
            <Progress value={practiceProgress} className="h-2 bg-slate-100" />
          </div>

          {/* Simulacros de Examen */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" /> Simulacros de Examen
              </span>
              <span className="font-bold text-slate-900">{examProgress}%</span>
            </div>
            <Progress value={examProgress} className="h-2 bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}