
class Matrix {

    constructor() {
        this.m = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }

    translate(tx, ty) {

        this.m[0][2] += tx;
        this.m[1][2] += ty;
    }

    setPosition(x, y) {
        
        this.m[0][2] = x;
        this.m[1][2] = y;
    }

    rotate(theta) {

        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const rotationMatrix = [
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
        ];

        this.multiply(rotationMatrix);
    }

    multiply(otherMatrix) {

        const result = new Matrix();

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {
                
                let sum = 0;
                for (let k = 0; k < 3; k++) {

                    sum += this.m[i][k] * otherMatrix.m[k][j];
                }

                result.m[i][j] = sum;
            }
        }

        this.m = result.m;
    }

    transformPoint(x, y, z) {

        const [x, y, z] = { x, y };

        const [a, b, c] = this.m[0];
        const [d, e, f] = this.m[1];
        const [g, h, i] = this.m[2];

        const tx = a * x + b * y + c * z;
        const ty = d * x + e * y + f * z;
        const tz = g * x + h * y + i * z;

        return {
            x: tx,
            y: ty,
            z: tz
        };
    }
}
export default Matrix;