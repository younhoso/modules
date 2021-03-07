import { _tr } from '../Helpers/DomApi.js';

class Autoplay {
  /**
 * 
 * @param {Options | object}
 * @example
 *  autoplay({
      targets: '.list',
      duration: 1000,
      loop: true,
      callback: i => {
        console.log(i);
      },
    });
 */
  constructor(el) {
    this.el = el;
    this.curIdx = el;
    this.store = { timeId: null, curIdx: 0 };
    this.initHandler();
  }

  get curIdx() {
    return this._curIdx;
  }

  set curIdx(value) {
    value.forEach(element => {
      const { callback } = element;
      if (!callback) {
        throw Error('callback 옵션은 필수 입니다.');
      }
    });
  }
  /** 인덱스번째 무한 반복 메소드. */
  #indexLoop(targets, loop, callback) {
    if (loop && this.store.curIdx >= _tr(targets).length) this.store.curIdx = 0; //총 길이보다 크면 다시 0번째로 된다.
    // flase인 경우 (기본적으로 동작) 총 길이보다 크면 1씩 증가시키고, 현재인덱스값을 콜백인자에 전달한다.
    // true인 경우 무한 반복 기능이 취소 된다.
    this.store.curIdx >= _tr(targets).length ? clearInterval(this.store.timeId) : (callback(this.store.curIdx), (this.store.curIdx += 1));
  }

  /**
   * 자동실행, loop 관한 메소드(static 메소드).
   * @type {(object | Array), Number, boolean, callback}
   * @param {Elements, plays, loop, callback}
   */
  initHandler() {
    this.el.forEach(element => {
      const { targets, duration, loop, callback } = element;
      const autos = () => {
        this.#indexLoop(targets, loop, callback);
      };

      this.store.timeId = setInterval(autos, duration);
    });
  }
}

export const autoplay = (...el) => new Autoplay(el);
