from abc import ABC, abstractmethod


class StorageProvider(ABC):
    """Adapter interface so object storage can change without touching product modules."""

    @abstractmethod
    async def signed_upload_url(self, *, key: str, content_type: str, expires_in: int = 900) -> str:
        raise NotImplementedError

    @abstractmethod
    async def signed_download_url(self, *, key: str, expires_in: int = 900) -> str:
        raise NotImplementedError


class S3StorageProvider(StorageProvider):
    async def signed_upload_url(self, *, key: str, content_type: str, expires_in: int = 900) -> str:
        raise NotImplementedError("Wire up AWS S3 bucket/region before use")

    async def signed_download_url(self, *, key: str, expires_in: int = 900) -> str:
        raise NotImplementedError("Wire up AWS S3 bucket/region before use")
