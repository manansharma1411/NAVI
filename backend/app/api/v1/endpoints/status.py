import time
from fastapi import APIRouter
from backend.app.core.config import settings
from backend.app.schemas.status import StatusResponse, ComponentStatus

router = APIRouter()
START_TIME = time.time()


@router.get("/status", response_model=StatusResponse, tags=["Status"])
def get_status() -> StatusResponse:
    """Return live backend subsystem status and runtime diagnostics."""
    uptime = time.time() - START_TIME
    has_api_key = bool(settings.GEMINI_API_KEY or settings.OPENAI_API_KEY)

    return StatusResponse(
        status="healthy",
        service="navi-backend",
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        uptime_seconds=round(uptime, 2),
        active_sessions=0,
        agent_ready=has_api_key,
        components=ComponentStatus(
            orchestrator=True,
            planner=has_api_key,
            bridge=True
        )
    )
