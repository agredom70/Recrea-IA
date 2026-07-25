import { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Search, 
  Clock, 
  HelpCircle, 
  CheckCircle,
  Pizza,
  Cake,
  Croissant,
  ChevronRight,
  LogOut,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import { Recipe, RecipesData } from "../types";

interface CatalogProps {
  recipes: RecipesData;
  userName: string;
  onSelectRecipe: (recipe: Recipe) => void;
  onTriggerFilter: () => void;
  preferences: { eggFree: boolean; dairyFree: boolean; nutFree: boolean };
  onExit: () => void;
}

type CategoryType = "panes" | "bases" | "postres";

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

export default function Catalog({
  recipes,
  userName,
  onSelectRecipe,
  onTriggerFilter,
  preferences,
  onExit
}: CatalogProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>("panes");
  const [searchQuery, setSearchQuery] = useState("");
  const [hideRestricted, setHideRestricted] = useState(false);

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case "panes":
        return <Croissant className="w-5 h-5 text-brand-neon" />;
      case "bases":
        return <Pizza className="w-5 h-5 text-brand-neon" />;
      case "postres":
        return <Cake className="w-5 h-5 text-brand-neon" />;
    }
  };

  const currentList = recipes[activeTab];

  // Filtering based on search query AND preferences if hideRestricted is checked
  const filteredRecipes = currentList.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some(([_, list]) => list.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (hideRestricted) {
      const restriction = checkRecipeRestrictions(r, preferences);
      return !restriction.isRestricted;
    }

    return true;
  });

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Info & Welcome banner */}
      <div className="bg-gradient-to-br from-brand-dark/15 to-black/40 border border-brand-border p-6 md:p-8 rounded-[28px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-neon-light flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-brand-neon" />
              {userName ? `Hola ${userName}, esto es lo que vamos a disfrutar juntos` : "Hola, esto es lo que vamos a disfrutar juntos"}
            </div>
            
            {/* Salir Button directly on screen layout */}
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-xs text-brand-gray hover:text-red-400 bg-black/40 hover:bg-red-950/10 px-3.5 py-1.5 border border-brand-border hover:border-red-500/20 rounded-full transition-all cursor-pointer self-start sm:self-auto"
              id="catalog-exit-session-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir de la sesión</span>
            </button>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-white tracking-tight">
            Chef IA ReCrea<span className="text-brand-neon">™</span>
          </h2>

          <p className="text-brand-gray text-xs md:text-sm max-w-3xl leading-relaxed">
            29 recetas desarrolladas y verificadas con la técnica correcta de panificación sin gluten, para que amasar y hornear deje de ser una apuesta. Selecciona una preparación para ver cantidades, pasos detallados, tips de conservación y versión en freidora de aire.
          </p>
        </div>
      </div>

      {/* Navigation Tools & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Categories Tab Selector */}
        <div className="flex flex-wrap bg-black/60 border border-brand-border p-1.5 rounded-3xl sm:rounded-full self-start gap-1">
          {(["panes", "bases", "postres"] as CategoryType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery("");
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-brand-neon text-brand-bg shadow-[0_0_15px_rgba(81,234,82,0.25)]"
                  : "text-brand-gray hover:text-brand-white hover:bg-brand-dark/20"
              }`}
              id={`tab-selector-${tab}`}
            >
              {getCategoryIcon(tab)}
              <span>{tab === "panes" ? "Panes (10)" : tab === "bases" ? "Bases (8)" : "Postres (11)"}</span>
            </button>
          ))}
        </div>

        {/* Action button, Search input and Preferences toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search bar */}
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60 group-hover:text-brand-neon transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar receta o ingrediente..."
              className="pl-10 pr-4 py-2.5 bg-black/40 border border-brand-border rounded-full text-brand-white text-xs placeholder-brand-gray/60 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all w-full sm:w-60"
              id="search-recipes-input"
            />
          </div>

          {/* Personalization questionnaire CTA */}
          <button
            onClick={onTriggerFilter}
            className="px-5 py-2.5 rounded-full bg-brand-dark/40 border border-brand-neon/30 text-brand-neon-light text-xs font-bold hover:bg-brand-neon hover:text-brand-bg hover:shadow-[0_0_15px_rgba(81,234,82,0.3)] hover:border-brand-neon transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            id="trigger-filter-btn"
          >
            <HelpCircle className="w-4 h-4" />
            <span>¿Qué se antoja?</span>
          </button>

        </div>
      </div>

      {/* PRIVATE PREFERENCES COMPLIANCE NOTICE */}
      {(preferences.eggFree || preferences.dairyFree || preferences.nutFree) && (
        <div className="p-4 bg-brand-dark/10 border border-brand-border/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-neon" />
            <span className="text-brand-gray font-sans">
              Filtrando con restricciones activas: 
              {preferences.nutFree && <strong className="text-brand-neon-light ml-1">Sin nueces</strong>}
              {preferences.dairyFree && <strong className="text-brand-neon-light ml-1">Sin lácteos</strong>}
              {preferences.eggFree && <strong className="text-brand-neon-light ml-1">Sin huevo</strong>}
            </span>
          </div>

          <button
            onClick={() => setHideRestricted(!hideRestricted)}
            className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider bg-black/40 hover:bg-brand-dark/20 border border-brand-border px-3 py-1.5 rounded-full transition-colors text-brand-white cursor-pointer shrink-0"
            id="toggle-hide-restricted-btn"
          >
            {hideRestricted ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{hideRestricted ? "Mostrar Recetas No Aptas" : "Ocultar Recetas No Aptas"}</span>
          </button>
        </div>
      )}

      {/* Grid List of Recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe, idx) => {
          const timeBadge = recipe.info.find(i => i.includes("Prep") || i.includes("Horneado") || i.includes("Coccion")) || recipe.info[0];
          const restriction = checkRecipeRestrictions(recipe, preferences);

          return (
            <motion.button
              key={recipe.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => onSelectRecipe(recipe)}
              className={`bg-black/40 border p-6 rounded-[24px] text-left transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(81,234,82,0.04)] ${
                restriction.isRestricted
                  ? "border-brand-border/40 opacity-55 hover:opacity-100"
                  : "border-brand-border hover:border-brand-neon/40"
              }`}
              id={`recipe-card-${activeTab}-${idx}`}
            >
              <div className="space-y-4 w-full">
                {/* Meta details */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-brand-gray bg-brand-border/20 px-2.5 py-0.5 rounded-full">
                    {activeTab}
                  </span>
                  
                  {recipe.source && (
                    <span className="text-[9px] uppercase font-mono tracking-wider text-brand-neon font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 stroke-[2.5]" />
                      <span>Verificada</span>
                    </span>
                  )}
                </div>

                {/* Image Thumbnail */}
                {recipe.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-brand-border/30">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-black/75 backdrop-blur-sm text-[8px] text-brand-gray px-1.5 py-0.5 rounded font-sans border border-brand-border/25">
                      Imagen de referencia
                    </div>
                  </div>
                )}                {/* Name and introduction */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-brand-white group-hover:text-brand-neon-light transition-colors leading-snug">
                    {recipe.name}
                  </h3>
                  <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">
                    {recipe.intro}
                  </p>
                </div>

                {/* Visual warning of restricted ingredients */}
                {restriction.isRestricted && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {restriction.reasons.map((reason) => (
                      <span
                        key={reason}
                        className="text-[9px] uppercase font-mono tracking-wide bg-red-950/20 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
                      >
                        <AlertTriangle className="w-2.5 h-2.5 stroke-[2.5]" />
                        <span>Evitar: {reason}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom stats details */}
              <div className="pt-5 mt-4 border-t border-brand-border/40 flex items-center justify-between text-[11px] text-brand-gray font-mono w-full">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-neon/60" />
                  <span>{timeBadge}</span>
                </span>
                <span className="text-brand-gray group-hover:text-brand-neon transition-colors flex items-center gap-0.5">
                  <span>Ver preparación</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.button>
          );
        })}

        {filteredRecipes.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-brand-border rounded-[24px] bg-black/10 space-y-3">
            <Search className="w-8 h-8 text-brand-gray/40 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-brand-white">No encontramos recetas</p>
              <p className="text-xs text-brand-gray">Prueba con otra palabra clave o ingrediente, o desactiva restricciones.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setHideRestricted(false);
              }}
              className="px-4 py-2 bg-brand-dark/40 border border-brand-border hover:border-brand-neon/40 text-xs text-brand-neon rounded-full transition-all cursor-pointer font-mono"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
