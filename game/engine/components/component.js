import SObject from "../sobject.js";

class Component extends SObject { 
    
    constructor() {
        super();
        
        this.isEnabled = true;
        this.transform = null;
        this.entity = null;
    }

    getComponent(type) {

        return this.entity.getComponent(type);
    }

    getComponents(type) { 
        
        return this.entity.getComponents(type);
    }
}
export default Component;