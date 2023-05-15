
class Random {

    static Range(min, max) {

        return min + Math.random() * (max - min);
    }

    static Value() {
        
        return Math.random();
    }

    static Enum(type) {

        const rand = Math.floor(Math.random() * Object.keys(type).length);
        return type[Object.keys(type)[rand]];
    }
}
export default Random;