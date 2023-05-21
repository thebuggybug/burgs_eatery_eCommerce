from django.urls import path
from base.views import user_views as view


urlpatterns = [
    path('', view.getUsers, name="users"),

    path('login/', view.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', view.registerUser, name='register'),

    path('profile/', view.getUserProfile, name="users-profile"),
    path('profile/update/', view.updateUserProfile, name="user-profile-update"),

    path('<str:pk>/', view.getUserById, name='user-by-id'),

    path('update/<str:pk>/', view.updateUser, name='user-update'),

    path('delete/<str:pk>/', view.deleteUser, name='user-delete'),

]
