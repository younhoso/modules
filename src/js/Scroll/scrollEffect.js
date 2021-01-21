export default class ScrollEffect {
    constructor(el) {
        this.el = el
        this.store = {idx: null};
        this.onScroll()
    }
    
    onScroll() {
        const {targets, addClassName, value} = this.el;

        const showValue = function() {
            document.querySelectorAll(targets).forEach(el => {
                let posY = el.getBoundingClientRect().top;

                if (posY <= window.innerHeight * value) {
                    el.classList.add(addClassName);
                } else {
                    el.classList.remove(addClassName);
                }
            });
        };

        window.addEventListener('scroll', (e)=> {
            e.preventDefault();
            showValue();
        });
    }
} 