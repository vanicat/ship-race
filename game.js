function unitVector(angle)
{
    return Phaser.Math.Vector2.RIGHT.clone().rotate(angle/180*Math.PI).normalize();
}

function getInput(gamepad)
{
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

    return { accel: L2, reverse: R2, x: gamepad.leftStick.x };
}

function getFlow(x, y, layer) {
    var tile = layer.getTileAtWorldXY(x, y);
    if(tile && (tile.properties.currentX || tile.properties.currentY))
    {
        return new Phaser.Math.Vector2(tile.properties.currentX, tile.properties.currentY);
    }
    else
    {
        return new Phaser.Math.Vector2(0, 0);
    }
}

var MainGame =  new Phaser.Class({
    Extends: Phaser.Scene,

    create: function () 
    {
        // MAP
        const map = this.make.tilemap({ key: "level1" });

        const tileset = map.addTilesetImage("tiles", "tiles");

        const belowLayer = map.createStaticLayer("sealevel", tileset, 0, 0);
        this.sealevel = belowLayer;

        this.matter.world.setBounds(0, 0, this.sealevel.width, this.sealevel.height);

        belowLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(belowLayer);

        // SHIP
        const spawnPoint = map.findObject("objects", obj => obj.name === "start");

        let ship = this.matter.add.image(spawnPoint.x, spawnPoint.y, 'boat');
        ship.spawnPoint = spawnPoint;

        //ship.anchor.setTo(0.5, 0.5); comment on fait en
        ship.setScale(config.shipSize);

        let body = this.matter.add.rectangle(spawnPoint.x, spawnPoint.y, ship.width*config.shipSize, ship.height*config.shipSize, {
            chamfer: { radius: 15 }
        });

        ship.setExistingBody(body);

        this.ship = ship;
        ship.setMass(4);
        ship.setBounce(0.05);
        ship.setFrictionAir(config.frontDrag);

        // CAMERA
        const hidX = 0;
        const hidY = -config.hid.size * 2;

        this.cameras.main.startFollow(this.ship)
        .setBounds(0, 0, this.sealevel.width, this.sealevel.height)
        .setSize(config.width, config.height - config.hid.size)
        .setPosition(0,config.hid.size);
        this.cameras.snd = this.cameras.add(0, 0, config.width, config.hid.size)
        .setScroll(hidX, hidY);

        // HID
        this.add.image(0, hidY, 'board')
        .setOrigin(0, 0);
        let powerText = this.add.text(hidX + config.hid.powerX, hidY + config.hid.powerY, 'None')
        .setOrigin(0.5, 0.5)
        .setFontSize(32)
        .setColor('#000000')
        .setFontFamily('"Arial"');
        let hullText = this.add.text(hidX + config.hid.hullX, hidY + config.hid.hullY, 'None')
        .setOrigin(0.5, 0.5)
        .setFontSize(32)
        .setColor('#000000')
        .setFontFamily('"Arial"');

        ship.setHull = function(x) {
            ship.hull = x;
            hullText.setText(x);
        };

        ship.setHull(100);

        ship.setPower = function(x) {
            ship.power = x;
            powerText.setText(Math.round(x));
        };

        ship.setPower(0);

        ship.addPower = function(x){
            ship.setPower(Phaser.Math.Clamp(ship.power + x, -40, 100));
        };
    },

    update: function () 
    {
        window.myGame = this;

        var pads = this.input.gamepad.gamepads;
        for (let i = 0; i < pads.length; i++)
        {
            var gamepad = pads[i];

            if (!gamepad)
            {
                continue;
            }

            let input = getInput(gamepad);

            //TODO: may be use constant accel, and stick as new maximum.

            var ship = this.ship;
            var body = this.ship.body;
            var ship_angle = ship.angle - 90;

            var velocity = new Phaser.Math.Vector2(body.velocity.x, body.velocity.y);

            if (input.x > config.rotateThreshold || input.x < -config.rotateThreshold)
            {
                body.torque += config.torque * input.x;
            }


            acceleration = (input.accel - input.reverse);

            ship.addPower(Math.round(acceleration * 32)/32);

            var flow = getFlow(this.ship.x, this.ship.y, this.sealevel);

            velocity.add(flow);

            
            var unit_dir = unitVector(ship_angle);
            var perp_component = unit_dir.clone().normalizeLeftHand();

            var perp_velocity = perp_component.dot(velocity);
            perp_component.scale(-perp_velocity * config.lateralDrag);
            perp_component.limit(0.1);

            ship.applyForce(perp_component); 
            ship.applyForce(unitVector(ship_angle).scale(ship.power/100 * config.acceleration)); // Should use thrust something

            if (gamepad.A) {
                this.ship.body.reset(config.width/2, config.height/2);
            }
        }
    }
});
