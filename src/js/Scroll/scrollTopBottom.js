export default class ScrollTopBottom {
    constructor (el) {
        this.el = el
    }
    scrollTop () {
        const {ease} = this.el;
        (() => {
            const html = document.querySelector('html');
            const scrollTop = window.innerHeight - html.getBoundingClientRect().height
            window.scrollTo({top: scrollTop, behavior: ease})
        })();
    }
    scrollBottom () {
        const {ease} = this.el;
        (() => {
            const html = document.querySelector('html');
            const scrollBottom = window.innerHeight - html.getBoundingClientRect().height
            window.scrollTo({top: -scrollBottom, behavior: ease})
        })();
    }
    initHandler () {
        const {targets, top, bottom} = this.el;
        if (targets === '.scrollTop-js' && top === true) { this.scrollTop();}
        if (targets === '.scrollBottom-js' && bottom === true) { this.scrollBottom();}
    }
};