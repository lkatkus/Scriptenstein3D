export const FPS = 1000 / 30;

export const TILE_SIZE = 30;
export const TILE_TEXTURE_SIZE = 564;

export const PLAYER_SPAWN_X = TILE_SIZE * 5;
export const PLAYER_SPAWN_Y = TILE_SIZE * 5;

export const LEVEL_LAYOUT = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const MOVEMENT_DIRECTION = {
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down',
}

export const SHOOTING_KEY_CODES = [32];
export const MOVEMENT_KEY_CODES = [37, 38, 39, 40];

export const MOVEMENT_KEYS = {
    ArrowLeft: MOVEMENT_DIRECTION.left,
    ArrowRight: MOVEMENT_DIRECTION.right,
    ArrowUp: MOVEMENT_DIRECTION.up,
    ArrowDown: MOVEMENT_DIRECTION.down,
}
