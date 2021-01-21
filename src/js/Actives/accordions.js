import {_tr} from '../Helpers/DomApi.js';
// import  from '../Helpers/DomApi.js'
import Actives from '../Helpers/index.js'

export default class Accordions extends Actives {
    /**
        * @param {Options} object
        * @example
        * new tr.Accordions ({
            targets: '.item',
            event: 'click',                 // 이벤트 mouseenter와, click 2가지를 옵션으로 넣을수 있습니다.
            addClassName: 'active',         // 넣고 싶은 클랙스 명
            firstItemActive: true,          // 첫번째 아이템을 활성화 할건지 여부체크 true or false 
        });
    */
    constructor(el) {
        super(el);
        this.initHandler();
    };

    initHandler() {
        const { targets, event, firstItemActive } = this.el;
        const target = _tr(targets);
        
        const handler = (self) => { // 특정 조건에만 실행하는 함수
            this.current && super.unactive(this.current)
            super.active(self)
        };

        (() => { // 이벤트 핸들러 함수(즉시 실행)
            target.reduce((acc, cur, idx, src) => {
                cur.addEventListener (event, (e) => {
                    e.preventDefault(); e.stopPropagation();
                    handler(e.currentTarget);
                });
            },0);
            firstItemActive && handler(target[0])
        })();
    };
};


        