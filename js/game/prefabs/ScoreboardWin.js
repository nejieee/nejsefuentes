var ScoreboardWin = function(game){
  Phaser.Group.call(this, game);
};

ScoreboardWin.prototype = Object.create(Phaser.Group.prototype);
ScoreboardWin.prototype.constructor = ScoreboardWin;

ScoreboardWin.prototype.show = function(score){

  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, startText;

  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  bmd.ctx.fillRect(0, 0, this.game.width, this.game.height);

  background = this.game.add.sprite(0, 0, bmd);
  background.alpha = 0.5;
  background.fixedToCamera = true;
  this.add(background);

  var isNewHighScore = false;
  var highscore = localStorage.getItem('highscore'); //localStorage.removeItem('highscore');
  if(!highscore || highscore < score){
    isNewHighScore = true;
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }

  this.y = this.game.height;

  gameoverText = this.game.add.bitmapText(0, this.game.height / 3.5, 'minecraftia', 'You Win !', 40);
  gameoverText.x = this.game.width/2 - (gameoverText.textWidth / 2);
  gameoverText.tint = 0xf40d01;
  gameoverText.fixedToCamera = true;
  this.add(gameoverText);

  scoreText = this.game.add.bitmapText(0, this.game.height / 2, 'minecraftia', 'Your Score: ' + score, 28);
  scoreText.x = this.game.width/2 - (scoreText.textWidth / 2);
  scoreText.fixedToCamera = true;
  this.add(scoreText);

  highScoreText = this.game.add.bitmapText(0, this.game.height / 2.50, 'minecraftia', 'High Score: ' + highscore, 28);
  highScoreText.x = this.game.width/2 - (highScoreText.textWidth / 2);
  highScoreText.fixedToCamera = true;
  this.add(highScoreText);

  startText = this.game.add.bitmapText(0, this.game.height / 1.60, 'minecraftia', 'TAP to play again', 20);
  startText.x = this.game.width/2 - (startText.textWidth / 2);
  startText.fixedToCamera = true;
  this.add(startText);

  if(isNewHighScore){
    newHighScoreText = this.game.add.bitmapText(0, this.game.height / 2.5, 'minecraftia', 'New High Score!', 12);
    newHighScoreText.tint = 0x4ebef7;
    newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
    newHighScoreText.angle = 45;
    newHighScoreText.fixedToCamera = true;
    this.add(newHighScoreText);
  }

  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
  this.game.input.onDown.addOnce(this.restart, this);
};

ScoreboardWin.prototype.restart = function(){
  this.game.state.start('Game', true, false);
};
