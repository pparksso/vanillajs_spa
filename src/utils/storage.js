export const storage = window.localStorage;

export const getItems = (key, defaultVal) => {
    // key: 로컬스토리지에서 찾을 key, defaultVal: 없을 때 설정 할 초기값
    try {
        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : defaultVal
    } catch(err) {
        return defaultVal;
    }
};

export const setItems = (key, value) => {
    // key: 로컬스토리지에 저장 할 key, value: 로컬스토리지에 저장 할 값
    try {
        storage.setItem(key, JSON.stringify(value));
    } catch(err) {
        console.log(err)
    }
};

export const removeItems = (key) => {
    try {
        storage.removeItem(key)
    } catch(err) {
        console.log(err)
    }
}
