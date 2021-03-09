import { _tr } from '../Helpers/DomApi.js';
import { anis } from '../Helpers/common.js';
import Actives from '../Helpers/basic.js';

export default class Accordions extends Actives {
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
    super(el);
    this.el = el;
    this.store = { ele: null, eleSib: null, self: null, targetIdx: null, controlEvent: null, curIdx: 0 };
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

  /**
   * Actives클래스의 오버라이딩 (활성화 관한 메소드).
   * @type {DOM}
   * @param {event | current}
   */
  active(item) {
    const { duration } = this.el;
    super.active(item);

    anis(item, duration, { height: 'auto' });
    this.current = item;
  }

  /**
   * Actives클래스의 오버라이딩 (비활성화 관한 메소드).
   * @type {DOM}
   * @param {event | current}
   */
  unactive(item) {
    const { duration } = this.el;
    super.unactive(item);

    this.current && anis(item, duration, { height: '0' });
  }

  /** 특정 조건에만 실행하는 메소드. */
  initHandler() {
    const { targets, event, firstItemActive, autoplay, loop } = this.el;

    const items = _tr(targets).find('.tr_item');
    this.store.eleSib = items.siblings().find('.tr_accordion');
    this.store.ele = items.find('.tr_accordion');

    /**  이벤트 핸들러 함수(즉시 실행) */
    (() => {
      items.reduce((acc, cur, idx) => {
        this.store.targetIdx = idx;
        cur.addEventListener(event, e => {
          e.preventDefault();
          e.stopPropagation();
          // this.store.curIdx = target.indexOf(cur);
          this.store.controlEvent = true;

          const _selfSib = _tr(e.currentTarget).siblings().find('.tr_accordion');
          const _self = _tr(e.currentTarget).find('.tr_accordion');

          this.unactive(_selfSib);
          this.active(_self);
        });
      }, 0);

      if ('autoplay' in this.el) {
        this.store.eleSib.css('height', 0);
        super.autoplay({ targets: this.store.ele, duration: autoplay, loop: loop }, i => {
          if (this.store.controlEvent) return false;
          this.unactive(this.store.eleSib);
          this.active(this.store.ele[i]);
        });
      } else {
        this.store.curIdx = 0;
      }

      if (firstItemActive) {
        this.store.eleSib.css('height', 0);
        this.active(this.store.ele[0]);
        this.store.curIdx += 1;
      }
    })();
  }
}
