const { logCall } = require('./db');

function withLogging(apiName, adapterFn) {
  return async function (...args) {
    const start = Date.now();
    const result = await adapterFn(...args);
    const duration = Date.now() - start;
    logCall(apiName, result.success, duration, result.error);
    return result;
  };
}

module.exports = withLogging;