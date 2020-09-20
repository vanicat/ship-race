/*jshint esversion: 6 */

var Menu =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function () 
    {
        let startButton = this.add.text(config.width / 2, config.height / 2, 'Click to start Start Game', config.textStyle);
        
        let scene = this.scene;
        this.input.once('pointerup', function (pointer) {
            scene.start("game");
        });

        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
    },

    update: function () 
    {
    }
});
