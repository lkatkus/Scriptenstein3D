import Texture from './../../images/wall.jpg';

const TEXTURES = {
    0: {
        color: 'green',
        src: Texture,
    },
    1: {
        color: 'grey',
        src: Texture,
    },
}

class TextureManager {
    constructor() {
        this.textures = Object.keys(TEXTURES).map((id) => {
            const texture = new Image();
            texture.src = TEXTURES[id].src;

            return texture;
        });
    }

    getColorById(id) {
        return TEXTURES[id].color;
    }

    getTextureById(id) {
        return this.textures[id];
    }
}

export default TextureManager;