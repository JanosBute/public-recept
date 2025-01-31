# Generated by Django 4.2.16 on 2025-01-09 12:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cookbook', '0002_alter_recipe_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ingredient',
            options={'ordering': ['category', 'name']},
        ),
        migrations.AlterModelOptions(
            name='recipe',
            options={'ordering': ['category', 'name']},
        ),
        migrations.AddField(
            model_name='ingredient',
            name='category',
            field=models.CharField(default='?', max_length=30),
        ),
        migrations.AddField(
            model_name='recipe',
            name='category',
            field=models.CharField(default='?', max_length=30),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='author',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
