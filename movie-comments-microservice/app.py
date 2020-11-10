from chalice import Chalice
import redis
from utils.response_handler import return_response, cors_config
from services.comments_service import CommentService
import urllib.parse


client = redis.Redis(host="redis-12555.c212.ap-south-1-1.ec2.cloud.redislabs.com",
                     port=12555, password="ZtW0Td51cI2kEsJNEnpFz6N2y1isaBsh", decode_responses=True)


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


@app.route('/search', methods=['GET'], content_types=['application/json'], cors=cors_config)
def search():
    data = comment.search(limit=10, offset=0)
    return data
