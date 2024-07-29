# Front-end application for the movie comments microservice

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

You can add the URLs for:
* the movies service (defaulted to `http://localhost:3000/api`) 
* the comments services (defaulted to `http://localhost:8000`)

when starting the frontend application

```
VUE_APP_MOVIES_SERVICE=https://<lambda>.execute-api.<region>.amazonaws.com/api \
VUE_APP_COMMENTS_SERVICE=https://<lambda>.execute-api.<region>.amazonaws.com/api \
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Running the application in Docker

You can run build and run the application from docker using the following commands:

**Build**

```shell script

> docker build -t redis/search-frontend  . 

```

This command will create a new image and build the maven project into it.

**Run**

```shell script
> docker run --rm  \
     --env "VUE_APP_MOVIES_SERVICE=<Your movie rest service >" \
     --name "redisearch-frontend"\
     -p 8084:8084 redis/search-frontend
```

Access the Web application with the following URL:

* http://localhost:8084


## Deploying to s3:

For creating a new bucket:

```
aws s3 website s3://www.my-awesome-site.com/ --index-document index.html --error-document error.html
```
Recent leaky buckets activities have prohibited an AWS account user to add a public access bucket policy by default whenever any new bucket is created. This is to keep the data secure from bad actors. But in our case, we would require a public access bucket policy for which a user must complete below steps:
1. Click into your bucket.
2. Select the "Permisssions" tab at the top.
3. Under Public Access Settings, click "Edit".
4. Change "Block new public bucket policies", "Block public and cross-account access if bucket has public policies”, and “Block new public ACLs and uploading public objects” to be false.
5. Click on Save.

Above steps are must for setting up of bucket policy before adding it to a static website. 

To update the public read access to anyone in the world updating the Bucket Policy of your bucket is must. Follow the below steps to update the bucket policy in AWS console:
1. Navigate to S3 in the AWS Console.
2. Click into your bucket.
3. Click the “Permissions” section.
4. Select “Bucket Policy”.
5. Add the following Bucket Policy and then Save

```
{
    "Version": "2008-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.my-awesome-site.com/*"
        }
    ]
}
```
```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
aws s3 sync . s3://www.my-awesome-site.com --delete --acl public-read 
```
