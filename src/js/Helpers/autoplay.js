import { _tr } from '../Helpers/DomApi.js';

class Autoplay {
  /**
   * @type {object, function}
   * @param {Options, callback}
   * @example
   * autoplay({ targets: '.list', duration: 1000, loop: true }, (i) => {
   *  인자로 받은 i를 가지고 '.list'의 DOM에 하나씩 순회하면서 접근 할수 있습니다.
   *  anis(_tr('.tab').eq(i), 0.4, { x: 10 });
   *  anis(_tr('.tab').eq(i).siblings(), 0.4, { x: 0 });
   *  return i;
   * });
   */
  constructor(el, callback) {
    this.el = el;
    this.callback = callback;
    this.store = { timeId: null, curIdx: 0 };
    this.initHandler();
  }

  get callback() {
    return this._callback;
  }

  set callback(value) {
    if (!value) {
      throw Error('callback 옵션은 필수입니다. callback은 각 항목을 순회하면서 애니메이션 등을 넣을 수 있습니다.');
    }
    this._callback = value;
  }
  /** index 무한 반복 메소드. */
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
    const { targets, duration, loop } = this.el;
    const autos = () => {
      this.#indexLoop(targets, loop, this.callback);
    };
    this.store.timeId = setInterval(autos, duration);
  }
}

export const autoplay = (el, callback) => new Autoplay(el, callback);
