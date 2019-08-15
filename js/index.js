const gameStart = {
  key: 'gameStart',
  preload: function () {
    this.load.image('bg1', 'images/天空＿又老又窮.png');
    this.load.image('bg2', 'images/城市.png');
    this.load.image('footer', 'images/馬路.png');
    this.load.spritesheet('user', 'images/韓導合併.png', { frameWidth: 259, frameHeight: 305 });
  },
  create: function () {
    this.bg1 = this.add.tileSprite(600, 240, 1200, 800, 'bg1');
    this.bg2 = this.add.tileSprite(600, 450, 1200, 481, 'bg2');

    //加入地板，把地板加入物理效果
    this.footer = this.add.tileSprite(600, 860, 1200, 472, 'footer');
    // this.physics.add.existing(this.footer);
    // this.footer.body.immovable = true;
    // this.footer.body.moves = false;
    //設定人物位置
    this.player = this.add.sprite(150, 800, 'user');
    // this.player = this.physics.add.sprite(150, 550, 'user')

    // //設定角色彈跳值
    // this.player.setBounce(0.2);

    // //設定角色碰撞邊界
    // this.player.setSize(259, 305, 0);

    //設定角色顯示大小
    this.player.setScale(0.7);

    //設定動畫播放
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    })

    //將需要碰撞的物件綁在一起
    // this.physics.add.collider(this.player, this.footer);

    //播放動畫
    this.player.anims.play('run', true);
  },
  update: function () {
    this.bg1.tilePositionX += 4;
    this.bg2.tilePositionX += 4;
    this.footer.tilePositionX += 4;

    const keyboard = this.input.keyboard.createCursorKeys();

    if (keyboard.up.isDown) {
      console.log('up');
      this.player.setVelocityY(-200);
    } else if (keyboard.down.isDown) {
      console.log('down')
      this.player.setVelocityY(200);
    }
  }
}
const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 1080,
  parnet: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1500
      },
      debug: true,
    },
  },
  scene: [gameStart]
}
const game = new Phaser.Game(config);