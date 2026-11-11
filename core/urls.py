from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('leadership/', views.leadership, name='leadership'),
    path('intelligence/', views.reports_list, name='reports_list'),
    path('intelligence/<str:slug>/', views.report_detail, name='report_detail'),
]
