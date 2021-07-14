export default class Storage {
    /**
     * 특정키를 통해서 데이터 생성
     * @param {string} key 
     * @param {object} value 
     */
    static setItemLocal(key = 'data', value = {}) {
        if(typeof(Storage) !== 'undefined'){ //true이면 브라우저가 localStorage를 지원하고 있다.
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
     /**
     * 특정키를 통해서 데이터 생성
     * @param {string} key 
     * @param {object} value 
     */
    static setItemSession(key = 'data', value = {}) {
        if(typeof(Storage) !== 'undefined'){ //true이면 브라우저가 sessionStorage를 지원하고 있다.
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    };

    /**
     * 특정키로 부터 데이터 조회
     * @param {string} key 
     */
    static getItmeLocal(key = 'data'){
        return JSON.parse(localStorage.getItem(key));
    };
    /**
     * 특정키로 부터 데이터 조회
     * @param {string} key 
     */
     static getItmeSession(key = 'data'){
        return JSON.parse(sessionStorage.getItem(key));
    };

    /**
     * 특정키의 데이터 삭제
     * @param {string} key 
     */
    static removeItemLocal(key = 'data'){
        localStorage.removeItem(key);
    };
    /**
     * 특정키의 데이터 삭제
     * @param {string} key 
     */
    static removeItemSession(key = 'data'){
        sessionStorage.removeItem(key);
    };

    // localStorage의 저장된 키/값 쌍의 개수
    static lengthLocal() {
        localStorage.length;
    };
    // sessionStorage의 저장된 키/값 쌍의 개수
    static lengthSession() {
        sessionStorage.length;
    };

    /**
     * localStorage의 전체 항목 데이터 삭제
     */
    static clearLocal() {
        localStorage.clear();
    };
    /**
     * sessionStorage의 전체 항목 데이터 삭제
     */
    static clearSession() {
        sessionStorage.clear();
    };
}