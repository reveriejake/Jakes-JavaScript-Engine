import Scene from "./scene.js";

class SObject { 

    static #allObjects = [];
    
    static FindObjectOfType(type) {

        const comps = SObject.#allObjects.filter(item => item instanceof type);

        if(comps.length > 0)
            return comps[0];
        else
            return null;
    }

    static #AddObject(obj) {

        this.#allObjects.push(obj);
    }

    static #RemoveObject(obj) { 

        if(this.#allObjects.includes(obj)) {
            
            obj.destroy();
            const index = this.#allObjects.indexOf(obj);
            this.#allObjects.splice(index, 1);
        }
    }

    static RemoveAllObjects() {

        this.#allObjects.forEach(obj => {
            this.Destroy(obj);
        });
        
        console.log(this.#allObjects.length);
    }

    static Save(name) {

        var a = document.createElement('a');
        var file = new Blob([JSON.stringify(this.#allObjects)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    constructor() {

        this.dontDestroyOnLoad = false;
        this.name = "";
        SObject.#AddObject(this);
    }

    destroy() { }

    static Destroy(obj) { 

        if(obj.dontDestroyOnLoad) {
            return;
        }

        SObject.#RemoveObject(obj);
    }
}
export default SObject;