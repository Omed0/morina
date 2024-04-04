export default class useStorage {

    get(key) {
        if (typeof window !== "undefined")
            return JSON.parse(localStorage.getItem(key));
        return null;
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}