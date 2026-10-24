import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { HelpCircle, Lightbulb, BookOpen, MessageCircle, TrendingUp, PlayCircle } from "lucide-react";
import conitoImage from "figma:asset/26a55d3adb4ef52b95fb8c98121d46513cfe2c10.png";

interface ConitoAvatarProps {
  message?: string;
  size?: "small" | "medium" | "large";
  showMessage?: boolean;
}

export function ConitoAvatar({ 
  message = "¡Hola! Soy Conito, tu asistente vial 🚗",
  size = "medium",
  showMessage = true 
}: ConitoAvatarProps) {
  const [showHelp, setShowHelp] = useState(false);
  
  const sizeClasses = {
    small: {
      container: "w-16 h-16",
    },
    medium: {
      container: "w-24 h-24",
    },
    large: {
      container: "w-32 h-32",
    }
  };

  const classes = sizeClasses[size];

  const helpOptions = [
    {
      icon: PlayCircle,
      title: "Ver Tutorial",
      description: "Aprende cómo usar DriveQuest",
      color: "bg-blue-500"
    },
    {
      icon: Lightbulb,
      title: "Consejo del Día",
      description: "Tip de conducción segura",
      color: "bg-yellow-500"
    },
    {
      icon: BookOpen,
      title: "Guía de Estudio",
      description: "Recursos y materiales",
      color: "bg-green-500"
    },
    {
      icon: HelpCircle,
      title: "Preguntas Frecuentes",
      description: "Resuelve tus dudas",
      color: "bg-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Consejos de Progreso",
      description: "Mejora tu aprendizaje",
      color: "bg-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Contactar Soporte",
      description: "Estamos aquí para ayudarte",
      color: "bg-blue-600"
    }
  ];

  return (
    <>
      <div className="flex flex-col items-center">
        <div 
          className={`relative ${showMessage ? 'mb-4' : ''} cursor-pointer hover:scale-105 transition-transform`} 
          onClick={() => setShowHelp(true)}
        >
          {/* Conito Image */}
          <img 
            src={conitoImage} 
            alt="Conito - Tu Asistente Vial" 
            className={`${classes.container} object-contain drop-shadow-lg rounded-full`}
          />
        </div>
        
        {/* Companion Message */}
        {showMessage && (
          <div className="bg-blue-50 rounded-2xl px-4 py-3 relative max-w-xs">
            {/* Speech bubble arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-50 rotate-45"></div>
            <p className="text-primary text-center relative z-10 text-sm">
              {message}
            </p>
          </div>
        )}
      </div>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <img 
                src={conitoImage} 
                alt="Conito" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <div>¡Hola! Soy Conito</div>
                <DialogDescription className="mt-1">
                  ¿En qué puedo ayudarte hoy?
                </DialogDescription>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {helpOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-blue-50 transition-all"
                onClick={() => {
                  // Aquí se puede implementar la lógica específica para cada opción
                  setShowHelp(false);
                }}
              >
                <div className={`${option.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm mb-1">{option.title}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-primary text-center">
              💡 <strong>Tip:</strong> Haz clic en mí en cualquier momento para obtener ayuda rápida
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}