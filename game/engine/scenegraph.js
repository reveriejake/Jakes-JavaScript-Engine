import SObject from "./sobject.js";

class SceneGraph { 

    static #SceneObjects = [];

    static AddEntity(obj) {

        this.#SceneObjects.push(obj);
    }

    static RemoveEntity(obj) { 

        if(this.#SceneObjects.includes(obj)) {
        
            const index = this.#SceneObjects.indexOf(obj);
            this.#SceneObjects.splice(index, 1);
        }
    }

    static ExportScene(fileName) {

        const json = JSON.stringify(this.#SceneObjects);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        link.click();
    }
}
export default SceneGraph;