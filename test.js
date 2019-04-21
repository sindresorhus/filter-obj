import test from 'ava';
import filterObject from '.';

test('function predicate', t => {
	t.is(Object.keys(filterObject({foo: true, bar: false}, () => true)).length, 2);
	t.is(Object.keys(filterObject({foo: true, bar: false}, () => false)).length, 0);
	t.is(Object.keys(filterObject({foo: true, bar: false}, (key, value) => value === true)).length, 1);
});

test('array predicate', t => {
	const filteredKeys = Object.keys(filterObject({foo: true, bar: false}, ['foo']));
	t.is(filteredKeys[0], 'foo');
	t.is(filteredKeys.length, 1);
});
