// ============================================================================
// Banco de Preguntas del Módulo de Exámenes de DriveQuest
// Fuente única y exclusiva: Manual oficial de la ANSV
// (src/app/components/reference/manual_ansv.txt).
//
// Estructura según la norma oficial (Resolución No. 20253040037125 del 10 de
// septiembre de 2025, Ministerio de Transporte — sección 4 del manual):
//   - 40 preguntas de selección múltiple en total.
//   - 12 preguntas de actitudes (escala de acuerdo tipo Likert).
//   - 28 preguntas de conocimientos distribuidas así:
//       · Movilidad segura y sostenible ........ 10 preguntas.
//       · Normas de tránsito ...................  6 preguntas.
//       · Señalización vial e infraestructura ..  6 preguntas.
//       · El vehículo ..........................  6 preguntas.
//   - Tiempo límite: 50 minutos con envío automático al finalizar.
//   - Aprobación: puntaje ≥ 80% en conocimientos Y ≥ 80% en actitudes.
// ============================================================================

export type KnowledgeCore = "movilidad" | "normas" | "senalizacion" | "vehiculo";
export type QuestionType = "actitudes" | "conocimientos";

/** Etiquetas oficiales de los núcleos temáticos (manual ANSV, sección 4). */
export const KNOWLEDGE_CORE_LABELS: Record<KnowledgeCore, string> = {
  movilidad: "Movilidad segura y sostenible",
  normas: "Normas de tránsito",
  senalizacion: "Señalización vial e infraestructura vial",
  vehiculo: "El vehículo",
};

/** Configuración oficial del examen teórico ANSV. */
export const EXAM_CONFIG = {
  totalQuestions: 40,
  /** 50 minutos (3.000 segundos) con envío automático al finalizar. */
  timeLimitSeconds: 50 * 60,
  attitudesQuestions: 12,
  knowledgeQuestions: 28,
  /** Porcentaje mínimo de aprobación en cada parte (conocimientos Y actitudes). */
  passPercentage: 80,
  /** Distribución estricta de las 28 preguntas de conocimientos por núcleo. */
  distribution: {
    movilidad: 10,
    normas: 6,
    senalizacion: 6,
    vehiculo: 6,
  },
} as const;

const KNOWLEDGE_CORES: KnowledgeCore[] = ["movilidad", "normas", "senalizacion", "vehiculo"];

// ----------------------------------------------------------------------------
// Tipos del banco y del examen generado
// ----------------------------------------------------------------------------

export interface AttitudeBankItem {
  id: string;
  text: string;
  /**
   * "positive": la conducta segura se enuncia de forma afirmativa
   *   (respuesta acertada = "De acuerdo" o "Muy de acuerdo").
   * "negative": se enuncia una conducta de riesgo
   *   (respuesta acertada = "En desacuerdo" o "Muy en desacuerdo").
   */
  polarity: "positive" | "negative";
  explanation: string;
}

export interface KnowledgeBankItem {
  id: string;
  core: KnowledgeCore;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  core: KnowledgeCore | null;
  text: string;
  options: string[];
  /** Índices de opciones consideradas acertadas. En actitudes se aceptan las dos opciones del polo seguro (ejemplo del manual ANSV). */
  correctAnswers: number[];
  explanation: string;
}

/** Resultado del cálculo de un examen (regla oficial de aprobación ANSV). */
export interface ExamEvaluation {
  knowledgeScore: number;
  knowledgeTotal: number;
  knowledgePercentage: number;
  attitudesScore: number;
  attitudesTotal: number;
  attitudesPercentage: number;
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  /** Se aprueba únicamente con ≥80% en conocimientos Y ≥80% en actitudes. */
  passed: boolean;
  unansweredCount: number;
}

/** Opciones oficiales de las preguntas de actitudes (orden fijo tipo Likert). */
export const ATTITUDE_OPTIONS = [
  "Muy de acuerdo",
  "De acuerdo",
  "En desacuerdo",
  "Muy en desacuerdo",
];

// ----------------------------------------------------------------------------
// BANCO DE PREGUNTAS DE ACTITUDES (disposición mental e intenciones de
// comportamiento seguro). Cada ítem se deriva del manual de la ANSV.
// ----------------------------------------------------------------------------

export const ATTITUDE_BANK: AttitudeBankItem[] = [
  {
    id: "act-1",
    text: "Conduzco por el andén cuando no hay peatones.",
    polarity: "negative",
    explanation:
      "En Colombia no está permitido que los vehículos motorizados circulen por espacios de tránsito exclusivo para peatones (ejemplo de pregunta de actitudes del manual de la ANSV).",
  },
  {
    id: "act-2",
    text: "Me pongo el cinturón de seguridad y respeto los límites de velocidad solo cuando hay autoridades de tránsito cerca.",
    polarity: "negative",
    explanation:
      "La autorregulación consiste en asumir las normas de tránsito de manera autónoma, incluso sin presencia de la autoridad (manual ANSV, 2.1.2.1).",
  },
  {
    id: "act-3",
    text: "Respondo mensajes de texto en el celular mientras conduzco si el tránsito va lento.",
    polarity: "negative",
    explanation:
      "Revisar dispositivos móviles mientras se conduce limita la atención en tiempo real de la vía y puede desembocar en accidentes (manual ANSV, 2.1.2.3 y 2.1.2.4).",
  },
  {
    id: "act-4",
    text: "Cuando un peatón está cruzando por una esquina, me detengo hasta que termine de cruzar.",
    polarity: "positive",
    explanation:
      "Se debe parar siempre cuando haya peatones atravesando una esquina o cruces, hasta que ellos crucen (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-5",
    text: "Después de una sola cerveza puedo conducir porque apenas afecta mi capacidad.",
    polarity: "negative",
    explanation:
      "En Colombia hay cero tolerancia: la sanción se aplica a partir de 20 miligramos de etanol por cada 100 ml de sangre (manual ANSV, 2.1.2.5, Ley 1696 de 2013).",
  },
  {
    id: "act-6",
    text: "Cuando asisto a una celebración donde habrá licor, planifico de antemano quién conducirá de regreso.",
    polarity: "positive",
    explanation:
      "Ante eventos con bebidas alcohólicas se recomienda planificar el regreso, delegando un conductor elegido o no usando el vehículo (manual ANSV, 2.1.2.5).",
  },
  {
    id: "act-7",
    text: "Realizo la revisión preoperacional de mi vehículo antes de cada recorrido que voy a hacer.",
    polarity: "positive",
    explanation:
      "La revisión preoperacional se debe hacer antes de cualquier recorrido para verificar el correcto estado de los sistemas fundamentales del vehículo (manual ANSV, 2.1.4.2).",
  },
  {
    id: "act-8",
    text: "Si un niño sufre un siniestro vial jugando en la vía, la responsabilidad del siniestro es del niño.",
    polarity: "negative",
    explanation:
      "Un niño nunca es la causa de un siniestro: el conductor debe poseer los conocimientos y anticiparse al comportamiento espontáneo de los menores (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-9",
    text: "Está bien estacionarse en un puesto exclusivo para personas con discapacidad si es solo por un momento.",
    polarity: "negative",
    explanation:
      "Está prohibido estacionar en zonas expresamente destinadas al estacionamiento de cierto tipo de vehículos, como los de personas con discapacidad (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-10",
    text: "Ante un peatón con discapacidad visual que cruza con bastón, detengo completamente mi vehículo.",
    polarity: "positive",
    explanation:
      "Cuando un peatón esté cruzando una calle o carretera con un bastón, los vehículos deben parar completamente (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-11",
    text: "Es válido invadir un carril exclusivo para ciclistas cuando no hay ciclistas circulando.",
    polarity: "negative",
    explanation:
      "Nunca se deben invadir las vías exclusivas para ciclistas: hacerlo pone en riesgo su integridad y puede ser objeto de sanciones (manual ANSV, 2.1.3.2).",
  },
  {
    id: "act-12",
    text: "Al pasar con mi vehículo cerca de un ciclista, dejo un espacio lateral de al menos 1,5 metros.",
    polarity: "positive",
    explanation:
      "Se debe dejar un espacio lateral suficiente, al menos 1,5 metros, porque el ciclista podría desviarse o tambalear (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-13",
    text: "Mantengo las luces encendidas de mi motocicleta siempre que circulo por vías públicas, sin importar la hora.",
    polarity: "positive",
    explanation:
      "Las motocicletas deben transitar por las vías de uso público con las luces delanteras y traseras encendidas todo el tiempo (manual ANSV, artículo 96 del CNTT).",
  },
  {
    id: "act-14",
    text: "Si tengo prisa, está bien circular rápido frente a un colegio a la hora de salida de los estudiantes.",
    polarity: "negative",
    explanation:
      "En las proximidades de establecimientos educacionales no se debe superar los 30 km/h y se requiere cuidado en horarios de inicio y término de actividades (manual ANSV, 2.1.2.7).",
  },
  {
    id: "act-15",
    text: "Conducir varias horas seguidas sin descansar no me afecta porque estoy acostumbrado.",
    polarity: "negative",
    explanation:
      "En trayectos de más de dos horas o 200 kilómetros se deben hacer pausas activas de por lo menos 15 minutos para prevenir la fatiga (manual ANSV, 2.1.2.4).",
  },
  {
    id: "act-16",
    text: "Cuando debo estacionar en carretera, lo hago sobre el lado derecho de la vía o en la berma usando las luces intermitentes.",
    polarity: "positive",
    explanation:
      "En carretera se estaciona sobre el lado derecho de la vía o en la berma, usando las luces intermitentes y las señales reflectivas de peligro (manual ANSV, 2.1.2.7).",
  },
];

// ----------------------------------------------------------------------------
// BANCO DE PREGUNTAS DE CONOCIMIENTOS POR NÚCLEO TEMÁTICO
// (todas las preguntas, casos y distractores provienen del manual de la ANSV)
// ----------------------------------------------------------------------------

export const KNOWLEDGE_BANK: KnowledgeBankItem[] = [
  // ---------------- Núcleo: Movilidad segura y sostenible ----------------
  {
    id: "mov-1",
    core: "movilidad",
    text: "¿Qué plantea la Visión Cero en materia de seguridad vial?",
    options: [
      "Que todas las muertes y lesiones graves en el tránsito son evitables.",
      "Que los siniestros viales son inevitables y solo se puede reducir su número.",
      "Que la seguridad vial depende únicamente del diseño de los vehículos.",
      "Que las muertes en el tránsito solo pueden evitarse en países de ingresos altos.",
    ],
    correctAnswer: 0,
    explanation:
      "Visión Cero es un proyecto de seguridad vial que implementa el Enfoque Sistema Seguro (ESS) con una orientación ética en la que se reconoce que todas las muertes y lesiones graves en el tránsito son evitables (manual ANSV, 2.1.1.1).",
  },
  {
    id: "mov-2",
    core: "movilidad",
    text: "Según la Visión Cero, lograr una movilidad segura de todos los actores viales requiere:",
    options: [
      "Una gestión integral de la infraestructura vial, los vehículos, las velocidades y los usuarios seguros.",
      "Únicamente endurecer las sanciones para los conductores.",
      "Que cada actor vial se ocupe solo de su propia seguridad.",
      "Construir únicamente más vías de alta velocidad.",
    ],
    correctAnswer: 0,
    explanation:
      "Para lograr una movilidad segura de todos los actores viales se requiere una gestión integral de la infraestructura vial, vehículos, velocidades y usuarios seguros (manual ANSV, 2.1.1.1).",
  },
  {
    id: "mov-3",
    core: "movilidad",
    text: "En caso de un accidente de tránsito con heridos, ¿qué significan las siglas del protocolo PAS?",
    options: [
      "Proteger, Avisar y Socorrer.",
      "Parar, Auxiliar y Salir.",
      "Prevenir, Alertar y Sancionar.",
      "Proteger, Analizar y Señalar.",
    ],
    correctAnswer: 0,
    explanation:
      "Las siglas PAS proceden de las actuaciones que de forma ordenada deben realizar los auxiliadores: P de proteger, A de avisar y S de socorrer (manual ANSV, 2.1.1.3).",
  },
  {
    id: "mov-4",
    core: "movilidad",
    text: "Según el protocolo PAS, la primera actuación, \"Proteger\", consiste en:",
    options: [
      "Ubicarse en un lugar seguro, evaluar los riesgos de la escena y señalizar el área para reducir la probabilidad de un accidente adicional.",
      "Trasladar de inmediato a las víctimas al hospital más cercano.",
      "Mover los vehículos de la vía lo más rápido posible.",
      "Buscar a los responsables del accidente para pedirles ayuda.",
    ],
    correctAnswer: 0,
    explanation:
      "Proteger significa ubicarse en un lugar seguro, evaluar los riesgos de la escena y señalizar el área para reducir la probabilidad de un accidente adicional (manual ANSV, 2.1.1.3).",
  },
  {
    id: "mov-5",
    core: "movilidad",
    text: "Según el protocolo PAS, ¿a qué números de emergencia se debe llamar en ciudades y en carretera?",
    options: [
      "En ciudades al NUSE 123 y en carretera al #767.",
      "En ambos casos únicamente al 911.",
      "En ciudades al #767 y en carretera al NUSE 123.",
      "En carretera no existe número de emergencia asignado.",
    ],
    correctAnswer: 0,
    explanation:
      "Al avisar se debe pedir ayuda: en ciudades puede hacerse al NUSE 123 y en carretera al #767 (manual ANSV, 2.1.1.3).",
  },
  {
    id: "mov-6",
    core: "movilidad",
    text: "Según el protocolo PAS, el traslado de las víctimas a la institución prestadora de salud debe realizarse de manera preferente:",
    options: [
      "En una ambulancia direccionada por el Centro Regulador de Urgencias, Emergencias y Desastres, y su costo tiene cobertura por el SOAT.",
      "En cualquier vehículo particular que llegue primero al lugar.",
      "En un vehículo de la policía de tránsito.",
      "En el vehículo del auxiliador, sin excepción alguna.",
    ],
    correctAnswer: 0,
    explanation:
      "De manera preferente el traslado debe ser realizado por una ambulancia direccionada por el Centro Regulador de Urgencias, Emergencias y Desastres, y dicho costo tendrá cobertura por el SOAT (manual ANSV, 2.1.1.3).",
  },
  {
    id: "mov-7",
    core: "movilidad",
    text: "¿Qué es la conducción preventiva, también conocida como conducción defensiva?",
    options: [
      "Conducir de manera atenta anticipándose a los posibles errores de otros actores viales.",
      "Conducir al máximo de la velocidad permitida para reducir el tiempo de exposición al riesgo.",
      "Confiar en que los demás conductores siempre cederán el paso.",
      "Conducir únicamente cuando la autoridad de tránsito lo indique.",
    ],
    correctAnswer: 0,
    explanation:
      "La conducción preventiva o defensiva consiste en conducir de manera atenta y anticiparse a los posibles errores de otros actores viales (manual ANSV, 2.1.1.4).",
  },
  {
    id: "mov-8",
    core: "movilidad",
    text: "Según el artículo 108 del Código Nacional de Tránsito, ¿qué distancia de seguridad debe haber entre dos vehículos que circulan uno tras otro a velocidades de hasta 30 km/h?",
    options: [
      "Diez (10) metros.",
      "Veinte (20) metros.",
      "Cinco (5) metros.",
      "Treinta (30) metros.",
    ],
    correctAnswer: 0,
    explanation:
      "Para velocidades de hasta 30 km/h la separación entre dos vehículos en el mismo carril será de diez (10) metros (manual ANSV, 2.1.1.4, artículo 108 del CNTT).",
  },
  {
    id: "mov-9",
    core: "movilidad",
    text: "De acuerdo con el artículo 108 del Código Nacional de Tránsito, para velocidades de 80 km/h en adelante la separación entre vehículos en el mismo carril debe ser de:",
    options: [
      "Treinta (30) metros o la que la autoridad competente indique.",
      "Veinticinco (25) metros exactos.",
      "Diez (10) metros.",
      "Cien (100) metros fijos.",
    ],
    correctAnswer: 0,
    explanation:
      "Para velocidades de 80 km/h en adelante, la separación será de treinta (30) metros o la que la autoridad competente indique (manual ANSV, 2.1.1.4).",
  },
  {
    id: "mov-10",
    core: "movilidad",
    text: "¿Entre qué horas deben usarse los faros (luces medias o de cruce) al conducir durante la noche?",
    options: [
      "Entre las 18 horas y las 6 horas del día siguiente, y cuando las condiciones de visibilidad sean adversas.",
      "Solo entre las 20 horas y las 22 horas.",
      "Únicamente cuando la vía no tenga iluminación pública.",
      "Entre las 19 horas y las 5 horas, y solo en carreteras.",
    ],
    correctAnswer: 0,
    explanation:
      "Use los faros (luces medias o de cruce) entre la puesta y la salida del sol, específicamente entre las 18 horas y las 6 horas del día siguiente, y cuando las condiciones de visibilidad sean adversas (manual ANSV, 2.1.1.4).",
  },
  {
    id: "mov-11",
    core: "movilidad",
    text: "Al conducir con niebla, ¿qué luces se deben mantener encendidas y cuáles no conviene usar?",
    options: [
      "Las luces medias o de cruce; no conviene usar las luces altas porque las gotas de agua reflejan la luz como un espejo.",
      "Las luces altas, porque permiten ver más lejos en la niebla.",
      "Únicamente las luces de posición, para no deslumbrar.",
      "Ninguna luz, porque la niebla dispersa los haces de luz.",
    ],
    correctAnswer: 0,
    explanation:
      "Con niebla deben mantenerse encendidas las luces medias o de cruce y no conviene usar las luces altas, porque las diminutas gotas de agua en suspensión reflejan la luz como un espejo (manual ANSV, 2.1.1.4).",
  },
  {
    id: "mov-12",
    core: "movilidad",
    text: "Aplicar técnicas de conducción eficiente permite reducir el consumo de combustible en aproximadamente:",
    options: [
      "Entre un 10% y un 15%.",
      "Entre un 40% y un 50%.",
      "Un 5% como máximo.",
      "No reduce el consumo, solo el desgaste del motor.",
    ],
    correctAnswer: 0,
    explanation:
      "Aplicar técnicas de conducción eficiente permite reducir entre un 10% y un 15% el consumo de combustible (manual ANSV, 2.1.1.4).",
  },
  {
    id: "mov-13",
    core: "movilidad",
    text: "¿Cuál de las siguientes es una estrategia de la movilidad ambientalmente sostenible según el manual de la ANSV?",
    options: [
      "El carro compartido (carpooling).",
      "Aumentar el uso del vehículo particular en las horas pico.",
      "Circular a mayor velocidad para acortar la duración de los viajes.",
      "Usar las luces altas dentro del perímetro urbano.",
    ],
    correctAnswer: 0,
    explanation:
      "Acciones como la promoción de energías renovables, el carro compartido (carpooling), el mejoramiento del transporte público y la promoción del uso de la bicicleta son estrategias de mitigación (manual ANSV, 2.1.1.2).",
  },
  {
    id: "mov-14",
    core: "movilidad",
    text: "Para una conducción eficiente, ¿qué se recomienda antes de iniciar el trayecto?",
    options: [
      "Planificar la ruta y salir con tiempo, buscando rutas menos congestionadas.",
      "Pisar el acelerador varias veces antes de encender el motor.",
      "Llevar objetos de excesivo peso, como cajas de herramientas, en el vehículo.",
      "Circular con los neumáticos por debajo de la presión recomendada.",
    ],
    correctAnswer: 0,
    explanation:
      "Lo primero que se debe considerar para una conducción eficiente es planificar la ruta y salir con tiempo, buscando rutas menos congestionadas; mientras mayor peso tenga el vehículo, mayor será el consumo de combustible (manual ANSV, 2.1.1.4).",
  },

  // ---------------------- Núcleo: Normas de tránsito ----------------------
  {
    id: "nor-1",
    core: "normas",
    text: "Según el estudio \"Hipótesis de causas probables en los Siniestros Viales de Colombia\" de la ANSV (2022), ¿qué porcentaje de los siniestros viales se asocia al factor \"Comportamiento Humano\"?",
    options: [
      "Más del 90%.",
      "Aproximadamente la mitad.",
      "Menos del 10%.",
      "Un tercio.",
    ],
    correctAnswer: 0,
    explanation:
      "Según el estudio de la ANSV (2022), más del 90% de los siniestros viales analizados se asocian al factor de \"Comportamiento Humano\" (manual ANSV, 2.1.2.2).",
  },
  {
    id: "nor-2",
    core: "normas",
    text: "En Colombia, ¿a partir de qué concentración de etanol en sangre se sanciona a un conductor según la Ley 1696 de 2013?",
    options: [
      "A partir de veinte (20) miligramos de etanol por cada 100 ml de sangre.",
      "A partir de ochenta (80) miligramos por cada 100 ml de sangre.",
      "A partir de cincuenta (50) miligramos por cada 100 ml de sangre.",
      "No hay límite mínimo: solo se sanciona con signos evidentes de embriaguez.",
    ],
    correctAnswer: 0,
    explanation:
      "Si se comprueba que el conductor tiene mínimo 20 miligramos de etanol en sangre (aproximadamente una cerveza) será sancionado según la Ley 1696 de 2013 (manual ANSV, 2.1.2.5).",
  },
  {
    id: "nor-3",
    core: "normas",
    text: "¿Cuál es la política de Colombia frente a la conducción después de consumir alcohol u otras sustancias psicoactivas?",
    options: [
      "Cero tolerancia.",
      "Se permite una bebida si el conductor se siente bien.",
      "Se permite conducir por debajo de 0,5 g/l de alcohol en sangre.",
      "Se permite solo si el recorrido es corto.",
    ],
    correctAnswer: 0,
    explanation:
      "En Colombia hay cero tolerancia con respecto a la conducción bajo el influjo del alcohol u otras sustancias psicoactivas (manual ANSV, 2.1.2.5).",
  },
  {
    id: "nor-4",
    core: "normas",
    text: "Según la Agencia Nacional de Seguridad Vial, ¿qué es una \"velocidad adecuada\"?",
    options: [
      "La velocidad a la cual se conduce un vehículo dentro de los límites definidos, de acuerdo con las condiciones de la vía, el entorno y la interacción con los otros actores viales.",
      "La velocidad máxima señalizada para cada tipo de vía.",
      "La velocidad que permite mantenerse lo más cerca posible del vehículo que va adelante.",
      "La velocidad que depende únicamente de la habilidad y experiencia del conductor.",
    ],
    correctAnswer: 0,
    explanation:
      "Una velocidad adecuada es la que se conduce dentro de los límites definidos, de acuerdo con las condiciones de la vía (climáticas, de infraestructura), el entorno y la interacción con los otros actores viales (manual ANSV, 2.1.2.6).",
  },
  {
    id: "nor-5",
    core: "normas",
    text: "Al conducir por calles comerciales muy concurridas, áreas residenciales, proximidades de paradas de buses y establecimientos educacionales, la velocidad no debe superar:",
    options: [
      "30 km/h.",
      "60 km/h.",
      "50 km/h.",
      "80 km/h.",
    ],
    correctAnswer: 0,
    explanation:
      "Conduzca con cuidado y a baja velocidad en calles comerciales muy concurridas, áreas residenciales, proximidades de paradas de buses y establecimientos educacionales: allí no debe superar los 30 km/h (manual ANSV, 2.1.2.7).",
  },
  {
    id: "nor-6",
    core: "normas",
    text: "En trayectos largos que duren más de dos horas o 200 kilómetros, ¿qué se recomienda hacer para prevenir la fatiga?",
    options: [
      "Hacer pausas activas de por lo menos 15 minutos.",
      "Consumir bebidas energizantes o café para mantenerse alerta.",
      "Bajar la temperatura del aire acondicionado del vehículo.",
      "Conducir más rápido para acortar el trayecto.",
    ],
    correctAnswer: 0,
    explanation:
      "En trayectos largos que duren más de dos horas o 200 kilómetros, el conductor debería hacer pausas activas de por lo menos 15 minutos (manual ANSV, 2.1.2.4).",
  },
  {
    id: "nor-7",
    core: "normas",
    text: "¿En cuál de las siguientes situaciones está prohibido estacionar?",
    options: [
      "Sobre andenes, puentes, túneles y a menos de cinco (5) metros de la intersección correspondiente en vías urbanas.",
      "En carretera, sobre el lado derecho de la vía o en la berma, usando las luces intermitentes.",
      "En el centro del espacio demarcado para estacionar, sin obstruir los espacios vecinos.",
      "A menos de 0,30 metros del sardinel en una vía pública permitida.",
    ],
    correctAnswer: 0,
    explanation:
      "Está prohibido estacionar en los andenes, las zonas verdes, los puentes, viaductos, túneles y a menos de cinco (5) metros de la intersección correspondiente, entre otros lugares (manual ANSV, 2.1.2.7).",
  },
  {
    id: "nor-8",
    core: "normas",
    text: "¿En qué lugares tienen los peatones prelación (prioridad) sobre los vehículos?",
    options: [
      "En las cebras, en los lugares demarcados o construidos para su paso, y en las esquinas cuando un vehículo va a girar y el peatón está cruzando.",
      "Únicamente cuando la vía carece de semáforos.",
      "En ningún caso: siempre tienen prelación los vehículos.",
      "Solo en las vías rurales.",
    ],
    correctAnswer: 0,
    explanation:
      "Los peatones tienen siempre la prelación sobre los vehículos en las cebras, en los lugares demarcados o construidos para su paso, y en las esquinas cuando un vehículo va a girar y el peatón está cruzando (manual ANSV, 2.1.2.7).",
  },
  {
    id: "nor-9",
    core: "normas",
    text: "Ante un peatón con discapacidad visual que cruza una calle con su bastón, el conductor debe:",
    options: [
      "Parar completamente el vehículo y cederle el paso.",
      "Advertirle con el pito para que se apure.",
      "Pasarlo lentamente por su lado.",
      "Continuar la marcha, porque el peatón debe esperar.",
    ],
    correctAnswer: 0,
    explanation:
      "Cuando un peatón esté cruzando una calle o carretera con un bastón, los vehículos deben parar completamente (manual ANSV, 2.1.2.7).",
  },
  {
    id: "nor-10",
    core: "normas",
    text: "¿Qué significa autorregularse en el tránsito?",
    options: [
      "Cumplir las normas de tránsito de manera autónoma, promoviendo el autocuidado y la corresponsabilidad, incluso sin presencia de la autoridad.",
      "Que cada conductor define sus propias normas de tránsito.",
      "Acatar las normas solo cuando hay agentes de tránsito cerca.",
      "Sancionar personalmente a los demás conductores que infringen las normas.",
    ],
    correctAnswer: 0,
    explanation:
      "Las normas de tránsito están diseñadas para promover una movilidad segura, procurando el autocuidado y la corresponsabilidad; autorregularse es asumirlas de manera autónoma en cualquier situación (manual ANSV, 2.1.2.1).",
  },

  // ------- Núcleo: Señalización vial e infraestructura vial -------
  {
    id: "sen-1",
    core: "senalizacion",
    text: "¿Cuál es la finalidad de las señales reglamentarias?",
    options: [
      "Notificar a los usuarios de las vías las prioridades en el uso de estas, así como las limitaciones, prohibiciones, restricciones, obligaciones y autorizaciones existentes.",
      "Advertir la existencia y naturaleza de riesgos presentes en la vía.",
      "Orientar y guiar a los usuarios hacia sus destinos.",
      "Informar sobre servicios generales y atractivos turísticos de la vía.",
    ],
    correctAnswer: 0,
    explanation:
      "Las señales reglamentarias tienen por finalidad notificar a los usuarios de las vías las prioridades en el uso de estas, así como las limitaciones, prohibiciones, restricciones, obligaciones y autorizaciones existentes (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-2",
    core: "senalizacion",
    text: "¿Qué propósito tienen las señales preventivas?",
    options: [
      "Advertir a los usuarios de la vía la existencia y naturaleza de riesgos o situaciones imprevistas presentes en la vía o en sus zonas adyacentes.",
      "Indicar direcciones hacia destinos, calles o rutas.",
      "Establecer las sanciones del Código Nacional de Tránsito.",
      "Regular el estacionamiento de vehículos.",
    ],
    correctAnswer: 0,
    explanation:
      "Las señales preventivas tienen como propósito advertir a los usuarios de la vía la existencia y naturaleza de riesgos o situaciones imprevistas presentes en la vía o en sus zonas adyacentes (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-3",
    core: "senalizacion",
    text: "Las señales informativas tienen como propósito:",
    options: [
      "Orientar y guiar a los usuarios del sistema vial para que lleguen a sus destinos de la forma más segura, simple y directa posible.",
      "Notificar prohibiciones y obligaciones a los conductores.",
      "Advertir la existencia de curvas peligrosas y cruces.",
      "Señalizar exclusivamente las obras en la vía.",
    ],
    correctAnswer: 0,
    explanation:
      "Las señales informativas tienen como propósito orientar y guiar a los usuarios del sistema vial, entregándoles la información necesaria para llegar a sus destinos de la forma más segura, simple y directa posible (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-4",
    core: "senalizacion",
    text: "Una señal de mensaje variable (SMV) es un dispositivo de control de tránsito que:",
    options: [
      "Puede cambiar su mensaje manual, eléctrica, mecánica o electrónicamente para proporcionar información en tiempo real.",
      "Se instala de forma fija y nunca cambia su mensaje.",
      "Solo se utiliza dentro de los túneles viales.",
      "Emite sonidos de alerta para los conductores.",
    ],
    correctAnswer: 0,
    explanation:
      "Una señal de mensaje variable (SMV) es un dispositivo de control de tránsito cuyo mensaje puede ser cambiado manual, eléctrica, mecánica o electrónicamente, con el fin de proporcionar información pertinente al viaje en tiempo real (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-5",
    core: "senalizacion",
    text: "¿Cuál es la principal ventaja de las demarcaciones (señalización horizontal) frente a otros tipos de señales?",
    options: [
      "Transmiten su mensaje al conductor sin que este distraiga su atención del carril en que circula.",
      "Se perciben a mayor distancia que las señales verticales.",
      "No se ven afectadas por la lluvia, la neblina ni el polvo.",
      "No requieren mantenimiento ni reposición.",
    ],
    correctAnswer: 0,
    explanation:
      "Al ubicarse en la calzada, las demarcaciones presentan la ventaja de transmitir su mensaje al conductor sin que este distraiga su atención del carril en que circula (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-6",
    core: "senalizacion",
    text: "¿Cuál es la principal desventaja de las demarcaciones (señalización horizontal)?",
    options: [
      "Se perciben a menor distancia y su visibilidad se ve afectada por la lluvia, la neblina, el polvo o por otros vehículos.",
      "No pueden regular ni canalizar el tránsito.",
      "Solo pueden utilizarse durante la noche.",
      "Están prohibidas en zonas urbanas.",
    ],
    correctAnswer: 0,
    explanation:
      "Las demarcaciones presentan como desventaja que son percibidas a menor distancia y su visibilidad se ve afectada por lluvia, neblina, polvo o por otros vehículos que circulen en la vía (manual ANSV, 2.1.3.1).",
  },
  {
    id: "sen-7",
    core: "senalizacion",
    text: "Las ciclorutas y las ciclobandas son tipos de:",
    options: [
      "Vías exclusivas para ciclistas.",
      "Vías ciclo-adaptadas.",
      "Carriles de transporte masivo.",
      "Vías de uso exclusivo peatonal.",
    ],
    correctAnswer: 0,
    explanation:
      "Las vías exclusivas para ciclistas pueden ser ciclorutas (segregadas con cambios de altura o elementos físicos permanentes) o ciclobandas (con cambio de pavimento, dispositivos de canalización y demarcación) (manual ANSV, 2.1.3.2).",
  },
  {
    id: "sen-8",
    core: "senalizacion",
    text: "¿Cuál es la diferencia entre las vías exclusivas para ciclistas y las vías ciclo-adaptadas?",
    options: [
      "Las exclusivas están segregadas del espacio de otros actores viales, mientras que las ciclo-adaptadas son espacios acondicionados para la bicicleta pero de uso no exclusivo.",
      "Las exclusivas son para ciclistas principiantes y las ciclo-adaptadas para expertos.",
      "Las ciclo-adaptadas permiten mayores velocidades que las exclusivas.",
      "No hay diferencia: son sinónimos.",
    ],
    correctAnswer: 0,
    explanation:
      "Las vías exclusivas están segregadas del espacio de otros actores viales, y las vías ciclo-adaptadas son calles o espacios públicos especialmente acondicionados para la circulación en bicicleta, pero sin uso exclusivo (manual ANSV, 2.1.3.2).",
  },
  {
    id: "sen-9",
    core: "senalizacion",
    text: "Según el manual, ¿están obligados los ciclistas a circular siempre por las vías exclusivas para ciclistas o por las vías ciclo-adaptadas?",
    options: [
      "No: el ciclista tiene derecho a utilizar la vía pública como cualquier otro actor vial, pues la red aún no es lo suficientemente amplia y conectiva.",
      "Sí, siempre; de lo contrario comete una infracción.",
      "Solo están obligados dentro de las ciudades.",
      "Solo están obligados durante la noche.",
    ],
    correctAnswer: 0,
    explanation:
      "El ciclista tiene derecho a utilizar la vía pública como cualquier otro actor vial, incluso cuando existan vías exclusivas o ciclo-adaptadas, pues la red aún no garantiza desplazamientos exclusivos por esa infraestructura (manual ANSV, 2.1.3.2).",
  },
  {
    id: "sen-10",
    core: "senalizacion",
    text: "¿Cuál de las siguientes es una función de los dispositivos para la regulación del tránsito?",
    options: [
      "Apoyar o reforzar el mensaje entregado por otra señalización, indicar la presencia de elementos físicos y la geometría de la vía.",
      "Reemplazar por completo a las señales verticales.",
      "Instalarse únicamente en el interior de los túneles.",
      "Transmitir información del estado del tráfico por radio.",
    ],
    correctAnswer: 0,
    explanation:
      "Los dispositivos para la regulación del tránsito apoyan o refuerzan el mensaje de otra señalización, indican la presencia de elementos físicos, la geometría de la vía y controlan el encauzamiento de vehículos y personas (manual ANSV, 2.1.3.2).",
  },

  // -------------------- Núcleo: El vehículo --------------------
  {
    id: "veh-1",
    core: "vehiculo",
    text: "¿Qué son los elementos o sistemas de seguridad activa de un vehículo?",
    options: [
      "Los destinados a evitar que se produzca un choque, como el sistema de frenos, la iluminación, la dirección, la suspensión y el control de estabilidad.",
      "Los destinados a minimizar los efectos de un choque que ya se produjo.",
      "Únicamente el cinturón de seguridad y los airbags.",
      "Los que se activan automáticamente después de ocurrido el accidente.",
    ],
    correctAnswer: 0,
    explanation:
      "Son elementos o sistemas de seguridad activa los destinados a evitar que se produzca un choque, entre ellos el sistema de frenos, la iluminación, la dirección, la suspensión y el control de estabilidad (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-2",
    core: "vehiculo",
    text: "¿Qué son los elementos o sistemas de seguridad pasiva de un vehículo?",
    options: [
      "Los destinados a minimizar los efectos de un choque que se produjo, como los cinturones de seguridad, los airbags y los apoyacabezas.",
      "Los destinados a evitar que se produzca un choque.",
      "Los espejos retrovisores y las luces de posición.",
      "El sistema de suspensión y la dirección asistida.",
    ],
    correctAnswer: 0,
    explanation:
      "Son elementos o sistemas de seguridad pasiva los destinados a minimizar los efectos de un choque que se produjo; entre ellos están los cinturones de seguridad, los Sistemas de Retención Infantil, los apoyacabezas y los airbags (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-3",
    core: "vehiculo",
    text: "¿Cuál es la ventaja del Sistema de Frenos Antibloqueo (ABS) al frenar muy fuerte?",
    options: [
      "Impide que las ruedas queden bloqueadas y posibilita continuar guiando el vehículo con mayor seguridad.",
      "Aumenta automáticamente la velocidad de detención del vehículo.",
      "Sustituye al freno de estacionamiento en las pendientes.",
      "Reduce el consumo de combustible del vehículo.",
    ],
    correctAnswer: 0,
    explanation:
      "Si en cierta situación usted frena muy fuerte, el Sistema de Frenos Antibloqueo (ABS) tiene la ventaja de impedir que las ruedas queden bloqueadas y le posibilitan continuar guiando el vehículo con mayor seguridad (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-4",
    core: "vehiculo",
    text: "Independientemente del tipo de vehículo motorizado, ¿qué cinco componentes se deben revisar en la revisión preoperacional?",
    options: [
      "Los líquidos, el sistema de frenos, el sistema eléctrico, las llantas y los espejos.",
      "El motor, la caja de cambios, el escape, el claxon y el tanque de combustible.",
      "Únicamente las llantas y los frenos.",
      "La carrocería, las puertas, los limpiabrisas, el vin y la radio.",
    ],
    correctAnswer: 0,
    explanation:
      "Independientemente del tipo de vehículo motorizado se deberían revisar cinco componentes: los líquidos, el sistema de frenos, el sistema eléctrico, las llantas y los espejos (manual ANSV, 2.1.4.2).",
  },
  {
    id: "veh-5",
    core: "vehiculo",
    text: "Además de los cinco componentes generales, ¿qué elemento adicional debe revisarse si el vehículo es una motocicleta?",
    options: [
      "El kit de arrastre.",
      "El perno rey (kingpin).",
      "La quinta rueda.",
      "Los limpiabrisas.",
    ],
    correctAnswer: 0,
    explanation:
      "Si su vehículo es una motocicleta, además de los cinco componentes generales debe revisar el kit de arrastre (manual ANSV, 2.1.4.2).",
  },
  {
    id: "veh-6",
    core: "vehiculo",
    text: "¿Qué profundidad se considera aconsejable en los dibujos o surcos de la banda de rodamiento de las llantas?",
    options: [
      "Superior a 3 milímetros.",
      "Inferior a 1,6 milímetros.",
      "Exactamente 1 milímetro.",
      "La profundidad de los surcos no influye en la seguridad.",
    ],
    correctAnswer: 0,
    explanation:
      "Para que las llantas cumplan bien sus funciones, los dibujos o surcos de sus bandas de rodamiento deben tener una profundidad aconsejable superior a 3 milímetros; por debajo de 1,6 mm empeora la fricción con el pavimento mojado (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-7",
    core: "vehiculo",
    text: "¿Cuándo y con qué frecuencia debe verificarse la presión de los neumáticos?",
    options: [
      "Cuando la llanta está fría, por lo menos una vez cada 7 o 10 días.",
      "Inmediatamente después de un viaje largo, con las llantas calientes.",
      "Solo cuando el vehículo presenta vibraciones al circular.",
      "Una sola vez al año, en el mantenimiento programado.",
    ],
    correctAnswer: 0,
    explanation:
      "La verificación de la presión de los neumáticos, por lo menos una vez cada 7 o 10 días, debe realizarse cuando la llanta está fría, es decir, con poco uso desde el último arranque (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-8",
    core: "vehiculo",
    text: "¿Cada cuántos kilómetros se recomienda rotar las llantas para impedir que se gasten irregularmente?",
    options: [
      "Cada 10.000 km.",
      "Cada 50.000 km.",
      "Cada 500 km.",
      "No es necesario rotar las llantas.",
    ],
    correctAnswer: 0,
    explanation:
      "La rotación de las llantas es fundamental para una mayor durabilidad; se recomienda hacerla cada 10.000 km para impedir que se gasten irregularmente (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-9",
    core: "vehiculo",
    text: "Según el artículo 30 del Código Nacional de Tránsito, ¿qué elementos hacen parte del equipo de carretera mínimo que debe portar todo vehículo?",
    options: [
      "Un gato, una cruceta, dos señales de carretera en forma de triángulo reflectivo, un botiquín de primeros auxilios, un extintor, dos tacos, una caja de herramienta básica, una llanta de repuesto y una linterna.",
      "Únicamente la llanta de repuesto y el gato.",
      "Una cadena de remolque y un bidón de gasolina.",
      "Un compresor, un GPS y dos extintores.",
    ],
    correctAnswer: 0,
    explanation:
      "El artículo 30 del CNTT define el equipo de prevención y seguridad mínimo: gato, cruceta, dos señales de carretera en forma de triángulo reflectivo, botiquín, extintor, dos tacos, caja de herramienta básica, llanta de repuesto y linterna (manual ANSV, 2.1.4.4).",
  },
  {
    id: "veh-10",
    core: "vehiculo",
    text: "Según la Organización Mundial de la Salud, ¿en qué porcentaje disminuye el uso del cinturón de seguridad el riesgo de pérdida de vidas humanas en un accidente de tránsito?",
    options: [
      "Hasta en un 50%.",
      "Hasta en un 10%.",
      "No disminuye el riesgo de muerte.",
      "En un 100% en todos los casos.",
    ],
    correctAnswer: 0,
    explanation:
      "De acuerdo con la OMS, el uso del cinturón de seguridad disminuye hasta en un 50% el riesgo de pérdida de vidas humanas en un accidente de tránsito (manual ANSV, 2.1.4.5).",
  },
  {
    id: "veh-11",
    core: "vehiculo",
    text: "Cuando un vehículo se detiene por una avería, ¿cómo deben colocarse las señales de carretera (triángulos reflectivos)?",
    options: [
      "En el mismo carril en que está el vehículo detenido, con la parte reflectiva hacia los vehículos que se aproximan y a la distancia suficiente según la velocidad de la vía.",
      "Sobre el andén más cercano, orientadas en cualquier dirección.",
      "Dentro del vehículo, visibles por el espejo retrovisor.",
      "A un metro del vehículo, sin importar la velocidad de la vía.",
    ],
    correctAnswer: 0,
    explanation:
      "El triángulo se instala con la parte reflectiva hacia los vehículos que se aproximan, deben situarse en el mismo carril en que está el vehículo detenido y a la distancia suficiente según la velocidad de aproximación de la vía (manual ANSV, 2.1.4.4).",
  },
  {
    id: "veh-12",
    core: "vehiculo",
    text: "¿Cuál es la función de los apoyacabezas?",
    options: [
      "Prevenir lesiones cervicales cuando el vehículo es impactado por atrás, evitando el efecto latigazo.",
      "Mejorar la visibilidad del conductor hacia atrás.",
      "Aumentar la seguridad únicamente en impactos frontales.",
      "Servir de soporte para descansar la cabeza durante los viajes.",
    ],
    correctAnswer: 0,
    explanation:
      "Los apoyacabezas sirven para prevenir lesiones cervicales cuando su vehículo es impactado por atrás; deben ajustarse a cada ocupante, detrás de su cabeza, para evitar el efecto latigazo (manual ANSV, 2.1.4.3).",
  },
  {
    id: "veh-13",
    core: "vehiculo",
    text: "Al bajar una pendiente prolongada, ¿qué debe hacer para no perder la fuerza de frenado?",
    options: [
      "Disminuir la velocidad al inicio del descenso y bajar a una marcha baja, sin dejar el vehículo rodar en neutro.",
      "Rodar en neutro o punto muerto para ahorrar combustible.",
      "Sostener el freno de mano durante todo el descenso.",
      "Apagar el motor mientras desciende la pendiente.",
    ],
    correctAnswer: 0,
    explanation:
      "Antes de empezar a bajar una pendiente, disminuya la velocidad y baje de marcha al inicio del descenso, pues de lo contrario los frenos pueden sobrecalentarse y perder su fuerza; por ningún motivo deje rodar el vehículo en neutro (manual ANSV, 2.1.4.6).",
  },
  {
    id: "veh-14",
    core: "vehiculo",
    text: "¿Para qué sirven los catadióptricos (retrorreflectores) traseros del vehículo?",
    options: [
      "Para que el vehículo sea visto por quienes se aproximan por detrás cuando las luces fallan o el vehículo está detenido sin luces.",
      "Para iluminar la vía hacia adelante en la oscuridad.",
      "Para advertir los cambios de carril a los demás conductores.",
      "Para cumplir únicamente una función estética del conjunto óptico.",
    ],
    correctAnswer: 0,
    explanation:
      "Los catadióptricos no tienen luz propia, pero reflejan la de los vehículos que se acercan; aseguran que su vehículo sea visto en la noche por quienes se aproximan por detrás (manual ANSV, 2.1.4.3).",
  },
];

// ----------------------------------------------------------------------------
// Generador del examen (selección aleatoria según la distribución oficial)
// ----------------------------------------------------------------------------

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickRandomItems = <T,>(pool: T[], count: number): T[] => {
  if (pool.length < count) {
    throw new Error(
      `El banco de preguntas es insuficiente: se requieren ${count} ítems y solo hay ${pool.length}.`
    );
  }
  return shuffle(pool).slice(0, count);
};

const toAttitudeQuestion = (item: AttitudeBankItem): ExamQuestion => ({
  id: item.id,
  type: "actitudes",
  core: null,
  text: item.text,
  options: [...ATTITUDE_OPTIONS],
  correctAnswers: item.polarity === "positive" ? [0, 1] : [2, 3],
  explanation: item.explanation,
});

const toKnowledgeQuestion = (item: KnowledgeBankItem): ExamQuestion => {
  const correctText = item.options[item.correctAnswer];
  const options = shuffle(item.options);
  return {
    id: item.id,
    type: "conocimientos",
    core: item.core,
    text: item.text,
    options,
    correctAnswers: [options.findIndex((option) => option === correctText)],
    explanation: item.explanation,
  };
};

/**
 * Genera un examen completo de 40 preguntas respetando la distribución oficial
 * de la ANSV: 12 de actitudes y 28 de conocimientos (10/6/6/6 por núcleo).
 * El orden de las preguntas y de las opciones es único para cada aspirante.
 */
export const generateExam = (): ExamQuestion[] => {
  const attitudes = pickRandomItems(ATTITUDE_BANK, EXAM_CONFIG.attitudesQuestions).map(
    toAttitudeQuestion
  );

  const knowledge = KNOWLEDGE_CORES.flatMap((core) =>
    pickRandomItems(
      KNOWLEDGE_BANK.filter((item) => item.core === core),
      EXAM_CONFIG.distribution[core]
    ).map(toKnowledgeQuestion)
  );

  return shuffle([...attitudes, ...knowledge]);
};

// ----------------------------------------------------------------------------
// Cálculo de resultados (regla de aprobación oficial)
// ----------------------------------------------------------------------------

/**
 * Evalúa un examen presentado. La respuesta de una pregunta de actitudes se
 * considera acertada cuando se ubica en el polo seguro de la escala (como en
 * el ejemplo del manual de la ANSV), y la de conocimientos cuando coincide con
 * la única opción correcta. Las preguntas sin responder cuentan como erradas.
 * El examen se aprueba únicamente con ≥80% en conocimientos Y ≥80% en actitudes.
 */
export const evaluateExam = (
  questions: ExamQuestion[],
  answers: (number | null)[]
): ExamEvaluation => {
  let knowledgeScore = 0;
  let knowledgeTotal = 0;
  let attitudesScore = 0;
  let attitudesTotal = 0;
  let unansweredCount = 0;

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer === null || answer === undefined) {
      unansweredCount += 1;
    }
    const isCorrect =
      answer !== null && answer !== undefined && question.correctAnswers.includes(answer);

    if (question.type === "actitudes") {
      attitudesTotal += 1;
      if (isCorrect) attitudesScore += 1;
    } else {
      knowledgeTotal += 1;
      if (isCorrect) knowledgeScore += 1;
    }
  });

  const knowledgePercentage =
    knowledgeTotal > 0 ? Math.round((knowledgeScore / knowledgeTotal) * 100) : 0;
  const attitudesPercentage =
    attitudesTotal > 0 ? Math.round((attitudesScore / attitudesTotal) * 100) : 0;
  const totalScore = knowledgeScore + attitudesScore;
  const totalQuestions = knowledgeTotal + attitudesTotal;

  return {
    knowledgeScore,
    knowledgeTotal,
    knowledgePercentage,
    attitudesScore,
    attitudesTotal,
    attitudesPercentage,
    totalScore,
    totalQuestions,
    percentage: totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0,
    passed:
      knowledgePercentage >= EXAM_CONFIG.passPercentage &&
      attitudesPercentage >= EXAM_CONFIG.passPercentage,
    unansweredCount,
  };
};
