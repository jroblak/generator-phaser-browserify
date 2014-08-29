'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PhaserGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('... Phaser ...'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of your game'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName || ' ';
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/assets');
    this.mkdir('src/css');
    this.mkdir('src/js');
    this.mkdir('src/js/entities');
    this.mkdir('src/js/states');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

    this.copy('bowerrc', '.bowerrc');
    this.copy('_gulpfile.js', 'gulpfile.js');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    this.copy('src/assets/test.png', 'src/assets/test.png');
    this.copy('src/assets/preloader.gif', 'src/assets/preloader.gif');
    this.copy('src/css/main.css', 'src/css/main.css');
    
    this.template('src/js/main.js', 'src/js/main.js');
    this.template('src/js/utils.js', 'src/js/utils.js');
    this.template('src/js/states/boot.js', 'src/js/states/boot.js');
    this.template('src/js/states/game.js', 'src/js/states/game.js');
    this.template('src/js/states/menu.js', 'src/js/states/menu.js');
    this.template('src/js/states/preloader.js', 'src/js/states/preloader.js');
    this.template('src/js/states/splash.js', 'src/js/states/splash.js');
    this.template('src/js/entities/player.js', 'src/js/entities/player.js');
    this.template('src/index.html', 'src/index.html');
  }
});

module.exports = PhaserGenerator;

