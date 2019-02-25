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
let PROJECTILES_ARRAY = [];

class Player {
    constructor(canvas, canvasContext, x, y) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        
        this.x = x;
        this.y = y;
        this.rotation = 0;
        
        this.movementSpeed = 10;
        this.rotationSpeed = 10;
    }

    move(direction) {
        if (direction === MOVEMENT_DIRECTION.left || direction === MOVEMENT_DIRECTION.right) {
            this.rotate(direction);
        }

        if (direction === MOVEMENT_DIRECTION.up || direction === MOVEMENT_DIRECTION.down) {
            this.getCoordinatesAfterRotation(direction);
        }

        this.draw();
    }

    rotate(direction) {
        if (direction === MOVEMENT_DIRECTION.right) {
            const newRotation = this.rotation + (this.rotationSpeed);

            this.rotation = newRotation < 360 ? newRotation : newRotation - 360;
        } else {
            const newRotation = this.rotation + (this.rotationSpeed * -1);
            
            this.rotation = newRotation > -360 ? newRotation : newRotation + 360;
        }
    }

    shoot() {
        const projectile = new Projectile(this.x, this.y, this.rotation, 20);
        
        PROJECTILES_ARRAY.push(projectile);
    }

    getCoordinatesAfterRotation(direction) {
        const newX = Math.cos(getRadiansFromAngle(this.rotation)) * this.movementSpeed;
        const newY = Math.sin(getRadiansFromAngle(this.rotation)) * this.movementSpeed;

        if (direction === MOVEMENT_DIRECTION.up) {
            this.x = this.x + newX;
            this.y = this.y + newY;
        } else {
            this.x = this.x - newX;
            this.y = this.y - newY;
        }
    }

    draw() {
        updateDebugger.call(this);
        
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(-15, -15, 30, 30);
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(12, -15, 3, 30);
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
    }
};

function startGame() {
    CANVAS = document.getElementById('canvas-map');
    CONTEXT = CANVAS.getContext('2d');

    CANVAS.width = LEVEL_LAYOUT[0].length * TILE_SIZE;
    CANVAS.height = LEVEL_LAYOUT.length * TILE_SIZE;

    PLAYER = new Player(CANVAS, CONTEXT, CANVAS.width / 2, CANVAS.height / 2);
    LEVEL = new Level(CANVAS, CONTEXT);

    document.addEventListener('keydown', () => {
        if (SHOOTING_KEY_CODES.includes(event.keyCode)) {
            PLAYER.shoot();
        }

        if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
            PLAYER.move(MOVEMENT_KEYS[event.key]);
        }
    });

    setInterval( mainDraw, 1000 / 30);
};

function mainDraw() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    LEVEL.draw();
    PLAYER.draw();
};
