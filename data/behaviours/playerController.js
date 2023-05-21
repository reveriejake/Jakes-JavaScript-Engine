import Behaviour from "../engine/behaviour.js";
import Gizmos from "../engine/editor/gizmos.js";
import Input from "../engine/input.js";
import SpriteAnimator from "../engine/spriteanimator.js";
import SpriteRenderer from "../engine/spriterenderer.js";
import Time from "../engine/time.js";

class PlayerController extends Behaviour {

    speed = 80;
    vx = 0;

    start() {

        this.sprite = this.getComponent(SpriteRenderer);
        this.anim = this.getComponent(SpriteAnimator);
    }

    update() {

        if(Input.IsKey(Input.KeyCode.D)) {

            this.vx = this.speed;
            this.anim.setAnimation('run');
            this.sprite.flipX = false;
        } else if(Input.IsKey(Input.KeyCode.A)) {

            this.vx = -this.speed;
            this.anim.setAnimation('run');
            this.sprite.flipX = true;
        }
        
        // console.log(this.anim.frameRateMultiplier);
        
        if(Math.abs(this.vx / this.speed) <= 0.05) {
            
            this.vx = 0;
            this.anim.setAnimation('idle');
            this.anim.frameRateMultiplier = 1;
        } else {
            
            this.anim.frameRateMultiplier = Math.max(0.01, (Math.abs(this.vx) / this.speed));
        }

        this.vx *= 0.95;
        this.transform.pX += this.vx * Time.deltaTime;

        // Gizmos.DrawText(this.transform.pX, this.transform.pY - 150, this.anim.currentAnimation, '20px Consolas', 'left');
        // Gizmos.DrawText(this.transform.pX, this.transform.pY - 180, this.anim.frameRateMultiplier, '20px Consolas', 'left');
        // Gizmos.DrawText(this.transform.pX, this.transform.pY - 210, `${this.anim.curCellX},${this.anim.curCellY}`, '20px Consolas', 'left');
    }

}
export default PlayerController;