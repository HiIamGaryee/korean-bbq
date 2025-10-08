from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from utils.jwt_handler import decode_token
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter(prefix="/api/admin", tags=["Admin"])
security = HTTPBearer(auto_error=False)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


def require_admin(user = Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user


class MenuItemIn(BaseModel):
    name: str
    price: float
    category: str
    description: str
    unit: Optional[str] = None


@router.get("/orders")
def list_orders(status: Optional[str] = Query(default=None), _admin = Depends(require_admin)):
    return {"orders": [], "filters": {"status": status}}


@router.get("/orders/{order_id}")
def get_order(order_id: str, _admin = Depends(require_admin)):
    return {"orderId": order_id, "status": "Confirmed"}


@router.post("/menu")
def add_menu_item(item: MenuItemIn, _admin = Depends(require_admin)):
    return {"id": "KBQ-NEW", **item.dict()}


@router.put("/menu/{item_id}")
def update_menu_item(item_id: str, item: MenuItemIn, _admin = Depends(require_admin)):
    return {"id": item_id, **item.dict()}


@router.delete("/menu/{item_id}")
def delete_menu_item(item_id: str, _admin = Depends(require_admin)):
    return {"deleted": True, "id": item_id}


@router.get("/stats")
def stats(_admin = Depends(require_admin)):
    return {"totalSales": 0, "topDishes": [], "activeUsers": 0}


@router.get("/users")
def users(_admin = Depends(require_admin)):
    # Mock users list (replace with DB)
    return {"users": [
        {"id": "1", "username": "admin", "email": "admin@example.com", "role": "admin"},
        {"id": "2", "username": "gary", "email": "gary@example.com", "role": "user"},
    ]}


@router.put("/users/{user_id}/role")
def change_role(user_id: str, role: str, _admin = Depends(require_admin)):
    return {"userId": user_id, "role": role}


# Categories management
@router.get("/categories")
def admin_categories(_admin = Depends(require_admin)):
    return {"categories": ["BBQ", "Bibimbap", "Sides", "Drinks"]}

@router.post("/categories")
def add_category(name: str, _admin = Depends(require_admin)):
    return {"ok": True, "name": name}

@router.delete("/categories")
def delete_category(name: str, _admin = Depends(require_admin)):
    return {"ok": True, "name": name}


# Shops management
@router.get("/shops")
def list_shops(_admin = Depends(require_admin)):
    return {"shops": [
        {"id": "KL-01", "name": "Seoul Grill KL", "isOpen": True},
        {"id": "PJ-02", "name": "Seoul Grill PJ", "isOpen": False},
    ]}

@router.put("/shops/{shop_id}/status")
def set_shop_status(shop_id: str, isOpen: bool, _admin = Depends(require_admin)):
    return {"id": shop_id, "isOpen": isOpen}


@router.get("/profile")
def admin_profile(admin = Depends(require_admin)):
    return {"username": admin.get("sub"), "role": admin.get("role")}


