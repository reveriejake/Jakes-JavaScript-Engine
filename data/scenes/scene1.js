import Entity from "../engine/entity.js";
import Scene from "../engine/scene.js";

import RectRenderer from "../engine/rectangleRenderer.js";
import Camera from "../engine/camera.js";
import RotateBehaviour from "../behaviours/rotateBehaviour.js";
import CameraController from "../behaviours/cameraController.js";
import Input from "../engine/input.js";
import SceneManager from "../engine/scenemanager.js";
import RandomSpawner from "../behaviours/randomSpawner.js";
import Time from "../engine/time.js";
import Content from "../engine/content.js";
import SpriteRenderer from "../engine/spriterenderer.js";
import SObject from "../engine/sobject.js";
import Random from "../engine/random.js";

class Scene1 extends Scene {
    
    async load() {

        console.log('load scene 1');

        this.image1 = await Content.LoadImage('adventurer-sprite-sheet.png');
        this.image2 = await Content.LoadImage('alien-idle.png');
        this.image3 = await Content.LoadImage('amber-background.jpg');
        this.image4 = await Content.LoadImage('cloud.png');        
        this.image5 = await Content.LoadImage('crate.png');
        this.image6 = await Content.LoadImage('skeleton-sprite-sheet.png');

        const camera = new Entity('camera', Camera, CameraController).getComponent(Camera);
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Random.Enum(Camera.Gradients);

        this.square = new Entity('square', RectRenderer, RotateBehaviour, RandomSpawner).getComponent(RectRenderer);
        this.square.color = `hsl(${ Math.random() * 360 }, 50%, 50%)`;
        this.square .width = 250;
        this.square .height = 250;

        this.crate = new Entity('crate', SpriteRenderer).getComponent(SpriteRenderer);
        this.crate.setSprite(this.image5, this.image5.width, this.image5.height);
        this.crate.sortOrder = -100;
    }

    update() {

        if(Input.IsKeyDown(Input.KeyCode.R)) {

            SceneManager.LoadSceneByIndex(SceneManager.GetSceneIndex('scene2'));
        }

        if(Input.IsKeyDown(Input.KeyCode.M)) {
            SObject.Save('test.json');
        }

        const sz = 200 + Math.sin(Time.time) * 100;
        this.square.width = sz;
        this.square.height = sz;
    }
}
export default Scene1;