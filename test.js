import test from 'ava';
import {includeKeys, excludeKeys} from './index.js';

test('includeKeys: function predicate returns a boolean', t => {
	t.is(Object.keys(includeKeys({foo: true, bar: false}, () => true)).length, 2);
	t.is(Object.keys(includeKeys({foo: true, bar: false}, () => false)).length, 0);
});

test('includeKeys: function predicate passes the key as argument', t => {
	t.true(includeKeys({foo: true}, key => key === 'foo').foo);
});

test('includeKeys: function predicate passes the value as argument', t => {
	t.is(includeKeys({foo: 'test'}, (key, value) => value === 'test').foo, 'test');
});

test('includeKeys: function predicate passes the object as argument', t => {
	t.true(includeKeys({foo: true}, (key, value, object) => object.foo).foo);
});

test('includeKeys: array predicate', t => {
	t.deepEqual(Object.keys(includeKeys({foo: true, bar: false}, ['foo'])), ['foo']);
});

test('includeKeys: symbol properties are kept', t => {
	const symbol = Symbol('test');
	const input = {[symbol]: true};
	t.true(includeKeys(input, () => true)[symbol]);
});

test('includeKeys: non-enumerable properties are omitted', t => {
	const input = Object.defineProperty({}, 'test', {value: true, enumerable: false});
	t.is(includeKeys(input, () => true).test, undefined);
});

test('includeKeys: descriptors are kept as is', t => {
	const descriptor = {get() {}, set() {}, enumerable: true, configurable: false};
	const input = Object.defineProperty({}, 'test', descriptor);
	t.deepEqual(Object.getOwnPropertyDescriptor(includeKeys(input, () => true), 'test'), descriptor);
	t.deepEqual(Object.getOwnPropertyDescriptor(includeKeys(input, ['test']), 'test'), descriptor);
});

test('includeKeys: inherited properties are omitted', t => {
	const Parent = class {
		test() {}
	};
	const Child = class extends Parent {};
	const input = new Child();
	t.is(includeKeys(input, () => true).test, undefined);
});

test('includeKeys: __proto__ keys', t => {
	const input = {__proto__: {foo: true}};
	t.deepEqual(includeKeys(input, () => true), input);
});

test('excludeKeys: function predicate returns a boolean', t => {
	t.is(Object.keys(excludeKeys({foo: true, bar: false}, () => true)).length, 0);
	t.is(Object.keys(excludeKeys({foo: true, bar: false}, () => false)).length, 2);
});

test('excludeKeys: function predicate passes the key as argument', t => {
	t.true(excludeKeys({foo: true}, key => key !== 'foo').foo);
});

test('excludeKeys: function predicate passes the value as argument', t => {
	t.is(excludeKeys({foo: 'test'}, (key, value) => value !== 'test').foo, 'test');
});

test('excludeKeys: function predicate passes the object as argument', t => {
	t.true(excludeKeys({foo: true}, (key, value, object) => !object.foo).foo);
});

test('excludeKeys: array predicate', t => {
	t.deepEqual(Object.keys(excludeKeys({foo: true, bar: false}, ['bar'])), ['foo']);
});

test('excludeKeys: symbol properties are kept', t => {
	const symbol = Symbol('test');
	const input = {[symbol]: true};
	t.true(excludeKeys(input, () => false)[symbol]);
});

test('excludeKeys: non-enumerable properties are omitted', t => {
	const input = Object.defineProperty({}, 'test', {value: true, enumerable: false});
	t.is(excludeKeys(input, () => false).test, undefined);
});

test('excludeKeys: descriptors are kept as is', t => {
	const descriptor = {get() {}, set() {}, enumerable: true, configurable: false};
	const input = Object.defineProperty({}, 'test', descriptor);
	t.deepEqual(Object.getOwnPropertyDescriptor(excludeKeys(input, () => false), 'test'), descriptor);
	t.deepEqual(Object.getOwnPropertyDescriptor(excludeKeys(input, []), 'test'), descriptor);
});

test('excludeKeys: inherited properties are omitted', t => {
	const Parent = class {
		test() {}
	};
	const Child = class extends Parent {};
	const input = new Child();
	t.is(excludeKeys(input, () => false).test, undefined);
});

test('excludeKeys: __proto__ keys', t => {
	const input = {__proto__: {foo: true}};
	t.deepEqual(excludeKeys(input, () => false), input);
});
