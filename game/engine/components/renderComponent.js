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

    constructor() {
        super();

        Renderer.AddRenderer(this);

        this.sortOrder = 0;
        this.isVisible = true;
        this.bounds = new Bounds(-5, -5, 10, 10);

        this.name = 'Renderer';
    }

    render(context) { }
    
    getAABB() {

        const rotMatrix = Matrix.CreateRotationMatrix(this.transform.rotation);

        const points = [
            Matrix.RotatePoint(this.bounds.xMin * this.transform.scale.x, this.bounds.yMin * this.transform.scale.y, rotMatrix),
            Matrix.RotatePoint(this.bounds.xMax * this.transform.scale.x, this.bounds.yMax * this.transform.scale.y, rotMatrix),
            Matrix.RotatePoint(this.bounds.xMin * this.transform.scale.x, this.bounds.yMax * this.transform.scale.y, rotMatrix),
            Matrix.RotatePoint(this.bounds.xMax * this.transform.scale.x, this.bounds.yMin * this.transform.scale.y, rotMatrix)
        ]

        const min = { x: Infinity, y: Infinity }
        const max = { x: -Infinity, y: -Infinity }
        
        for(let i = 0; i < points.length; i++) {

            min.x = Math.min(min.x, points[i].x);
            min.y = Math.min(min.y, points[i].y);
            max.x = Math.max(max.x, points[i].x);
            max.y = Math.max(max.y, points[i].y);
        }

        const bnds = new Bounds(this.transform.position.x + min.x, this.transform.position.y + min.y, max.x - min.x, max.y - min.y);

        return bnds;
    }

    destroy() {
        super.destroy();

        Renderer.RemoveRenderer(this);
    }
}
export default RenderComponent;