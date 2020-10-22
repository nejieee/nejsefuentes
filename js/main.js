var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'');

game.state.add('Boot', BraveSoldier.Boot);
game.state.add('Preloader', BraveSoldier.Preload);
game.state.add('MainMenu', BraveSoldier.MainMenu);
game.state.add('Game', BraveSoldier.Game);


game.state.start('Boot');
