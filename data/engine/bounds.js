class Bounds {

  get width() { return this.xMax - this.xMin; }
  get height() { return this.yMax - this.yMin; }
  get center() { return { x: this.width / 2, y: this.height / 2 }; }

  constructor(xMin, yMin, width, height) {

    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMin + width;
    this.yMax = yMin + height;
  }

  setMinMax(xMin, yMin, xMax, yMax) {

      this.xMin = xMin;
      this.yMin = yMin;
      this.xMax = xMax;
      this.yMax = yMax;
  }

  set(xMin, yMin, width, height) {

      this.xMin = xMin;
      this.yMin = yMin;
      this.xMax = xMin + width;
      this.yMax = yMin + height;
  }

  expand(x, y) {

    this.xMin = Math.min(this.xMin, x);
    this.yMin = Math.min(this.yMin, y);
    this.xMax = Math.max(this.xMax, x);
    this.yMax = Math.max(this.yMax, y);
  }

  contains(x, y) {
    return x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax;
  }

  intersects(other) {
    return (
      this.xMin <= other.xMax &&
      this.xMax >= other.xMin &&
      this.yMin <= other.yMax &&
      this.yMax >= other.yMin
    );
    }
  }
  export default Bounds;