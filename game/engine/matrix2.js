
class Matrix {

    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {

        this.m = [
            [m00, m01, m02],
            [m10, m11, m12],
            [m20, m21, m22]
        ];
    }

    position(x, y) { 

        this.m[0][2] = x;
        this.m[1][2] = y;
    }

    translate(dx, dy) {

        this.m[0][2] += dx;
        this.m[1][2] += dy;
    }

    scale(sx, sy) {

        this.m[0][0] *= sx;
        this.m[0][1] *= sy;
        this.m[1][0] *= sx;
        this.m[1][2] *= sy;
    }

    rotate(theta) {

        const rotMatrix = CreateRotationMatrix(theta);
        this.multiplyMatrix(rotMatrix);
    }

    multiplyPoint(x, y) { 
        const [a, b, c, d, e, f] = this.m;

        const tx = a * x + c * y + e;
        const ty = b * x + d * y + f;

        return { x: tx, y : ty };
    }

    multiplyMatrix(matrix) {

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {

                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    
                    sum += this.m[i][k] * matrix.m[k][j];
                }
                this.m[i][j] = sum;
            }
        }
    }

    static CreateRotationMatrix(theta) {
        
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        return new Matrix(
            cos, -sin, 0,
            sin, cos, 0,
            0, 0, 1
        );
    }
    
    static RotatePoint(x, y, matrix) {

        const rX = matrix.m[0][0] * x + matrix.m[0][1] * y + matrix.m[0][2];
        const rY = matrix.m[1][0] * x + matrix.m[1][1] * y + matrix.m[1][2];

        return { x: rX, y: rY };
    }
}
export default Matrix;