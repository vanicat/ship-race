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
            var L2, R2;

            if (!gamepad)
            {
                continue;
            }

            if (!this.myonlylog) {
                console.log(gamepad);
                this.myonlylog = true;
            }

            if (config.isFirefox)
            {
                if (gamepad.axes[5].value == 0 && !this.firstTrueAxesR2)
                {
                    R2 = 0;
                }
                else
                {
                    this.firstTrueAxesR2 = true;
                    R2 = (1 + gamepad.axes[5].value) / 2;
                }

                if (navigator.getGamepads()[i].axes[2] == 0 && !this.firstTrueAxesL2)
                {
                    L2 = 0;
                }
                else
                {
                    this.firstTrueAxesL2 = true;
                    L2 = (1 + navigator.getGamepads()[i].axes[2]) / 2;
                }
            }
            else
            {
                L2 = gamepad.L2;
                R2 = gamepad.R2;
            }

            for (let j = 0; j < gamepad.axes.length; j++)
            {
                if (gamepad.axes[j] && gamepad.axes[j].value > 0) {
                //    console.log(j, gamepad.axes[j]); // seem to be 5 and 6 for firefox
                }
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
            acceleration = (L2 - R2) * 10; // in config!

            var velocity = this.ship.body.velocity.clone();
            var rotation = this.ship.body.rotation-90;
            var unit_dir = this.physics.velocityFromAngle(rotation, 1);
            var perp_component = unit_dir.clone().normalizeLeftHand();

            var perp_velocity = perp_component.dot(velocity); // add current
            perp_component.scale(-perp_velocity * config.lateral_drag);

            a1 = this.physics.velocityFromAngle(rotation, acceleration);
            a2 = perp_component;
            this.ship.body.setAcceleration(a1.x + a2.x, a1.y + a2.y);

            if (gamepad.A) {
                this.ship.body.reset(config.width/2, config.height/2);
            }
        }

    }
});
