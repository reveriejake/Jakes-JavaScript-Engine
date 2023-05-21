import Entity from "./entity.js";
import Scene from "./scene.js";
import SObject from "./sobject.js";

class NullScene extends Scene {
    
}

class SceneManager { 

    static #sceneNames = [];
    static #scenes = [];

    static #activeScene = null;
    static #sceneLoaded = false;
    
    static #progressEnabled = false;
    static #progressText = 'loading';
    static #progressItemsTotal = 0;
    static #progressItemsCompleted = 0;

    static OnUnloadScene = new  Event("onUnloadScene");

    static IsSceneLoading() { return !this.#sceneLoaded; }

    static GetCurrentSceneName() { return this.#activeScene.name; }

    static ProgressEnabled() { return this.#progressEnabled; }
    static EnableProgressBar() { this.#progressEnabled = true; }
    static ResetLoadProgress(progressItemCount) { this.#progressItemsTotal = progressItemCount; this.#progressItemsCompleted = 0;  }
    static TickLoadProgress() { this.#progressItemsCompleted++; }
    static GetLoadProgress() { return (this.#progressItemsCompleted / this.#progressItemsTotal); }
    static SetLoadProgressText(text) { this.#progressText = text; }
    static GetLoadProgressText() { return this.#progressText; }

    static RegisterScene(name, scene) {

        const newScene = new scene(name);
        this.#sceneNames.push(name);
        this.#scenes.push(newScene);
    }

    static GetSceneIndex(name) {

        return this.#sceneNames.indexOf(name);
    }

    static async LoadSceneByIndex(index) {

        if(index === -1) {
            console.log("Failed to load scene. No scene found with name or index. Maybe forgot to add scene in main file?");
            return;
        }

        if(this.#scenes.length === 0) {

            this.RegisterScene('null', NullScene);
        }

        if(index < this.#scenes.length) {

            SceneManager.#sceneLoaded = false;
            if(this.#activeScene) {

                this.#activeScene.unload();
                this.#activeScene = null;


                
                await SObject.RemoveAllObjects();
            }

            this.#progressEnabled = false;
            this.#activeScene = this.#scenes[index];
            await this.#activeScene.load();
            SceneManager.#sceneLoaded = true;

        } else {

            console.log('WARNING: Level Out Of Index');
        }
    }

    static UpdateScene() {

        if(this.#activeScene && SceneManager.#sceneLoaded) {

            this.#activeScene.update();
        }
    }
}
export default SceneManager;