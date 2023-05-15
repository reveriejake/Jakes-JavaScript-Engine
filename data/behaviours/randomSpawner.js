import Behaviour from "../engine/behaviour.js";
import Random from "../engine/random.js";

class RandomSpawner extends Behaviour {

    start() {

        this.transform.pX = Random.Range(-500, 500);
        this.transform.pY = Random.Range(-500, 500);

    }
}
export default RandomSpawner;