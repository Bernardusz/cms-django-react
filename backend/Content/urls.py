from rest_framework_nested import routers
from .views import ContentViewSet, SectionViewSet, CommentViewSet, ContentAccessViewSet

router = routers.SimpleRouter()
router.register(r'contents', ContentViewSet, basename='content')

content_router = routers.NestedSimpleRouter(router, r'contents', lookup='content')
content_router.register(r'sections', SectionViewSet, basename='content-sections')
content_router.register(r'comments', CommentViewSet, basename='content-comments')
content_router.register(r'access', ContentAccessViewSet, basename='content-access')
urlpatterns = router.urls + content_router.urls
