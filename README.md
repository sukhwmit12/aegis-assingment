# Flight Page

## Description

This is a full- stack app written in basic react.js and integrated with node.js using express.js which uses a json file "/data/data.json" to perform CRUD operations to the data.

## Features

1. Query to find flight prices between routes available in the drop-down according to dates.
2. Login page for all users to use query.
3. Cookies and access-token to set timeout for staying logged in and validate user.
4. A json as a database with hashed passwords.
5. A logger for the api (which can be used while debugging or storing data)

## How to run

Basic requirements to run the app is to have node.js installed on your pc.

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

![loginPage](/imgs/login.png)

### The sign-up page

On the sign-up page you'll be able to add a new user and then you can go back and login with the new user.

![signup page](/imgs/signup.png)

### The query page

Once you're logged in you will reach the flight search page where you can enter your query journey details and get the result.

![Find Flights page](/imgs/flightsform.png)

###### The result found of a query

The result is display in a section "Flights Found!"

![Found flights](/imgs/flightsresult.png)

### Additional views

A user will stay logged in for 15 min before they need to re-login.

#### Login page

If the user is already logged in you'll be given a link to go to the search page from the login page.

![already logged-in](/imgs/alreadyloggedin.png)

#### Query page

If the user login has timed out, the query page will display a link to re-login.

![Need to re-login](/imgs/loggedout.png)

###### END
