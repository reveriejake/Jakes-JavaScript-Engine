import Component from "./components/component.js"; 
import Bounds from "./bounds.js";
import Engine from "./engine.js";

export const CameraClearType = {

    NONE        : 0,
    COLOR       : 1,
    GRADIENT    : 2,
    IMAGE       : 3
}

class Camera extends Component {
    
    static #sceneCameras = [];
    static get SceneCameras() { return Camera.#sceneCameras; }
    static #activeCamera = null;
    static get ActiveCamera() { return Camera.#activeCamera; }
        
    constructor() {
        super();
        
        this.clearType = CameraClearType.COLOR;
        this.clearImage = null;
        this.clearColor = 'cornflowerblue';
        this.gradientStops = [[0, '#cdf9ff'], [1, '#75d5e3']];
        
        this.pixelWidth = 1920;
        this.pixelHeight = 1080;
        
        this.viewWidth = 1;
        this.viewHeight = 1;
        this.viewOriginX = 0;
        this.viewOriginY = 0;
        
        this.bounds = new Bounds(-this.pixelWidth / 2, -this.pixelHeight / 2, this.pixelWidth, this.pixelHeight);
        this.viewBounds = new Bounds(this.bounds.xMin, this.bounds.yMin, this.bounds.width, this.bounds.height);
        
        Camera.#sceneCameras.push(this);
        this.makeActive();
    }
    
    setClearGradientStops(gradientStops) {
        
        this.gradientStops = gradientStops;
    }
    
    makeActive() {
        
        Camera.#activeCamera = this;
    }
    
    testAABB(bounds) {
        
        this.viewBounds.set(this.transform.position.x + this.bounds.xMin, this.transform.position.y + this.bounds.yMin, this.bounds.width, this.bounds.height);
        
        return (
            bounds.xMax > this.viewBounds.xMin &&
            bounds.yMax > this.viewBounds.yMin &&
            bounds.xMin < this.viewBounds.xMax &&
            bounds.yMin < this.viewBounds.yMax
            );
    }
}
export default Camera;