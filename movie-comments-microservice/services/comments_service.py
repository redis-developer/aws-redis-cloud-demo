from datetime import datetime
import json
from redisearch import Client as SearchClient, TextField, NumericField, Query, TagField, NumericField, SortbyField
import redis
client = redis.Redis(host="redis-12555.c212.ap-south-1-1.ec2.cloud.redislabs.com",
                     port=12555, password="ZtW0Td51cI2kEsJNEnpFz6N2y1isaBsh", decode_responses=True)


class CommentService:
    def __init__(self, client, *agrs, **kwargs):
        index_name = kwargs.get(
            'index_name', 'ms:search:index:comments:movies')
        self.client = client
        search_client = SearchClient(index_name, conn=client)

        # try:
        #     index_data = search_client.info()
        # except:
        #     search_client.create_index(
        #         [
        #             TagField('movie_id', separator=':'),
        #             TagField('user_id', separator=':'),
        #             TextField('comment'),
        #             NumericField('rating'),
        #             SortbyField('')
        #         ])

        self.search_client = search_client

    def insert(self, movie, comment, user_id, rating):
        try:
            time = now = datetime.now()
            comment_id = '{key_prefix}movie:{movie_id}:{time}'.format(
                key_prefix='ms:comments:', movie_id=movie, time=str(time))
            payload = {
                'movie_id': movie,
                'user_id': user_id,
                'comment': comment,
                'rating': rating,
                'timestamp': str(time)
            }
            self.client.hmset(comment_id, payload)
            return comment_id
        except Exception as e:
            return e

    def delete(self, comment_id):
        self.client.delete(comment_id)
        return True

    def get(self, comment_id):
        response = self.client.hgetall(comment_id)
        return response

    def search(self, *args, **kwargs):
        limit = kwargs.get('limit', 10)
        offset = kwargs.get('offset', 0)

        q = Query("*").paging(offset, limit)
        # print(str(q))
        data = self.search_client.search(q)
        return str(data)
