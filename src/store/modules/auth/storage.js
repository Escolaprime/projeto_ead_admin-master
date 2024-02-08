export default {

    get(key) {
        return localStorage.getItem(key);
    },

    set(key,value) {
        localStorage.setItem(key, value);
    },

    clear(key) {
        localStorage.removeItem(key);
    }

    
}