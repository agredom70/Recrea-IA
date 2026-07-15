import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  Activity, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  LogOut
} from "lucide-react";
import { Recipe } from "../types";

interface DiagnosticWizardProps {
  preloadedRecipe: Recipe | null;
  onClearPreload: () => void;
  onNavigateToCatalog: () => void;
  recipes: { panes: Recipe[]; bases: Recipe[]; postres: Recipe[] };
  userName: string;
  onExit: () => void;
}

type StepType = "SYMPTOM" | "CONTEXT" | "QUESTIONS" | "ANALYZING" | "RESULT";

interface DiagnosticResult {
  cause: string;
  explanation: string;
  correction: string;
}

export default function DiagnosticWizard({ 
  preloadedRecipe, 
  onClearPreload, 
  onNavigateToCatalog, 
  recipes,
  userName,
  onExit
}: DiagnosticWizardProps) {
  const [currentStep, setCurrentStep] = useState<StepType>("SYMPTOM");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [contextCategory, setContextCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(preloadedRecipe);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswerValue, setSelectedAnswerValue] = useState<string | null>(null);
  
  // Final Result State
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Auto-redirect if preloadedRecipe exists
  useEffect(() => {
    if (preloadedRecipe) {
      setSelectedRecipe(preloadedRecipe);
    }
  }, [preloadedRecipe]);

  const symptoms = [
    { id: "crumble", label: "Se desmoronó", icon: "碎片", desc: "La miga quedó suelta y se rompe al cortar o morder" },
    { id: "raw", label: "Quedó cruda por dentro", icon: "💧", desc: "La corteza se doró bien pero el centro está gomoso o húmedo" },
    { id: "flat", label: "No subió", icon: "📉", desc: "Se quedó plano, denso y no se desarrolló en la fermentación" },
    { id: "hard", label: "Se puso dura muy rápido", icon: "🧱", desc: "A las pocas horas de enfriarse ya parece una piedra" },
    { id: "dense", label: "Quedó muy densa", icon: "🧲", desc: "La miga no tiene alvéolos ni esponjosidad, parece apelmazada" }
  ];

  // Logic for generating targeted questions based on selected symptom
  const getSymptomQuestions = () => {
    switch (selectedSymptom) {
      case "crumble":
        return {
          text: "¿Cuánto psyllium husk o goma xantana utilizaste en la preparación?",
          options: [
            {
              label: "Ninguno / Olvidé agregarlo",
              value: "none",
              cause: "falta absoluta de aglutinante estructural",
              explanation: "En la panificación sin gluten no contamos con la red elástica que aporta el trigo. El psyllium husk o la goma xantana actúan como el pegamento indispensable que retiene el gas y une los almidones para formar una miga estable.",
              correction: "Utiliza siempre psyllium husk de buena calidad de forma obligatoria en masas de panadería. Asegúrate de mezclarlo primero con los secos antes de incorporar el agua tibia para evitar grumos."
            },
            {
              label: "Menos de 5 gramos",
              value: "low",
              cause: "dosis insuficiente de aglutinante para la proporción de harinas",
              explanation: "Una cantidad muy baja de aglutinante no logra absorber el agua necesaria ni dar elasticidad suficiente a la masa, haciendo que al evaporarse el agua en el horno la estructura colapse y se fracture.",
              correction: "Ajusta la dosis a unos 6g - 9g de psyllium husk (o 3g - 5g de goma xantana) por cada 250g - 300g de harinas y almidones según indique la receta exacta."
            },
            {
              label: "Más de 10 gramos",
              value: "high",
              cause: "exceso de aglutinante con hidratación insuficiente",
              explanation: "El exceso de psyllium husk o xantana absorbe demasiada agua libre y endurece de más el gel elástico. Esto impide que la masa se estire uniformemente con los gases del horneado, volviéndose quebradiza y seca.",
              correction: "Sigue estrictamente las cantidades del catálogo. El psyllium husk se debe pesar con balanza de precisión digital, ya que una diferencia de solo 2 gramos cambia drásticamente la textura."
            }
          ]
        };
      case "flat":
        return {
          text: "¿Cómo preparaste o verificaste tu levadura antes de amasar?",
          options: [
            {
              label: "La agregué directa sin activar / No sé si estaba activa",
              value: "no_activation",
              cause: "levadura inactiva o temperatura incorrecta del líquido",
              explanation: "La levadura seca es un hongo vivo. Si se expone a líquidos demasiado calientes (más de 42°C) muere de inmediato, y si la levadura estaba vencida o guardada con humedad, perderá toda potencia para fermentar.",
              correction: "Realiza siempre un prefermento: disuelve la levadura seca en agua tibia (35-38°C) con una cucharadita de endulzante o harina, y espera 10 minutos hasta ver espuma abundante antes de verterla sobre los secos."
            },
            {
              label: "La activé bien y espumó, pero aun así no creció en el molde",
              value: "cold_env",
              cause: "temperatura ambiente de reposo demasiado fría",
              explanation: "Las masas sin gluten no tienen gluten para retener gases indefinidamente, y el frío ralentiza el crecimiento. Si el levado tarda más de la cuenta por frío, la masa puede colapsar antes de entrar al horno.",
              correction: "Ofrece a la masa un ambiente templado de unos 24-28°C para levar. Un truco excelente es colocar la masa dentro del horno apagado con la luz encendida, o junto a una taza de agua caliente para crear humedad."
            }
          ]
        };
      case "dense":
        return {
          text: "¿Cómo sentiste la consistencia de la masa al momento de moldear?",
          options: [
            {
              label: "Estaba rígida, seca y se agrietaba (como plastilina vieja)",
              value: "dry",
              cause: "falta de hidratación o exceso de harina absorbente",
              explanation: "Las harinas sin gluten (avena, sarraceno, quinoa) absorben muchísimo más líquido que el trigo. Si dejas la masa rígida o agregas más harina 'para que no se pegue', la miga resultará extremadamente compacta, seca y pesada.",
              correction: "No agregues más harina de la indicada en la receta. Las masas sin gluten deben ser húmedas, blandas y un tanto pegajosas. Humedece tus manos con agua o aceite para manipularlas en vez de empolvarlas."
            },
            {
              label: "Estaba muy líquida y blanda, pero seguí la receta exacta",
              value: "no_rest",
              cause: "falta de tiempo para hidratación de fibras en reposo",
              explanation: "El psyllium husk tarda entre 5 y 10 minutos en hidratarse por completo y formar el gel estructural. Si moldeas u horneas la preparación inmediatamente después de mezclar, los líquidos quedarán sueltos y la miga se apelmazará.",
              correction: "Asegúrate de respetar el reposo inicial de 10 minutos una vez incorporados los líquidos. Notarás cómo la masa espesa sola por arte de magia gracias al gel aglutinante."
            }
          ]
        };
      case "raw":
        return {
          text: "¿Precalentaste el horno y cuánto tiempo dejaste enfriar la pieza antes de cortarla?",
          options: [
            {
              label: "No precalenté bien / Corté el pan caliente recién salido del horno",
              value: "cut_hot",
              cause: "colapso de vapor interno por corte prematuro",
              explanation: "El pan sin gluten sigue cocinándose internamente después de salir del horno con el calor residual. Al cortarlo caliente, el vapor acumulado se escapa instantáneamente, colapsando los alvéolos calientes y compactando la miga hasta dejarla gomosa con apariencia de cruda.",
              correction: "Coloca siempre el pan sobre una rejilla metálica para que circule aire por debajo y déjalo enfriar completamente por 2 horas antes de realizar el primer corte."
            },
            {
              label: "Precalenté y dejé enfriar, pero el centro seguía apelmazado",
              value: "bad_oven",
              cause: "temperatura interna del horno deficiente o cocción corta",
              explanation: "La panificación sin gluten retiene más humedad que el pan de trigo y requiere un calor constante. Si tu horno calienta menos de lo que indica la perilla, la corteza se dorará por fuera pero el centro no llegará a evaporar el agua excedente.",
              correction: "Considera usar un termómetro metálico para horno. Si notas que dora muy rápido, cubre el pan con papel aluminio los últimos 15 minutos para prolongar la cocción central sin quemar la superficie."
            }
          ]
        };
      case "hard":
        return {
          text: "¿Cómo almacenaste la preparación una vez que se enfrió por completo?",
          options: [
            {
              label: "La dejé al aire libre en un plato o en la heladera sin tapar",
              value: "exposed",
              cause: "deshidratación acelerada y cristalización del almidón",
              explanation: "Sin el gluten para retener la humedad celular, los almidones sin gluten sufren de retrogradación acelerada. El aire seco a temperatura ambiente o el frío de la heladera extraen la humedad residual de la miga convirtiéndola en piedra rápidamente.",
              correction: "Almacena tu pan frío en una bolsa de plástico hermética o envuelto firmemente en film a temperatura ambiente por 2-3 días. ¡Nunca lo guardes en la heladera! Para guardarlo más tiempo, rebánalo y congélalo."
            },
            {
              label: "La guardé en bolsa cerrada, pero al día siguiente ya estaba seca",
              value: "fat_free",
              cause: "falta de lípidos o humectantes naturales en la masa",
              explanation: "Las masas magras (agua + harinas + sal) se endurecen muy rápido. La grasa actúa como un suavizante natural que encapsula los almidones y retrasa el endurecimiento de la miga.",
              correction: "Para panes más duraderos, prefiere recetas que lleven un porcentaje de grasas saludables como huevos, aceite de oliva o yogur griego, los cuales actúan como conservantes físicos naturales de humedad."
            }
          ]
        };
      default:
        return null;
    }
  };

  const handleSymptomSelect = (id: string) => {
    setSelectedSymptom(id);
    if (preloadedRecipe) {
      setCurrentStep("QUESTIONS");
    } else {
      setCurrentStep("CONTEXT");
    }
  };

  const handleCategorySelect = (category: string) => {
    setContextCategory(category);
    setSelectedRecipe(null); // Clear specific recipe since we chose general category
    setCurrentStep("QUESTIONS");
  };

  const handleRecipeSelectFromList = (recipeName: string) => {
    const allRecipes = [...recipes.panes, ...recipes.bases, ...recipes.postres];
    const found = allRecipes.find(r => r.name === recipeName);
    if (found) {
      setSelectedRecipe(found);
      setCurrentStep("QUESTIONS");
    }
  };

  const handleAnswerSelect = (option: any) => {
    setSelectedAnswerValue(option.value);
    setResult({
      cause: option.cause,
      explanation: option.explanation,
      correction: option.correction
    });
  };

  const handleQuestionSubmit = () => {
    if (!selectedAnswerValue) return;
    
    // Switch to analyzing animation step
    setCurrentStep("ANALYZING");
    
    // Simulate analyzing for 3 seconds as requested in guidelines
    setTimeout(() => {
      setCurrentStep("RESULT");
    }, 3000);
  };

  const handleReset = () => {
    setSelectedSymptom(null);
    setContextCategory(null);
    setSelectedAnswerValue(null);
    setResult(null);
    setQuestionIndex(0);
    if (!preloadedRecipe) {
      setSelectedRecipe(null);
    }
    setCurrentStep("SYMPTOM");
  };

  // Compile list of recipes matching current category if chosen
  const getCategoryRecipes = () => {
    if (contextCategory === "panes") return recipes.panes;
    if (contextCategory === "bases") return recipes.bases;
    if (contextCategory === "postres") return recipes.postres;
    return [];
  };

  const activeQuestion = getSymptomQuestions();

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between gap-4 bg-gradient-to-br from-brand-dark/15 to-black/40 border border-brand-border p-6 rounded-[24px]">
        <div>
          <h2 className="text-lg font-bold text-brand-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-brand-neon animate-pulse" />
            Asistente de Diagnóstico de Fallos
          </h2>
          <p className="text-xs text-brand-gray mt-1 leading-relaxed">
            Resuelve problemas técnicos de texturas, levaduras y horneado de tus recetas.
          </p>
        </div>

        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-xs text-brand-gray hover:text-red-400 bg-black/40 hover:bg-red-950/10 px-3.5 py-1.5 border border-brand-border hover:border-red-500/20 rounded-full transition-all cursor-pointer shrink-0"
          id="diagnostic-exit-session-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Salir</span>
        </button>
      </div>

      {/* Preloaded context banner if active */}
      {preloadedRecipe && currentStep !== "RESULT" && (
        <div className="bg-brand-dark/20 border border-brand-neon/20 px-5 py-3 rounded-full flex items-center justify-between text-xs text-brand-neon-light">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
            Diagnóstico enfocado en: <strong>{preloadedRecipe.name}</strong>
          </span>
          <button 
            onClick={onClearPreload}
            className="text-brand-gray hover:text-brand-white text-[10px] uppercase font-mono cursor-pointer"
          >
            [Limpiar contexto]
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SYMPTOM SELECTION */}
        {currentStep === "SYMPTOM" && (
          <motion.div
            key="step-symptom"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold tracking-tight text-brand-white">
                {userName ? `Vamos a averiguar qué pasó, ${userName}` : "Vamos a averiguar qué pasó"}
              </h3>
              <p className="text-sm text-brand-gray">
                Selecciona el síntoma principal que describe el inconveniente en tu última preparación sin gluten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
              {symptoms.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSymptomSelect(s.id)}
                  className="bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 p-6 rounded-[24px] text-center transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(81,234,82,0.05)] text-left"
                  id={`symptom-card-${s.id}`}
                >
                  <div className="space-y-4">
                    <div className="text-4xl bg-brand-dark/30 w-14 h-14 rounded-2xl flex items-center justify-center border border-brand-border/60 group-hover:border-brand-neon/30 mx-auto transition-colors font-sans">
                      {s.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors text-center">
                        {s.label}
                      </h4>
                      <p className="text-[11px] text-brand-gray text-center leading-normal">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-center text-xs text-brand-gray group-hover:text-brand-neon font-mono gap-1 transition-colors">
                    <span>Analizar</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: CONTEXT DEFINITION (ONLY IF NOT PRELOADED) */}
        {currentStep === "CONTEXT" && (
          <motion.div
            key="step-context"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 max-w-xl mx-auto"
          >
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold tracking-tight text-brand-white">
                ¿Qué preparación estabas haciendo?
              </h3>
              <p className="text-sm text-brand-gray">
                Ayúdanos a entender el contexto de la receta para darte un diagnóstico más preciso.
              </p>
            </div>

            {/* Category selection */}
            <div className="grid grid-cols-3 gap-3">
              {["panes", "bases", "postres"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="py-4 px-3 bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer text-brand-white font-mono hover:text-brand-neon"
                >
                  {cat === "panes" ? "🥐 Panes" : cat === "bases" ? "🍕 Bases" : "🧁 Postres"}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-border/40"></div></div>
              <span className="relative bg-brand-bg px-4 text-[10px] text-brand-gray uppercase font-mono">o selecciona la receta exacta</span>
            </div>

            {/* Direct Recipe select */}
            <div className="space-y-2">
              <select
                onChange={(e) => handleRecipeSelectFromList(e.target.value)}
                defaultValue=""
                className="w-full p-4 bg-black/60 border border-brand-border rounded-2xl text-brand-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon text-sm"
                id="context-recipe-select"
              >
                <option value="" disabled>Selecciona una de las 29 recetas...</option>
                <optgroup label="Panes">
                  {recipes.panes.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Bases">
                  {recipes.bases.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Postres">
                  {recipes.postres.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setCurrentStep("SYMPTOM")}
                className="text-xs text-brand-gray hover:text-brand-white cursor-pointer font-mono"
              >
                Volver al paso anterior
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: GUIDED DIAGNOSTIC QUESTIONS */}
        {currentStep === "QUESTIONS" && activeQuestion && (
          <motion.div
            key="step-questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="space-y-1 text-center">
              <div className="text-xs uppercase font-mono tracking-widest text-brand-neon">
                Paso 3: Diagnóstico Dirigido
              </div>
              <h3 className="text-xl font-bold tracking-tight text-brand-white">
                {activeQuestion.text}
              </h3>
            </div>

            <div className="space-y-3">
              {activeQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswerSelect(opt)}
                  className={`w-full p-5 text-left rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedAnswerValue === opt.value
                      ? "bg-brand-dark/30 border-brand-neon text-brand-white shadow-[0_0_15px_rgba(81,234,82,0.1)]"
                      : "bg-black/40 border-brand-border hover:border-brand-border/80 text-brand-gray hover:text-brand-white"
                  }`}
                  id={`diagnostic-option-${opt.value}`}
                >
                  <span className="text-sm font-medium leading-relaxed">{opt.label}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4 ${
                    selectedAnswerValue === opt.value
                      ? "border-brand-neon bg-brand-neon text-brand-bg"
                      : "border-brand-border group-hover:border-brand-gray"
                  }`}>
                    {selectedAnswerValue === opt.value && (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleReset}
                className="text-xs text-brand-gray hover:text-brand-white cursor-pointer"
              >
                Volver a empezar
              </button>

              <button
                onClick={handleQuestionSubmit}
                disabled={!selectedAnswerValue}
                className={`py-3.5 px-6 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedAnswerValue
                    ? "bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg hover:shadow-[0_0_20px_rgba(81,234,82,0.3)]"
                    : "bg-brand-border/40 text-brand-gray/60 cursor-not-allowed"
                }`}
                id="diagnostic-submit-btn"
              >
                <span>Generar Diagnóstico</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: ANALYZING ANIMATION */}
        {currentStep === "ANALYZING" && (
          <motion.div
            key="step-analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center space-y-8"
          >
            <div className="relative">
              {/* Spinning / Pulsing Glow Ring */}
              <div className="w-24 h-24 rounded-full border-4 border-brand-border flex items-center justify-center relative">
                <Compass className="w-10 h-10 text-brand-neon animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <div className="absolute inset-0 rounded-full bg-brand-neon/15 blur-lg animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-brand-white tracking-wide">
                Analizando tu caso culinario...
              </h3>
              <div className="text-xs font-mono text-brand-neon space-y-1 h-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                >
                  Revisando proporción de ingredientes...
                </motion.p>
              </div>
              <p className="text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                Cruzamos tu síntoma con los errores más recurrentes de panadería sin gluten.
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 5: DIAGNOSTIC RESULT */}
        {currentStep === "RESULT" && result && (
          <motion.div
            key="step-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Success Validation Header */}
            <div className="bg-brand-dark/10 border border-brand-neon/20 p-6 rounded-[24px] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-10 h-10 rounded-full bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-white leading-tight">
                No fue que lo hicieras mal — fue <span className="text-brand-neon-light">{result.cause}</span>.
              </h3>
              <p className="text-xs text-brand-gray leading-relaxed">
                Este es uno de los desajustes físicos y técnicos más comunes cuando transitamos de la panadería tradicional a la repostería sin gluten.
              </p>
            </div>

            {/* Explanations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Technical explanation */}
              <div className="bg-black/40 border border-brand-border p-5 rounded-[20px] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray font-mono">
                  ¿Por qué ocurrió esto?
                </h4>
                <p className="text-xs text-brand-white/90 leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Actionable correction */}
              <div className="bg-brand-dark/20 border border-brand-neon/10 p-5 rounded-[20px] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-neon font-mono">
                  Cómo solucionarlo para el próximo intento
                </h4>
                <p className="text-xs text-brand-white/95 leading-relaxed">
                  {result.correction}
                </p>
              </div>
            </div>

            {/* Back action / navigation CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-border/40">
              <button
                onClick={handleReset}
                className="text-xs text-brand-gray hover:text-brand-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
                id="diagnostic-retry-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Analizar otro problema</span>
              </button>

              <button
                onClick={onNavigateToCatalog}
                className="py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg font-bold text-xs hover:shadow-[0_0_20px_rgba(81,234,82,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
                id="diagnostic-view-corrected-recipe-btn"
              >
                <span>Ver receta corregida</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
