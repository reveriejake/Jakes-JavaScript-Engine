
class RenderGraph { 

    static #Renderers = [];

    static AddRenderer(renderer) {

        if(!this.#Renderers.includes(renderer)) {
            
            this.#Renderers.push(renderer);
        }
    }

    static RemoveRenderer(renderer) {
        
        if(this.#Renderers.includes(renderer)) {
            
            let index = this.#Renderers.indexOf(renderer);
            this.#Renderers.splice(index, 1);
        }
    }

    static FindRenderersInBounds(bounds) {

        return this.#Renderers;
    }
}
export default RenderGraph;