import Behaviour from "../engine/behaviour.js";
import Input from "../engine/input.js";

class CameraController extends Behaviour {

    update() {

        if(Input.IsKey(Input.KeyCode.D) || Input.IsKey(Input.KeyCode.RightArrow)) {

            this.transform.pX += 10;
        }

        if(Input.IsKey(Input.KeyCode.A) || Input.IsKey(Input.KeyCode.LeftArrow)) {
            this.transform.pX -= 10;
        }

        if(Input.IsKey(Input.KeyCode.W) || Input.IsKey(Input.KeyCode.UpArrow)) {
            this.transform.pY -= 10;
        }

        
        if(Input.IsKey(Input.KeyCode.S) || Input.IsKey(Input.KeyCode.DownArrow)) {
            this.transform.pY += 10;
        }
    }
}
export default CameraController;