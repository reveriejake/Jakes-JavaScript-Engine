
class Utilities {

    static SelectRandomFromEnum(type) {
        
        const rand = Math.floor(Math.random() * Object.keys(type).length);
        return type[Object.keys(type)[rand]];
    }
}
export default Utilities;