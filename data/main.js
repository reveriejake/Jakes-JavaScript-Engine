import Game from "./engine/game.js";
import Scene1 from "./scenes/scene1.js";
import Scene2 from "./scenes/scene2.js";
import Scene3 from "./scenes/scene3.js";

window.onload = () => {

    const game = new Game('Nabu - 2D Game Project', 1920, 1080);

    game.registerScene('scene1', Scene1);
    game.registerScene('scene2', Scene2);
    game.registerScene('scene3', Scene3);
    
    game.run();
};