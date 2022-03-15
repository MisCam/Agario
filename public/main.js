const canv = document.getElementById('canv');
let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  parent: canv,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    extend: {
      player: null,
      moveKeys: null,
    },
  },
};

let game = new Phaser.Game(config);

function preload() {}

function create() {
  moveKeys = this.input.keyboard.createCursorKeys();
  this.add.rectangle(0, 0, config.width*2, config.height*2, '0xffffff');
  player = this.physics.add.sys.add.circle(100, 100, 25, '0xff0000');
}

function update() {
  if (moveKeys.left.isDown) {
    player.x--;
  } else if (moveKeys.right.isDown) {
    player.x++;
  }
  if (moveKeys.up.isDown) {
    player.y--;
  } else if (moveKeys.down.isDown) {
    player.y++;
  }

}
