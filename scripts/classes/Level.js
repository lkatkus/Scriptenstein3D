class Level {   
    constructor(canvas, canvasContext) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        this.textureManager = new TextureManager();

        this.tileContainer = LEVEL_LAYOUT.map((layoutRow, row) => {
            return layoutRow.map((type, col) => {
                return new LevelTile(
                    row,
                    col,
                    this.textureManager.getColorById(type),
                    this.textureManager.getTextureById(type),
                )
            })
        });
    }

    draw() {
        this.tileContainer.forEach((layoutRow) => {
            layoutRow.forEach((tile) => {
                this.ctx.fillStyle = tile.type;
                this.ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
                this.ctx.closePath();
            })
        });
    }

    getTileByCoordinates(x, y) {
        const row = Math.floor(y / TILE_SIZE);
        const col = Math.floor(x / TILE_SIZE);

        return this.tileContainer[row][col];
    }

    getTileByRowCol(row, col) {
        return this.tileContainer[row][col];
    }
}