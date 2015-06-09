# app

## Getting Started

Note: If you don't have `npm` installed, make sure you have
[node](http://nodejs.com) installed. If you don't have bower,
`npm install -g bower`.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com),
[requirejs](http://requirejs.org).

## Building

The following make targets exist

* `install` - installs all bower and npm modules
* `release` - installs and creates a production-like `dist` folder
* `package` - creates a distributable package
* `start` - starts the server
* `start-production` - starts the server in production mode
* `test` - Runs all tests

You can also run the following scripts from `npm` (using `npm run-script`)

* `start` - starts a server
* `watch` - starts a server that reloads whenever server.js has changed
* `test` - runs all tests

