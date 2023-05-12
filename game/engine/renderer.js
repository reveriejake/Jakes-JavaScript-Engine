
class Renderer {

    static #showRenderBounds = false;
    static enableGizmos(){this.#showRenderBounds=true;}

    static #renderedEntitiesCount = 0;
    static get renderedEntitiesCount() { return this.#renderedEntitiesCount; }
    static get renderersCount() { return this.#Renderers.length; }

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
        camera.updateViewBounds(); 

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
                context.drawImage(camera.clearImage, 0, 0, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
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
        context.translate(-camera.transform.pX + (camera.viewOriginX * camera.pixelWidth) + (camera.viewWidth * camera.pixelWidth) / 2, -camera.transform.pY + (camera.viewOriginY * camera.pixelHeight)+ (camera.viewHeight * camera.pixelHeight) / 2);

        const renderers = Renderer.GetRenderersInView(camera.viewBounds);
        this.#renderedEntitiesCount = 0;

        renderers.forEach(renderer => {

            const aabb = renderer.getAABB();
            renderer.isVisible = camera.testAABB(aabb); 
            
            if(renderer.isVisible) {
                
                context.save();

                context.transform(
                    renderer.transform.localToWorldMatrix.m[0][0], 
                    renderer.transform.localToWorldMatrix.m[1][0], 
                    renderer.transform.localToWorldMatrix.m[0][1], 
                    renderer.transform.localToWorldMatrix.m[1][1], 
                    renderer.transform.localToWorldMatrix.m[2][0],
                    renderer.transform.localToWorldMatrix.m[2][1]
                );
                
                renderer.render(context);
                
                this.#renderedEntitiesCount++;
                
                context.restore();
            }

            if(this.#showRenderBounds) {

                context.strokeStyle = 'lime';
                context.lineWidth = 1;
                context.strokeRect(aabb.xMin, aabb.yMin, aabb.width, aabb.height);
            }
        });
        
        context.restore();
    }
}
export default Renderer;