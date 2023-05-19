import Component from "./component.js";
import Gizmos from "./editor/gizmos.js";
import Physics from "./physics.js";
import Time from "./time.js";
import Vector from "./vector.js";

class Rigidbody extends Component {

    useGravity = true;
    drag = 0.01;
    vX = 0;
    vY = 0;

    constructor() {
        super();


        Physics.AddBody(this);
    }
    
    tick() {

        if(this.useGravity) {

            this.vX += Physics.Gravity.x;
            this.vY -= Physics.Gravity.y;
        }

        this.vX *= 1.0 - this.drag;
        this.vY *= 1.0 - this.drag;

        this.transform.pX += this.vX * Time.deltaTime;
        this.transform.pY += this.vY * Time.deltaTime;

        Gizmos.DrawRay(this.transform.pX, this.transform.pY, this.vX * 0.1, this.vY * 0.1, 'red', 5);
    }

    addForce(x, y) {

        this.vX += x;
        this.vY += -y;
    }

    destroy() {

        Physics.RemoveBody(this);
        super.destroy();
    }
    
}
export default Rigidbody;