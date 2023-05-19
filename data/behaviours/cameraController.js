import Behaviour from "../engine/behaviour.js";
import Input from "../engine/input.js";
import Time from "../engine/time.js";

class CameraController extends Behaviour {

    speed = 500;

    update() {

        if(Input.IsKey(Input.KeyCode.D) || Input.IsKey(Input.KeyCode.RightArrow)) {
            this.transform.pX += this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.A) || Input.IsKey(Input.KeyCode.LeftArrow)) {
            this.transform.pX -= this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.W) || Input.IsKey(Input.KeyCode.UpArrow)) {
            this.transform.pY -= this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.S) || Input.IsKey(Input.KeyCode.DownArrow)) {
            this.transform.pY += this.speed * Time.deltaTime;
        }
    }
}
export default CameraController;