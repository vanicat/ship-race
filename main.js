var game;


var Starter = new Phaser.Class({
    Extends: Phaser.Scene,

    preload: function ()
    {
        this.load.image('boat', 'assets/batteau.svg');
        this.load.image('tiles', 'assets/tile.png');
        this.load.tilemapTiledJSON('level1', 'assets/macarte.json');
    },

    create: function ()
    {
        this.scene.add("game", MainGame, false);
        this.scene.add("menu", Menu, false);

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
        {
            config.isFirefox = true;
        }
        else
        {
            config.isFirefox = false;
        }
    },

    update: function ()
    {
        this.scene.start("menu", null);
    }
});


var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    input: {
        gamepad: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    scene: [ Starter ],
    parent: "game",
    textStyle: { fontSize: '32px', fill: '#FFF', boundsAlignH: "center", boundsAlignV: "middle" },
    shipSize: 0.05,
    lateralDrag: 3,
    angularVelocity: 20,
    angularAccel: 20,
    acceleration: 10,
};


function main() {
    game = new Phaser.Game(config);
}
