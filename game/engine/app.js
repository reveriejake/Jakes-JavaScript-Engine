import Engine from "./engine.js";

class App {

    constructor(width, height) {

        this.width = width;
        this.height = height;
    }

    static Gameloop() {

        Engine.Update();
        Engine.Render();

        window.requestAnimationFrame(App.Gameloop);
    }

    run() {

        Engine.Initialize(this, this.width, this.height);
        this.loadContent();
        window.requestAnimationFrame(App.Gameloop);
    }

    loadContent() {}
}
export default App;