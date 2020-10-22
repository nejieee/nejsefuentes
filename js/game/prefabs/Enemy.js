var Enemy = function(game, x, y, key, frame){ 
    key = 'enemy';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(0.5);
    this.anchor.setTo(0.5);

    this.animations.add('bounce');

    this.game.physics.arcade.enableBody(this);
    this.body.bounce.x = 1;
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(50,50);
    this.body.setScale = (0.5);
    this.body.setDrag = (0.5);

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;
    this.events.onRevived.add(this.onRevived, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function(){
    this.body.velocity.x = 100;
    this.animations.play('bounce', 8, true);
};
