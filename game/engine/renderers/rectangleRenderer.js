import RenderComponent from "../components/renderComponent.js";

class RectangleRenderer extends RenderComponent {

    set width(w) {  this.renderBounds.xMin = -w/2; this.renderBounds.xMax = this.renderBounds.xMin + w; }
    set height(h) { this.renderBounds.yMin = -h/2; this.renderBounds.yMax = this.renderBounds.yMin + h; }

    constructor() {
        super();

        this.color = 'white';
    }

    render(context) {

        context.fillStyle = this.color;
        context.fillRect(this.renderBounds.xMin, this.renderBounds.yMin, this.renderBounds.width, this.renderBounds.height);
    }
}
export default RectangleRenderer;