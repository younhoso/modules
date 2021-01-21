export default class scrollFullpage {
    constructor (el) {
        this.el = el;
    }

    active(item) { // 활성화 관한 메소드
        const { addClassName } = this.el;

        item.classList.add(addClassName)
        this.current = item
    };
    unactive(item) {  // 비활성화 관한 메소드
        const { addClassName } = this.el;

        if(this.current){
            item.classList.remove(addClassName)
        }
    };
}