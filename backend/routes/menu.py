from fastapi import APIRouter, HTTPException, Query
from typing import Optional

router = APIRouter(prefix="/api/menu", tags=["Menu"])

menu_data = [
    {
        "id": "KBQ-001",
        "name": "Prime Galbi (Marinated Short Rib)",
        "category": "Beef",
        "price": 32.50,
        "unit": "1 lb",
        "description": "Our signature marinated beef short ribs, pre-cut and ready for grilling.",
        "isAvailable": True,
    },
    {
        "id": "KBQ-002",
        "name": "Samgyeopsal (Pork Belly)",
        "category": "Pork",
        "price": 26.00,
        "unit": "1 lb",
        "description": "Thick slices of unseasoned pork belly, perfect with ssamjang.",
        "isAvailable": True,
    },
    {
        "id": "KBQ-003",
        "name": "Kimchi Jjigae",
        "category": "Stew & Sides",
        "price": 14.00,
        "unit": "Bowl",
        "description": "Spicy traditional kimchi stew with pork and tofu. Served hot.",
        "isAvailable": True,
    },
    {
        "id": "KBQ-004",
        "name": "Soybean Paste Stew (Doenjang Jjigae)",
        "category": "Stew & Sides",
        "price": 13.00,
        "unit": "Bowl",
        "description": "Savory Korean soybean paste stew with vegetables.",
        "isAvailable": False,
    },
]

@router.get("/")
def list_menu(
    category: Optional[str] = Query(default=None),
    min_price: Optional[float] = Query(default=None, ge=0),
    max_price: Optional[float] = Query(default=None, ge=0),
    available: Optional[bool] = Query(default=None),
):
    items = menu_data
    if category:
        items = [m for m in items if m["category"] == category]
    if min_price is not None:
        items = [m for m in items if m["price"] >= min_price]
    if max_price is not None:
        items = [m for m in items if m["price"] <= max_price]
    if available is not None:
        items = [m for m in items if m["isAvailable"] == available]
    return {"menu": items}


@router.get("/{item_id}")
def get_menu_item(item_id: str):
    item = next((m for m in menu_data if m["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
