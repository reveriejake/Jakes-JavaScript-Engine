
class Time {

    static #prevNow = Date.now() / 1000.0;
    static #time = Date.now() / 1000.0;
    static #startTime = Date.now() / 1000.0;
    static #frame = 0;
    static #timeSinceStart = 0.0;
    static #deltaTime = 0.0;

    static #fps = 0;
    static #fpsPollTime = 0.5;
    static #fpsFrameCount = 0;
    static #fpsTime = 0;

    static get time() { return Time.#time; }
    static get deltaTime() { return Time.#deltaTime; }
    static get timeSinceStart() { return Time.#timeSinceStart; }
    static get frame() { return Time.#frame; }
    static get fps() { return Time.#fps; }

    static Update() {

        // Update Time Variables
        Time.#time = Date.now() / 1000.0;
        Time.#deltaTime = Time.#time - Time.#prevNow;
        Time.#prevNow = Time.#time;
        Time.#timeSinceStart = Time.#time - Time.#startTime;
        Time.#frame++;

        // Update FPS Variable
        this.#fpsTime += Time.#deltaTime;
        this.#fpsFrameCount++;

        if(this.#fpsTime >= this.#fpsPollTime) {
            
            this.#fps = Math.round(this.#fpsFrameCount / this.#fpsTime);

            this.#fpsTime -= this.#fpsPollTime;
            this.#fpsFrameCount = 0;
        }
    }
}
export default Time