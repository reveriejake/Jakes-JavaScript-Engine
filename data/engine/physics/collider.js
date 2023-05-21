import Component from "../component.js";
import Physics from "./physics.js";
import Rigidbody from "./rigidbody.js";

class Collider extends Component {

    #attachedBody = null;
    set attachedBody(b) { this.#attachedBody = b; }
    get attachedBody() { return this.#attachedBody; }

    #bounds = new Bounds(-5, -5, 10, 10);
    get bounds() { return this.#bounds; }

    constructor() {
        super();

        this.#attachedBody = this.getComponent(Rigidbody);
        if(!this.#attachedBody) {
            this.#attachedBody = this.addComponent(Rigidbody);
        }

        Physics.AddCollider(this);
    }

    destroy() {

        Physics.RemoveCollider(this);
        super.destroy();
    }
}
export default Collider;