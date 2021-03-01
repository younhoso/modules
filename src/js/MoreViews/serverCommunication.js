import { _tr } from '../Helpers/DomApi.js';
import Moreview from './basic.js';

export default class ServerCommunication extends Moreview {
  constructor(el) {
    super(el);
    this.store = { idIdx: 0, startIdx: 0, endIdx: 0 };
    this.el = el;
    this.initHandler();
  }

  /**
   * 특정 조건에만 실행만하는 메소드.
   */
  initHandler() {
    const { startEl, endEl, eventEl } = this.el.targets;

    _tr(endEl).on('click', function (e) {
      console.log(_tr(startEl).nextAll(endEl).css('color', 'red'));
    });
  }
}
