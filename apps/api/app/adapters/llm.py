from abc import ABC, abstractmethod
from typing import Any


class LLMProvider(ABC):
    """Adapter interface so the model/provider can change without touching product modules."""

    @abstractmethod
    async def complete(self, prompt: str, *, schema: dict[str, Any] | None = None) -> Any:
        raise NotImplementedError


class KimiProvider(LLMProvider):
    async def complete(self, prompt: str, *, schema: dict[str, Any] | None = None) -> Any:
        raise NotImplementedError("Wire up Kimi K2.6 endpoint/credentials before use")
