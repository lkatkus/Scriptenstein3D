const MOVEMENT_DIRECTION = {
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down',
}

const SHOOTING_KEY_CODES = [32];
const MOVEMENT_KEY_CODES = [37, 38, 39, 40];

const MOVEMENT_KEYS = {
    ArrowLeft: MOVEMENT_DIRECTION.left,
    ArrowRight: MOVEMENT_DIRECTION.right,
    ArrowUp: MOVEMENT_DIRECTION.up,
    ArrowDown: MOVEMENT_DIRECTION.down,
}

let CANVAS;
let CONTEXT;
let PLAYER;
let LEVEL;
let RAY_CASTER;
let PROJECTILES_ARRAY = [];

const SPAWN_X = 105;
const SPAWN_Y = 105;

class Player {
    constructor(canvas, canvasContext, x, y) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.currentTile = LEVEL.getTileByCoordinates(x, y);
        
        this.movementSpeed = 10;
        this.rotationSpeed = 5;
    }

    move(direction) {
        this.currentTile = LEVEL.getTileByCoordinates(this.x, this.y);

        if (direction === MOVEMENT_DIRECTION.left || direction === MOVEMENT_DIRECTION.right) {
            this.rotate(direction);
        }

        if (direction === MOVEMENT_DIRECTION.up || direction === MOVEMENT_DIRECTION.down) {
            const newCoordinates = calculateCoordinatesAfterRotation(
                this.rotation,
                this.movementSpeed
            );

            this.x = this.x + newCoordinates.x;
            this.y = this.y + newCoordinates.y;

            RAY_CASTER.x = this.x;
            RAY_CASTER.y = this.y;
        }

        this.draw();
    }

    rotate(direction) {
        if (direction === MOVEMENT_DIRECTION.right) {
            const newRotation = this.rotation + (this.rotationSpeed);

            this.rotation = newRotation < 180
                ? newRotation
                : newRotation - 360;

            RAY_CASTER.rotation = this.rotation;
        } else {
            const newRotation = this.rotation + (this.rotationSpeed * -1);
            
            this.rotation = newRotation > -180
                ? newRotation
                : newRotation + 360;

            RAY_CASTER.rotation = this.rotation;
        }
    }

    shoot() {
        console.log(this);

        // const projectile = new Projectile(this.x, this.y, this.rotation, 20);
        
        // PROJECTILES_ARRAY.push(projectile);
    }

    drawFieldOfView() {
        // const offsetFromTileTop = this.y - this.currentTile.y;
        // const offsetFromTileBottom = this.currentTile.y + this.currentTile.height - this.y;

        // const offsetFromTileRight = this.currentTile.x + this.currentTile.width - this.x;
        // const offsetFromTileLeft = this.x - this.currentTile.x;

        // let intersectX;
        // let intersectY;
        // let nextTile;

        // if (this.rotation > 0 && this.rotation < 90) {
        //     intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
        //     intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

        //     if (intersectX > this.currentTile.x + this.currentTile.width) {
        //         this.ctx.save();
        //         this.ctx.translate(this.currentTile.x + this.currentTile.width, intersectY);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'right';
        //     } else if (intersectX < this.currentTile.x + this.currentTile.width) {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();
                
        //         nextTile = 'bottom';
        //     } else {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();
                
        //         nextTile = 'bottom right';
        //     }
        // }

        // if (this.rotation > 90 && this.rotation < 180) {
        //     intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
        //     intersectY = this.y + offsetFromTileLeft * getAngleTan(-this.rotation);

        //     if (intersectX < this.currentTile.x) {
        //         this.ctx.save();
        //         this.ctx.translate(this.currentTile.x, intersectY);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'left';
        //     } else if (intersectX > this.currentTile.x) {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'bottom';
        //     } else {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'bottom left';                
        //     }
        // }

        // if (0 > this.rotation && this.rotation > -90) {
        //     intersectX = this.x + offsetFromTileTop / getAngleTan(-this.rotation);
        //     intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

        //     if (intersectX > this.currentTile.x + this.currentTile.width) {
        //         this.ctx.save();
        //         this.ctx.translate(this.currentTile.x + this.currentTile.width, intersectY);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'right';
        //     } else if (intersectX < this.currentTile.x + this.currentTile.width) {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'top';
        //     } else {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'top right';
        //     }
        // }

        // if (-90 > this.rotation && this.rotation > -180) {
        //     intersectX = this.x + offsetFromTileTop / getAngleTan(-this.rotation);
        //     intersectY = this.y + offsetFromTileLeft * getAngleTan(-this.rotation);

        //     if (intersectX < this.currentTile.x) {
        //         this.ctx.save();
        //         this.ctx.translate(this.currentTile.x, intersectY);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'left';
        //     } else if (intersectX > this.currentTile.x) {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'top';
        //     } else {
        //         this.ctx.save();
        //         this.ctx.translate(intersectX, this.currentTile.y);
        //         this.ctx.fillStyle = 'red';
        //         this.ctx.fillRect(-1, -1, 2, 2);
        //         this.ctx.restore();

        //         nextTile = 'top left';
        //     }
        // }

        // this.nextTile = nextTile;

        const viewStart = calculateCoordinatesAfterRotation(
            this.rotation - 45,
            20,
        );

        const viewEnd = calculateCoordinatesAfterRotation(
            this.rotation + 45,
            20,
        );

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(viewStart.x, viewStart.y);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(viewEnd.x, viewEnd.y);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();
        this.ctx.restore();
    }

    draw() {      
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(-5, -5, 10, 10);
        this.ctx.restore();

        if (PROJECTILES_ARRAY.length > 0) {
            PROJECTILES_ARRAY = PROJECTILES_ARRAY.filter((projectile) => {
                return projectile.x > 0 && projectile.x < this.canvas.width;
            });

            PROJECTILES_ARRAY.map((projectile) => {
                this.ctx.save();
                this.ctx.translate(projectile.x, projectile.y);
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(-2.5, -2.5, 5, 5);
                this.ctx.restore();
            })
        }

        updateDebugger.call(this);
    }
};

function startGame() {
    CANVAS = document.getElementById('canvas-map');
    CONTEXT = CANVAS.getContext('2d');

    CANVAS.width = LEVEL_LAYOUT[0].length * TILE_SIZE;
    CANVAS.height = LEVEL_LAYOUT.length * TILE_SIZE;

    LEVEL = new Level(CANVAS, CONTEXT);
    PLAYER = new Player(CANVAS, CONTEXT, SPAWN_X, SPAWN_Y);
    RAY_CASTER = new RayCaster(CANVAS, CONTEXT, PLAYER.x, PLAYER.y, PLAYER.rotation, LEVEL);

    document.addEventListener('keydown', () => {
        if (SHOOTING_KEY_CODES.includes(event.keyCode)) {
            PLAYER.shoot();
        }

        if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
            PLAYER.move(MOVEMENT_KEYS[event.key]);
        }
    });

    setInterval(mainDraw, 1000 / 30);
};

function mainDraw() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    LEVEL.draw();
    PLAYER.draw();
    RAY_CASTER.draw();
    PLAYER.drawFieldOfView();
};
