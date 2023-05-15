import Component from "./component.js";
import SObject from "./sobject.js";
import Transform from "./transform.js";

class Entity extends SObject {

    static #allComponents = [];
    
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
    }

    addComponent(type) {
                
        const comp = new type();
        comp.entity = this;

        this.#components.push(comp);
        Entity.#allComponents.push(comp);
        return comp;
    }

    getComponent(type) {

        const comps = this.#components.filter(item => item instanceof type);

        if(comps.length > 0)
            return comps[0];
        else
            return null;
    }

    getComponents(type) {

        const comps = this.#components.filter(item => item instanceof type);
        
        if(comps.length > 0)
            return comps;
        else
            return null;
    }

    destroy() {

        //console.log('destroy entity');

        super.destroy();
    }
}
export default Entity;