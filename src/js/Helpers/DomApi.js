import $ from 'domtastic';

class DomApi extends $.BaseClass {
    /**
     * DomApi class
     * @param {HTMLElement|string} container - 컨테이너 요소 또는 선택자
     * @example
     * _tr(HTMLElement) 라는 함수로 특정 엘리먼트를 선택합니다.
    */
	constructor(selector) {
        super(selector)
    }
    
    /**
     * 특정 엘리먼트에 data-props 속성 및 값을 넣을수 있는 메소드
     * @param {value | string} 문자 값
     */
    propsSet(value) {
        return this.attr('data-props', value);
    };

    /**
     * 특정 엘리먼트에 data-props 속성 및 값을 가져오는 메소드
     * @param {}
     */
    propsGet() {
        return this.attr('data-props')
    };

    /**
	 * 이전의 엘리먼트들를 모두 배열로 담는다.
     * (참고 : 활성화되는 엘리먼트 기준으로 이전 엘리먼트를 가져옵니다.)
     * @param {String} selector active(활성화)하는 엘리먼트
	 */
    prevAll(elem){
        return (() => {
            const prevElements = []
            let prevElement = elem.parentNode.firstElementChild
        
            while(prevElement !== elem) {
                prevElements.unshift(prevElement)
                prevElement = prevElement.nextElementSibling
            }
           
            return prevElements;
        })();
    };

    /**
	 * 다음의 엘리먼트들를 모두 배열로 담는다.
     * (참고 : 활성화되는 엘리먼트 기준으로 다음 엘리먼트를 가져옵니다.)
     * @param {String} selector active(활성화)하는 엘리먼트
	 */
    nextAll(elem) {
        return (() => {
            const nextElements = []
            let nextElement = elem
          
            while(nextElement.nextElementSibling) {
              nextElements.push(nextElement.nextElementSibling)
              nextElement = nextElement.nextElementSibling
            }
          
            return nextElements
        })();
    };
};

export const _tr = (selector) => new DomApi(selector);