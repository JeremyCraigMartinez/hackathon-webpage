from django.conf.urls import patterns, url
from home import views

urlpatterns = patterns('',
	url(r'^$', views.home, name='redirect'),
	url(r'^home$', views.home, name='home'),
	url(r'^get$', views.get, name='get'),
	url(r'^live$', views.live, name='live'),
	url(r'^login$', views.login, name='login'),
	url(r'^download$', views.download, name='download'),
)