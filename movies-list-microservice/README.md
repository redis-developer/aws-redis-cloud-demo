# Movie Microservice

Implements Movie CRUD and Queries functionality  using the [Redis Enterprise Cloud](https://redislabs.com/) with the [RediSearch module](https://oss.redislabs.com/redisearch/) and the [Serverless Framework](https://www.serverless.com)

### Pre Requisites
- Node.js 
- AWS account & Credentials Setup


### Install Serverless framework

This service use the [serverless](https://www.serverless.com/) framework, before running the application you must install the framework locally.

```
> npm install -g serverless
```

Once install the `serverless` command line is available

### AWS - Config Credentials

Follow these steps to create an IAM user for the Serverless Framework:

1. Login to your AWS account and go to the Identity & Access Management (IAM) page.
2. Click on Users and then Add user. Enter a name in the first field to remind you this User is related to the Serverless Framework, like serverless-admin. Enable Programmatic access by clicking the checkbox. Click Next to go through to the Permissions page. Click on Attach existing policies directly. Search for and select AdministratorAccess then click Next: Review. Check to make sure everything looks good and click Create user.
3. View and copy the API Key & Secret to a temporary place. You'll need it in the next step.

    ```
    $ serverless config credentials --provider provider --key key --secret secret
    ```

### Install Dependencies

```bash
> cd movies-list-microservice
> npm install
```

### Configuring serverless framework
All of the Lambda functions in your serverless service can be found in serverless.yml under the functions property.

### Configure Redis Cloud database
- Create an account on Redislabs 
- Create a subscription and database instance with the RediSearch Module enabled
- In `serverless.yml` set the following environment variables:
  ```yaml
      REDIS_HOST: [REDIS_HOST]
      REDIS_PORT: [REDIS_PORT]
      REDIS_PASSWORD: [REDIS_PASSWORD]
  ```

### Import the sample dataset and indices

- Run the following command to load the dataset into your redis instance:
  ```bash
  redis-cli -p [redislabsport]  -h [redislabshost]  -a [password] < import_movies.redis
  ``` 

### Deploy the application to AWS

- run &nbsp; `serverless deploy`, you should get an output like this:
  ```bash
  Service Information
  service: movies-list-microservice
  stage: dev
  region: us-east-1
  stack: movies-list-microservice-dev
  resources: 24
  api keys:
    None
  endpoints:
    GET - https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/api/movies/search
    GET - https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/api/movies/group_by/{field}
    GET - https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/api/movies/{id}
    POST - https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/api/movies/{id}
  functions:
    listMovies: movies-list-microservice-dev-listMovies
    searchMovies: movies-list-microservice-dev-searchMovies
    getMovie: movies-list-microservice-dev-getMovie
    saveMovie: movies-list-microservice-dev-saveMovie
  layers:
    None
  Serverless: Removing old service artifacts from S3...
  Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

  ```
- Copy this base `https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/api` endpoint and paste into our frontend env url and paste in `env.development`
- Follow the steps mentioned in the front-end folder for running the frontend

### Working in Local mode
We have configured a plugin called  serverless-offline inside our serverless application which allows us to run this lambda function in offline mode to enable faster development.

You can run it offline by running the command:

```
$ npm start
``` 
