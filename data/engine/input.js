
class KeyState {

    constructor() {

        this.isPressed = false;
        this.isDownState = false;
        this.isHeldState = false;
        this.isUpState = false;
    }
}

class Input { 

    keystate = {

        isPressed : false,
        isDownState : false,
        isHeldState : false,
        isUpState : false
    }

    static KeyCode = {

        Space           : 32,

        LeftArrow       : 37,
        UpArrow         : 38,
        RightArrow      : 39,
        DownArrow       : 40,
        
        A               : 65,
        B               : 66,
        C               : 67,
        D               : 68,
        E               : 69,
        F               : 70,
        G               : 71,
        H               : 72,
        I               : 73,
        J               : 74,
        K               : 75,
        L               : 76,
        M               : 77,
        N               : 78,
        O               : 79,
        P               : 80,
        Q               : 81,
        R               : 82,
        S               : 83,
        T               : 84,
        U               : 85,
        V               : 86,
        W               : 87,
        X               : 88,
        Y               : 89,
        Z               : 90,
    }

    static #keystates = new Map();

    static Initialize() {

        window.onkeydown = Input.#onKeydown;
        window.onkeyup = Input.#onKeyup;
    }

    static Update() {

        Input.#keystates.forEach(state => {

            state.isDownState = false;
            state.isUpState = false;
        });
    }

    static #onKeydown(e) {

        let state = Input.#keystates.get(e.keyCode);

        if(state === undefined) {
            state = new KeyState();
        }
        
        state.isHeldState = state.isDownState;
        state.isDownState = !state.isPressed;
        state.isPressed = true;
        state.isUpState = false;

        Input.#keystates.set(e.keyCode, state);
    }

    static #onKeyup(e) {
        
        let state = Input.#keystates.get(e.keyCode);

        if(state === undefined) {
            state = new KeyState();
        }

        state.isUpState = true;
        state.isHeldState = false;
        state.isPressed = false;
        state.isDownState = false;

        Input.#keystates.set(e.keyCode, state);
    }

    static IsKeyDown(keycode) {
        
        const state = Input.#keystates.get(keycode);
        
        if(state === undefined)
            return false;
        
        return state.isDownState;
    }

    static IsKey(keycode) {

        const state = Input.#keystates.get(keycode);

        if(state === undefined)
            return false;

        return state.isPressed;
    }

    static IsKeyUp(keycode) {

        const state = Input.#keystates.get(keycode);

        if(state === undefined)
            return false;

        return state.isUpState;
    }
}
export default Input;