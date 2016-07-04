# meanstack
meanstack project with jade 
authentication with passport and jwt, using interceptors

# MEAN mongoDb Express angularJS nodeJS Project

--------
## Objectives

MongoDb Express AngularJs NodeJS Project (MEAN)
 - authentication (login) system (reset password to be done)
 - connecting with mongoDb using mongoose
 - Express version should be at least 4.1
 - restricted access for CMS (part of the project)
 - non logged in users can access only basic pages
 - logged in users can add / edit / delete customers, access tasks pages
 - CRUD provided for users and customers
 (at this stage)
 - WIP: 
 -- users can only be registered with invitation
 -- users will be able to assign tasks, etc...



## Structure
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

./client/controllers:
auth.controller.js
contacts.controller.js
controller.js
dashboard.controller.js
tasks.controller.js

./client/directives:
contacts.directive.js
directive.js
errors.directive.js
menu.directive.js

./client/services:
auth.service.js
contacts.service.js
services.js

./public:
fonts
images
javascripts
stylesheets

./public/fonts:
glyphicons-halflings-regular.eot
glyphicons-halflings-regular.svg
glyphicons-halflings-regular.ttf
glyphicons-halflings-regular.woff
glyphicons-halflings-regular.woff2

./public/images:

./public/javascripts:
angular-1.5.6.min.js
angular-route.min.js
angular-route.min.js.map
ui-bootstrap-tpls-1.3.3.min.js

./public/stylesheets:
bootstrap3.3.6.min.css
style.css

./server:
api
config
models
routes

./server/api:
auth.js
contacts.js
index.js

./server/config:
passport.js

./server/models:
auth.js
contacts.js

./server/routes:
index.js

./views:
auth
contacts
error.jade
includes
index.jade
layout.jade
partials
tasks

./views/auth:
login.jade
register1.jade
register.jade
register-show-errors.jade

./views/contacts:
form.jade
index.jade
list.jade

./views/includes:
footer.jade
header.jade
nav.jade

./views/partials:
about.jade
cms.jade
contact.jade
contacts1.jade
error.jade
home.jade
login1.jade
register1.jade

./views/tasks:
index.jade




Final package.json:
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



## Added AngularJS for client side




