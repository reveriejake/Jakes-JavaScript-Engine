import Behaviour from "../engine/behaviour.js";
import Input from "../engine/input.js";
import PMath from "../engine/pmath.js";
import Time from "../engine/time.js";

class CameraController extends Behaviour {

    speed = 500;
    smoothing = 10;
    enableSmoothing = true;
    targetPosition = { x: 0, y: 0 };

    update() {

        if(Input.IsKey(Input.KeyCode.D) || Input.IsKey(Input.KeyCode.RightArrow)) {
            this.targetPosition.x += this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.A) || Input.IsKey(Input.KeyCode.LeftArrow)) {
            this.targetPosition.x -= this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.W) || Input.IsKey(Input.KeyCode.UpArrow)) {
            this.targetPosition.y -= this.speed * Time.deltaTime;
        }

        if(Input.IsKey(Input.KeyCode.S) || Input.IsKey(Input.KeyCode.DownArrow)) {
            this.targetPosition.y += this.speed * Time.deltaTime;
        }
        
        if(this.enableSmoothing) {

            this.transform.pX = PMath.Lerp(this.transform.pX, this.targetPosition.x, Time.deltaTime * this.smoothing);
            this.transform.pY = PMath.Lerp(this.transform.pY, this.targetPosition.y, Time.deltaTime * this.smoothing);
        } else {

            this.transform.pX = this.targetPosition.x;
            this.transform.pY = this.targetPosition.y;
        }
    }
}
export default CameraController;