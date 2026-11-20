import { chunks, type Chunk } from "./knowledge";

const STOP = new Set(
  "a an the is are was were be been of to in on for with and or his her he she it this that what which who how does do did has have had about tell me show can you your i my any some at as by from amal gafoor".split(
    " ",
  ),
);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(" ")
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const docs = chunks.map((c) => tokenize(`${c.title} ${c.text}`));
const avgLen = docs.reduce((n, d) => n + d.length, 0) / docs.length;
const df = new Map<string, number>();
docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));

export type Hit = { chunk: Chunk; score: number };

/** BM25 keyword retrieval over the knowledge chunks. */
export function search(query: string, k = 3): Hit[] {
  const q = tokenize(query);
  // the chunk describing the bot itself only competes when the question is about the bot
  const aboutBot = /(chat ?bot|\bbot\b|this (site|agent|chat|assistant)|how (do|does) (this|it|you) work|under the hood)/i.test(query);
  const k1 = 1.4;
  const b = 0.75;
  return docs
    .map((d, i) => {
      let score = 0;
      if (chunks[i].id === "how-this-works" && !aboutBot) return { chunk: chunks[i], score: 0 };
      if (chunks[i].id === "how-this-works" && aboutBot) score += 5;
      for (const term of q) {
        const tf = d.filter((t) => t === term || t.startsWith(term) || term.startsWith(t)).length;
        if (!tf) continue;
        const n = df.get(term) ?? 1;
        const idf = Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
        score += (idf * tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * d.length) / avgLen));
      }
      return { chunk: chunks[i], score };
    })
    .filter((h) => h.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k);
}
