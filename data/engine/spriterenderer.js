import RenderableComponent from "./renderableComponent.js";

class SpriteRenderer extends RenderableComponent {

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
    }

    setSprite(image, srcWidth, srcHeight) {

        this.#image = image;
        this.bounds.set(-srcWidth / 2, -srcHeight / 2, srcWidth, srcHeight);
    }

    render(context) {
        
        if(this.#image) {
            context.globalAlpha = this.alpha;

            context.save();
            context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
            context.drawImage(
                this.#image, 
                this.frameX * this.bounds.width, 
                this.frameY * this.bounds.height, 
                this.bounds.width, 
                this.bounds.height, 
                -this.bounds.width * this.anchorX, 
                -this.bounds.height * this.anchorY, 
                this.bounds.width, 
                this.bounds.height
            );
            context.restore();

            context.globalAlpha = 1;
        }
    }

    destroy() {
        
        //console.log("destroy renderer");
        this.#image = null;
        super.destroy();
    }
}
export default SpriteRenderer;