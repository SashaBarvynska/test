from django.urls import path
from .views import users, pets

urlpatterns = [
    path("users", users.handle_all_users, name="handle_all_users"),
    path("users/<int:id>", users.handle_user, name="handle_user"),
    path("pets", pets.handle_all_pets, name="handle_all_pets"),
    path("pets/<int:id>", pets.handle_pet, name="handle_pet"),
    path("pets/<int:pet_id>/add", pets.adopt_pet, name="adopt_pet"),
    path("pets/<int:pet_id>/remove", pets.remove_pet, name="remove_pet"),
]
