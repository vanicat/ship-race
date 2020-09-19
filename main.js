var game;


var Starter = new Phaser.Class({
    Extends: Phaser.Scene,

    preload: function ()
    {
        this.load.image('boat', 'assets/batteau.svg');
    },

    create: function ()
    {
        this.scene.add("game", MainGame, false);
        this.scene.add("menu", Menu, false);
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
    shipSize: 0.1,
    lateral_drag: 1,
};


function main() {
    game = new Phaser.Game(config);
}
