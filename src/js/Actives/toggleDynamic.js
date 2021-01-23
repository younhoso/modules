import {_tr} from '../Helpers/DomApi.js'
import Actives from '../Helpers/index.js'

export default class ToggleDynamic extends Actives{
    /**
     * @type {object}
     * @param {Options}
     * @example
     * const my = new tr.ToggleDynamic({
            targets: {
                startEl: '.faq_inner',
                endEl: '.faq_item',
                eventEl: '.btn',
            },
            addClassName: 'active'
        });
     */
    constructor(el) {
        super(el);
        this.initHandler()
    };
    /**
     * 특정 조건에만 실행하는 메소드
     */
    initHandler() {
        const {startEl, endEl, eventEl} = this.el.targets;
        const _evnEl = _tr(eventEl);

        const handler = (self) => {
            const listInner = _tr(endEl).closest(startEl)[0];
            super.toggle(listInner);
            super.toggle(self);
        };
        /**
         * 이벤트 핸들러 함수(즉시 실행)
         */
        (() => { 
            _evnEl.reduce((arr, cur, idx, src) => {
                cur.addEventListener('click', (e) => {
                    e.preventDefault();
                    handler(e.currentTarget);
                });
            },0);
        })();
    };
};