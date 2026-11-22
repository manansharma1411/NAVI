import os
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "NAVI Core Backend"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"

    HOST: str = "0.0.0.0"
    PORT: int = int(os.environ.get("PORT", 8000))

    # Optional single frontend URL shortcut for deployments
    FRONTEND_URL: str | None = None

    # Configurable CORS origins (can be comma-separated string or list)
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

    # Model providers (optional placeholders during scaffolding)
    GEMINI_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    def get_allowed_origins(self) -> List[str]:
        """Compute clean list of unique CORS origins without trailing slashes."""
        raw_origins: List[str] = []

        # Parse CORS_ORIGINS
        if isinstance(self.CORS_ORIGINS, str):
            raw_origins.extend([o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()])
        elif isinstance(self.CORS_ORIGINS, list):
            raw_origins.extend([str(o).strip() for o in self.CORS_ORIGINS if str(o).strip()])

        # Include FRONTEND_URL if provided
        if self.FRONTEND_URL and self.FRONTEND_URL.strip():
            raw_origins.append(self.FRONTEND_URL.strip())

        # Always include local development origins
        default_dev_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ]
        raw_origins.extend(default_dev_origins)

        # Normalize: strip trailing slashes, remove empty, deduplicate while preserving order
        cleaned: List[str] = []
        for origin in raw_origins:
            # Strip trailing slash e.g. "https://app.vercel.app/" -> "https://app.vercel.app"
            normalized = origin.rstrip("/")
            if normalized and normalized != "*" and normalized not in cleaned:
                cleaned.append(normalized)

        return cleaned


settings = Settings()
