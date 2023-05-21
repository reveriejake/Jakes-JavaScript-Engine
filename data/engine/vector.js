
class Vector {

    static Distance(ax, ay, bx, by) {

        const a = bx - ax;
        const b = by - ay;

        return Math.sqrt(a * a + b * b);
    }

    static Length(x, y) {

        return Math.sqrt(x * x + y * y);
    }

    static Normalize(x, y) {

        const len = Vector.Length(x, y);
        return { x: x / len, y: y / len };
    }

    static Dot(ax, ay, bx, by) {

        return ax * bx + ay * by;
    }

    static Cross(ax, ay, bx, by) {

        return ax * by - ay * bx;
    }
}
export default Vector;