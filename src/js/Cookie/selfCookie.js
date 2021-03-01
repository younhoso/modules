import { _tr } from '../Helpers/DomApi.js';
import { openWin, closeWinAt00 } from './basic.js';
import Cookie from './app.js';

export default class selfCookie extends Cookie {
  /**
     * 체크버튼 기준으로 실행되는 메소드
     * @type {object}
     * @param {*}
     * @example 
     *  tr.Cookie.selfCookie({
            targets: {                          // selfCookie 메서드인 경우 eventEl만 있으면 됩니다.
                eventEl:'.closeed1'             
            },
            cookiename: 'SetCookie0',           // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다.
            daying: 1,                          // 오늘 하루 안보기의 (3 day) 정오 00:00 시 기준입니다.
            startdate: '2021/01/16 23:05:00',   // 시작하는 날짜와 시간
            enddate: '2021/12/19 23:45:00',     // 끝나는 날짜와 시간
        });

        tr.Cookie.selfCookie({
            targets: {
                eventEl:'.closeed2'
            },
            cookiename: 'SetCookie1',           // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다.
            daying: 1                           // 오늘 하루 안보기의 (1 day) 정오 00:00 시 기준입니다.
        });
    */
  constructor(el) {
    super(el);
    this.el = el;
    this.store = { idx: null, current: null };
    this.selfCookie();
  }
  /** 자기 자신의 쿠키 메소드. */
  selfCookie() {
    const { cookiename, daying, startdate, enddate } = this.el;
    const { eventEl } = this.el.targets;

    const eventEls = document.querySelector(eventEl);
    eventEls.addEventListener('click', e => {
      // closeEvent 설정
      e.preventDefault();
      e.stopPropagation();
      this.store.idx = _tr(eventEl).indexOf(e.currentTarget);
      closeWinAt00(cookiename, daying); // closeWinAt00('아이디', 하루) 정오 00:00 시 기준입니다.
    });

    startdate && enddate ? super.cookieNameAdd(cookiename) : openWin(cookiename); // startdate && enddate는 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다.
  }
}
