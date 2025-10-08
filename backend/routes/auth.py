from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from utils.jwt_handler import create_access_token, decode_token
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from utils.otp import generate_otp, save_otp, verify_otp, send_email_smtp

router = APIRouter(prefix="/auth", tags=["Auth"])
security = HTTPBearer(auto_error=False)

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    if data.username == "admin" and data.password == "1234":
        token = create_access_token({"sub": data.username, "role": "admin"})
        return {"access_token": token, "token_type": "bearer"}
    if data.username == "gary" and data.password == "1234":
        token = create_access_token({"sub": data.username, "role": "user"})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully"}


class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


@router.post("/signup")
def signup(_: SignupRequest):
    # Mock signup. In production, save to DB and hash passwords
    return {"message": "Signup successful"}


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@router.get("/profile")
def profile(user = Depends(get_current_user)):
    return {"username": user.get("sub"), "role": user.get("role", "user")}


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest):
    code = generate_otp()
    save_otp(req.email, code)
    try:
        send_email_smtp(req.email, "Your OTP Code", f"Your verification code is: {code}")
    except Exception:
        # For local dev without SMTP configured, return code in response for testing
        return {"sent": False, "otp": code}
    return {"sent": True}


class VerifyOtpRequest(BaseModel):
    email: EmailStr
    code: str


@router.post("/verify-otp")
def verify_otp_endpoint(req: VerifyOtpRequest):
    ok = verify_otp(req.email, req.code)
    if not ok:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"verified": True}


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str
    new_password: str


@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest):
    if not verify_otp(req.email, req.code):
        raise HTTPException(status_code=400, detail="Invalid OTP")
    # In production, hash and persist new password here
    return {"reset": True}
