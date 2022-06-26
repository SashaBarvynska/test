from django.urls import path
from . import views

urlpatterns = [
    path("members", views.handle_all_members, name="handle_all_members"),  
    path("members/<int:id>", views.handle_member, name="handle_member"),
    path("pets", views.handle_all_pets, name="handle_all_pets"),
    path("pets/<int:id>", views.handle_pet, name="handle_pet"),
    path("pets/<int:pet_id>/add", views.adopt_pet, name="adopt_pet"),
    path("pets/<int:pet_id>/remove", views.remove_pet, name="remove_pet"),
]
