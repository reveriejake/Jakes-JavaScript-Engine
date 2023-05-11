import Bounds from "../engine/bounds.js";
import RenderComponent from "../engine/components/renderComponent.js";

class SpriteRenderer extends RenderComponent {

    #image = null;

    constructor(entity) {
        super(entity);

        this.#image = null;        
        this.alpha = 1;

        this.flipX = false;
        
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        
        this.bounds.set(0, 0, 100, 100);
    }

    setSprite(image, srcWidth, srcHeight) {

        this.#image = image;
        this.bounds.set(-srcWidth / 2, -srcHeight / 2, srcWidth, srcHeight);
    }

    render(context) {
        
        if(this.#image) {
            context.globalAlpha = this.alpha;

            context.save();
            context.scale(this.flipX ? -1 : 1, 1);
            context.drawImage(this.#image, 0, 0, this.bounds.width, this.bounds.height, -this.bounds.width * this.anchorX, -this.bounds.height * this.anchorY, this.bounds.width, this.bounds.height);
            context.restore();

            context.globalAlpha = 1;
        }
    }
}
export default SpriteRenderer;