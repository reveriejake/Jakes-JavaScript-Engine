import Behaviour from "./behaviour.js";
import SpriteRenderer from "./spriterenderer.js";
import Time from "./time.js";

class SpriteAnimator extends Behaviour {

    frameRateMultiplier = 1;

    #animations = new Map();

    #sprite = null;
    #frameIndex = 0;

    #animNextFrameTime = 0;
    #animFrameStart = 0;
    #animFameEnd = 0;
    #animFrameRate = 24;

    start() {

        this.#sprite = this.entity.getComponent(SpriteRenderer);
        this.isEnabled = (this.#sprite);

        this.spriteCellsX = 3;
        this.spriteCellsY = 3;

        this.#animNextFrameTime = Time.time + (this.#animFrameRate / 1000);
    }

    update() {

        // update animation frames
        if(Time.time > this.#animNextFrameTime) {
    
            this.#animNextFrameTime = (Time.time + (1.0 / this.#animFrameRate)) / this.frameRateMultiplier;

            this.#frameIndex++;
            if(this.#frameIndex > this.#animFameEnd)
                this.#frameIndex = this.#animFrameStart;

            this.#sprite.frameX = Math.floor(this.#frameIndex % this.spriteCellsX);
            this.#sprite.frameY = Math.floor(this.#frameIndex / this.spriteCellsY);
        }
        
    }

    addAnimation(animationName, frameStart, frameEnd, frameRate) {
        
        this.#animations.set(animationName, [frameStart, frameEnd, frameRate]);
    }

    setAnimation(animationName) {

        if(this.#animations.has(animationName)) {
            
            const anim = this.#animations.get(animationName);
            this.#animFrameStart = anim[0];
            this.#animFameEnd = anim[1];
            this.#animFrameRate = anim[2];
        }
    }

}
export default SpriteAnimator;