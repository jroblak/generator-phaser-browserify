'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '<%= _.slugify(projectName) %>-game');

window.Utils = require('./utils');
window.playerState = {
    currentLevel: 'Game'
}

game.state.add('Boot', require('./states/boot'));
game.state.add('Splash', require('./states/splash'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('Game', require('./states/game'));

game.state.start('Boot');
