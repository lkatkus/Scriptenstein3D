const TILE_SIZE = 70;

class LevelTile {
    constructor(row, col, type) {
        this.x = col * TILE_SIZE;
        this.y = row * TILE_SIZE;
        this.row = row;
        this.col = col;
        this.type = this.getBackground(type);
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
    }

    getBackground(type) {
        if (type === 1) {
            return 'grey';
        } else {
            return 'green';
        }
    }
}