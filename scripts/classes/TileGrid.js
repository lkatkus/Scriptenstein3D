const LEVEL_LAYOUT = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

class Level {
    constructor(canvas, canvasContext) {
        this.canvas = canvas;
        this.ctx = canvasContext;

        this.mappedGrid = LEVEL_LAYOUT.map((layoutRow, row) => {
            return layoutRow.map((type, col) => {
                return new Tile(row, col, type)
            })
        });
    }

    draw() {
        this.mappedGrid.forEach((layoutRow) => {
            layoutRow.forEach((tile) => {
                this.ctx.fillStyle = tile.type;
                this.ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.stroke();
            })
        });
    }
}