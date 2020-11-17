from chalice import Chalice
import redis
from utils.response_handler import return_response, cors_config
from utils import decrypt_sec_key_with_kms_key
from services.comments_service import CommentService
import urllib.parse
import boto3
import os

redis_password =decrypt_sec_key_with_kms_key(os.environ['REDIS_PASSWORD'])

client = redis.Redis(host=os.environ['REDIS_HOST'],
                     port=os.environ['REDIS_PORT'], password=redis_password, decode_responses=True)


app = Chalice(app_name='movie-comments-microservice')


comment = CommentService(client=client)


@app.route('/', methods=['POST'], content_types=['application/json'], cors=cors_config)
def create_comment():
    event = app.current_request.json_body
    # print('event: %s' % (event))
    comment_id = comment.insert(movie=event.get('movie'), comment=event.get(
        'comment'), user_id=event.get('user_id'), rating=event.get('rating'))
    return return_response({'id': comment_id}, 200)


@app.route('/', methods=['DELETE'], content_types=['application/json'], cors=cors_config)
def delete_comment():
    event = app.current_request.json_body
    comment_id = event.get('comment_id')
    comment.delete(comment_id)
    return return_response({'id': comment_id, 'msg': 'Comment deleted successfully'}, 200)


@app.route('/{comment_id}', methods=['GET'], content_types=['application/json'], cors=cors_config)
def index(comment_id):
    comment_id = urllib.parse.unquote(comment_id)
    comment_data = comment.get(comment_id=comment_id)
    return return_response(comment_data, 200)


@app.route('/movies/{movie_id}/comments', methods=['GET'], content_types=['application/json'], cors=cors_config)
def search(movie_id):
    limit = 10
    offset = 0
    if app.current_request.query_params:
        limit = int(app.current_request.query_params['limit'])
        offset = int(app.current_request.query_params['offset'])

    data = comment.search(
        limit=limit,
        offset=offset,
        movie=movie_id
    )
    return data
