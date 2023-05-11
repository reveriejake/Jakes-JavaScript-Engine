import { CameraClearType } from "./camera.js";
import RenderComponent from "./components/renderComponent.js";
import RenderGraph from "./rendergraph.js";

class Renderer {

    static #renderedEntitiesCount = 0;
    static get renderedEntitiesCount() { return this.#renderedEntitiesCount; }

    static Render(camera, context) {

        camera.makeActive();
        context.save();

        if(camera.viewWidth < 1 || camera.viewHeight < 1 || camera.viewOriginX > 0 || camera.viewOriginY > 0) {

            context.beginPath();
            context.rect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
            context.clip();
        }

        // Clear Colors
        switch(camera.clearType) {
            
            case CameraClearType.NONE:
                break;
                
                case CameraClearType.COLOR: {

                    context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                    context.fillStyle = camera.clearColor;
                    context.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                }
                break;
                
                case CameraClearType.GRADIENT: {
                    
                    context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                    let gradient = context.createLinearGradient(0, 0, 0, camera.pixelHeight);
                    for (let i = 0; i < camera.gradientStops.length; i++) {
                        gradient.addColorStop(camera.gradientStops[i][0], camera.gradientStops[i][1]);
                    }
                    
                    context.fillStyle = gradient;
                    context.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                }
                break;
                
                case CameraClearType.IMAGE: {
                    
                    context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                }
                break;
        }

        // Move camera to camera origin
        context.translate(-camera.transform.position.x + camera.pixelWidth / 2, -camera.transform.position.y + camera.pixelHeight / 2);

        let renderers = RenderGraph.FindRenderersInBounds(camera.viewBounds);
        renderers = renderers.filter(item => item instanceof RenderComponent);
        renderers.sort((a,b) => { return (a.sortOrder > b.sortOrder) ? 1 : -1; });

        this.#renderedEntitiesCount = 0;
        renderers.forEach(renderer => {

            renderer.isVisible = camera.testAABB(renderer.getAABB()); 

            if(renderer.isVisible) {

                context.save();

                context.translate(renderer.transform.position.x, renderer.transform.position.y);
                context.scale(renderer.transform.scale.x, renderer.transform.scale.y);
                context.rotate(renderer.transform.rotation);
                                    
                renderer.render(context);
                
                this.#renderedEntitiesCount++;

                context.restore();
            }
        });

        // Render Entities
        // this.#renderedEntities = 0;
        // Renderer.All.forEach(renderer => {
            
        //     renderer.isVisible = camera.testAABB(renderer.getAABB()); 

        //     if(renderer.isVisible) {

        //         context.save();
                
        //         context.translate(renderer.transform.position.x, renderer.transform.position.y);
        //         context.scale(renderer.transform.scale.x, renderer.transform.scale.y);
        //         context.rotate(renderer.transform.rotation);
                                                
        //         renderer.render(context);
                
        //         context.restore();
        //         this.#renderedEntities++;
        //     }
        // });
        
        context.restore();
    }
}
export default Renderer;