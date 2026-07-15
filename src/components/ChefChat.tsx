import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  User, 
  ChefHat, 
  AlertCircle,
  Clock,
  X,
  LogOut
} from "lucide-react";
import { Recipe, ChatMessage } from "../types";

interface ChefChatProps {
  userName: string;
  preloadedRecipe: Recipe | null;
  onClearPreloadedRecipe: () => void;
  onExit: () => void;
}

export default function ChefChat({ 
  userName, 
  preloadedRecipe,
  onClearPreloadedRecipe,
  onExit
}: ChefChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: preloadedRecipe 
        ? `¡Hola${userName ? ` ${userName}` : ""}! Veo que estás revisando la receta de **${preloadedRecipe.name}**. Estoy listo para ayudarte con cualquier duda técnica. ¿Quieres saber sobre sustituciones, tiempos de horneado o adaptaciones?`
        : `¡Hola${userName ? ` ${userName}` : ""}! Soy tu asistente y Chef personal. Estoy aquí para resolver tus dudas de repostería y panificación sin gluten ni azúcar para que cocines sin miedo. ¿Qué prepararemos hoy?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // If preloadedRecipe changes, reset welcome message or add context note
  useEffect(() => {
    if (preloadedRecipe) {
      setMessages(prev => [
        ...prev,
        {
          id: `preload-change-${Date.now()}`,
          role: "model",
          text: `He tomado nota de que quieres preguntar sobre **${preloadedRecipe.name}**. ¿En qué puedo ayudarte con esta preparación?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [preloadedRecipe]);

  // Standard or Recipe Suggested chips
  const suggestedQuestions = preloadedRecipe?.chef_ai || [
    "¿Puedo sustituir un ingrediente que no tengo?",
    "¿Cuánto tiempo se conserva esto?",
    "¿Funciona en Air Fryer?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map history for API
      // Take last 8 messages for token size and context safety
      const historyPayload = messages
        .filter(m => m.id !== "welcome" && !m.id.startsWith("preload"))
        .slice(-8)
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      // Gather recipe context
      let recipeContextText = null;
      if (preloadedRecipe) {
        recipeContextText = `
Nombre de la receta: ${preloadedRecipe.name}
Introducción: ${preloadedRecipe.intro}
Tiempos e Información: ${preloadedRecipe.info.join(", ")}
Ingredientes: ${JSON.stringify(preloadedRecipe.ingredients)}
Pasos de preparación: ${preloadedRecipe.steps.join(" // ")}
Tip del chef: ${preloadedRecipe.tip}
Almacenamiento y Conservación: ${preloadedRecipe.storage}
Versión Air Fryer: ${preloadedRecipe.airfryer}
`;
      }

      let response;
      let attempt = 1;
      const makeRequest = async () => {
        return await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: historyPayload,
            recipeContext: recipeContextText
          })
        });
      };

      try {
        response = await makeRequest();
        if (!response.ok) {
          throw new Error(`Response status error: ${response.status}`);
        }
      } catch (err) {
        console.warn("Error en el primer intento del Chef IA, reintentando una vez...", err);
        // Esperar 1 segundo antes de reintentar automáticamente
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          response = await makeRequest();
          if (!response.ok) {
            throw new Error(`Response status error on retry: ${response.status}`);
          }
        } catch (retryErr) {
          console.error("Ambos intentos fallaron:", retryErr);
          throw retryErr;
        }
      }

      const data = await response.json();
      
      const chefMsg: ChatMessage = {
        id: `msg-chef-${Date.now()}`,
        role: "model",
        text: data.text || "Lo siento, tuve un pequeño problema técnico en mi cocina. ¿Podrías repetirme la pregunta?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, chefMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: "model",
          text: "Se me cruzaron los cables un segundo 🍞 — intenta de nuevo en un momento. Si sigue pasando, mientras tanto puedes revisar el Recomendador o el Catálogo de recetas.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleClearHistory = () => {
    if (confirm("¿Seguro que deseas reiniciar tu conversación con el Chef?")) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: `¡Hola de nuevo${userName ? ` ${userName}` : ""}! He despejado mi mesa de cocina. ¿Qué duda te gustaría que resolvamos ahora?`,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="bg-black/40 border border-brand-border rounded-[28px] h-[650px] flex flex-col relative overflow-hidden shadow-[0_0_50px_-12px_rgba(81,234,82,0.05)]">
      
      {/* Chat header */}
      <div className="px-6 py-4 border-b border-brand-border bg-black/60 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-dark/50 border border-brand-neon/30 flex items-center justify-center shadow-[0_0_15px_rgba(81,234,82,0.1)]">
            <ChefHat className="w-5 h-5 text-brand-neon animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-white flex items-center gap-1.5">
              <span>Chef IA ReCrea</span>
              <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-ping" />
            </h3>
            <p className="text-[10px] text-brand-gray font-mono">
              Online • Soporte Técnico Culinario
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClearHistory}
            className="p-2 text-brand-gray hover:text-brand-neon-light hover:bg-brand-dark/20 rounded-full transition-colors cursor-pointer"
            title="Reiniciar chat"
            id="chat-reset-history-btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border hover:border-red-500/20 text-brand-gray hover:text-red-400 bg-brand-dark/40 hover:bg-red-950/10 rounded-full transition-all text-xs cursor-pointer"
            id="chat-exit-session-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Recipe Preloaded contextual banner */}
      {preloadedRecipe && (
        <div className="bg-brand-dark/20 border-b border-brand-neon/15 px-6 py-2.5 flex items-center justify-between text-xs text-brand-neon-light z-10 animate-fadeIn">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
            Contexto activo: <strong>{preloadedRecipe.name}</strong>
          </span>
          <button
            onClick={onClearPreloadedRecipe}
            className="text-brand-gray hover:text-brand-white p-1 rounded-full hover:bg-brand-dark/30 transition-colors cursor-pointer"
            id="chat-clear-context-btn"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Chat Messages flow */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Avatar icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isUser 
                  ? "bg-brand-dark/30 border-brand-neon/30 text-brand-neon" 
                  : "bg-black/60 border-brand-border text-brand-gray"
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <ChefHat className="w-4 h-4" />}
              </div>

              {/* Message text bubble */}
              <div className={`space-y-1.5 p-4 rounded-[20px] text-sm leading-relaxed ${
                isUser
                  ? "bg-gradient-to-br from-brand-dark/40 to-black/60 border border-brand-neon/30 text-brand-white rounded-tr-none"
                  : "bg-brand-border/20 border border-brand-border/40 text-brand-white/90 rounded-tl-none"
              }`}>
                <p className="whitespace-pre-line text-sm leading-relaxed font-sans">
                  {msg.text}
                </p>
                <div className="text-[9px] text-brand-gray font-mono text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[85%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-black/60 border border-brand-border text-brand-gray">
              <ChefHat className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-brand-border/20 border border-brand-border/40 p-4 rounded-[20px] rounded-tl-none">
              <div className="flex gap-1 items-center py-1 px-2">
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips panel */}
      <div className="px-6 py-3 border-t border-brand-border/35 bg-black/20 z-10 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="inline-block px-4 py-2 bg-brand-dark/20 hover:bg-brand-dark/50 border border-brand-border hover:border-brand-neon/40 text-xs text-brand-white hover:text-brand-neon-light rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            id={`suggested-chip-${idx}`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input container */}
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-black/60 border-t border-brand-border flex gap-3 items-center z-10"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={preloadedRecipe ? `Pregúntale al chef sobre ${preloadedRecipe.name}...` : "Escribe tu pregunta sobre cocina o ingredientes..."}
          className="flex-1 px-5 py-3.5 bg-brand-bg/60 border border-brand-border rounded-full text-brand-white placeholder-brand-gray/60 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon text-sm transition-all"
          id="chat-text-input"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            inputValue.trim() && !isLoading
              ? "bg-gradient-to-r from-brand-neon-light to-brand-neon text-brand-bg hover:shadow-[0_0_15px_rgba(81,234,82,0.3)]"
              : "bg-brand-border/40 text-brand-gray/60 cursor-not-allowed"
          }`}
          id="chat-send-btn"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}
