import Behaviour from "../engine/behaviour.js";

class TextBehaviour extends Behaviour {

    text = 'this is a test';

    update() {
        
        console.log('still alive');
    }

    onUI(ctx) {

        ctx.fillStyle = 'red';
        ctx.font = '50px Consolas';
        ctx.fillText(this.text, 50, 50);
        
    }
}
export default TextBehaviour;