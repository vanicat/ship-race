/*jshint esversion: 6 */

var Menu =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function () 
    {
        let startButton = this.add.image(config.width / 2, config.height / 2, 'start');
        
        let scene = this.scene;
        this.input.once('pointerup', function (pointer) {
            scene.start("game", { map: 0 });
        });

        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
    },

    update: function () 
    {
        var pads = this.input.gamepad.gamepads;

        for (let i = 0; i < pads.length; i++)
        {
            var gamepad = pads[i];

            if (!gamepad)
            {
                continue;
            }

            let input = getInput(gamepad, i);

            if (gamepad.A) {
                this.scene.start("game", { map: 0 });
            }
        }
    }
});
