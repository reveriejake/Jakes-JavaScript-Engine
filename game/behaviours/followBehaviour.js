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

            const curPos = this.transform.getPosition();
            this.transform.position.x = MathEx.Lerp(this.transform.position.x, this.target.position.x + this.offsetX, Time.deltaTime * this.damping);
            this.transform.position.y = MathEx.Lerp(this.transform.position.y, this.target.position.y + this.offsetY, Time.deltaTime * this.damping);
        }
    }
}
export default FollowBehaviour;