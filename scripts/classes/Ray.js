class Ray {
    constructor(originX, originY, rotation, offset) {
        this.x = originX;
        this.y = originY;
        this.rotation = rotation + offset;
        this.offset = offset;
    }

    draw(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = 'red';
        ctx.fillRect(-1, -1, 2, 2);
        ctx.restore();
    }

    cast(ctx, level, tile) {
        this.currentTile = tile;

        const offsetFromTileTop = this.y - this.currentTile.y;
        const offsetFromTileBottom = this.currentTile.y + this.currentTile.height - this.y;
        const offsetFromTileRight = this.currentTile.x + this.currentTile.width - this.x;
        const offsetFromTileLeft = this.x - this.currentTile.x;

        let intersectX;
        let intersectY;
        let nextTile;
        let nextX;
        let nextY;

        if (this.rotation > 360) {
            this.rotation = this.rotation - 360;
        }

        if (this.rotation < 0) {
            this.rotation = this.rotation + 360;
        }

        if (this.rotation === 0) {
            // this.draw(ctx, this.currentTile.x + this.currentTile.width, this.y);

            nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
            nextX = nextTile.x;
            nextY = this.y;
        }

        // BOTTOM RIGHT
        if (this.rotation > 0 && this.rotation < 90) {
            intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
            intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                // this.draw(ctx, this.currentTile.x + this.currentTile.width, intersectY);
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = intersectY;               
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                // this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y;
            } else {               
                // this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = nextTile.y;
            }
        }

        if (this.rotation === 90) {
            // this.draw(ctx, this.x, this.currentTile.y + this.currentTile.height);

            nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
            nextX = this.x;
            nextY = nextTile.y;
        }

        // BOTTOM LEFT
        if (this.rotation > 90 && this.rotation < 180) {
            intersectX = this.x - offsetFromTileBottom * getAngleTan(this.rotation - 90);
            intersectY = this.y + offsetFromTileLeft * getAngleTan(180 - this.rotation);

            if (intersectX < this.currentTile.x) {
                // this.draw(ctx, this.currentTile.x, intersectY);
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
                nextX = nextTile.x + nextTile.width;
                nextY = intersectY;
            } else if (intersectX > this.currentTile.x) {
                // this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y;
            } else {
                // this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col - 1);
                nextX = intersectX;
                nextY = intersectY;
            }
        }

        if (this.rotation === 180) {
            // this.draw(ctx, this.currentTile.x, this.y);

            nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
            nextX = nextTile.x + nextTile.width;
            nextY = this.y;
        }

        // TOP LEFT
        if (180 < this.rotation && this.rotation < 270) {
            const offsetRotation = 90 - (this.rotation - 180);

            intersectX = this.x - offsetFromTileTop * getAngleTan(offsetRotation);
            intersectY = this.y - offsetFromTileLeft / getAngleTan(offsetRotation);

            if (intersectX < this.currentTile.x) {
                // this.draw(ctx, this.currentTile.x, intersectY);
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
                nextX = nextTile.x + nextTile.width;
                nextY = intersectY;
            } else if (intersectX > this.currentTile.x) {
                // this.draw(ctx, intersectX, this.currentTile.y);
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y + nextTile.height;
            } else {
                // this.draw(ctx, intersectX, this.currentTile.y);
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col - 1);
                nextX = intersectX;
                nextY = intersectY;
            }
        }

        if (this.rotation === 270) {
            // this.draw(ctx, this.x, this.currentTile.y);

            nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
            nextX = this.x;
            nextY = nextTile.y + nextTile.height;
        }

        // TOP RIGHT
        if (270 < this.rotation && this.rotation < 360) {
            const offsetRotation = this.rotation - 270;

            intersectX = this.x + offsetFromTileTop * getAngleTan(offsetRotation);
            intersectY = this.y - offsetFromTileRight / getAngleTan(offsetRotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                // this.draw(ctx, this.currentTile.x + this.currentTile.width, intersectY);
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = intersectY;
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                // this.draw(ctx, intersectX, this.currentTile.y);
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y + nextTile.height;
            } else {
                // this.draw(ctx, intersectX, this.currentTile.y);
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col + 1);
                nextX = intersectX;
                nextY = intersectY;
            }
        }
        
        if (nextTile && nextTile.type !== 'grey') {
            this.x = nextX;
            this.y = nextY;
            this.cast(ctx, level, nextTile);
        } else {
            this.collisionX = nextX;
            this.collisionY = nextY;
        }
    }
}