const chain = require('./stack-chain');
var AsyncHook = require('./hook');
var asyncHook = new AsyncHook();
var Last = require('./last');

let callSitesForPreviuseTicks = null;
let lastStackFrame = null;
const stacks = new Map();
const lastMap = new Map();

asyncHook.add({
  init: asyncInit,
  pre: asyncBefore,
  post: asyncAfter,
  destroy: asyncDestroy
});

asyncHook.enable();

chain.extend.attach(function (error, frames) {
  if (lastStackFrame) {
    error.lastStackFrame = lastStackFrame;
  }
  frames.push.apply(frames, callSitesForPreviuseTicks);
  return frames;
});

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
  console.log('async init', uid);
  const trace = getCallSites(2);

  // Add all the callSites from previuse ticks
  trace.push.apply(trace, parentUid === null ? callSitesForPreviuseTicks : stacks.get(parentUid));

  // Cut the trace so it don't contain callSites there won't be shown anyway
  // because of Error.stackTraceLimit
  trace.splice(Error.stackTraceLimit);

  // `trace` now contains callSites from this ticks and all the ticks leading
  // up to this event in time
  stacks.set(uid, trace);
  lastMap.set(uid, Last.stackframe);
}

function asyncBefore(uid) {
  // restore previuseTicks for this specific async action, thereby allowing it
  // to become a part of a error `stack` string
  callSitesForPreviuseTicks = stacks.get(uid);
  lastStackFrame = lastMap.get(uid);
}

function asyncAfter(uid) {
  // clear `callSitesForPreviuseTicks`. In some cases the such as Promises the
  // handle context is lost. So to prevent callSites leaking into the wrong
  // stack trace, clear `callSitesForPreviuseTicks` here.
  callSitesForPreviuseTicks = null;
  lastStackFrame = null;
}

function asyncDestroy(uid) {
  stacks.delete(uid);
  lastMap.delete(uid);
}
