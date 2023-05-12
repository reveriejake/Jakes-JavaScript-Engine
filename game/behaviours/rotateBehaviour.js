import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import Time from "../engine/time.js";

class RotateBehaviour extends BehaviourComponent {
    
    speed = 1;

    awake() {

        this.transform.r = Math.random() * Math.PI * 2;
    }

    update() {

        this.transform.r += this.speed * Time.deltaTime;
    }
}
export default RotateBehaviour;