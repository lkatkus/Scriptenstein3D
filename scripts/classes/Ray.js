class Ray {
    constructor(originX, originY, rotation, offset) {
        this.originX = originX;
        this.originY = originY;
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

        if (this.rotation === 0 || this.rotation === 360) {
            nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
            nextX = nextTile.x;
            nextY = this.y;
        }

        // BOTTOM RIGHT
        if (this.rotation > 0 && this.rotation < 90) {
            intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
            intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = intersectY;               
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y;
            } else {               
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = nextTile.y;
            }
        }

        if (this.rotation === 90) {
            nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
            nextX = this.x;
            nextY = nextTile.y;
        }

        // BOTTOM LEFT
        if (this.rotation > 90 && this.rotation < 180) {
            intersectX = this.x - offsetFromTileBottom * getAngleTan(this.rotation - 90);
            intersectY = this.y + offsetFromTileLeft * getAngleTan(180 - this.rotation);

            if (intersectX < this.currentTile.x) {
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
                nextX = nextTile.x + nextTile.width;
                nextY = intersectY;
            } else if (intersectX > this.currentTile.x) {
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y;
            } else {
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col - 1);
                nextX = intersectX;
                nextY = intersectY;
            }
        }

        if (this.rotation === 180) {
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
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
                nextX = nextTile.x + nextTile.width;
                nextY = intersectY;
            } else if (intersectX > this.currentTile.x) {
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y + nextTile.height;
            } else {
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col - 1);
                nextX = intersectX;
                nextY = intersectY;
            }
        }

        if (this.rotation === 270) {
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
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                nextX = nextTile.x;
                nextY = intersectY;
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
                nextX = intersectX;
                nextY = nextTile.y + nextTile.height;
            } else {
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

            let rayLength;
            let dx;
            let dy;

            if (this.rotation === 0) {
                rayLength = this.collisionX - this.originX;
            }

            if (this.rotation > 0 && this.rotation < 90) {
                dy = this.collisionY - this.originY;
                rayLength = dy / Math.sin(getRadiansFromAngle(this.rotation));
            }

            if (this.rotation === 90) {
                rayLength = this.collisionY - this.originY;
            }

            if (this.rotation > 90 && this.rotation < 180) {
                dx = this.originX - this.collisionX;
                rayLength = dx / Math.sin(getRadiansFromAngle(this.rotation - 90));
            }

            if (this.rotation === 180) {
                rayLength = this.originX - this.collisionX;
            }
            
            if (this.rotation > 180 && this.rotation < 270) {
                dy = this.originY - this.collisionY;
                rayLength = dy / Math.sin(getRadiansFromAngle(this.rotation - 180));
            }

            if (this.rotation === 270) {
                rayLength = this.originY - this.collisionY;
            }
            
            if (this.rotation > 270 && this.rotation < 360) {
                dy = this.originY - this.collisionY;
                rayLength = dy / Math.sin(getRadiansFromAngle(360 - this.rotation));
            }

            this.rayDrawDistance = Math.cos(getRadiansFromAngle(this.offset)) * rayLength;
        }
    }
}