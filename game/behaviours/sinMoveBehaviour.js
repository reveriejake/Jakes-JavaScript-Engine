import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import Time from "../engine/time.js";

class SinMoveBehaviour extends BehaviourComponent {

    speed = 1;
    magnitudeX = 100;
    magnitudeY = 100;

    awake() {
        
        this.initPosX = this.transform.position.x;
        this.initPosY = this.transform.position.y;
    }

    update() {

        this.transform.position.x = this.initPosX + Math.sin(Time.time * this.speed) * this.magnitudeX;
        this.transform.position.y = this.initPosY + Math.cos(Time.time * this.speed) * this.magnitudeY;
    }
}
export default SinMoveBehaviour;