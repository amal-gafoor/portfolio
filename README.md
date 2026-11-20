# Amal Gafoor P K — portfolio

Next.js portfolio where the hero is a working AI agent: it retrieves from my profile (RAG),
calls tools, and shows its trace, sources and stats for every answer.

## Run locally
```bash
npm install
cp .env.example .env.local   # then add your LLM_API_KEY
npm run dev
```
Open http://localhost:3000. Without a key the chat runs in demo mode (retrieval + tools, no generated answers).

## LLM
Any OpenAI-compatible chat API with tool calling works. Set in `.env.local` (and in Vercel → Settings → Environment Variables):

| Variable | Example |
| --- | --- |
| `LLM_API_KEY` | your key |
| `LLM_BASE_URL` | `https://api.groq.com/openai/v1` |
| `LLM_MODEL` | `llama-3.3-70b-versatile` |

## Where things live
- `content/site.ts` — all text: name, projects, experience, skills, contact. The agent's knowledge base is generated from it.
- `lib/agent.ts` — system prompt, tools, agent loop. `lib/retrieval.ts` — BM25 retrieval. `lib/rate-limit.ts` — per-IP limit.
- `app/api/chat/route.ts` — streaming chat endpoint. `components/chat/Chat.tsx` — chat UI.

## Deploy
Push to GitHub, import in Vercel, add the three env vars. No separate backend or database.
