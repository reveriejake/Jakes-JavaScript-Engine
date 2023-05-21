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
import Content from "../engine/content.js";
import SpriteRenderer from "../engine/spriterenderer.js";
import SObject from "../engine/sobject.js";

class WebURLImageScene extends Scene {

    async load() {

        console.log('load WebURLImageScene');

        const camera = new Entity('camera', Camera, CameraController).getComponent(Camera);
        camera.clearColor = 'pink';
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Random.Enum(Camera.Gradients);

        const items = 10;
        SceneManager.EnableProgressBar();
        SceneManager.ResetLoadProgress(items);
        for (let i = 0; i < items; i++) {
            
            const url = `https://picsum.photos/${Math.floor(Random.Range(128,1024))}/${Math.floor(Random.Range(128,1024))}`;
            SceneManager.SetLoadProgressText(`loading: ${url}`);
            const skellyImg = await Content.LoadWebImage(url); // await Content.LoadImage('skeleton-sprite-sheet.png');
            let skelly = new Entity('skelly', SpriteRenderer, RotateBehaviour).getComponent(SpriteRenderer);
            skelly.setSprite(skellyImg, skellyImg.width, skellyImg.height);
            
            skelly.transform.pX = Random.Range(-1000, 1000);
            skelly.transform.pY = Random.Range(-500, 500);

            skelly.transform.sX = skelly.transform.sY = Random.Range(1,2);
            SceneManager.TickLoadProgress();            
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
export default WebURLImageScene;