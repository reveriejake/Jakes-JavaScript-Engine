import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import MathEx from "../engine/mathex.js";
import Time from "../engine/time.js";

class FollowBehaviour extends BehaviourComponent {
   
    target = null;
    damping = 10;

    offsetX = 0;
    offsetY = 0;

    update() {

        if(this.target) {

            this.transform.pX = MathEx.Lerp(this.transform.pX, this.target.pX + this.offsetX, Time.deltaTime * this.damping);
            this.transform.pY = MathEx.Lerp(this.transform.pY, this.target.pY + this.offsetY, Time.deltaTime * this.damping);
        }
    }
}
export default FollowBehaviour;