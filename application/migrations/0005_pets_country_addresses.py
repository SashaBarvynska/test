# Generated by Django 4.0.5 on 2022-06-25 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0004_wallets'),
    ]

    operations = [
        migrations.AddField(
            model_name='pets',
            name='country',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Addresses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(choices=[('United States', 'Usa'), ('Germany', 'Germany'), ('Ukraine', 'Ukraine'), ('United Kingdom', 'Uk'), ('China', 'China')], default='United States', max_length=30)),
                ('phone_number', models.CharField(max_length=11)),
                ('city', models.CharField(max_length=30)),
                ('member', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='application.members')),
            ],
        ),
    ]
