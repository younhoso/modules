import { _tr } from '../Helpers/DomApi.js';
import Actives from '../Helpers/basic.js';

export default class Tabprops extends Actives{
    /**
     * @param {Options | object}
     * @example
     * const my = new tr.Tabprops({
            targets: '.tab_js',
            addClassName: 'actives',      // 넣고 싶은 클랙스 명
            firstItemActive: false,       // 첫번째 아이템을 활성화 할건지 여부체크 true or false (기본값 false 입니다.)
            addChild: {
                findTargets : 'img',
                prop : 'src',                 // 속성들중에 원하는 속성 이름.
                unactiveValue: './imgs/Group2.png',    // 비황성화 경로 넣으세요.
                activeValue: './imgs/Group1.png'   // 활성화 하고싶은 경로 넣으세요.
            }
        });
     */
    constructor(el) {
        super(el);
        this.el = el;
        this.initTabprops();
    }

    /**
     * 특정 엘리먼트 속성 값을 바꿔주는 메소드.
     * @param {HTMLElement} this event handler.
    */
    valueChang(self) {
        const { findTargets, prop, unactiveValue, activeValue } = this.el.addChild;
        _tr(self).find(findTargets).attr(prop, activeValue); //속성 활성화
        _tr(self).siblings().find(findTargets).attr(prop, unactiveValue); //속성 이전 활성화
    }

    /** 특정 조건에만 실행만하는 메소드. */
    initTabprops() {
        const { targets, firstItemActive } = this.el;

        const handler = (self) => {
            super.unactive(this.current); //클래스 비활성화
            super.active(self); // 클래스 활성화
            this.el.addChild && this.valueChang(self);
        };

        _tr(targets).on('click', (e) => {
            e.preventDefault();
            handler(e.currentTarget);
        });

        firstItemActive && handler(_tr(targets)[0]);
    }
}