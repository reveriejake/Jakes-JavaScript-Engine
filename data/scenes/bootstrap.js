import TextBehaviour from "../behaviours/textBehaviour.js";
import Camera from "../engine/camera.js";
import Entity from "../engine/entity.js";
import Scene from "../engine/scene.js";
import SceneManager from "../engine/scenemanager.js";

class Bootstrap extends Scene {

    async load() {

        const camera = new Entity('camera', Camera).getComponent(Camera);
        camera.clearColor = 'pink';
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Camera.Gradients.Frost;

        const foreverEntity = new Entity('forever', TextBehaviour);
        foreverEntity.dontDestroyOnLoad = true;
    }

    update() {
        
        SceneManager.LoadSceneByIndex(1);
    }
}
export default Bootstrap;