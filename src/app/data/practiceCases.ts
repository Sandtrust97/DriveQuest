// ============================================================================
// Práctica de Casos Reales de DriveQuest
// Un caso por cada tema y subtema del Manual oficial de la ANSV.
// Fuente: src/app/components/reference/manual_ansv.txt
// ============================================================================

export interface PracticeCase {
  id: number;
  topic: string;
  title: string;
  scenario: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
  correctFeedback: string;
  incorrectFeedback: Record<number, string>;
}

export const PRACTICE_CASES: PracticeCase[] = [
  {
    "id": 1,
    "topic": "Consideraciones sobre los siniestros viales en el mundo y en Colombia",
    "title": "Siniestros viales",
    "scenario": "Mientras conduces por una avenida, tu acompañante afirma que los siniestros viales son cuestión de mala suerte. ¿Qué respuesta coincide con el manual de la ANSV?",
    "options": [
      "Son inevitables y se deben principalmente al azar.",
      "Son un problema de salud pública y la principal causa de muerte entre los 5 y los 29 años en el mundo.",
      "Solo ocurren en carreteras y autopistas, nunca en vías urbanas.",
      "En Colombia los actores viales vulnerables son apenas el 10 % de las víctimas fatales."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "Según la OMS (2018), los siniestros viales son la octava causa de muerte en el mundo y la primera entre los 5 y los 29 años. En Colombia representan el 3,0 % de la mortalidad (DANE, 2019) y en 2025 los actores viales vulnerables fueron el 89,22 % de las víctimas fatales (ONSV).",
    "incorrectFeedback": {
      0: "Atribuir los siniestros a la mala suerte desconoce que son eventos prevenibles: la ANSV los trata como un problema de salud pública y la evidencia identifica factores de riesgo modificables como la velocidad, el alcohol y la distracción. Respuesta correcta: Son un problema de salud pública y la principal causa de muerte entre los 5 y los 29 años en el mundo.",
      2: "Falso: una gran parte de los siniestros ocurre en vías urbanas y a velocidades moderadas; cerca de la mitad de los accidentes con víctimas se produce en ciudad. Respuesta correcta: Son un problema de salud pública y la principal causa de muerte entre los 5 y los 29 años en el mundo.",
      3: "En Colombia los actores viales vulnerables ascendieron al 89,22 % de las víctimas fatales en 2025, con el motociclista como el más afectado (más del 60 %). Respuesta correcta: Son un problema de salud pública y la principal causa de muerte entre los 5 y los 29 años en el mundo."
    }
  },
  {
    "id": 2,
    "topic": "1.1. Autoridades de tránsito",
    "title": "Autoridades de tránsito",
    "scenario": "Un agente de tránsito te exige dinero para no imponer un comparendo. ¿Ante quién debes denunciar esa irregularidad?",
    "options": [
      "Ante el Ministerio de Transporte, por teléfono y de forma anónima.",
      "Ante las dependencias y autoridades disciplinarias de la alcaldía o del organismo de tránsito de la jurisdicción.",
      "Únicamente ante la línea de emergencias 123.",
      "Ante cualquier estación de policía, sin importar la jurisdicción."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El manual establece que cualquier anomalía, abuso o irregularidad de las autoridades de tránsito debe denunciarse ante las dependencias y autoridades disciplinarias de la alcaldía o del organismo de tránsito de la jurisdicción.",
    "incorrectFeedback": {
      0: "El Ministerio de Transporte es autoridad de tránsito, pero las quejas disciplinarias por el abuso de un agente se dirigen a la dependencia disciplinaria de la alcaldía o al organismo de tránsito correspondiente. Respuesta correcta: Ante las dependencias y autoridades disciplinarias de la alcaldía o del organismo de tránsito de la jurisdicción.",
      2: "El 123 es la línea de emergencias (NUSE), no el canal para denunciar faltas disciplinarias de un agente de tránsito. Respuesta correcta: Ante las dependencias y autoridades disciplinarias de la alcaldía o del organismo de tránsito de la jurisdicción.",
      3: "Aunque la Policía Nacional es autoridad de tránsito, la denuncia disciplinaria por la conducta del agente corresponde a la instancia de la alcaldía o al organismo de tránsito de la jurisdicción. Respuesta correcta: Ante las dependencias y autoridades disciplinarias de la alcaldía o del organismo de tránsito de la jurisdicción."
    }
  },
  {
    "id": 3,
    "topic": "1.2. Documentos obligatorios — 1.2.1. La licencia de tránsito",
    "title": "Licencia de tránsito",
    "scenario": "Un agente te solicita los documentos. Tienes la licencia de tránsito y la de conducción disponibles en la consulta en línea del RUNT. ¿Qué es válido?",
    "options": [
      "Solo sirven los documentos físicos.",
      "Una fotografía de los documentos guardada en el celular.",
      "El documento físico o el mensaje de datos de la consulta en línea y en tiempo real en el RUNT.",
      "Una copia autenticada ante notario."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "La Circular 20221010000601 del 3 de enero de 2022 establece que la obligación de portar la licencia de tránsito y la licencia de conducción se entiende cumplida con el documento físico o con el mensaje de datos derivado de la consulta en línea y en tiempo real en el RUNT.",
    "incorrectFeedback": {
      0: "El documento físico es válido, pero no es la única opción: también lo es la consulta en línea y en tiempo real en el RUNT. Respuesta correcta: El documento físico o el mensaje de datos de la consulta en línea y en tiempo real en el RUNT.",
      1: "Una fotografía no equivale al mensaje de datos de la consulta en línea al RUNT; el agente debe poder verificar el registro en tiempo real. Respuesta correcta: El documento físico o el mensaje de datos de la consulta en línea y en tiempo real en el RUNT.",
      3: "La norma no exige copia notarial: acepta el documento físico o la consulta en línea en el RUNT. Respuesta correcta: El documento físico o el mensaje de datos de la consulta en línea y en tiempo real en el RUNT."
    }
  },
  {
    "id": 4,
    "topic": "1.2.2. La licencia de conducción",
    "title": "Categoría de licencia",
    "scenario": "Una persona de 17 años quiere conducir un automóvil particular. ¿Qué categoría le corresponde y qué requisitos debe cumplir?",
    "options": [
      "Categoría A2: 16 años cumplidos, por ser una licencia para todo tipo de vehículo.",
      "Categoría C1: 18 años cumplidos y exámenes para servicio público.",
      "Categoría B1: 16 años cumplidos, exámenes teórico y práctico, certificado de un CEA y aptitud física, mental y de coordinación motriz.",
      "Categoría B2: 17 años cumplidos, sin necesidad de exámenes."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "La licencia B1 habilita automóviles, camperos, camionetas y microbuses de servicio particular. Para obtenerla se exigen 16 años cumplidos, saber leer y escribir, aprobar los exámenes teórico y práctico, contar con certificado de un Centro de Enseñanza Automovilística y presentar certificado de aptitud física, mental y de coordinación motriz.",
    "incorrectFeedback": {
      0: "La A2 es para motocicletas de más de 125 c.c., no para automóvil particular. Respuesta correcta: Categoría B1: 16 años cumplidos, exámenes teórico y práctico, certificado de un CEA y aptitud física, mental y de coordinación motriz.",
      1: "La C1 es para el servicio público y exige 18 años; no corresponde a un particular de 17 años. Respuesta correcta: Categoría B1: 16 años cumplidos, exámenes teórico y práctico, certificado de un CEA y aptitud física, mental y de coordinación motriz.",
      3: "La B2 es para camiones rígidos, busetas y buses particulares; además, a los 17 años la categoría que corresponde es B1 y sí se requieren exámenes. Respuesta correcta: Categoría B1: 16 años cumplidos, exámenes teórico y práctico, certificado de un CEA y aptitud física, mental y de coordinación motriz."
    }
  },
  {
    "id": 5,
    "topic": "1.2.3. Las placas",
    "title": "Placas legibles",
    "scenario": "Después de un recorrido por una vía destapada, la placa trasera de tu vehículo queda cubierta de lodo y un dígito no se lee. ¿Qué haces?",
    "options": [
      "Continúas el recorrido, porque la placa solo debe ser visible de noche.",
      "Retiras la placa y la guardas dentro del vehículo.",
      "Cubres la placa con un adhesivo para evitar que la roben.",
      "Limpias la placa antes de seguir: debe permanecer completa, limpia y legible."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "Las placas identifican el vehículo y deben permanecer instaladas, completas, limpias y legibles. Portar placas alteradas, ocultas o ilegibles constituye una infracción y dificulta la identificación del vehículo ante las autoridades.",
    "incorrectFeedback": {
      0: "La legibilidad de la placa se exige en todo momento, no solo de noche; el lodo puede ocultar dígitos y configurar una infracción. Respuesta correcta: Limpias la placa antes de seguir: debe permanecer completa, limpia y legible.",
      1: "La placa debe ir instalada en el vehículo; retirarla o llevarla dentro es una infracción. Respuesta correcta: Limpias la placa antes de seguir: debe permanecer completa, limpia y legible.",
      2: "Cubrir la placa con cualquier elemento la oculta y es una conducta sancionable; además impide la identificación del vehículo. Respuesta correcta: Limpias la placa antes de seguir: debe permanecer completa, limpia y legible."
    }
  },
  {
    "id": 6,
    "topic": "1.2.4. El SOAT",
    "title": "SOAT vencido",
    "scenario": "El SOAT de tu carro venció ayer y necesitas recorrer cinco cuadras para comprar el nuevo. ¿Cuál es la decisión correcta?",
    "options": [
      "Conducir despacio, porque el SOAT solo es obligatorio en carreteras.",
      "Realizar el recorrido y comprar el SOAT al regresar.",
      "No mover el vehículo hasta renovar el SOAT: circular sin él está prohibido y deja sin cobertura a las víctimas.",
      "Usar el vehículo, ya que el SOAT es opcional para los carros particulares."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "El SOAT es obligatorio para transitar por las vías públicas y ampara a las víctimas de siniestros viales. Circular sin él es una infracción y deja al conductor y a las víctimas sin la cobertura prevista.",
    "incorrectFeedback": {
      0: "El SOAT es obligatorio en todas las vías, urbanas y rurales; no existe excepción por la distancia o el tipo de vía. Respuesta correcta: No mover el vehículo hasta renovar el SOAT: circular sin él está prohibido y deja sin cobertura a las víctimas.",
      1: "La obligación existe antes de circular; hacer el trámite después no cubre el trayecto ya realizado. Respuesta correcta: No mover el vehículo hasta renovar el SOAT: circular sin él está prohibido y deja sin cobertura a las víctimas.",
      3: "El SOAT no es opcional para los vehículos particulares: es un requisito obligatorio para transitar. Respuesta correcta: No mover el vehículo hasta renovar el SOAT: circular sin él está prohibido y deja sin cobertura a las víctimas."
    }
  },
  {
    "id": 7,
    "topic": "1.2.5. El certificado de revisión técnico-mecánica y de gases",
    "title": "Revisión técnico-mecánica",
    "scenario": "Compraste un automóvil particular nuevo y ya cumplió 4 años. ¿Cuándo le corresponde la primera revisión técnico-mecánica y de gases?",
    "options": [
      "Al año siguiente de la compra, y luego cada año.",
      "A los 5 años contados desde la matrícula; después, cada año.",
      "A los 2 años, igual que las motocicletas.",
      "Nunca, porque los vehículos particulares están exentos."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "Para los vehículos particulares la primera revisión técnico-mecánica y de gases se realiza a los 5 años contados desde la matrícula y luego cada año. Para motocicletas y vehículos de servicio público la primera revisión es a los 2 años.",
    "incorrectFeedback": {
      0: "Los vehículos particulares no se revisan cada año desde la compra: la primera revisión es a los 5 años. Respuesta correcta: A los 5 años contados desde la matrícula; después, cada año.",
      2: "Los 2 años aplican a motocicletas y vehículos de servicio público, no a un automóvil particular. Respuesta correcta: A los 5 años contados desde la matrícula; después, cada año.",
      3: "La revisión es obligatoria para todos los vehículos; sin el certificado vigente no se puede transitar. Respuesta correcta: A los 5 años contados desde la matrícula; después, cada año."
    }
  },
  {
    "id": 8,
    "topic": "2. Conocimientos básicos y saberes esenciales transversales",
    "title": "Saberes transversales",
    "scenario": "¿Cuál conjunto resume mejor los conocimientos y saberes esenciales transversales que exige el manual para conducir de forma segura?",
    "options": [
      "Saber estacionar en paralelo y conocer el precio de los repuestos.",
      "Visión Cero, movilidad sostenible, protocolo PAS, conducción preventiva y eficiente, autorregulación, normas, señales, vehículo y actores vulnerables.",
      "Solo el funcionamiento mecánico del motor y la caja de cambios.",
      "Conocer de memoria el valor de todas las multas de tránsito."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "Los saberes transversales integran la Visión Cero, la movilidad sostenible, el protocolo PAS, la conducción preventiva y eficiente, la autorregulación, las normas de tránsito, las señales, el conocimiento del vehículo y la interacción con los actores viales más vulnerables.",
    "incorrectFeedback": {
      0: "Saber estacionar es una maniobra puntual; la conducción segura exige un conjunto de conocimientos y actitudes transversales. Respuesta correcta: Visión Cero, movilidad sostenible, protocolo PAS, conducción preventiva y eficiente, autorregulación, normas, señales, vehículo y actores vulnerables.",
      2: "La mecánica es importante, pero por sí sola no cubre los factores humanos, normativos y de interacción vial. Respuesta correcta: Visión Cero, movilidad sostenible, protocolo PAS, conducción preventiva y eficiente, autorregulación, normas, señales, vehículo y actores vulnerables.",
      3: "Conocer las multas no reemplaza la formación en prevención, normativa, señales y convivencia vial. Respuesta correcta: Visión Cero, movilidad sostenible, protocolo PAS, conducción preventiva y eficiente, autorregulación, normas, señales, vehículo y actores vulnerables."
    }
  },
  {
    "id": 9,
    "topic": "2.1.1.1. Visión Cero: todas las muertes en el tránsito son evitables",
    "title": "Visión Cero",
    "scenario": "En una pausa del viaje, un compañero dice que algunas muertes en el tránsito son inevitables. ¿Qué plantea la Visión Cero?",
    "options": [
      "Que las muertes son aceptables si la velocidad es baja.",
      "Que la meta aplica únicamente a las autopistas.",
      "Que solo se pueden evitar las muertes de peatones.",
      "Que ninguna muerte o lesión grave en el tránsito es aceptable y que el sistema debe proteger a las personas del error humano."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "La Visión Cero parte de que ninguna muerte o lesión grave en el tránsito es aceptable: el sistema vial debe diseñarse para perdonar el error humano y evitar que ese error termine en una fatalidad.",
    "incorrectFeedback": {
      0: "Aceptar muertes como inevitables contradice el principio de Visión Cero, que fija cero muertes y cero lesiones graves como meta. Respuesta correcta: Que ninguna muerte o lesión grave en el tránsito es aceptable y que el sistema debe proteger a las personas del error humano.",
      1: "Es un enfoque aplicable a todo el sistema vial, urbano y rural, no exclusivo de las autopistas. Respuesta correcta: Que ninguna muerte o lesión grave en el tránsito es aceptable y que el sistema debe proteger a las personas del error humano.",
      2: "La Visión Cero protege a todos los actores viales, no solo a los peatones. Respuesta correcta: Que ninguna muerte o lesión grave en el tránsito es aceptable y que el sistema debe proteger a las personas del error humano."
    }
  },
  {
    "id": 10,
    "topic": "2.1.1.2. La movilidad sostenible",
    "title": "Movilidad sostenible",
    "scenario": "Debes hacer un recorrido de 2 kilómetros dentro de la ciudad. ¿Cuál es la opción más coherente con la movilidad sostenible?",
    "options": [
      "Usar solo tú una camioneta grande para mayor comodidad.",
      "Caminar, usar la bicicleta o el transporte público, compartir el carro y planear los viajes.",
      "Usar el carro con las ventanas abajo para ahorrar combustible.",
      "Conducir más rápido para reducir el tiempo en la vía."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "La movilidad sostenible prioriza caminar, la bicicleta y el transporte público, además de compartir el vehículo y planear los viajes, para reducir emisiones, congestión y siniestralidad.",
    "incorrectFeedback": {
      0: "Un vehículo grande para una sola persona aumenta el consumo, las emisiones y la congestión; no es una elección sostenible. Respuesta correcta: Caminar, usar la bicicleta o el transporte público, compartir el carro y planear los viajes.",
      2: "Bajar las ventanas no sustituye la reducción del uso del automóvil ni resuelve los problemas de emisiones y congestión. Respuesta correcta: Caminar, usar la bicicleta o el transporte público, compartir el carro y planear los viajes.",
      3: "Aumentar la velocidad eleva el consumo y el riesgo; la eficiencia se logra con una conducción suave y planificada. Respuesta correcta: Caminar, usar la bicicleta o el transporte público, compartir el carro y planear los viajes."
    }
  },
  {
    "id": 11,
    "topic": "2.1.1.3. Protocolo de intervención PAS (Proteger, Avisar y Socorrer)",
    "title": "Protocolo PAS",
    "scenario": "Llegas a un siniestro con personas heridas en una carretera rural. ¿Cuál debe ser tu actuación, en orden?",
    "options": [
      "Proteger y señalizar la escena, avisar al #767 indicando la ubicación y socorrer según tus conocimientos.",
      "Mover de inmediato a los heridos a un lado de la vía.",
      "Tomar fotos del siniestro y retirarte para no interferir.",
      "Llamar primero a una grúa para retirar los vehículos."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "El protocolo PAS ordena Proteger (asegurar y señalizar la escena para evitar un segundo siniestro), Avisar (llamar al NUSE 123 en ciudades o al #767 en carretera, indicando la ubicación con un punto de referencia y un teléfono) y Socorrer (brindar ayuda inicial según el conocimiento, sin causar daño adicional).",
    "incorrectFeedback": {
      1: "Mover a una víctima sin evaluación puede agravar sus lesiones; primero se protege y señaliza la escena. Respuesta correcta: Proteger y señalizar la escena, avisar al #767 indicando la ubicación y socorrer según tus conocimientos.",
      2: "Documentar no es la prioridad: primero se evita un segundo siniestro y se pide ayuda a emergencias. Respuesta correcta: Proteger y señalizar la escena, avisar al #767 indicando la ubicación y socorrer según tus conocimientos.",
      3: "La grúa no es la primera actuación; primero se protege, se avisa a emergencias y se socorre. Respuesta correcta: Proteger y señalizar la escena, avisar al #767 indicando la ubicación y socorrer según tus conocimientos."
    }
  },
  {
    "id": 12,
    "topic": "2.1.1.4. Conducción preventiva y conducción eficiente",
    "title": "Conducción preventiva",
    "scenario": "Conduces por una vía rural y la niebla reduce repentinamente la visibilidad. ¿Qué hace un conductor preventivo?",
    "options": [
      "Mantener la velocidad y encender las luces altas.",
      "Detenerse en el carril sin señalizar para esperar a que aclare.",
      "Pegarse al vehículo de adelante para guiarse con sus luces.",
      "Reducir la velocidad, aumentar la distancia de seguimiento, encender las luces bajas y anticipar los errores de los demás."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "La conducción preventiva o defensiva consiste en anticipar riesgos y errores de otros actores viales. Con niebla se reduce la velocidad, se aumenta la distancia de seguimiento y se usan luces bajas para ver y ser visto.",
    "incorrectFeedback": {
      0: "Mantener la velocidad y usar luces altas en niebla produce deslumbramiento y reduce aún más la visibilidad. Respuesta correcta: Reducir la velocidad, aumentar la distancia de seguimiento, encender las luces bajas y anticipar los errores de los demás.",
      1: "Detenerse en el carril sin señalizar crea un obstáculo; si hay que detenerse, se hace fuera de la vía y con señalización. Respuesta correcta: Reducir la velocidad, aumentar la distancia de seguimiento, encender las luces bajas y anticipar los errores de los demás.",
      2: "Pegarse al vehículo de adelante elimina el tiempo y la distancia de reacción; es lo contrario de la conducción defensiva. Respuesta correcta: Reducir la velocidad, aumentar la distancia de seguimiento, encender las luces bajas y anticipar los errores de los demás."
    }
  },
  {
    "id": 13,
    "topic": "2.1.2.1. Autorregulación",
    "title": "Autorregulación",
    "scenario": "Terminas un turno de 12 horas y sientes mucho sueño, pero debes conducir a casa. ¿Cuál es la decisión propia de un conductor autorregulado?",
    "options": [
      "Tomar café y conducir rápido para llegar antes.",
      "Abrir la ventana y subir el volumen de la música.",
      "Posponer el viaje, descansar o delegar la conducción en otra persona o en el transporte público.",
      "Conducir despacio por el carril izquierdo."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "La autorregulación implica reconocer las propias limitaciones y decidir no conducir cuando el cansancio, el alcohol o el estrés comprometen la atención. Lo seguro es descansar o delegar la conducción.",
    "incorrectFeedback": {
      0: "El café y la velocidad no eliminan el sueño; la cafeína puede enmascarar la fatiga y aumentar el riesgo. Respuesta correcta: Posponer el viaje, descansar o delegar la conducción en otra persona o en el transporte público.",
      1: "Abrir la ventana o subir la música son medidas temporales que no revierten el deterioro por fatiga. Respuesta correcta: Posponer el viaje, descansar o delegar la conducción en otra persona o en el transporte público.",
      3: "Circular lento por el carril izquierdo obstruye el tránsito y no resuelve el cansancio. Respuesta correcta: Posponer el viaje, descansar o delegar la conducción en otra persona o en el transporte público."
    }
  },
  {
    "id": 14,
    "topic": "2.1.2.2. Infracciones a las normas de tránsito más frecuentes",
    "title": "Infracciones frecuentes",
    "scenario": "Según el manual, más del 90 % de los siniestros analizados se asocian al comportamiento humano. ¿Cuál de estas conductas es una de las infracciones frecuentes que menciona?",
    "options": [
      "Usar el cinturón de seguridad.",
      "Ir en contravía y desobedecer las señales de tránsito.",
      "Señalizar los giros con anticipación.",
      "Detenerse antes de la línea de PARE."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El manual asocia más del 90 % de los siniestros al factor de comportamiento humano y menciona como infracciones frecuentes irrespetar los límites de velocidad, desobedecer las señales de tránsito, conducir en estado de embriaguez o ir en contravía.",
    "incorrectFeedback": {
      0: "Usar el cinturón es una obligación y una conducta segura, no una infracción. Respuesta correcta: Ir en contravía y desobedecer las señales de tránsito.",
      2: "Señalizar los giros es correcto y obligatorio; no constituye una infracción. Respuesta correcta: Ir en contravía y desobedecer las señales de tránsito.",
      3: "Detenerse antes de la línea de PARE es cumplir la norma, no infringirla. Respuesta correcta: Ir en contravía y desobedecer las señales de tránsito."
    }
  },
  {
    "id": 15,
    "topic": "2.1.2.3. Comportamiento en el tránsito",
    "title": "Comportamiento vial",
    "scenario": "Otro conductor te cierra el paso y te grita. ¿Cuál es la respuesta adecuada para mantener la seguridad vial?",
    "options": [
      "Mantener la calma, aumentar la distancia, evitar la confrontación y reportar el hecho si es necesario.",
      "Perseguirlo y pitarle para darle una lección.",
      "Frenarle bruscamente delante de su vehículo.",
      "Responder con gestos ofensivos para que aprenda."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "El comportamiento en el tránsito debe basarse en el respeto y la tolerancia frente a los errores de los demás. Ante una conducta agresiva, lo seguro es mantener la calma, aumentar la distancia y no responder con provocaciones que escalen el conflicto.",
    "incorrectFeedback": {
      1: "Perseguir o pitar insistentemente escala la agresión y aumenta el riesgo de un siniestro. Respuesta correcta: Mantener la calma, aumentar la distancia, evitar la confrontación y reportar el hecho si es necesario.",
      2: "Frenar bruscamente delante de otro vehículo puede causar una colisión y es una conducta peligrosa. Respuesta correcta: Mantener la calma, aumentar la distancia, evitar la confrontación y reportar el hecho si es necesario.",
      3: "Los gestos ofensivos agravan el conflicto y no aportan a la seguridad vial. Respuesta correcta: Mantener la calma, aumentar la distancia, evitar la confrontación y reportar el hecho si es necesario."
    }
  },
  {
    "id": 16,
    "topic": "2.1.2.4. La alimentación, la fatiga y la distracción en la conducción",
    "title": "Fatiga al conducir",
    "scenario": "En un viaje largo empiezas a bostezar, sientes los párpados pesados y pierdes concentración. ¿Qué debes hacer?",
    "options": [
      "Continuar hasta el destino para no perder tiempo.",
      "Comer una comida abundante mientras conduces.",
      "Aumentar la velocidad para llegar más rápido.",
      "Detenerte en un lugar seguro, descansar, hidratarte y reanudar la marcha solo cuando estés alerta."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "La fatiga deteriora la atención y los reflejos. Ante la somnolencia se debe detener el vehículo en un lugar seguro, descansar e hidratarse; una alimentación ligera y las pausas periódicas ayudan a prevenirla.",
    "incorrectFeedback": {
      0: "Continuar con somnolencia es muy peligroso: un microsueño de pocos segundos puede causar un siniestro. Respuesta correcta: Detenerte en un lugar seguro, descansar, hidratarte y reanudar la marcha solo cuando estés alerta.",
      1: "Comer abundantemente al conducir produce somnolencia y distracción; además, manipular alimentos quita atención a la vía. Respuesta correcta: Detenerte en un lugar seguro, descansar, hidratarte y reanudar la marcha solo cuando estés alerta.",
      2: "Aumentar la velocidad no reduce la fatiga y eleva la severidad de cualquier impacto. Respuesta correcta: Detenerte en un lugar seguro, descansar, hidratarte y reanudar la marcha solo cuando estés alerta."
    }
  },
  {
    "id": 17,
    "topic": "2.1.2.5. El alcohol y otras sustancias perjudiciales en la conducción",
    "title": "Alcohol y conducción",
    "scenario": "Bebiste una cerveza en una reunión y faltan pocas cuadras para llegar a casa. ¿Puedes conducir?",
    "options": [
      "Sí, una sola cerveza no afecta la conducción.",
      "No: en Colombia hay cero tolerancia y desde 20 mg de etanol por 100 ml de sangre se aplican sanciones.",
      "Sí, siempre que conduzcas despacio.",
      "Sí, si tomas café antes de arrancar."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "En Colombia existe cero tolerancia: desde 20 mg de etanol por 100 ml de sangre (aproximadamente una cerveza) se aplican las sanciones de la Ley 1696 de 2013, que incluyen suspensión de la licencia, multa, acciones comunitarias e inmovilización del vehículo.",
    "incorrectFeedback": {
      0: "Una sola bebida ya altera la atención, la visión periférica y el tiempo de reacción; además, desde 20 mg/100 ml hay sanción. Respuesta correcta: No: en Colombia hay cero tolerancia y desde 20 mg de etanol por 100 ml de sangre se aplican sanciones.",
      2: "Conducir despacio no elimina el deterioro por alcohol ni evita la sanción. Respuesta correcta: No: en Colombia hay cero tolerancia y desde 20 mg de etanol por 100 ml de sangre se aplican sanciones.",
      3: "El café no acelera la eliminación del alcohol ni revierte sus efectos sobre el sistema nervioso. Respuesta correcta: No: en Colombia hay cero tolerancia y desde 20 mg de etanol por 100 ml de sangre se aplican sanciones."
    }
  },
  {
    "id": 18,
    "topic": "2.1.2.6. La velocidad en los diferentes tipos de vía",
    "title": "Velocidad en zona escolar",
    "scenario": "Circulas frente a una escuela y hay niños cerca de la calzada. ¿Cuál es la velocidad máxima permitida en esa zona escolar?",
    "options": [
      "50 km/h.",
      "40 km/h.",
      "60 km/h.",
      "30 km/h."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "En zonas escolares y residenciales la velocidad máxima es de 30 km/h. A esa velocidad el conductor puede ver y reaccionar a tiempo, y la severidad de un impacto sobre un peatón se reduce drásticamente.",
    "incorrectFeedback": {
      0: "50 km/h supera el límite de 30 km/h fijado para zonas escolares y residenciales. Respuesta correcta: 30 km/h.",
      1: "40 km/h también excede el máximo de 30 km/h en zona escolar. Respuesta correcta: 30 km/h.",
      2: "60 km/h duplica el límite y aumenta mucho la distancia de frenado y la gravedad de las lesiones. Respuesta correcta: 30 km/h."
    }
  },
  {
    "id": 19,
    "topic": "2.1.2.7. Respeto de lugares exclusivos o preferenciales",
    "title": "Lugares de estacionamiento",
    "scenario": "Necesitas entrar un momento a una tienda y no hay parqueadero. ¿Puedes estacionar sobre el andén?",
    "options": [
      "No: el andén es espacio del peatón y estacionar allí lo obliga a bajarse a la vía.",
      "Sí, si tardas menos de cinco minutos.",
      "Sí, siempre que enciendas las luces de emergencia.",
      "Sí, si no hay un agente de tránsito cerca."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "Está prohibido estacionar en andenes, zonas verdes, espacios públicos peatonales, vías arterias, autopistas, zonas de seguridad y cruces. El andén es espacio del peatón; invadirlo lo obliga a bajarse a la vía y lo pone en riesgo.",
    "incorrectFeedback": {
      1: "No existe un permiso de cinco minutos: estacionar en el andén está prohibido en cualquier tiempo. Respuesta correcta: No: el andén es espacio del peatón y estacionar allí lo obliga a bajarse a la vía.",
      2: "Las luces de emergencia no habilitan el estacionamiento en un lugar prohibido. Respuesta correcta: No: el andén es espacio del peatón y estacionar allí lo obliga a bajarse a la vía.",
      3: "La prohibición no depende de la presencia de un agente; la infracción existe aunque no haya control. Respuesta correcta: No: el andén es espacio del peatón y estacionar allí lo obliga a bajarse a la vía."
    }
  },
  {
    "id": 20,
    "topic": "2.1.3.1. Señales de tránsito",
    "title": "Señales preventivas",
    "scenario": "Ves una señal amarilla en forma de rombo con el símbolo de una curva. ¿Qué significa?",
    "options": [
      "Advertencia preventiva: se aproxima una curva y debes reducir la velocidad.",
      "Prohibición de girar a la izquierda.",
      "Obligación de detenerse por completo.",
      "Información sobre un destino turístico."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "Las señales preventivas son amarillas y en forma de rombo; advierten la existencia y naturaleza de riesgos o situaciones imprevistas, como una curva, para que el conductor reduzca la velocidad y tome precauciones.",
    "incorrectFeedback": {
      1: "Las prohibiciones son señales reglamentarias, generalmente circulares y con borde rojo; el rombo amarillo es preventivo. Respuesta correcta: Advertencia preventiva: se aproxima una curva y debes reducir la velocidad.",
      2: "El PARE es una señal reglamentaria octagonal roja, no un rombo amarillo. Respuesta correcta: Advertencia preventiva: se aproxima una curva y debes reducir la velocidad.",
      3: "Las señales informativas orientan sobre destinos y servicios; no advierten un riesgo de la vía. Respuesta correcta: Advertencia preventiva: se aproxima una curva y debes reducir la velocidad."
    }
  },
  {
    "id": 21,
    "topic": "2.1.3.2. La infraestructura vial",
    "title": "Intersección sin visibilidad",
    "scenario": "Te aproximas a una intersección sin semáforo ni señal de PARE, y la visibilidad hacia ambos lados es reducida. ¿Qué haces?",
    "options": [
      "Acelerar para cruzar antes de que aparezca otro vehículo.",
      "Invadir el carril contrario para ver mejor.",
      "Pitar y continuar a la misma velocidad.",
      "Reducir la velocidad, verificar ambos sentidos y ceder el paso a quien tenga la prelación."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "La infraestructura vial condiciona la visibilidad y el riesgo. En intersecciones sin señalización se debe reducir la velocidad, verificar ambos sentidos y respetar la prelación; la velocidad adecuada permite reaccionar a lo que aparece.",
    "incorrectFeedback": {
      0: "Acelerar reduce el tiempo de reacción y agrava un posible impacto en una intersección con visibilidad limitada. Respuesta correcta: Reducir la velocidad, verificar ambos sentidos y ceder el paso a quien tenga la prelación.",
      1: "Invadir el carril contrario es una maniobra de alto riesgo que puede causar una colisión frontal. Respuesta correcta: Reducir la velocidad, verificar ambos sentidos y ceder el paso a quien tenga la prelación.",
      2: "Pitar no otorga prioridad ni compensa la falta de visibilidad; primero se reduce la velocidad y se verifica. Respuesta correcta: Reducir la velocidad, verificar ambos sentidos y ceder el paso a quien tenga la prelación."
    }
  },
  {
    "id": 22,
    "topic": "2.1.4.1. Partes esenciales del vehículo, controles y localización",
    "title": "Controles del vehículo",
    "scenario": "Vas a conducir un vehículo que no conoces. Antes de iniciar la marcha, ¿qué debes ubicar y probar?",
    "options": [
      "Solo la emisora y el aire acondicionado.",
      "Nada: todos los vehículos tienen los controles en el mismo lugar.",
      "Únicamente el indicador de combustible.",
      "Freno, acelerador, embrague, palanca de cambios, dirección, luces, limpiaparabrisas, señalización de emergencia e instrumentos del tablero."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "Antes de conducir un vehículo desconocido se deben ubicar y probar los controles esenciales: freno, acelerador, embrague, palanca de cambios, dirección, luces, limpiaparabrisas, señalización de emergencia e instrumentos del tablero.",
    "incorrectFeedback": {
      0: "La emisora y el aire acondicionado no son controles esenciales para la seguridad; distraerse con ellos antes de partir es innecesario. Respuesta correcta: Freno, acelerador, embrague, palanca de cambios, dirección, luces, limpiaparabrisas, señalización de emergencia e instrumentos del tablero.",
      1: "Aunque muchos controles son similares, su ubicación varía entre vehículos; no verificarlos aumenta el riesgo. Respuesta correcta: Freno, acelerador, embrague, palanca de cambios, dirección, luces, limpiaparabrisas, señalización de emergencia e instrumentos del tablero.",
      2: "El indicador de combustible es útil, pero no basta: hay controles críticos que deben identificarse antes de mover el vehículo. Respuesta correcta: Freno, acelerador, embrague, palanca de cambios, dirección, luces, limpiaparabrisas, señalización de emergencia e instrumentos del tablero."
    }
  },
  {
    "id": 23,
    "topic": "2.1.4.2. Revisión preoperacional",
    "title": "Revisión preoperacional",
    "scenario": "Antes de iniciar un recorrido, ¿cuáles son los cinco componentes que debe revisar cualquier vehículo motorizado?",
    "options": [
      "Radio, aire acondicionado, sillas, GPS y parlantes.",
      "Solamente el nivel de combustible.",
      "Líquidos, sistema de frenos, sistema eléctrico, llantas y espejos.",
      "Solamente las luces delanteras."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "La revisión preoperacional mínima comprende cinco componentes: líquidos, sistema de frenos, sistema eléctrico, llantas y espejos. En motocicleta se añade el kit de arrastre; en vehículos de cuatro o más ruedas, la carrocería, las puertas y los limpiabrisas.",
    "incorrectFeedback": {
      0: "Esos elementos no son los cinco componentes críticos de la revisión preoperacional. Respuesta correcta: Líquidos, sistema de frenos, sistema eléctrico, llantas y espejos.",
      1: "El combustible importa, pero la revisión mínima incluye líquidos, frenos, sistema eléctrico, llantas y espejos. Respuesta correcta: Líquidos, sistema de frenos, sistema eléctrico, llantas y espejos.",
      3: "Las luces forman parte del sistema eléctrico, pero la revisión mínima abarca también líquidos, frenos, llantas y espejos. Respuesta correcta: Líquidos, sistema de frenos, sistema eléctrico, llantas y espejos."
    }
  },
  {
    "id": 24,
    "topic": "2.1.4.3. La seguridad vial pasiva y activa del vehículo",
    "title": "Seguridad activa y pasiva",
    "scenario": "Al revisar las especificaciones de tu vehículo antes de un viaje, ves varios sistemas de seguridad. ¿Cuál es un sistema de seguridad activa?",
    "options": [
      "El airbag.",
      "El apoyacabezas.",
      "El cinturón de seguridad.",
      "El ABS y el control de estabilidad."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "La seguridad activa busca evitar el choque: frenos (ABS), iluminación, dirección, suspensión y control de estabilidad. La seguridad pasiva (cinturón, airbag, apoyacabezas y sistemas de retención infantil) reduce las consecuencias cuando el choque ya ocurrió.",
    "incorrectFeedback": {
      0: "El airbag es seguridad pasiva: actúa después del impacto para reducir lesiones. Respuesta correcta: El ABS y el control de estabilidad.",
      1: "El apoyacabezas es seguridad pasiva: protege del latigazo cervical en el impacto. Respuesta correcta: El ABS y el control de estabilidad.",
      2: "El cinturón es seguridad pasiva: sujeta al ocupante cuando ya se produjo la colisión. Respuesta correcta: El ABS y el control de estabilidad."
    }
  },
  {
    "id": 25,
    "topic": "2.1.4.4. Equipo de prevención",
    "title": "Equipo de prevención",
    "scenario": "¿Cuál de estos conjuntos corresponde al equipo mínimo de prevención y seguridad exigido para transitar?",
    "options": [
      "Gato, cruceta, dos señales reflectivas triangulares, botiquín, extintor, dos tacos, caja de herramientas básica, llanta de repuesto y linterna.",
      "Solamente una llanta de repuesto.",
      "Solamente un extintor.",
      "Un GPS y un cargador para el celular."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "El artículo 30 del Código Nacional de Tránsito exige como mínimo: gato, cruceta, dos señales de carretera reflectivas triangulares (o lámparas amarillas intermitentes), botiquín de primeros auxilios, extintor, dos tacos para bloquear el vehículo, caja de herramientas básica, llanta de repuesto y linterna.",
    "incorrectFeedback": {
      1: "La llanta de repuesto es solo uno de los nueve elementos mínimos; faltan gato, cruceta, señales, botiquín, extintor, tacos, herramientas y linterna. Respuesta correcta: Gato, cruceta, dos señales reflectivas triangulares, botiquín, extintor, dos tacos, caja de herramientas básica, llanta de repuesto y linterna.",
      2: "El extintor es obligatorio, pero no es el único equipo de prevención exigido. Respuesta correcta: Gato, cruceta, dos señales reflectivas triangulares, botiquín, extintor, dos tacos, caja de herramientas básica, llanta de repuesto y linterna.",
      3: "El GPS y el cargador son accesorios, no forman parte del equipo mínimo de carretera. Respuesta correcta: Gato, cruceta, dos señales reflectivas triangulares, botiquín, extintor, dos tacos, caja de herramientas básica, llanta de repuesto y linterna."
    }
  },
  {
    "id": 26,
    "topic": "2.1.4.5. Postura correcta y ajuste del cinturón de seguridad",
    "title": "Ajuste del cinturón",
    "scenario": "¿Cómo se ajusta correctamente el cinturón de seguridad?",
    "options": [
      "La banda diagonal bajo el brazo y la banda inferior sobre el abdomen.",
      "Solamente la banda inferior, sin la diagonal.",
      "Flojo, para que no arrugue la ropa.",
      "La banda diagonal sobre el hombro y la clavícula, y la banda inferior baja sobre las caderas, sin holgura."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "El cinturón debe ajustarse sin holgura: la banda diagonal sobre el hombro y la clavícula (nunca bajo el brazo ni sobre el cuello) y la banda inferior baja, sobre las caderas. Así la fuerza se transmite a las estructuras óseas resistentes.",
    "incorrectFeedback": {
      0: "Pasar la diagonal bajo el brazo o la inferior sobre el abdomen puede causar lesiones graves en un impacto. Respuesta correcta: La banda diagonal sobre el hombro y la clavícula, y la banda inferior baja sobre las caderas, sin holgura.",
      1: "Usar solo la banda inferior deja el torso sin sujeción y expone la cabeza y el tórax en una colisión. Respuesta correcta: La banda diagonal sobre el hombro y la clavícula, y la banda inferior baja sobre las caderas, sin holgura.",
      2: "Un cinturón flojo permite desplazamientos y reduce o anula su eficacia. Respuesta correcta: La banda diagonal sobre el hombro y la clavícula, y la banda inferior baja sobre las caderas, sin holgura."
    }
  },
  {
    "id": 27,
    "topic": "2.1.4.6. Puesta en marcha del motor y del vehículo",
    "title": "Puesta en marcha",
    "scenario": "Vas a iniciar la marcha sobre una superficie resbalosa. ¿Cómo debes acelerar?",
    "options": [
      "A fondo, para ganar impulso rápidamente.",
      "En un cambio alto y acelerando bruscamente.",
      "Con el freno de mano puesto.",
      "Gradual y suavemente, para evitar que el volante gire sin control."
    ],
    "correctOptionIndex": 3,
    "correctFeedback": "El manual indica que se debe acelerar gradual y suavemente: arrancar con gran potencia puede hacer que el timón o volante gire sin control, especialmente en superficies resbalosas o en vehículos con alto torque para su peso.",
    "incorrectFeedback": {
      0: "Acelerar a fondo puede inducir giros bruscos de la dirección y hacer perder el control, sobre todo en piso resbaloso. Respuesta correcta: Gradual y suavemente, para evitar que el volante gire sin control.",
      1: "Un cambio alto con aceleración brusca reduce el control y puede provocar el giro involuntario del volante. Respuesta correcta: Gradual y suavemente, para evitar que el volante gire sin control.",
      2: "Arrancar con el freno de mano puesto fuerza el sistema de frenos y no permite un inicio controlado. Respuesta correcta: Gradual y suavemente, para evitar que el volante gire sin control."
    }
  },
  {
    "id": 28,
    "topic": "2.2.1. Elementos de protección personal (motocicleta)",
    "title": "Elementos de protección personal",
    "scenario": "Vas a salir en motocicleta. ¿Cuál es el elemento de protección personal mínimo obligatorio y cómo debe usarse el casco?",
    "options": [
      "Una gorra; el casco es opcional en trayectos cortos.",
      "Casco certificado, de la talla adecuada, con la cabeza totalmente inmersa y el sistema de retención asegurado bajo la mandíbula.",
      "El casco colgado en el brazo mientras conduces.",
      "Solo gafas de sol para proteger los ojos."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El casco es el elemento de protección personal mínimo obligatorio en Colombia. Debe ser de la talla adecuada, con certificación de calidad, con la cabeza totalmente inmersa y el sistema de retención asegurado bajo la mandíbula. Se recomiendan además guantes, chaqueta, rodilleras y botas.",
    "incorrectFeedback": {
      0: "La gorra no protege; el casco es obligatorio y su uso correcto reduce hasta en un 40 % la probabilidad de muerte en un siniestro. Respuesta correcta: Casco certificado, de la talla adecuada, con la cabeza totalmente inmersa y el sistema de retención asegurado bajo la mandíbula.",
      2: "Llevar el casco colgado no protege; debe estar puesto y abrochado correctamente. Respuesta correcta: Casco certificado, de la talla adecuada, con la cabeza totalmente inmersa y el sistema de retención asegurado bajo la mandíbula.",
      3: "Las gafas no sustituyen el casco ni protegen la cabeza en un impacto. Respuesta correcta: Casco certificado, de la talla adecuada, con la cabeza totalmente inmersa y el sistema de retención asegurado bajo la mandíbula."
    }
  },
  {
    "id": 29,
    "topic": "2.2.2. Sistema Antibloqueo de Frenos (ABS) y Sistema de Frenado Combinada (CBS)",
    "title": "Frenado con ABS",
    "scenario": "Tu motocicleta tiene ABS y necesitas frenar de emergencia. ¿Cuál es la técnica correcta?",
    "options": [
      "Usar solo el freno trasero y accionarlo con fuerza.",
      "Usar solo el freno delantero, soltándolo y apretándolo repetidamente.",
      "Accionar con firmeza ambos frenos; el ABS evita el bloqueo y conserva la capacidad de dirección.",
      "No usar nunca el freno delantero."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "El ABS evita el bloqueo de las ruedas y permite conservar la capacidad de dirección durante un frenado de emergencia. Lo correcto es accionar con firmeza ambos frenos; el CBS complementa distribuyendo la frenada entre las dos ruedas.",
    "incorrectFeedback": {
      0: "Usar solo el freno trasero desaprovecha la mayor capacidad de frenado del delantero y alarga la distancia. Respuesta correcta: Accionar con firmeza ambos frenos; el ABS evita el bloqueo y conserva la capacidad de dirección.",
      1: "Bombear el freno no es la técnica con ABS: el sistema ya modula la presión; hay que frenar firme y continuo. Respuesta correcta: Accionar con firmeza ambos frenos; el ABS evita el bloqueo y conserva la capacidad de dirección.",
      3: "El freno delantero aporta gran parte de la capacidad de frenado; evitarlo alarga peligrosamente la detención. Respuesta correcta: Accionar con firmeza ambos frenos; el ABS evita el bloqueo y conserva la capacidad de dirección."
    }
  },
  {
    "id": 30,
    "topic": "2.2.3. Uso de luces para aumentar la visibilidad del vehículo y uso de prendas reflectivas",
    "title": "Luces y prendas reflectivas",
    "scenario": "Conduces una motocicleta de día y con sol. ¿Cómo deben ir las luces?",
    "options": [
      "Apagadas, para ahorrar batería.",
      "Encendidas solo de noche.",
      "Siempre encendidas, delanteras y traseras.",
      "Encendidas solo cuando llueve."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "Las motocicletas deben transitar siempre con las luces delanteras y traseras encendidas, incluso de día y con sol, para aumentar su visibilidad. Entre las 18:00 y las 6:00, o cuando la visibilidad sea escasa, conductor y acompañante deben portar prendas reflectivas.",
    "incorrectFeedback": {
      0: "Apagar las luces reduce la visibilidad de la motocicleta y es una conducta de riesgo; no es una medida de ahorro aceptable. Respuesta correcta: Siempre encendidas, delanteras y traseras.",
      1: "No es solo nocturno: la norma exige las luces encendidas en todo momento. Respuesta correcta: Siempre encendidas, delanteras y traseras.",
      3: "La obligación no depende de la lluvia; también en días soleados deben ir encendidas. Respuesta correcta: Siempre encendidas, delanteras y traseras."
    }
  },
  {
    "id": 31,
    "topic": "2.2.4. Técnicas y maniobras básicas para la conducción de motocicleta",
    "title": "Técnica en motocicleta",
    "scenario": "Circulas en motocicleta y aparece un bache que no puedes esquivar. ¿Cuál es la técnica más segura?",
    "options": [
      "Sujetar el manubrio con las dos manos, mantener el control y acompañar el movimiento del cuerpo.",
      "Soltar el manubrio para que la moto se estabilice sola.",
      "Frenar bruscamente solo con el freno delantero.",
      "Acelerar con fuerza para pasar el bache."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "El manubrio debe sujetarse con las dos manos para mantener el control ante baches o emergencias. Se recomienda un agarre firme, acompañar el movimiento con el cuerpo y evitar frenazos bruscos que desestabilicen la motocicleta.",
    "incorrectFeedback": {
      1: "Soltar el manubrio elimina el control direccional y aumenta la probabilidad de caída. Respuesta correcta: Sujetar el manubrio con las dos manos, mantener el control y acompañar el movimiento del cuerpo.",
      2: "Frenar bruscamente solo con el delantero sobre un obstáculo puede bloquear la rueda y provocar pérdida de control. Respuesta correcta: Sujetar el manubrio con las dos manos, mantener el control y acompañar el movimiento del cuerpo.",
      3: "Acelerar sobre un bache aumenta el impacto y la inestabilidad. Respuesta correcta: Sujetar el manubrio con las dos manos, mantener el control y acompañar el movimiento del cuerpo."
    }
  },
  {
    "id": 32,
    "topic": "2.2.5. Recomendaciones asociadas a la conducción con acompañante",
    "title": "Conducción con acompañante",
    "scenario": "Un acompañante va a subir a tu motocicleta. ¿Cuál es la forma correcta?",
    "options": [
      "Subir por el lado derecho, con el motor apagado y sin apoyo.",
      "Subir por el lado izquierdo, con el motor encendido, el conductor con ambos pies en el suelo y el freno delantero accionado.",
      "Subir mientras la motocicleta está en movimiento.",
      "Apoyarse en el escape para subir."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El acompañante sube por el lado izquierdo, con el motor encendido, el conductor con ambos pies en el suelo y accionando el freno delantero; se apoya en el hombro del conductor y en el reposapiés izquierdo. Se baja por el mismo lado, después de desengranar y frenar.",
    "incorrectFeedback": {
      0: "Subir por la derecha acerca al escape y no cuenta con la estabilidad que da el freno delantero accionado. Respuesta correcta: Subir por el lado izquierdo, con el motor encendido, el conductor con ambos pies en el suelo y el freno delantero accionado.",
      2: "Subir con la motocicleta en movimiento es extremadamente peligroso y puede desestabilizarla. Respuesta correcta: Subir por el lado izquierdo, con el motor encendido, el conductor con ambos pies en el suelo y el freno delantero accionado.",
      3: "Apoyarse en el escape puede causar quemaduras graves y no es una forma segura de subir. Respuesta correcta: Subir por el lado izquierdo, con el motor encendido, el conductor con ambos pies en el suelo y el freno delantero accionado."
    }
  },
  {
    "id": 33,
    "topic": "2.2.6. Maniobras — categorías A1 y A2 (motocicleta)",
    "title": "Maniobras A1 y A2",
    "scenario": "¿Cuál de estas maniobras forma parte de la evaluación práctica para las categorías A1 y A2?",
    "options": [
      "Carreteo, circulación en franja estrecha, eslalon a baja y alta velocidad y frenado de emergencia con ambos frenos.",
      "Acoplar un semirremolque.",
      "Estacionar en línea un bus de pasajeros.",
      "Hacer reversa en curva con un tractocamión."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "Las maniobras de motocicleta A1 y A2 incluyen carreteo, circulación sobre una franja de máximo 25 cm de ancho, eslalon a baja velocidad (máximo 30 km/h) y a alta velocidad (mínimo 30 km/h), aceleración y frenado controlado, frenado de emergencia con ambos frenos, desplazamientos en ocho e interacción con señales.",
    "incorrectFeedback": {
      1: "El acople de semirremolque corresponde a las categorías B3 y C3, no a motocicleta. Respuesta correcta: Carreteo, circulación en franja estrecha, eslalon a baja y alta velocidad y frenado de emergencia con ambos frenos.",
      2: "El estacionamiento en línea de un bus corresponde a las maniobras de transporte de pasajeros B2 y C2. Respuesta correcta: Carreteo, circulación en franja estrecha, eslalon a baja y alta velocidad y frenado de emergencia con ambos frenos.",
      3: "La reversa en curva con tractocamión pertenece a los vehículos articulados B3 y C3. Respuesta correcta: Carreteo, circulación en franja estrecha, eslalon a baja y alta velocidad y frenado de emergencia con ambos frenos."
    }
  },
  {
    "id": 34,
    "topic": "2.3.1. Sistemas de retención infantil",
    "title": "Sistemas de retención infantil",
    "scenario": "Vas a transportar a un niño de 4 años que pesa 15 kg. ¿Dónde y cómo debe ir?",
    "options": [
      "En el asiento delantero, con el cinturón de seguridad del adulto.",
      "En brazos de un adulto, en el asiento delantero.",
      "En el asiento trasero, en un sistema de retención infantil adecuado a su peso y talla.",
      "De pie detrás de los asientos, para que no se mueva."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "Los niños menores de 10 años deben ir en el asiento trasero y hasta esa edad se recomienda usar Sistemas de Retención Infantil adecuados a su peso y talla. Nunca deben ir en la silla delantera ni sueltos.",
    "incorrectFeedback": {
      0: "El asiento delantero no es seguro para un menor de 10 años; además, el cinturón de adulto no se ajusta a su cuerpo. Respuesta correcta: En el asiento trasero, en un sistema de retención infantil adecuado a su peso y talla.",
      1: "Llevar al niño en brazos es muy peligroso: en un impacto el adulto no puede retenerlo y lo expone a golpearse contra el tablero. Respuesta correcta: En el asiento trasero, en un sistema de retención infantil adecuado a su peso y talla.",
      3: "Un niño de pie y sin sujeción queda totalmente expuesto a lesiones graves o a ser expulsado del vehículo. Respuesta correcta: En el asiento trasero, en un sistema de retención infantil adecuado a su peso y talla."
    }
  },
  {
    "id": 35,
    "topic": "2.3.2. Maniobras — categorías B1 y C1 (automóvil)",
    "title": "Maniobras B1 y C1",
    "scenario": "¿Cuál de estas maniobras debe dominar un conductor de categoría B1 o C1?",
    "options": [
      "Estacionamiento en línea, reversa en curva, cambio de sentido en espacio limitado y arranque en rampa sin que el vehículo se apague.",
      "Acoplar y desacoplar un semirremolque.",
      "Cargar mercancía con montacargas.",
      "Hacer eslalon en motocicleta."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "Las maniobras B1 y C1 incluyen arranque y detención en terreno llano y en rampa sin que el vehículo se apague, reversa en curva para estacionamiento perpendicular, cambio de sentido en espacio limitado, estacionamiento en línea e interacción con semáforo, PARE y cruce peatonal señalizado.",
    "incorrectFeedback": {
      1: "El acople y desacople de semirremolque son maniobras de vehículos articulados B3 y C3. Respuesta correcta: Estacionamiento en línea, reversa en curva, cambio de sentido en espacio limitado y arranque en rampa sin que el vehículo se apague.",
      2: "La carga con montacargas no forma parte de las maniobras de evaluación de la licencia B1 y C1. Respuesta correcta: Estacionamiento en línea, reversa en curva, cambio de sentido en espacio limitado y arranque en rampa sin que el vehículo se apague.",
      3: "El eslalon es una maniobra de motocicleta A1 y A2, no de automóvil. Respuesta correcta: Estacionamiento en línea, reversa en curva, cambio de sentido en espacio limitado y arranque en rampa sin que el vehículo se apague."
    }
  },
  {
    "id": 36,
    "topic": "2.4.1. Interacción con actores viales más vulnerables",
    "title": "Distancia a ciclistas",
    "scenario": "Vas a sobrepasar a un ciclista en una vía estrecha. ¿Cuál es la distancia lateral mínima que debes dejar?",
    "options": [
      "1,5 metros.",
      "0,5 metros.",
      "3 metros.",
      "No existe una distancia mínima."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "Al sobrepasar a un ciclista se debe dejar una distancia lateral mínima de 1,5 metros. El ciclista puede desviarse o tambalearse por el viento, las subidas o las irregularidades de la vía; no se debe pitar ni acercar el vehículo para asustarlo.",
    "incorrectFeedback": {
      1: "0,5 metros es insuficiente: el ciclista puede desviarse y ser alcanzado por el vehículo. Respuesta correcta: 1,5 metros.",
      2: "La norma colombiana fija 1,5 metros; 3 metros no es la distancia mínima exigida, aunque una separación mayor sea más segura. Respuesta correcta: 1,5 metros.",
      3: "Sí existe una distancia mínima legal: 1,5 metros. Respuesta correcta: 1,5 metros."
    }
  },
  {
    "id": 37,
    "topic": "2.4.2. Maniobras — categorías B2 y C2 (transporte de pasajeros)",
    "title": "Detención de bus",
    "scenario": "Conduces un bus de transporte de pasajeros y te aproximas a una parada para recoger personas. ¿Cuál es la maniobra segura?",
    "options": [
      "Detenerte de golpe en el carril, sin señalizar.",
      "Señalizar con anticipación, reducir la velocidad, acercarte al borde de la vía y verificar espejos y puntos ciegos antes de abrir las puertas.",
      "Abrir las puertas antes de detener el vehículo.",
      "Acelerar para pasar la parada y evitar demoras."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El conductor de transporte de pasajeros debe señalizar y reducir la velocidad con antelación, acercarse al borde de la vía, verificar espejos y puntos ciegos y solo entonces permitir el descenso, evitando detenciones bruscas en el carril.",
    "incorrectFeedback": {
      0: "Detenerse de golpe en el carril sin aviso expone a los pasajeros y a los vehículos que vienen detrás. Respuesta correcta: Señalizar con anticipación, reducir la velocidad, acercarte al borde de la vía y verificar espejos y puntos ciegos antes de abrir las puertas.",
      2: "Abrir las puertas antes de detenerse pone en riesgo a los pasajeros, que pueden caer. Respuesta correcta: Señalizar con anticipación, reducir la velocidad, acercarte al borde de la vía y verificar espejos y puntos ciegos antes de abrir las puertas.",
      3: "Pasar de largo no es una maniobra segura ni cumple el servicio; la detención debe hacerse con señalización y previsión. Respuesta correcta: Señalizar con anticipación, reducir la velocidad, acercarte al borde de la vía y verificar espejos y puntos ciegos antes de abrir las puertas."
    }
  },
  {
    "id": 38,
    "topic": "2.4.3. Maniobras — categorías B3 y C3 (vehículos articulados)",
    "title": "Acople de semirremolque",
    "scenario": "Antes de acoplar un semirremolque, ¿qué debes verificar?",
    "options": [
      "Solamente que el motor esté apagado.",
      "Que el remolque esté cargado de forma desigual.",
      "La alineación, el perno rey y la quinta rueda, las líneas de aire, la conexión eléctrica, los tacos y el seguro de acople.",
      "Nada: el acople es automático."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "El acople de semirremolque exige verificar la alineación del vehículo y el remolque, el perno rey (kingpin) y la quinta rueda, las líneas de aire, la conexión eléctrica, los tacos y el seguro de acople antes de mover el conjunto.",
    "incorrectFeedback": {
      0: "Apagar el motor no basta: el acople debe verificarse mecánica y neumáticamente para evitar que el remolque se desprenda. Respuesta correcta: La alineación, el perno rey y la quinta rueda, las líneas de aire, la conexión eléctrica, los tacos y el seguro de acople.",
      1: "Una carga mal distribuida compromete la estabilidad; antes del acople se verifica el conjunto, no se agrava el riesgo. Respuesta correcta: La alineación, el perno rey y la quinta rueda, las líneas de aire, la conexión eléctrica, los tacos y el seguro de acople.",
      3: "El acople no es automático: requiere verificación y una prueba de seguridad. Respuesta correcta: La alineación, el perno rey y la quinta rueda, las líneas de aire, la conexión eléctrica, los tacos y el seguro de acople."
    }
  },
  {
    "id": 39,
    "topic": "3. Recursos educativos digitales recomendados",
    "title": "Recursos educativos ANSV",
    "scenario": "Antes de presentar tu examen de conducción, quieres repasar con material oficial y gratuito de la ANSV. ¿Dónde puedes consultarlo?",
    "options": [
      "Solo en escuelas de conducción que cobren por el material.",
      "En publicaciones de redes sociales sin verificar la fuente.",
      "En la Escuela Virtual de Seguridad Vial de la ANSV y sus Recursos Educativos Digitales (www.ansv.gov.co/escuela).",
      "Únicamente en el manual impreso."
    ],
    "correctOptionIndex": 2,
    "correctFeedback": "La ANSV ofrece Recursos Educativos Digitales gratuitos en su Escuela Virtual de Seguridad Vial (www.ansv.gov.co/escuela), con contenidos sobre mantenimiento preventivo, técnicas de frenado, velocidades adecuadas y otros temas de seguridad vial.",
    "incorrectFeedback": {
      0: "Los recursos de la ANSV son públicos y gratuitos; no se limitan a las escuelas de conducción. Respuesta correcta: En la Escuela Virtual de Seguridad Vial de la ANSV y sus Recursos Educativos Digitales (www.ansv.gov.co/escuela).",
      1: "La información de redes sociales no es fuente oficial ni verificada; se debe acudir a la ANSV. Respuesta correcta: En la Escuela Virtual de Seguridad Vial de la ANSV y sus Recursos Educativos Digitales (www.ansv.gov.co/escuela).",
      3: "Además del manual impreso, existen recursos digitales oficiales de acceso libre. Respuesta correcta: En la Escuela Virtual de Seguridad Vial de la ANSV y sus Recursos Educativos Digitales (www.ansv.gov.co/escuela)."
    }
  },
  {
    "id": 40,
    "topic": "4. Examen teórico y práctico de conducción",
    "title": "Examen de conducción",
    "scenario": "Vas a iniciar el trámite de tu licencia de conducción y quieres saber qué te exigirán. ¿Qué se requiere en Colombia?",
    "options": [
      "Solamente pagar la tasa de trámite.",
      "Aprobar los exámenes teórico y práctico y cumplir los demás requisitos, como el certificado del CEA y el de aptitud física, mental y de coordinación motriz.",
      "Solamente demostrar que sabes conducir.",
      "Tener un vehículo propio."
    ],
    "correctOptionIndex": 1,
    "correctFeedback": "El examen teórico y práctico es requisito para obtener la licencia de conducción (artículo 19, literal c, del Código Nacional de Tránsito). Se suman saber leer y escribir, la edad mínima, el certificado del Centro de Enseñanza Automovilística y el certificado de aptitud física, mental y de coordinación motriz.",
    "incorrectFeedback": {
      0: "Pagar la tasa no otorga la licencia; se deben cumplir los requisitos y aprobar las pruebas. Respuesta correcta: Aprobar los exámenes teórico y práctico y cumplir los demás requisitos, como el certificado del CEA y el de aptitud física, mental y de coordinación motriz.",
      2: "Saber conducir no sustituye la evaluación teórica y práctica ni los certificados exigidos. Respuesta correcta: Aprobar los exámenes teórico y práctico y cumplir los demás requisitos, como el certificado del CEA y el de aptitud física, mental y de coordinación motriz.",
      3: "Tener vehículo no es un requisito para obtener la licencia. Respuesta correcta: Aprobar los exámenes teórico y práctico y cumplir los demás requisitos, como el certificado del CEA y el de aptitud física, mental y de coordinación motriz."
    }
  },
  {
    "id": 41,
    "topic": "Glosario",
    "title": "Actor vial vulnerable",
    "scenario": "Mientras estudias el manual antes de conducir, encuentras el término “actor vial vulnerable”. ¿A quiénes se refiere?",
    "options": [
      "A los usuarios con mayor probabilidad de sufrir lesiones o la muerte en un siniestro, como peatones, ciclistas y motociclistas.",
      "A cualquier conductor de un automóvil nuevo.",
      "Únicamente a los pasajeros del transporte público.",
      "Únicamente a los niños y niñas."
    ],
    "correctOptionIndex": 0,
    "correctFeedback": "El glosario y el manual definen al actor vial vulnerable como el usuario con mayor probabilidad de sufrir lesiones o la muerte en un siniestro vial; allí se ubican los peatones y los conductores de vehículos de dos ruedas, como motociclistas y ciclistas.",
    "incorrectFeedback": {
      1: "El conductor de un automóvil nuevo está protegido por la carrocería; no es la definición de actor vial vulnerable. Respuesta correcta: A los usuarios con mayor probabilidad de sufrir lesiones o la muerte en un siniestro, como peatones, ciclistas y motociclistas.",
      2: "Los pasajeros del transporte público pueden ser vulnerables en ciertos contextos, pero la definición abarca principalmente a peatones, ciclistas y motociclistas. Respuesta correcta: A los usuarios con mayor probabilidad de sufrir lesiones o la muerte en un siniestro, como peatones, ciclistas y motociclistas.",
      3: "Los niños son un grupo especialmente vulnerable, pero la categoría incluye también a peatones, ciclistas y motociclistas adultos. Respuesta correcta: A los usuarios con mayor probabilidad de sufrir lesiones o la muerte en un siniestro, como peatones, ciclistas y motociclistas."
    }
  }
];
