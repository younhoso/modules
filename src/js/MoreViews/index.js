import {_tr} from '../Helpers/DomApi.js'

export default class Moreview {
    constructor (el) {
        this.el = el;
        this.additems = el;
    };

    get additems() {
        return this._additems;
    };

    set additems(value) {
        const { startEl, endEl } = this.el.targets;
        const eles = _tr(startEl).find(endEl);

        if(value.additems <= 0) { throw Error ('You must put at least 1 value.'); }
        if(value.additems >= eles.length) {throw Error ('You cannot put a value equal to or greater than the number of contents.')}
        this._additems = value.additems;
    };

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
};