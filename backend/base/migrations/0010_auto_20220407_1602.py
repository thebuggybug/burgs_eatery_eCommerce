# Generated by Django 3.1.4 on 2022-04-07 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_auto_20220404_2154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/defaultImage.png', null=True, upload_to=''),
        ),
    ]
