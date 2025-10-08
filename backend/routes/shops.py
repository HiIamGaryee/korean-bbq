from fastapi import APIRouter

router = APIRouter(prefix="/api/shops", tags=["Shops"])


@router.get("/")
def list_shops():
    return {"shops": [
        {"id": "KL-01", "name": "Seoul Grill KL", "isOpen": True},
        {"id": "PJ-02", "name": "Seoul Grill PJ", "isOpen": False},
    ]}


