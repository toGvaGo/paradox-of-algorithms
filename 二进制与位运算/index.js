//二进制、十进制、十六进制

const printBinary = num => {
  //由于1是integer类型，所以如果要判断long类型的话，应该用 num&(1L<<48)
  let res = new Array(32).fill(0);
  for (let i = 31; i >= 0; i--) {
    res[31 - i] = num & (1 << i) ? 1 : 0;
  }
  console.log(res.join(''));
};

const main = () => {
  let a = 78;
  console.log(a);
  printBinary(a);
  console.log('-------------a------------');

  let b = -6;
  console.log(b);
  printBinary(b);
  console.log('-------------b------------');

  // 0b相当于将0补齐，这是32位二进制数的简洁写法
  let c = 0b1001110;
  console.log(c);
  printBinary(c);
  console.log('-------------c------------');

  //二进制每四位相当于一位十六进制，0x4e表达为二进制就是0b01001110
  //   let d = 0b01001110;
  let d = 0x4e;
  console.log(d);
  printBinary(d);
  console.log('-------------d------------');

  console.log(a);
  printBinary(a);
  printBinary(~a);
  let e = ~a + 1;
  console.log(e);
  console.log('-------------e------------');

  //   let f = -Infinity;
  //   let f = -Number.MIN_VALUE;
  //   console.log(f);
  //   printBinary(f);
  //   console.log(-f);
  //   printBinary(-f);
  //   console.log(~f + 1);
  //   printBinary(~f + 1);
  //   console.log('-------------f------------');

  let g = 0b0001010;
  let h = 0b0001100;
  printBinary(g | h);
  printBinary(g & h);
  printBinary(g ^ h);
  console.log('-------------g、h------------');

  // 逻辑或和与的穿透性
  let test1 = returnTrue() | returnFalse();
  console.log('test1', test1);
  let test2 = returnTrue() || returnFalse();
  console.log('test2', test2);
  let test3 = returnTrue() & returnFalse();
  console.log('test3', test3);
  let test4 = returnFalse() && returnTrue();
  console.log('test4', test4);
  console.log('-------------|、&、||、&&------------');

  // >>右移，拿符号位来补，>>>拿0补
  let i = 0b0011010;
  printBinary(i << 1);
  printBinary(i << 2);
  printBinary(i << 3);
  console.log('----------i <<-----------');
  printBinary(i);
  printBinary(i >> 2);
  printBinary(i >>> 2);
  console.log('----------i >> >>>-----------');

  let j = 0b11110000000000000000000000000000;
  printBinary(j);
  printBinary(i >> 2);
  printBinary(i >>> 2);
  console.log('----------j >> >>>-----------');

  let k = 10;
  console.log(k << 1);
  console.log(k << 2);
  console.log(k << 3);
  console.log(k >> 1);
  console.log(k >> 2);
  console.log(k >> 3);
  console.log('----------k-----------');
};

const returnTrue = () => {
  console.log('调用returnTrue');
  return true;
};
const returnFalse = () => {
  console.log('调用returnFalse');
  return false;
};
main();
