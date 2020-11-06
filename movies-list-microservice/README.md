# How to use Redis Enterprise Cloud with AWS Lambda and serverless architecture
### Introduction

### Objectives

### Structure

### Pre Requisites
- Nodejs 
- AWS account & Credentials Setup

### Installation Steps
```
$ npm install -g serverless 
```

### AWS - Config Credentials

Follow these steps to create an IAM user for the Serverless Framework:

1. Login to your AWS account and go to the Identity & Access Management (IAM) page.
2. Click on Users and then Add user. Enter a name in the first field to remind you this User is related to the Serverless Framework, like serverless-admin. Enable Programmatic access by clicking the checkbox. Click Next to go through to the Permissions page. Click on Attach existing policies directly. Search for and select AdministratorAccess then click Next: Review. Check to make sure everything looks good and click Create user.
3. View and copy the API Key & Secret to a temporary place. You'll need it in the next step.

```
$ serverless config credentials --provider provider --key key --secret secret
```

Or you can also set environment variables:

```
$ export AWS_ACCESS_KEY_ID={}
$ export AWS_SECRET_ACCESS_KEY={}
```

### Generate the project boilerplate

```
$ serverless create --template aws-nodejs-typescript --path movies-list-microservice
```

You'll see the following files in your working directory:
- serverless.yml
- handler.js

Each service configuration is managed in the serverless.yml file.

Here we configure the Serverless.yml to define 2 lambda functions. One lambda function would be used for the List of Movies while another would use it to get the details of a particular movie.
Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

`handler` parameter species where should the yaml find this function in our codebase.
`events` parameter specifies events to which we are subscribed to for the. We want to expose our API over HTTP. So we are going to connect our application to the API gateway and then listen to HTTP type events. For this we specify the HTTP event and then configure the parameters we want to listen to.

### Configuring serverless framework
All of the Lambda functions in your serverless service can be found in serverless.yml under the functions property.

### File Structure
Following is our file structure for our project:

### File Structure
- Create an account on Redislabs 
- Create a subscription and database instance with the Redis Search Module enabled
- In serverless.yml set the following environment variables:
```yaml
    REDIS_HOST: [REDIS_HOST]
    REDIS_PORT: [REDIS_PORT]
    REDIS_PASSWORD: [REDIS_PASSWORD]
```
- Set the same credentials in import.sh file
- Run the following command to load the dataset into your redis instance:
```bash
bash import.sh
``` 
- For deploying your application to AWS, edit deploy.sh putting in your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
```bash
export AWS_ACCESS_KEY_ID=[AWS_ACCESS_KEY_ID]
export AWS_SECRET_ACCESS_KEY=[AWS_SECRET_ACCESS_KEY]
``` 
- run &nbsp; `bash deploy.sh`, you show get an output like this:
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
  GET - https://2fvmk4hv32.execute-api.us-east-1.amazonaws.com/dev/movies/search
  GET - https://2fvmk4hv32.execute-api.us-east-1.amazonaws.com/dev/movies/group_by/{field}
  GET - https://2fvmk4hv32.execute-api.us-east-1.amazonaws.com/dev/movies/{id}
functions:
  listMovies: movies-list-microservice-dev-listMovies
  searchMovies: movies-list-microservice-dev-searchMovies
  getMovie: movies-list-microservice-dev-getMovie
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

```
- Copy this base `https://2fvmk4hv32.execute-api.us-east-1.amazonaws.com/dev` endpoint and paste into our frontend env url and paste in env.development
- Follow the steps mentioned in the front-end folder for running the frontend

### Working in Local mode
We have configured a plugin called  serverless-offline inside our serverless application which allows us to run this lambda function in offline mode to enable faster development.

You can run it offline by running the command:

```
$ npm start
``` 

### Deploying Our Lambda Function
```
$ npx serverless deploy
```

