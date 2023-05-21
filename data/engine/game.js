import Graphics from "./graphics.js";
import Time from "./time.js";
import SceneManager from "./scenemanager.js";
import Behaviour from "./behaviour.js";
import Input from "./input.js";
import Physics from "./physics/physics.js";

class Game {

    constructor(name, width, height) {

        const titleElement = document.getElementsByTagName('title');
        titleElement[0].innerText = name;

        Input.Initialize();
        Graphics.Initialize(width, height);

    }

    #nextUpdate = 0;
    
    #gameloop = (time) => {
        
        Graphics.RenderScene();
        
        Time.Update();
        
        SceneManager.UpdateScene();
        
        Behaviour.Start();
        Behaviour.Update();

        // ToDo: Remove Context Reference here, build Immediate GUI class
        Behaviour.OnUI(Graphics.Context);
        
        Physics.Tick();
        Behaviour.FixedUpdate();
        
        Input.Update();
        
        window.requestAnimationFrame(this.#gameloop);
    }
    
    run() {
        
        SceneManager.LoadSceneByIndex(0);
        
        //setInterval(() => { Physics.Tick(); Behaviour.FixedUpdate(); }, 1000/60.0);
        //window.setInterval(() => { Graphics.RenderScene(); }, 1000/60.0);
        this.#gameloop();

        //window.setInterval(() => { this.#gameloop(); Graphics.RenderScene(); }, 1000.0/200.0);
    }

    registerScene(name, scene) {

        SceneManager.RegisterScene(name, scene);
    }

    loadScene(name) {
        
        SceneManager.LoadScene(name);
    }
}
export default Game;