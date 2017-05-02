var game = new Phaser.Game(640, 480, Phaser.AUTO);

var keyup;
var keydown;
var keyleft;
var keyright;

var Preloader = function(game) {};
Preloader.prototype = {
  preload: function() {},
  create: function() {
    //#agency
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    keyup = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyup.onDown.add(up, this);
    keydown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    keydown.onDown.add(down, this);
	keyleft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyleft.onDown.add(left, this);
    keyright = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyright.onDown.add(right, this);
    
    game.state.start('MainMenu');
  }
}
var MainMenu = function(game) {};
MainMenu.prototype = {
  create: function() {
  },
  update: function() {
    game.state.start('Game');
  }
}

var player;
var entities;
var pillars;
var stage = new Array();

var Game = function(game) {};
Game.prototype = {
  preload: function() {
    game.load.image('sky', 'img/savanna.png');
	game.load.image('tile', 'img/tile.png');
    game.load.audio('blip', 'audio/Blip_Select5.wav');
    game.load.audio('go', 'audio/Pickup_Coin.wav');
    game.load.audio('splash', 'audio/Hit_Hurt11.wav');
  },
  create: function() {
    moveblip = game.add.audio('blip');
    startbeep = game.add.audio('go');
    splashsound = game.add.audio('splash');

    //draw background
    sky = game.add.sprite(0, 0, 'sky');
    sky.height = game.height;
    sky.width = game.width;

    //init stage
    stage = game.add.group();
    for (var i = 0; i < 6; i++) {
       pillars[i] = new Array();
       for (var j = 0; j < 6; j++) {
         pillars[i][j] = stage.create(i*5, j*5, 'tile');
       }
    }

    //init player agent
    entities = game.add.group();
    player = entities.create(10, 10, 'cheetah')

    //init meters

    //init flavortext

  },
  update: function() {
    
    //player

  }
}

function up() {
  upper = 1;
  moveblip.play();
}

function down() {
  downer = 1;
  moveblip.play();
}

function left() {
  lefter = 1;
  moveblip.play();
}

function right() {
  righter = 1;
  moveblip.play();
}

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor1(color, percent) { // deprecated. See below.
  var num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.start('Preloader');
