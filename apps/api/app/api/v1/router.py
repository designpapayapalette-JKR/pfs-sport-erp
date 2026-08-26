from fastapi import APIRouter

api_router = APIRouter(prefix="/api/v1")

# Domain routers are registered here as they're built, e.g.:
# from app.api.v1 import auth, dealers, products
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
