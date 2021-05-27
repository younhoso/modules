import { _tr } from '../Helpers/DomApi.js';
import { openWin, setCookieAt00 } from './basic.js';
import Cookie from './app.js';

export default class otherCookie extends Cookie {
  /**
     * 체크버튼 클릭후, 닫기버튼 클릭으로 실행되는 메소드
     * @type {object}
     * @param {Options}
     * new tr.otherCookie({
            targets: {                          // otherCookie 메서드인 경우 eventEl 있어야 합니다. ('닫기' element)
                eventEl:'.closeed3'
            },
            cookienameID: 'SetCookie2',         // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다.
            daying: 3,                          // 오늘 하루 안보기의 (3 day) 정오 00:00 시 기준입니다.
            startdate: '2021/02/01 10:00:00',   // 시작하는 날짜와 시간
            enddate: '2021/06/26 20:01:00',     // 끝나는 날짜와 시간
            eventClick:function(evt){
                const inputCheck = document.querySelector('.check2');
                if(inputCheck.checked) {      // 오늘 하루동안 보지 않기 체크하면, closeWinAt00(3 day) 정오 00:00 시 기준입니다.
                  this.closeWinAt00(3);
                }
            }
        });
     * 
    */
  constructor(el) {
    super(el);
    this.el = el;
    this.store = { idx: null, current: null };
    this.eventClick = this.el.eventClick.bind(this);
    this.otherCookie();
  }

  closeWinAt00(expiredays) {
      const { cookienameID } = this.el;
      setCookieAt00(cookienameID, 'done', expiredays);
      const obj = eval('window.' + cookienameID);
      obj.style.display = 'none';
  }
 
  /** 자기 자신 외의 쿠키 메소드. */
  otherCookie() {
    const { cookienameID, startdate, enddate } = this.el;
    const { eventEl } = this.el.targets;

    const eventEls = _tr(eventEl);

    eventEls.on('click', evt => {
      this.eventClick(evt);
    });
    
    /** startdate && enddate 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다. */
    startdate && enddate ? super.cookieNameAdd(cookienameID) : openWin(cookienameID);
  }
}
