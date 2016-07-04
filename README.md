# TeamCo meanstack project

    meanstack project with jade template engine
    authentication with passport and jwt, using interceptors
    CRUD for customers

# MEAN mongoDb Express angularJS nodeJS Project

--------
## Objectives

MongoDb Express AngularJs NodeJS Project (MEAN)
 - authentication system (WIP: reset password / confirmation )
 - mongoDb using mongoose
 - Express version should be at least 4.1
 - restricted access for CMS (part of the project)
 - non logged in users can access only basic pages
 - logged in users can add / edit / delete customers, access tasks pages
 - CRUD provided for users and customers
 (at this stage)
 - WIP:
    - users can only be registered with invitation
    - users will be able to assign tasks, etc...



#### Structure
-------------------------
access.log
app.js
env.sample.json
Makefile
package.json
README.md

    ./bin:
         www

    ./client:

        controllers
        directives
        main.js
        services

    ./public:

        fonts
        images
        javascripts
        stylesheets

    ./server:
        api
        config
        models
        routes
    ./views:
        auth
        contacts
        includes
        partials
        tasks


### Final package.json:
```sh
{
  "name": "TeamCo",
  "version": "1.0",
  "author": "Tereza Simcic",
  "homepage": "http://tesispro.net",
  "private": true,
  "description": "mean stack application with jade template engine, authentication with passport and jwt"
  "scripts": {
    "start": "node_modules/.bin/supervisor ./bin/www",
    "test": "make test"
  },
  "dependencies": {
    "express": "~4.13.4",
    "static-favicon": "^1.0.0",
    "morgan": "^1.0.0",
    "cookie-parser": "^1.0.1",
    "body-parser": "^1.0.0",
    "debug": "^0.7.4",
    "jade": "^1.3.0",
    "mongodb": "^2.1.18",
    "mongoose": "^4.4.20",
    "supervisor": "^0.11.0",
    "passport": "^0.2.1",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^1.0.0",
    "jsonwebtoken": "^7.0.1",
    "nodemailer": "^2.4.2",
    "activator": "^2.3.0"
  },
  "devDependencies": {
    "mocha": "^2.5.3 ",
    "should": "^9.0.2",
    "superagent": "^1.8.3"
  }
}
```

### Usage

**1 rename env.sample.json to env.json and add your credentials / preferences**

**2 install node modules**

```sh
npm install
```

**3 run the project**

```sh
npm start
```

### Tests
- create new folder test
- add tests
- provided Makefile script for tests, run:

```sh
test
```