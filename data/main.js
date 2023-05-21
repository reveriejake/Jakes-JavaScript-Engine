import EditorSettings from "./engine/editor/editorsettings.js";
import Game from "./engine/game.js";
import AtlasTest from "./scenes/atlasTest.js";
import Bootstrap from "./scenes/bootstrap.js";
import Scene1 from "./scenes/scene1.js";
import Scene2 from "./scenes/scene2.js";
import Scene3 from "./scenes/scene3.js";
import Scene4 from "./scenes/scene4.js";
import WebURLImageScene from "./scenes/webUrlImage.js";

window.onload = () => {

    const game = new Game('Nabu - 2D Game Project', 1920, 1080);

    game.registerScene('Bootstrap', Bootstrap);
    game.registerScene('WebURLImageScene', WebURLImageScene);
    game.registerScene('atlasTest', AtlasTest);
    game.registerScene('scene1', Scene1);
    game.registerScene('scene2', Scene2);
    game.registerScene('scene3', Scene3);
    game.registerScene('scene4', Scene4);
    
    EditorSettings.ShowGrid = true;
    EditorSettings.ShowGizmos = true;
    EditorSettings.ShowRenderBounds = false;

    game.run();

};