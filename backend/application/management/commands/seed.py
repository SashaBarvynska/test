from locale import currency
from django.core.management.base import BaseCommand
import random
from ...models import *
from ...helpers import generate_mobile_number
from ...const import *

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
        Currency_country.objects.all().delete()
        self.create_currency_country(Countries.USA, Currencies.dollar)
        self.create_currency_country(Countries.China, Currencies.yuan)
        self.create_currency_country(Countries.Germany, Currencies.euro)
        self.create_currency_country(Countries.UK, Currencies.pound)
        self.create_currency_country(Countries.Ukraine, Currencies.hryvnia)

        Users.objects.all().delete()
        Pets.objects.all().delete()
        Wallets.objects.all().delete()

        for i in range(10):
            self.create_member()
            self.create_pet()

    def create_member(self):
        member = Users(
            first_name=random.choice(FIRSTNAMES),
            last_name=random.choice(LASTNAMES),
            age=random.randint(18, 65),
        )
        member.save()
        wallet = Wallets(
            currency=random.choice(Currencies.choices)[0],
            amount=random.randint(0, 1000),
            member_id=member.pk,
        )
        wallet.save()
        address = Addresses(
            member_id=member.pk,
            country=Currency_country.objects.get(currency=wallet.currency).country,
            phone_number=generate_mobile_number(),
            city=random.choice(CITIES),
        )
        address.save()

    def create_pet(self):
        pet = Pets(
            name=random.choice(NAMES),
            type=random.choice(TYPES),
            gender=random.choice(GENDERS),
            country=random.choice(Countries.choices)[0],
        )
        pet.save()
        print(f"{pet.type} {pet.name} created")

    def create_currency_country(self, country, currency):
        record = Currency_country(
            country=country,
            currency=currency,
        )
        record.save()
