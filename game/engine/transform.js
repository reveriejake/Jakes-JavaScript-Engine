import Component from "./components/component.js";

class Matrix3 { 

    constructor() {

        this.m = [
            [1, 0, 0], 
            [0, 1, 0], 
            [0, 0, 1]
        ];
    }

    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {

        this.m[0][0] = m00;
        this.m[0][1] = m01;
        this.m[0][2] = m02;
        this.m[1][0] = m10;
        this.m[1][1] = m11;
        this.m[1][2] = m12;
        this.m[2][0] = m20;
        this.m[2][1] = m21;
        this.m[2][2] = m21;
    }

    copy(matrix) {

        this.m[0][0] = matrix.m[0][0];
        this.m[0][1] = matrix.m[0][1];
        this.m[0][2] = matrix.m[0][2];
        this.m[1][0] = matrix.m[1][0];
        this.m[1][1] = matrix.m[1][1];
        this.m[1][2] = matrix.m[1][2];
        this.m[2][0] = matrix.m[2][0];
        this.m[2][1] = matrix.m[2][1];
        this.m[2][2] = matrix.m[2][2];
    }

    multiply(matrixA, matrixB) {

        for (var i = 0; i < 3; i++) {

            for (var j = 0; j < 3; j++) {

                var sum = 0;
                for (var k = 0; k < 3; k++) {

                    sum += matrixA.m[i][k] * matrixB.m[k][j];
                }

                this.m[i][j] = sum;
            }
        }
    }
}


class Vector2 {

    #x = 0;
    get x() { return this.#x; }
    set x(_x) { this.#x = _x; }

    #y = 0;
    get y() { return this.#y; }
    set y(_y) { this.#y = _y; }

    constructor(_x, _y) { 

        this.#x = _x;
        this.#y = _y;
    }
}

class Transform extends Component {
    
    #children = [];

    #parent = null;
    get parent() { return this.#parent; }
    set parent(p) { this.#parent = p; }

    #position = new Vector2(0, 0);
    get position() { return this.#position; }

    #scale = new Vector2(1, 1);
    get scale() { return this.#scale; }
    
    #rotation = 0;
    get rotation() { return this.#rotation; }
    set rotation(_r) { this.#rotation = _r; }

    addChild(child) {

        if(child.parent) {
            child.parent.removeChild(child);
        }

        child.parent = this;
        this.#children.push(child);
    }

    removeChild(child) {
        
        const index = this.#children.indexOf(child);

        if(index !== -1) {

            child.parent = null;
            this.#children.splice(index, 1);
        }
    }
}
export default Transform;