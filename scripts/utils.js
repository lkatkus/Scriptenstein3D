function updateDebugger() {
    document.getElementById('debugger')
        .innerText =
            `X: ${this.x}
            Y: ${this.y}
            Rotation: ${this.rotation}`;
}

function getRadiansFromAngle(angle) {
    return angle * Math.PI / 180;
}

function calculateCoordinatesAfterRotation(rotation, speed) {
    const newX = Math.cos(getRadiansFromAngle(rotation)) * speed;
    const newY = Math.sin(getRadiansFromAngle(rotation)) * speed;

    return {
        x: newX,
        y: newY,
    }
}