class Projectile {
    constructor(playerX, playerY, direction, speed) {
        this.x = playerX;
        this.y = playerY;
        this.direction = direction;
        this.speed = speed;

        this.startMovement();
    }

    startMovement() {
        setInterval(() => {
            // this.x = this.x + this.speed;
            // this.y = this.y + this.speed;

            this.updateLocation();
        }, 1000 / 60)
    }

    updateLocation() {
        this.x = this.x + Math.cos(getRadiansFromAngle(this.direction)) * this.speed;
        this.y = this.y + Math.sin(getRadiansFromAngle(this.direction)) * this.speed;
    }
}