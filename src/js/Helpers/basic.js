import { _tr } from '../Helpers/DomApi.js';

export default class Actives {
  /**
   * DOM에 동적으로 활성화, 비활성화 등등 자주사용되는 기능 모음
   * @type {object}
   * @param {string}
   * @example
   * super.active(event.currentTarget)
   * this.current && super.unactive(this.current);
   * */
  constructor(el) {
    this.el = el;
    this.current = null;
    this.store = { length: 0, curIdx: 0, timeId: 0 };
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

  /**
   * 활성화 관한 메소드.
   * @type {DOM}
   * @param {event | current}
   */
  active(item) {
    const { addClassName } = this.el;

    _tr(item).addClass(addClassName); //기본적인 class 추가 기능
    this.current = _tr(item);
  }
  /**
   * 비활성화 관한 메소드
   * @type {DOM}
   * @param {event | current}
   */
  unactive(item) {
    const { addClassName } = this.el;

    this.current && _tr(item).removeClass(addClassName); //기본적인 class 삭제 기능
  }

  /**
   * index 무한 반복 메소드.
   * @type {DOM, boolean, function}
   * @param {Element, loop, callback }
   */
  #indexLoop(targets, loop = false, callback) {
    if (loop && this.store.curIdx >= _tr(targets).length) this.store.curIdx = 0; //총 길이보다 크면 다시 0번째로 된다.
    // flase인 경우 (기본적으로 동작) 총 길이보다 크면 1씩 증가시키고, 현재인덱스값을 콜백인자에 전달한다.
    // true인 경우 무한 반복 기능이 취소 된다.
    this.store.curIdx >= _tr(targets).length ? clearInterval(this.store.timeId) : ((callback(this.store.curIdx), (this.store.curIdx += 1)));
  }
  /**
   * 자동 재생 메소드.
   * @type {object, function}
   * @param {options, callback}
   * @example
   * autoplay({ targets: '.list', duration: 1000, loop: true }, (i) => {
   *  인자로 받은 i를 가지고 '.list'의 DOM에 하나씩 순회하면서 접근 할수 있습니다.
   *  anis(_tr('.tab').eq(i), 0.4, { x: 10 });
   *  anis(_tr('.tab').eq(i).siblings(), 0.4, { x: 0 });
   *  return i;
   * });
   */
  autoplay(options, callback) {
    const { targets, duration, loop } = options;
    const autos = () => {
      this.#indexLoop(targets, loop, callback);
    };
    this.store.timeId = setInterval(autos, duration);
  }
}
