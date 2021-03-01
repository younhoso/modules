import { _tr } from '../Helpers/DomApi.js';
import { TweenMax } from 'gsap/all';

export default class Accordions {
  /**
    * @param {Options | object}
    * @example
    * new tr.Accordions ({
        targets: '.item',
        event: 'click',                 // 이벤트 mouseenter와, click 2가지를 옵션으로 넣을수 있습니다.
        addClassName: 'active',         // 넣고 싶은 클랙스 명
        firstItemActive: true,          // 첫번째 아이템을 활성화 할건지 여부체크 true or false 
      });
    */
  constructor(el) {
    this.el = el;
    this.store = { ele: null, eleSib: null, self: null };
    this.initHandler();
  }
  /** 특정 조건에만 실행하는 메소드. */
  initHandler() {
    const { targets, event, firstItemActive } = this.el;
    const target = _tr(targets);
    this.store.eleSib = target.siblings().find('.tr_accordion');
    this.store.ele = target.find('.tr_accordion');

    (() => {
      /**  이벤트 핸들러 함수(즉시 실행) */
      target.reduce((acc, cur, idx, src) => {
        cur.addEventListener(event, e => {
          e.preventDefault();
          e.stopPropagation();
          const _selfSib = _tr(e.currentTarget).siblings().find('.tr_accordion');
          const _self = _tr(e.currentTarget).find('.tr_accordion');

          TweenMax.to(_selfSib, { height: '0' });
          TweenMax.to(_self, { height: 'auto' });
        });
      }, 0);

      firstItemActive ? (this.store.eleSib.css('height', 0), this.store.ele.eq(0).css('height', 'auto')) : this.store.ele.css('height', 0);
    })();
  }
}
