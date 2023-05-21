from django.urls import path
from base.views import product_views as view

urlpatterns = [
    
    path('', view.getProducts, name="products"),

    path('create/', view.createProduct, name="product-create"),
    path('upload/', view.uploadImage, name="image-upload"),

    path('<str:pk>/review/', view.createProductReview, name="product-review"),
    path('top/', view.getTopProducts, name='top-products'),
    path('<int:pk>/', view.getProduct, name="single-product"),
    path('<str:category>/', view.getProductsCat, name="product"),

    

    path('update/<str:pk>/', view.updateProduct, name="product-update"),
    path('delete/<str:pk>/', view.deleteProduct, name="product-delete"),



]
