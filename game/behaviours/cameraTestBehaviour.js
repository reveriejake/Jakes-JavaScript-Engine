import BehaviourComponent from "../engine/components/behaviourcomponent.js";
import Camera from "../engine/camera.js";
import Time from "../engine/time.js";

class CameraTestBehaviour extends BehaviourComponent {

    awake() {
        
        this.camera = this.entity.getComponent(Camera);
    }
    
    update() {
        
        this.camera.clearColor = `hsl(${ (0.5 + Math.sin(Time.time * 0.25) / 2) * 360 }, 25%, 50%)`;
    }
}
export default CameraTestBehaviour;