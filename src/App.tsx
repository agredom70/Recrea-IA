import { useState, useEffect } from "react";
import { RECIPES_DATA, Recipe } from "./data/recipes";
import { ActiveTab } from "./types";
import { AnimatePresence } from "motion/react";
import WelcomeScreen from "./components/WelcomeScreen";
import Catalog from "./components/Catalog";
import RecipeDetail from "./components/RecipeDetail";
import PersonalizationFilter from "./components/PersonalizationFilter";
import DiagnosticWizard from "./components/DiagnosticWizard";
import ChefChat from "./components/ChefChat";
import PreferencesModal from "./components/PreferencesModal";

import { 
  ChefHat, 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  MessageSquare, 
  LogOut,
  Sparkles,
  Settings
} from "lucide-react";

export default function App() {
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("chef_ia_user_name") || "";
  });
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem("chef_ia_onboarded") === "true";
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>("catalog");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Private Preferences State
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("chef_ia_preferences");
    return saved 
      ? JSON.parse(saved) 
      : { eggFree: false, dairyFree: false, nutFree: false };
  });
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // Cross-layer Contextual states
  const [preloadedRecipeForDiagnostic, setPreloadedRecipeForDiagnostic] = useState<Recipe | null>(null);
  const [preloadedRecipeForChat, setPreloadedRecipeForChat] = useState<Recipe | null>(null);

  // Micro-notification/toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save onboarding state in localStorage
  const handleOnboardingComplete = (name: string, selectRecipeName?: string) => {
    const finalName = name || "Invitado";
    setUserName(finalName);
    setIsOnboarded(true);
    localStorage.setItem("chef_ia_user_name", finalName);
    localStorage.setItem("chef_ia_onboarded", "true");

    if (selectRecipeName) {
      let found: Recipe | null = null;
      for (const cat of Object.keys(RECIPES_DATA) as (keyof typeof RECIPES_DATA)[]) {
        const match = RECIPES_DATA[cat].find(r => r.name.toLowerCase() === selectRecipeName.toLowerCase());
        if (match) {
          found = match;
          break;
        }
      }
      if (found) {
        setSelectedRecipe(found);
        setActiveTab("catalog");
      }
    }

    // Display welcome micro-toast
    const message = finalName 
      ? `¡Listo, ${finalName}! Vamos a preparar algo juntos.` 
      : "¡Listo! Vamos a preparar algo juntos.";
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExitSession = () => {
    setUserName("");
    setIsOnboarded(false);
    setActiveTab("catalog");
    setSelectedRecipe(null);
    setPreloadedRecipeForDiagnostic(null);
    setPreloadedRecipeForChat(null);
    localStorage.removeItem("chef_ia_user_name");
    localStorage.removeItem("chef_ia_onboarded");
    
    setToastMessage("Sesión reiniciada correctamente.");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    if (confirm("¿Deseas reiniciar tu nombre e historial de sesión culinaria?")) {
      handleExitSession();
    }
  };

  // Navigating to troubleshooting from a recipe
  const handleTroubleshootRecipe = (recipe: Recipe) => {
    setPreloadedRecipeForDiagnostic(recipe);
    setActiveTab("diagnostic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigating to chat from a recipe
  const handleAskChefAboutRecipe = (recipe: Recipe) => {
    setPreloadedRecipeForChat(recipe);
    setActiveTab("chat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear specific contexts
  const handleClearDiagnosticContext = () => {
    setPreloadedRecipeForDiagnostic(null);
  };

  const handleClearChatContext = () => {
    setPreloadedRecipeForChat(null);
  };

  // Selection of recipe from Personalizer or Diagnostic
  const handleSelectRecipeFromOtherLayers = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setActiveTab("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save preferences changes
  const handleSavePreferences = (newPrefs: { eggFree: boolean; dairyFree: boolean; nutFree: boolean }) => {
    setPreferences(newPrefs);
    localStorage.setItem("chef_ia_preferences", JSON.stringify(newPrefs));
    setToastMessage("Preferencias actualizadas.");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // If we aren't onboarded (Fase 0), show onboarding
  if (!isOnboarded) {
    return <WelcomeScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg relative pb-16 font-sans text-brand-white">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(81,234,82,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(81,234,82,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/2 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-neon-light/2 rounded-full blur-[140px] pointer-events-none" />

      {/* Micro-Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black border border-brand-neon p-4 rounded-full shadow-[0_0_25px_rgba(81,234,82,0.2)] flex items-center gap-3 max-w-sm w-max">
            <div className="w-6 h-6 rounded-full bg-brand-dark flex items-center justify-center text-brand-neon border border-brand-neon/30">
              <ChefHat className="w-3.5 h-3.5 animate-bounce" />
            </div>
            <span className="text-xs font-bold text-brand-white font-sans">{toastMessage}</span>
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-dark/40 border border-brand-neon/20 flex items-center justify-center shadow-[0_0_15px_rgba(81,234,82,0.08)]">
              <ChefHat className="w-5 h-5 text-brand-neon" />
            </div>
            <div className="text-left">
              <h1 className="text-base font-extrabold tracking-wider text-brand-white uppercase font-sans">
                CHEF IA RECREA<span className="text-brand-neon">™</span>
              </h1>
              <p className="text-[9px] uppercase font-mono tracking-widest text-brand-gray">
                Soporte de repostería sin gluten
              </p>
            </div>
          </div>

          {/* Core App Layer Navigation Tabs */}
          <nav className="hidden md:flex bg-black/40 border border-brand-border p-1 rounded-full">
            <button
              onClick={() => {
                setActiveTab("catalog");
                setSelectedRecipe(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-brand-neon text-brand-bg"
                  : "text-brand-gray hover:text-brand-white"
              }`}
              id="nav-tab-catalog"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Recetario</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("filter");
                setSelectedRecipe(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "filter"
                  ? "bg-brand-neon text-brand-bg"
                  : "text-brand-gray hover:text-brand-white"
              }`}
              id="nav-tab-filter"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>¿Qué se antoja?</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("diagnostic");
                setSelectedRecipe(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "diagnostic"
                  ? "bg-brand-neon text-brand-bg"
                  : "text-brand-gray hover:text-brand-white"
              }`}
              id="nav-tab-diagnostic"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Diagnóstico de Fallos</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("chat");
                setSelectedRecipe(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "chat"
                  ? "bg-brand-neon text-brand-bg"
                  : "text-brand-gray hover:text-brand-white"
              }`}
              id="nav-tab-chat"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Preguntar al Chef</span>
            </button>
          </nav>

          {/* Settings & Profile badge */}
          <div className="flex items-center gap-2">
            {/* Preferences / Restrictions Gear Button */}
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="p-2 text-brand-gray hover:text-brand-neon bg-black/40 hover:bg-brand-dark/20 border border-brand-border hover:border-brand-neon/40 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              title="Filtro Privado de Preferencias"
              id="preferences-toggle-btn"
            >
              <Settings className="w-4 h-4 text-brand-neon/80" />
              <span className="hidden lg:inline text-[9px] uppercase tracking-wider font-mono text-brand-white">Evitar Alérgenos</span>
            </button>

            {userName ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-brand-dark/20 border border-brand-border rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-brand-neon-light font-mono font-bold">
                  Chef {userName}
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-brand-border/20 border border-brand-border rounded-full">
                <span className="text-[10px] uppercase tracking-wider text-brand-gray font-mono">
                  Chef Invitado
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-brand-gray hover:text-red-400 bg-black/40 hover:bg-red-950/20 border border-brand-border hover:border-red-500/20 rounded-full transition-colors cursor-pointer"
              title="Cambiar nombre / Cerrar sesión"
              id="logout-session-btn"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* Mobile Navigation Sticky Header */}
        <div className="md:hidden flex overflow-x-auto whitespace-nowrap bg-black/60 border border-brand-border p-1 rounded-full mb-6 scrollbar-none gap-1">
          <button
            onClick={() => {
              setActiveTab("catalog");
              setSelectedRecipe(null);
            }}
            className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
              activeTab === "catalog" ? "bg-brand-neon text-brand-bg" : "text-brand-gray"
            }`}
          >
            Recetario
          </button>
          <button
            onClick={() => {
              setActiveTab("filter");
              setSelectedRecipe(null);
            }}
            className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
              activeTab === "filter" ? "bg-brand-neon text-brand-bg" : "text-brand-gray"
            }`}
          >
            Antojo
          </button>
          <button
            onClick={() => {
              setActiveTab("diagnostic");
              setSelectedRecipe(null);
            }}
            className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
              activeTab === "diagnostic" ? "bg-brand-neon text-brand-bg" : "text-brand-gray"
            }`}
          >
            Diagnóstico
          </button>
          <button
            onClick={() => {
              setActiveTab("chat");
              setSelectedRecipe(null);
            }}
            className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
              activeTab === "chat" ? "bg-brand-neon text-brand-bg" : "text-brand-gray"
            }`}
          >
            Preguntar
          </button>
        </div>

        {/* Dynamic screen loaders */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CATALOGUE (Recetario) */}
          {activeTab === "catalog" && (
            <div key="catalog-view">
              {selectedRecipe ? (
                <RecipeDetail
                  recipe={selectedRecipe}
                  onBack={() => setSelectedRecipe(null)}
                  onAskChef={handleAskChefAboutRecipe}
                  onTroubleshoot={handleTroubleshootRecipe}
                  onExit={handleExitSession}
                />
              ) : (
                <Catalog
                  recipes={RECIPES_DATA}
                  userName={userName}
                  onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
                  onTriggerFilter={() => setActiveTab("filter")}
                  preferences={preferences}
                  onExit={handleExitSession}
                />
              )}
            </div>
          )}

          {/* TAB 2: PERSONALIZATION FILTER */}
          {activeTab === "filter" && (
            <div key="filter-view">
              <PersonalizationFilter
                userName={userName}
                recipes={RECIPES_DATA}
                onSelectRecipe={handleSelectRecipeFromOtherLayers}
                onResetFilter={() => {}}
                preferences={preferences}
                onExit={handleExitSession}
              />
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC WIZARD */}
          {activeTab === "diagnostic" && (
            <div key="diagnostic-view">
              <DiagnosticWizard
                userName={userName}
                recipes={RECIPES_DATA}
                preloadedRecipe={preloadedRecipeForDiagnostic}
                onClearPreload={handleClearDiagnosticContext}
                onExit={handleExitSession}
                onNavigateToCatalog={() => {
                  setActiveTab("catalog");
                  if (preloadedRecipeForDiagnostic) {
                    setSelectedRecipe(preloadedRecipeForDiagnostic);
                  } else {
                    setSelectedRecipe(null);
                  }
                }}
              />
            </div>
          )}

          {/* TAB 4: CHEF CHAT */}
          {activeTab === "chat" && (
            <div key="chat-view">
              <ChefChat
                userName={userName}
                preloadedRecipe={preloadedRecipeForChat}
                onClearPreloadedRecipe={handleClearChatContext}
                onExit={handleExitSession}
              />
            </div>
          )}

        </AnimatePresence>

      </main>

      {/* Preferences Settings Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onUpdatePreferences={handleSavePreferences}
      />

      {/* Decorative Branding footer */}
      <footer className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] text-brand-gray/55 font-mono space-y-1">
        <p>© 2026 CHEF IA RECREA™ • Todos los derechos reservados.</p>
        <p>Integrado de manera exclusiva para usuarios de Hotmart. Hecho con ❤️ y precisión técnica.</p>
      </footer>

    </div>
  );
}
