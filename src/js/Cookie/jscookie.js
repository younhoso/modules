import {_tr} from '../Helpers/DomApi.js'
import {openWin, closeWin, closeWinAt00} from './basic.js';

class Cookie {
    constructor () {
        this.store = {idx:null, current: null, sdate:null, edate:null}
    }
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

    otherCookie(options) {
        const {cookiename, daying, startdate, enddate} = options;
        const {startEl, endEl, eventEl} = options.targets;

        this.store.sdate = new Date(startdate);
        this.store.edate = new Date(enddate);

        const eventEls = document.querySelector(eventEl)
        const [inputCheck] = _tr(startEl).find(endEl);

        eventEls.addEventListener('click', (e) => {             // closeEvent 설정
            e.preventDefault(); e.stopPropagation();
            this.store.idx = _tr(eventEl).indexOf(e.currentTarget)

            if(inputCheck.checked){  
                closeWinAt00(cookiename, daying);           // 오늘 하루동안 보지 않기 체크하면, closeWinAt00('아이디', 하루) 정오 00:00 시 기준입니다.
            } else {
                closeWinAt00(cookiename, 0);
            }
        });

        startdate === enddate ? openWin(cookiename) : this.#cookie_add(cookiename)  //startdate === enddate는 값이 같다는 것이 아니라, 값이 존재하냐 안 하냐에 따라서 Boolean으로 사용한다.
    };
};

export default new Cookie();