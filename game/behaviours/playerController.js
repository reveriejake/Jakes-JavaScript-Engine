import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import SpriteRenderer from "../engine/renderers/spriteRenderer.js";
import Input from "../engine/input.js";
import Time from "../engine/time.js";

class PlayerController extends BehaviourComponent {

    speed = 500;

    velX = 0;
    velY = 0;

    left = 'a';
    right = 'd';
    jump = ' ';

    isGrounded = true;

    awake() {

        this.sprite = this.entity.getComponent(SpriteRenderer);
        this.initScale = this.transform.sX;
    }

    update() {

        if(Input.IsKey(this.left)) {
            
            this.velX = -this.speed;
            this.sprite.flipX = true;
        }
        
        if(Input.IsKey(this.right)) {
            
            this.velX = this.speed;
            this.sprite.flipX = false;
        }

        if(Input.IsKey(this.jump) && this.isGrounded) {

            this.velY = -1000;
        }

        this.velX *= 0.9;
        this.velY += 10;

        this.transform.pX += this.velX * Time.deltaTime;
        this.transform.pY += this.velY * Time.deltaTime;

        if(this.transform.pY > 100) {

            this.transform.pY = 100;
            this.velY = 0;
            this.isGrounded = true;

        } else {
            
            this.isGrounded = false;
            this.velY += 10;
        }
    }
}
export default PlayerController;