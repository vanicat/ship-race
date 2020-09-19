var game;


var Starter = new Phaser.Class({
    Extends: Phaser.Scene,

    preload: function ()
    {
        this.load.image('boat', 'assets/batteau.svg');
    },

    create: function ()
    {
//        this.scene.add("game", MainGame, false);
        this.scene.add("menu", Menu, false);
    },

    update: function ()
    {
        this.scene.start("menu", null);
    }
})


var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    scene: [ Starter ],
    parent: "game",
    textStyle: { fontSize: '32px', fill: '#000', boundsAlignH: "center", boundsAlignV: "middle" }
};


function main() {
    game = new Phaser.Game(config);
    console.log("yo")
}
