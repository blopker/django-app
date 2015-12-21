"""
Django settings specific for the testing environment
"""
from .common import *

DEBUG = False
TEMPLATE_DEBUG = False
SECRET_KEY = 'TEST_KEY'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    },
    'sessions': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# IN-MEMORY TEST DATABASE, not used but Django wants it.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "testDB?mode=memory&cache=shared",
        "USER": "",
        "PASSWORD": "",
        "HOST": "",
        "PORT": "",
    },
}
