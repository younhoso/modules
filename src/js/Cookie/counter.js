import { _tr } from '../Helpers/DomApi.js';

export default class Counter {
    constructor(el) {
        this.el = el;
        this.store = { OutTarget:null, EventEl: null, startDate: null, currentDate: null}
        this.dayD = this.dayD.bind(this);
        this.initHandler();
    };

    getTargets () {
        const {outEl, eventEl} = this.el.targets;
        this.store.OutTarget = outEl;
        this.store.EventEl = eventEl;
    };

    getStartDate() {
        const {startdate} = this.el;
        return new Date(startdate);
    };

    getCurrentDate() {
        return new Date();
    };

    dayD() {
        const compareDate = Math.round((this.getStartDate().getTime() - this.getCurrentDate().getTime()) / 1000 / 60 / 60 / 24);
        _tr('#day-count').text(compareDate);
    };
    
    initHandler() {
        this.getTargets();
    }
}