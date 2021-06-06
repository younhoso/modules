import Cookies from 'js-cookie';
import { _tr } from '../Helpers/DomApi.js';
import { openWinCookie, dataAttrCookie } from './basic.js';
import Cookie from './app.js';

export default class selfCookie extends Cookie {
  /**
     * 체크버튼 기준으로 실행되는 메소드
     * @type {object}
     * @param {*}
     * @example 
     * const myc01 = new tr.selfCookie({
          eventEl:'.closeed1'                 // 이벤트 타켓(필수 값)
          cookienameID: 'SetCookie1',         // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다. (필수 값)
          daying: 4,                          // 오늘 하루 안보기의 (2 day) 정오 00:00 시 기준입니다. (기본값 1일(옵션한 값))
          dataKey: 'darks',                   // 엘리먼트 요소에 'data-'요소로 들어가는 key값과 동일하게 넣어주세요.(옵션한 값))
          startdate: '2021/02/01',            // 시작하는 날짜와 시간 (옵션한 값)
          enddate: '2021/06/02',              // 끝나는 날짜와 시간 (옵션한 값)
      });
    */
  constructor(el) {
    super(el);
    this.el = el;
    this.store = { current: null };
    this.selfCookie();
  }
  /** 자기 자신의 쿠키 메소드. */
  selfCookie() {
    const { cookienameID, dataKey, daying = 1, startdate, enddate, startTime, endTime} = this.el;
    const { eventEl } = this.el;
    const eventEls = document.querySelector(eventEl);

    eventEls.addEventListener('click', e => {
      Cookies.set(cookienameID, 'done', { expires: daying })
      openWinCookie(cookienameID)
      dataAttrCookie(cookienameID, dataKey);
    });

    if(startdate && enddate){
      this.el.hasOwnProperty('startdate') && this.el.hasOwnProperty('enddate') ? super.cookieNameAdd(cookienameID) : (openWinCookie(cookienameID), dataKey && dataAttrCookie(cookienameID, dataKey));
    }

    if(startTime && endTime){
      this.el.hasOwnProperty('startTime') && this.el.hasOwnProperty('endTime') ? super.setTimeAdd(cookienameID) : (openWinCookie(cookienameID), dataKey && dataAttrCookie(cookienameID, dataKey));
    }
  }
}
