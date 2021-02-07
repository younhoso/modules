import {_tr} from '../Helpers/DomApi.js'
import Actives from '../Helpers/basic.js'
import { TweenMax } from "gsap/all";

export default class Tabs extends Actives {
    /**
     * @param {Options | object}
     * @example
     * const my = new tr.Tabs({
            targets: '.tab_js',
            addClassName: 'actives',      // 넣고 싶은 클랙스 명
            firstItemActive: true,        // 첫번째 아이템을 활성화 할건지 여부체크 true or false
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
        this.store = {idx: null, target: null, addClassName: null, PrevValue: null};
        this.initHandler();
    };
    /**
     * 특정 엘리먼트 속성 값을 바꿔주는 메소드
     * @param {HTMLElement} this event handler.
     */
    ValueChang (self) {
        const { findTargets, prop, unactiveValue, activeValue} = this.el.addChild;
        _tr(self).find(findTargets).attr(prop, activeValue); //속성 활성화    
        _tr(self).siblings().find(findTargets).attr(prop, unactiveValue); //속성 이전 활성화
    }
    /**
     * 특정 조건에만 실행하는 메소드
     */
    initHandler() {
        const { targets, addClassName, lineAnime } = this.el;
        this.store.target = _tr(targets);
        this.store.addClassName = addClassName;
        
        const lineTemplate = () => `<i class="line_item"></i>`;

        const line = _tr(lineAnime.targets);
        line.html(lineTemplate());
        
        const handler = (self) => {
            this.current && super.unactive(this.current); //클래스 비활성화
            super.active(self); // 클래스 활성화
            this.store.idx = _tr(targets).indexOf(self)
            this.el.addChild && this.ValueChang(self);
        };

        (() => {
           const w = this.store.target[0].clientWidth;
            _tr('.line_item').css({'width': w + 'px'})

            this.store.target.on('click', (e) => {
                e.preventDefault();
                handler(e.currentTarget)
                TweenMax.to('.line_item', {x: w * this.store.idx})
            });
        })();
        handler(this.store.target[0])
    };
};
        