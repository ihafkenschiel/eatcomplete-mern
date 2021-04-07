# eatComplete (MERN version)
By Ian Hafkenschiel
Last Updated: 2021 April 7

## Description

An app utilizing USDA nutritional data to help users identify missing nutrients in their diets and to identify the best whole foods to nourish those deficiencies. The app is built with MERN stack modeled after a template provided by [Mohamed Samara](https://github.com/mohamedsamara), and utilizes third party API's.

It works like this:

1. You put it what foods you ate today by ingredient.
2. It tells you what nutrients you have enough of and what you still need.
3. The next page recommends the ingredients you could eat to fill in as many of those missing nutrients as possible.
4. You add ingredients you want to make a recipe.


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * Redux Thunk middleware to handle asynchronous redux actions


## Demo

This application is deployed on Heroku. Please check it out :smile: [here]().


## Install

Some basic Git commands are:

```
$ git clone https://github.com/ihafkenschiel/eatcomplete-mern .
$ npm install
```

## Setup

```
 Create .env file that include:

  * MONGO_URI & JWT_SECRET
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * MAILGUN_KEY & MAILGUN_DOMAIN & MAILGUN_EMAIL_SENDER => Mailgun configuration
  * GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET & GOOGLE_CALLBACK_URL => Google Auth configuration
  * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY & AWS_REGION & AWS_BUCKET_NAME => AWS configuration
```

### JWT 
You can generate a Java Web Token (JWT) Secret here: https://jwt.io/#debugger-io

### Passport Authentication
http://www.passportjs.org/docs/configure/

#### Google
The Client Id and Client Secret needed to authenticate with Google can be set up from the [Google Developers Console](https://console.developers.google.com/). You may also need to enable Google+ API in the developer console, otherwise user profile data may not be fetched. 

The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well as options specifying a client ID, client secret, and callback URL.

Steps:
1. Go to [Google Developers Console](https://console.developers.google.com/) and click on Credentials on the left bar.
2. Click Create Credentials -> Oauth Client ID
3. Select web application and type `eatComplete` for Name.
4. Copy and paste client id and secret in the .env file.

More info: https://support.google.com/googleapi/answer/6158849?hl=en

## Heroku Deployment

```
> Create a Procfile in the root directory of your application with the following command **web: npm run start:production**
```


## Simple build for production

```
$ npm run production
```

## Run the application for development

```
$ npm start
```

Go to `http://localhost:5000/` in your browser to access the site.

## Run the application for production

```
$ npm run start:production
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)

