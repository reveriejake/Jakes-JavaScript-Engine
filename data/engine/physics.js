
class Physics {

    static #bodies = [];
    static #colliders = [];

    static Gravity = { x: 0, y: -10 }

    static AddBody(body) {

        this.#bodies.push(body);
    }

    static RemoveBody(body) {

        if(this.#bodies.includes(body)) {

            const index = this.#bodies.indexOf(body);
            this.#bodies.splice(index, 1);
        }
    }

    static Tick() {

        this.#bodies.forEach(body => { body.tick(); });
    }
}
export default Physics;