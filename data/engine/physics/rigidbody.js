import Component from "../component.js";
import Gizmos from "../editor/gizmos.js";
import Physics from "./physics.js";
import Time from "../time.js";
import Vector from "../vector.js";

class Rigidbody extends Component {

    #linearVelX = 0;
    #linearVelY = 0;
    #rotationVel = 0;
    
    #centerOfMassX = 0;
    #centerOfMassY = 0;

    mass = 1;
    drag = 0.01;
    density = 1;
    restitution = 0.1;
    isStatic = false;

    useGravity = true;
    vX = 0;
    vY = 0;

    constructor() {
        super();

        Physics.AddBody(this);
    }
    
    tick() {
        
        if(!this.isStatic) {
            
            this.vX += Physics.Gravity.x;
            this.vY -= Physics.Gravity.y;
        }
        
        this.vX *= 1.0 - this.drag;
        this.vY *= 1.0 - this.drag;
        
        this.transform.pX += this.vX * Time.deltaTime;
        this.transform.pY += this.vY * Time.deltaTime;
        

        const normalized = Vector.Normalize(this.vX, this.vY);
        Gizmos.DrawRay(this.transform.pX, this.transform.pY, this.vX * 0.1, this.vY * 0.1, 'red', 1, 4);
        //Gizmos.DrawRay(this.transform.pX, this.transform.pY, normalized.x * 50, normalized.y * 50, 'blue', 1, 4);
        Gizmos.DrawPoint(this.transform.pX, this.transform.pY, 10, true, 'blue');
    }

    resetCenterOfMass() {

        this.#centerOfMassX = 0;
        this.#centerOfMassY = 0;
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