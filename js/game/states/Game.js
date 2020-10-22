BraveSoldier.Game = function(){

  this.enemyRate = 1800; //this will spawn enemy every 500ms
  this.enemyTimer = 0; //create an enemy every game loop
  this.bulletTime=0;// create a bullet every game loop

  this.score = 0;
  this.kill=0;
};
BraveSoldier.Game.prototype = {
  create: function(){
    //show the same animation when user tap the screen
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 512, 'background');
    this.background.autoScroll(-100, 0);
    this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height -533, 'foreground');
    this.foreground.autoScroll(-100,0);

    this.ground = this.game.add.tileSprite(0, this.game.height -73, this.game.width, 73, 'ground');
    this.ground.autoScroll(-400, 0);

    this.finish = this.add.tileSprite(this.game.width - 140, this.game.height / 1.5, 158, 511, 'finish');

    this.player = this.game.add.sprite(20, 390, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
    this.player.animations.add('jump', [ 3], 10, true);



    //this will enable physics to our game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Using the arcade physics system,we are setting the gravity in the horizontal direction of 400, the higher the value the more gravity
    this.game.physics.arcade.gravity.y = -100;
    this.game.physics.arcade.gravity.x = +100;

    this.game.physics.arcade.enableBody(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(0.25);

    this.game.physics.arcade.enableBody(this.finish);
    this.finish.body.allowGravity = false;
    this.finish.body.immovable = true;

    this.enemies = this.game.add.group();
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;

    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(1, 'bullet');
    this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this); //mg generate ug bullet kada press e call ang function na(resetBullet)
    this.bullets.setAll('checkWorldBounds', true);

    //  Register the key.
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.scoreText = this.game.add.bitmapText(1160,40, 'minecraftia', 'Score: 0', 32);
    this.killText = this.game.add.bitmapText(50,50, 'minecraftia', 'Kill: 0', 32);

    this.winSound = this.game.add.audio('win');
    this.enemySound = this.game.add.audio('enemy');
    this.deathSound = this.game.add.audio('death');
    this.shotSound = this.game.add.audio('shot');
    this.gameMusic = this.game.add.audio('gameMusic');
    this.gameMusic.play('', 0, true);
  },

  update: function(){
    this.player.body.velocity.x = 0; //reset the x velocity of hero
    this.player.body.velocity.y = 0; //reset the y velocity of hero

    if (this.cursors.left.isDown){
      this.player.body.velocity.x = -250;
      this.player.animations.play('walk',true);
    }

    else if (this.cursors.right.isDown){
      this.player.body.velocity.x = 250;
      this.player.animations.play('walk',true);
    }

    else if (this.cursors.up.isDown){
      this.player.body.velocity.y = -1000;
      this.player.animations.play('jump',true);
    }

    else if (this.cursors.down.isDown){
      this.player.body.velocity.y = 1000;
      this.player.animations.play('jump',true);
    }

    else {
      this.player.animations.play('walk',true);
      //this.player.frame = 0;
    }

    if (this.enemyTimer < this.game.time.now) {
      this.createEnemy();
      this.enemyTimer = this.game.time.now + this.enemyRate; //increment the enemy
    }

    if (this.spaceKey.isDown){
      this.fireBullet();
    }

    if (this.enemyTimer < this.game.time.now) {
      this.createenemy();
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }

    //if(this.score == 10){
      //this.playerwin();
    //}

    this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.finish, this.finishHit, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.bullets, this.enemyShot, null, this);
  },



    shutdown: function(){
        this.enemies.destroy();
        this.bullets.destroy();
        this.score = 0;
        this.kill= 0;
        this.enemyTimer = 0;
    },


    createEnemy: function(){
        var x = 2500;
        var y = this.game.rnd.integerInRange(0, this.game.world.height - 200);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0);
            this.enemies.add(enemy);
        }


        enemy.reset(x, y); //set sprite
        enemy.revive();

    },

    fireBullet:function(){ //recycle bullet and add to bullet group
        if (this.game.time.now > this.bulletTime){
        bullet = this.bullets.getFirstExists(false);

            if (bullet){
                bullet.reset(this.player.x +170, this.player.y - 25); // position sa bullet from player
                bullet.body.velocity.x =50000; //position of bullet ug ang velocity sa ground
            }
        }
    },


    enemyHit: function(player, enemy){
        player.kill(); //will kill the player
        enemy.kill(); // will kill the enemy

        this.deathSound.play(); //play the hit sound when the player hit the enemy
        this.gameMusic.stop(); //end the game music

        this.ground.stopScroll(); //will stop ground from scrolling
        this.background.stopScroll(); // will stop bg from scrolling
        this.foreground.stopScroll(); //will stop fground from scrolling

        this.enemies.setAll('body.velocity.x', 0);// we stop enemies from moving forward


        this.enemyTimer = Number.MAX_VALUE; //stop generating enemies

        var scoreboardlose = new Scoreboardlose(this.game);
          scoreboardlose.show(this.score, this.kill);
    },

    resetBullet: function(bullet){
        bullet.kill();
        this.shotSound.play();
    },

    enemyShot: function(bullet, enemy){
        this.score+=1; // add 2points to the scoree
        this.kill++; //increase our kill
        this.enemySound.play(); //sf
        bullet.kill(); //will hide the bullet
        enemy.kill(); //will hide the enemy
        this.scoreText.text = 'Score: ' + this.score; //add the score to the board
        this.killText.text='Kill: '+ this.kill; // add the kill to the board
    },

    finishHit: function(player, finish) {
      player.kill(); //will kill the player
      //enemy.kill(); // will kill the enemy

      this.winSound.play(); //play the hit sound when the player hit the enemy
      this.gameMusic.stop(); //end the game music

      this.ground.stopScroll(); //will stop ground from scrolling
      this.background.stopScroll(); // will stop bg from scrolling
      this.foreground.stopScroll(); //will stop fground from scrolling

      this.enemies.setAll('body.velocity.x', 0);// we stop enemies from moving forward
      this.enemyTimer = Number.MAX_VALUE; //stop generating enemies

      var scoreboardwin = new ScoreboardWin(this.game);
      scoreboardwin.show(this.score); //, this.kill

    }
};
