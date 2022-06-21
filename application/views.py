from turtle import reset
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpRequest, QueryDict
from django.template import loader
from django.urls import reverse
from .models import Members, Pets

# pets
def adopt_pet(request, pet_id):#PUT 
    put = QueryDict(request.body)
    member_id = put.get('member_id')
    pet = Pets.objects.get(id=pet_id)
    pet.member_id = member_id
    pet.save()
    return JsonResponse({
    'adopted_pet':{
      'id': pet.pk,
      'name': pet.name, 
      'type': pet.type, 
      'gender': pet.gender,
      'member_id': pet.member_id,
      },
    })

def remove_pet(request, pet_id):#PUT 
  pet = Pets.objects.get(id=pet_id)
  pet.member_id = None
  pet.save()
  return JsonResponse({
    'removed_pet':{
      'id': pet.pk,
      'name': pet.name, 
      'type': pet.type, 
      'gender': pet.gender,
      'member_id': pet.member_id,
      },
    })



def handle_member(request: HttpRequest, id):
  if request.method == "GET":
    member = Members.objects.get(id=id)

    try:
        mypets = Pets.objects.filter(member_id=id).values()
    except Pets.DoesNotExist:
        mypets = []
        
    return JsonResponse({
    'member': {  
        'id': member.id, 
        'firstname': member.firstname, 
        'lastname': member.lastname, 
        'age': member.age
      },
    'mypets': list(mypets),
    })

  if request.method == 'PUT':
    put = QueryDict(request.body)
    first = put.get('first')
    last = put.get('last')
    age = put.get('age')
    member = Members.objects.get(id=id)
    member.firstname = first
    member.lastname = last
    member.age = age
    member.save()
    return JsonResponse({
    'updated_member': {
      'id': member.pk,
      'firstname': first, 
      'lastname': last, 
      'age': age
      },
    })

  if request.method == 'DELETE':
    member = Members.objects.get(id=id)
    member.delete()
    return JsonResponse({
    'deleted_member': {
      'id': member.pk,
      'firstname': first, 
      'lastname': last, 
      'age': age
      },
    })

def handle_all_members(request: HttpRequest):
  if request.method == 'GET':
    mymembers = Members.objects.all().values()

    for mymember in mymembers:
      mymember['fullname'] = mymember['firstname'] + ' ' + mymember['lastname']
        
    return JsonResponse({
      'mymembers': list(mymembers),
    })

  if request.method == 'POST':
    first = request.POST['first']
    last = request.POST['last']
    age = request.POST['age']
    member = Members(firstname=first, lastname=last, age=age)
    member.save()
    return JsonResponse({
      'updated_member': {'id': member.pk, 'firstname': first, 'lastname': last, 'age': age},
    })



def handle_pet(request: HttpRequest, id):

  if request.method == "GET":
    pet = Pets.objects.get(id=id)
    return JsonResponse({
    'pet': {
      'id': pet.pk,
      'name': pet.name, 
      'type': pet.type, 
      'gender':pet.gender,
      'member_id': pet.member_id,
      },
    })

  if request.method == 'PUT':
    put = QueryDict(request.body)
    name = put.get('name')
    type = put.get('type')
    gender = put.get('gender')
    pet = Pets.objects.get(id=id)
    pet.name = name
    pet.type = type
    pet.gender = gender
    pet.save()
    return JsonResponse({
    'updated_pet': {
      'id': pet.pk,
      'name': pet.name, 
      'type': pet.type, 
      'gender':pet.gender,
      'member_id': pet.member_id,
      },
    })

  if request.method == 'DELETE':
    pet = Pets.objects.get(id=id)
    pet.delete()
    return JsonResponse({
    'deleted_pet': {
      'id': pet.pk,
      'name': pet.name, 
      'type': pet.type, 
      'gender': pet.gender,
      'member_id': pet.member_id,
      },
    })


def handle_all_pets(request: HttpRequest):

  if request.method == 'POST':
    name = request.POST['name']
    type = request.POST['type']
    gender = request.POST['gender']
    pet = Pets(name=name, type=type, gender=gender)
    pet.save()
    return JsonResponse({
      'updated_pet': {
        'id': pet.pk, 
        'name': pet.name, 
        'type': pet.type, 
        'gender': pet.gender},
        'member_id': pet.member_id,
    })

  if request.method == 'GET':
    mypets = Pets.objects.all().values()
    return JsonResponse({
    'mypets': list(mypets), 
    })

