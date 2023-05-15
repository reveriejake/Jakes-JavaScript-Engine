import Component from "./component.js";
import Matrix from "./matrix.js";

class Transform extends Component {
  
  #pX = 0;
  get pX() { return this.#pX; }
  set pX(x) { this.#wMatrixDirty = (this.#pX !== x); this.#pX = x; }
  
  #pY = 0;
  get pY() { return this.#pY; }
  set pY(y) { this.#wMatrixDirty = (this.#pY !== y); this.#pY = y; }
  
  #sX = 1;
  get sX() { return this.#sX; }
  set sX(x) { this.#wMatrixDirty = (this.#sX !== x); this.#sX = x;  }
  
  #sY = 1;
  get sY() { return this.#sY; }
  set sY(y) { this.#wMatrixDirty = (this.#sY !== y); this.#sY = y; }
  
  #r = 0;
  get r() { return this.#r; }
  set r(r) { this.#wMatrixDirty = (this.#r !== r); this.#r = r;  }
  
  #wMatrixDirty = false;
  #localToWorldMatrix = new Matrix();
  get localToWorldMatrix() { 
    
    if(this.#wMatrixDirty) { 
  
      this.#updateWorldMatrix(); 
      this.#wMatrixDirty = false;
    }
    
    return this.#localToWorldMatrix; 
  }

  #hasChanged = false;
  get hasChanged() { return this.#hasChanged; }
  set hasChanged(b) { this.#hasChanged = b; }

  #updateWorldMatrix() {

    const tMatrix = Matrix.CreateTranslationMatrix(this.#pX, this.#pY);
    const sMatrix = Matrix.CreateScaleMatrix(this.#sX, this.#sY);
    const rMatrix = Matrix.CreateRotationMatrix(this.#r);

    const tMat = [[0, 0], [0, 0], [this.#pX, this.#pY]]
    const sMat = [[this.#sX, 0], [0, this.#sY], [0, 0]]
    const rMat = [[Math.cos(this.#r), -Math.sin(this.#r)], [Math.sin(this.#r), Math.cos(this.#r)], [0, 0]]

    this.#localToWorldMatrix = Matrix.Multiply(Matrix.Multiply(sMatrix, rMatrix), tMatrix);
    this.#hasChanged = true;
  }

  setParent(parent) {

  }
}
export default Transform;