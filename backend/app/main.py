import sys
from pathlib import Path
from contextlib import asynccontextmanager

# Ensure both repo root and backend parent directories are in sys.path
_current_file = Path(__file__).resolve()
_backend_dir = _current_file.parent.parent  # .../backend
_repo_root = _backend_dir.parent            # .../NAVI
for p in (str(_repo_root), str(_backend_dir)):
    if p not in sys.path:
        sys.path.insert(0, p)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.schemas.health import HealthResponse
from backend.app.api.v1.router import api_router
from backend.app.api.v1.endpoints.health import get_health


@asynccontextmanager
async def lifespan(app: FastAPI):
    allowed_origins = settings.get_allowed_origins()
    logger.info(
        f"Starting {settings.PROJECT_NAME} v{settings.VERSION} "
        f"[{settings.ENVIRONMENT}] on port {settings.PORT}"
    )
    logger.info(f"Configured CORS origins: {allowed_origins}")
    yield
    logger.info(f"Shutting down {settings.PROJECT_NAME}")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="NAVI - Neural Autonomous Web Intelligence Core Backend Service",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Production-ready CORS configuration
# Explicit allowed origins, no wildcard '*' for credentialed requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_origin_regex=r"^chrome-extension://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check endpoint for Render / health checks
@app.get("/health", response_model=HealthResponse, tags=["Health"])
def root_health() -> HealthResponse:
    """Root health check for load balancers and deployment probes."""
    return get_health()

# Include versioned API router
app.include_router(api_router, prefix="/api/v1")

# Global Exception Handler
@app.exception_handler(Exception)
def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "InternalServerError",
            "message": "An unexpected error occurred processing your request.",
            "path": request.url.path
        }
    )
