const chain = require('./stack-chain');
var AsyncHook = require('./hook');
var asyncHook = new AsyncHook();

let callSitesForPreviuseTicks = null;
const stacks = new Map();

asyncHook.add({
  init: asyncInit,
  pre: asyncBefore,
  post: asyncAfter,
  destroy: asyncDestroy
});

asyncHook.enable();

chain.extend.attach(function (error, frames) {
  frames.push.apply(frames, callSitesForPreviuseTicks);
  console.log(frames);
  return frames;
});


// function getCallSites() {
//   // get stack callsite array
//   var orig = Error.prepareStackTrace;
//   Error.prepareStackTrace = function(_, stack){ return stack; };
//   var err = new Error;
//   /**
//    * when strict mode, arguments.callee not work
//    * getFunction() return undefined
//    * getThis return undefined
//    */
//   // Error.captureStackTrace(err, belowFn || StackTrace.get);
//   Error.captureStackTrace(err, arguments.callee);

//   var stack = err.stack;
//   console.log('callSitesForPreviuseTicks:', callSitesForPreviuseTicks);
//   if (callSitesForPreviuseTicks) {
//     for(let item of callSitesForPreviuseTicks) {
//       if (item) {
//         if (item instanceof Array) {
//           for(let val of item) {
//             console.log(val.getTypeName(), val.getFunctionName(), val.getFileName(), val.getLineNumber());
//           }
//         } else {
//           console.log(item.getTypeName(), item.getFunctionName(), item.getFileName(), item.getLineNumber());
//         }
//       }
//     }
//   }
  
//   stack.push(callSitesForPreviuseTicks);
//   Error.prepareStackTrace = orig;

//   return stack;
// }

function getCallSites(skip) {
  const limit = Error.stackTraceLimit;

  Error.stackTraceLimit = limit + skip;
  const stack = chain.callSite({
    extend: false,
    filter: true,
    slice: skip
  });
  Error.stackTraceLimit = limit;

  return stack;
}

function asyncInit(uid, handle, parentUid) {
  console.log('async init:', arguments);
  const trace = getCallSites(2);

  // Add all the callSites from previuse ticks
  trace.push.apply(trace, parentUid === null ? callSitesForPreviuseTicks : stacks.get(parentUid));

  // Cut the trace so it don't contain callSites there won't be shown anyway
  // because of Error.stackTraceLimit
  trace.splice(Error.stackTraceLimit);

  // `trace` now contains callSites from this ticks and all the ticks leading
  // up to this event in time
  stacks.set(uid, trace);
}

function asyncBefore(uid) {
  console.log('async before:', uid);
  // restore previuseTicks for this specific async action, thereby allowing it
  // to become a part of a error `stack` string
  callSitesForPreviuseTicks = stacks.get(uid);
}

function asyncAfter(uid) {
  console.log('async after:', uid);
  // clear `callSitesForPreviuseTicks`. In some cases the such as Promises the
  // handle context is lost. So to prevent callSites leaking into the wrong
  // stack trace, clear `callSitesForPreviuseTicks` here.
  callSitesForPreviuseTicks = null;
}

function asyncDestroy(uid) {
  console.log('async destroy:', uid);
  stacks.delete(uid);
}
