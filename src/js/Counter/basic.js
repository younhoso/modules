import { _tr } from "../Helpers/DomApi";

export default class Counter {
    constructor(el) {
        this.el = el;
        this._startdate = el.startdate;
        this._enddate = el.enddate;
    };

    /** 시작하는 지점을 나타내는 Date 객체를 생성하는 메소드. */
    get getStartDate() {
        if(!this._startdate){
            throw Error('The startdate property value is a required value.');
        }
        return new Date(this._startdate);
    };

     /** 끝나는 지점을 나타내는 Date 객체를 생성하는 메소드. */
    get getEndDate() {
        if(!this._enddate){
            throw Error('The enddate property value is a required value.');
        }
        return new Date(this._enddate);
    };

    /** 시작 기준의 연산 메소드.*/
    starCalculate() {
        return new Date() - this.getStartDate
    }

    /** 끝 기준의 연산 메소드.*/
    endCalculate() {
        return this.getEndDate - new Date();
    }
}