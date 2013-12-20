MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'whichlunch'
SERVER_NAME = '127.0.0.1:5000'
URL_PREFIX = 'api'
DEBUG = True

DOMAIN = {
    'places': {
        'cache_control': 'max-age=1,must-revalidate',
        'cache_expires': 1,
        'schema' : {
            'name': {
                'type': 'string',
                'minlength': 1,
                'maxlength': 20,
            }
        },
        'resource_methods': ['GET', 'POST'],
        'item_methods': ['GET', 'PATCH', 'PUT', 'DELETE']
    },
}

