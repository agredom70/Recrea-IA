import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  RotateCcw,
  Check,
  LogOut,
  AlertTriangle,
  Gift,
  Smile
} from "lucide-react";
import { Recipe, RecipesData } from "../types";

interface PersonalizationFilterProps {
  userName: string;
  recipes: RecipesData;
  onSelectRecipe: (recipe: Recipe) => void;
  onResetFilter: () => void;
  preferences: { eggFree: boolean; dairyFree: boolean; nutFree: boolean };
  onExit: () => void;
}

type Step = "CRAVING" | "OCCASION" | "TIME" | "RESULTS";

// Restriction checker helper
function checkRecipeRestrictions(recipe: Recipe, prefs: { eggFree: boolean; dairyFree: boolean; nutFree: boolean }): {
  hasEgg: boolean;
  hasDairy: boolean;
  hasNuts: boolean;
  isRestricted: boolean;
  reasons: string[];
} {
  let hasEgg = false;
  let hasDairy = false;
  let hasNuts = false;
  const reasons: string[] = [];

  const allIngText = recipe.ingredients
    .flatMap(([_, list]) => list)
    .join(" ")
    .toLowerCase();

  // Egg detection
  if (
    allIngText.includes("huevo") || 
    allIngText.includes("yema") || 
    allIngText.includes("clara")
  ) {
    hasEgg = true;
    if (prefs.eggFree) reasons.push("Huevo");
  }

  // Dairy detection
  if (
    allIngText.includes("mantequilla") || 
    allIngText.includes("queso crema") || 
    allIngText.includes("crema de leche") || 
    allIngText.includes("leche") || 
    allIngText.includes("yogur") || 
    allIngText.includes("queso rallado") || 
    allIngText.includes("ghee") || 
    allIngText.includes("mascarpone")
  ) {
    const containsAnimalDairy = 
      allIngText.includes("mantequilla") || 
      allIngText.includes("queso crema") || 
      allIngText.includes("crema de leche") || 
      allIngText.includes("yogur") || 
      allIngText.includes("queso rallado") || 
      allIngText.includes("ghee") || 
      allIngText.includes("mascarpone") ||
      (/\bleche\b/.test(allIngText) && 
       !allIngText.includes("leche de coco") && 
       !allIngText.includes("leche de almendra") && 
       !allIngText.includes("leche vegetal") && 
       !allIngText.includes("leche de avena") && 
       !allIngText.includes("leche de soya"));
    
    if (containsAnimalDairy) {
      hasDairy = true;
      if (prefs.dairyFree) reasons.push("Lácteos");
    }
  }

  // Nuts detection
  if (
    allIngText.includes("almendra") || 
    allIngText.includes("nuez") || 
    allIngText.includes("nueces") || 
    allIngText.includes("avellana") || 
    allIngText.includes("pistacho") || 
    allIngText.includes("maní") || 
    allIngText.includes("mani") || 
    allIngText.includes("pecan") || 
    allIngText.includes("castaña")
  ) {
    hasNuts = true;
    if (prefs.nutFree) reasons.push("Nueces");
  }

  const isRestricted = 
    (prefs.eggFree && hasEgg) || 
    (prefs.dairyFree && hasDairy) || 
    (prefs.nutFree && hasNuts);

  return { hasEgg, hasDairy, hasNuts, isRestricted, reasons };
}

export default function PersonalizationFilter({
  userName,
  recipes,
  onSelectRecipe,
  onResetFilter,
  preferences,
  onExit
}: PersonalizationFilterProps) {
  const [currentStep, setCurrentStep] = useState<Step>("CRAVING");
  const [selectedCraving, setSelectedCraving] = useState<string | null>(null);
  const [isSpecialOccasion, setIsSpecialOccasion] = useState<boolean | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const cravingsOptions = [
    { value: "pan", label: "🥖 Pan recién horneado", desc: "Miga suave, tostadas o bollos esponjosos" },
    { value: "sweet", label: "🧁 Algo dulce", desc: "Postres cremosos, galletas o bizcochos sin azúcar" },
    { value: "savory", label: "🍕 Algo salado", desc: "Pizza familiar, quiche cremoso, empanadas o focaccias" },
    { value: "side", label: "🥗 Para acompañar", desc: "Palitos crujientes, tortillas rápidas o panes saborizados" }
  ];

  const timesOptions = [
    { value: "fast", label: "⚡ Menos de 30 min", desc: "Preparaciones rápidas y de cocción veloz" },
    { value: "medium", label: "⏱️ 30-60 min", desc: "Tiempos moderados ideales para bizcochos y tartas" },
    { value: "slow", label: "🧘 Sin apuro", desc: "Para panes fermentados que merecen su tiempo" }
  ];

  const specialKeywords = [
    "zanahoria",
    "cheesecake",
    "limón",
    "limon",
    "bagel",
    "bagels",
    "muffins",
    "selva negra",
    "brownie",
    "torta",
    "tarta"
  ];

  const handleCravingSelect = (val: string) => {
    setSelectedCraving(val);
    setCurrentStep("OCCASION"); // Goes to Step 2
  };

  const handleOccasionSelect = (special: boolean) => {
    setIsSpecialOccasion(special);
    setCurrentStep("TIME"); // Goes to Step 3
  };

  const handleTimeSelect = (val: string) => {
    setSelectedTime(val);
    setCurrentStep("RESULTS"); // Goes to Step 4
  };

  const getRecommendedRecipes = (): Recipe[] => {
    const allRecipes: { recipe: Recipe; category: string }[] = [];
    recipes.panes.forEach(r => allRecipes.push({ recipe: r, category: "panes" }));
    recipes.bases.forEach(r => allRecipes.push({ recipe: r, category: "bases" }));
    recipes.postres.forEach(r => allRecipes.push({ recipe: r, category: "postres" }));

    // Scoring or classification based on selections
    const matched = allRecipes.filter(({ recipe, category }) => {
      // 1. Craving check
      let matchesCraving = false;
      if (selectedCraving === "pan") {
        matchesCraving = category === "panes";
      } else if (selectedCraving === "sweet") {
        matchesCraving = category === "postres";
      } else if (selectedCraving === "savory") {
        matchesCraving = category === "bases";
      } else if (selectedCraving === "side") {
        matchesCraving = 
          category === "bases" || 
          recipe.name.toLowerCase().includes("romero") ||
          recipe.name.toLowerCase().includes("semilla");
      }

      // 2. Time check
      let matchesTime = false;
      const infoStr = recipe.info.join(" ").toLowerCase();
      
      const isSlowYeast = infoStr.includes("reposo") || infoStr.includes("ferment");
      const isCheesecakeOrFlan = recipe.name.toLowerCase().includes("cheesecake") || recipe.name.toLowerCase().includes("flan");
      const isFast = infoStr.includes("10 min") || infoStr.includes("15 min") || infoStr.includes("20 min") || recipe.name.toLowerCase().includes("galleta") || recipe.name.toLowerCase().includes("mousse") || recipe.name.toLowerCase().includes("tortilla");

      if (selectedTime === "fast") {
        matchesTime = !isSlowYeast && !isCheesecakeOrFlan && (isFast || infoStr.includes("prep 15") || infoStr.includes("prep 10"));
      } else if (selectedTime === "medium") {
        matchesTime = !isSlowYeast && (infoStr.includes("30 min") || infoStr.includes("40 min") || infoStr.includes("45 min") || isCheesecakeOrFlan);
      } else if (selectedTime === "slow") {
        matchesTime = isSlowYeast || isCheesecakeOrFlan || infoStr.includes("congelacion") || infoStr.includes("reposo 90") || infoStr.includes("reposo 60");
      }

      return matchesCraving && matchesTime;
    });

    let finalRecipes = matched.map(m => m.recipe);

    // Fallback if no recipes strictly matched criteria
    if (finalRecipes.length === 0) {
      if (selectedCraving === "pan") {
        finalRecipes = [...recipes.panes];
      } else if (selectedCraving === "sweet") {
        finalRecipes = [...recipes.postres];
      } else if (selectedCraving === "savory") {
        finalRecipes = [...recipes.bases];
      } else {
        finalRecipes = [...recipes.bases];
      }
    }

    // OCCASION PRIORITIZATION SCORING
    if (isSpecialOccasion) {
      finalRecipes.sort((a, b) => {
        const aIsSpecial = specialKeywords.some(kw => a.name.toLowerCase().includes(kw));
        const bIsSpecial = specialKeywords.some(kw => b.name.toLowerCase().includes(kw));
        if (aIsSpecial && !bIsSpecial) return -1;
        if (!aIsSpecial && bIsSpecial) return 1;
        return 0;
      });
    } else if (isSpecialOccasion === false) {
      finalRecipes.sort((a, b) => {
        const aIsSpecial = specialKeywords.some(kw => a.name.toLowerCase().includes(kw));
        const bIsSpecial = specialKeywords.some(kw => b.name.toLowerCase().includes(kw));
        if (aIsSpecial && !bIsSpecial) return 1;
        if (!aIsSpecial && bIsSpecial) return -1;
        return 0;
      });
    }

    // Limit to 3 choices
    return finalRecipes.slice(0, 3);
  };

  const handleReset = () => {
    setSelectedCraving(null);
    setIsSpecialOccasion(null);
    setSelectedTime(null);
    setCurrentStep("CRAVING");
    onResetFilter();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      
      {/* Banner introduction with Exit/Salir button */}
      <div className="bg-gradient-to-br from-brand-dark/15 to-black/40 border border-brand-border p-6 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-brand-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-neon" />
            Recomendador Inteligente
          </h2>
          <p className="text-xs text-brand-gray mt-1 leading-relaxed">
            Te ayudaremos a encontrar la receta perfecta para saciar tu antojo y ajustada a tu tiempo.
          </p>
        </div>

        {/* Salir Button directly on screen layout */}
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-xs text-brand-gray hover:text-red-400 bg-black/40 hover:bg-red-950/10 px-3.5 py-1.5 border border-brand-border hover:border-red-500/20 rounded-full transition-all cursor-pointer shrink-0"
          id="filter-exit-session-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Salir</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: CRAVING */}
        {currentStep === "CRAVING" && (
          <motion.div
            key="step-craving"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray font-mono text-center">
              Paso 1 de 3: ¿Qué se te antoja preparar?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cravingsOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleCravingSelect(opt.value)}
                  className="w-full p-5 text-left bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 rounded-2xl transition-all cursor-pointer flex items-center justify-between group h-full"
                  id={`craving-option-${opt.value}`}
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-brand-gray leading-normal">
                      {opt.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-gray group-hover:text-brand-neon transition-all group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: OCCASION (Ocasión especial) */}
        {currentStep === "OCCASION" && (
          <motion.div
            key="step-occasion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray font-mono text-center">
              Paso 2 de 3: ¿Es para una ocasión especial?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleOccasionSelect(true)}
                className="w-full p-5 text-left bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 rounded-2xl transition-all cursor-pointer flex items-center justify-between group h-full"
                id="occasion-option-special"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-brand-neon" />
                    <span>🎉 Sí, es para celebrar</span>
                  </h4>
                  <p className="text-xs text-brand-gray leading-normal">
                    Prioriza postres festivos, panes vistosos y tartas elaboradas.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-gray group-hover:text-brand-neon transition-all group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleOccasionSelect(false)}
                className="w-full p-5 text-left bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 rounded-2xl transition-all cursor-pointer flex items-center justify-between group h-full"
                id="occasion-option-daily"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors flex items-center gap-1.5">
                    <Smile className="w-4 h-4 text-brand-neon" />
                    <span>🏡 No, es para consumo diario</span>
                  </h4>
                  <p className="text-xs text-brand-gray leading-normal">
                    Prioriza recetas de panes básicos y bases saladas del día a día.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-gray group-hover:text-brand-neon transition-all group-hover:translate-x-1" />
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setCurrentStep("CRAVING")}
                className="text-xs text-brand-gray hover:text-brand-white font-mono cursor-pointer"
              >
                Volver a la selección de antojo
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: TIME */}
        {currentStep === "TIME" && (
          <motion.div
            key="step-time"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray font-mono text-center">
              Paso 3 de 3: ¿Cuánto tiempo tienes para cocinar hoy?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {timesOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleTimeSelect(opt.value)}
                  className="w-full p-5 text-left bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group h-full gap-3"
                  id={`time-option-${opt.value}`}
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-brand-gray leading-normal">
                      {opt.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-gray group-hover:text-brand-neon transition-all group-hover:translate-x-1 self-end" />
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setCurrentStep("OCCASION")}
                className="text-xs text-brand-gray hover:text-brand-white font-mono cursor-pointer"
              >
                Volver a la pregunta de ocasión especial
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: RESULTS */}
        {currentStep === "RESULTS" && (
          <motion.div
            key="step-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold text-brand-white tracking-tight">
                Tus recomendaciones perfectas
              </h3>
              <p className="text-sm text-brand-gray">
                Basado en tu antojo de <span className="text-brand-neon-light">{cravingsOptions.find(o => o.value === selectedCraving)?.label.split(" ").slice(1).join(" ")}</span>, {isSpecialOccasion ? "para celebrar" : "de consumo diario"} y tu tiempo disponible.
              </p>
            </div>

            <div className="space-y-4">
              {getRecommendedRecipes().map((recipe, idx) => {
                const yieldInfo = recipe.info.find(i => i.includes("Rinde")) || "";
                const timeInfo = recipe.info.find(i => i.includes("Prep") || i.includes("Horneado") || i.includes("Coccion")) || recipe.info[0];
                const restriction = checkRecipeRestrictions(recipe, preferences);

                return (
                  <div
                    key={recipe.name}
                    className={`p-6 bg-black/40 border rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative group ${
                      restriction.isRestricted
                        ? "border-brand-border/40 opacity-60 hover:opacity-100"
                        : "border-brand-border hover:border-brand-neon/30 hover:shadow-[0_0_20px_rgba(81,234,82,0.05)]"
                    }`}
                    id={`recommended-recipe-card-${idx}`}
                  >
                    <div className="space-y-2 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        {recipe.source && (
                          <span className="text-[9px] uppercase font-mono tracking-wider text-brand-neon bg-brand-dark/40 px-2.5 py-0.5 rounded border border-brand-neon/10">
                            Verificada
                          </span>
                        )}
                        <span className="text-[9px] uppercase font-mono tracking-wider text-brand-gray">
                          Estrella del catálogo
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                        {recipe.name}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-brand-gray">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-brand-neon/60" />
                          {timeInfo}
                        </span>
                        {yieldInfo && (
                          <span className="font-mono">
                            {yieldInfo}
                          </span>
                        )}
                      </div>

                      {/* Display warning badges if violating restriction */}
                      {restriction.isRestricted && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {restriction.reasons.map((reason) => (
                            <span
                              key={reason}
                              className="text-[9px] uppercase font-mono tracking-wide bg-red-950/20 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
                            >
                              <AlertTriangle className="w-2.5 h-2.5 stroke-[2.5]" />
                              <span>Contiene: {reason}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectRecipe(recipe)}
                      className="px-5 py-3 rounded-full bg-brand-dark/40 border border-brand-neon/30 text-brand-neon-light text-xs font-semibold hover:bg-brand-neon hover:text-brand-bg hover:shadow-[0_0_15px_rgba(81,234,82,0.2)] hover:border-brand-neon transition-all flex items-center gap-1 cursor-pointer w-full sm:w-auto justify-center shrink-0"
                      id={`view-recommended-recipe-btn-${idx}`}
                    >
                      <span>Ver Receta</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-border/40">
              <button
                onClick={handleReset}
                className="text-xs text-brand-gray hover:text-brand-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
                id="filter-retry-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Volver a filtrar</span>
              </button>

              <button
                onClick={handleReset}
                className="text-xs text-brand-neon hover:text-brand-neon-light transition-colors cursor-pointer font-mono"
                id="filter-catalog-btn"
              >
                Ver todo el catálogo
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
