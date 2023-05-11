
class MathEx {

    static Lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }

    static LerpColor(c0, c1, t) { 

        const r1 = parseInt(c0.substr(1, 2), 16);
        const g1 = parseInt(c0.substr(3, 2), 16);
        const b1 = parseInt(c0.substr(5, 2), 16);
        const r2 = parseInt(c1.substr(1, 2), 16);
        const g2 = parseInt(c1.substr(3, 2), 16);
        const b2 = parseInt(c1.substr(5, 2), 16);
      
        // Interpolate RGB components
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
      
        // Convert back to hex format
        const hex = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
        return hex;
    }

}
export default MathEx;