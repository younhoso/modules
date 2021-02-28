import { _tr } from '../Helpers/DomApi.js';
import Moreview from './basic.js';

export default class ServerCommunication extends Moreview {
  constructor(el) {
    super(el);
    this.store = { idIdx: 0, startIdx: 0, endIdx: 0 };
    this.el = el;
  }
}
