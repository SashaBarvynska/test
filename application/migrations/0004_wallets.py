# Generated by Django 4.0.5 on 2022-06-25 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_pets'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wallets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(choices=[('USD', 'Dollar'), ('EU', 'Euro'), ('UAH', 'Hryvnia'), ('GBD', 'Pound'), ('CNY', 'Yuan')], default='USD', max_length=3)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('member', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='application.members')),
            ],
        ),
    ]
