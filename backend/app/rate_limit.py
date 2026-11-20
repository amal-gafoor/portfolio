"""Small in-memory rate limiter (per process). Swap for Redis when running more than one instance."""
import time

from .config import RATE_LIMIT, RATE_WINDOW_S

_hits: dict[str, list[float]] = {}


def allow(ip: str) -> bool:
    now = time.monotonic()
    recent = [t for t in _hits.get(ip, []) if now - t < RATE_WINDOW_S]
    if len(recent) >= RATE_LIMIT:
        _hits[ip] = recent
        return False
    recent.append(now)
    _hits[ip] = recent
    if len(_hits) > 5000:
        _hits.clear()
    return True
