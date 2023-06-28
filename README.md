# Flight Page


## Description

This is a full- stack app written in basic react.js and integrated with node.js using express.js which uses a json file "/data/data.json" to perform CRUD operations to the data.

## Installation

Basic requirements to run the app is to have node.js installed on your pc.

## Features

1. Query to find flight prices between routes available in the drop-down according to dates.
2. Login page for all users to use query.
3. Cookies and access-token to set timeout for login and validate user.
4. A json as a database with  hashed passwords.
5. A logger for the api (which can be used while debugging or storing data)


## How to run

There are two parts:
1. the frontend - the client folder  

```
cd client
npm start
```

2. the backend - the server folder


```
cd server
npm run dev
```

## What you'll see

### The first page that you'll see is login page. 

Here you can login to the existing user {"username": "testuser", "password": "test123"}

Or you can create a new user by going to the sign-up page using the link available.

![Alt text](/imgs/loginpage.png) 

### The sign-up page

On the sign-up page you'll be able to add a new user and then you can go back and login with the new user.

![Alt text](/imgs/signup.png) 

### The query page
Once you're logged in you will go to the flight search page which where you can enter the data you need and get the result.

![Alt text](</imgs/flightsform.png>) 

###### The result found of a query
The result is display in a section "Flights Found!"

![Alt text](</imgs/flightsresult.png>)

### Additional views
A user will be logged in for 15 min before they need to re-login. 

#### Login page
If the user is already logged in you'll be given a link to go to the search page from the login page.

![Alt text](</imgs/alreadyloggedin.png>) 

#### Query page
If the user login has been timed out, the query page will display a link to re-login.

![Alt text](</imgs/notloggedin.png>) 



###### END 