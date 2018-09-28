const assert = require('assert')
const assertRejection = require('./')

describe('assertRejection', () => {
    it ('should fail when 2 args not passed', () => {
        return assertRejection()
            .catch(err => assert.equal(err.message, 'You should pass promise as a first argument and string or function as a second argument'))
    })

    it ('should fail when first arg is not a promise', () => {
        return assertRejection(null, 'blabla')
            .catch(err => assert.equal(err.message, 'You should pass promise as a first argument and string or function as a second argument'))
    })

    it ('should fail when second arg is not a string or function', () => {
        return assertRejection(Promise.resolve(), 123)
            .catch(err => assert.equal(err.message, 'You should pass promise as a first argument and string or function as a second argument'))

    })

    it ('should work when first arg is a promise and second arg is a string and error throwed wo "new"', () => {
        return assertRejection(Promise.reject(Error('blabla')), 'blabla')
    })

    it ('should work when first arg is a promise and second arg is a string and error throwed with "new"', () => {
        return assertRejection(Promise.reject(new Error('blabla')), 'blabla')
    })

    it('should work when first arg is a promise and second arg is a function', () => {
        return assertRejection(Promise.reject(new Error('blabla')), err => {
            assert.equal(err.message, 'blabla')
        })
    })

    it('should fail when expected string does not match with err.message', () => {
        return assertRejection(Promise.reject(new Error('blabla')), 'gagaga')
            .catch(err => assert.equal(err.message, "'blabla' == 'gagaga'"))
    })

    it('should fail when callback throws error', () => {
        return assertRejection(Promise.reject(new Error('blabla')), err => assert.equal(err.message, 'gagaga'))
            .catch(err => assert.equal(err.message, "'blabla' == 'gagaga'"))
    })
})