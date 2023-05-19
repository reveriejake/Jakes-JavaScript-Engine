import Component from "./component.js";
import Matrix from "./matrix.js";

class Transform extends Component {
  
  #pX = 0;
  get pX() { return this.#pX; }
  set pX(x) { this.#wMatrixDirty = true; this.#pX = x; }
  
  #pY = 0;
  get pY() { return this.#pY; }
  set pY(y) { this.#wMatrixDirty = true; this.#pY = y; }
  
  #sX = 1;
  get sX() { return this.#sX; }
  set sX(x) { this.#wMatrixDirty = true; this.#sX = x;  }
  
  #sY = 1;
  get sY() { return this.#sY; }
  set sY(y) { this.#wMatrixDirty = true; this.#sY = y; }
  
  #r = 0;
  get r() { return this.#r; }
  set r(r) { this.#wMatrixDirty = true; this.#r = r;  }
  
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

    this.#localToWorldMatrix = Matrix.Multiply(Matrix.Multiply(sMatrix, rMatrix), tMatrix);

    this.#hasChanged = true;
  }
}
export default Transform;