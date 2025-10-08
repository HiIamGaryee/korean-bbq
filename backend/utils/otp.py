import os
import random
import smtplib
from email.mime.text import MIMEText
from typing import Dict

_otp_store: Dict[str, str] = {}


def generate_otp(length: int = 6) -> str:
  return ''.join(random.choice('0123456789') for _ in range(length))


def save_otp(email: str, code: str) -> None:
  _otp_store[email] = code


def verify_otp(email: str, code: str) -> bool:
  return _otp_store.get(email) == code


def send_email_smtp(to_email: str, subject: str, body: str) -> None:
  host = os.getenv('SMTP_HOST', '')
  port = int(os.getenv('SMTP_PORT', '587'))
  user = os.getenv('SMTP_USER', '')
  password = os.getenv('SMTP_PASS', '')

  msg = MIMEText(body)
  msg['Subject'] = subject
  msg['From'] = user
  msg['To'] = to_email

  with smtplib.SMTP(host, port) as server:
    server.starttls()
    if user:
      server.login(user, password)
    server.send_message(msg)


