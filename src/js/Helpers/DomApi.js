import autoBind from 'auto-bind';
import $ from 'domtastic';

class DomApi extends $.BaseClass {
  /**
   * DomApi class
   * @param {HTMLElement} container - 컨테이너 요소 또는 선택자
   * @example
   * _tr(HTMLElement) 라는 함수로 특정 엘리먼트를 선택합니다.
   */
  constructor(selector) {
    super(selector);
    this.el = selector;
    autoBind(this);
  }

  /**
   * 특정 엘리먼트에 data-props 속성 및 값을 넣을수 있는 메소드
   * @param {value | string} 문자 값
   */
  propsSet(value) {
    return this.attr('data-props', value);
  }

  /**
   * 특정 엘리먼트에 data-props 속성 및 값을 가져오는 메소드
   * @param {}
   */
  propsGet() {
    return this.attr('data-props');
  }

  /**
   * 이전의 엘리먼트들를 모두 배열로 담는다.
   * @param {string | object}
   */
  prevAll(elem = this.el) {
    let prev;
    typeof elem === 'string' ? (prev = document.querySelector(elem)) : (prev = elem); // 인자로 'string' 또는 this(object) 일때도 실행 가능 하게 합니다.

    return (() => {
      const prevElements = [];
      let prevElement = prev.parentNode.firstElementChild;

      while (prevElement !== prev) {
        if (prevElement.nodeType === 3) continue; // 텍스트 노트 무시
        prevElements.unshift(prevElement);
        prevElement = prevElement.nextElementSibling;
      }

      return _tr(prevElements);
    })();
  }

  /**
   * 다음의 엘리먼트들를 모두 배열로 담는다.
   * @param {string | object}
   */
  nextAll(elem = this.el) {
    let nextElement;
    typeof elem === 'string' ? (nextElement = document.querySelector(elem)) : (nextElement = elem); // 인자로 'string' 또는 this(object) 일때도 실행 가능 하게 합니다.

    return (() => {
      const nextElements = [];

      while (nextElement.nextElementSibling) {
        if (nextElement.nodeType === 3) continue; // 텍스트 노트 무시
        nextElements.push(nextElement.nextElementSibling);
        nextElement = nextElement.nextElementSibling;
      }

      return _tr(nextElements);
    })();
  }

  offset(elem = this.el) {
    return (() => {
      elem = this.el
      return document.querySelector(elem).getBoundingClientRect();
    })();
  }
}

export const _tr = selector => new DomApi(selector);
