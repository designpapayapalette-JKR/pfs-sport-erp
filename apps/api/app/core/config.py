from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    database_url: str = ""
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    session_ttl_minutes: int = 60 * 24

    aws_s3_bucket: str = ""
    aws_region: str = "ap-south-1"

    zeptomail_api_key: str = ""
    zeptomail_sender: str = ""

    llm_provider: str = "kimi"
    llm_api_key: str = ""
    llm_model: str = "kimi-k2.6"
    llm_endpoint: str = ""

    cors_origins: list[str] = ["http://localhost:3000"]

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
