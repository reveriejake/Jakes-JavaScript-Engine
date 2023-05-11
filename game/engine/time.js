
class Time {

    static #prevNow = Date.now() / 1000.0;
    static #time = Date.now() / 1000.0;
    static #startTime = Date.now() / 1000.0;
    static #timeSinceStart = 0.0;
    static #deltaTime = 0.0;
    static #lastLoop = 0;
    static #fps = 0;

    static get time() { return Time.#time; }
    static get deltaTime() { return Time.#deltaTime; }
    static get timeSinceStart() { return Time.#timeSinceStart; }
    static get fps() { return Time.#fps; }

    static Update() {
        Time.#time = Date.now() / 1000.0;
        Time.#deltaTime = Time.#time - Time.#prevNow;
        Time.#prevNow = Time.#time;
        Time.#timeSinceStart = Time.#time - Time.#startTime;

        let  thisLoop = new Date();
        Time.#fps = Math.round(1000 / (thisLoop - Time.#lastLoop));
        Time.#lastLoop = thisLoop;
    }
}
export default Time