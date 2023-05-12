import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import Time from "../engine/time.js";

class SinMoveBehaviour extends BehaviourComponent {

    speed = 1;
    magnitudeX = 100;
    magnitudeY = 100;

    awake() {
        
        this.initPosX = this.transform.pX;
        this.initPosY = this.transform.pY;
    }

    update() {

        this.transform.pX = this.initPosX + Math.sin(Time.time * this.speed) * this.magnitudeX;
        this.transform.pY = this.initPosY + Math.cos(Time.time * this.speed) * this.magnitudeY;
    }
}
export default SinMoveBehaviour;