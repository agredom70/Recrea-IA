import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChefHat, ChevronRight, Croissant, Pizza, Cake } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (name: string, selectRecipeName?: string) => void;
}

const sampleRecipes = [
  {
    name: "Pan de Molde Clásico",
    fullName: "1. Pan de Molde Clasico",
    description: "Miga suave y corteza fina, perfecta para tostadas y sándwiches cotidianos sin gluten.",
    image: "/images/pan_de_molde_1785004126532.jpg",
    icon: Croissant,
    category: "Panes"
  },
  {
    name: "Base de Pizza Clásica",
    fullName: "1. Base de Pizza Clasica",
    description: "Esponjosa por dentro, crujiente por fuera. La base ideal para tus combinaciones favoritas.",
    image: null,
    icon: Pizza,
    category: "Bases"
  },
  {
    name: "Brownies sin Azúcar",
    fullName: "1. Brownies sin Azucar",
    description: "Húmedos, intensos y con todo el sabor del chocolate belga, sin azúcar añadida.",
    image: null,
    icon: Cake,
    category: "Postres"
  }
];

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [greetName, setGreetName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputValue.trim();
    if (finalName) {
      setGreetName(finalName);
      setIsSubmitting(true);
      setTimeout(() => {
        onComplete(finalName);
      }, 2000);
    }
  };

  const handleSkip = () => {
    setGreetName("");
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-brand-bg px-4 py-12 relative overflow-y-auto scrollbar-none font-sans">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(81,234,82,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(81,234,82,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-neon-light/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center gap-10 relative z-10 my-auto">
        <AnimatePresence mode="wait">
        {!isSubmitting ? (
          <motion.div
            key="onboarding-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md bg-black/40 backdrop-blur-md border border-brand-border p-8 rounded-[28px] relative z-10 shadow-[0_0_50px_-12px_rgba(81,234,82,0.15)]"
          >
            {/* Header / Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-dark/50 border border-brand-neon/30 flex items-center justify-center shadow-[0_0_20px_rgba(81,234,82,0.1)] mb-4">
                <ChefHat className="w-8 h-8 text-brand-neon" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-brand-white text-center">
                CHEF IA RECREA<span className="text-brand-neon">™</span>
              </h1>
              <p className="text-xs text-brand-gray mt-1 text-center">
                Tu asistente culinario personal premium
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-medium text-brand-white text-center">
                  Antes de empezar...
                </h2>
                <p className="text-sm text-brand-gray text-center">
                  ¿Cómo te llamamos en la cocina?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="w-full px-5 py-4 bg-brand-bg/60 border border-brand-border rounded-full text-brand-white placeholder-brand-gray/60 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all text-center tracking-wide group-hover:border-brand-border/80"
                    id="username-input"
                  />
                  <div className="absolute inset-0 rounded-full bg-brand-neon/5 opacity-0 group-focus-within:opacity-100 blur-sm pointer-events-none transition-opacity" />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg font-semibold rounded-full hover:shadow-[0_0_30px_rgba(81,234,82,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                    id="welcome-continue-btn"
                  >
                    <span>Continuar</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full py-2 text-xs text-brand-gray hover:text-brand-neon-light transition-colors text-center cursor-pointer block"
                    id="welcome-skip-btn"
                  >
                    Prefiero no decirlo
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center z-10 text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-full bg-brand-dark border-2 border-brand-neon flex items-center justify-center shadow-[0_0_30px_rgba(81,234,82,0.3)] mb-6"
            >
              <ChefHat className="w-10 h-10 text-brand-neon animate-pulse" />
            </motion.div>
            <h2 className="text-3xl font-bold text-brand-white tracking-tight">
              {greetName ? `Listo, ${greetName}.` : "Listo."}
            </h2>
            <p className="text-lg text-brand-neon-light font-medium mt-2">
              Vamos a preparar algo juntos.
            </p>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Interactive Demo Section */}
        {!isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full space-y-6"
          >
            <div className="text-center space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-neon font-mono">
                Demostración Interactiva
              </h3>
              <p className="text-xs text-brand-gray max-w-md mx-auto leading-relaxed">
                Ingresa al catálogo o haz clic directamente sobre una de estas recetas destacadas de muestra para probar la herramienta de inmediato:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleRecipes.map((sample) => {
                const IconComponent = sample.icon;
                return (
                  <motion.button
                    key={sample.name}
                    onClick={() => onComplete("Invitado", sample.fullName)}
                    className="bg-black/40 border border-brand-border hover:border-brand-neon/40 p-5 rounded-[24px] text-left transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(81,234,82,0.04)] w-full relative overflow-hidden"
                  >
                    <div className="space-y-4 w-full">
                      {/* Card Image or Placeholder */}
                      {sample.image ? (
                        <div className="relative w-full h-28 rounded-xl overflow-hidden border border-brand-border/30">
                          <img 
                            src={sample.image} 
                            alt={sample.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-1.5 right-1.5 bg-black/75 backdrop-blur-sm text-[8px] text-brand-gray px-1.5 py-0.5 rounded font-sans border border-brand-border/25">
                            Imagen de referencia
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-28 rounded-xl bg-gradient-to-br from-brand-dark/15 to-black/50 border border-brand-border/20 flex flex-col items-center justify-center p-3 text-center">
                          <IconComponent className="w-8 h-8 text-brand-gray/40 group-hover:text-brand-neon/80 group-hover:scale-110 transition-all duration-300 mb-1.5" />
                          <span className="text-[9px] uppercase tracking-wider text-brand-gray/70 font-mono">
                            Placeholder {sample.category}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-mono tracking-wider text-brand-neon bg-brand-neon/5 border border-brand-neon/15 px-2 py-0.5 rounded font-bold">
                          Muestra • {sample.category}
                        </span>
                        <h4 className="text-sm font-bold text-brand-white group-hover:text-brand-neon-light transition-colors leading-snug pt-1">
                          {sample.name}
                        </h4>
                        <p className="text-[11px] text-brand-gray line-clamp-2 leading-relaxed">
                          {sample.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-border/20 flex items-center justify-between text-[10px] text-brand-gray font-mono w-full">
                      <span>Probar preparación</span>
                      <span className="group-hover:text-brand-neon group-hover:translate-x-0.5 transition-all">→</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
