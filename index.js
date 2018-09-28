const assert = require('assert')

const HELP_MESSAGE = 'You should pass promise as a first argument and string or function as a second argument'

module.exports = function(promise, errMessageOrCatchCallback) {
    if (!promise || !promise.then || !['string', 'function'].includes(typeof errMessageOrCatchCallback)) {
        return Promise.reject(Error(HELP_MESSAGE))
    }

    if (!['string', 'function'].includes(typeof errMessageOrCatchCallback)) {
        return Promise.reject(Error('You should pass second argument to assertRejects'))
    }

    if (typeof errMessageOrCatchCallback === 'string') {
        return promise
            .then(() => Promise.reject(Error(`Promise has not rejected with message: ${errMessageOrCatchCallback}`)))
            .catch(err => assert.equal(err.message, errMessageOrCatchCallback))
    }

    return promise
            .then(() => Promise.reject(Error('Promise has not rejected')))
            .catch(errMessageOrCatchCallback)
}
