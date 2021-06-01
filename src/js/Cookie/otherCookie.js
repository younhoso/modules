import Cookies from 'js-cookie';
import { _tr } from '../Helpers/DomApi.js';
import { openWinCookie, dataAttrCookie } from './basic.js';
import Cookie from './app.js';

export default class otherCookie extends Cookie {
  /**
     * 체크버튼 클릭후, 닫기버튼 클릭으로 실행되는 메소드
     * @type {object}
     * @param {Options}
     *  new tr.otherCookie({
            targets: {
                checkEl: '.check2',             // 체크 타켓(필수 값)
                eventEl:'.closeed2'             // 이벤트 타켓(필수 값)
            },
            cookienameID: 'SetCookie2',         // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다. (필수 값)
            daying: 3,                          // 오늘 하루 안보기의 (3 day) 정오 00:00 시 기준입니다.(기본값 1일(옵션한 값))
            dataKey: 'darks',                   // 엘리먼트 요소에 'data-'요소로 들어가는 key값과 동일하게 넣어주세요.(옵션한 값))
            startdate: '2021/02/01 10:00:00',   // 시작하는 날짜와 시간 (옵션한 값)
            enddate: '2021/06/02 20:01:00'      // 끝나는 날짜와 시간 (옵션한 값)
        });
     * 
    */
  constructor(el) {
    super(el);
    this.el = el;
    this.store = { idx: null, current: null };
    this.otherCookie();
  }
 
  /** 자기 자신 외의 쿠키 메소드. */
  otherCookie() {
    const { cookienameID, dataKey, daying = 1, startdate, enddate } = this.el;
    const { checkEl, eventEl } = this.el.targets;
    const eventEls = _tr(eventEl);
    const inputCheck = document.querySelector(checkEl);
      eventEls.on('click', evt => {
        if(inputCheck.checked) {
          const { cookienameID } = this.el;
          Cookies.set(cookienameID, 'done', { expires: daying })
          openWinCookie(cookienameID);
          dataAttrCookie(cookienameID, dataKey);
        }
      });
    
    startdate && enddate ? super.cookieNameAdd(cookienameID) : openWinCookie(cookienameID);
    dataKey && dataAttrCookie(cookienameID, dataKey);
  }
}
