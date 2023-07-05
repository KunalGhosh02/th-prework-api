# TH API README

The TH API serves as the backend for a sample education application designed for teachers and students. In this application, teachers can register themselves and manage courses by creating, updating, and deleting them. They can also send notifications to students regarding their courses. On the other hand, students can sign up for the application, browse available courses and their contents, enroll in courses, take quizzes, track their progress through lessons, and receive notifications from their enrolled teachers.

This is a Node.js API project that requires a minimum Node.js version of 14. It utilizes the MongoDB as a database.


To see all the available APIs, view documentation run this postman collection containing all the endpoints and sample request and response.

[View Documentation](https://documenter.getpostman.com/view/10235565/2s93zFWJrk)


If you have postman account or have postman installed: 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/10235565-c8b2a8fc-f3a6-4d6f-9fd7-be0949b03de0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10235565-c8b2a8fc-f3a6-4d6f-9fd7-be0949b03de0%26entityType%3Dcollection%26workspaceId%3D342ac1ad-6f74-4eea-809c-f49f0eb9a8f5)

## Prerequisites

Make sure you have the following software installed on your machine before running the API:

- Node.js (Version 14 or higher) [Install from here](https://nodejs.org/en/download)
- MongoDB [Use Atlas](https://www.mongodb.com/atlas/database) or install MongoDB locally from [here](https://www.mongodb.com/docs/manual/administration/install-community/)

## Installation

Clone this repository to your local machine.

(for http)
```bash
git clone https://github.com/KunalGhosh02/th-prework-api.git
```

(for ssh)
```bash
git clone git@github.com:KunalGhosh02/th-prework-api.git
```

Navigate to the project directory.

```bash
cd th-prework-api
```

Install the required npm dependencies.
```bash
npm install
```
## Configuration
 
Rename the .env.example file to .env.

Open the .env file and update the configuration variables according to your environment.

Scripts
The following scripts are available in the package.json file:

`build`: Transpiles the TypeScript code to JavaScript using TypeScript Compiler (tsc).

`local`: Starts the API server locally by running the compiled index.local.js file.

`watch`: Starts the API server locally using nodemon for automatic restart on file changes.



Running the API
Build the project by running the following command:

```bash
npm run build
```


Start the API server by running one of the following commands:

For the local development environment:
```bash
npm run local
```

Alternatively, you can use the watch script to automatically restart the server on file changes during development:

```bash
npm run watch
```

> **NOTE:**  You can not run the `index.js` locally as it uses `aws-serverless-express` and takes AWS event as input.
