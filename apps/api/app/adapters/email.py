from abc import ABC, abstractmethod


class EmailProvider(ABC):
    """Adapter interface so the transactional email provider can change without touching product modules."""

    @abstractmethod
    async def send(self, *, to: str, template: str, variables: dict[str, str]) -> str:
        """Returns the provider message ID."""
        raise NotImplementedError


class ZeptoMailProvider(EmailProvider):
    async def send(self, *, to: str, template: str, variables: dict[str, str]) -> str:
        raise NotImplementedError("Wire up ZeptoMail API key/sender domain before use")
