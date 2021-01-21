import {_tr} from '../Helpers/DomApi.js'
import Actives from '../Helpers/index.js'

export default class Tabs extends Actives {
    /**
     * @param {}
     */
    constructor(el, current) {
        super(el, current);
        this.store = {idx: null, target: null, addClassName: null, PrevValue: null};
        this.initHandler();
    };
    ValueChang (self) {
        const { findTargets, prop, unactiveValue, activeValue} = this.el.addChild;

        _tr(self).find(findTargets).attr(prop, activeValue); //속성 활성화    
        _tr(self).siblings().find(findTargets).attr(prop, unactiveValue); //속성 이전 활성화
    }
    initHandler() {
        const { targets, addClassName, firstItemActive } = this.el;
        this.store.target = _tr(targets);
        this.store.addClassName = addClassName;
        
        const handler = (self) => {
            this.current && super.unactive(this.current); //클래스 비활성화
            super.active(self); // 클래스 활성화

            this.el.addChild && this.ValueChang(self);
            this.store.idx = _tr(targets).indexOf(self)
        };

        (() => {
            this.store.target.on('click', (e) => {
                e.preventDefault();
                handler(e.currentTarget);
            });
        })();
        firstItemActive && handler(this.store.target[0])
    };
};
        