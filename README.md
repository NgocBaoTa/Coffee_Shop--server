# Coffee_Shop--server

This repository contains the server-side code for the Coffee Shop project, built using NodeJS, ExpressJS. The server is responsible for handling requests from the client, managing the MongoDB database, and providing necessary data to the client-side application. <br/>
The client-side code is located in a separate repository, check it [here](https://github.com/NgocBaoTa/Coffee_Shop).

## Built with

- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB

## Getting Started

### Dependencies

Before installing the program, ensure you have the following dependencies installed:

* Node.js
* npm (Node Package Manager)
* MongoDB Atlas Account or MongoDB Compass
* Operating System: Windows 10 / MacOS / Linux

### Installing

To install the program, follow these steps:

- Clone the repository:
```
git clone https://github.com/NgocBaoTa/Coffee_Shop--server.git
```

- Install dependencies:
```
npm install
```

- Create a .env file in the root of the project with the following content:
```
MONGODB_URI=your_mongodb_connection_string
```

#### Obtaining MongoDB Connection String
**For MongoDB Atlas:**
- Log in to your [MongoDB Atlas](https://www.mongodb.com/atlas/database) account.
- Create a new cluster or use an existing one.
- Click on "Connect" for your cluster.
- Choose "Connect your application" and copy the connection string provided.
<br/>

**For MongoDB Compass:**
- Open MongoDB Compass. (If you do not have MongoDB Compass installed, click [here](https://www.mongodb.com/try/download/compass))
- Click on "New Connection."
- Enter the connection details or use the connection string from MongoDB Atlas.
- Click "Connect" to establish a connection.

### Database Seeding
To seed the database with initial data, run the following command:
```
node seeds
```
  
### Running the Server

To start the server, use the following command:
```
npm start
```

For development with nodemon, you can use:
```
npm run start:dev
```

The server will run on http://localhost:8000 by default. <br/> 
To change the port, in the .env file, add the following content:
```
PORT=your_port
```

## Authors

* Email: baongoc.ta04@gmail.com
