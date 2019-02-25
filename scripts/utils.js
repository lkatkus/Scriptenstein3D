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