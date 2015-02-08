from django.forms import ModelForm

from django import forms
from django.contrib.auth import authenticate

class LoginForm(forms.Form):
	username = forms.CharField(label="Login")
	password = forms.CharField(label="Password", widget=forms.PasswordInput)

	def clean(self):
		cleaned_data = super(LoginForm, self).clean()
		username = self.cleaned_data.get('username')
		password = self.cleaned_data.get('password')
		if not authenticate(username=username, password=password):
			raise forms.ValidationError("Wrong login or password")
		return self.cleaned_data