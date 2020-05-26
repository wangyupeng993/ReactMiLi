class Storage {
    static getLocal (n: string) {
        const key:any = localStorage.getItem(n);
        console.log(JSON.parse(key))
        return key;
    }
    static getSession (n: string) {
        const key:any = sessionStorage.getItem(n);
        return JSON.parse(key)
    }
};

export default Storage
