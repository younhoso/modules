import $ from 'domtastic';

/**
 * DomApi class
 * @param {HTMLElement|string} container - 컨테이너 요소 또는 선택자
 * @example
 * tr(HTMLElement)
 */
class DomApi extends $.BaseClass {
	constructor(selector) {
        super(selector)
    }
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