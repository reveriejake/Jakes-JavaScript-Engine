import Bounds from "./bounds.js";
import Component from "./component.js";
import Graphics from "./graphics.js";

class RenderableComponent extends Component {

    #sortOrder = 0;
    get sortOrder() { return this.#sortOrder; }
    set sortOrder(value) { this.#sortOrder = value; Graphics.SortRenderables(); };
    
    #isVisible = true;
    get isVisible() { return this.#isVisible; }
    set isVisible(v) { this.#isVisible = v; }

    #bounds = new Bounds(-5, -5, 10, 10);
    get bounds() { return this.#bounds; }

    constructor() {
        super();

        Graphics.AddRenderable(this);
        Graphics.SortRenderables();
    }

    render(context) { }

    getAABB() {

        const points = [
            this.transform.localToWorldMatrix.multiplyPoint(this.#bounds.xMin, this.#bounds.yMin),
            this.transform.localToWorldMatrix.multiplyPoint(this.#bounds.xMax, this.#bounds.yMax),
            this.transform.localToWorldMatrix.multiplyPoint(this.#bounds.xMin, this.#bounds.yMax),
            this.transform.localToWorldMatrix.multiplyPoint(this.#bounds.xMax, this.#bounds.yMin),
        ]

        const min = { x: Infinity, y: Infinity }
        const max = { x: -Infinity, y: -Infinity }
        
        for(let i = 0; i < points.length; i++) {

            min.x = Math.min(min.x, points[i].x);
            min.y = Math.min(min.y, points[i].y);
            max.x = Math.max(max.x, points[i].x);
            max.y = Math.max(max.y, points[i].y);
        }

        return new Bounds(min.x, min.y, max.x - min.x, max.y - min.y);
    }

    destroy() {

        Graphics.RemoveRenderable(this);
        super.destroy();
    }
}
export default RenderableComponent;