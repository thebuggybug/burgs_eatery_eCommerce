from django.urls import path
from base.views import order_views as view

urlpatterns = [
    path('', view.getOrders, name='show-all-orders'), #shows all user to admin 
    path('add/', view.addOrderItems, name='orders-add'),
    path('myorders/', view.getMyOrders, name='myorders'), #shows all order by a particular user
    path('<str:pk>/deliver/', view.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/', view.getOrderById, name='user-order'),
    path('<str:pk>/pay/', view.updateOrderToPaid, name='order-pay'),

]
    