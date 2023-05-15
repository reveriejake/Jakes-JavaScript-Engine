import RenderableComponent from "./renderableComponent.js";

class RectRenderer extends RenderableComponent {

    set width(w) {  this.bounds.xMin = -w/2; this.bounds.xMax = this.bounds.xMin + w; }
    set height(h) { this.bounds.yMin = -h/2; this.bounds.yMax = this.bounds.yMin + h; }

    constructor() {
        super();

        this.color = 'white';
    }

    render(context) {

        context.fillStyle = this.color;
        context.fillRect(this.bounds.xMin, this.bounds.yMin, this.bounds.width, this.bounds.height);
    }
}
export default RectRenderer;