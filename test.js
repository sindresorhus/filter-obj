import test from 'ava';
import m from '.';

test('function predicate', t => {
	t.is(Object.keys(m({foo: true, bar: false}, () => true)).length, 2);
	t.is(Object.keys(m({foo: true, bar: false}, () => false)).length, 0);
	t.is(Object.keys(m({foo: true, bar: false}, (key, val) => val === true)).length, 1);
});

test('array predicate', t => {
	const x = Object.keys(m({foo: true, bar: false}, ['foo']));
	t.is(x[0], 'foo');
	t.is(x.length, 1);
});
