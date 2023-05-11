import SceneObject from "../sceneobject.js";

class Component extends SceneObject { 
    
    constructor() {
        super();
        
        this.transform = null;
        this.entity = null;
    }

}
export default Component;