import test from 'ava';
import filterObject from './index.js';

test('function predicate returns a boolean', t => {
	t.is(Object.keys(filterObject({foo: true, bar: false}, () => true)).length, 2);
	t.is(Object.keys(filterObject({foo: true, bar: false}, () => false)).length, 0);
});

test('function predicate passes the key as argument', t => {
	t.true(filterObject({foo: true}, key => key === 'foo').foo);
});

test('function predicate passes the value as argument', t => {
	t.is(filterObject({foo: 'test'}, (key, value) => value === 'test').foo, 'test');
});

test('function predicate passes the object as argument', t => {
	t.true(filterObject({foo: true}, (key, value, object) => object.foo).foo);
});

test('array predicate', t => {
	t.deepEqual(Object.keys(filterObject({foo: true, bar: false}, ['foo'])), ['foo']);
});

test('symbol properties are omitted', t => {
	const symbol = Symbol('test');
	const input = {[symbol]: true};
	t.is(filterObject(input, () => true)[symbol], undefined);
});

test('non-enumerable properties are omitted', t => {
	const input = Object.defineProperty({}, 'test', {value: true, enumerable: false});
	t.is(filterObject(input, () => true).test, undefined);
});

test('inherited properties are omitted', t => {
	const Parent = class {
		test() {}
	};
	const Child = class extends Parent {};
	const input = new Child();
	t.is(filterObject(input, () => true).test, undefined);
});

test('__proto__ keys', t => {
	const input = {__proto__: {foo: true}};
	t.deepEqual(filterObject(input, () => true), input);
});
