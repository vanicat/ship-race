var Menu =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function () 
    {
        let fromLimit = 200;
        this.add.image(config.width/2, config.height/2, 'boat');

        let startButton = this.add.text(this.physics.world.bounds.centerX-200, 300, 'Click to start Start Game', config.textStyle);
        this.physics.add.existing(startButton);
        startButton.body.immovable = true

        let scene = this.scene
        this.input.once('pointerup', function (pointer) {
            scene.start("game");
        })

        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
        //startButton = this.add.text(this.physics.world.bounds.centerX, 16, 'Start Game', config.textStyle);
    },

    update: function () 
    {
    }
})