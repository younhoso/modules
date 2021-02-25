import { _tr } from '../Helpers/DomApi.js';

export default class Pageing {
  constructor(el) {
    this.el = el;
    this.store = {};
  }
  defaultload() {}
  /**
   * 특정 조건에만 실행만하는 메소드.
   */
  initHandler() {}
}
