/**
* 쿠키 가져오기
* @param {string}
*/
const getCookie = (cname) => {
   const name = cname + "=";
   const ca = document.cookie.split(';');
   for(let i=0; i<ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
   }
   return ""; 
};

/**
 * 24시간 기준 쿠키 설정하기  
 * exdays 후의 클릭한 시간까지 쿠키 설정
 * @param {string | string | number}
 */
const setCookie = (cname, cvalue, exdays) => {
   const todayDate = new Date();
   todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
   const expires = "expires=" + todayDate.toUTCString();
   document.cookie = cname + "=" + cvalue + "; " + expires;
};

/**
 * 00:00 시 기준 쿠키 설정하기  (저녁 12시 기준 쿠키가 해제 된다.)
 * expiredays 의 새벽  00:00:00 까지 쿠키 설정
 * @param {string | string | number}
 */
const setCookieAt00 = ( cname, cvalue, expiredays ) => {
   let todayDate = new Date();   
   todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
   if ( todayDate > new Date() ){  
      expiredays = expiredays - 1;
   }
   todayDate.setDate( todayDate.getDate() + expiredays );
   document.cookie = cname + "=" + escape( cvalue ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
};

/**
 * 최초 브라우저 Refresh 시점에서 핸들링하는 함수
 * @type {object}
 * @param {string}
 */
const openWin = ( winName ) => {
   const blnCookie = getCookie( winName );
   const obj = eval( "window." + winName );
   if( !blnCookie ) {               // 이것이 DOM에 block, none을 Refresh시에도 유지시켜줍니다.
      obj.style.display = "block";
   } else {
      obj.style.display = "none";
   }
};

/**
 * 창닫기 | 24 시간 기준으로 쿠키 설정
 * @type {object}
 * @param {string | number} 
 */
const closeWin = (winName, expiredays) => {
   setCookie( winName, "done" , expiredays);
   const obj = eval( "window." + winName );
   obj.style.display = "none";
};

/**
 * 창닫기 | 00:00 시 기준으로 쿠키 설정
 * @type {object}
 * @param {string | number} 
 */
const closeWinAt00 = (winName, expiredays) => {
   setCookieAt00( winName, "done" , expiredays);
   const obj = eval( "window." + winName );
   obj.style.display = "none";
};


export {
   openWin,
   closeWin,
   closeWinAt00
}
