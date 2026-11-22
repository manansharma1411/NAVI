from datetime import datetime, timezone
from typing import Dict
from pydantic import BaseModel, Field


class ComponentStatus(BaseModel):
    orchestrator: bool = Field(default=True, description="Orchestration state machine ready")
    planner: bool = Field(default=False, description="Planner model connected")
    bridge: bool = Field(default=True, description="Extension bridge WebSocket server ready")


class StatusResponse(BaseModel):
    status: str = Field(default="healthy", description="Overall backend status")
    service: str = Field(default="navi-backend", description="Service identifier")
    version: str = Field(default="0.1.0", description="Application version")
    environment: str = Field(default="development", description="Current runtime environment")
    uptime_seconds: float = Field(..., description="Seconds since backend started")
    active_sessions: int = Field(default=0, description="Active browser agent sessions")
    agent_ready: bool = Field(default=False, description="Whether the agent is ready to execute tasks")
    timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(),
        description="UTC timestamp"
    )
    components: ComponentStatus = Field(
        default_factory=ComponentStatus,
        description="Subsystem operational readiness"
    )
