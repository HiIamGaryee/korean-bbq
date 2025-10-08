from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from utils.jwt_handler import decode_token
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter(prefix="/api/payment", tags=["Payment"])
security = HTTPBearer(auto_error=False)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


class CreatePaymentRequest(BaseModel):
    order_id: str
    amount: float


@router.post("/create")
def create_payment_session(payload: CreatePaymentRequest, _user = Depends(get_current_user)):
    return {
        "session_id": f"PAY-{payload.order_id}",
        "status": "created",
        "amount": payload.amount,
    }


