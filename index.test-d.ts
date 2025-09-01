import {expectType, expectError} from 'tsd';
import {includeKeys, excludeKeys} from './index.js';

const propertySymbol = Symbol('test');
const object = {
	foo: 'foo',
	bar: 1,
	[propertySymbol]: true,
};
type UnionOfObjects = {type: 'foo'; foo: string; [propertySymbol]: true; qux: string} | {type: 'bar'; bar: number; [propertySymbol]: false; qux: undefined};
const object2: UnionOfObjects = { // eslint-disable-line @typescript-eslint/consistent-type-assertions
	type: 'foo',
	foo: 'test',
	[propertySymbol]: true,
	qux: 'example',
} as UnionOfObjects;

expectType<Partial<typeof object>>(
	includeKeys(object, (key, value) => {
		expectType<'foo' | 'bar' | typeof propertySymbol>(key);
		expectType<string | number | boolean>(value);

		return false;
	}),
);
expectError<typeof object>(
	includeKeys(object, () => false),
);
expectType<{foo: string}>(includeKeys(object, ['foo']));
expectType<{foo: string}>(includeKeys(object, new Set<'foo'>(['foo'])));
expectType<{[propertySymbol]: boolean}>(includeKeys(object, [propertySymbol]));
expectError<typeof object>(includeKeys(object, ['foo']));
expectError(includeKeys(object, ['baz']));

expectType<{type: 'foo'; [propertySymbol]: true; qux: string} | {type: 'bar'; [propertySymbol]: false; qux: undefined}>(includeKeys(object2, ['type', propertySymbol, 'qux']));

expectType<Partial<typeof object>>(
	excludeKeys(object, (key, value) => {
		expectType<'foo' | 'bar' | typeof propertySymbol>(key);
		expectType<string | number | boolean>(value);

		return false;
	}),
);
expectError<typeof object>(
	excludeKeys(object, () => false),
);
expectType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(object, ['foo']));
expectType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(object, new Set<'foo'>(['foo'])));
expectType<{foo: string; bar: number}>(excludeKeys(object, [propertySymbol]));
expectError<typeof object>(excludeKeys(object, ['foo']));
expectError(excludeKeys(object, ['baz']));

expectType<{foo: string} | {bar: number}>(excludeKeys(object2, ['type', propertySymbol, 'qux']));
