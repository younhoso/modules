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
    this.store = { length: 0 };
  }
  /**
   * 기본적인 인덱스번째 실행
   */
  static indexDefault() {
    const { targets } = this.el;
    if (this.store.currentIndex < 0) this.store.currentIndex = 0; //총 길이보다 작으면 멈춘다.
    if (this.store.currentIndex > this.store.length) this.store.currentIndex = this.store.length; //총 길이보다 크면 멈춘다.

    const arrItem = Array.from(document.querySelectorAll(targets));
    this.store.length = arrItem.length - 1;
  }
  /**
   * 인덱스번째 무한 반복 실행
   */
  static indexLoop(target, idx) {
    // const { targets } = this.el;
    let length = 0,
      currentIndex = 0;

    if (idx < 0) currentIndex = length; //총 길이보다 작으면 다시 가장 마지막번째가 된다.
    if (idx > length) currentIndex = 0; //총 길이보다 크면 다시 0번째로 된다.

    const arrItem = Array.from(target);
    length = arrItem.length - 1;
    console.log(arrItem);
    return currentIndex;
  }
  /**
   * 활성화 관한 메소드
   * @type {object}
   * @param {eventcurrent}
   */
  active(item) {
    const { addClassName } = this.el;

    item.classList.add(addClassName); //기본적인 class 추가 기능
    this.current = item;
  }
  /**
   * 비활성화 관한 메소드
   * @type {object}
   * @param {eventcurrent}
   */
  unactive(item) {
    const { addClassName } = this.el;

    this.current && item.classList.remove(addClassName); //기본적인 class 삭제 기능
  }
  /**
   * 자동실행, loop 관한 메소드(static 메소드).
   * @type {(object | Array), Number, boolean, callback}
   * @param {Elements, autoplay, loop, callback}
   */
  static autoplay(item, autoplay, loop, callback) {
    let timeId;
    let n = 0;

    const autos = () => {
      if (loop && n >= item.length) n = 0;
      n >= item.length ? clearInterval(timeId) : (callback(n), n++);
    };

    timeId = setInterval(autos, autoplay);
  }
}
