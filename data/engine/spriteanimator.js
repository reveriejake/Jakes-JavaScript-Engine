import Behaviour from "./behaviour.js";
import SpriteRenderer from "./spriterenderer.js";
import Time from "./time.js";

class SpriteAnimator extends Behaviour {

    #currentAnimation;
    get currentAnimation() { return this.#currentAnimation; }

    get curCellX() { return Math.floor(this.#frameIndex % this.#cellCountX); }
    get curCellY() { return Math.floor(this.#frameIndex / this.#cellCountX); }

    #animations = new Map();

    #sprite = null;
    #frameIndex = 0;
    #time = 0;

    #animNextFrameTime = 0;
    #animFrameStart = 0;
    #animFameEnd = 0;
    #animFrameRate = 24;

    #cellCountX = 3;
    #cellCountY = 3;

    frameRateMultiplier = 1;

    start() {

        this.#sprite = this.entity.getComponent(SpriteRenderer);
        this.isEnabled = (this.#sprite);
    }

    update() {

        // update animation frames
        this.#time += Time.deltaTime * this.frameRateMultiplier;

        if(this.#time > this.#animNextFrameTime) {
            this.#animNextFrameTime = this.#time + (1.0 / this.#animFrameRate);
            
            this.#frameIndex++;
            if(this.#frameIndex > this.#animFameEnd) {
                this.#frameIndex = this.#animFrameStart;
            }
        }

        this.#setSpriteOffsets(this.curCellX, this.curCellY);        
    }

    addAnimation(animationName, frameStart, frameEnd, frameRate) {
        
        this.#animations.set(animationName, [frameStart, frameEnd, frameRate]);
    }

    setAnimation(animationName) {
        
        // Donn't play if animation is already set
        if(animationName === this.#currentAnimation)
            return;

        if(this.#animations.has(animationName)) {
            
            this.#currentAnimation = animationName;
            const anim = this.#animations.get(animationName);
            
            this.#frameIndex = anim[0];
            this.#animFrameStart = anim[0];
            this.#animFameEnd = anim[1];
            this.#animFrameRate = anim[2];
        }
        
        this.#animNextFrameTime = this.#time + (1.0 / this.#animFrameRate);
    }

    setCellCount(x, y) {

        this.#cellCountX = x;
        this.#cellCountY = y;
    }

    #setSpriteOffsets(fx, fy) {
    
        this.#sprite.frameX = fx;
        this.#sprite.frameY = fy;
    }

}
export default SpriteAnimator;