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
import SpriteAnimator from "../engine/spriteanimator.js";

class AtlasTest extends Scene {
    
    async load() {

        console.log('load scene 1');

        this.playerSprite = await Content.LoadImage('Atlas0.png');
        this.foliageSprite = await Content.LoadImage('foliage-sample1.png');

        this.mainCamera = new Entity('Camera', Camera, CameraController).getComponent(Camera);
        this.mainCamera.clearType = Camera.ClearType.GRADIENT;
        this.mainCamera.clearGradient = Camera.Gradients.DeepSpace;

        this.mainSprite = new Entity('Player', SpriteRenderer).getComponent(SpriteRenderer);
        this.mainSprite.setSprite(this.playerSprite, this.playerSprite.width / 3, this.playerSprite.height / 3);

        this.playerAnimator = this.mainSprite.addComponent(SpriteAnimator);
        this.playerAnimator.spriteCellsX = 3;
        this.playerAnimator.spriteCellsY = 3;
        this.playerAnimator.addAnimation('run', 0, 7, 12);
        this.playerAnimator.setAnimation('run');

        // this.plants = [];
        
        // this.plants.push(new Entity('plant01', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant02', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant03', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant04', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant05', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant06', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant07', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant08', SpriteRenderer).getComponent(SpriteRenderer));        
        // this.plants.push(new Entity('plant09', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant10', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant11', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant12', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant13', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant14', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant15', SpriteRenderer).getComponent(SpriteRenderer));
        // this.plants.push(new Entity('plant16', SpriteRenderer).getComponent(SpriteRenderer));
        
        // this.plants[1].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[0].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[2].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[3].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[4].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[5].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[6].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[7].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[8].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[9].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[10].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[11].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[12].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[13].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[14].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);
        // this.plants[15].setSprite(this.foliageSprite, this.foliageSprite.width / 8, this.foliageSprite.height / 8);

        // this.plants[1].frameX = 0;
        // this.plants[0].frameX = 1;
        // this.plants[2].frameX = 2;
        // this.plants[3].frameX = 3;
        // this.plants[4].frameX = 4;
        // this.plants[5].frameX = 5;
        // this.plants[6].frameX = 6;
        // this.plants[7].frameX = 7;
        // this.plants[8].frameX = 0;
        // this.plants[9].frameX = 1;
        // this.plants[10].frameX = 2;
        // this.plants[11].frameX = 3;
        // this.plants[12].frameX = 4;
        // this.plants[13].frameX = 5;
        // this.plants[14].frameX = 6;
        // this.plants[15].frameX = 7;

        // this.plants[1].frameY = 0;
        // this.plants[0].frameY = 0;
        // this.plants[2].frameY = 0;
        // this.plants[3].frameY = 0;
        // this.plants[4].frameY = 0;
        // this.plants[5].frameY = 0;
        // this.plants[6].frameY = 0;
        // this.plants[7].frameY = 0;
        // this.plants[8].frameY = 1;
        // this.plants[9].frameY = 1;
        // this.plants[10].frameY = 1;
        // this.plants[11].frameY = 1;
        // this.plants[12].frameY = 1;
        // this.plants[13].frameY = 1;
        // this.plants[14].frameY = 1;
        // this.plants[15].frameY = 1;

        // this.plants.forEach(plant => {
        //     plant.transform.pX = Random.Range(-600, 600);
        //     plant.transform.pY = Random.Range(-200, 200);
        // });
    }

    update() {

        if(Input.IsKeyDown(Input.KeyCode.R)) {

            SceneManager.LoadSceneByIndex(SceneManager.GetSceneIndex('scene1'));
        }

        this.mainSprite.transform.pX = 250 + Math.sin(Time.time) * 250;
    }
}
export default AtlasTest;