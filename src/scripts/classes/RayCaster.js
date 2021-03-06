import Ray from './Ray';

import {
    TILE_TEXTURE_SIZE,
} from './../constants';

class RayCaster {
    constructor(canvas, canvasContext, x, y, rotation, level, fieldOfView) {
        this.canvas = canvas;
        this.ctx = canvasContext;

        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.level = level;
        this.fieldOfView = fieldOfView;
        this.raysContainer = [];

        this.setInitialRays();
        this.setup3dCanvas();
    }

    setup3dCanvas() {
        this.canvas3d = document.getElementById('canvas-3d');
        this.ctx3d = this.canvas3d.getContext('2d');

        this.canvas3d.width = window.innerWidth;
        this.canvas3d.height = window.innerHeight;
    }

    setInitialRays() {
        const {
            x,
            y,
            rotation,
        } = this;

        // this.raysContainer.push(new Ray(x, y, rotation, 0))

        for(let i = this.fieldOfView / 2; i > 0; i -= 0.125) {
            this.raysContainer.push(new Ray(x, y, rotation, -i))
        }

        for(let i = 0; i < this.fieldOfView / 2; i += 0.125) {
            this.raysContainer.push(new Ray(x, y, rotation, i))
        }
    }

    draw() {
        this.raysContainer.forEach((ray) => {
            ray.x = this.x;
            ray.y = this.y;
            ray.originX = this.x;
            ray.originY = this.y;
            ray.rotation = this.rotation + ray.offset;
        });
        
        this.raysContainer.forEach((ray) => {
            const currentTile = this.level.getTileByCoordinates(ray.x, ray.y);

            ray.cast(this.ctx, this.level, currentTile);
        });

        this.drawField();
        this.draw3d();
    }

    drawField() {
        this.ctx.fillStyle = 'rgba(50, 50, 50, 0.3)';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);

        this.raysContainer.forEach((ray) => {
            this.ctx.lineTo(ray.collisionX, ray.collisionY);
        });
                
        this.ctx.lineTo(this.x, this.y);
        this.ctx.fill();
        this.ctx.stroke();
    }

    draw3d() {
        const colRes = Math.floor(this.canvas3d.width / this.raysContainer.length);
        this.ctx3d.clearRect(0, 0, this.canvas3d.width, this.canvas3d.height);

        this.raysContainer.forEach((ray, i) => {
            const rayDrawHeight = 30000 / ray.rayDrawDistance;

            this.ctx3d.save();
            this.ctx3d.translate(colRes * i, this.canvas3d.height / 3 * 2);
            this.ctx3d.drawImage(
                ray.collisionTile.texture,
                TILE_TEXTURE_SIZE / 100 * ray.collisionPoint,
                0,
                colRes,
                TILE_TEXTURE_SIZE,
                0,
                rayDrawHeight / 3,
                colRes,
                 - rayDrawHeight
            );
            this.ctx3d.restore();
        });
    }
}

export default RayCaster;