class Storage {
    static setLocal (n: string,v: any): void {
        window.localStorage.setItem(n, JSON.stringify(v))
    }
    static getLocal (n: string) {
        return window.localStorage.getItem(n)
    }
    static removeLocal (n: string): void {
        window.localStorage.removeItem(n)
    }
    static setSession (n: string,v: any): void {
        window.sessionStorage.setItem(n, JSON.stringify(v))
    }
    static getSession (n: string) {
        return window.sessionStorage.getItem(n)
    }
    static removeSession (n: string): void {
        window.sessionStorage.removeItem(n)
    }
}

export default Storage
