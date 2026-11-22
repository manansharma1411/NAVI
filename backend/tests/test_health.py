import sys
from pathlib import Path

# Ensure project root is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from backend.app.main import app, root_health
from backend.app.core.config import Settings
from backend.app.api.v1.endpoints.health import get_health
from backend.app.api.v1.endpoints.status import get_status
from backend.app.schemas.health import HealthResponse
from backend.app.schemas.status import StatusResponse


def test_root_health():
    response = root_health()
    assert isinstance(response, HealthResponse)
    assert response.status == "healthy"
    assert response.service == "navi-backend"
    assert response.version == "0.1.0"
    assert response.timestamp is not None


def test_api_v1_health():
    response = get_health()
    assert isinstance(response, HealthResponse)
    assert response.status == "healthy"
    assert response.service == "navi-backend"


def test_api_v1_status():
    response = get_status()
    assert isinstance(response, StatusResponse)
    assert response.status == "healthy"
    assert response.service == "navi-backend"
    assert response.uptime_seconds >= 0
    assert response.components.orchestrator is True
    assert response.components.bridge is True


def test_app_routes():
    schema = app.openapi()
    paths = schema.get("paths", {})
    assert "/health" in paths
    assert "/api/v1/health" in paths
    assert "/api/v1/status" in paths


def test_cors_origins_normalization():
    # Test comma-separated string with trailing slashes and spaces
    cfg = Settings(
        CORS_ORIGINS="https://navi-web.vercel.app/, https://custom-domain.com",
        FRONTEND_URL="https://frontend-alias.vercel.app/"
    )
    origins = cfg.get_allowed_origins()
    assert "https://navi-web.vercel.app" in origins
    assert "https://custom-domain.com" in origins
    assert "https://frontend-alias.vercel.app" in origins
    assert "http://localhost:3000" in origins
    # Ensure no trailing slashes
    for o in origins:
        assert not o.endswith("/")
        assert o != "*"
