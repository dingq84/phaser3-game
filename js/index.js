const config = {
  type: Phaser.AUTO,
  width: w,
  height: h,
  parnet: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [gameStart, gamePlay, gameOver]
}
const game = new Phaser.Game(config);