import SObject from "./sobject.js";

class Component extends SObject { 

    static ComponentCount = 0;

    get transform() { return this.entity.transform; }

    constructor() {
        super();
        
        this.isEnabled = true;
        this.entity = null;

        Component.ComponentCount++;
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

    destroy() {

        Component.ComponentCount--;

        //console.log('destory component');
        super.destroy();
    }
}
export default Component;