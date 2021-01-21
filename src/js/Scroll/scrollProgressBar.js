import {cssAnimate} from '../Common/basic.js'

export default class ScrollProgressBar {
    constructor(el) {
        this.el = el;
        this.initHandler();
    }
    createProperty() {
        const scrollRealHeight = document.body.offsetHeight - window.innerHeight;        //실제로 스크롤해야될 높이값을 구합니다.
        const scrollPerecnt = pageYOffset / scrollRealHeight;                            //스크롤의 거리와 현재 위치를 기준으로 비율 계산한 값, (현재 스크롤 위치값)
        return Math.floor(scrollPerecnt * 100)                                           //스크롤의 백분율 변경하기 위해 (scrollPer * 100)계산, 소수점 제거
    };

    styleWidth() {
        const { targets } = this.el;
        const el = document.querySelector(targets);

        // el.style.width = this.createProperty() + '%';
        cssAnimate(targets, { width: this.createProperty() + '%' })
    };

    initHandler () { 
        const { ProgressBarWidth } = this.el;
        window.addEventListener('scroll', (e)=> {
            e.preventDefault(); e.stopPropagation();
            
            ProgressBarWidth && this.styleWidth();
        });
    };
};