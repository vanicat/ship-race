/*jshint esversion: 6 */

var game;


var Starter = new Phaser.Class({
    Extends: Phaser.Scene,

    preload: function ()
    {
        this.load.image('boat', 'assets/batteau.svg');
        this.load.svg('board', 'assets/board.svg');
        this.load.svg('start', 'assets/start.svg');
        this.load.image('tiles', 'assets/tile.png');
        this.load.tilemapTiledJSON('level1', 'assets/macarte.json');
    },

    create: function ()
    {
        this.scene.add("game", MainGame, false);
        this.scene.add("menu", Menu, false);
        this.scene.add("victory", Victory, false);

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
        // this.scene.start("game", { map: 0 });
        this.scene.start("menu", null); // menu should be activated soon.
    }
});


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    input: {
        gamepad: true,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            /* {
                
                showAngleIndicator: true,
                angleColor: 0xe81153,
                
                showVelocity: true,
                velocityColor: 0x00aeef,

                showBody: true,
                showStaticBody: true,
            }, */

            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Starter ],
    parent: "game",
    textStyle: { fontSize: '32px', fill: '#FFF', boundsAlignH: "center", boundsAlignV: "middle" },
    shipSize: 0.035,
    lateralDrag: 0.007,
    frontDrag: 0.003,
    torque: 0.005,
    rotateThreshold: 0.05,
    angularVelocity: 20,
    angularAccel: 0.08,
    acceleration: 0.00025,
    hid: {
        size: 100,
        powerX: (180+140/2),
        powerY: (25+50/2),
        hullX: (450+140/2),
        hullY: (25+50/2),
        angleX: (750+140/2),
        angleY: (25+50/2),
        restX: (1010+140/2),
        restY: (25+50/2),
    },
    maps: ['level1']
};


function main() {
    game = new Phaser.Game(config);
}

function nextLevel(scene, num) {
    if(num === undefined)
    {
        num = 0;
    }
    else
    {
        num ++;
    }

    if(num >= config.maps.length)
    {
        scene.start("victory");
    }
    else
    {
        scene.start("game", { map: num });
    }

}
