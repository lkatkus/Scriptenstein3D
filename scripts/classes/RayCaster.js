class RayCaster {
    constructor(canvas, canvasContext, x, y, rotation, level, fieldOfView) {
        this.canvas = canvas;
        this.ctx = canvasContext;

        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.level = level;
        this.fieldOfView = fieldOfView;
        
        this.raysContainer = [];

        for(let i = 0; i < fieldOfView / 2; i += 0.5) {
            this.raysContainer.push(new Ray(x, y, rotation, -i))
        }

        for(let i = 0; i < fieldOfView / 2; i += 0.5) {
            this.raysContainer.push(new Ray(x, y, rotation, i))
        }
    }

    draw() {
        this.raysContainer.forEach((ray) => {
            ray.x = this.x;
            ray.y = this.y;
            ray.rotation = this.rotation + ray.offset;
        });
        
        this.raysContainer.forEach((ray) => {
            const currentTile = this.level.getTileByCoordinates(ray.x, ray.y);

            ray.cast(this.ctx, this.level, currentTile);
        });

        this.drawField();
    }

    drawField() {
        
    }
}