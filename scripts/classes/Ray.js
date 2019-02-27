class Ray {
    constructor(originX, originY, rotation) {
        this.x = originX;
        this.y = originY;
        this.rotation = rotation;
    }

    draw(ctx, level, tile) {
        this.currentTile = tile;

        // console.log(this.currentTile);

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
                ctx.save();
                ctx.translate(this.currentTile.x + this.currentTile.width, intersectY);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = level.getTileByRowCol(this.currentTile.row, this.currentTile.col + 1);
                
                if (nextTile.type !== 'grey') {
                    this.x = nextTile.x;
                    this.y = intersectY;
                    this.draw(ctx, level, nextTile);
                }
                
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();
                
                nextTile = 'bottom';
            } else {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();
                
                nextTile = 'bottom right';
            }
        }

        if (this.rotation > 90 && this.rotation < 180) {
            intersectX = this.x + offsetFromTileBottom / getAngleTan(this.rotation);
            intersectY = this.y + offsetFromTileLeft * getAngleTan(-this.rotation);

            if (intersectX < this.currentTile.x) {
                ctx.save();
                ctx.translate(this.currentTile.x, intersectY);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'left';
            } else if (intersectX > this.currentTile.x) {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'bottom';
            } else {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y + this.currentTile.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'bottom left';                
            }
        }

        if (0 > this.rotation && this.rotation > -90) {
            intersectX = this.x + offsetFromTileTop / getAngleTan(-this.rotation);
            intersectY = this.y + offsetFromTileRight * getAngleTan(this.rotation);

            if (intersectX > this.currentTile.x + this.currentTile.width) {
                ctx.save();
                ctx.translate(this.currentTile.x + this.currentTile.width, intersectY);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'right';
            } else if (intersectX < this.currentTile.x + this.currentTile.width) {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'top';
            } else {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'top right';
            }
        }

        if (-90 > this.rotation && this.rotation > -180) {
            intersectX = this.x + offsetFromTileTop / getAngleTan(-this.rotation);
            intersectY = this.y + offsetFromTileLeft * getAngleTan(-this.rotation);

            if (intersectX < this.currentTile.x) {
                ctx.save();
                ctx.translate(this.currentTile.x, intersectY);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'left';
            } else if (intersectX > this.currentTile.x) {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'top';
            } else {
                ctx.save();
                ctx.translate(intersectX, this.currentTile.y);
                ctx.fillStyle = 'red';
                ctx.fillRect(-1, -1, 2, 2);
                ctx.restore();

                nextTile = 'top left';
            }
        }
    }
}