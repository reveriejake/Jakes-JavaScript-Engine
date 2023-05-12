import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import Input from "../engine/input.js";
import Time from "../engine/time.js";

class SimpleMoveInputBehaviour extends BehaviourComponent {
    
    speed = 1000;

    velX = 0;
    velY = 0;

    up = 'w';
    down = 's';
    left = 'a';
    right = 'd';
    
    update() {

        if(Input.IsKey(this.up )) {

            this.velY = -this.speed;
        }
        
        if(Input.IsKey(this.left)) {
            
            this.velX = -this.speed;
        }
        
        if(Input.IsKey(this.down)) {
            
            this.velY = this.speed;
        }
        
        if(Input.IsKey(this.right)) {
            
            this.velX = this.speed;
        }

        this.velX *= 0.9;
        this.velY *= 0.9;

        this.transform.pX += this.velX * Time.deltaTime;
        this.transform.pY += this.velY * Time.deltaTime;

        if(Input.IsKey('q')) {

            this.transform.rotation += Time.deltaTime;
        }

        if(Input.IsKey('e')) {

            this.transform.rotation -= Time.deltaTime;
        }
    }
}
export default SimpleMoveInputBehaviour;