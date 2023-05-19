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
import Rigidbody from "../engine/rididbodycomponent.js";
import FollowBehaviour from "../behaviours/followBehaviour.js";

class Scene4 extends Scene {

    async load() {

        const camera = new Entity('camera', Camera, FollowBehaviour).getComponent(Camera);
        camera.clearColor = 'pink';
        camera.clearType = Camera.ClearType.GRADIENT;
        camera.clearGradient = Camera.Gradients.Frost;

        const crateImg = await Content.LoadImage('crate.png');
        
        const crate = new Entity('crate', Rigidbody, SpriteRenderer).getComponent(SpriteRenderer);
        crate.width = 200;
        crate.height = 200;
                
        crate.setSprite(crateImg, crateImg.width, crateImg.height);
        crate.transform.sX = 0.25;
        crate.transform.sY = 0.25;
        
        this.crateBody = crate.getComponent(Rigidbody);
        //this.crateBody.useGravity = false;
        
        const follower = camera.getComponent(FollowBehaviour);
        follower.target = crate.transform;
    }

    update() {

        if(Input.IsKeyDown(Input.KeyCode.R)) {

            SceneManager.LoadSceneByIndex(SceneManager.GetSceneIndex('atlasTest'));
        }

        if(Input.IsKey(Input.KeyCode.D)) {

            this.crateBody.addForce(100.0, 0.0);
        }

        if(Input.IsKey(Input.KeyCode.A)) {

            this.crateBody.addForce(-100.0, 0.0);
        }

        if(Input.IsKey(Input.KeyCode.W)) {

            this.crateBody.addForce(0.0, 100.0);
        }

        if(Input.IsKey(Input.KeyCode.S)) {

            this.crateBody.addForce(0.0, -100.0);
        }
    }

}
export default Scene4;