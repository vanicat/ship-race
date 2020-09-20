/*jshint esversion: 6 */

var Victory =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function (data) 
    {
        let score;
        if (data.score) {
            message = 'You did it! Your score is ' + data.score; 
        }
        else
        {
            message = 'You dit it!';
        }
        this.add.text(config.width / 2, config.height / 3, message, config.textStyle);
        this.add.text(config.width / 2, 2 * config.height / 3, 'use A to restart', config.textStyle);
        
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
                this.scene.start("menu", null);
            }
        }
    }
});
