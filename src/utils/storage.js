class storage {
    setStorage = (index, data) => {
        localStorage.setItem(index, data);
    }

    getStorage = (index) => {
        return localStorage.getItem(index);
    }

    removeStorage = (index) => {
        localStorage.removeItem(index);
    }

    clearStorage = () => {
        localStorage.clear();
    }
}
export default new storage();