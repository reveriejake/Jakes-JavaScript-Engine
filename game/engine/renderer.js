class Renderer {

    static #showRenderBounds = false;
    static set showRenderBounds(b) { this.#showRenderBounds = b; }

    static #renderedEntitiesCount = 0;
    static get renderedEntitiesCount() { return this.#renderedEntitiesCount; }

    static #Renderers = [];
    static AddRenderer(renderer) {

        this.#Renderers.push(renderer);
    }

    static RemoveRenderer(renderer) { 

        if(this.#Renderers.includes(renderer)) {

            const index = this.#Renderers.indexOf(renderer);
            this.#Renderers.splice(index, 1);
        }
    }

    static SortRenderers() {

        this.#Renderers.sort((a,b) => { return (a.sortOrder > b.sortOrder) ? 1 : -1; });
    }

    static GetRenderersInView(bounds) {

        return this.#Renderers;
    }

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
            
            case 0: /*NONE*/ {
                
            }
            break;
            
            case 1: /*COLOR*/ {

                context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                context.fillStyle = camera.clearColor;
                context.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
            }
            break;
            
            case 2: /*GRADIENT*/ {
                
                context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                let gradient = context.createLinearGradient(0, 0, 0, camera.pixelHeight);
                for (let i = 0; i < camera.gradientStops.length; i++) {
                    gradient.addColorStop(camera.gradientStops[i][0], camera.gradientStops[i][1]);
                }
                
                context.fillStyle = gradient;
                context.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
            }
            break;
            
            case 3: /*IMAGE*/ {
                
                context.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
            }
            break;

            case 4: /*FADER*/ {

                context.globalAlpha = camera.clearFadeAlpha;
                context.fillStyle = 'black';
                context.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                context.globalAlpha = 1;
            }
            break;
        }

        // Move camera to camera origin
        context.translate(-camera.transform.position.x + camera.pixelWidth / 2, -camera.transform.position.y + camera.pixelHeight / 2);

        let renderers = Renderer.GetRenderersInView(camera.viewBounds);
        //renderers.sort((a,b) => { return (a.sortOrder > b.sortOrder) ? 1 : -1; });

        this.#renderedEntitiesCount = 0;
        renderers.forEach(renderer => {

            const aabb = renderer.getAABB();
            renderer.isVisible = camera.testAABB(aabb); 
            
            if(renderer.isVisible) {
                
                context.save();
                
                context.translate(renderer.transform.position.x, renderer.transform.position.y);
                context.scale(renderer.transform.scale.x, renderer.transform.scale.y);
                context.rotate(renderer.transform.rotation);
                
                renderer.render(context);
                
                this.#renderedEntitiesCount++;
                
                context.restore();
            }

            if(this.#showRenderBounds) {

                context.strokeStyle = 'lime';
                context.lineWidth = 2;
                context.strokeRect(aabb.xMin, aabb.yMin, aabb.width, aabb.height);
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