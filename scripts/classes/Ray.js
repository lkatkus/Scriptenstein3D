class Ray {
    constructor(originX, originY, rotation) {
        this.x = originX;
        this.y = originY;
        this.rotation = rotation;
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

        let intersectX;
        let intersectY;
        let nextTile;

        const offsetFromTileTop = this.y - this.currentTile.y;
        const offsetFromTileBottom = this.currentTile.y + this.currentTile.height - this.y;
        const offsetFromTileRight = this.currentTile.x + this.currentTile.width - this.x;
        const offsetFromTileLeft = this.x - this.currentTile.x;

        if (this.rotation > 0 && this.rotation < 90) {
            intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
            intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                this.draw(ctx, this.currentTile.x + this.currentTile.width, intersectY);

                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                
                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
                
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);
                
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);
                
                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = nextTile.y;
                    this.cast(ctx, level, nextTile);
                }

            } else {               
                this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);

                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col + 1);
                
                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x;
                    this.y = nextTile.y;
                    this.cast(ctx, level, nextTile);
                }
            }
        }

        if (this.rotation > 90 && this.rotation < 180) {
            intersectX = this.x - offsetFromTileBottom * getAngleTan(this.rotation - 90);
            intersectY = this.y + offsetFromTileLeft * getAngleTan(180 - this.rotation);

            if (intersectX < this.currentTile.x) {
                this.draw(ctx, this.currentTile.x, intersectY);

                nextTile = 'left';
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);

                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x + nextTile.width;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            } else if (intersectX > this.currentTile.x) {
                this.draw(ctx, intersectX, this.currentTile.y + this.currentTile.height);

                nextTile = 'bottom';
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col);

                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = nextTile.y;
                    this.cast(ctx, level, nextTile);
                }
            } else {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'bottom left';
                nextTile = level.getTileByRowCol(this.currentTile.row + 1, this.currentTile.col - 1);
                
                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            }
        }

        if (0 > this.rotation && this.rotation > -90) {
            intersectX = this.x + offsetFromTileTop / getAngleTan(-this.rotation);
            intersectY = this.y - offsetFromTileRight * getAngleTan(-this.rotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                this.draw(ctx, this.currentTile.x + this.currentTile.width, intersectY);

                nextTile = 'right';
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);

                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                this.draw(ctx, intersectX, this.currentTile.y);

                nextTile = 'top';
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);
                
                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x + nextTile.width;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            } else {
                this.draw(ctx, intersectX, this.currentTile.y);

                nextTile = 'top right';
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col + 1);

                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            }
        }

        if (-90 > this.rotation && this.rotation > -180) {
            intersectX = this.x + offsetFromTileTop * getAngleTan(90 + this.rotation);
            intersectY = this.y - offsetFromTileLeft * getAngleTan(180 + this.rotation);

            if (intersectX < this.currentTile.x) {
                this.draw(ctx, this.currentTile.x, intersectY);

                nextTile = 'left';
                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col - 1);
                
                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x + nextTile.width;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            } else if (intersectX > this.currentTile.x) {
                this.draw(ctx, intersectX, this.currentTile.y);

                nextTile = 'top';
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col);

                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = nextTile.y + nextTile.height;
                    this.cast(ctx, level, nextTile);
                }
            } else {
                this.draw(ctx, intersectX, this.currentTile.y);
                
                nextTile = 'top left';
                nextTile = level.getTileByRowCol(this.currentTile.row - 1, this.currentTile.col - 1);

                if (nextTile.type !== 'grey') {
                    this.x = intersectX;
                    this.y = intersectY;
                    this.cast(ctx, level, nextTile);
                }
            }
        }
    }
}