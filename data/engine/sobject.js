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

    static AddObject(obj) {

        this.#allObjects.push(obj);
    }

    static RemoveObject(obj) { 

        if(this.#allObjects.includes(obj)) {
            
            obj.destroy();
            const index = this.#allObjects.indexOf(obj);
            this.#allObjects.splice(index, 1);
        }
    }

    static async RemoveAllObjects() {

        return new Promise((resolve, reject) => {

            this.#allObjects.forEach(obj => {

                obj.destroy();
            });

            this.#allObjects = [];

            resolve();
        });
    }

    static Save(name) {
        var a = document.createElement('a');
        var file = new Blob([JSON.stringify(this.#allObjects)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    constructor() {

        this.name = "";
        SObject.AddObject(this);
    }

    destroy() {

        //console.log('destroy sobject');
    }

    static Destroy(obj) { 

        SObject.RemoveObject(obj);
    }
}
export default SObject;