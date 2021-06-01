import Cookies from 'js-cookie';

/**
 * 평소에는 block으로 보임, getCookie 값이 존재하면 none 됩니다.
 * @type {object}
 * @param {string}
 */
const openWinCookie = winName => {
  const blnCookie = Cookies.get(winName);
  const obj = (new Function('return window.' + winName))();

  if (!blnCookie) {
    /**  이것이 DOM에 block, none을 Refresh시에도 유지시켜줍니다. */
    obj.style.display = 'block';
  }
};

const dataAttrCookie = (winName, dataVal) => {
  const blnCookie = Cookies.get(winName);
  const obj = (new Function('return window.' + winName))();

  if (!blnCookie) {
    /**  이것이 DOM에 block, none을 Refresh시에도 유지시켜줍니다. */
    obj.dataset[dataVal] = 'true';
  }
}

export {openWinCookie, dataAttrCookie};
