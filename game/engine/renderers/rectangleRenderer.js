import RenderComponent from "../components/renderComponent.js";

class RectangleRenderer extends RenderComponent {

    #width = 100;
    #height = 100;

    set width(w) {  this.#width = w; this.bounds.xMin = -w/2; this.bounds.xMax = this.bounds.xMin + w; }
    set height(h) { this.#height = h; this.bounds.yMin = -h/2; this.bounds.yMax = this.bounds.yMin + h; }

    constructor() {
        super();

        this.color = 'white';
        this.bounds.set(-this.#width / 2, -this.#height / 2, this.#width, this.#height);
    }

    render(context) {

        context.fillStyle = this.color;
        context.fillRect(this.bounds.xMin, this.bounds.yMin, this.bounds.width, this.bounds.height);
    }
}
export default RectangleRenderer;