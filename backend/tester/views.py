from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Package
from .serializers import *

import os.path

def hello_world(request):
    return HttpResponse('Hello World')

def clean_old_package(package):
    if os.path.isfile(package.package.path):
        os.remove(package.package.path)

@api_view(['GET', 'POST', 'DELETE'])
def all_packages(request):
    if request.method == 'GET':
        data = Package.objects.all()
        serializer = PackageSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PackageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print(request.data)
        print(serializer)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        for package in Package.objects.all():
            clean_old_package(package)
            package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    

@api_view(['GET', 'PUT', 'DELETE'])
def package_id(request, id):
    try:
        package = Package.objects.get(pk=id)
    except Package.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PackageSerializer(package, context={'request':request})
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        clean_old_package(package)
        serializer = PackageSerializer(package, data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        clean_old_package(package)
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def package_name(request, name):
    try:
        package = Package.objects.get(name=name)
    except Package.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PackageSerializer(package, context={'request':request})
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        clean_old_package(package)
        serializer = PackageSerializer(package, data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        clean_old_package(package)
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)