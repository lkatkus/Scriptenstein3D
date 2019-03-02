class Player {
    constructor(game, canvas, canvasContext, x, y) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = canvasContext;
        
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.currentTile = this.game.level.getTileByCoordinates(x, y);
        
        this.movementSpeed = 10;
        this.rotationSpeed = 5;
    }

    move(direction) {
        if (direction === MOVEMENT_DIRECTION.left || direction === MOVEMENT_DIRECTION.right) {
            this.rotate(direction);
        }

        if (direction === MOVEMENT_DIRECTION.up || direction === MOVEMENT_DIRECTION.down) {
            const newCoordinates = calculateCoordinatesAfterRotation(
                this.rotation,
                this.movementSpeed
            );

            this.x = Math.floor(this.x + newCoordinates.x);
            this.y = Math.floor(this.y + newCoordinates.y);

            this.game.rayCaster.x = this.x;
            this.game.rayCaster.y = this.y;
        }

        this.currentTile = this.game.level.getTileByCoordinates(this.x, this.y);

        this.draw();
    }

    rotate(direction) {
        if (direction === MOVEMENT_DIRECTION.right) {
            const newRotation = this.rotation + (this.rotationSpeed);

            this.rotation = newRotation < 360
                ? newRotation
                : newRotation - 360;

            this.game.rayCaster.rotation = this.rotation;
        } else {
            const newRotation = this.rotation - this.rotationSpeed;
            
            if (newRotation < 0) {
                this.rotation = newRotation + 360;
            } else {
                this.rotation = this.rotation - this.rotationSpeed;
            }

            this.game.rayCaster.rotation = this.rotation;
        }
    }

    shoot() {
        console.log(this);

        // const projectile = new Projectile(this.x, this.y, this.rotation, 20);
        // PROJECTILES_ARRAY.push(projectile);
    }

    draw() {      
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(-5, -5, 10, 10);
        this.ctx.restore();

        // if (PROJECTILES_ARRAY.length > 0) {
        //     PROJECTILES_ARRAY = PROJECTILES_ARRAY.filter((projectile) => {
        //         return projectile.x > 0 && projectile.x < this.canvas.width;
        //     });

        //     PROJECTILES_ARRAY.map((projectile) => {
        //         this.ctx.save();
        //         this.ctx.translate(projectile.x, projectile.y);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-2.5, -2.5, 5, 5);
        //         this.ctx.restore();
        //     })
        // }

        updateDebugger.call(this);
    }
};