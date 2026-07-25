export interface Recipe {
  name: string;
  source: string | null;
  intro: string;
  info: string[];
  ingredients: [string, string[]][];
  steps: string[];
  tip: string;
  personalize: string;
  storage: string;
  airfryer: string;
  chef_ai: string[];
  sugar_note?: string;
}

export interface RecipesData {
  panes: Recipe[];
  bases: Recipe[];
  postres: Recipe[];
}

export type ActiveTab = "catalog" | "filter" | "diagnostic" | "chat";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface Symptom {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface DiagnosticQuestion {
  id: string;
  text: string;
  options: { label: string; value: string; cause: string; explanation: string; correction: string }[];
}
