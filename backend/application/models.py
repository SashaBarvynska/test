from distutils.command import register
from django.db import models


class Users(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.SmallIntegerField(null=True)


class Countries(models.TextChoices):
    USA = "United States"
    Germany = "Germany"
    Ukraine = "Ukraine"
    UK = "United Kingdom"
    China = "China"


class Pets(models.Model):
    country = models.CharField(
        max_length=30,
        choices=Countries.choices,
        default=Countries.USA,
    )
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)


class Currencies(models.TextChoices):
    dollar = "USD"
    euro = "EU"
    hryvnia = "UAH"
    pound = "GBD"
    yuan = "CNY"


class Wallets(models.Model):
    currency = models.CharField(
        max_length=3,
        choices=Currencies.choices,
        default=Currencies.dollar,
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, null=True, related_name="Wallets"
    )


class Addresses(models.Model):
    country = models.CharField(
        max_length=30,
        choices=Countries.choices,
        default=Countries.USA,
    )
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, null=True, related_name="Addresses"
    )
    phone_number = models.CharField(max_length=11)
    city = models.CharField(max_length=30)


class Currency_country(models.Model):
    country = models.CharField(
        max_length=30,
        choices=Countries.choices,
        default=Countries.USA,
    )
    currency = models.CharField(
        max_length=3,
        choices=Currencies.choices,
        default=Currencies.dollar,
    )
