import { useState } from "react";
import { Recipe } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  HelpCircle, 
  AlertTriangle, 
  MessageSquare, 
  Wind, 
  Box, 
  Sparkles,
  CheckCircle2,
  LogOut,
  ShoppingCart,
  X,
  Plus,
  Minus
} from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAskChef: (recipe: Recipe) => void;
  onTroubleshoot: (recipe: Recipe) => void;
  onExit: () => void;
}

// Helpers for portions scaling and list of shopping
function parseBaseYield(yieldStr: string): { min: number; max: number; label: string } {
  const cleanStr = yieldStr.replace(/Rinde\s+/i, "").trim();
  const rangeMatch = cleanStr.match(/^(\d+)\s*-\s*(\d+)\s*(.*)$/);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1], 10),
      max: parseInt(rangeMatch[2], 10),
      label: rangeMatch[3] || "porciones"
    };
  }
  const singleMatch = cleanStr.match(/^(\d+)\s*(.*)$/);
  if (singleMatch) {
    const num = parseInt(singleMatch[1], 10);
    return {
      min: num,
      max: num,
      label: singleMatch[2] || "porciones"
    };
  }
  return { min: 8, max: 10, label: "porciones" };
}

function scaleNumberInText(text: string, multiplier: number): string {
  if (multiplier === 1) return text;
  
  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    const rounded = Math.round(num * 100) / 100;
    return rounded.toString();
  };

  let result = text;

  // Replace fractions (e.g. 1/2, 3/4)
  result = result.replace(/(\d+)\/(\d+)/g, (match, numStr, denStr) => {
    const num = parseInt(numStr, 10);
    const den = parseInt(denStr, 10);
    const val = (num / den) * multiplier;
    return formatNumber(val);
  });

  // Replace decimal or integer numbers
  result = result.replace(/(\d+(?:\.\d+)?)/g, (match, p1, offset) => {
    const numValue = parseFloat(match);
    const rest = text.substring(offset + match.length);
    const isTemperature = /^\s*[-–]?\s*\d*\s*(?:C|°C|°|celsius)/i.test(rest);
    const isDimension = /^\s*x\s*\d+/i.test(rest) || /^\s*cm/i.test(rest);
    const isRating = /^\s*\/\s*\d+/i.test(rest) || /^\s*votos/i.test(rest);
    const isPercentage = /^\s*%/i.test(rest);
    
    if (isTemperature || isDimension || isRating || isPercentage) {
      return match;
    }
    
    return formatNumber(numValue * multiplier);
  });

  return result;
}

function getSimplifiedIngredient(ingStr: string): string {
  let clean = ingStr.replace(/^\d+(?:\.\d+)?\s*(?:\/\s*\d+)?\s*(?:g|ml|cdta|cdtas|cda|cdas|taza|tazas|pieza|piezas|unidad|unidades|huevos|huevo|paquete|paquetes)?\s*(?:de|del)?\s*/i, "");
  clean = clean.replace(/\s*\([^)]*\)/g, "");
  clean = clean.trim();
  if (clean) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  }
  return clean;
}

export default function RecipeDetail({ recipe, onBack, onAskChef, onTroubleshoot, onExit }: RecipeDetailProps) {
  const yieldInfo = recipe.info.find(i => i.includes("Rinde")) || "Rinde 8 porciones";
  const moldInfo = recipe.info.find(i => i.includes("Molde")) || "";
  const timesInfo = recipe.info.filter(i => !i.includes("Rinde") && !i.includes("Molde"));

  // Escalador states
  const baseYield = parseBaseYield(yieldInfo);
  const baseMax = baseYield.max;
  const [desiredYield, setDesiredYield] = useState<number>(baseMax);
  const multiplier = desiredYield / baseMax;

  // Shopping List states
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isSimplifiedView, setIsSimplifiedView] = useState(true);

  const scaledMin = Math.round(baseYield.min * multiplier);
  const scaledMax = Math.round(baseYield.max * multiplier);
  const rangeText = scaledMin === scaledMax ? `${scaledMax}` : `${scaledMin}-${scaledMax}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Back navigation and Exit Session bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-neon transition-colors cursor-pointer"
          id="recipe-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo</span>
        </button>

        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-xs text-brand-gray hover:text-red-400 bg-black/40 hover:bg-red-950/10 px-4 py-2 border border-brand-border hover:border-red-500/20 rounded-full transition-all cursor-pointer"
          id="recipe-exit-session-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Salir de la sesión</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-dark/20 to-black/60 border border-brand-border p-6 md:p-8 rounded-[28px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            {recipe.source && (
              <span className="text-[10px] uppercase tracking-wider bg-brand-dark/80 text-brand-neon border border-brand-neon/20 px-3 py-1 rounded-full font-mono">
                {recipe.source}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wider bg-brand-border/40 text-brand-white px-3 py-1 rounded-full font-mono">
              Receta Verificada
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-white">
            {recipe.name}
          </h2>

          <p className="text-brand-gray text-base max-w-2xl leading-relaxed">
            {recipe.intro}
          </p>

          {/* Key details grids */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-border/50">
            {timesInfo.map((timeStr, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-brand-white font-mono">
                <Clock className="w-4 h-4 text-brand-neon" />
                <span>{timeStr}</span>
              </div>
            ))}
            {yieldInfo && (
              <div className="flex items-center gap-2 text-xs text-brand-white font-mono">
                <Users className="w-4 h-4 text-brand-neon" />
                <span>Rinde {rangeText} {baseYield.label}</span>
              </div>
            )}
            {moldInfo && (
              <div className="flex items-center gap-2 text-xs text-brand-white font-mono col-span-2 sm:col-span-1">
                <Box className="w-4 h-4 text-brand-neon" />
                <span className="truncate">{moldInfo}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Ingredients + Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ingredients Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-black/40 border border-brand-border p-6 rounded-[24px] space-y-6">
            <h3 className="text-lg font-bold text-brand-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-neon rounded-full" />
              Ingredientes
            </h3>

            {/* ESCALADOR DE PORCIONES */}
            <div className="p-4 bg-black/40 border border-brand-border/60 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-gray font-mono">PORCIONES DESEADAS</span>
                {multiplier !== 1 && (
                  <span className="text-[9px] uppercase font-mono tracking-wider text-brand-neon bg-brand-dark/40 px-2 py-0.5 rounded border border-brand-neon/20">
                    {multiplier.toFixed(1)}x
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDesiredYield(prev => Math.max(1, prev - (baseMax >= 10 ? 2 : 1)))}
                    className="w-8 h-8 rounded-full border border-brand-border bg-black/40 text-brand-white hover:border-brand-neon hover:text-brand-neon flex items-center justify-center cursor-pointer transition-all disabled:opacity-30"
                    disabled={desiredYield <= 1}
                    id="portion-decrement"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-brand-white min-w-[70px] text-center font-mono">
                    {rangeText}
                  </span>
                  <button
                    onClick={() => setDesiredYield(prev => Math.min(100, prev + (baseMax >= 10 ? 2 : 1)))}
                    className="w-8 h-8 rounded-full border border-brand-border bg-black/40 text-brand-white hover:border-brand-neon hover:text-brand-neon flex items-center justify-center cursor-pointer transition-all"
                    id="portion-increment"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-brand-gray font-sans truncate">
                  {baseYield.label}
                </span>
              </div>
            </div>

            {/* LISTA DE COMPRAS TRIGGER */}
            <button
              onClick={() => setIsShoppingListOpen(true)}
              className="w-full py-3 bg-brand-neon/10 hover:bg-brand-neon border border-brand-neon/20 hover:border-brand-neon text-brand-neon-light hover:text-brand-bg font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(81,234,82,0.03)]"
              id="view-shopping-list-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ver Lista de Compras</span>
            </button>

            {recipe.ingredients.map(([group, list], idx) => (
              <div key={idx} className="space-y-3 pt-2 border-t border-brand-border/20 first:border-t-0 first:pt-0">
                {group && (
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-brand-neon-light font-mono">
                    {group}
                  </h4>
                )}
                <ul className="space-y-2.5">
                  {list.map((ing, ingIdx) => (
                    <li key={ingIdx} className="flex items-start gap-2.5 text-sm text-brand-white/90 leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-brand-neon/60 mt-0.5 shrink-0" />
                      <span>{scaleNumberInText(ing, multiplier)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {recipe.sugar_note && (
              <div className="pt-4 border-t border-brand-border/20 text-xs text-brand-neon-light bg-brand-dark/20 p-3.5 rounded-xl border border-brand-neon/20 leading-relaxed font-sans">
                {recipe.sugar_note}
              </div>
            )}
          </div>

          {/* Conservation Info */}
          {recipe.storage && (
            <div className="bg-brand-dark/10 border border-brand-border/60 p-6 rounded-[24px] space-y-3">
              <h4 className="text-sm font-bold text-brand-white flex items-center gap-2">
                <Box className="w-4 h-4 text-brand-neon" />
                Conservación
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                {recipe.storage}
              </p>
            </div>
          )}
        </div>

        {/* Steps Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-black/40 border border-brand-border p-6 rounded-[24px] space-y-6">
            <h3 className="text-lg font-bold text-brand-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-neon rounded-full" />
              Preparación paso a paso
            </h3>

            <div className="space-y-6">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start relative group">
                  {/* Decorative timeline line */}
                  {idx < recipe.steps.length - 1 && (
                    <div className="absolute left-4.5 top-9 bottom-[-16px] w-0.5 bg-brand-border/30 group-hover:bg-brand-neon/10 transition-colors" />
                  )}
                  
                  {/* Step number badge */}
                  <div className="w-9 h-9 rounded-full bg-brand-dark/50 border border-brand-neon/30 flex items-center justify-center text-xs font-mono text-brand-neon font-bold shrink-0 shadow-[0_0_15px_rgba(81,234,82,0.05)]">
                    {idx + 1}
                  </div>
                  
                  <div className="space-y-1 pt-1.5">
                    <p className="text-sm text-brand-white/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip and Personalization section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.tip && (
              <div className="bg-brand-dark/20 border border-brand-neon/10 p-5 rounded-[20px] space-y-2 relative">
                <div className="absolute top-4 right-4 text-brand-neon/20">
                  <ChefHat className="w-12 h-12 stroke-[1]" />
                </div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-brand-neon font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tip del Chef
                </h4>
                <p className="text-xs text-brand-white/90 leading-relaxed relative z-10">
                  {recipe.tip}
                </p>
              </div>
            )}

            {recipe.personalize && (
              <div className="bg-brand-dark/10 border border-brand-border p-5 rounded-[20px] space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-brand-neon-light font-bold">
                  Sugerencias de Personalización
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {recipe.personalize}
                </p>
              </div>
            )}
          </div>

          {/* Air Fryer Version if available */}
          {recipe.airfryer && recipe.airfryer !== "No aplica -- se cocina en sarten." && (
            <div className="bg-black/30 border border-brand-border p-6 rounded-[24px] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon-light/2 rounded-full blur-[40px] pointer-events-none" />
              <h4 className="text-sm font-bold text-brand-white flex items-center gap-2">
                <Wind className="w-4 h-4 text-brand-neon" />
                Versión en Freidora de Aire (Air Fryer)
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                {recipe.airfryer}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Support / Assistant CTAs banner */}
      <div className="border border-brand-border bg-black/60 p-6 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/5 to-transparent pointer-events-none" />
        
        <div className="space-y-1 relative z-10 text-center md:text-left">
          <h4 className="text-lg font-bold text-brand-white tracking-tight">
            ¿Tienes dudas o la preparación no salió perfecta?
          </h4>
          <p className="text-xs text-brand-gray">
            Te ofrecemos soporte técnico inmediato para que amases con total confianza.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0 relative z-10 justify-center">
          <button
            onClick={() => onTroubleshoot(recipe)}
            className="px-5 py-3 rounded-full bg-brand-dark/40 border border-brand-neon/30 text-brand-neon-light text-xs font-semibold hover:bg-brand-dark/60 hover:shadow-[0_0_15px_rgba(81,234,82,0.1)] transition-all cursor-pointer flex items-center gap-1.5"
            id="recipe-troubleshoot-btn"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>¿No salió como esperabas?</span>
          </button>

          <button
            onClick={() => onAskChef(recipe)}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg text-xs font-bold hover:shadow-[0_0_20px_rgba(81,234,82,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
            id="recipe-ask-chef-btn"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Preguntar al Chef IA</span>
          </button>
        </div>
      </div>

      {/* SHOPPING LIST MODAL */}
      <AnimatePresence>
        {isShoppingListOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShoppingListOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-brand-bg border border-brand-border p-6 rounded-[28px] relative z-10 shadow-[0_0_50px_rgba(81,234,82,0.1)] flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-dark/40 border border-brand-neon/20 flex items-center justify-center text-brand-neon">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-white font-sans">
                      Lista de Compras
                    </h3>
                    <p className="text-[10px] text-brand-gray font-mono">
                      Ingredientes para {rangeText} {baseYield.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsShoppingListOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-border/30 text-brand-gray hover:text-brand-white transition-colors cursor-pointer"
                  id="close-shopping-list-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* View toggle */}
              <div className="my-4 bg-black/40 border border-brand-border/60 p-1 rounded-full flex items-center">
                <button
                  onClick={() => setIsSimplifiedView(true)}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
                    isSimplifiedView
                      ? "bg-brand-neon text-brand-bg"
                      : "text-brand-gray hover:text-brand-white"
                  }`}
                  id="shopping-list-simplified-toggle"
                >
                  Supermercado (Súper)
                </button>
                <button
                  onClick={() => setIsSimplifiedView(false)}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
                    !isSimplifiedView
                      ? "bg-brand-neon text-brand-bg"
                      : "text-brand-gray hover:text-brand-white"
                  }`}
                  id="shopping-list-exact-toggle"
                >
                  Cantidades Escaladas
                </button>
              </div>

              {/* Ingredients Scroll Flow */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2 text-left">
                {recipe.ingredients.map(([group, list], idx) => (
                  <div key={idx} className="space-y-2">
                    {group && (
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-neon font-mono">
                        {group}
                      </h4>
                    )}
                    <ul className="space-y-2">
                      {list.map((ing, ingIdx) => {
                        const displayText = isSimplifiedView
                          ? getSimplifiedIngredient(ing)
                          : scaleNumberInText(ing, multiplier);
                        
                        return (
                          <li
                            key={ingIdx}
                            className="flex items-center gap-3 text-sm text-brand-white/90 border-b border-brand-border/10 pb-2 last:border-0"
                          >
                            <input
                              type="checkbox"
                              className="w-4.5 h-4.5 rounded border-brand-border bg-black/40 text-brand-neon focus:ring-0 focus:ring-offset-0 cursor-pointer accent-brand-neon shrink-0"
                            />
                            <span className="font-sans leading-snug">{displayText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer notice (No export elements, as requested) */}
              <div className="pt-4 border-t border-brand-border/40 mt-4 text-center shrink-0">
                <p className="text-[10px] text-brand-gray leading-normal font-mono">
                  Lleva tu móvil al supermercado para marcar ingredientes comprados.
                </p>
                <button
                  onClick={() => setIsShoppingListOpen(false)}
                  className="w-full mt-3 py-3 bg-brand-dark/40 hover:bg-brand-dark/80 border border-brand-border/80 hover:border-brand-neon/60 text-brand-white text-xs font-bold rounded-full transition-all cursor-pointer"
                  id="shopping-list-done-btn"
                >
                  Volver a la receta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
