# Generated by Django 3.1.4 on 2022-04-12 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_auto_20220411_1240'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='variation',
            field=models.CharField(blank=True, choices=[('XL', 'XL'), ('SM', 'SM')], max_length=20, null=True),
        ),
    ]
