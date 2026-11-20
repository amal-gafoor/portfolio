import type { Project } from "@/content/site";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type Source = { id: string; title: string };

export type UiAction =
  | { kind: "projects"; projects: Project[] }
  | { kind: "theme"; mode: "light" | "dark" }
  | { kind: "contact"; email: string; phone: string; github: string; linkedin: string };

export type Stats = {
  ms: number;
  tokens: number;
  chunks: number;
  steps: number;
  mode: "llm" | "demo";
  model: string;
};

/** One line of the NDJSON stream sent by the backend's POST /chat */
export type StreamEvent =
  | { type: "step"; tool: string; input: string; output: string }
  | { type: "sources"; items: Source[] }
  | { type: "ui"; action: UiAction }
  | { type: "text"; content: string }
  | { type: "stats"; stats: Stats }
  | { type: "error"; message: string };
