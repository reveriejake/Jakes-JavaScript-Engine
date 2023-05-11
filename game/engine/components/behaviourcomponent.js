import Component from "./component.js";

class BehaviourComponent extends Component {

    constructor() {
        super();

        BehaviourComponent.All.push(this);
        BehaviourComponent.#AwakeQueue.push(this);
    }

    awake() { }
    update() {}
    lateUpdate() {}

    destroy() {

        super.destroy();

        if(BehaviourComponent.All.includes(this)){
        
            const index = BehaviourComponent.All.indexOf(this);
            BehaviourComponent.All.splice(index, 1);
        }
    }

    static All = [];
    static #AwakeQueue = [];

    static Awake() {

        while(BehaviourComponent.#AwakeQueue.length > 0) {
            BehaviourComponent.#AwakeQueue[0].awake();
            BehaviourComponent.#AwakeQueue.splice(0, 1);
        }
    }

    static Update(){

        BehaviourComponent.All.forEach(behaviour =>{
            behaviour.update();
        });
    }

    static LateUpdate() {

        BehaviourComponent.All.forEach(behaviour =>{
            behaviour.lateUpdate();
        });
    }
}
export default BehaviourComponent;