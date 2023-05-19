
class Vector {

    static Dot(x1, y1, x2, y2) {

        return 0;
    }

    static Distance(aX, aY, bX, bY) {

        const a = bX - aX;
        const b = bY - aY;

        return Math.sqrt(a * a + b * b);
    }

    static Normalize(x, y) {

        const max = Math.max(Math.abs(x), Math.abs(y));
        
        const nX = x / max;
        const nY = y / max;

        return { x:nX, y:nY };
    }
}
export default Vector;