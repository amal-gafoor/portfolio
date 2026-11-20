# Amal Gafoor P K — portfolio

A portfolio where the hero is a working AI agent: it retrieves from my profile (RAG), calls tools,
and shows its trace, sources and stats for every answer.

| Folder | What it is |
| --- | --- |
| `frontend/` | Next.js + Tailwind + shadcn/ui. UI only. |
| `backend/` | Python FastAPI. System prompt, tools, agent loop, retrieval, rate limiting. |

## Run locally (two terminals)

Backend, on http://localhost:8000:
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # add LLM_API_KEY
uvicorn app.main:app --reload --port 8000
```

Frontend, on http://localhost:3000:
```bash
cd frontend
npm install
npm run dev
```

Without `LLM_API_KEY` the agent runs in demo mode (retrieval + tools, no generated answers).
Check the backend with http://localhost:8000/health.

## Backend layout
- `app/main.py` — FastAPI app: `POST /chat` (streams NDJSON events), `GET /health`, CORS.
- `app/agent.py` — system prompt, tool definitions, the tool-calling loop.
- `app/retrieval.py` — BM25 retrieval. `app/knowledge.py` — builds chunks from `data/profile.json`.
- `app/rate_limit.py` — per-IP limit. `app/config.py` — env vars and limits.

## Editing content
- What the agent knows: `backend/data/profile.json`.
- What the page sections show: `frontend/content/site.ts`.
Keep the two in sync.

## Deploy
- Frontend: Vercel, with Root Directory set to `frontend` and `NEXT_PUBLIC_API_URL` set to the backend URL.
- Backend: any Python host (Render, Railway, Fly). Start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
  Set `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`, and `FRONTEND_ORIGINS` to the frontend's URL.
