class Game {
    constructor () {
        this.setupCanvas();
        this.setupControls();

        this.level = new Level(this.canvas, this.context);
        this.player = new Player(this, this.canvas, this.context, PLAYER_SPAWN_X, PLAYER_SPAWN_Y);
        this.rayCaster = new RayCaster(this.canvas, this.context, this.player.x, this.player.y, this.player.rotation, this.level, 80);

        this.mainDraw = this.mainDraw.bind(this);
        this.setupCanvas = this.setupCanvas.bind(this);
        this.setupControls = this.setupControls.bind(this);

        setInterval(this.mainDraw, FPS);
        // setInterval(this.mainDraw, 5000);
    }

    setupCanvas() {
        this.canvas = document.getElementById('canvas-map');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = LEVEL_LAYOUT[0].length * TILE_SIZE;
        this.canvas.height = LEVEL_LAYOUT.length * TILE_SIZE;
    }

    setupControls() {
        document.addEventListener('keydown', () => {
            if (SHOOTING_KEY_CODES.includes(event.keyCode)) {
                this.player.shoot();
            }

            if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
                this.player.move(MOVEMENT_KEYS[event.key]);
            }
        });
    }

    mainDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level.draw();
        this.rayCaster.draw();
        this.player.draw();
    };
}