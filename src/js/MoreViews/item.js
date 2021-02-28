import { _tr } from '../Helpers/DomApi.js';
import Moreview from './basic.js';

export default class Item extends Moreview {
  constructor(el) {
    super(el);
    this.store = { idIdx: 0, startIdx: 0, endIdx: 0, totalNum: 0 };
    this.initHandler();
  }
  /**
   * 첫 렌더링 시점에 기본적으로 각 아이템에 클래스를 추가하고, 넘어온 template를 뿌려주는 메소드.
   */
  defaultload() {
    const { startEl, endEl, eventEl } = this.el.targets;
    const { additems, addClassName, template } = this.el;
    const eles = _tr(startEl).find(endEl);
    const eventEls = _tr(eventEl)[0];
    eles.forEach((ele, idx) => {
      if (idx + 1 > additems) {
        ele.classList.add(addClassName);
      }
    });

    this.store.totalNum = eles.length;
    eventEls.innerHTML = template(0, additems, this.store.totalNum);
  }

  /**
   * 아이템 활성화 관한 메소드.
   * @type {object}
   * @param {eventcurrent}
   */
  activeItem(item) {
    super.active(item);
    const { startEl, endEl } = this.el.targets;
    let { additems, addClassName, template } = this.el;
    const eles = _tr(startEl).find(endEl);
    const totalIdx = parseInt(item.querySelector('.total').innerHTML);
    let currentIdx = parseInt(item.querySelector('.current').innerHTML);

    if (currentIdx >= totalIdx) return false;
    if (currentIdx > additems) {
      this.store.startIdx = this.store.endIdx;
    } else {
      this.store.startIdx = additems;
    }
    this.store.endIdx = this.store.startIdx + additems;

    eles.forEach((ele, idx) => {
      if (idx + 1 >= this.store.startIdx && idx < this.store.endIdx) {
        ele.classList.remove(addClassName);
      }
    });

    currentIdx += additems;
    this.store.idIdx += 1;

    if (currentIdx >= eles.length) {
      item.innerHTML = template(this.store.idIdx, totalIdx, totalIdx, addClassName);
      return false;
    }
    item.innerHTML = template(this.store.idIdx, currentIdx, totalIdx);
  }

  /**
   * 특정 조건에만 실행만하는 메소드.
   */
  initHandler() {
    this.defaultload();
    const { eventEl } = this.el.targets;
    const eventE = document.querySelector(eventEl);

    const handler = self => {
      this.activeItem(self);
    };

    (() => {
      eventE.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        handler(e.currentTarget);
      });
    })();
  }
}
