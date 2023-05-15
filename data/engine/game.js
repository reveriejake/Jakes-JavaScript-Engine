import Graphics from "./graphics.js";
import Time from "./time.js";
import SceneManager from "./scenemanager.js";
import Behaviour from "./behaviour.js";
import Input from "./input.js";

class Game {

    constructor(name, width, height) {

        const titleElement = document.getElementsByTagName('title');
        titleElement[0].innerText = name;

        Input.Initialize();
        Graphics.Initialize(width, height);
    }

    #gameloop = () => {

        Time.Update();

        SceneManager.UpdateScene();

        Behaviour.Start();
        Behaviour.Update();
        // update
        // draw
        Graphics.RenderScene();
        Input.Update();

        window.requestAnimationFrame(this.#gameloop);
    }

    run() {

        SceneManager.LoadSceneByIndex(0);
        this.#gameloop();
    }

    registerScene(name, scene) {

        SceneManager.RegisterScene(name, scene);
    }

    loadScene(name) {
        
        SceneManager.LoadScene(name);
    }
}
export default Game;