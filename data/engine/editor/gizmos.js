import Time from "../time.js";

class DebugShape {

    constructor(color, alpha, lineWidth) {
        
        this.alpha = alpha;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    draw(ctx) { }
}

class DebugLine extends DebugShape {
    constructor(ax, ay, bx, by, color, alpha, lineWidth) {
        super(color, alpha, lineWidth);

        this.ax = ax;
        this.ay = ay;
        this.bx = bx;
        this.by = by;
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.moveTo(this.ax, this.ay);
        ctx.lineTo(this.bx, this.by);
        ctx.stroke();
    }
}

class DebugBox extends DebugShape {
    constructor(cX, cY, width, height, isFilled, color, alpha, lineWidth) {
        super(color, alpha, lineWidth);

        this.cX = cX;
        this.cY = cY;
        this.width = width;
        this.height = height;
        this.isFilled = isFilled;
    }

    draw(ctx) {

        if(this.isFilled) {
            
            ctx.fillStyle = this.color;
            ctx.fillRect(this.cX - (this.width / 2), this.cY - (this.height / 2), this.width, this.height);
        } else {

            ctx.strokeStyle = this.color;
            ctx.strokeRect(this.cX - (this.width / 2), this.cY - (this.height / 2), this.width, this.height);
        }
    }
}

class DebugDot extends DebugShape {
    constructor(x, y, radius, isfilled, color, alpha, lineWidth) {
        super(color, alpha, lineWidth);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.isfilled = isfilled;
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360);

        if(this.isfilled) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
}

class DebugText extends DebugShape {

    constructor(x, y, text, font, textAlign, color, alpha, lineWidth) {
        super(color, alpha, lineWidth);

        this.x = x;
        this.y = y;
        this.text = text;
        this.font = font;
        this.textAlign = textAlign;
    }

    draw(ctx) {

        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class Gizmos extends DebugShape  { 

    static #shapes = [];

    static DrawPoint(x, y, radius, isFilled, color = 'white', alpha = 1, lineWidth = 1, life = 0) {

        this.#shapes.push([Time.time, Time.frame, life, new DebugDot(x, y, radius, isFilled, color, alpha, lineWidth)]);
    }

    static DrawBox(cX, cY, width, height, isFilled, color = 'white', alpha = 1, lineWidth = 1, life = 0) {

        this.#shapes.push([Time.time, Time.frame, life, new DebugBox(cX, cY, width, height, isFilled, color, alpha, lineWidth)])
    }

    static DrawLine(aX, aY, bX, bY, color = 'white', alpha = 1, lineWidth = 1, life = 0) {

        this.#shapes.push([Time.time, Time.frame, life, new DebugLine(aX, aY, bX, bY, color, alpha, lineWidth)]);
    }

    static DrawRay(pX, pY, dX, dY, color = 'white', alpha = 1, lineWidth = 1, life = 0) {

        this.#shapes.push([Time.time, Time.frame, life, new DebugLine(pX, pY, pX + dX, pY + dY, color, alpha, lineWidth)]);
    }

    static DrawText(x, y, text, font = '20px Consolas', textAlign = 'center', color = 'white', alpha = 1, lineWidth = 1, life = 0) {

        this.#shapes.push([Time.time, Time.frame, life, new DebugText(x, y, text, font, textAlign, color, alpha, lineWidth)]);
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
        
        ctx.lineWidth = width;
        ctx.strokeStyle = color;

        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
    }

    static Render(ctx) {

        const preAlpha = ctx.globalAlpha;
        const time = Time.time;

        this.#shapes.forEach(([t, f, l, s], index) => {
            
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = s.color;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.lineWidth;
            
            s.draw(ctx);

            if(time >= (t + l)) {
                this.#shapes.splice(index, 1);
            }
        });

        ctx.globalAlpha = preAlpha;
    }

}
export default Gizmos;