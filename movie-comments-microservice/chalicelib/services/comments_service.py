from datetime import datetime
import json
from redisearch import Client as SearchClient, TextField, NumericField, Query, TagField, NumericField, SortbyField, NumericFilter


class CommentService:
    def __init__(self, client, *agrs, **kwargs):
        index_name = kwargs.get(
            'index_name', 'index:comments:movies')
        self.client = client
        search_client = SearchClient(index_name, conn=client)
        self.search_client = search_client

    def insert(self, movie_id, comment, user_id, rating):
        try:
            # keep only the number of the movie id
            movie_id = str(movie_id).replace("movie:","")
            time = datetime.now()
            timestamp = (str(time.timestamp()).replace(".",""))
            comment_id = '{key_prefix}:movie:{movie_id}:{time}'.format(
                key_prefix='comments', movie_id=movie_id, time=timestamp)


            payload = {
                'movie_id': movie_id,
                'user_id': user_id,
                'comment': comment,
                'rating': int(rating),
                'timestamp': timestamp
            }
            self.client.hmset(comment_id, payload)
            return comment_id
        except Exception as e:
            print(e)
            return str(e)

    def delete(self, comment_id):
        print("Delete "+ comment_id)
        self.client.delete(comment_id)
        return True

    def get(self, comment_id):
        response = self.client.hgetall(comment_id)
        return response

    def search(self, *args, **kwargs):
        limit = kwargs.get('limit', 10)
        offset = kwargs.get('offset', 0)
        movie_id = kwargs['movie_id'] 
        user = kwargs.get('user')
        movie_id = str(movie_id).replace("movie:","")
        query = self.query_builder(movie_id=movie_id, user=user)
        q = Query(query).paging(offset, limit).sort_by("timestamp", asc=False)
        try:
            data = self.search_client.search(q)

            return {
                'total': data.total,
                'docs': self._parse_docs(data.docs)
            }
        except Exception as e:
            return {
                'total': 0,
                'docs': [],
                'error': str(e) +" -- "+ query
            }

    def query_builder(self, *args, **kwargs):
        movie_id = kwargs.get('movie_id')
        usr_id = kwargs.get('user_id')
        movie_query = "@movie_id:{"+movie_id+"} "
        usr_query = "@user_id:{}".format(usr_id) if usr_id else ""
        formatted_query = "{movie_query} {usr_query}".format(
            movie_query=movie_query, usr_query=usr_query)
        print(formatted_query)
        return formatted_query

    def _parse_docs(self, doc_list):
        formatted_docs = []
        for doc_item in doc_list:
            formatted_docs.append(doc_item.__dict__)
        return formatted_docs
