from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.schemas.health import HealthResponse
from backend.app.api.v1.router import api_router
from backend.app.api.v1.endpoints.health import get_health

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="NAVI - Neural Autonomous Web Intelligence Core Backend Service",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware for local web dashboard and extension integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_origin_regex=r"^chrome-extension://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check endpoint
@app.get("/health", response_model=HealthResponse, tags=["Health"])
def root_health() -> HealthResponse:
    """Root health check for load balancers and container probes."""
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
