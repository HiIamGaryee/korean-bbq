from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from utils.jwt_handler import decode_token
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter(prefix="/api", tags=["Orders"])
security = HTTPBearer(auto_error=False)


class OrderItem(BaseModel):
    id: str
    quantity: int
    priceAtOrderTime: float


class Customer(BaseModel):
    name: str
    phone: str
    email: str


class CreateOrderRequest(BaseModel):
    customer: Customer
    items: List[OrderItem]
    orderType: str
    specialInstructions: Optional[str] = None
    paymentMethod: str
    estimatedTotal: float


class ItemSummary(BaseModel):
    name: str
    quantity: int
    unitPrice: float
    lineTotal: float


class Financials(BaseModel):
    subtotal: float
    taxRate: float
    taxAmount: float
    serviceFee: float
    totalAmount: float


class CreateOrderResponse(BaseModel):
    orderId: str
    status: str
    confirmationNumber: str
    orderTimestamp: str
    customerName: str
    pickupEstimateMinutes: int
    estimatedReadyTime: str
    itemsSummary: List[ItemSummary]
    financials: Financials
    instructions: Optional[str] = None


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@router.post("/order", response_model=CreateOrderResponse)
def create_order(payload: CreateOrderRequest, user = Depends(get_current_user)):
    # Generate fake IDs for now
    confirmation_number = "A1Z3X"
    now = datetime.now(timezone.utc)
    ready_dt = now + timedelta(minutes=30)
    order_id = f"KBQ-{now.strftime('%Y%m%d')}-{confirmation_number}"

    # Transform items into summary using provided fields
    items_summary: List[ItemSummary] = []
    subtotal = 0.0
    for item in payload.items:
        line_total = round(item.quantity * item.priceAtOrderTime, 2)
        subtotal = round(subtotal + line_total, 2)
        items_summary.append(
            ItemSummary(
                name=item.id,  # if mapping from id->name is needed, wire to menu store
                quantity=item.quantity,
                unitPrice=item.priceAtOrderTime,
                lineTotal=line_total,
            )
        )

    tax_rate = 0.07
    tax_amount = round(subtotal * tax_rate, 2)
    service_fee = 0.0
    total_amount = round(subtotal + tax_amount + service_fee, 2)

    response = CreateOrderResponse(
        orderId=order_id,
        status="Confirmed",
        confirmationNumber=confirmation_number,
        orderTimestamp=now.strftime("%Y-%m-%dT%H:%M:%SZ"),
        customerName=payload.customer.name,
        pickupEstimateMinutes=30,
        estimatedReadyTime=ready_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
        itemsSummary=items_summary,
        financials=Financials(
            subtotal=subtotal,
            taxRate=tax_rate,
            taxAmount=tax_amount,
            serviceFee=service_fee,
            totalAmount=total_amount,
        ),
        instructions=payload.specialInstructions,
    )
    return response


@router.get("/order/{order_id}")
def get_order(order_id: str, user = Depends(get_current_user)):
    # Mock one order echo (replace with DB)
    if not order_id:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"orderId": order_id, "status": "Confirmed"}


@router.get("/order/user/{user_id}")
def get_user_orders(user_id: str, user = Depends(get_current_user)):
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    return {"userId": user_id, "orders": []}


