import Behaviour from "../engine/behaviour.js";
import Time from "../engine/time.js";

class RotateBehaviour extends Behaviour {

    speed = 5;
    randomDirection = true;
    randomSpeed = true;

    #direction = 1;

    start() {

        if(this.randomDirection)
            this.#direction = Math.random() > 0.5 ? -1 : 1;

        if(this.randomSpeed);
            this.speed =  1 + Math.random() * (this.speed - 1);
    }

    update() {

        this.transform.r += this.speed * this.#direction * Time.deltaTime;
    }
}
export default RotateBehaviour;