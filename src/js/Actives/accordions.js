import { _tr } from '../Helpers/DomApi.js';
import { anis } from '../Helpers/common.js';

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
    this.store = { ele: null, eleSib: null, self: null, targetIdx: null, curIdx: 0 };
    this.initHandler();
  }

  #autoplay(item, autoplay, loop, callback) {
    let timeId;

    const autos = () => {
      if (loop && this.store.curIdx >= item.length) this.store.curIdx = 0;
      this.store.curIdx >= item.length ? clearInterval(timeId) : (callback(this.store.curIdx), this.store.curIdx++);
    };

    timeId = setInterval(autos, autoplay);
  }

  /** 특정 조건에만 실행하는 메소드. */
  initHandler() {
    const { targets, event, duration, firstItemActive, autoplay, loop } = this.el;

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
          this.store.curIdx = target.indexOf(cur);
          // console.log(this.store.curIdx);

          anis(_selfSib, duration, { height: '0' });
          anis(_self, duration, { height: 'auto' });
        });
      }, 0);

      if ('autoplay' in this.el) {
        this.#autoplay(this.store.ele, autoplay, loop, () => {
          anis(this.store.eleSib, duration, { height: '0' });
          anis(this.store.ele[this.store.curIdx], duration, { height: 'auto' });
          console.log(this.store.curIdx);
        });
      } else {
        this.store.curIdx = 0;
      }

      if (firstItemActive) {
        this.store.eleSib.css('height', 0);
        anis(this.store.ele[0], duration, { height: 'auto' });
        this.store.curIdx += 1;
      }
    })();
  }
}
