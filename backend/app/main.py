"""FastAPI entry point. Run with: uvicorn app.main:app --reload --port 8000"""
import json
import logging
from typing import Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .agent import run_agent
from .config import FRONTEND_ORIGINS, LLM_API_KEY, LLM_MODEL, MAX_CHARS, MAX_HISTORY
from .rate_limit import allow

log = logging.getLogger("portfolio-agent")

app = FastAPI(title="Portfolio agent API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.get("/health")
def health() -> dict:
    return {"ok": True, "mode": "llm" if LLM_API_KEY else "demo", "model": LLM_MODEL if LLM_API_KEY else None}


@app.post("/chat")
async def chat(body: ChatRequest, request: Request) -> StreamingResponse:
    forwarded = request.headers.get("x-forwarded-for", "")
    ip = forwarded.split(",")[0].strip() or (request.client.host if request.client else "unknown")
    if not allow(ip):
        raise HTTPException(429, "Too many questions for now. Try again in a few minutes.")

    history = [
        {"role": m.role, "content": m.content[:MAX_CHARS]} for m in body.messages if m.content.strip()
    ][-MAX_HISTORY:]
    if not history or history[-1]["role"] != "user":
        raise HTTPException(400, "Send a question.")

    async def stream():
        try:
            async for event in run_agent(history):
                yield json.dumps(event, ensure_ascii=False) + "\n"
        except Exception:
            log.exception("agent failed")
            yield json.dumps({"type": "error", "message": "The agent hit an error reaching the model. Please try again."}) + "\n"

    return StreamingResponse(stream(), media_type="application/x-ndjson", headers={"Cache-Control": "no-store"})
