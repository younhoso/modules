import { _tr } from '../Helpers/DomApi.js';
import { anis } from '../Helpers/common.js';
import Tabs from './tabs.js';

export default class TabsScroll{
    constructor(el) {
        this.el = el;
        this.store = {target:null, idx : null}
        this.initTabsScroll();
    }

    initTabsScroll() {
        const { targets } = this.el;
        this.store.target = _tr(targets).find('.tab');
        const w = this.store.target[0].clientWidth;
        // this.store.idx = this.store.target.indexOf();
        console.log(w)
        
        _tr(window).on('scroll', (e) => {
            // anis('.tr_line_item', 0.4, { x: (w * this.store.idx) });
        })
        // this.store.idx += 1;
    }    
}