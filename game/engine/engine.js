import BehaviourComponent from "./components/behaviourcomponent.js";
import Camera from "./camera.js";
import Input from "./input.js";
import Renderer from "./renderer.js";
import Time from "./time.js";

class Engine {

    static #canvas;
    static get Canvas() { return Engine.#canvas; }
    static #context;
    static get Context() { return Engine.#context; }
    static #app;
    static get App() { return Engine.#app; }

    static Levels = [];
    static CurrentLevel = null; 

    static Initialize(app, width, height) {

        Engine.#app = app;

        Engine.#canvas = document.getElementById('app-canvas');
        Engine.#context = Engine.#canvas.getContext('2d');

        Engine.#canvas.width = width;
        Engine.#canvas.height = height;

        Input.Init();
    }
    
    static Update() {
        
        Time.Update();
        
        BehaviourComponent.Awake();
        BehaviourComponent.Update();
        BehaviourComponent.LateUpdate();
    }

    static Render() {

        // Only render if there is an active camera
        Camera.SceneCameras.forEach(camera => {

            Renderer.Render(camera, this.Context);
        });

        this.Context.globalAlpha = 0.75;
        this.Context.fillStyle = 'white';
        this.Context.fillRect(this.Canvas.width - 160, 10, 150, 35);
        this.Context.globalAlpha = 1;

        this.Context.font = 'bold 20px Consolas';
        this.Context.fillStyle = 'black';

        this.Context.textAlign = 'left';
        this.Context.fillText('Showing off new \'Behaviour\' and \'Component\' system', 35, 35);
        this.Context.fillText('A/D moves player left and right', 35, 55);
        this.Context.fillText('Space makes player jump', 35, 75);

        this.Context.fillText(`Rendered: ${Renderer.renderedEntitiesCount}/${Renderer.renderableEntitiesCount}`, 35, 95);

        this.Context.textAlign = 'right';
        this.Context.fillText(`FPS : ${ Time.fps }`, this.Canvas.width - 35, 35);
    }

}
export default Engine;