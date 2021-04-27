import { _tr } from '../Helpers/DomApi.js';
import { anis } from '../Helpers/common.js';
import Tabs from '../Actives/tabs.js';

export default class TabsScroll extends Tabs{
    constructor(el) {
        super(el)
        this.el = el;
        this.store = {target:null, idx : null}
        this.initTabsScroll();
    }

    initTabsScroll() {
        const { targets } = this.el;
        this.store.target = _tr(targets).find('.tr_tab_item');
        const w = this.store.target[0].clientWidth;
        this.store.idx = this.store.target.indexOf();
        
        _tr(window).on('scroll', (e) => {
            anis('.tr_line_item', 0.4, { x: (w * this.store.idx) });
        })
        this.store.idx += 1;
    };


}