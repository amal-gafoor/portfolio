"""BM25 keyword retrieval over the knowledge chunks."""
import math
import re
from collections import Counter

from .knowledge import CHUNKS, Chunk

_STOP = set(
    "a an the is are was were be been of to in on for with and or his her he she it this that what which who how "
    "does do did has have had about tell me show can you your i my any some at as by from amal gafoor".split()
)
_ABOUT_BOT = re.compile(
    r"(chat ?bot|\bbot\b|this (site|agent|chat|assistant)|how (do|does) (this|it|you) work|under the hood)", re.I
)
_K1, _B = 1.4, 0.75


def _tokenize(text: str) -> list[str]:
    words = re.sub(r"[^a-z0-9+#.]+", " ", text.lower()).split()
    words = [w.strip(".") for w in words]
    return [w for w in words if len(w) > 1 and w not in _STOP]


_DOCS = [_tokenize(f"{c.title} {c.text}") for c in CHUNKS]
_AVG_LEN = sum(len(d) for d in _DOCS) / len(_DOCS)
_DF = Counter(t for d in _DOCS for t in set(d))


def search(query: str, k: int = 3) -> list[tuple[Chunk, float]]:
    """Return the top-k chunks with a score above zero, best first."""
    terms = _tokenize(query)
    about_bot = bool(_ABOUT_BOT.search(query))
    hits: list[tuple[Chunk, float]] = []
    for chunk, doc in zip(CHUNKS, _DOCS):
        score = 0.0
        if chunk.id == "how-this-works":
            # the chunk describing the bot itself only competes when the question is about the bot
            if not about_bot:
                continue
            score += 5
        for term in terms:
            tf = sum(1 for t in doc if t == term or t.startswith(term) or term.startswith(t))
            if not tf:
                continue
            n = _DF.get(term, 1)
            idf = math.log(1 + (len(_DOCS) - n + 0.5) / (n + 0.5))
            score += idf * tf * (_K1 + 1) / (tf + _K1 * (1 - _B + _B * len(doc) / _AVG_LEN))
        if score > 0:
            hits.append((chunk, score))
    hits.sort(key=lambda h: h[1], reverse=True)
    return hits[:k]
