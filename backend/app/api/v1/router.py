from fastapi import APIRouter
from backend.app.api.v1.endpoints import health, status

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(status.router)
