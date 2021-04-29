import { _tr } from '../Helpers/DomApi.js';
import Counter from './basic.js';

export default class Daycounter extends Counter {
    /**
     * 
     * @param {*} el 
     * const count = new tr.Daycounter({
            startdate: '2021-04-25T24:00:00', // 사작하고자 하는 날짜 및 시간(필수 입력값)
            enddate : '2021-04-30T24:00:00'  // 끝나고자 하는 날짜 및 시간(필수 입력값)
        });

        count.statdayD()    startdate Property 값 기준으로 몇일 지났는지 알려주는 메소드.
        count.enddayD()     enddate Property 값 기준으로 몇일 남았는지 알려주는 메소드.
        count.startdayH()   startdate Property 값 기준으로 몇시간 지났는지 알려주는 메소드.
        count.enddayH()     enddate Property 값 기준으로 몇시간 남았는지 알려주는 메소드.
        count.startDayM()   startdate Property 값 기준으로 몇분 지났는지 알려주는 메소드.
        count.endDayM()     enddate Property 값 기준으로 몇분 남았는지 알려주는 메소드.
        count.startDayS()   startdate Property 값 기준으로 몇초 지났는지 알려주는 메소드.
        count.endDayS()     enddate Property 값 기준으로 몇초 남았는지 알려주는 메소드.
     */
    constructor(el) {
        super(el)
        this.el = el;
    };

    /** 시작 기준의 day 구하는 메소드. (몇일 지났는지 알려준다.)*/
    statDayD() {
        return Math.floor(super.starCalculate()/(60*60*1000*24)*1)+1;
    };

    /** 끝 기준의 day 구하는 메소드. (몇일 남았는지 알려준다.) */
    endDayD() {
        return Math.floor(super.endCalculate()/(60*60*1000*24)*1);
    };

    /** 시작 기준의 시간를 구하는 메소드. (몇시간 지났는지 알려준다.) */
    startDayH() {
        return Math.floor((super.starCalculate()%(60*60*1000*24))/(60*60*1000)*1);
    };

    /** 끝 기준의 시간를 구하는 메소드. (몇시간 남았는지 알려준다.) */
    endDayH() {
        return Math.floor((super.endCalculate()%(60*60*1000*24))/(60*60*1000)*1);
    };

    /** 시작 기준의 분를 구하는 메소드. (몇분 지났는지 알려준다.) */
    startDayM() {
        return Math.floor(((super.starCalculate()%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    };

    /** 끝 기준의 분를 구하는 메소드. (몇분 남았는지 알려준다.)*/
    endDayM() {
        return Math.floor(((super.endCalculate()%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    };

    /** 시작 기준의 초를 구하는 메소드. (몇초 지났는지 알려준다.) */
    startDayS() {
        return Math.floor((((super.starCalculate()%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
    };

    /** 끝 기준의 초를 구하는 메소드. (몇초 남았는지 알려준다.) */
    endDayS() {
        return Math.floor((((super.endCalculate()%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
    };
}