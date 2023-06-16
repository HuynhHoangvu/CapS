function theFirst(callback) {
  setTimeout(function () {
    console.log("theFirst");
    callback();
  }, 3000);
}

function theSecond() {
  console.log("theSecond");
}

theFirst(theSecond);

/**
 * callback function (ES5)
 * promise (ES6)
 * async await (ES7)
 */

/**
 * DTTH: (a + b) * h / 2
 * API cong: a, b             2s
 * API nhan: ab, h           1s
 * API chia: abh, 2         0.5s
 *
 * => DTHT = ?
 *
 * callback function
 */
