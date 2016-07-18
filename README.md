# TeamCo meanstack project

    meanstack project with jade template engine
    authentication with passport and jwt, using interceptors
    CRUD for customers

# MEAN mongoDb Express angularJS nodeJS Project

--------
## Objectives

MongoDb Express AngularJs NodeJS Project (MEAN)
 - authentication system 
 - mongoDb using mongoose
 - Express version should be at least 4.1
 - restricted access for CMS (part of the project)
 - non logged in users can access only basic pages
 - logged in users can add / edit / delete customers, access tasks pages
 - CRUD provided for users and customers
 (at this stage)
 - WIP:
    - login sytem (reset password)
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
  "name": "openshift-cartridge-nodejs-template",
  "version": "1.0.1",
  "description": "Custom Node.js cartridge for OpenShift - sample application",
  "private": true,
  "main": "start.js",
  "scripts": {
    "start": "node --use_strict start.js"
  },
  "author": "Tereza Simcic <tereza.simcic@gmail.com>",
  "license": "ISC",
  "dependencies": {
    "express": "~4.13.4",
    "static-favicon": "~1.0.0",
    "morgan": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "body-parser": "~1.0.0",
    "debug": "~0.7.4",
    "jade": "~1.3.0",
    "mongodb": "^2.1.18",
    "mongoose": "^4.4.20",
    "passport": "^0.2.1",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^1.0.0",
    "jsonwebtoken": "^7.0.1",
    "nodemailer": "^2.4.2",
    "activator": "^2.3.0"
  },
  "devDependencies": {
    "mocha": "~2.5.3 ",
    "should": "~9.0.2"
  }
}

```

### Usage

**1 rename env.sample.json to env.json and add your credentials / preferences**

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
**3A run the project locally **

```sh
node --use_strict start.js
```
*** open in browswer: http://localhost:8080

**3B run on the web: http://njs-tesispro.rhcloud.com
### Tests
- create new folder test
- add tests
- provided Makefile script for tests, run:

```sh
make test
```
