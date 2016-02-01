var async = require('../src/async');

function trace() {
  var err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  console.log(stack);
  return stack;
}

function say() {
  trace()
  console.log('nice to meet you');
  setTimeout(function () {
    trace()
    console.log('setTimeout', 200);
    setTimeout(function () {
      trace()
      console.log('setTimeout', 300)
      setTimeout(function() {
        trace()
        console.log('setTimeout', 400)
      }, 400)
    }, 300);
  }, 200);
}
say();


function sing() {
  trace();
  console.log('sing *******');
  abc();
}
function abc() {
  trace();
  setTimeout(function() {
    trace();
    console.log('setTimeout', 450);
  }, 450);
}
sing();
