var MainGame =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function () 
    {
        let ship = this.add.image(config.width/2, config.height/2, 'boat');
        //ship.anchor.setTo(0.5, 0.5); comment on fait en
        ship.setScale(config.shipSize);
        
        this.physics.add.existing(ship);
        this.ship = ship;

        ship.body.maxAngular = 100;
        ship.body.angularDrag = 10; // TODO: this in configure
        ship.body.drag = 20;

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

            // console.log(gamepad.L1, gamepad.L2, gamepad.leftStick, gamepad.R1, gamepad.R2);

            if (!gamepad)
            {
                continue;
            }

            //TODO: may be use constant accel, and stick as new maximum.

            if (gamepad.leftStick.x > 0.05)
            {
                this.ship.body.angularAcceleration = 50;
                this.ship.body.maxAngular = 50 * gamepad.leftStick.x;
            }
            else if (gamepad.leftStick.x < -0.05)
            {
                this.ship.body.angularAcceleration = -50;
                this.ship.body.maxAngular = -50 * gamepad.leftStick.x;
            }
            else 
            {
                this.ship.body.angularAcceleration = 0;
            }
            acceleration = (gamepad.L2 - gamepad.R2) * 10; // in config!

            var angle = this.ship.body.angle / Math.PI * 180;
            var rotation = this.ship.body.rotation-90;

            // When aligned, the diff is 270 

            var diff = angle-rotation;
            var perp;
            while(diff <= -180) diff += 360;
            while(diff > 180) diff -= 360;

            if(diff > 0)
            {
                perp = rotation - 90;
            }
            else // maybe something when we are aligned !
            {
                perp = rotation + 90;
            }

            console.log(diff, rotation, perp);

            a1 = this.physics.velocityFromAngle(rotation, acceleration);
            a2 = this.physics.velocityFromAngle(perp, config.lateral_drag);
            this.ship.body.setAcceleration(a1.x + a2.x, a1.y + a2.y);

            if (gamepad.A) {
                this.ship.body.reset(config.width/2, config.height/2);
            }
        }

    }
});
