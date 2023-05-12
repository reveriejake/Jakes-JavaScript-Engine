
class Matrix {

    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {

        this.m=[
            [m00, m01, m02],
            [m10, m11, m12],
            [m20, m21, m22]
        ]
    }

    rotate(theta) {
        
        this.multiplyMatrix(Matrix.CreateRotationMatrix(theta));
    }

    multiplyMatrix(matrix) {

        this.m[0][0] = matrix.m[0][0] * this.m[0][0] + matrix.m[0][1] * this.m[1][0] + matrix.m[0][2] * this.m[2][0];
        this.m[0][1] = matrix.m[0][0] * this.m[0][1] + matrix.m[0][1] * this.m[1][1] + matrix.m[0][2] * this.m[2][1];
        this.m[0][2] = matrix.m[0][0] * this.m[0][2] + matrix.m[0][1] * this.m[1][2] + matrix.m[0][2] * this.m[2][2];          
        this.m[1][0] = matrix.m[1][0] * this.m[0][0] + matrix.m[1][1] * this.m[1][0] + matrix.m[1][2] * this.m[2][0];
        this.m[1][1] = matrix.m[1][0] * this.m[0][1] + matrix.m[1][1] * this.m[1][1] + matrix.m[1][2] * this.m[2][1];
        this.m[1][2] = matrix.m[1][0] * this.m[0][2] + matrix.m[1][1] * this.m[1][2] + matrix.m[1][2] * this.m[2][2];          
        this.m[2][0] = matrix.m[2][0] * this.m[0][0] + matrix.m[2][1] * this.m[1][0] + matrix.m[2][2] * this.m[2][0];
        this.m[2][1] = matrix.m[2][0] * this.m[0][1] + matrix.m[2][1] * this.m[1][1] + matrix.m[2][2] * this.m[2][1];
        this.m[2][2] = matrix.m[2][0] * this.m[0][2] + matrix.m[2][1] * this.m[1][2] + matrix.m[2][2] * this.m[2][2];
    }

    multiplyPoint(x, y) {

        const tx = this.m[0][0] * x + this.m[0][1] * y + this.m[0][2];
        const ty = this.m[1][0] * x + this.m[1][1] * y + this.m[1][2];

        return { x: tx, y : ty };
    }

    static CreateRotationMatrix(theta) { 
        
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        return new Matrix(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
    }

    static CreateTranslationMatrix(tx, ty) { 

        return new Matrix(1, 0, 0, 0, 1, 0, tx, ty, 1);
    }

    static CreateScaleMatrix(sx, sy) { 
        
        return new Matrix(sx, 0, 0, 0, sy, 0, 0, 0, 1);
    }

    static Multiply(matA, matB) {

        const matrix = new Matrix();
        for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            let sum = 0;
            for (let k = 0; k < 3; k++) {
                
                sum += matA.m[i][k] * matB.m[k][j];
            }
            matrix.m[i][j] = sum;
            
            }
        }

        return matrix;
    }
}
export default Matrix;