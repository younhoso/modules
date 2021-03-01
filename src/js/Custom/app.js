import { _tr } from '../Helpers/DomApi.js';
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
        paused: {
            pausedEl: '.swiper-paused',
            pausedSize: '18',
            strokePausedColor : '#007aff',
            strokePausedWidth : '1.6',
            pausedColor : '#333',
            playColor : '#007aff',
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
    this.paused = ops.paused;
    this.store = { ele: null, slideEle: null, pageEl: null, dotEles: null, pausedValue: null };
    this.current = null;
    this.#initMotion();
  }
  /**
   * Motion의 초기화 작업
   */
  #initMotion() {
    const { pagination, paused } = this.passedParams;
    this.store.ele = Array.from(_tr(this.el));
    this.store.slideEle = Array.from(_tr(this.el).find('.swiper-slide'));
    this.store.pageEl = _tr(pagination.el);
    if (!pagination) {
      return false;
    } else {
      this.store.dotEles = Array.from(_tr(pagination.el).find('.swiper-pagination-bullet'));
    }

    if (!paused) {
      this.#pageOnCircle();
    } else {
      this.store.pausedValue = this.passedParams.paused;
      this.#paused();
    }
    this.#pageOnCircle();
  }

  get paused() {
    return this._paused;
  }

  set paused(value) {
    const { autoplay } = this.passedParams;

    if (value && !autoplay) {
      throw Error('autoplay옵션과 같이 사용하는것을 권장합니다.');
    }
    this._paused = value;
  }

  /**
   * 활성화 관한 메소드
   * @param {object} 현재 활성화된 이벤트 객체
   */
  #active(item) {
    const { addClassName } = this.passedParams.pagination;

    item.classList.add(addClassName); //기본적인 class 추가 기능
    this.current = item;
  }

  /**
   * 비활성화 관한 메소드
   * @param {object} 현재 비활성화된 이벤트 객체
   */
  #unactive(item) {
    const { addClassName } = this.passedParams.pagination;
    item.classList.remove(addClassName); //기본적인 class 삭제 기능
  }

  /**
   * dotCircle 옵션 기능 구현
   */
  #pageOnCircle() {
    const { dotEles } = this.store;
    const { dotCircle, circleSize, strokeColor, strokeWidth, dotColor } = this.passedParams.pagination;

    const dotCircleTemplate = () => {
      return `
                <a href="#0">
                    <svg class="circle" width="${circleSize}" viewBox="0 0 16 16">
                        <circle class="strok" cx="8" cy="8" r="6.5" fill="none" transform="rotate(-90 8 8)" stroke="${strokeColor}" stroke-opacity="1" stroke-width="${strokeWidth}px"></circle>
                        <circle class="dot" cx="8" cy="8" r="3" fill="${dotColor}"></circle>
                    </svg>
                </a>
            `;
    };

    /**
     * 활성화, 비활성화 되는 함수
     * @param {HTMLElement}
     */
    const handler = self => {
      this.current && this.#unactive(this.current); //클래스 비활성화
      this.#active(self); // 클래스 활성화
    };

    dotCircle &&
      dotEles.reduce((acc, cur, idx, arr) => {
        _tr(cur).css({ width: 'auto', height: 'auto', background: 'transparent' });
        cur.innerHTML = dotCircleTemplate();
        /** dot클릭 이벤트 */
        _tr(cur).on('click', e => {
          handler(e.currentTarget);
        });

        /** Swiper의 마우스 slideChange 이벤트 */
        this.on('slideChange', e => {
          cur.classList.contains('swiper-pagination-bullet-active') && handler(cur);
          _tr('.swiper-pagination-bullet .strok').removeClass('paused');
        });

        /** 최최 리프레쉬 시점에 1번째 활성화 */
        this.#active(arr[0]);
        return acc;
      }, 0);
  }

  /** paused 옵션 기능 구현 */
  #paused() {
    const { pausedEl, pausedSize, strokePausedColor, strokePausedWidth, pausedColor, playColor } = this.store.pausedValue;
    const stopTemplate = () => {
      return `
                <svg width="${pausedSize}" height="${pausedSize}" viewBox="0 0 31 31">
                    <g fill="none" fill-rule="evenodd">
                        <circle cx="15.5" cy="15.5" r="12.5" stroke="${strokePausedColor}" stroke-width="${strokePausedWidth}"/>
                        <g stroke="${pausedColor}" stroke-linecap="round" stroke-width="2">
                            <path d="M18 12v7M13 12v7"/>
                        </g>
                    </g>
                </svg>
            `;
    };
    const playTemplate = () => {
      return `
                <svg width="${pausedSize}" height="${pausedSize}" viewBox="0 0 31 31">
                    <g fill="none" fill-rule="evenodd">
                        <circle cx="15.5" cy="15.5" r="12.5" stroke="${strokePausedColor}" stroke-width="${strokePausedWidth}"/>
                        <path fill="${playColor}" d="M20.213 15.937l-7.47 4.15A.5.5 0 0 1 12 19.65v-8.3a.5.5 0 0 1 .743-.437l7.47 4.15a.5.5 0 0 1 0 .874z"/>
                    </g>
                </svg>
            `;
    };

    _tr(pausedEl).html(`<a class="swiper-btn paused active" href="#0"></a>`);
    _tr(pausedEl).find('.paused').html(stopTemplate());

    /** 정지버튼 | 재생버튼 클릭 이벤트 */
    _tr('.paused').on('click', e => {
      if (_tr(e.currentTarget).hasClass('active')) {
        _tr(e.currentTarget).removeClass('active');
        _tr(e.currentTarget).html(playTemplate());
        _tr('.swiper-pagination-bullet-active .strok').addClass('paused');
        this.autoplay.stop();
      } else {
        _tr(e.currentTarget).addClass('active');
        _tr(e.currentTarget).html(stopTemplate());
        _tr('.swiper-pagination-bullet-active .strok').removeClass('paused');
        this.autoplay.start();
      }
    });
  }
}
