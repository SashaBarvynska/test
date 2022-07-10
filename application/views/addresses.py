from django.http import HttpRequest, JsonResponse
import json
from ..validators import CustomValidation
from ..models import Addresses


def handle_addresses_create(request: HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data["user_id"]
        country = data["country"]
        city = data["city"]
        phone_number = data["phone_number"]
        validated = CustomValidation(
            {
                "country": {
                    "value": country,
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
                    "value": phone_number,
                    "validators": {
                        "type": "int",
                        "length": 11,
                    },
                },
                "city": {
                    "value": city,
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
                "user_id": {
                    "value": user_id,
                    "validators": {"type": "int"},
                },
            }
        )
        if validated.is_valid == False:
            return validated.get_errors()
        address = Addresses(
            country=country, city=city, phone_number=phone_number, user_id=user_id
        )
        address.save()
        return JsonResponse(
            {
                "created_address": {
                    "id": address.pk,
                    "country": address.country,
                    "city": address.city,
                    "phone_number": address.phone_number,
                },
            }
        )


def handle_addresses_update(request: HttpRequest, id):
    if request.method == "PUT":
        data = json.loads(request.body)
        validated = CustomValidation(
            {
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
                "city": {
                    "value": data["city"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        address = Addresses.objects.get(id=id)
        address.country = data["country"]
        address.city = data["city"]
        address.phone_number = data["phone_number"]
        address.save()
        return JsonResponse(
            {
                "updated_address": {
                    "id": address.pk,
                    "country": address.country,
                    "city": address.city,
                    "phone_number": address.phone_number,
                },
            }
        )
    if request.method == "DELETE":
        address = Addresses.objects.get(id=id)
        address.delete()
        return JsonResponse(
            {
                "deleted_address": {
                    "id": address.pk,
                    "country": address.country,
                    "phone_number": address.phone_number,
                    "city": address.city,
                },
            }
        )
