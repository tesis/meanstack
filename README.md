# TeamCo meanstack project

    MEAN-stack project with jade template engine
    authentication with passport and jwt, using interceptors
    CRUD for customers, manipulating and monitoring them
    
### Description    
Users have permissions to manage customers, tasks. 
They can add, update, delete customers, monitoring specific customer and the tasks assigned, monitoring tasks assigned to another user, changing a status of the tasks.
In final version, users will be able to perform CRUD operations for tasks, reassign tasks to another user, adding caseworks, notes, comments, uploding files and sending emails to the customers, and more.

# MEAN mongoDb Express angularJS nodeJS Project
### Live version hosted on Openshift:
  http://njs-tesispro.rhcloud.com
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
  "name": "TeamCo - meanstack application",
  "version": "2.0",
  "description": "MEANstack application - cutsomer management system. Users have permissions to manage customers, tasks. They can add, update, delete customers, monitoring specific customer and the tasks assigned, monitoring tasks assigned to another user, changing a status of the tasks. In addition, users will be able to perform CRUD operations for tasks, reassign tasks to another user, adding caseworks, notes, comments, uploding files and sending emails.",
 "private": true,
  "scripts": {
    "start": "node_modules/.bin/supervisor ./bin/www",
    "test": "make test",
    "tst-for-running-tests": "node_modules/karma/bin/karma start karma.conf.js"
  },
  "dependencies": {
    "express": "~4.13.4",
    "static-favicon": "~1.0.0",
    "morgan": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "body-parser": "~1.0.0",
    "debug": "~0.7.4",
    "jade": "~1.3.0",
    "mongodb": "~2.2.0",
    "mongoose": "~4.5.3",
    "supervisor": "^0.11.0",
    "express-session": "^1.13.0",
    "passport": "^0.2.1",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^1.0.0",
    "jsonwebtoken": "^7.0.1",
    "nodemailer": "^2.4.2",
    "activator": "^2.3.0"
  },
  "devDependencies": {
    "angular-mocks": "~1.5.7",
    "bower": "^1.7.9",
    "expect": "~1.20.1",
    "gulp": "~3.9.1",
    "gulp-jasmine": "~2.4.0",
    "jasmine": "~2.4.1",
    "jasmine-core": "~2.4.1",
    "karma": "~1.1.0",
    "karma-chrome-launcher": "~1.0.1",
    "karma-firefox-launcher": "^1.0.0",
    "karma-jasmine": "~1.0.2",
    "karma-jasmine-html-reporter": "~0.2.0",
    "karma-phantomjs-launcher": "~1.0.1",
    "mocha": "~2.5.3 ",
    "phantomjs-prebuilt": "~2.1.7",
    "qunitjs": "2.0.0",
    "should": "~9.0.2",
    "superagent": "~1.8.3",
    "supertest": "~1.2.0"
  }
}

```

### Usage

**1 rename env.sample.json to env.json and add your credentials / settings**

**2 install node modules**

```sh
npm install
```
check if bower is installed and then run it (it is not used in the project for now)
```sh
npm search bower
npm install bower --save-dev install it if not installed
bower install
bower init
bower start

```
**3 run the project locally **

```sh
npm start
```

### Tests
There are few tests provided 
- Unit test with mocha in test folder
- Karma/Jasmine tests in tests folder

```sh
make test
```
