generator-phaser-browserify
=================

A [Yeoman](http://yeoman.io/) generator to generate HTML5 games with [phaser](http://phaser.io/) using Gulp and Browserify. Built off the work by Julien Castelain on [generator-phaser](https://github.com/julien/generator-phaser). Allows the use of browserify (i.e. var player = require('Player.js')) with Phaser.

Check out [this test game](https://github.com/jroblak/sagdc2014) as an example of project layout / useage.

**INSTRUCTIONS**

+ Install [Node.js](http://www.nodejs.org)

+ Install the required npm modules by issuing these commands:

  `npm install -g yo generator-phaser-browserify`

  *You can optionally install [Gulp](http://gulpjs.com) globally `npm install -g gulp` but you don't have to.*

+ Create a new directory for your game:
  + Unix/OSX : `mkdir ~/Projects/game && cd $_`
  + Windows  : `mkdir %USERPROFILE%\Projects\game && cd %USERPROFILE%\Projects\game`

+ Invoke the generator:

  `yo phaser-browserify`

+ Run a local development server (livereload, watchify enabled) with this command:

  `npm start`
  
  *If you have Gulp installed globally you can also use: `gulp`*

+ Package your game (i.e. minify css, html and js) with:

  `npm run build` 

  *If you have Gulp installed globally you can also use: `gulp build`*


**CREDITS**

+ [@photonstorm](https://github.com/photonstorm/) for creating 
  [phaser](https://github.com/photonstorm/phaser).
+ The guys behind [yeoman](https://github.com/yeoman/yeoman).
+ [Gulp.js](http://www.gulpjs.com)
