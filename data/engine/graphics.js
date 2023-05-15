import Behaviour from "./behaviour.js";
import Component from "./component.js";
import SceneManager from "./scenemanager.js";
import Time from "./time.js";

class Graphics {

    static get Context() { return this.#context; }
    
    static get Height() { return this.#canvas.height; }
    static get Width() { return this.#canvas.width; }

    static #canvas;
    static #context;

    static #sortFlag = true;
    static #renderables = [];
    static #cameras = [];
    
    static #showRenderBounds = false;
    static #renderedEntitiesCount = 0;

    static get renderedEntitiesCount() { return this.#renderedEntitiesCount; }
    static get renderersCount() { return this.#renderables.length; }

    static Initialize(width, height) {

        this.#canvas = document.getElementById('main-canvas');
        this.#context = this.#canvas.getContext('2d');

        this.ResizeCanvas(width, height);
    }

    static ResizeCanvas(width, height) {

        this.#canvas.width = width;
        this.#canvas.height = height;
    }

    static AddRenderable(renderable) {

        this.#renderables.push(renderable);
    }

    static RemoveRenderable(renderable) {

        if(this.#renderables.includes(renderable)) {

            const index = this.#renderables.indexOf(renderable);
            this.#renderables.splice(index, 1);
        }
    }
    
    static Sortrenderables() {

        this.#sortFlag = true;
    }

    static AddCamera(camera) {

        this.#cameras.push(camera);
    }

    static RemoveCamera(camera) {

        if(this.#cameras.includes(camera)) {

            const index = this.#cameras.indexOf(camera);
            this.#cameras.splice(index, 1);
        }
    }

    static EnableGizmos() {
        
        this.#showRenderBounds=true;
    }

    static RenderScene() {

        const ctx = this.#context;
        ctx.save();

        if(SceneManager.IsSceneLoading()) {

            let loadingText = 'Loading Scene...';

            ctx.clearRect(0, 0, this.Width, this.Height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, this.Width, this.Height);
            ctx.fillStyle = 'white';            
            ctx.font = '30px Consolas';
            ctx.fillText(loadingText, this.Width / 2 + (-ctx.measureText(loadingText).width / 2), this.Height / 2 );

        } else if(this.#cameras.length === 0) { 

            let noCamText = '[No Camera Detected In Scene]';

            ctx.clearRect(0, 0, this.Width, this.Height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, this.Width, this.Height);
            ctx.fillStyle = 'white';            
            ctx.font = '30px Consolas';
            ctx.fillText(noCamText, this.Width / 2 + (-ctx.measureText(noCamText).width / 2), this.Height / 2 );

        } else {
            

            if(this.#sortFlag) {

                // Sort the renderers based on their sorting order
                this.#renderables.sort((a, b) => { return (a.sortOrder > b.sortOrder) ? 1 : -1 });
                this.#sortFlag = false;
            }

            this.#cameras.forEach(camera => {

                if(camera.isEnabled) {

                    ctx.save();

                    if(camera.viewWidth < 1 || camera.viewHeight < 1 || camera.viewOriginX > 0 || camera.viewOriginY > 0) {

                        ctx.beginPath();
                        ctx.rect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                        ctx.clip();
                    }

                    // Clear Colors
                    switch(camera.clearType) {
                        
                        case 0: /*NONE*/ {
                            
                        }
                        break;
                        
                        case 1: /*COLOR*/ {

                            ctx.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                            ctx.fillStyle = camera.clearColor;
                            ctx.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                        }
                        break;
                        
                        case 2: /*GRADIENT*/ {
                            
                            ctx.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                            let gradient = ctx.createLinearGradient(0, 0, 0, camera.pixelHeight);
                            for (let i = 0; i < camera.clearGradient.length; i++) {
                                gradient.addColorStop(camera.clearGradient[i][0], camera.clearGradient[i][1]);
                            }
                            
                            ctx.fillStyle = gradient;
                            ctx.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                        }
                        break;
                        
                        case 3: /*IMAGE*/ {
                            
                            ctx.clearRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                            ctx.drawImage(camera.clearImage, 0, 0, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                        }
                        break;

                        case 4: /*FADER*/ {

                            ctx.globalAlpha = camera.clearFadeAlpha;
                            ctx.fillStyle = 'black';
                            ctx.fillRect(camera.pixelWidth * camera.viewOriginX, camera.pixelHeight * camera.viewOriginY, camera.pixelWidth * camera.viewWidth, camera.pixelHeight * camera.viewHeight);
                            ctx.globalAlpha = 1;
                        }
                        break;
                    }
                    
                    // Move camera to camera origin
                    ctx.translate(-camera.transform.pX + (camera.viewOriginX * camera.pixelWidth) + (camera.viewWidth * camera.pixelWidth) / 2, -camera.transform.pY + (camera.viewOriginY * camera.pixelHeight)+ (camera.viewHeight * camera.pixelHeight) / 2);


                    ctx.strokeStyle = 'white';
                    ctx.strokeRect(-1, -2500, 2, 5000);
                    ctx.strokeRect(-2500, -1, 5000, 2);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(-2500, -1, 5000, 2);
                    ctx.fillStyle = 'green';
                    ctx.fillRect(-1, -2500, 2, 5000);

                    this.#renderedEntitiesCount = 0;

                    this.#renderables.forEach(renderer => {

                        const aabb = renderer.getAABB();
                        renderer.isVisible = camera.testAABB(aabb); 
                        
                        if(renderer.isVisible) {
                            
                            ctx.save();

                            ctx.transform(
                                renderer.transform.localToWorldMatrix.m[0][0], 
                                renderer.transform.localToWorldMatrix.m[1][0], 
                                renderer.transform.localToWorldMatrix.m[0][1], 
                                renderer.transform.localToWorldMatrix.m[1][1], 
                                renderer.transform.localToWorldMatrix.m[2][0],
                                renderer.transform.localToWorldMatrix.m[2][1]
                            );
                            
                            renderer.render(ctx);
                            
                            this.#renderedEntitiesCount++;
                            
                            ctx.restore();
                        }

                        if(this.#showRenderBounds) {

                            ctx.strokeStyle = 'lime';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(aabb.xMin, aabb.yMin, aabb.width, aabb.height);
                        }
                    });
                    
                    ctx.restore();
                }
            });
            
            ctx.font = 'bold 20px Consolas';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';

            ctx.fillText(`Render : ${ this.renderedEntitiesCount } / ${ this.renderersCount }`, 35, 35);
            ctx.fillText(`Scene: ${ SceneManager.GetCurrentSceneName() }`, 35, 65);
            ctx.fillText(`Behaviours: ${ Behaviour.BehavioursInScene() }`, 35, 95);
            ctx.fillText(`Components: ${ Component.ComponentCount }`, 35, 125);

            ctx.globalAlpha = 0.75;
            ctx.fillStyle = 'white';
            ctx.fillRect(this.#canvas.width - 160, 10, 150, 35);
            ctx.globalAlpha = 1;
            
            ctx.textAlign = 'right';
            ctx.fillStyle = 'black';
            ctx.fillText(`FPS : ${ Time.fps }`, this.#canvas.width - 35, 35);

        }
        
        ctx.restore();
    }
}
export default Graphics;