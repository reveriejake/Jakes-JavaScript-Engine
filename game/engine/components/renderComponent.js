import Component from "./component.js";
import Bounds from "../bounds.js";
import Renderer from "../renderer.js";
import Matrix from "../matrix.js";

class RenderComponent extends Component {

    #sortOrder = 0;
    get sortOrder() { return this.#sortOrder; }
    set sortOrder(order) { this.#sortOrder = order; Renderer.SortRenderers(); }

    #isVisible = true;
    get isVisible() { return this.#isVisible; }
    set isVisible(v) { this.#isVisible = v; }

    #renderBounds;
    get renderBounds() { return this.#renderBounds; }

    constructor() {
        super();

        this.#sortOrder = 0;
        this.#isVisible = true;        
        this.#renderBounds = new Bounds(-5, -5, 10, 10);

        Renderer.AddRenderer(this);
        Renderer.SortRenderers();
    }

    render(context) { }
    
    getAABB() {

        const points = [
            this.transform.localToWorldMatrix.multiplyPoint(this.#renderBounds.xMin, this.#renderBounds.yMin),
            this.transform.localToWorldMatrix.multiplyPoint(this.#renderBounds.xMax, this.#renderBounds.yMax),
            this.transform.localToWorldMatrix.multiplyPoint(this.#renderBounds.xMin, this.#renderBounds.yMax),
            this.transform.localToWorldMatrix.multiplyPoint(this.#renderBounds.xMax, this.#renderBounds.yMin),
        ]

        const min = { x: Infinity, y: Infinity }
        const max = { x: -Infinity, y: -Infinity }
        
        for(let i = 0; i < points.length; i++) {

            min.x = Math.min(min.x, points[i].x);
            min.y = Math.min(min.y, points[i].y);
            max.x = Math.max(max.x, points[i].x);
            max.y = Math.max(max.y, points[i].y);
        }

        return new Bounds(this.transform.pX + min.x, this.transform.pY + min.y, max.x - min.x, max.y - min.y);
    }

    destroy() {
        super.destroy();

        Renderer.RemoveRenderer(this);
    }
}
export default RenderComponent;