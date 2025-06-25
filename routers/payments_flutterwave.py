# routers/payments_flutterwave.py

from fastapi import APIRouter, Request, HTTPException
import httpx, os
from models.user import User
from models.wallet import Wallet
from models.wallet_transaction import WalletTransaction
from models.platform_earnings import PlatformEarnings
from utils.admin_wallet_logger import log_admin_wallet_activity  # optional
from services.fee_logic import calculate_fee

router = APIRouter(prefix="/api/flutterwave", tags=["Payments"])

FLW_SECRET_KEY = os.getenv("FLW_SECRET_KEY")


@router.post("/verify")
async def verify_flutterwave_payment(request: Request):
    body = await request.json()
    transaction_id = body.get("transaction_id")

    if not transaction_id:
        raise HTTPException(status_code=400, detail="Missing transaction_id")

    url = f"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
    headers = {"Authorization": f"Bearer {FLW_SECRET_KEY}"}

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, headers=headers)

    data = resp.json()
    if data["status"] != "success":
        raise HTTPException(status_code=400, detail="Payment not successful")

    payment = data["data"]
    email = payment["customer"]["email"]
    tx_ref = payment["tx_ref"]
    amount = float(payment["amount"])  # NGN

    # 1. Get user
    user = await User.get_or_none(email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Calculate fee
    fee = calculate_fee(user, "funding", amount)
    net_amount = amount - fee

    # 3. Credit wallet
    wallet, _ = await Wallet.get_or_create(user=user, defaults={"balance": 0})
    wallet.balance += net_amount
    await wallet.save()

    # 4. Record transaction
    await WalletTransaction.create(
        wallet=wallet,
        user=user,
        amount=net_amount,
        transaction_type="fund",
        description=f"Flutterwave funding (fee: ₦{fee})"
    )

    # 5. Log fee as platform earning
    await PlatformEarnings.create(
        user=user,
        source="funding",
        amount=fee
    )

    # 6. (Optional) Admin wallet logging
    await log_admin_wallet_activity(
        amount=fee,
        action="fee_credit",
        description=f"Flutterwave funding fee from {user.email}",
        triggered_by=user
    )

    return {
        "message": "Wallet funded successfully",
        "tx_ref": tx_ref,
        "gross_amount": amount,
        "net_amount": net_amount,
        "fee": fee
    }