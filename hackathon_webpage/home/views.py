from home.forms import LoginForm

from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse

import csv
import os

def home(request):
	return render(request, "home/index.html",{'request':request})

def get(request):
	return render(request, "home/get.html",{'request':request})

def live(request):
	return render(request, "home/live.html",{'request':request})

def login(request):
	if request.POST:
		form = LoginForm(request.POST)
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			user = authenticate(username=username, password=password)

			if user is not None:
				auth_login(request, user)
				if request.GET.get('next') is not None:
					return redirect(request.GET['next'])
				else:
					return HttpResponseRedirect(reverse('home:home'))
		return render(request, 'home/login.html', {'form':form})
	else:
		form = LoginForm()
	return render(request, 'home/login.html', {'form':form})

@login_required
def log_out(request):
	logout(request)
	return HttpResponseRedirect(reverse('home:home'))

from django.http import JsonResponse
def download(request, query=None):
	BASE_DIR = os.path.dirname(os.path.dirname(__file__))
	response = HttpResponse(content_type='text/json')
	response['Content-Disposition'] = 'attachment; filename=data.json'
	response['X-Sendfile'] = BASE_DIR+"/home/data.json"

	return response