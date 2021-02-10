import {_tr} from '../Helpers/DomApi.js'
import {openWin, closeWinAt00} from './basic.js';
import Cookie from './app.js';

export default class otherCookie extends Cookie{
    /**
     * 체크버튼 클릭후, 닫기버튼 클릭으로 실행되는 메소드
     * @type {object}
     * @param {Options}
     *  tr.Cookie.otherCookie({
            targets: {                          // otherCookie 메서드인 경우 startEl, endEl, eventEl 있어야 합니다.
                startEl: '.close_inner-js',
                endEl: '.check', 
                eventEl:'.closeed3'
            },
            cookiename: 'SetCookie2',           // 쿠키의 전체 영역을 가르치는 id값와 같아야 합니다.
            daying: 3,                          // 오늘 하루 안보기의 (1 day) 정오 00:00 시 기준입니다.
            startdate: '2021/01/05 10:00:00',   // 시작하는 날짜와 시간
            enddate: '2021/12/31 23:00:00',     // 끝나는 날짜와 시간
        });
    */
    constructor(el) {
        super(el)
        this.el = el;
        this.store = {idx:null, current: null}
        this.otherCookie();
    }
    
    otherCookie() {
        const {cookiename, daying, startdate, enddate} = this.el;
        const {startEl, endEl, eventEl} = this.el.targets;

        const eventEls = _tr(eventEl)
        const inputCheck = _tr(startEl).find(endEl);

        eventEls.on('click', (e) => {             // closeEvent 설정
            e.preventDefault(); e.stopPropagation();
            this.store.idx = _tr(eventEl).indexOf(e.currentTarget)

            Array.from(inputCheck).reduce((acc, cur, idx) => {
                if(cur.checked){ 
                    closeWinAt00(cookiename, daying);           // 오늘 하루동안 보지 않기 체크하면, closeWinAt00('아이디', 하루) 정오 00:00 시 기준입니다.
                }
                return acc;
            },0);            
        });

        startdate && enddate ? super.cookieNameAdd(cookiename) : openWin(cookiename)  //startdate && enddate는 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다.
    };
};