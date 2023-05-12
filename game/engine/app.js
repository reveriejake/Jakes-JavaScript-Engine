import Engine from "./engine.js";

class App {

    constructor(width, height) {

        this.width = width;
        this.height = height;
    }

    #gameloop = () => {

        Engine.Update();
        Engine.Render();

        window.requestAnimationFrame(this.#gameloop);
    }

    run() {

        Engine.Initialize(this, this.width, this.height);
        this.loadContent();
        this.#gameloop();
    }

    loadContent() {}
}
export default App;