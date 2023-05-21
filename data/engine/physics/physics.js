
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

    static AddCollider(collider) { 

        this.#colliders.push(collider);
    }

    static RemoveCollider(collider) {
        
        if(this.#colliders.includes(collider)) {

            const index = this.#colliders.indexOf(collider);
            this.#colliders.splice(index, 1);
        }
    }

    static Tick() {

        this.#bodies.forEach(body => { body.tick(); });
    }
}
export default Physics;