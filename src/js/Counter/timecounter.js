import { _tr } from '../Helpers/DomApi.js';
import Counter from './basic.js';

export default class Timecounter extends Counter {
    /**
     *  @param {Options | object}
     * 
     */
    constructor(el) {
        super(el)
        this.el = el;
        this.setTimeAdd();
    };

    defaultload(state){
        const {endTargets, template} = this.el;
        const el = document.querySelector(endTargets);
        el.innerHTML = template(state)
    }

    dataAttrSet(dataVal, val = 'false'){
        const { targets } = this.el;
        const el = document.querySelector(targets);
        el.dataset[dataVal] = val;
    };

    /**
     * setTimeAdd 옵션값 startTime, endTime 값이 있을경우에 사용되는 메소드.
     * @type {object}
   */
     setTimeAdd(){
        const { dataKey, startTime, endTime } = this.el;
        const now = new Date();
        const nowHour = now.getHours();
        const nowMinutes = now.getMinutes();

        const stoar = new Date(`${now.toLocaleDateString()} ${startTime}`); //사용자로부터 시간을 설정 받는다. 
        const etoar = new Date(`${now.toLocaleDateString()} ${endTime}`); //사용자로부터 시간을 설정 받는다.

        const shour = stoar.getHours(); 
        const sMinutes = stoar.getMinutes(); 

        const ehour = etoar.getHours();
        const eMinutes = etoar.getMinutes();

        if((nowHour >= shour && nowHour < ehour)){
            if((nowMinutes >= sMinutes) && ((nowMinutes <= eMinutes) || (nowMinutes >= eMinutes))) {
                this.dataAttrSet(dataKey, true);
                this.defaultload(true)
            } else {
                this.dataAttrSet(dataKey, false);
                this.defaultload(false)
            }
        } else {
            this.dataAttrSet(dataKey, false);
            this.defaultload(false)
        }
    }
}