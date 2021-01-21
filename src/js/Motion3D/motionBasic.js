import Actives from '../Helpers/index.js'
import {_tr} from '../Helpers/DomApi.js'

export default class MotionBasic extends Actives {
    constructor (el) {
        super(el);
        this.store = {currentIndex : 0, targetList: null}
        this.onMotion();
    }
    active(item) {
        super.active(item);
        const {targets, addClassNames} = this.el;

        const domPrev = _tr(targets).prevAll(item);
        const domNext = _tr(targets).nextAll(item);

        addClassNames.addClass && item.classList.add(addClassNames.addClass)
        addClassNames.addClass || item.classList.add(addClassNames) //기본적인 class 추가 기능
        
        const maps = addClassNames.addSiblings.map((el) => el );
        if(item.classList.contains(addClassNames.addClass)){
            domPrev.forEach((el, idx) => {
                el.classList.add(maps[0].listBefore, maps[0].listBefore+`-${idx+1}`);
            });

            domNext.forEach((el, idx) => {
                el.classList.add(maps[1].listAfter, maps[1].listAfter+`-${idx+1}`);
            });
        };
        
        this.store.targetList = targets.split('.');
        super.indexDefault();
    };

    unactive(item) {
        super.unactive(item);
        const {targets, addClassNames} = this.el;
        const domPrev = _tr(targets).prevAll(item);
        const domNext = _tr(targets).nextAll(item);
        const maps = addClassNames.addSiblings.map((el) => el );

        addClassNames.addClass && item.classList.remove(addClassNames.addClass)
        addClassNames.addClass || item.classList.remove(addClassNames) //기본적인 class 삭제 기능

        domPrev.forEach((el, idx) => {
            el.classList.remove(maps[0].listBefore, maps[0].listBefore+`-${idx+1}`);
        });

        domNext.forEach((el, idx) => {
            el.classList.remove(maps[1].listAfter, maps[1].listAfter+`-${idx+1}`);
        });
    };

    showNext(arrItem) { // 다음 활성화 관한 메소드
        this.store.currentIndex = this.store.currentIndex + 1;
        const {loop} = this.el;
        
        arrItem.forEach((el, idx, arr) => {
            loop && super.indexLoop();
            super.indexDefault();
            
            if(this.current)this.unactive(this.current);
            
            if (el.classList.contains(this.store.targetList[1])) {
                this.active(arr[this.store.currentIndex])
            }
        });
    };

    showPrev(arrItem) { // 이전 활성화 관한 메소드
        this.store.currentIndex = this.store.currentIndex - 1;
        const {loop} = this.el;

        arrItem.forEach((el, idx, arr) => {
            loop && super.indexLoop();
            super.indexDefault();

            if(this.current)this.unactive(this.current);
            
            if (el.classList.contains(this.store.targetList[1])) {
                this.active(arr[this.store.currentIndex])
            }
        });
    };

    onMotion() {
        const {targets, navigation} = this.el;
        const arrLimit = Array.from(document.querySelectorAll(targets))

        const nexEl = document.querySelector(navigation.nextEl);
        const preEl = document.querySelector(navigation.prevEl);

        nexEl.addEventListener('click', (e) => {
            e.preventDefault();
            this.showNext(arrLimit);
        });
       
        preEl.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPrev(arrLimit);
        });

         const eew = _tr('.demo-text')
         console.log(eew)

        this.active(arrLimit[0]);
    };
}