import SObject from "../sobject.js";

class Component extends SObject { 
    
    get transform() { return this.entity.transform; }

    constructor() {
        super();
        
        this.isEnabled = true;
        this.entity = null;
    }

    addComponent(type) {

        return this.entity.addComponent(type);
    }

    removeComponent(type) { 

        this.entity.removeComponent(type);
    }

    getComponent(type) {

        return this.entity.getComponent(type);
    }

    getComponents(type) { 
        
        return this.entity.getComponents(type);
    }
}
export default Component;