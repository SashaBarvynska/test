from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .models import Members, Pets

# members
def index(request):
  mymembers = Members.objects.all().values()
  for mymember in mymembers:
    mymember['fullname'] = mymember['firstname'] + ' ' + mymember['lastname']
      

  template = loader.get_template('members/index.html')

  context = {
    'mymembers': mymembers,
  }
  return HttpResponse(template.render(context, request))
  
def add(request):
  template = loader.get_template('members/add.html')
  return HttpResponse(template.render({}, request))
  
def addrecord(request):
  first = request.POST['first']
  
  last = request.POST['last']
  age = request.POST['age']
  member = Members(firstname=first, lastname=last, age=age)
  member.save()
  return HttpResponseRedirect(reverse('index'))

def delete(request, id):
  member = Members.objects.get(id=id)
  member.delete()
  return HttpResponseRedirect(reverse('index'))

def update(request, id):
    mymember = Members.objects.get(id=id)
    template = loader.get_template('members/update.html')
    context = {
    'mymember': mymember,
    }
    return HttpResponse(template.render(context, request))

def updaterecord(request, id):
  first = request.POST['first']
  last = request.POST['last']
  age = request.POST['age']
  member = Members.objects.get(id=id)
  member.firstname = first
  member.lastname = last
  member.age = age
  member.save()
  return HttpResponseRedirect(reverse('index'))

def getDetails(request, id):
    member = Members.objects.get(id=id)

    try:
        mypets = Pets.objects.filter(member_id=id)
        # print(type(mypets), "mypets*****************************************************************")

    except Pets.DoesNotExist:
        mypets = []
        
    template = loader.get_template('members/details.html')
    context = {
    'member': member,
    'mypets': mypets,
    }
    return HttpResponse(template.render(context, request))
    

# pets
def pets(request):
    mypets = Pets.objects.all().values()
    template = loader.get_template('pets/index.html')
    context = {
    'mypets': mypets, 
    'isAdopt': False,
    }
    return HttpResponse(template.render(context, request))

def addpets(request):
  template = loader.get_template('pets/addpets.html')
  return HttpResponse(template.render({}, request))
  

def addrecordpet(request):
  name = request.POST['name']
  type = request.POST['type']
  gender = request.POST['gender']
  pet = Pets(name=name, type=type, gender=gender)
  pet.save()
  return HttpResponseRedirect(reverse('pets'))

def adopt(request, member_id):
    mypets = Pets.objects.all().values()
    template = loader.get_template('pets/index.html')
    context = {
    'mypets': mypets, 
    'isAdopt': True,
    'member_id': member_id,
    }
    return HttpResponse(template.render(context, request))

def adoptpet(request, member_id, pet_id):
    pet = Pets.objects.get(id=pet_id)
    pet.member_id = member_id
    pet.save()
    return HttpResponseRedirect(reverse('pets'))

def deletepet(request, id):
  pet = Pets.objects.get(id=id)
  pet.delete()
  return HttpResponseRedirect(reverse('index'))

def updatepet(request, id):
    mypet = Pets.objects.get(id=id)
    template = loader.get_template('pets/updatepet.html')
    context = {
    'mypet': mypet,
    }
    return HttpResponse(template.render(context, request))

def updaterecordpet(request, id):
  name = request.POST['name']
  type = request.POST.get('type', False)
  gender = request.POST['gender']
  pet = Pets.objects.get(id=id)
  pet.name = name
  pet.type = type
  pet.gender = gender
  pet.save()
  return HttpResponseRedirect(reverse('index'))

def removepet(request, pet_id):
 #  mypet = Pets.objects.get(name column = value column)
  mypet = Pets.objects.get(id=pet_id)
  mypet.member_id = None
  mypet.save()
  return HttpResponseRedirect(reverse('index'))

