import {expectType, expectError} from 'tsd';
import {includeKeys, excludeKeys} from './index.js';

const propSymbol = Symbol('test');
const object = {
	foo: 'foo',
	bar: 1,
	[propSymbol]: true,
};

expectType<Partial<typeof object>>(
	includeKeys(object, (key, value) => {
		expectType<'foo' | 'bar' | typeof propSymbol>(key);
		expectType<string | number | boolean>(value);

		return false;
	}),
);
expectError<typeof object>(
	includeKeys(object, () => false),
);
expectType<{foo: string}>(includeKeys(object, ['foo']));
expectType<{[propSymbol]: boolean}>(includeKeys(object, [propSymbol]));
expectError<typeof object>(includeKeys(object, ['foo']));
expectError(includeKeys(object, ['baz']));

expectType<Partial<typeof object>>(
	excludeKeys(object, (key, value) => {
		expectType<'foo' | 'bar' | typeof propSymbol>(key);
		expectType<string | number | boolean>(value);

		return false;
	}),
);
expectError<typeof object>(
	excludeKeys(object, () => false),
);
expectType<{bar: number; [propSymbol]: boolean}>(excludeKeys(object, ['foo']));
expectType<{foo: string; bar: number}>(excludeKeys(object, [propSymbol]));
expectError<typeof object>(excludeKeys(object, ['foo']));
expectError(excludeKeys(object, ['baz']));
