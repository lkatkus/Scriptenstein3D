const TILE_SIZE = 30;

class Tile {
    constructor(row, col, type) {
        this.x = row * TILE_SIZE;
        this.y = col * TILE_SIZE;
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