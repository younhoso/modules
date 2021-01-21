import {_tr} from '../Helpers/DomApi.js'
import { Swiper, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);

export default class Motion extends Swiper {
    constructor(el, ops) {
        super(el, ops);
        this.el = el;
        this.passedParams = ops;
        this.store = {dotEle: null}
        this.current = null;
        this.initMotion();
    }
    initMotion() {
        const {pagination} = this.passedParams
        this.store.dotEle = Array.from(_tr(pagination.el).find('.swiper-pagination-bullet'))        
        this.paginationCircle();
    }

    active(item) { // 활성화 관한 메소드
        const {addClassName} = this.passedParams.pagination

        item.classList.add(addClassName) //기본적인 class 추가 기능
        this.current = item
    };

    unactive(item) {  // 비활성화 관한 메소드
        const {addClassName} = this.passedParams.pagination
        if(this.current) item.classList.remove(addClassName) //기본적인 class 삭제 기능
    };

    paginationCircle() {
        const {dotEle} = this.store;
        const {autoplay } = this.passedParams
        const {dotcircle, strokeColor, dotColor} = this.passedParams.pagination
        let templateGroble;

        const template = function(){
            const template = `
                <svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">
                    <circle class="path" cx="8" cy="8" r="6.5" fill="none" transform="rotate(-90 8 8)" stroke="${strokeColor}" stroke-opacity="1" stroke-width="1.2px"></circle>
                    <circle cx="8" cy="8" r="3" fill="${dotColor}"></circle>
                </svg>
            `;
            templateGroble = template;
        };

        dotcircle && dotEle.forEach((el, i , arr) => {
            const handler = (self) => {
                this.current && this.unactive(this.current); //클래스 비활성화
                this.active(self); // 클래스 활성화
            };
            template();
            _tr(el).append(templateGroble)
            _tr(el).on('click', (e) => {
                e.preventDefault();
                handler(e.currentTarget);
            });

            this.active(arr[0])
        });
    }
}
