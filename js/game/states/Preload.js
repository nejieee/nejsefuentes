BraveSoldier.Preload = function(){
    this.ready = false;
};

BraveSoldier.Preload.prototype = {
    preload: function(){

        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY ,'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 220, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground', 'assets/images/soil.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('foreground', 'assets/images/grasss.png');
        this.load.image('bullet', 'assets/images/bala.png');
        this.load.image('finish', 'assets/images/flag.png');

      //  this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
        this.load.spritesheet('player', 'assets/images/taaoo.png', 288, 339, 5 );
        this.load.spritesheet('playbutton' , 'assets/images/start.png' , 400 , 120);
        this.load.spritesheet('enemy', 'assets/images/alien.png', 196, 242, 4);

        this.load.audio('gameMusic', 'assets/audio/gamemusic.wav');
        this.load.audio('enemy', 'assets/audio/enemydeath.mp3');
        this.load.audio('death', 'assets/audio/gameover.mp3');
        this.load.audio('shot', 'assets/audio/shot.wav');
        this.load.audio('win', 'assets/audio/Win.mp3');

        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create: function(){
        this.preloadBar.cropEnabled = false;
    },
    update: function(){
        if (this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};
