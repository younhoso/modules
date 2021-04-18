import { _tr } from '../Helpers/DomApi.js';
import { anis } from '../Helpers/common.js';
import Actives from '../Helpers/basic.js';

export default class Tabs extends Actives {
  /**
     * @param {Options | object}
     * @example
     * const my = new tr.Tabs({
            targets: '.tr_tab',
            addClassName: 'actives',      // 넣고 싶은 클랙스 명
            firstItemActive: true,        // 첫번째 아이템을 활성화 할건지 여부체크 true or false
            addChild: {
                findTargets : 'img',
                prop : 'src',                 // 속성들중에 원하는 속성 이름.
                unactiveValue: './imgs/Group2.png',    // 비황성화 경로 넣으세요.
                activeValue: './imgs/Group1.png'   // 활성화 하고싶은 경로 넣으세요.
            }
        });
     */
  constructor(el) {
    super(el);
    this.store = { idx: null, target: null, addClassName: null, PrevValue: null };
    this.initHandler();
  }

  /** Tabs 메뉴들에 관한 템플릿을 createDocumentFragment라는 가상문서에 저장하는 메소드. */
  menuTemplate() {
    const { targets, menuName, tabLine } = this.el
    const docFrag = document.createDocumentFragment();
    const tabsEle = document.querySelector(targets);

    const ul = document.createElement('ul');
    ul.classList.add('tr_tab_inner')
    docFrag.appendChild(ul);

    menuName.forEach(function(item, idx){
      const li = document.createElement('li');
      const a = document.createElement('a');
      li.classList.add('tr_tab_item');
      a.setAttribute('href', `#sec-tabs-${idx + 1}`)
      a.innerHTML = item;

      li.appendChild(a);
      ul.appendChild(li);
      docFrag.appendChild(ul);
    });

    const div = document.createElement('div');
    const i = document.createElement('i');
    div.classList.add('line', 'tr_line');
    i.classList.add('tr_line_item');

    tabLine && docFrag.appendChild(div);
    docFrag.appendChild(i);
    div.appendChild(i);
    
    tabsEle.appendChild(docFrag);
  }

  /** 특정 조건에만 실행만하는 메소드. */
  initHandler() {
    this.menuTemplate()
    const { targets, addClassName, firstItemActive } = this.el;
    this.store.target = _tr(targets).find('.tr_tab_item');
    this.store.addClassName = addClassName;

    const handler = (self) => {
      super.unactive(this.current); //클래스 비활성화
      super.active(self); // 클래스 활성화
      this.store.idx = this.store.target.indexOf(self);
    };

    const w = this.store.target[0].clientWidth;

    this.store.target.on('click', (e) => {
      e.preventDefault();
      handler(e.currentTarget);
      firstItemActive || _tr('.tr_line_item').css({ width: w + 'px' });
      anis('.tr_line_item', 0.4, { x: (w * this.store.idx) });
    });

    firstItemActive && _tr('.tr_line_item').css({ width: w + 'px' });
    firstItemActive && handler(this.store.target[0]);
  }
}
