## Features

Handles API Failover. When an API Fails (or) return an error response, it calls the next available API and process.

API Priority and active status are maintained in the config. This application acts as a wrapper to send emails by calling the external email provider API.

## AWS Lambda Deployment For Express using Serverless Framework

Give below commands in app root folder to deploy to AWS Lambda using Serverless framework

1. npm install -g serverless
2. serverless config credentials --provider aws --key <AccessKey> --secret <SecretKey>
3. serverless deploy

Application URL will be printed in console
Serverless uses serverless.yml file in application for deployment configuration.

## Installation and Running the Application Locally

Follow below steps to setup and run the application

1. Give "npm install" to install the libraries for the application
2. Place .env file shared separately in the application root folder
3. Give "npm start" (or) nodemon - To run the application

After starting the server, below POST URL is accessible,

http://localhost:3001/api/v1/email/send

API docs can be accessed at
http://localhost:3001/api/docs

### Application Configuraiion

Application configuration are stored in below files

1. .env - Environment and other sensitive data like API Key, UserName, Password are stored here.
   This file will be added during build time.

2. config/<Environment>.json - Application related config like url are stored here.

### Tests and Code Coverage

'npm run test' - This command runs the test cases
'npm run coverage' - This command runs the code coverage.
