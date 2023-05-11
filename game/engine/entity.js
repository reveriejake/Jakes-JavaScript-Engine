import SObject from "./sobject.js";
import Transform from "./transform.js";
import SceneGraph from "./scenegraph.js";

class Entity extends SObject { 
    
    #components = [];

    #transform;
    get transform() { return this.#transform; }

    constructor(name, ...components) {
        super();

        this.name = name;
        this.#transform = this.addComponent(Transform);

        if(components) {

            for (let i = 0; i < components.length; i++) {
                this.addComponent(components[i]);
            }
        }
        
        SceneGraph.AddEntity(this);
    }

    destroy() {
        super.destroy();
        
        SceneGraph.RemoveEntity(this);
    }

    addComponent(type) {
                
        let comp = new type();        
        comp.transform = this.#transform;
        comp.entity = this;

        this.#components.push(comp);
        return comp;
    }

    getComponent(type) {

        let comps = this.#components.filter(item => item instanceof type);

        if(comps.length > 0)
            return comps[0];
        else
            return null;
    }

    getComponents(type) {

        let comps = this.#components.filter(item => item instanceof type);
        
        if(comps.length > 0)
            return comps;
        else
            return null;
    }
}
export default Entity;