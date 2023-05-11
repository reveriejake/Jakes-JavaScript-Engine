import Component from "./component.js";
import Bounds from "../bounds.js";
import RenderGraph from "../rendergraph.js";

class RenderComponent extends Component {

    #sortOrder = 0;
    get sortOrder() { return this.#sortOrder; }
    set sortOrder(order) { this.#sortOrder = order; }

    #isVisible = true;
    get isVisible() { return this.#isVisible; }
    set isVisible(v) { this.#isVisible = v; }

    constructor(entity) {
        super(entity);

        this.sortOrder = 0;
        this.isVisible = true;
        this.bounds = new Bounds(-5, -5, 10, 10);

        RenderGraph.AddRenderer(this);
    }

    render(context) { }
        
    getAABB() { 

        let b = new Bounds(this.transform.position.x + this.bounds.xMin, this.transform.position.y + this.bounds.yMin, this.bounds.width, this.bounds.height);
        return b;
    }

    destroy() {
        super.destroy();

        RenderGraph.RemoveRenderer(this);
    }
}
export default RenderComponent;