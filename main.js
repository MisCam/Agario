var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

var game = new Phaser.Game(config);

function preload() {}

function create() {
  moveKeys = this.input.keyboard.createCursorKeys();
  player = this.physics.add.sys.add.circle(100,100,20,'0x6666ff');
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
