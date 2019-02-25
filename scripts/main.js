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

let PLAYER;
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

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillRect(-25, -25, 50, 50);
        this.ctx.restore();

        if (PROJECTILES_ARRAY.length > 0) {
            PROJECTILES_ARRAY = PROJECTILES_ARRAY.filter((projectile) => {
                return projectile.x > 0 && projectile.x < this.canvas.width;
            });

            PROJECTILES_ARRAY.map((projectile) => {
                this.ctx.fillRect(projectile.x, projectile.y, 5, 5);
            })
        }
    }
};

function startGame() {
    const canvas = document.getElementById('canvas-map');
    const canvasContext = canvas.getContext('2d');

    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;

    PLAYER = new Player(canvas, canvasContext, 150, 150);

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
    PLAYER.draw();
};
