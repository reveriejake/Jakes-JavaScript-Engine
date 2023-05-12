import Component from "./components/component.js";
import Matrix from "./matrix.js";

class Transform extends Component {

    #pX = 0;
    #pY = 0;
    #sX = 1;
    #sY = 1;
    #r = 0;
    #wMatrixDirty = false;

    get pX() { return this.#pX; }
    set pX(x) { this.#pX = x; this.#wMatrixDirty = true; }
    
    get pY() { return this.#pY; }
    set pY(y) { this.#pY = y; this.#wMatrixDirty = true;  }

    get sX() { return this.#sX; }
    set sX(x) { this.#sX = x; this.#wMatrixDirty = true;  }
    
    get sY() { return this.#sY; }
    set sY(y) { this.#sY = y; this.#wMatrixDirty = true;  }

    get r() { return this.#r; }
    set r(r) { this.#r = r; this.#wMatrixDirty = true;  }

    #localToWorldMatrix = new Matrix();
    get localToWorldMatrix() { 
      
      if(this.#wMatrixDirty) { 
    
        this.#updateWorldMatrix(); 
        this.#wMatrixDirty = false;
      }
      
      return this.#localToWorldMatrix; 
    }

    #updateWorldMatrix() {

      const tMatrix = Matrix.CreateTranslationMatrix(this.#pX, this.#pY);
      const sMatrix = Matrix.CreateScaleMatrix(this.#sX, this.#sY);
      const rMatrix = Matrix.CreateRotationMatrix(this.#r);

      this.#localToWorldMatrix = Matrix.Multiply(Matrix.Multiply(sMatrix, rMatrix), tMatrix); // Matrix.Multiply(Matrix.Multiply(rMatrix, sMatrix), tMatrix);
    }
  }
export default Transform;