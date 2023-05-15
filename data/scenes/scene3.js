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
import Content from "../engine/content.js";
import SpriteRenderer from "../engine/spriterenderer.js";
import SObject from "../engine/sobject.js";

class Scene3 extends Scene {

    async load() {

        console.log('load scene 3');

        const camera = new Entity('camera', Camera, CameraController).getComponent(Camera);
        camera.clearColor = 'pink';
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Random.Enum(Camera.Gradients);

        const skellyImg = await Content.LoadImage('skeleton-sprite-sheet.png');

        for (let i = 0; i < 5000; i++) {
            
            let skelly = new Entity('skelly', SpriteRenderer, RotateBehaviour).getComponent(SpriteRenderer);
            skelly.setSprite(skellyImg, 64, 64);
            
            skelly.transform.pX = Random.Range(-2500, 2500);
            skelly.transform.pY = Random.Range(-2500, 2500);

            skelly.transform.sX = skelly.transform.sY = Random.Range(1,2);
            
        }

    }

    update() {

        if(Input.IsKeyDown(Input.KeyCode.R)) {

            SceneManager.LoadSceneByIndex(SceneManager.GetSceneIndex('scene1'));
        }
        
        if(Input.IsKeyDown(Input.KeyCode.M)) {
            SObject.Save('test.json');
        }
    }

}
export default Scene3;