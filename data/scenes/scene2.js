import Scene from "../engine/scene.js";

import Entity from "../engine/entity.js";
import RectRenderer from "../engine/rectangleRenderer.js";
import Camera from "../engine/camera.js";
import RotateBehaviour from "../behaviours/rotateBehaviour.js";
import CameraController from "../behaviours/cameraController.js";
import Input from "../engine/input.js";
import SceneManager from "../engine/scenemanager.js";
import RandomSpawner from "../behaviours/randomSpawner.js";
import Random from "../engine/random.js";
import Utilities from "../engine/Utilities.js";

class Scene2 extends Scene {

    load() {

        console.log('load scene 2');

        const camera = new Entity('camera', Camera, CameraController).getComponent(Camera);
        camera.clearColor = 'pink';
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Random.Enum(Camera.Gradients);

        const square = new Entity('square', RectRenderer, RotateBehaviour, RandomSpawner).getComponent(RectRenderer);
        square.width = 250;
        square.height = 250;
        square.color = 'purple';
    }

    update() {

        if(Input.IsKeyDown(Input.KeyCode.R)) {

            SceneManager.LoadSceneByIndex(SceneManager.GetSceneIndex('scene3'));
        }
    }

}
export default Scene2;