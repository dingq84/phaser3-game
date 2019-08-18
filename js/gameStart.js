const gameStart = {
  key: 'gameStart',
  preload: function () {
    //background
    this.load.image('bg', 'images/bg/背景＿又老又窮.jpg');
    //life and money
    this.load.image('life', 'images/生命.svg');
    this.load.image('money', 'images/金幣數.svg');
    //role
    this.load.image('role', 'images/韓導1.svg');
    //other
    this.load.image('treasure1', 'images/高雄發大財.png');
    this.load.image('up', 'images/向上鍵.svg');
    this.load.image('down', 'images/向下鍵.svg');
    this.load.image('start', 'images/start.png');
  },
  create: function () {
    this.bg = this.add.tileSprite(w / 2, h / 2, w, h, 'bg');
    this.life1 = this.add.image(100, 100, 'life');
    this.life2 = this.add.image(200, 100, 'life');
    this.life3 = this.add.image(300, 100, 'life');
    this.role = this.add.image(300, h / 2 + 300, 'role');
    this.treasure = this.add.image(w / 2 + 200, h / 2 - 100, 'treasure1');
    this.up = this.add.image(w / 2 + 100, h / 2 + 350, 'up');
    this.down = this.add.image(w / 2 + 300, h / 2 + 350, 'down');
    time = 90;
    const timeText = this.add.text(w / 2 - 200, 60, `TIME : ${time} s`, {
      fontFamily: ['acme'],
      fontSize: 60,
      color: 'black',
    });
    this.money = this.add.image(w - 200, 100, 'money');
    const moneyText = this.add.text(w - 150, 75, `x 0`, {
      fontFamily: ['acme'],
      fontSize: 50,
      color: 'black',
    });
    this.start = this.add.image(w / 2 + 200, h / 2 + 200, 'start');
    this.start.setInteractive();
    this.start.on('pointerdown', () => {
      this.scene.start('gamePlay');
    })
  },
  update: function () {
    this.bg.tilePositionX += 4;
  }
}