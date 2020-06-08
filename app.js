var config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'Asset/backg.jpg');
    this.load.image('mywheel', 'Asset/wheel.png');
    this.load.image('pin', 'Asset/pin.png');;
    this.load.image('stand', 'Asset/stand.png');
    this.load.image('startBtn', 'Asset/button.png');
    this.load.image('yougot', 'Asset/yougot.png');
    
    // this.load.image('restart', 'assets/restart.png');
    this.load.audio('spin', 'Asset/sound.mp3');
    // this.load.audio('drum', 'assets/drum.mp3')
}

function create() {
    let W = game.config.width;
    let H = game.config.height;
    background = this.add.sprite(W / 2, H / 2, 'background');
    this.pin = this.add.sprite(W / 2, H / 2 - 150, 'pin').setScale(0.2);
    this.pin.depth = 1;
    this.stand = this.add.sprite(W / 2, H / 2 + 250, 'stand').setScale(0.25);
    this.wheel = this.add.sprite(W / 2, H / 2+50, 'mywheel').setScale(0.2).setOrigin(0.5, 0.5);
    this.startBtn = this.add.sprite(W/2, 70, 'startBtn').setScale(.50).setInteractive({
        cursor: 'pointer'
    });
    
    this.yougot = this.add.sprite(400, 300, 'yougot');
    this.yougot.visible = false;
    this.spin = this.sound.add('spin');
    this.startBtn.on('pointerdown', spinWheel, this);
}

function spinWheel() {
    let W = game.config.width;
    let H = game.config.height;
    this.startBtn.visible = false;
    
    this.sound.play('spin');
    console.log("In the spin wheel function");
    let rounds = Phaser.Math.Between(0, 11);
    let prizes = ["CB BOOK", "CB TSHIRT", "2 EXTRA SPIN", "AMAZON VOUCHER", "50% OFF", "NETFLIX SUBS", "100% OFF", "CB SWAGPACK", "70% OFF", "HARD LUCK", "35% OFF", "3000 CB CREDITS", ];
    console.log(prizes[rounds]);
    let tween = this.tweens.add({
        targets: this.wheel,
        ease: 'cubic.out',
        angle: 360 * 3 + (30 * rounds),
        duration: 11000
    })
    setTimeout(() => {
        console.log("Timeout to freeze the mouse")
        this.pin.visible = false;
        this.yougot.visible = true;
        this.add.text(W / 2 - 100, H / 2 + 100, `${prizes[rounds]}`, {
            fontSize: '30px',
            fontFamily: 'Times New Roman',
            color: 'orange',
        });
        this.input.on("pointerdown", restart, this);
    }, 13000);

}

function update() {
    console.log("In update");

}

function restart() {
    this.scene.restart();

}