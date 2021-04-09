import { _tr } from '../Helpers/DomApi.js';

export default class BreakPoints {
  /**
     * @param {Options | object}
     * @example
     * const myItem = new tr.BreakPoints({
            targets: '.item',
            screens: {
              // 미디어쿼리 min-width기준으로 사용합니다. 모바일, 테블릿, 데스트탑 공통 스타일경우 sm에 통합으로 넣을수 있습니다.
              // 테블릿, 데스트탑에서 바뀌는 스타일부분만 작성하세요.
                sm: {  
                    mobile: 320,
                    stytle : {
                        margin: '0 auto',
                        backgroundColor: 'yellowgreen'
                    }
                },
                md: {
                    tablet: 768,
                    stytle : {
                        fontSize: '16px',
                        backgroundColor: 'green'
                    },
                },
                lg: {
                    desktop: 1200,
                    stytle : {
                        fontSize: '20px',
                        backgroundColor: 'blue'
                    },
                }
            }
        });
     */
  constructor(el) {
    this.el = el;
    this.store = { mobile: null, tablet: null, desktop: null };
    this.load();
  }
  init() {
    const { screens } = this.el;
    this.store.mobile = window.matchMedia(`(min-width: ${screens.sm.mobile}px)`);
    this.store.tablet = window.matchMedia(`(min-width: ${screens.md.tablet}px)`);
    this.store.desktop = window.matchMedia(`(min-width: ${screens.lg.desktop}px)`);
  }
  mobile() {
    const { targets } = this.el;
    const { stytle } = this.el.screens.sm;
    _tr(targets).css(stytle)
  }
  tablet() {
    const { targets } = this.el;
    const { stytle } = this.el.screens.md;
    _tr(targets).css(stytle)
  }
  desktop() {
    const { targets } = this.el;
    const { stytle } = this.el.screens.lg;
    _tr(targets).css(stytle)
  }

  load() {
    this.init();
    const { mobile, tablet, desktop } = this.store;

    if (mobile.matches) {
      window.addEventListener('load', () => {
        this.mobile();
      });
    }

    if (tablet.matches) {
      window.addEventListener('load', () => {
        this.tablet();
      });
    }

    if (desktop.matches) {
      window.addEventListener('load', () => {
        this.desktop();
      });
    }
  }
}
