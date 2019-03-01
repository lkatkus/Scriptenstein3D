class RayCaster {
    constructor(canvas, canvasContext, x, y, rotation, level) {
        this.canvas = canvas;
        this.ctx = canvasContext;

        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.level = level;

        this.raysContainer = [new Ray(x, y, rotation)];
    }

    draw() {
        this.raysContainer[0].x = this.x;
        this.raysContainer[0].y = this.y;
        this.raysContainer[0].rotation = this.rotation;
        
        this.raysContainer.forEach((ray) => {
            const currentTile = this.level.getTileByCoordinates(ray.x, ray.y);

            ray.cast(this.ctx, this.level, currentTile);
        });
    }
}