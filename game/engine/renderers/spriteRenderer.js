import RenderComponent from "../components/renderComponent.js";

class SpriteRenderer extends RenderComponent {

    #image = null;

    constructor() {
        super();

        this.#image = null;        
        this.alpha = 1;

        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.frameX = 0;
        this.frameY = 0;

        this.flipX = false;
        this.flipY = false;
        
        this.renderBounds.set(-50, -50, 100, 100);
    }

    setSprite(image, srcWidth, srcHeight) {

        this.#image = image;
        this.renderBounds.set(-srcWidth / 2, -srcHeight / 2, srcWidth, srcHeight);
    }

    render(context) {
        
        if(this.#image) {
            context.globalAlpha = this.alpha;

            context.save();
            context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
            context.drawImage(
                this.#image, 
                this.frameX * this.renderBounds.width, 
                this.frameY * this.renderBounds.height, 
                this.renderBounds.width, 
                this.renderBounds.height, 
                -this.renderBounds.width * this.anchorX, 
                -this.renderBounds.height * this.anchorY, 
                this.renderBounds.width, 
                this.renderBounds.height
            );
            context.restore();

            context.globalAlpha = 1;
        }
    }
}
export default SpriteRenderer;