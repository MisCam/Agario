const canv = document.getElementById('canv');
const socket = io('http://localhost:3000');

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

document.getElementById('start_game').addEventListener('click', async function() {
  const nick = document.getElementById('login_input').value;
  socket.emit('login', { nick });
  canv.innerHTML = '';
  let game = new Phaser.Game(config);
});

socket.on('getScene', arr => drawPlayers(arr));

function preload() {}

function create() {
  moveKeys = this.input.keyboard.createCursorKeys();
  this.add.rectangle(0, 0, config.width*2, config.height*2, '0xffffff');
  player = this.add.circle(100, 100, 25, '0xff0000');
  const moving = setInterval(() => {
    socket.emit('move', { x: player.x, y: player.y });
  }, 200);
}

function update() {
  if (moveKeys.left.isDown) {
    player.x -= 1.5;
  } else if (moveKeys.right.isDown) {
    player.x += 1.5;
  }
  if (moveKeys.up.isDown) {
    player.y -= 1.5;
  } else if (moveKeys.down.isDown) {
    player.y += 1.5;
  }

}

function drawPlayers(players){
  console.log(players);
}
