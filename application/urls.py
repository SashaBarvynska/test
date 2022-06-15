from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('add/', views.add, name='add'),
  path('add/addrecord/', views.addrecord, name='addrecord'),
  path('delete/<int:id>', views.delete, name='delete'),
  path('member/update/<int:id>', views.update, name='update'),
  path('member/update/updaterecord/<int:id>', views.updaterecord, name='updaterecord'),
  path('pets', views.pets, name='pets'),
  path('addpets/', views.addpets, name='addpets'),
  path('addpets/addrecordpet/', views.addrecordpet, name='addrecordpet'),
  path('member/<int:member_id>/adopt', views.adopt, name='adopt'),
  path('member/<int:member_id>/pet/<int:pet_id>/add', views.adoptpet, name='adoptpet'),
  path('member/<int:id>', views.getDetails, name='getDetails'),
  path('deletepet/<int:id>', views.deletepet, name='deletepet'),
  path('updatepet/<int:id>', views.updatepet, name='updatepet'),
  path('updatepet/updaterecordpet/<int:id>', views.updaterecordpet, name='updaterecordpet'),
  path('pet/<int:pet_id>/remove', views.removepet, name='removepet'),
]