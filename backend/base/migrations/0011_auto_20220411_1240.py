# Generated by Django 3.1.4 on 2022-04-11 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_auto_20220407_1602'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='contact',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='region',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
