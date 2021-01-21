import {_tr} from '../Helpers/DomApi.js'
import Moreview from './index.js'

export default class Item extends Moreview {
    constructor(el) {
        super(el);
        this.store = {idIdx: 0, startIdx: 0, endIdx: 0, totalNum: 0};
        this.initHandler();
    };
    defaultload() {
        const { startEl, endEl, eventEl } = this.el.targets;
        const { effect, additems, addClassName, template } = this.el;
        const eles = _tr(startEl).find(endEl);
        const eventE = document.querySelector(eventEl);
        eles.forEach((ele, idx) => {
            if(idx+1 > additems) {
                ele.classList.add(addClassName);
            }
        });
        
        this.store.totalNum = eles.length;
        eventE.innerHTML = template(0, additems, this.store.totalNum)
    };

    activeItem(item) {
        super.active(item);
        const {startEl, endEl} = this.el.targets;
        let {effect, additems, addClassName, template} = this.el;
        const eles = _tr(startEl).find(endEl);
        const totalIdx = parseInt(item.querySelector('.total').innerHTML);
        let currentIdx = parseInt(item.querySelector('.current').innerHTML);

        if (currentIdx >= totalIdx ) return false;
        if ( currentIdx > additems ) {
            this.store.startIdx = this.store.endIdx;
        }else{
            this.store.startIdx = additems;
        }
        this.store.endIdx = this.store.startIdx + additems;

        eles.forEach((ele, idx) => {
            if((idx + 1 >= this.store.startIdx) && (idx < this.store.endIdx)){
                ele.classList.remove(addClassName);
            };
        }); 

        currentIdx += additems;
        this.store.idIdx += 1;
        
        if( currentIdx >= eles.length ) {  item.innerHTML = template(this.store.idIdx, totalIdx, totalIdx, addClassName); return false; }
        item.innerHTML = template(this.store.idIdx, currentIdx, totalIdx);
    };

    initHandler() {
        this.defaultload();
        const { eventEl } = this.el.targets;
        const eventE = document.querySelector(eventEl);

        const handler = (self) => { // 특정 조건에만 실행하는 함수
            this.activeItem(self)
        };

        (() => { 
            eventE.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                handler(e.currentTarget);
            });
        })();
    };
}