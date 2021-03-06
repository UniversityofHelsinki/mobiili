# Gulp BoBrSASS Boilerplate
[![Build Status](https://travis-ci.org/SC5/gulp-bobrsass-boilerplate.png?branch=angularjs)](https://travis-ci.org/SC5/gulp-bobrsass-boilerplate.png?branch=master)

Gulp BoBrSASS Boilerplate is an evolutionary step from our earlier
[Grunt BoReLESS Boilerplate](https://github.com/SC5/grunt-boreless-boilerplate?source=cc).
It aims to cover the same needs, but at the same time remove some of the annoyances we have
encountered:
* Faster builds
* Runs in background (watching changes), supports live reload
* Supports source maps for both JavaScript and SASS
* Scriptless, NPM driven deployments (to ease e.g. AWS OpsWorks & Windows deployments)
* Browserify (or in future something else) for better web app packaging

Rather than being fashionably opinionated, for some less significant things a democratic process
works better (no matter how good or bad the opinions were). Therefore, the majority votes have
been cast as follows:
* Spaces instead of tabs
* SASS & Compass instead of LESS
* Protractor acceptance tests instead of Karma unit tests

## Installation

### Requirements

The latest version of BoBrSASS should work on latest stable version of its depedencies. An older version of BoBrSASS might work with an earlier version of
libraries, but we do not actively maintain older configurations. The current versions we test against are documented in our [Travis configuration](https://github.com/SC5/gulp-bobrsass-boilerplate/blob/master/.travis.yml).

If you don't already have node.js 0.10.x or later, fetch it from
[nodejs.org](http://www.nodejs.org/). You will also need gulp to facilitate builds:

    > npm install -g gulp

In addition, you will need [Ruby](https://www.ruby-lang.org/en/downloads/) to use
Compass framework for compiling SASS stylesheets into CSS and sprite sheets:

    > gem update --system
    > gem install sass
    > gem install compass

Note that you may need to first uninstall other SASS versions than (3.2.x).

If you have persistent problems with the Gulp build not finishing (e.g. there is a
stuck ruby process running at 100% CPU), try upgrading your Ruby to a fresh install.
Known to work combination: Ruby 2.1.4, SASS 3.4.9, Compass 1.0.1.

You will also need [Git](http://git-scm.com/).  When installing
[Git on Windows](http://msysgit.github.io/), remember to enable usage
from command prompt.

Installing the project itself is easy. Both build system dependencies and app
dependencies are triggered by

    > npm install

It actually performs a release build, too (to verify that everything is ok).

## Building

The current build compiles JS and CSS monoliths for both the debug and release builds. The big
difference is that the debug build supports source maps and is not minified. It should be
noted that in order to get the tests pass, a server must be running (e.g. by running 'npm start').

To first cleanup your distribution directory and trigger **release** build

    > gulp clean
    > npm start # in another window
    > gulp

To trigger **debug** build, run gulp with a debug flag

    > gulp --debug

To keep gulp running and watch for changes, use e.g.

    > gulp watch --debug

To install, build and start everything in production mode (e.g. no devdependencies), do the whole
shebang as follows:

    > npm install --production
    > npm run-script build
    > npm start

To update your package version, you eventually want to do one of the following:

    > gulp bump --patch
    > gulp bump --minor
    > gulp bump --major
    > gulp bump # defaults to minor

## Running the Service

Most likely the normal *gulp serve* task will not suffice, and you want to run your own test
server, instead. The task below, will default to 'gulp serve' by default until you change it:

    > npm start

Boilerplate also comes with Docker support. To build and run the container, run:

    > docker build -t bobrsass .
    > docker run -d -P bobrsass

To access the service, check the dynamically allocated port (for example: 0.0.0.0:49164->8080/tcp)
and use it in browser URL

    > docker ps
    # --> http://localhost:49164/

Localhost works in Linux environment, but if you are using boot2docker, you need to use VM IP
instead. Check the IP and replace `localhost` with it:

    > boot2docker ip
    # --> http://192.168.59.103:49164/

### Live reloading the changes

Live reloading is enabled when running *gulp watch* in another window. Just change any of your
JavaScript or SASS files to trigger reload. The reload monitors 'dist' directory and pushes the
changes as needed.

##  Extending & Hacking

###  Project layout

#### App

    src/             The client-side source code
    src/index.html   The HTML entry point, stub page
    src/app          Application source code
    src/app/main.js  The app JS entry point
    src/components   The 3rd party JS dependencies
    src/css          The CSS templates


####  Build System

    gulpfile.js         The Gulp build configuration
    bower.json          The Bower components
    .bowerrc            The Bower directory overrides
    package.json        The build level dependencies

### Build Results

    dist/               The build results (debug and release builds)

## Using BoBrSASS as an Upstream

Upgrading the boilerplate in your project may be tedious work. Once BoBrSASS
directory structure becomes stable (it might be already, but no guarantees!),
you can use it directly as an upstream (here with a name 'bobrsass').

    > git remote add -f bobrsass git@github.com:SC5/gulp-bobrsass-boilerplate.git

Now synchronizing with BoBrSASS becomes easier:

    > git pull bobrsass master

It is possible to use BoBrSASS as a subtree, too:

    > git subtree add --prefix client --squash git@github.com:SC5/gulp-bobrsass-boilerplate.git master --squash
    > git remote add -f bobrsass git@github.com:SC5/gulp-bobrsass-boilerplate.git
    > git fetch bobrsass master

Note that you need to use a recent version of git that supports subtrees.

The example pulls BoBrSASS master branch into 'client' subdirectory. The key here is to use
'--prefix client' to keep the boilerplate in its own subdirectory. Later on, sync by:

    > git subtree pull --prefix client bobrsass master

## Testing

Run tests with PhantomJS:

    > gulp test

Or in debug mode with chromedriver in a browser:

    > gulp test --debug

## TODO

* SASS source maps
* Add more examples & documentation

## Release History

* 2014/02/12 - v0.1.0 - Initial commit (partially working stub)
* 2014/02/24 - v0.1.1 - Fix the build errors, update README
* 2014/05/08 - v0.2.0 - Update dependecies, add linting and plugin loader, update README
* 2014/05/09 - v0.3.0 - Add Protractor test framework, update README
* 2014/05/14 - v0.3.1 - Better linting
* 2014/08/01 - v0.4.0 - Clear separation of dev. and product dependencies
* 2014/10/20 - v0.5.0 - Migrate to Compass 1.0.1, sourcemaps, better linting, updated deps

## License

Copyright (c) 2014 [SC5](http://sc5.io/), licensed for users and contributors under MIT license.
https://github.com/sc5/grunt-bobrsass-boilerplate/blob/master/LICENSE-MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/SC5/gulp-bobrsass-boilerplate/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
