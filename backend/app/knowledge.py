"""The knowledge base the agent retrieves from, built from data/profile.json."""
import json
import re
from dataclasses import dataclass
from pathlib import Path

PROFILE = json.loads((Path(__file__).parent.parent / "data" / "profile.json").read_text(encoding="utf-8"))
SITE = PROFILE["site"]
PROJECTS: list[dict] = PROFILE["projects"]


@dataclass(frozen=True)
class Chunk:
    id: str
    title: str
    text: str


def _build() -> list[Chunk]:
    chunks = [
        Chunk("about", "About Amal", f"{SITE['name']} is an AI engineer. {' '.join(SITE['about'])} Location: {SITE['location']}."),
    ]
    for i, p in enumerate(PROJECTS, 1):
        text = f"{p['title']} ({p['tag']}). {p['blurb']} Tech stack: {', '.join(p['stack'])}."
        if p.get("live"):
            text += f" Live demo: {p['live']}."
        if p.get("code"):
            text += f" Code: {p['code']}."
        chunks.append(Chunk(f"project-{i}", f"Project: {p['title']}", text))
    for i, x in enumerate(PROFILE["experience"], 1):
        chunks.append(
            Chunk(f"experience-{i}", f"Experience: {x['title']}", f"{x['title']}, {x['org']} ({x['period']}). {' '.join(x['points'])}")
        )
    for g in PROFILE["skills"]:
        slug = re.sub(r"[^a-z]+", "-", g["group"].lower())
        chunks.append(
            Chunk(f"skills-{slug}", f"Skills: {g['group']}", f"{g['group']} skills and tools Amal works with: {', '.join(g['items'])}.")
        )
    chunks.append(
        Chunk(
            "education",
            "Education",
            "Amal graduated from the National Institute of Technology (NIT) Calicut. Education, degree, college, university.",
        )
    )
    chunks.append(
        Chunk(
            "how-this-works",
            "How this chatbot works",
            "This chatbot is a small agent built by Amal. The frontend is a Next.js site that only renders the UI. "
            "Each question goes to a Python FastAPI backend, where an LLM runs in a tool-calling loop with four tools: "
            "search_knowledge (retrieval over chunks of Amal's profile, the RAG step), show_projects (renders project "
            "cards in the chat), set_theme (switches the site between light and dark) and get_contact. The steps it "
            "takes are streamed to the page and shown in the trace above each answer, the retrieved chunks are listed "
            "as sources, and the stats line shows latency and token use. It is rate limited and it refuses to answer "
            "when retrieval finds nothing, instead of guessing.",
        )
    )
    return chunks


CHUNKS = _build()
