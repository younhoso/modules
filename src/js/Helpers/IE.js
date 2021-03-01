export const DetectIE = ({ callbacks }) => {
  const detectIE = function () {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE');
    if (msie > 0) {
      // IE 10 이상 버전 채크
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 버전 체크
      const rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    // 다른 브라우저 리턴
    return false;
  };

  // IE 또는 Edge 브라우저 버전 가져오기
  const version = detectIE();

  if (!version) {
    //  IE 또는 Edge 브라우저 이 외에 다른 브라우저 라면 html 파일에서 body에 클래스 동적으로 삭제
  } else if (version >= 12) {
    return callbacks('Edge', version);
  } else {
    return callbacks('IE', version);
  }
  // 디버그 결과에 세부 정보 추가
  // document.querySelector('.details').innerHTML = window.navigator.userAgent;
};
