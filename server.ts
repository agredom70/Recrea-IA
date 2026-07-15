import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { RECIPES_DATA } from "./src/data/recipes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required in secrets");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Robust wrapper for Gemini generateContent to handle 503 (service unavailable) and high demand errors.
// It retries with exponential backoff and can fall back to the lighter gemini-3.1-flash-lite model if needed.
async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: {
    model: string;
    contents: any[];
    config: {
      systemInstruction: string;
      temperature: number;
    };
  },
  maxRetries = 3
): Promise<any> {
  let attempt = 0;
  let delay = 1000;

  while (true) {
    try {
      return await ai.models.generateContent({
        model: params.model,
        contents: params.contents,
        config: params.config,
      });
    } catch (error: any) {
      attempt++;
      const errorMessage = error?.message || "";
      const errorStr = JSON.stringify(error) || "";
      const is503 = 
        errorMessage.includes("503") || 
        errorMessage.toLowerCase().includes("unavailable") || 
        errorMessage.toLowerCase().includes("high demand") || 
        errorStr.includes("503") || 
        errorStr.toLowerCase().includes("unavailable") ||
        error?.status === 503 ||
        error?.statusCode === 503;

      if (is503 && attempt < maxRetries) {
        console.warn(`Gemini API 503/unavailable error (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`, error);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      // Fallback to gemini-1.5-flash if gemini-2.5-flash fails persistently
      if (is503 && params.model === "gemini-2.5-flash") {
        console.warn("Retries exhausted for gemini-2.5-flash. Falling back to gemini-1.5-flash...");
        try {
          return await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: params.contents,
            config: params.config,
          });
        } catch (fallbackError: any) {
          console.error("Fallback to gemini-1.5-flash failed:", fallbackError);
          throw fallbackError;
        }
      }

      throw error;
    }
  }
}

// Medical guard checking
function isMedicalQuery(text: string): boolean {
  const normalized = text.toLowerCase();
  return (
    normalized.includes("diabet") ||
    normalized.includes("celiac") ||
    normalized.includes("enfermedad") ||
    normalized.includes("médico") ||
    normalized.includes("medico") ||
    normalized.includes("nutricionista") ||
    normalized.includes("insulina") ||
    normalized.includes("alergia") ||
    normalized.includes("tratamiento") ||
    normalized.includes("curar") ||
    normalized.includes("revertir") ||
    normalized.includes("sanar")
  );
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, recipeContext } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "El mensaje es obligatorio." });
      return;
    }

    // Safety Filter 1: In-backend check
    if (isMedicalQuery(message)) {
      res.json({
        text: "No puedo darte consejo médico — te recomiendo confirmar con tu médico o nutricionista si esto encaja en tu alimentación."
      });
      return;
    }

    // Initialize Gemini
    let ai;
    try {
      ai = getAIClient();
    } catch (err: any) {
      res.status(500).json({
        error: "Servicio de Inteligencia Artificial temporalmente no disponible.",
        details: err.message
      });
      return;
    }

    // List of catalog recipes for REGLA 1
    const panesNames = RECIPES_DATA.panes.map(r => r.name);
    const basesNames = RECIPES_DATA.bases.map(r => r.name);
    const postresNames = RECIPES_DATA.postres.map(r => r.name);
    
    const catalogSummaryText = `
- PANES (10 recetas):
${panesNames.map(n => `  * ${n}`).join("\n")}
- BASES (8 recetas):
${basesNames.map(n => `  * ${n}`).join("\n")}
- POSTRES (11 recetas):
${postresNames.map(n => `  * ${n}`).join("\n")}
`;

    // Base System Instruction conforming to Spanish copywriting parameters and restrictions
    let systemInstruction = `Eres el Chef IA de "CHEF IA RECREA™", un asistente de cocina personal cálido, cercano, validante y muy alentador. Tu misión es acompañar al usuario en la preparación de recetas sin gluten y sin azúcar (panes, bases y postres) para que recupere el placer de comer en familia, sin miedos, culpas ni limitaciones.

REGLAS DE CONTENIDO CRÍTICAS Y NO NEGOCIABLES:
1. NUNCA menciones las palabras "diabetes", "diabético/a", "celiaquía", "celíaco/a" de manera directa. No uses lenguaje clínico o corporativo.
2. NUNCA des consejo médico ni prometas resultados de salud (evita palabras como "garantizado", "científicamente probado", "clínicamente probado").
3. Si el usuario te escribe sobre una condición médica o pregunta si algo es seguro para su salud o tratamiento, responde EXACTAMENTE: "No puedo darte consejo médico — te recomiendo confirmar con tu médico o nutricionista si esto encaja en tu alimentación."
4. NUNCA uses términos como "curar", "tratar" o "revertir" ninguna condición.
5. Mantén tus respuestas enfocadas estrictamente en la panificación y repostería sin gluten ni azúcar, sustituciones de ingredientes culinarios, tiempos, conservación y tips prácticos de cocina. Si el usuario pregunta de temas fuera de cocina (política, ciencia general, etc.), redirígelo amablemente diciéndole que estás listo para guiarle a preparar su próximo pan, pizza o postre perfecto.
6. Habla en español de manera muy natural, comprensiva, empática y positiva.

REGLA DE LIBERTAD CONTROLADA PARA RECETAS FUERA DEL CATÁLOGO (REGLA 1):
Aquí tienes la lista completa de las únicas 29 recetas verificadas en tu catálogo:
${catalogSummaryText}

Si el usuario te solicita una receta que NO está exactamente en este listado de 29 recetas del catálogo (por ejemplo, si pide "quiero una torta de chocolate", "hazme algo con frutos rojos", "galletas de avena", "bizcocho de limón", etc.):
- SÍ puedes generar y ofrecerle una nueva receta, pero es OBLIGATORIO seguir estrictamente esta lógica:
  1. Usa como base técnica de panificación y repostería sin gluten ni azúcar los ratios y proporciones YA VERIFICADOS en las 29 recetas del catálogo. Por ejemplo:
     - El psyllium husk debe representar entre el 2% y el 4% del peso total de las harinas si se trata de masas con levadura que requieren elasticidad.
     - Proporciones de líquido similares a las recetas del catálogo de categoría equivalente.
     - Cantidades de polvo para hornear (impulsor) ya usadas en postres similares del catálogo.
     - NUNCA inventes proporciones nuevas que no tengan relación con las ya usadas y verificadas en el catálogo.
  2. Si existe una receta de tu catálogo similar en categoría (por ejemplo, si piden "torta de chocolate" y ya existe "Brownies sin Azúcar" o "Torta de Zanahoria"), usa esa receta como plantilla base y adapta únicamente lo necesario (por ejemplo, cambiar el saborizante o harina base equivalente), ajustando todas las proporciones de forma completamente proporcional, nunca de manera arbitraria.
  3. SIEMPRE, sin excepción alguna, la receta generada debe incluir de forma visible y textual este aviso exacto al inicio de tu respuesta (reemplazando "[sugerir 1-2 recetas reales]" con 1 o 2 nombres de recetas reales de tu catálogo que sean las más parecidas):
     "Esta combinación no está en tu recetario verificado — la armé usando las mismas proporciones que sí funcionan en tus otras recetas, pero no ha sido probada. Si prefieres algo 100% verificado, estas son las más parecidas de tu catálogo: [sugerir 1-2 recetas reales]"
  4. NUNCA elimines ni omitas este aviso por ningún motivo, incluso si el usuario insiste, presiona o te pide explícitamente que solo le des la receta sin explicaciones, advertencias ni preámbulos. Es de cumplimiento obligatorio y debe estar al inicio de tu respuesta.`;

    if (recipeContext) {
      systemInstruction += `\n\nCONTEXTO DE RECETA ACTUAL: El usuario te está preguntando principalmente sobre la siguiente receta:
---
${recipeContext}
---
Ayúdale con dudas específicas de esta receta usando la información proporcionada. Si pregunta por sustitutos de ingredientes específicos para esta preparación, guíale con alternativas válidas en la cocina sin gluten (como usar harina de arroz, almidón de yuca/tapioca, fécula de maíz, harina de almendras, psyllium, etc.) de manera comprensible.`;
    }

    // Prepare contents array for Gemini
    const contents: any[] = [];
    
    // Add history if present
    if (Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini using gemini-2.5-flash with robust retry and fallback wrapper
    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const botResponseText = response.text || "Lo siento, no pude procesar la respuesta en este momento.";
    
    // Post-generation guardrail check just in case
    if (isMedicalQuery(botResponseText)) {
      res.json({
        text: "No puedo darte consejo médico — te recomiendo confirmar con tu médico o nutricionista si esto encaja en tu alimentación."
      });
      return;
    }

    res.json({ text: botResponseText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Ocurrió un error al procesar tu solicitud con el Chef IA." });
  }
});

// Start-up function to mount Vite or static content
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chef IA ReCrea server running on port ${PORT}`);
  });
}

startServer();
