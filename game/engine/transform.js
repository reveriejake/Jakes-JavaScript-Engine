import Component from "./components/component.js";
import Matrix from "./matrix.js";

class Vector2Callback {

    #x = 0;
    get x() { return this.#x; }
    set x(_x) { this.#x = _x; this.#changeCallback(); }

    #y = 0;
    get y() { return this.#y; }
    set y(_y) { this.#y = _y; this.#changeCallback(); }

    #changeCallback
    constructor(_x, _y, changeCallback) { 

        this.#changeCallback = changeCallback;
        this.#x = _x;
        this.#y = _y;
    }
}

class Transform extends Component {
    
    #position = new Vector2Callback(0, 0, this.#onTransformChanged );
    get position() { return this.#position; }
    set position(v) { this.#position = v; this.#onTransformChanged(); }

    #scale = new Vector2Callback(1, 1, this.#onTransformChanged);
    get scale() { return this.#scale; }
    set scale(v) { this.#scale = v; this.#onTransformChanged(); }

    #rotation = 0;
    get rotation() { return this.#rotation; }
    set rotation(v) { this.#rotation = v; this.#onTransformChanged(); }

    constructor() {
        super(); 

        this.localMatrix = new Matrix();
    }

    #onTransformChanged() {

        //this.localMatrix.rotate(this.rotation);
    }

    // addChild(child) {

    //     if(child.parent) {
    //         child.parent.removeChild(child);
    //     }

    //     child.parent = this;
    //     this.#children.push(child);
    // }

    // removeChild(child) {
        
    //     const index = this.#children.indexOf(child);

    //     if(index !== -1) {

    //         child.parent = null;
    //         this.#children.splice(index, 1);
    //     }
    // }
}
export default Transform;