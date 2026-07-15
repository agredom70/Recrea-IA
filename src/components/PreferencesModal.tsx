import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Check, Cookie, Egg, Coffee } from "lucide-react";

interface Preferences {
  eggFree: boolean;
  dairyFree: boolean;
  nutFree: boolean;
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: Preferences;
  onUpdatePreferences: (prefs: Preferences) => void;
}

export default function PreferencesModal({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
}: PreferencesModalProps) {
  const togglePreference = (key: keyof Preferences) => {
    onUpdatePreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-md bg-brand-bg border border-brand-border p-6 rounded-[28px] relative z-10 shadow-[0_0_50px_rgba(81,234,82,0.1)] flex flex-col space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-dark/40 border border-brand-neon/20 flex items-center justify-center text-brand-neon">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-white font-sans">
                    Preferencias Privadas
                  </h3>
                  <p className="text-[10px] text-brand-gray font-mono">
                    Restricciones de ingredientes de tu cocina
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-brand-border/30 text-brand-gray hover:text-brand-white transition-colors cursor-pointer"
                id="close-preferences-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info Note */}
            <div className="p-3.5 bg-brand-dark/10 border border-brand-border/60 rounded-xl">
              <p className="text-xs text-brand-gray leading-relaxed text-center">
                Esta sección es <span className="text-brand-neon-light font-bold">100% privada</span>. Nunca te solicitamos diagnósticos ni condiciones médicas, solo adaptamos las recetas por seguridad.
              </p>
            </div>

            {/* Preferences Switches */}
            <div className="space-y-3.5">
              {/* No Nuts */}
              <button
                onClick={() => togglePreference("nutFree")}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer group ${
                  preferences.nutFree
                    ? "bg-brand-dark/20 border-brand-neon/40 shadow-[0_0_15px_rgba(81,234,82,0.05)]"
                    : "bg-black/30 border-brand-border hover:border-brand-border/80"
                }`}
                id="pref-toggle-nuts-btn"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    preferences.nutFree ? "bg-brand-neon/10 border-brand-neon/30 text-brand-neon" : "bg-brand-border/20 border-brand-border text-brand-gray"
                  }`}>
                    <Cookie className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                      Sin Nueces
                    </h4>
                    <p className="text-[10px] text-brand-gray leading-normal">
                      Excluye harina de almendras, nueces de pecán, avellanas o pistachos.
                    </p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                  preferences.nutFree ? "bg-brand-neon border-brand-neon text-brand-bg" : "border-brand-gray/40 group-hover:border-brand-gray/80"
                }`}>
                  {preferences.nutFree && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* No Dairy */}
              <button
                onClick={() => togglePreference("dairyFree")}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer group ${
                  preferences.dairyFree
                    ? "bg-brand-dark/20 border-brand-neon/40 shadow-[0_0_15px_rgba(81,234,82,0.05)]"
                    : "bg-black/30 border-brand-border hover:border-brand-border/80"
                }`}
                id="pref-toggle-dairy-btn"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    preferences.dairyFree ? "bg-brand-neon/10 border-brand-neon/30 text-brand-neon" : "bg-brand-border/20 border-brand-border text-brand-gray"
                  }`}>
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                      Sin Lácteos
                    </h4>
                    <p className="text-[10px] text-brand-gray leading-normal">
                      Excluye mantequilla, queso crema, mascarpone y leche animal.
                    </p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                  preferences.dairyFree ? "bg-brand-neon border-brand-neon text-brand-bg" : "border-brand-gray/40 group-hover:border-brand-gray/80"
                }`}>
                  {preferences.dairyFree && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* No Egg */}
              <button
                onClick={() => togglePreference("eggFree")}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer group ${
                  preferences.eggFree
                    ? "bg-brand-dark/20 border-brand-neon/40 shadow-[0_0_15px_rgba(81,234,82,0.05)]"
                    : "bg-black/30 border-brand-border hover:border-brand-border/80"
                }`}
                id="pref-toggle-egg-btn"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    preferences.eggFree ? "bg-brand-neon/10 border-brand-neon/30 text-brand-neon" : "bg-brand-border/20 border-brand-border text-brand-gray"
                  }`}>
                    <Egg className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-brand-white group-hover:text-brand-neon-light transition-colors">
                      Sin Huevo
                    </h4>
                    <p className="text-[10px] text-brand-gray leading-normal">
                      Excluye huevos enteros, claras de huevo y yemas de la preparación.
                    </p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                  preferences.eggFree ? "bg-brand-neon border-brand-neon text-brand-bg" : "border-brand-gray/40 group-hover:border-brand-gray/80"
                }`}>
                  {preferences.eggFree && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            </div>

            {/* Footer button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg font-bold text-xs rounded-full hover:shadow-[0_0_20px_rgba(81,234,82,0.3)] transition-all cursor-pointer"
              id="save-preferences-btn"
            >
              Guardar y Aplicar Cambios
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
