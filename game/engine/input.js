import Engine from './engine.js';

class Input { 
    
    static #kbKeys = [];
    static #msBtns = [];
    
    static #mousePosition = { x:0, y:0 };
    static get MousePosition() { return Input.#mousePosition; }

    static Init() {

        window.onkeydown = Input.#onKeyDown;
        window.onkeyup = Input.#onKeyUp;
        window.onmousemove = Input.#onMouseMove;
        window.onmousedown = Input.#onMouseDown;
        window.onmouseup = Input.#onMouseUp;
    }

    static #isMouseInsideView(e) { 
        
        const rect = Engine.Canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x < rect.width && y >= 0 && y < rect.height) {

            return true;
        }

        return false;
    }

    static #onMouseDown(e) {

        if(Input.#isMouseInsideView(e))
        {
            if(!Input.#msBtns.includes(e.which)) {
                Input.#msBtns.push(e.which);
            }
        }
    }

    static #onMouseUp(e) {

        if(Input.#msBtns.includes(e.which)){
            Input.#msBtns.splice(Input.#msBtns.indexOf(e.which), 1);
        }
    }

    static #onMouseMove(e) {

        if(Input.#isMouseInsideView(e))
        {
            Input.MousePosition.x = e.offsetX;
            Input.MousePosition.y = e.offsetY;
        }
    }
    
    static #onKeyDown(e) {
        
        if(!Input.#kbKeys.includes(e.key)) {
            Input.#kbKeys.push(e.key);
        }
    }
    
    static #onKeyUp(e) { 
        
        if(Input.#kbKeys.includes(e.key)){
            Input.#kbKeys.splice(Input.#kbKeys.indexOf(e.key), 1);
        }
    }
    
    static IsMouseDown(button) { 
        return Input.#msBtns.includes(button);
    }

    static IsKey(key) {
        
        return Input.#kbKeys.includes(key);
    }
}
export default Input;