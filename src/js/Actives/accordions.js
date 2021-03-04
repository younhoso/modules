import Actives from '../Helpers/basic';
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
        autoplay: 800,
        loop: true,
      });
    */
  constructor(el) {
    this.el = el;
    this.store = { ele: null, eleSib: null, self: null, targetIdx: null, gsapSelf: null, gsapSelfSib: null };
    this.initHandler();
  }
  activeItem(self) {
    this.store.gsapSelf = TweenMax.to(self, 0.4, { height: 'auto' });
  }

  unActiveItem(selfSib) {
    this.store.gsapSelfSib = TweenMax.to(selfSib, 0.4, { height: '0' });
  }

  /** 특정 조건에만 실행하는 메소드. */
  initHandler() {
    const { targets, event, firstItemActive, autoplay, loop } = this.el;
    const target = _tr(targets);
    this.store.eleSib = target.siblings().find('.tr_accordion');
    this.store.ele = target.find('.tr_accordion');

    /**  이벤트 핸들러 함수(즉시 실행) */
    (() => {
      target.reduce((acc, cur, idx, src) => {
        this.store.targetIdx = idx;
        cur.addEventListener(event, e => {
          e.preventDefault();
          e.stopPropagation();
          const _selfSib = _tr(e.currentTarget).siblings().find('.tr_accordion');
          const _self = _tr(e.currentTarget).find('.tr_accordion');

          this.unActiveItem(_selfSib);
          this.activeItem(_self);
        });
      }, 0);

      if (firstItemActive) {
        this.store.eleSib.css('height', 0);
        this.activeItem(this.store.ele[0]);
      } else if (autoplay) {
        this.store.eleSib.css('height', 0);
        Actives.autoplay(this.store.ele, autoplay, loop, i => {
          this.unActiveItem(this.store.eleSib);
          this.activeItem(this.store.ele[i]);
        });
      } else {
        this.store.eleSib.css('height', 0);
      }
    })();
  }
}
