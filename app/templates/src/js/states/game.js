var Player = require('../entities/player');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    var x = (this.game.width / 2) - 100;
    var y = (this.game.height / 2) - 50;

    this.testentity = new Player(this.game, x, y);
    this.testentity.anchor.setTo(0.5, 0.5);

    this.input.onDown.add(this.onInputDown, this);
  },

  update: function () {
    var x, y, cx, cy, dx, dy, angle, scale;

    x = this.input.position.x;
    y = this.input.position.y;
    cx = this.world.centerX;
    cy = this.world.centerY;

    angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    this.testentity.angle = angle;

    dx = x - cx;
    dy = y - cy;
    scale = Math.sqrt(dx * dx + dy * dy) / 100;

    this.testentity.scale.x = scale * 0.6;
    this.testentity.scale.y = scale * 0.6;
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
