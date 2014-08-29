var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'testsprite');
    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {
};

module.exports = Player;
