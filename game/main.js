import App from "./engine/app.js";
import Entity from "./engine/entity.js";

// Test Behaviours
import CameraTestBehaviour from "./behaviours/cameraTestBehaviour.js";
import SinMoveBehaviour from "./behaviours/sinMoveBehaviour.js";
import RotateBehaviour from "./behaviours/rotateBehaviour.js";

// Test Renderers
import CircleRenderer from "./renderers/circleRenderer.js";
import RectangleRenderer from "./renderers/rectangleRenderer.js";
import SpriteRenderer from "./renderers/spriteRenderer.js";
import SimpleMoveInputBehaviour from "./behaviours/simpleMoveInputBehaviour.js";
import FollowBehaviour from "./behaviours/followBehaviour.js";
import PlayerController from "./behaviours/playerController.js";

import Camera from './engine/camera.js';
import { CameraClearType } from "./engine/camera.js";
import Gradients from "./engine/gradients.js";

class Game extends App {

    constructor(width, height) {
        super(width, height);

        let cameraA = new Entity(Camera, SimpleMoveInputBehaviour);
        let cameraComponent = cameraA.getComponent(Camera);
        cameraComponent.clearColor = 'purple';
        cameraComponent.clearType = CameraClearType.GRADIENT;
        cameraComponent.setClearGradientStops(Gradients.Evening);

        // let playerSprite = new Image();
        // playerSprite.src = 'game/content/red__0000_idle_1.png';
        // playerSprite.onload = () => {

        //     let player = new Entity();
        //     player.transform.scale.x = 0.5;
        //     player.transform.scale.y = 0.5;

        //     let playerSpriteRenderer = new SpriteRenderer(playerSprite, playerSprite.width, playerSprite.height);
        //     playerSpriteRenderer.flipX = true;
        //     playerSpriteRenderer.sortOrder = 100;
        //     player.addComponent(playerSpriteRenderer);
        //     player.addComponent(new PlayerController(500, 'a', 'd', ' '));
            
        //     let followBehaviour = new FollowBehaviour(player.transform);
        //     followBehaviour.offsetY = -300;
        //     cameraA.addComponent(followBehaviour);
        // };
        
        // let cloudImg = new Image();
        // cloudImg.src = 'game/content/testcloud.png';
        // cloudImg.onload = () => {

        //     for (let i = 0; i < 50; i++) {

        //         let cloud = new Entity();
        //         cloud.transform.position.x = -this.width * 2 + Math.random() * this.width * 3;
        //         cloud.transform.position.y = -(this.height / 2) - 100 + Math.random() * 300;
                
        //         cloud.addComponent(new SpriteRenderer(cloudImg, cloudImg.width, cloudImg.height));
        //     }
        // };

        // Camera B ================================================================
        // const cameraB = new Entity();

        // let camCompB = new Camera();        
        // camCompB.viewOriginX = 0.501;
        // camCompB.viewWidth = 0.499;
        // cameraB.addComponent(camCompB);

        // cameraB.addComponent(new CameraTestBehaviour());
        // cameraB.addComponent(new SimpleMoveInputBehaviour(1000, 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'));
        

        //Many Skellys =============================================================
        let image = new Image();
        image.src = 'game/content/BODY_skeleton.png';

        image.onload = ()=> {
            
            let min = -2500;
            let max = 2500;

            for (let i = 0; i < 5000; i++) {
                let sprite = new Entity(CircleRenderer, SinMoveBehaviour);

                sprite.transform.position.x = min + Math.random() * (max - min);
                sprite.transform.position.y = min + Math.random() * (max - min);
                
                sprite.transform.scale.x = 1;
                sprite.transform.scale.y = 1;

                let circleRenderer = sprite.getComponent(CircleRenderer);
                circleRenderer.radius = 5 + Math.random() * 10;
                circleRenderer.color = `hsl(${ Math.random() * 360 }, 75%, 50%)`;

                let spriteSin = sprite.getComponent(SinMoveBehaviour);
                spriteSin.speed = Math.random() * 2;
                spriteSin.magnitudeX = 150;
                spriteSin.magnitudeY = 150;
            }
        };

        // let rect = new Entity(RotateBehaviour, RectangleRenderer);
        // rect.transform.position.x = 500;

        // let rectRenderer = rect.getComponent(RectangleRenderer);
        // rectRenderer.sortOrder = -100;
        // rectRenderer.width = 300;

        // let rectRenderer = new RectangleRenderer(200, 200);
        // let rectRotator = new RotateBehaviour(1);
        //rect.addComponent(RectangleRenderer);
        //rect.addComponent([RotateBehaviour, RectangleRenderer]);
    }
}

const game = new Game(1920, 1080);
game.run();