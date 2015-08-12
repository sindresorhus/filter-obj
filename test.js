'use strict';
var test = require('ava');
var fn = require('./');

test('funciton predicate', function (t) {
	t.assert(Object.keys(fn({foo: true, bar: false}, function () {
		return true;
	})).length === 2);

	t.assert(Object.keys(fn({foo: true, bar: false}, function () {
		return false;
	})).length === 0);

	t.assert(Object.keys(fn({foo: true, bar: false}, function (key, val) {
		return val === true;
	})).length === 1);

	t.end();
});

test('array predicate', function (t) {
	var x = Object.keys(fn({foo: true, bar: false}, ['foo']));

	t.assert(x[0] === 'foo');
	t.assert(x.length === 1);

	t.end();
});
