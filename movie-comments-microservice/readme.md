1. Setup environment credentials
```
python3 -m venv chalice-env
```

Run:
```
source ../.chalice-env/bin/activate
```


```
FT.CREATE ms:search:index:comments:movies on HASH PREFIX 1  SCHEMA movie_id TAG  user_id TAG comment TEXT WEIGHT 1.0 timestamp TEXT SORTABLE rating NUMERIC SORTABLE
```