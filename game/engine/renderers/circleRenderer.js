import RenderComponent from "../components/renderComponent.js";

class CircleRenderer extends RenderComponent {

    #radius = 50;
    set radius(r) {  this.#radius = r; this.bounds.set(-r, -r, r*2, r*2) }

    constructor(entity) {
        super(entity);

        this.color = 'white';
        this.bounds.set(-this.#radius, -this.#radius, this.#radius * 2, this.#radius * 2);
    }

    render(context) {

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.#radius, 0, 360);
        context.fill();
    }
}
export default CircleRenderer;