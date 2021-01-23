import {_tr} from '../Helpers/DomApi.js'
import {openWin, closeWin, closeWinAt00} from './basic.js';

class Cookie {
    constructor () {
        this.store = {idx:null, current: null, sdate:null, edate:null}
    }
    /**
     * 현재 날짜와, 사작날짜 && 끝나는 날짜를 비교해서 cookiename을 념겨주는 메소드
     * @private
     * @param {string | number} 
     */
    #cookie_add(cookiename) {
        const {sdate, edate} = this.store;
        (() => {
            if(Date.now() >= sdate && Date.now() <= edate){
                openWin(cookiename);
            } else {
                closeWin(cookiename, 0);
            }    
        })();
    };
    
    /**
     * 체크버튼 기준으로 실행되는 메소드
     * @type {object}
     * @param {*} options
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
    selfCookie(options) {
        const {cookiename, daying, startdate, enddate} = options;
        const {eventEl} = options.targets;

        this.store.sdate = new Date(startdate);
        this.store.edate = new Date(enddate);

        const eventEls = document.querySelector(eventEl)
        eventEls.addEventListener('click', (e) => {             // closeEvent 설정
            e.preventDefault(); e.stopPropagation();
            this.store.idx = _tr(eventEl).indexOf(e.currentTarget)
            closeWinAt00(cookiename, daying);                   // closeWinAt00('아이디', 하루) 정오 00:00 시 기준입니다.
        });

        startdate === enddate ? openWin(cookiename) : this.#cookie_add(cookiename)  //startdate === enddate는 값이 같다는 것이 아니라, 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다.
    };

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
    otherCookie(options) {
        const {cookiename, daying, startdate, enddate} = options;
        const {startEl, endEl, eventEl} = options.targets;

        this.store.sdate = new Date(startdate);
        this.store.edate = new Date(enddate);

        const eventEls = _tr(eventEl)
        const inputCheck = _tr(startEl).find(endEl);

        eventEls.on('click', (e) => {             // closeEvent 설정
            e.preventDefault(); e.stopPropagation();
            this.store.idx = _tr(eventEl).indexOf(e.currentTarget)

            Array.from(inputCheck).reduce((acc, cur, idx) => {
                if(cur.checked){ 
                    closeWinAt00(cookiename, daying);           // 오늘 하루동안 보지 않기 체크하면, closeWinAt00('아이디', 하루) 정오 00:00 시 기준입니다.
                } else {
                    closeWinAt00(cookiename, 0);
                }
                return acc;
            },0);            
        });

        startdate === enddate ? openWin(cookiename) : this.#cookie_add(cookiename)  //startdate === enddate는 값이 같다는 것이 아니라, 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다.
    };
};

export default new Cookie();