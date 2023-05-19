import Vector from "../vector.js";

class Line {
    constructor(ax, ay, bx, by, color, width) {
        this.ax = ax;
        this.ay = ay;
        this.bx = bx;
        this.by = by;
        this.color = color;
        this.width = width;
    }
}

class Gizmos { 

    line = {
        ax:0,
        ay:0,
        bx:0,
        by:0,
        color:'white',
        width: 1
    }

    static #lines = [];

    static DrawLine(aX, aY, bX, bY, color = 'white', width = 1) {

        this.#lines.push(new Line(aX, aY, bX, bY, color, width));
    }

    static DrawRay(pX, pY, dX, dY, color = 'white', width = 1) {

        this.#lines.push(new Line(pX, pY, pX + dX, pY + dY, color, width));
    }

    static DrawCameraGrid(ctx, camera, gridSize = 100) {
         
        if(camera) {

            const halfWidth = camera.pixelWidth / 2;
            const halfHeight = camera.pixelHeight / 2;

            const xMin = camera.transform.pX - halfWidth;
            const xMax = camera.transform.pX + halfWidth;
            const yMin = camera.transform.pY - halfHeight;
            const yMax = camera.transform.pY + halfHeight;

            const xOffset = -camera.transform.pX % gridSize;
            const yOffset = -camera.transform.pY % gridSize;

            ctx.globalAlpha = 0.1;

            for(let ix = xMin; ix <= xMax; ix += gridSize) {
                this.#DrawLineImmediate(ctx, xOffset + ix + (halfWidth % gridSize), camera.transform.pY - halfHeight, xOffset +  ix + (halfWidth % gridSize), camera.transform.pY + halfHeight, 'white', 1);
                this.#DrawLineImmediate(ctx, xOffset + ix + (halfWidth % gridSize) + 1, camera.transform.pY - halfHeight, xOffset +  ix + (halfWidth % gridSize) + 1, camera.transform.pY + halfHeight, 'black', 1);
            }

            for(let iy = yMin; iy <= yMax; iy += gridSize) {
                this.#DrawLineImmediate(ctx, camera.transform.pX - halfWidth, yOffset + iy + (halfHeight % gridSize), camera.transform.pX + halfWidth, yOffset +  iy + (halfHeight % gridSize), 'white', 1);
                this.#DrawLineImmediate(ctx, camera.transform.pX - halfWidth, yOffset + iy + (halfHeight % gridSize) + 1, camera.transform.pX + halfWidth, yOffset +  iy + (halfHeight % gridSize) + 1, 'black', 1);
            }

            ctx.globalAlpha = 0.5;
            this.#DrawLineImmediate(ctx, camera.transform.pX - halfWidth, 0, camera.transform.pX + halfWidth, 0, 'green', 3);
            this.#DrawLineImmediate(ctx, 0, camera.transform.pY - halfHeight, 0, camera.transform.pY + halfHeight, 'red', 3);
            
            ctx.globalAlpha = 1.0;
        }
    }

    static #DrawLineImmediate(ctx, ax, ay, bx, by, color, width) { 
        
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    static Render(context) {

        while(this.#lines.length > 0)
        {
            const line = this.#lines.pop();

            context.beginPath();
            context.moveTo(line.ax, line.ay);
            context.lineTo(line.bx, line.by);
            context.lineWidth = line.width;
            context.strokeStyle = line.color;
            context.stroke();
        }

    }

}
export default Gizmos;