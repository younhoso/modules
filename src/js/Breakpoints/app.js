export default class BreakPoints {
  /**
     * @param {Options | object}
     * @example
     * const my = new tr.BreakPoints({
            screens: {
                'mobile': 320,
                'tablet': 768,
                'desktop': 1024
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
    this.store.mobile = window.matchMedia(`(min-width: ${screens.mobile}px)`);
    this.store.tablet = window.matchMedia(`(min-width: ${screens.tablet}px)`);
    this.store.desktop = window.matchMedia(`(min-width: ${screens.desktop}px)`);
  }
  mobile() {
    document.querySelector('body').style.backgroundColor = 'blue';
  }
  tablet() {
    document.querySelector('body').style.backgroundColor = 'yellow';
  }
  desktop() {
    document.querySelector('body').style.backgroundColor = 'green';
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
