import Behaviour from "./components/behaviourcomponent.js";
import SceneObject from "./sceneobject.js";
import Transform from "./transform.js";

class Entity extends SceneObject { 
    
    #components = [];

    #transform;
    get transform() { return this.#transform; }

    constructor(...components) {
        super();

        this.#transform = this.addComponent(Transform);
        if(components) {

            for (let i = 0; i < components.length; i++) {
                this.addComponent(components[i]);
            }
        }
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

    getAllComponents(type) {

        let comps = this.#components.filter(item => item instanceof type);
        
        if(comps.length > 0)
            return comps;
        else
            return null;
    }
}
export default Entity;