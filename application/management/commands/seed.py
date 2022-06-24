from django.core.management.base import BaseCommand
import random
from ...models import Pets, Members

# python manage.py seed --mode=refresh


class Command(BaseCommand):
    help = "seed database for testing and development."

    # def add_arguments(self, parser):
    #     parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        self.run_seed()
        self.stdout.write("done.")

    def run_seed(self):
        Members.objects.all().delete()
        Pets.objects.all().delete()
        for i in range(10):
            self.create_member()
            self.create_pet()

    def create_member(self):
        firstnames = [
            "Sasha",
            "Andrew",
            "Ura",
            "Eva",
            "Polina",
            "Vika",
            "Vitya",
            "Kostya",
        ]
        lastnames = [
            "Melnyk",
            "Kovalchuk",
            "Bondarenko",
            "Kravchuk",
            "Shevchenko",
            "Tymoshenko",
        ]

        member = Members(
            firstname=random.choice(firstnames),
            lastname=random.choice(lastnames),
            age=random.randint(18, 65),
        )
        member.save()
        print(f"{member.firstname} {member.lastname} created")

    def create_pet(self):
        names = ["Markiza", "Amur", "Tarzan", "Oskar", "Charly", "Karandash", "Milka"]
        types = ["cat", "dog", "cavy", "lizard", "parrot", "fish"]
        genders = ["male", "female"]

        pet = Pets(
            name=random.choice(names),
            type=random.choice(types),
            gender=random.choice(genders),
        )
        pet.save()
        print(f"{pet.type} {pet.name} created")
