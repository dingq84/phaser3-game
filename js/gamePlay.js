const gamePlay = {
  key: 'gamePlay',
  preload: function () {
    //background
    this.load.image('sky', 'images/天空＿又老又窮.png');
    this.load.image('city', 'images/城市.png');
    this.load.image('road', 'images/馬路.png');
    this.load.image('warning', 'images/warning.svg');
    //life and money
    this.load.image('life', 'images/生命.svg');
    this.load.image('money', 'images/金幣數.svg');
    this.load.image('money1', 'images/金幣.svg');
    this.load.image('treasure', 'images/發大財.svg');
    //role
    this.load.spritesheet('user', 'images/韓導合併.png', { frameWidth: 259, frameHeight: 305 });
    this.load.image('winner', 'images/韓導3.svg');
    this.load.image('badguy1', 'images/1450.svg');
    this.load.image('badguy2', 'images/老郭.svg');
    this.load.image('badguy3', 'images/老蔡.svg');
    //other
    this.load.image('ribbon', 'images/彩帶.svg');
    this.load.image('restart', 'images/restart.png');
    //variable
    this.gameover = false;
    this.lifeNumber = 3;
  },
  create: function () {
    let self = this;
    //設定背景和金幣和命
    this.sky = this.add.tileSprite(w / 2, 300, w, 680, 'sky');
    this.city = this.add.tileSprite(w / 2, 425, w, 481, 'city');
    this.road = this.add.tileSprite(w / 2, h / 2 + 330, w, 472, 'road');
    this.life1 = this.add.image(100, 100, 'life');
    this.life2 = this.add.image(200, 100, 'life');
    this.life3 = this.add.image(300, 100, 'life');

    this.line1 = this.add.rectangle(100, 100, 100, 10, ' 0xff0000', 0);
    this.line1.angle = 135;
    this.line2 = this.add.rectangle(200, 100, 100, 10, ' 0xff0000', 0);
    this.line2.angle = 135;
    this.line3 = this.add.rectangle(300, 100, 100, 10, ' 0xff0000', 0);
    this.line3.angle = 135;

    this.warning = this.add.image(w / 2, h / 3, 'warning');
    this.warning.setAlpha(0);
    this.winner = this.add.image(w / 4, h - 300, 'winner');
    this.winner.setAlpha(0);
    this.treasure = this.add.image(w / 2, h / 2 + 300, 'treasure');
    this.treasure.setAlpha(0);
    this.ribbon = this.add.image(w / 2, h / 2 + 250, 'ribbon');
    this.ribbon.setAlpha(0);
    this.restart = this.add.image(w / 2, h / 2 + 50, 'restart');
    this.restart.setAlpha(0);
    this.restart.setInteractive();
    this.restart.on('pointerdown', () => {
      this.scene.start('gamePlay');
    });
    let moneyQ = 0;
    this.money = this.add.image(w - 200, 100, 'money');
    const moneyText = this.add.text(w - 150, 75, `x  ${moneyQ}`, {
      fontFamily: ['acme'],
      fontSize: 50,
      color: 'black',
    });
    //設定人物位置
    this.player = this.physics.add.sprite(w / 4 - 120, h / 2, 'user').setScale(0.7).setSize(250, 70, 0).setOffset(0, 350).setDepth(5);
    //設定物理邊界
    this.player.setCollideWorldBounds();
    this.physics.world.setBounds(0, h - 300, 1200, 300);
    //設定動畫播放
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });
    //播放動畫
    this.player.anims.play('run', true);
    //設定鍵盤上下
    const key_up = this.input.keyboard.addKey('up');
    const key_down = this.input.keyboard.addKey('down');
    key_up.on('down', () => {
      this.player.y -= 160
    });
    key_down.on('down', () => {
      this.player.y += 160
    });
    //--------------------------------countdown-----------------------------------------//
    time = 90;
    const timeText = this.add.text(w / 2 - 100, 75, `Time : ${time}`, {
      fontFamily: ['"Roboto Condensed"'],
      fontSize: 50,
      color: 'black',
    });
    const timer = setInterval(() => {
      if (time > 0 && !this.gameover) {
        time--;
        timeText.setText(`Time : ${time}`);
      }
      else {
        clearInterval(timer);
        this.gameover = true;
        this.time.removeAllEvents();
        this.warning.setAlpha(1);
        this.winner.setAlpha(1);
        this.treasure.setAlpha(1);
        this.ribbon.setAlpha(1);
        this.restart.setAlpha(1);
        this.player.setAlpha(0);
      }

      if (time < 60 && time > 31)
        speedLv = 2
      else if (time < 30 && time > 0)
        speedLv = 4
      else if (time === 0)
        speedLv = 0;
    }, 1000);
    //--------------------------------countdown-----------------------------------------//
    //--------------------------------money---------------------------------------------//
    this.moneyGroup = this.physics.add.group({
      defaultKey: 'money1',
    });
    const timer1 = this.time.addEvent({
      delay: 4000,
      repeat: 1,
      callback: addmoney
    });
    function addmoney() {
      const randomNum = Math.floor(Math.random() * 3);
      switch (randomNum) {
        case 0:
          self.moneyGroup.create(1300, h / 2 + 210, 'money1');
          break;
        case 1:
          self.moneyGroup.create(1300, h / 2 + 380, 'money1');
          break;
        case 2:
          self.moneyGroup.create(1300, h / 2 + 490, 'money1');
          break;
      }
    }
    this.physics.add.collider(this.player, this.moneyGroup, moneyCallback);
    function moneyCallback(player, money) {
      money.visible = false;
      money.active = false;
      moneyQ++;
      moneyText.setText(`x  ${moneyQ}`);
    }
    //--------------------------------money---------------------------------------------//
    //--------------------------------badguy--------------------------------------------//
    this.badguyGroup = this.physics.add.group({
      defaultKey: 'badguy1',
    });
    const timer2 = this.time.addEvent({
      delay: 1800 - 100 * speedLv,
      loop: true,
      callback: addbadguy
    });
    function addbadguy() {
      const randomNum = Math.floor(Math.random() * 9);
      switch (randomNum) {
        case 0:
          self.badguyGroup.create(2000, h / 2 + 150, 'badguy1').setScale(0.7);
          break;
        case 1:
          self.badguyGroup.create(2000, h / 2 + 310, 'badguy1').setScale(0.7);
          break;
        case 2:
          self.badguyGroup.create(2000, h / 2 + 450, 'badguy1').setScale(0.7);
          break;
        case 3:
          self.badguyGroup.create(2000, h / 2 + 150, 'badguy2').setScale(0.7);
          break;
        case 4:
          self.badguyGroup.create(2000, h / 2 + 300, 'badguy2').setScale(0.7);
          break;
        case 5:
          self.badguyGroup.create(2000, h / 2 + 460, 'badguy2').setScale(0.7);
          break;
        case 6:
          self.badguyGroup.create(2000, h / 2 + 150, 'badguy3').setScale(0.7);
          break;
        case 7:
          self.badguyGroup.create(2000, h / 2 + 300, 'badguy3').setScale(0.7);
          break;
        case 8:
          self.badguyGroup.create(2000, h / 2 + 460, 'badguy3').setScale(0.7);
          break;
      }
    }

    const badguyCollider = this.physics.add.collider(this.player, this.badguyGroup, bayguyCallback);
    function bayguyCallback(player, badguy) {
      badguy.visible = false;
      badguy.active = false;
      badguyCollider.active = false;
      if (self.lifeNumber === 3)
        self.line3.fillAlpha = 1;
      else if (self.lifeNumber === 2)
        self.line2.fillAlpha = 1;
      else if (self.lifeNumber === 1) {
        self.line1.fillAlpha = 1;
        self.gameover = true;
      }
      self.lifeNumber -= 1;

      if (self.lifeNumber === 0)
        self.scene.start('gameOver')
      else {
        let alpha = setInterval(() => {
          player.setAlpha(0.8)
        }, 100)
        let alphaClear = setInterval(() => {
          player.setAlpha(1)
        }, 200);
        //三秒後重啟
        setTimeout(() => {
          badguyCollider.active = true
          clearInterval(alpha)
          clearInterval(alphaClear)
        }, 3000);
      }

    }
    //--------------------------------badguy--------------------------------------------//
  },
  update: function () {
    if (this.gameover) return;

    this.sky.tilePositionX += 6 * speedLv;
    this.city.tilePositionX += 4 * speedLv;
    this.road.tilePositionX += 4 * speedLv;

    let self = this;
    //------------------------------money-----------------------------------------------//
    Phaser.Actions.IncX(this.moneyGroup.getChildren(), -5);
    this.moneyGroup.children.iterate(function (item) {
      // 設定碰撞領域
      item.setOffset(-10, 0);
      if (!item.active) {
        const randomX = Phaser.Math.Between(1300, 3000);
        let randomY = Phaser.Math.Between(0, 2);
        switch (randomY) {
          case 0:
            randomY = h / 2 + 150;
            break;
          case 1:
            randomY = h / 2 + 310;
            break;
          case 2:
            randomY = h / 2 + 460;
            break;
        }
        item.setActive(true).setVisible(true).setPosition(randomX, randomY);
      }
      // 左邊界線消失
      if (item.x < 0) {
        self.moneyGroup.killAndHide(item);
      }
    });

    // if (this.line) {
    //   this.line.x -= 5
    //   if (this.line.x < 0) {
    //     this.line.setActive(false).setVisible(false)
    //   }
    // }
    // if (this.money3) {
    //   this.money3.x -= 5
    //   if (this.money3.x <= 640) {
    //     this.money3.x = 640
    //   }
    // }
    //------------------------------money-----------------------------------------------//
    //------------------------------badguy----------------------------------------------//
    Phaser.Actions.IncX(this.badguyGroup.getChildren(), -5);
    this.badguyGroup.children.iterate(function (item) {
      // 設定碰撞領域
      item.setSize(250, 50).setOffset(-10, 250);
      // 左邊界線消失
      if (item.x < 0) {
        self.badguyGroup.killAndHide(item);
      }
    });
    //------------------------------badguy----------------------------------------------//
  }
}