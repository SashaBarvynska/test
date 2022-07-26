from django.urls import path

from .views import users, pets, addresses, wallets
# end_point = адреса, где находяться обработчики ресурсов
urlpatterns = [
    path("users", users.handle_all_users, name="handle_all_users"),
    path("users/<int:id>", users.handle_user, name="handle_user"),
    path("pets", pets.handle_all_pets, name="handle_all_pets"),
    path("pets/<int:id>", pets.handle_pet, name="handle_pet"),
    path("pets/<int:pet_id>/add", pets.adopt_pet, name="adopt_pet"),
    path("pets/<int:pet_id>/remove", pets.remove_pet, name="remove_pet"),
    path(
        "addresses", addresses.handle_addresses_create, name="handle_addresses_create"
    ),
    path(
        "addresses/<int:id>",
        addresses.handle_addresses_update,
        name="handle_addresses_update",
    ),
    path("wallets", wallets.handle_wallets_create, name="handle_wallets_create"),
    path(
        "wallets/<int:id>", wallets.handle_wallets_update, name="handle_wallets_update"
    ),
]
