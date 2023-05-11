
class Matrix {

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

    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {

        this.m = [
            [m00, m01, m02],
            [m10, m11, m12],
            [m20, m21, m22]
        ];
    }
}
export default Matrix;