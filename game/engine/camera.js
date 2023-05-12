import Bounds from "./bounds.js";
import Component from "./components/component.js"; 
import Engine from "./engine.js";

class Camera extends Component {
    
    static ClearType = {

        NONE        : 0,
        COLOR       : 1,
        GRADIENT    : 2,
        IMAGE       : 3,
        FADER       : 4,
    }

    static #sceneCameras = [];
    static get SceneCameras() { return Camera.#sceneCameras; }
    static #activeCamera = null;
    static get ActiveCamera() { return Camera.#activeCamera; }
        
    constructor() {
        super();
        
        this.clearType = Camera.ClearType.COLOR;
        this.clearImage = null;
        this.clearColor = 'cornflowerblue';
        this.clearFadeAlpha = 0.01;
        this.gradientStops = [[0, '#cdf9ff'], [1, '#75d5e3']];
        
        this.pixelWidth = Engine.Canvas.width;
        this.pixelHeight = Engine.Canvas.height;
        
        this.viewWidth = 1;
        this.viewHeight = 1;
        this.viewOriginX = 0;
        this.viewOriginY = 0;
        
        this.bounds = new Bounds(-this.pixelWidth / 2, -this.pixelHeight / 2, this.pixelWidth, this.pixelHeight);
        this.viewBounds = new Bounds(this.bounds.xMin, this.bounds.yMin, this.bounds.width, this.bounds.height);
        
        this.name = 'Camera';

        Camera.#sceneCameras.push(this);
        this.makeActive();
    }
    
    setClearGradientStops(gradientStops) {
        
        this.gradientStops = gradientStops;
    }
    
    makeActive() {
        
        Camera.#activeCamera = this;
    }

    updateViewBounds() {

        this.viewBounds.set(this.transform.pX + this.bounds.xMin, this.transform.pY + this.bounds.yMin, this.bounds.width, this.bounds.height);
    }
    
    testAABB(bounds) {
                
        return (
            bounds.xMax > this.viewBounds.xMin &&
            bounds.yMax > this.viewBounds.yMin &&
            bounds.xMin < this.viewBounds.xMax &&
            bounds.yMin < this.viewBounds.yMax
            );
    }
}
export default Camera;