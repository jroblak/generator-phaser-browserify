/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('phaser generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('phaser:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      '.bowerrc',
      'gulpfile.js',
      'src/assets/test.png',
      'src/assets/preloader.gif',
      'src/css/main.css',
      'src/js/main.js',
      'src/js/util.js',
      'src/js/states/boot.js',
      'src/js/states/menu.js',
      'src/js/states/preloader.js',
      'src/js/states/splash.js',
      'src/js/states/game.js',
      'src/js/entities/player.js',
      'src/index.html'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
