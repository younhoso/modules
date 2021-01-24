import {_tr} from '../Helpers/DomApi.js'
import { Swiper, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);

export default class Motion extends Swiper {
    /**
     * Swiper 커스텀마이징
     * @type {object}
     * @param {string}
     * @param {Options}
     * @example
     * new tr.Motion('.swiper-container', {
     *  speed: 400,
        loop: true,
        flipEffect: {
            rotate: 30,
            slideShadows: false,
        },
        
        // 페이지 매김이 필요한 경우
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dotcircle: true,
            addClassName: 'dotcircle',
            strokeColor : '#007aff',
            dotColor : '#000'
        },

        // 탐색 화살표
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
     * });
     */
    constructor(el, ops) {
        super(el, ops);
        this.el = el;
        this.passedParams = ops;
        this.store = {ele: null, slideEle: null, dotEle: null}
        this.current = null;
        this.#initMotion();
    };
    /**
     * Motion의 초기화 작업 
     */
    #initMotion() {
        const {pagination} = this.passedParams
        this.store.ele = Array.from(_tr(this.el));
        this.store.slideEle = Array.from(_tr(this.el).find('.swiper-slide'));
        this.store.dotEle = Array.from(_tr(pagination.el).find('.swiper-pagination-bullet'));
        this.#pageOnCircle();
    };

    /**
     * 활성화 관한 메소드
     * @param {object} 현재 활성화된 이벤트 객체
     */
    #active(item) {
        const {addClassName} = this.passedParams.pagination

        item.classList.add(addClassName) //기본적인 class 추가 기능
        this.current = item
    };

    /**
     * 비활성화 관한 메소드
     * @param {object} 현재 비활성화된 이벤트 객체
     */
    #unactive(item) {
        const {addClassName} = this.passedParams.pagination
        if(this.current) item.classList.remove(addClassName) //기본적인 class 삭제 기능
    };

    /**
     * dotcircle 기능 구현
     */
    #pageOnCircle() {
        const {dotEle} = this.store;
        const {autoplay } = this.passedParams
        const {dotcircle, strokeColor, dotColor} = this.passedParams.pagination

        const template = function(idx){
            return `
                <svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">
                    <circle class="path" cx="8" cy="8" r="6.5" fill="none" transform="rotate(-90 8 8)" stroke="${strokeColor}" stroke-opacity="1" stroke-width="1.2px">${idx+1}</circle>
                    <circle cx="8" cy="8" r="3" fill="${dotColor}"></circle>
                </svg>
            `;
        };
        
        /** 
         * 활성화, 비활성화 되는 함수 
         * @param {HTMLElement}
        */
        const handler = (self) => {
            this.current && this.#unactive(this.current); //클래스 비활성화
            this.#active(self); // 클래스 활성화
        };

        dotcircle && dotEle.reduce((acc, cur, idx, arr) => {
            cur.innerHTML = template(idx);

            /** dot클릭 이벤트 */
            _tr(cur).on('click', (e) => handler(e.currentTarget) );
            
            /** Swiper의 마우스 slideChange 이벤트 */
            this.on('slideChange', (e) => cur.classList.contains('swiper-pagination-bullet-active') && handler(cur) );
            
            /** 최최 리프레쉬 시점에 1번째 활성화 */
            this.#active(arr[0])
            return acc;
        },0);
    };
}
