
class Content {

    static ContentPath = 'data/content/';

    static #loadedImages = new Map();

    static async LoadWebImage(url, onload=(img)=>{}) {

        if(Content.#loadedImages.has(url)) {

            return Content.#loadedImages.get(url);
            
        } else {
            return new Promise((resolve, reject) => {

                let img = new Image();
                img.src = url;

                img.onload = () => { Content.#loadedImages.set(url, img);  resolve(img); onload(img); };
                img.onerror = reject;
            });
        }
    }

    static async LoadImage(url, onload=(img)=>{}) {

        if(Content.#loadedImages.has(url)) {

            return Content.#loadedImages.get(url);
            
        } else {
            return new Promise((resolve, reject) => {

                let img = new Image();
                img.src = `${ Content.ContentPath }${ url }`;

                img.onload = () => { Content.#loadedImages.set(url, img);  resolve(img); onload(img); };
                img.onerror = reject;
            });
        }
    }

    static UnloadImage(url) {


    }
}
export default Content;