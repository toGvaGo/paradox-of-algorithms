export const randomArray = (n, v) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * v) + 1;
  }
  return arr;
};
export const copyArray = arr => {
  return [...arr];
};
export const sameArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
export const randomString = (n, v) => {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * v));
  }
  return str;
};

//通用的对数器，使用时通过validator传入具体的验证方法
export const logarithmicValidator = (
  arrayLength,
  arrayRange,
  testTimes,
  validator
) => {
  const N = arrayLength;
  const V = arrayRange;
  //   const testTimes = testTimes;
  console.log('==========测试开始==========');
  for (let i = 0; i < testTimes; i++) {
    let n = Math.floor(Math.random() * N);
    let arr = randomArray(n, V);
    try {
      validator(arr, V);
    } catch (err) {
      console.error(err);
    }
  }
  console.log('==========测试结束==========');
};
export const logarithmicValidator_testString = (
  strLength,
  strRange,
  testTimes,
  validator
) => {
  const N = strLength;
  const V = strRange;
  console.log('==========测试开始==========');
  for (let i = 0; i < testTimes; i++) {
    let n = Math.floor(Math.random() * N);
    let str = randomString(n, V);
    try {
      validator(str, V);
    } catch (err) {
      console.error(err);
    }
  }
  console.log('==========测试结束==========');
};

function my(str) {
  // if (str.length == 0) {
  //   return 0;
  // }
  let start = 0;
  let end = 0;
  let ans = '';
  while (start < str.length) {
    while (str[end] === str[start]) {
      end++;
    }
    if (str[start] !== ' ') {
      let count = end - start;
      ans += `${count}${str[start]}`;
    }
    start = end;
  }
  return ans;
}
function encode(str) {
  if (str.length == 0) {
    return 0;
  }
  var len = str.length;
  var str2 = '';
  var i = 0;
  var num = 1;
  while (i < len) {
    if (str.charAt(i) == str.charAt(i + 1)) {
      num++;
    } else {
      str2 += num;
      str2 += str.charAt(i);
      num = 1;
    }
    i++;
  }
  return str2;
}
// logarithmicValidator_testString(100, 1000, 500, (str, V) => {
//   if (my(str) !== encode(str)) {
//     console.log('------------');
//     console.log(my(str));
//     console.log('============');
//     console.log(encode(str));
//     console.log('----出错了----');
//   }
// });

Array.prototype.myReduce = function (callbackFn, initValue) {
  console.log(callbackFn instanceof Function);
  if (!(callbackFn instanceof Function)) {
    throw new Error(callbackFn + 'is not a function');
  }
  let accumulator = initValue;
  let currentIndex = 0;
  // 边缘case处理
  if (initValue === undefined) {
    if (this.length === 0) {
      throw new Error('Reduce of empty array with no initial value');
    }
    accumulator = this[0];
    currentIndex = 1;
  }
  // reduce累加逻辑
  while (currentIndex < this.length) {
    // callbackFn接收四个参数
    accumulator = callbackFn(
      accumulator,
      this[currentIndex],
      currentIndex,
      this
    );
    currentIndex++;
  }
  return accumulator;
};
// logarithmicValidator(100, 1000, 1, (arr, V) => {
//   arr.sort((a, b) => a - b);
//   let num = Math.floor(Math.random() * V);
//   const a = arr.reduce(
//     // (prev, cur) => (prev + cur > 200 ? undefined : prev + cur),
//     // (prev, cur) => (prev + cur > 200 ? null : prev + cur),
//     (prev, cur) => prev + cur,
//     // 123,
//     num
//   );
//   const b = arr.myReduce(
//     // (prev, cur) => (prev + cur > 200 ? undefined : prev + cur),
//     // (prev, cur) => (prev + cur > 200 ? null : prev + cur),
//     (prev, cur) => prev + cur,
//     // 123,
//     num
//   );
//   if (a !== b && !(Number.isNaN(a) && Number.isNaN(b))) {
//     console.log(a);
//     console.log(b);
//     console.log('----出错了----');
//   }
// });

// flat需要返回一个新数组，接收一个可选参数：depth（深度），根据depth递归的将所有子数组元素拼接到新数组中
// flat的方法是通用的，只需要 this 值具有 length 属性和整数键属性，但只对数组执行展开操作
// 调试测试过程中发现一点: 键的大小不能超过源数组的长度-1,例如原数组length为3, 则键大于等于3的所有键都会被忽略
// Array.prototype.myFlat = function (depth = 1) {
//   if (!this.length) return [];
//   const result = [];
//   // 用index来操作result, 避免使用push方法
//   let resultIndex = 0;
//   const flattenToArray = (target, depth) => {
//     if (depth < 0 || !target.length) {
//       result[resultIndex++] = target;
//       return;
//     }
//     const sourceLength = target.length;
//     for (const key in target) {
//       // 只对整数键属性操作, 且键的大小不能超过源数组的长度-1
//       if (isNaN(key) || key >= sourceLength) continue;
//       if (target[key] instanceof Array) {
//         // 只对数组执行展开操作
//         flattenToArray(target[key], depth - 1);
//       } else {
//         // console.log(target[key]);
//         // 不是数组则直接将其附加到结果中
//         result[resultIndex++] = target[key];
//       }
//     }
//     for (let i = 0; i < sourceLength; i++) {
//       // console.log(i, target[i]);
//     }
//   };
//   flattenToArray(this, depth);
//   return result;
// };
// const checkType = arr => {
//   return Object.prototype.toString.call(arr).slice(8, -1);
// };
// Array.prototype.myFlat = function (num) {
//   var type = checkType(this);
//   var result = [];
//   if (!Object.is(type, 'Array')) {
//     return;
//   }
//   this.forEach((item, i) => {
//     var item = this[i];
//     var cellType = checkType(item);
//     if (Object.is(cellType, 'Array')) {
//       num--;
//       if (num < 0) {
//         var newArr = result.push(item);
//         return newArr;
//       }
//       result.push.apply(result, item.myFlat(num));
//     } else {
//       result.push(item);
//     }
//   });
//   return result;
// };

// 手写发布订阅
// class EventEmitter {
//   constructor() {
//     // 事件容器，键是事件名，值是一个数组，存储该事件的所有订阅者
//     this.handlers = {};
//   }
//   // 订阅
//   on(event, handler) {
//     // 先检测当前事件是已有订阅者
//     if (!this.handlers[event]) {
//       this.handlers[event] = [];
//     }
//     this.handlers[event].push(handler);
//   }
//   // 发布
//   emit(event) {
//     // 若当前事件还没被订阅，抛出错误
//     if (!this.handlers[event]) {
//       throw new Error(`Event ${event} is not exist`);
//     }
//     // 遍历整个数组，通知所有订阅者
//     this.handlers[event].forEach(handler => handler(...arguments));
//   }
//   remove(event, handler) {
//     if (!this.handlers[event]) {
//       throw new Error(`Event ${event} is not exist`);
//     }
//     // 若未指定删除哪个订阅者，删除整个事件
//     if (!handler) {
//       delete this.handlers[event];
//     } else {
//       // 若对应事件中没有该订阅者，抛出错误
//       const index = this.handlers[event].indexOf(handler);
//       if (index === -1) {
//         throw new Error('The handler is not exist');
//       }
//       this.handlers[event].splice(index, 1);
//       // 若该事件只有这一个订阅者，删除这个事件
//       if (this.handlers[event].length === 0) {
//         delete this.handlers[event];
//       }
//     }
//   }
//   // 只订阅一次，发布后应删除对应的订阅者
//   once(event, handler) {
//     // 重新封装回调，在发布时执行handler，然后执行remove删除
//     const onceHandler = (...args) => {
//       handler(...args);
//       this.remove(event, onceHandler);
//     };
//     this.on(event, onceHandler);
//   }
// }

// const event = new EventEmitter();
// const handle = (...payload) => console.log(payload);

// event.on('click', handle);
// event.emit('click', 100, 200, 300, 100);
// event.remove('click', handle);
// event.once('dbclick', function () {
//   console.log('click');
// });
// event.emit('dbclick', 100);

// 实现 a == 1 && a == 2 && a == 3 为 true
// const a = new Proxy(
//   {},
//   {
//     _counter: 1,

//     get(target, prop) {
//       if (prop === Symbol.toPrimitive) {
//         return hint => {
//           return this._counter++; // 每次返回递增的值
//         };
//       }
//       return undefined;
//     }
//   }
// );
// const a = {
//   value: 1,
//   valueOf() {
//     return this.value++;
//   }
// };
// const a = {
//   value: 1,
//   toString(hint) {
//     return this.value++;
//   }
// };
// const a = {
//   value: 1,
//   [Symbol.toPrimitive](hint) {
//     if (hint === 'default') {
//       return this.value++;
//     }
//   }
// };

const b = {
  _value: 1,
  get value() {
    return this._value++;
  }
};
var value = 1;
window.a = {
  get: function () {
    return value++;
  }
};

var value = 1;
Object.defineProperty(window, 'a', {
  get() {
    return value++;
  }
});

console.log(a === 1 && a === 2 && a === 3); // true
// console.log(b.value === 1 && b.value === 2 && b.value === 3);
// console.log(a.value === 1 && a.value === 2 && a.value === 3);
console.log(a === 1 && a === 2 && a === 3); // true
// console.log(a === 1);
// console.log(a.value === 1 && a.value === 2 && a.value === 3); // true

// 借助其他数据结构的方法：Map、Set
// map
let ans = [];
const map = new Map();
for (let i = 0; i < arr.length; i++) {
  if (!map.has(arr[i])) {
    map.set(arr[i], 1);
  }
}
for (const key in map) {
  ans.push(key);
}
// Set
ans = [...new Set(arr)];

// 直接去重：inculdes、reduce、filter+indexOf、some
// 暴力去重
for (let i = 0; i < arr.length; i++) {
  if (!ans.includes(arr[i])) {
    ans.push(arr[i]);
  }
}
// some
arr.forEach(item => {
  if (!ans.some(uniqueItem => uniqueItem === item)) {
    ans.push(item);
  }
});
// reduce
ans = arr.reduce((prev, cur) => {
  if (!prev.includes(cur)) {
    prev.push(cur);
  }
  return prev;
}, []);
// filter
ans = arr.filter((item, index) => arr.indexOf(item) === index);

//深拷贝
function deepClone(obj) {
  // 记录已经拷贝过的对象，处理循环引用问题
  // WeakMap弱引用，避免拷贝完成后，作为键的对象可能不会被垃圾回收的问题
  const map = new WeakMap();
  // 若不是对象则不用做后续处理
  function isObject(target) {
    return (
      (typeof target === 'object' && target) || typeof target === 'function'
    );
  }
  function clone(data) {
    if (!isObject(data)) return data;
    // 三种特殊类型的预处理
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === 'function') {
      return new Function('return' + data.toString());
    }
    // 解决循环引用
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    // 处理Map和Set结构
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((value, key) => {
        if (isObject(value)) {
          result.set(key, clone(value));
        } else {
          result.set(key, value);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach(value => {
        if (isObject(value)) {
          result.add(clone(value));
        } else {
          result.add(value);
        }
      });
      return result;
    }
    // 正式开始处理普通对象
    // 使用ownKeys可以获取到对象的所有属性键，包括Symbol类型
    // 使用getOwnPropertyDescriptors获取对象的所有属性描述符，包括writable、enumerable等
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 使用data完整的配置，包括data的原型来创建一个新对象，实现拷贝
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach(key => {
      const value = data[key];
      if (isObject(value)) {
        result[key] = clone(value);
      } else {
        result[key] = value;
      }
    });
    return result;
  }

  return clone(target);
}

function myNew(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('constructor is not a function');
  }
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
