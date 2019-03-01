const LEVEL_LAYOUT = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

class Level {   
    constructor(canvas, canvasContext) {
        this.canvas = canvas;
        this.ctx = canvasContext;

        this.tileContainer = LEVEL_LAYOUT.map((layoutRow, row) => {
            return layoutRow.map((type, col) => {
                return new LevelTile(row, col, type)
            })
        });
    }

    draw() {
        this.tileContainer.forEach((layoutRow) => {
            layoutRow.forEach((tile) => {
                this.ctx.fillStyle = tile.type;
                this.ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.stroke();
            })
        });
    }

    getTileByCoordinates(x, y) {
        const row = Math.floor(x / TILE_SIZE);
        const col = Math.floor(y / TILE_SIZE);

        return this.tileContainer[row][col];
    }

    getTileByRowCol(row, col) {
        return this.tileContainer[row][col];
    }
}