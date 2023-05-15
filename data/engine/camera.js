import Bounds from "./bounds.js";
import Component from "./component.js";
import Graphics from "./graphics.js";

class Camera extends Component {
    
    static ClearType = {

        NONE        : 0,
        COLOR       : 1,
        GRADIENT    : 2,
        IMAGE       : 3,
        FADER       : 4,
    }

    static Gradients = {

        Azure           : [[0.0, '#7f7fd5'],[0.5, '#86A8E7'],[1.0, '#91EAE4']],
        Magic           : [[0.0, '#59C173'],[0.5, '#a17fe0'],[1.0, '#5D26C1']],
        Evening         : [[0.0, '#005AA7'],[1.0, '#FFFDE4']],
        Sublime         : [[0.0, '#FC466B'],[1.0, '#3F5EFB']],
        Taran           : [[0.0, '#23074d'],[1.0, '#cc5333']],
        Frost           : [[0.0, '#000428'],[1.0, '#004e92']],
        DeepSpace       : [[0.0, '#000000'],[1.0, '#434343']],
    }
        
    constructor() {
        super();
        
        this.clearType = Camera.ClearType.COLOR;
        this.clearImage = null;
        this.clearColor = 'cornflowerblue';
        this.clearFadeAlpha = 0.01;
        this.clearGradient = Camera.Gradients.Evening;
        
        this.pixelWidth = Graphics.Width;
        this.pixelHeight = Graphics.Height;
        
        this.viewWidth = 1;
        this.viewHeight = 1;
        this.viewOriginX = 0;
        this.viewOriginY = 0;
        
        this.bounds = new Bounds(-this.pixelWidth / 2, -this.pixelHeight / 2, this.pixelWidth, this.pixelHeight);
        this.viewBounds = new Bounds(this.bounds.xMin, this.bounds.yMin, this.bounds.width, this.bounds.height);
        
        this.name = 'Camera';

        Graphics.AddCamera(this);
    }

    testAABB(aabb) {
                
        return (
            aabb.xMax > this.transform.pX - (this.pixelWidth / 2)  &&
            aabb.yMax > this.transform.pY - (this.pixelHeight / 2) &&
            aabb.xMin < this.transform.pX + (this.pixelWidth / 2) &&
            aabb.yMin < this.transform.pY + (this.pixelHeight / 2)
        );
    }

    destroy() {

        //console.log('destroy camera');
        Graphics.RemoveCamera(this);
        
        super.destroy();
    }
}
export default Camera;