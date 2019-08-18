const gameOver = {
  key: 'gameOver',
  preload: function () {
    //background
    this.load.image('bg', 'images/gameover.svg');
  },
  create: function () {
    this.bg = this.add.image(w / 2, h / 2, 'bg');
  },
  update: function () {
  }
}