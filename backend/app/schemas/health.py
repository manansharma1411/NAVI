from datetime import datetime, timezone
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Service health state")
    service: str = Field(default="navi-backend", description="Service identifier")
    version: str = Field(default="0.1.0", description="Application version")
    timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(),
        description="UTC timestamp of the health check"
    )
