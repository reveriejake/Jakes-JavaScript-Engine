
class SceneManager {

    static async LoadScene(url, completeCallback) {

        SceneManager.UnloadScene();
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    static UnloadScene() {

        
    }
}