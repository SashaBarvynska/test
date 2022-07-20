import json
from django.http import JsonResponse, HttpRequest
from ..models import Users, Pets
from ..validators import CustomValidation


def handle_user(request: HttpRequest, id):
    if request.method == "GET":
        # получаем юзера по айди из запроса
        user = Users.objects.get(id=id)
        # получаем все адреса конкретного юзера
        address = user.Addresses.first()
        # получаем все кошельки конкретного юзера
        wallet = user.Wallets.first()
        # если у конкретного юзера есть петсы
        try:
            # получаем петсов конкретного юзера
            pets = Pets.objects.filter(user_id=id).values()
        # если петсы отсутствуют у юзера
        except Pets.DoesNotExist:
            # получаем пустой список
            pets = []
        # отправляем ответ
        response = {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "age": user.age,
            },
            "address": None,
            "wallet": None,
            "pets": list(pets),
        }
        if(address):
            response.update({"address": {
                "id": address.id,
                "country": address.country,
                "city": address.city,
                "phone_number": address.phone_number,
            }}),
        if(wallet):
            response.update({"wallet": {
                "id": wallet.id,
                "currency": wallet.currency,
                "amount": wallet.amount,
            }}),
        return JsonResponse(response)

    if request.method == "PUT":
        # получаем данные из запроса в формате json (словарик)
        data = json.loads(request.body)
        # валидация полученных данных
        validated = CustomValidation(
            {
                "first_name": {
                    "value": data["first_name"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 2},
                },
                "last_name": {
                    "value": data["last_name"],
                    "validators": {"type": "str", "max_length": 25, "min_length": 1},
                },
                "age": {
                    "value": data["age"],
                    "validators": {"type": "int", "max_value": 99, "min_value": 1},
                },
            }
        )

        # если данные не правильные,
        if validated.is_valid == False:
            # возвращаем ошибки
            return validated.get_errors()
        # получаем юзера по айди
        user = Users.objects.get(id=id)
        # заменяем старые данные - новыми данными из запроса
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.age = data["age"]
        # сохраняем юзера в базу данных
        user.save()
        # отправляем ответ
        return JsonResponse({
            "updated_user": {
                "id": user.pk,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "age": user.age,
                },
            })

    if request.method == "DELETE":
        # получаем юзера по айди
        user = Users.objects.get(id=id)
        # удаляяем юзера
        user.delete()
        # отправляем ответ
        return JsonResponse(
            {
                "deleted_user": {
                    "id": user.pk,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                },
            }
        )


def handle_all_users(request: HttpRequest):
    if request.method == "GET":
        # получаем список юзеров из базы данных
        users = Users.objects.all().values(
            # "first_name",
            # "last_name",
            # "age",
            # "id",
            # country=F("Addresses__country"),
            # phone_number=F("Addresses__phone_number"),
            # city=F("Addresses__city"),
            # currency=F("Wallets__currency"),
            # amount=F("Wallets__amount"),
        )
        # отправляем ответ
        return JsonResponse(
            {
                "users": list(users),
            }
        )

    if request.method == "POST":
        # получаем данные из запроса в формате json (словарик)
        data = json.loads(request.body)
        # записываем данные из запроса в переменные
        first_name = data["first_name"]
        last_name = data["last_name"]
        age = data["age"]

        # валидация полученных данных
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
            }
        )

        # если данные не правильные,
        if validated.is_valid == False:
            # возвращаем ошибки
            return validated.get_errors()
        # Создаем юзера из ролученных данных
        user = Users(first_name=first_name, last_name=last_name, age=age)
        # сохраняем юзера в базу данных
        user.save()
        # отправляем ответ
        return JsonResponse(
            {
                "created_member": {
                    "id": user.pk,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "age": user.age,
                },
            }
        )
