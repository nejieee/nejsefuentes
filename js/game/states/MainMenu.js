BraveSoldier.MainMenu = function(){};

BraveSoldier.MainMenu.prototype = {
    create: function(){

      this.background = this.game.add.tileSprite(0, 0, this.game.width, 530, 'background' );
    this.background.autoScroll(-100,0);

    this.foreground = this.game.add.tileSprite(0,470, this.game.width, this.game.height - 533, 'foreground' );
    this.foreground.autoScroll(-100,0);

    this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground' );
    this.ground.autoScroll(-400,0);

    
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playbutton');
    this.splash.anchor.setTo(0.5,-0.5);
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.4, 0.8);

    this.startText = this.game.add.bitmapText(0,0, 'minecraftia', '', 32);

    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + this.splash.height  / 2;


  },
  update: function()  {
    if (this.game.input.activePointer.justPressed()){
      this.game.state.start('Game');
    }
  }
};
