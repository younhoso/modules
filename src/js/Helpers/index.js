export default class Actives { // DOM에 class를 넣고 빼는 기본 기능
    constructor(el) {
        this.el = el;
        this.current = null;
        this.store = {length: 0}
    };

    indexDefault() { // 기본적인 인덱스번째 실행
        const {targets} = this.el;  
        if(this.store.currentIndex < 0) this.store.currentIndex = 0; //총 길이보다 작으면 멈춘다.
        if(this.store.currentIndex > this.store.length) this.store.currentIndex = this.store.length; //총 길이보다 크면 멈춘다.

        const arrItem = Array.from(document.querySelectorAll(targets));
        this.store.length = arrItem.length - 1;
    };
    
    indexLoop() { // 인덱스번째 무한 반복 실행
        const {targets} = this.el;  
        if(this.store.currentIndex < 0) this.store.currentIndex = this.store.length; //총 길이보다 작으면 다시 가장 마지막번째가 된다.
        if(this.store.currentIndex > this.store.length) this.store.currentIndex = 0; //총 길이보다 크면 다시 0번째로 된다.

        const arrItem = Array.from(document.querySelectorAll(targets));
        this.store.length = arrItem.length - 1;
    };

    active(item) { // 활성화 관한 메소드
        const { addClassName } = this.el;

        item.classList.add(addClassName) //기본적인 class 추가 기능
        this.current = item
    };

    unactive(item) {  // 비활성화 관한 메소드
        const { addClassName } = this.el;

        if(this.current) item.classList.remove(addClassName) //기본적인 class 삭제 기능
    };

    toggle(item) {  //토글 관한 메소드
        const { addClassName } = this.el;
        item.classList.toggle(addClassName);
    };

    autoplay(item) { // autoplay, loop 관한 메소드
        const {autoplay, loop} = this.el;
        let timeId;
        let n = 0
    
        const autos = () => {
            if( loop && n >= item.length) { n = 0 }
            if( n >= item.length ) return false;
            this.active(item[n])
            n++;
        };

        timeId = setInterval(autos, autoplay);
    };
};