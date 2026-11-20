import os

from dotenv import load_dotenv

load_dotenv()

LLM_API_KEY = os.getenv("LLM_API_KEY", "").strip()
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://api.groq.com/openai/v1").rstrip("/")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.3-70b-versatile")

FRONTEND_ORIGINS = [o.strip().rstrip("/") for o in os.getenv("FRONTEND_ORIGINS", "").split(",") if o.strip()]

MAX_ROUNDS = 4          # LLM calls per question; tools are switched off on the last one
MAX_HISTORY = 8         # messages kept from the conversation
MAX_CHARS = 2000        # per message
RATE_LIMIT = 20         # questions per window, per IP
RATE_WINDOW_S = 600
