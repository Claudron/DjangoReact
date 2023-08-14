from django.urls import path, include
from . import views
from .views import ContentList, PostContentDetail, CategoryList


urlpatterns = [
    path('content/', ContentList.as_view(), name='content_list'),
    path('content/<int:id>/', PostContentDetail.as_view(), name='content_detail'),
    path('content/categories/', CategoryList.as_view(), name='category_list'),
]
