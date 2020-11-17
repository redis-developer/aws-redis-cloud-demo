from chalice import Chalice, Response
from chalice import CORSConfig


def return_response(response_payload, status):
    return Response(
        body=response_payload,
        status_code=status,
        headers={'Content-Type': 'application/json'}
    )


cors_config = CORSConfig(
    allow_origin='*',
    allow_headers=['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key',
                   'X-Amz-Security-Token', 'X-Requested-With', 'Content-Length', 'Accept',
                   'Origin', 'id_token', 'access_token', 'refresh_token', 'old_password'],
    max_age=600,
    expose_headers=['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key',
                    'X-Amz-Security-Token', 'X-Requested-With', 'Content-Length', 'Accept',
                    'Origin', 'Location'],
    allow_credentials=True
)
