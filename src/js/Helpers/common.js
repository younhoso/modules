import { TweenMax } from 'gsap/all';

/**
 * 3번째 자리애 자동으로 ,쉼표를 넣어서 반환해줍니다.
 * @param {value | string}
 * @example
 * tr.comma( Number(100000) + '원' )
 */
export const comma = el => {
  el = String(el);
  return el.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

/**
 * input value값에 3번째 자리애 자동으로 ,쉼표를 넣어서 반환해줍니다.
 * @param {value | string}
 * @example 
 * Element.addEventListener('keyup', function(e) {
        e.target.value = tr.inputCommaSet(e.target.value)
    });
 */
export const inputCommaSet = el => {
  let val = el;
  val = val.replace(/[^0-9\.]/g, '');

  if (val != '') {
    const valArr = val.split('.');
    valArr[0] = parseInt(valArr[0], 10).toLocaleString();
    val = valArr.join('.');
  }
  return val;
};

/**
 * 3번째 자리애 자동으로 ,쉼표를 빼서 반환해줍니다.
 * @param {value | string}
 * @example
 * tr.comma( Number( values1.value) + '원' )
 */
export const unComma = el => {
  // 숫자를 받아서,
  el = String(el);
  return el.replace(/[^\d]+/g, '');
};

/**
 * data(객체)를 복사하는 함수.
 * @param {objectName} target
 */
export const cloneObject = target => {
  if (target === null || typeof target !== 'object') {
    return target;
  }

  let temp;
  if (Array.isArray(target)) {
    temp = [];
  } else {
    temp = {};
  }

  for (let key of Object.keys(target)) {
    temp[key] = cloneObject(target[key]);
  }

  return temp;
};

/**
 * object(JSON)의 키 기준으로 그룹핑을 하여, 하나의 object를 반환해줍니다.
 * @param {objectName} target
 * @param {objectKey | string} property
 * @param {boolean} props
 * @example
 * tr.dataGroups(people, 'age', {group: true}) // age라는 키의 기준으로 그룹핑을 한다.
 */
export const dataGroups = (target, property, props = {}) => {
  const [...obName] = target;

  return obName.reduce((acc, cur, idx) => {
    const key = cur[property];
    !acc[key] && (acc[key] = []);
    props.group ? acc[key].push(cur) : (acc[idx] = cur);
    return acc;
  }, {});
};

/**
 * object(JSON)의 키 기준으로 필터링되고, 그룹핑을 하여, 하나의 Array를 반환해줍니다.
 * @param {objectName} target
 * @param {PropertyName(String) | PropertyValue(Number)}
 * @example
 * tr.dataFilter(people, { age: 23 })
 */
export const dataFilter = (target, property) => {
  const [...obName] = target;
  const [keyName] = Object.keys(property);
  const [value] = Object.values(property);

  return obName.filter(cur => {
    const key = cur[keyName];
    return parseFloat(value) !== key;
  });
};

/**
 * 여러가지 배열로된 data들을 하나의 배열로 통합시켜 내림차순으로 반환해줍니다.
 * @param {ArrayName} target
 * @example
 * tr.dataArray(people)
 */
export const dataArray = target => {
  const [...arrName] = target;
  return arrName.reduce((acc, cur, idx) => {
    for (let j = cur.length - 1; j >= 0; j--) {
      acc.push(arrName[idx][j]);
      acc.sort();
    }
    return acc;
  }, []);
};

/**
 * 에니메이션 공통으로 사용하는 함수.
 * @param {object , number}
 * @example
 * _tr('...').transition(options, duration)
 */
export const transition = (target, options, duration = 0.5) => {
  TweenMax.to(target, duration, options);
};
