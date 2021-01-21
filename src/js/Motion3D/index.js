export default class Motion {
    constructor(el) {
        this.el = el;
        this.store = {items: null, inner: null, posInitial: null, posFinal: null, posX1: 0, posX2: 0, itemTotalSize: 0, idx: 0, itemSize: 0, currentIdx: 0, itemLength: 0, threshold : 50, allowShift: true}
        this.init();
    }
    init() {
        const { targets } = this.el;
        const item = document.querySelector(targets);
        this.store.inner = item.querySelector('.tr_inner');
        this.store.items = Array.from(item.querySelectorAll('.tr_slide'));
        this.store.itemSize = this.store.items[0].offsetWidth;
        this.store.itemLength = this.store.items.length;
        this.store.itemTotalSize = this.store.itemSize * this.store.items.length;
        this.onMotion();
    };

    onMotion() {
        const dragStart = (e) => {
            e = e || window.event;
            e.preventDefault();
            this.store.posInitial = this.store.inner.offsetLeft;
            
            if (e.type == 'touchstart') {
                this.store.posX1 = e.touches[0].clientX;
            } else {
                this.store.posX1 = e.clientX;
                document.onmouseup = dragEnd;
                document.onmousemove = dragAction;
            }
        };
    
        const dragAction = (e) => {
            e = e || window.event;
            e.preventDefault();
            
            if (e.type == 'touchmove') {
                this.store.posX2 = this.store.posX1 - e.touches[0].clientX;
                this.store.posX1 = e.touches[0].clientX;
            } else {
                this.store.posX2 = this.store.posX1 - e.clientX;
                this.store.posX1 = e.clientX;
            }
            this.store.inner.style.left = (this.store.inner.offsetLeft - this.store.posX2) + "px";
        };
    
        const dragEnd = (e) => {
            this.store.posFinal = this.store.inner.offsetLeft;

            if (this.store.posFinal - this.store.posInitial < this.store.threshold) {
              shiftSlide(1, 'drag');
            } else if (this.store.posFinal - this.store.posInitial > this.store.threshold) {
              shiftSlide(-1, 'drag');
            } else {
              this.store.inner.style.left = (this.store.posInitial) + "px";
            }
        
            document.onmouseup = null;
            document.onmousemove = null;
        };
    
        const shiftSlide = (dir, action) => {
            this.store.inner.classList.add('shifting');
            
            if (this.store.allowShift) {
              if (!action) { this.store.posInitial = this.store.inner.offsetLeft; }
        
              if (dir === 1) {
                this.store.inner.style.left = (this.store.posInitial - this.store.itemSize) + "px";
                this.store.idx++;      
              } else if (dir === -1) {
                this.store.inner.style.left = (this.store.posInitial + this.store.itemSize) + "px";
                this.store.idx--;      
              }
            };
            
            this.store.allowShift = false;
        };
    
        const checkIndex = () => {
            this.store.inner.classList.remove('shifting');
        
            if (this.store.idx === -1) {
              this.store.inner.style.left = -(this.store.itemLength * this.store.itemSize) + "px";
              this.store.idx = this.store.itemLength - 1;
            }
        
            if (this.store.idx === this.store.itemLength) {
              this.store.inner.style.left = -(1 * this.store.itemSize) + "px";
              this.store.idx = 0;
            }
            
            this.store.allowShift = true;
        };

        this.store.inner.style.width = this.store.itemTotalSize + "px";

        // Mouse and Touch events
        this.store.inner.onmousedown = dragStart;
        
        // Touch events
        this.store.inner.addEventListener('touchstart', dragStart);
        this.store.inner.addEventListener('touchend', dragEnd);
        this.store.inner.addEventListener('touchmove', dragAction);
        
        // Transition events
        this.store.inner.addEventListener('transitionend', checkIndex);
    }
};