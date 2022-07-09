import json
from django.http import JsonResponse, HttpRequest
from ..models import Pets
from ..validators import CustomValidation
from django.db.models import F


def adopt_pet(request, pet_id):  # PUT
    data = json.loads(request.body)
    user_id = data["user_id"]
    pet = Pets.objects.get(id=pet_id)
    pet.user_id = user_id
    pet.save()
    return JsonResponse(
        {
            "adopted_pet": {
                "id": pet.pk,
                "name": pet.name,
                "type": pet.type,
                "gender": pet.gender,
                "user_id": pet.user_id,
                "country": pet.country,
            },
        }
    )


def remove_pet(request, pet_id):  # PUT
    pet = Pets.objects.get(id=pet_id)
    pet.user_id = None
    pet.save()
    return JsonResponse(
        {
            "removed_pet": {
                "id": pet.pk,
                "name": pet.name,
                "type": pet.type,
                "gender": pet.gender,
                "user_id": pet.user_id,
                "country": pet.country,
            },
        }
    )


def handle_pet(request: HttpRequest, id):

    if request.method == "GET":
        pet = Pets.objects.get(id=id)
        return JsonResponse(
            {
                "pet": {
                    "id": pet.pk,
                    "name": pet.name,
                    "type": pet.type,
                    "gender": pet.gender,
                    "user_id": pet.user_id,
                    "country": pet.country,
                },
            }
        )

    if request.method == "PUT":
        data = json.loads(request.body)
        validated = CustomValidation(
            {
                "name": {
                    "value": data["name"],
                    "validators": {"type": "str", "max_length": 10, "min_length": 3},
                },
                "type_field": {
                    "value": data["type"],
                    "validators": {"type": "str", "max_length": 8, "min_length": 3},
                },
                "gender": {
                    "value": data["gender"],
                    "validators": {"type": "str", "max_length": 10, "min_length": 3},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        pet = Pets.objects.get(id=id)
        pet.name = data["name"]
        pet.type = data["type"]
        pet.gender = data["gender"]
        pet.country = data["country"]
        pet.save()
        return JsonResponse(
            {
                "updated_pet": {
                    "id": pet.pk,
                    "name": pet.name,
                    "type": pet.type,
                    "gender": pet.gender,
                    "user_id": pet.user_id,
                    "country": pet.country,
                },
            }
        )

    if request.method == "DELETE":
        pet = Pets.objects.get(id=id)
        pet.delete()
        return JsonResponse(
            {
                "deleted_pet": {
                    "id": pet.pk,
                    "name": pet.name,
                    "type": pet.type,
                    "gender": pet.gender,
                    "user_id": pet.user_id,
                    "country": pet.country,
                },
            }
        )


def handle_all_pets(request: HttpRequest):

    if request.method == "POST":
        data = json.loads(request.body)
        name = data["name"]
        type = data["type"]
        gender = data["gender"]
        country = data["country"]
        validated = CustomValidation(
            {
                "name": {
                    "value": name,
                    "validators": {"type": "str", "max_length": 25, "min_length": 1},
                },
                "typefield": {
                    "value": type,
                    "validators": {"type": "str", "max_length": 25, "min_length": 1},
                },
                "gender": {
                    "value": gender,
                    "validators": {"type": "str", "max_length": 10, "min_length": 3},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()
        pet = Pets(name=name, type=type, gender=gender, country=country)
        pet.save()
        return JsonResponse(
            {
                "pet": {
                    "id": pet.pk,
                    "name": pet.name,
                    "type": pet.type,
                    "gender": pet.gender,
                    "country": pet.country,
                },
                "user_id": pet.user_id,
            }
        )

    if request.method == "GET":
        pets = Pets.objects.all().values()
        return JsonResponse(
            {
                "pets": list(pets),
            }
        )
