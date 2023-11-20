const { Worker, isMainThread, parentPort } = require('worker_threads');

const ITServerPost = new Worker('./smartfarmkorea/routine.js');