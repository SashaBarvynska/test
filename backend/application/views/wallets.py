from django.http import HttpRequest, JsonResponse
import json
from ..validators import CustomValidation
from ..models import Wallets


def handle_wallets_create(request: HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data["user_id"]
        currency = data["currency"]
        amount = data["amount"]
        validated = CustomValidation(
            {
                "amount": {
                    "value": amount,
                    "validators": {
                        "type": "int",
                        "max_amount": 1000,
                        "min_amount": 1,
                    },
                },
            }
        )
        if validated.is_valid == False:
            return validated.get_errors()

        wallet = Wallets(
            currency=currency,
            amount=amount,
            user_id=user_id,
        )
        wallet.save()
        return JsonResponse(
            {
                "created_wallet": {
                    "id": wallet.pk,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )
def handle_wallets_update(request: HttpRequest, id):
    if request.method == "PUT":
        data = json.loads(request.body)
        amount = data["amount"]
        validated = CustomValidation(
            {
                "amount": {
                    "value": amount,
                    "validators": {
                        "type": "int",
                        "max_amount": 1000,
                        "min_amount": 1,
                    },
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        wallet = Wallets.objects.get(id=id)
        wallet.currency = data["currency"]
        wallet.amount = data["amount"]
        wallet.save()
        return JsonResponse(
            {
                "updated_wallet": {
                    "id": wallet.pk,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )

    if request.method == "DELETE":
        wallet = Wallets.objects.get(id=id)
        wallet.delete()
        return JsonResponse(
            {
                "deleted_wallet": {
                    "id": wallet.pk,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )
