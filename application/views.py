from django.http import JsonResponse, HttpRequest, QueryDict
from .models import Addresses, Members, Pets, Wallets
from .validators import CustomValidation
from django.db.models import F

# pets
def adopt_pet(request, pet_id):  # PUT
    put = QueryDict(request.body)
    member_id = put.get("member_id")
    pet = Pets.objects.get(id=pet_id)
    pet.member_id = member_id
    pet.save()
    return JsonResponse(
        {
            "adopted_pet": {
                "id": pet.pk,
                "name": pet.name,
                "type": pet.type,
                "gender": pet.gender,
                "member_id": pet.member_id,
                "country": pet.country,
            },
        }
    )


def remove_pet(request, pet_id):  # PUT
    pet = Pets.objects.get(id=pet_id)
    pet.member_id = None
    pet.save()
    return JsonResponse(
        {
            "removed_pet": {
                "id": pet.pk,
                "name": pet.name,
                "type": pet.type,
                "gender": pet.gender,
                "member_id": pet.member_id,
                "country": pet.country,
            },
        }
    )


def handle_member(request: HttpRequest, id):
    if request.method == "GET":

        member = Members.objects.get(id=id)

        try:
            mypets = Pets.objects.filter(member_id=id).values()
        except Pets.DoesNotExist:
            mypets = []

        return JsonResponse(
            {
                "member": {
                    "id": member.id,
                    "first_name": member.first_name,
                    "last_name": member.last_name,
                    "age": member.age,
                },
                "mypets": list(mypets),
            }
        )

    if request.method == "PUT":
        put = QueryDict(request.body)
        first_name = put.get("first_name")
        last_name = put.get("last_name")
        age = put.get("age")
        validated = CustomValidation(
            {
                "first_name": {
                    "value": first_name,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
                },
                "last_name": {
                    "value": last_name,
                    "validators": {"type": "str", "maxlength": 8, "minlength": 3},
                },
                "age": {
                    "value": age,
                    "validators": {"type": "int", "max_value": 99, "min_value": 1},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        member = Members.objects.get(id=id)
        member.first_name = first_name
        member.last_name = last_name
        member.age = age
        member.save()
        return JsonResponse(
            {
                "updated_member": {
                    "id": member.pk,
                    "first_name": first_name,
                    "last_name": last_name,
                    "age": age,
                },
            }
        )

    if request.method == "DELETE":
        member = Members.objects.get(id=id)
        member.delete()
        return JsonResponse(
            {
                "deleted_member": {
                    "id": member.pk,
                    "first_name": first_,
                    "last_name": last_,
                    "age": age,
                },
            }
        )


def handle_all_members(request: HttpRequest):
    if request.method == "GET":
        mymembers = Members.objects.all().values(
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
        print("****************************** ", mymembers.query)
        return JsonResponse(
            {
                "members": list(mymembers),
            }
        )

    if request.method == "POST":
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        age = request.POST["age"]
        validated = CustomValidation(
            {
                "first_name": {
                    "value": first_name,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
                },
                "last_name": {
                    "value": last_name,
                    "validators": {"type": "str", "maxlength": 8, "minlength": 3},
                },
                "age": {
                    "value": age,
                    "validators": {"type": "int", "max_value": 99, "min_value": 1},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        member = Members(first_name=first_name, last_name=last_name, age=age)
        member.save()
        return JsonResponse(
            {
                "created_member": {
                    "id": member.pk,
                    "first_name": member.first_name,
                    "last_name": member.last_name,
                    "age": member.age,
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
                    "member_id": pet.member_id,
                    "country": pet.country,
                },
            }
        )

    if request.method == "PUT":

        put = QueryDict(request.body)
        name: str = put.get("name")
        type_field = put.get("type_field")
        gender = put.get("gender")
        country = put.get("country")
        validated = CustomValidation(
            {
                "name": {
                    "value": name,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
                },
                "type_field": {
                    "value": type_field,
                    "validators": {"type": "str", "maxlength": 8, "minlength": 3},
                },
                "gender": {
                    "value": gender,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
                },
            }
        )

        if validated.is_valid == False:
            return validated.get_errors()

        pet = Pets.objects.get(id=id)
        pet.name = name
        pet.type = type_field
        pet.gender = gender
        pet.country = country
        pet.save()
        return JsonResponse(
            {
                "created_pet": {
                    "id": pet.pk,
                    "name": pet.name,
                    "type": pet.type,
                    "gender": pet.gender,
                    "member_id": pet.member_id,
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
                    "member_id": pet.member_id,
                    "country": pet.country,
                },
            }
        )


def handle_all_pets(request: HttpRequest):

    if request.method == "POST":
        name = request.POST["name"]
        type = request.POST["type"]
        gender = request.POST["gender"]
        country = request.POST["country"]
        validated = CustomValidation(
            {
                "name": {
                    "value": name,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
                },
                "typefield": {
                    "value": type,
                    "validators": {"type": "str", "maxlength": 8, "minlength": 3},
                },
                "gender": {
                    "value": gender,
                    "validators": {"type": "str", "maxlength": 10, "minlength": 3},
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
                "member_id": pet.member_id,
            }
        )

    if request.method == "GET":
        mypets = Pets.objects.all().values()
        return JsonResponse(
            {
                "pets": list(mypets),
            }
        )
