from fastapi import APIRouter

router = APIRouter(prefix="/api/categories", tags=["Categories"])

_CATEGORIES = ["BBQ", "Bibimbap", "Sides", "Drinks"]


@router.get("/")
def list_categories():
    return {"categories": _CATEGORIES}


