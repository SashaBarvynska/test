import json
from django.http import JsonResponse, HttpRequest
from ..models import Addresses, Users, Pets, Wallets
from ..validators import CustomValidation
from django.db.models import F


def handle_user(request: HttpRequest, id):
    if request.method == "GET":
        user = Users.objects.get(id=id)
        address = user.Addresses.all()[0]
        wallet = user.Wallets.all()[0]
        try:
            pets = Pets.objects.filter(user_id=id).values()
        except Pets.DoesNotExist:
            pets = []

        return JsonResponse(
            {
                "user": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                    "country": address.country,
                    "phone_number": address.phone_number,
                    "city": address.city,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
                "pets": list(pets),
            }
        )

    if request.method == "PUT":
        data = json.loads(request.body)
        validated = CustomValidation(
            {
                "first_name": {
                    "value": data["first_name"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
                "last_name": {
                    "value": data["last_name"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
                "age": {
                    "value": data["age"],
                    "validators": {"type": "int", "max_value": 99, "min_value": 1},
                },
                "country": {
                    "value": data["country"],
                    "validators": {
                        "type": "str",
                        "max_length": 25,
                        "min_length": 2,
                        "enum": [
                            "United States",
                            "Germany",
                            "Ukraine",
                            "United Kingdom",
                            "China",
                        ],
                    },
                },
                "phone_number": {
                    "value": data["phone_number"],
                    "validators": {
                        "type": "int",
                        "length": 11,
                    },
                },
                "amount": {
                    "value": data["amount"],
                    "validators": {
                        "type": "int",
                        "max_amount": 1000,
                        "min_amount": 1,
                    },
                },
                "city": {
                    "value": data["city"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
            },
        )

        if validated.is_valid == False:
            return validated.get_errors()

        user = Users.objects.get(id=id)
        address = Addresses.objects.get(user_id=id)
        wallet = Wallets.objects.get(user_id=id)
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.age = data["age"]
        address.country = data["country"]
        address.city = data["city"]
        address.phone_number = data["phone_number"]
        wallet.currency = data["currency"]
        wallet.amount = data["amount"]
        user.save()
        address.save()
        wallet.save()
        return JsonResponse(
            {
                "updated_user": {
                    "id": user.pk,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                    "country": address.country,
                    "city": address.city,
                    "phone_number": address.phone_number,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )

    if request.method == "DELETE":
        user = Users.objects.get(id=id)
        address = user.Addresses.all()[0]
        wallet = user.Wallets.all()[0]
        user.delete()
        return JsonResponse(
            {
                "deleted_user": {
                    "id": user.pk,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                    "country": address.country,
                    "phone_number": address.phone_number,
                    "city": address.city,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )


def handle_all_users(request: HttpRequest):
    if request.method == "GET":
        users = Users.objects.all().values(
            "first_name",
            "last_name",
            "age",
            "id",
            country=F("Addresses__country"),
            phone_number=F("Addresses__phone_number"),
            city=F("Addresses__city"),
            currency=F("Wallets__currency"),
            amount=F("Wallets__amount"),
        )

        return JsonResponse(
            {
                "users": list(users),
            }
        )

    if request.method == "POST":
        data = json.loads(request.body)
        first_name = data["first_name"]
        last_name = data["last_name"]
        age = data["age"]
        country = data["country"]
        city = data["city"]
        phone_number = data["phone_number"]
        currency = data["currency"]
        amount = data["amount"]

        validated = CustomValidation(
            {
                "first_name": {
                    "value": first_name,
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
                "last_name": {
                    "value": last_name,
                    "validators": {"type": "str", "max_length": 25, "min_length": 1},
                },
                "age": {
                    "value": age,
                    "validators": {"type": "int", "max_value": 99, "min_value": 1},
                },
                "country": {
                    "value": data["country"],
                    "validators": {
                        "type": "str",
                        "max_length": 25,
                        "min_length": 2,
                        "enum": [
                            "United States",
                            "Germany",
                            "Ukraine",
                            "United Kingdom",
                            "China",
                        ],
                    },
                },
                "phone_number": {
                    "value": data["phone_number"],
                    "validators": {
                        "type": "int",
                        "length": 11,
                    },
                },
                "amount": {
                    "value": data["amount"],
                    "validators": {
                        "type": "int",
                        "max_amount": 1000,
                        "min_amount": 1,
                    },
                },
                "city": {
                    "value": data["city"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        user = Users(first_name=first_name, last_name=last_name, age=age)
        user.save()
        address = Addresses(
            country=country, city=city, phone_number=phone_number, user_id=user.id
        )
        address.save()
        wallet = Wallets(currency=currency, amount=amount, user_id=user.id)
        wallet.save()
        return JsonResponse(
            {
                "created_member": {
                    "id": user.pk,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                    "country": address.country,
                    "city": address.city,
                    "phone_number": address.phone_number,
                    "currency": wallet.currency,
                    "amount": wallet.amount,
                },
            }
        )
