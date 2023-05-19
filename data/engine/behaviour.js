import Component from "./component.js";

class Behaviour extends Component {

    static #behaviours = [];
    static #startQueue = [];

    static BehavioursInScene() { return Behaviour.#behaviours.length; }

    static #AddBehaviour(behaviour) {

        this.#behaviours.push(behaviour);
        this.#startQueue.push(behaviour);
    }

    static #RemoveBehaviour(behaviour) {

        if(this.#behaviours.includes(behaviour)) {

            const index = this.#behaviours.indexOf(behaviour);
            this.#behaviours.splice(index, 1);
        }
    }

    static Start() {

        while(this.#startQueue.length > 0) {
            const element = this.#startQueue.shift();
            element.start();   
        }
    }

    static Update() {

        this.#behaviours.forEach(behaviour => {

            behaviour.update();
        });
    }

    static FixedUpdate() {
        

        this.#behaviours.forEach(behaviour => {

            behaviour.fixedUpdate();
        });
    }

    constructor() {
        super();

        Behaviour.#AddBehaviour(this);
    }

    start() { }
    update() { }
    fixedUpdate() { }

    destroy() {

        //console.log('destory behaviour');
        Behaviour.#RemoveBehaviour(this);
        super.destroy();
    }
}
export default Behaviour;