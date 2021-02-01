import {_tr} from '../Helpers/DomApi.js'
import Actives from '../Helpers/basic.js'

export default class Moreview extends Actives {
    constructor (el) {
        super(el)
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

    active(item){
        super.active(item)
    }
    unactive(item){
        this.current && super.unactive(item)
    }
};