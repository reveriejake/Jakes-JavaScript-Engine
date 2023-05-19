import Behaviour from "../engine/behaviour.js";
import PMath from "../engine/pmath.js";
import Time from "../engine/time.js";

class FollowBehaviour extends Behaviour {

    target;

    start() {

    }

    update() {

        if(this.target) {

            this.transform.pX = PMath.Lerp(this.transform.pX, this.target.transform.pX, 5 * Time.deltaTime);
            this.transform.pY = PMath.Lerp(this.transform.pY, this.target.transform.pY, 5 * Time.deltaTime);
        }
    }
}
export default FollowBehaviour;