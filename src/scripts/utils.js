export function updateDebugger() {
    document.getElementById('debugger')
        .innerText =
            `X: ${this.x}
            Y: ${this.y}
            Rotation: ${this.rotation}
            TileX: (${this.currentTile.x}, ${this.currentTile.x + this.currentTile.width})
            TileY: (${this.currentTile.y}, ${this.currentTile.x + this.currentTile.height})`;
}

export function getRadiansFromAngle(angle) {
    return angle * Math.PI / 180;
}

export function getAngleTan(angle) {
    return Math.tan(getRadiansFromAngle(angle));
}

export function calculateCoordinatesAfterRotation(rotation, speed) {
    const newX = Math.cos(getRadiansFromAngle(rotation)) * speed;
    const newY = Math.sin(getRadiansFromAngle(rotation)) * speed;

    return {
        x: newX,
        y: newY,
    }
}
