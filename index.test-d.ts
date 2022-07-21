import {expectType, expectError} from 'tsd';
import {includeKeys, excludeKeys} from './index.js';

const object = {
	foo: 'foo',
	bar: 1,
};

expectType<Partial<typeof object>>(
	includeKeys(object, (key, value) => {
		expectType<'foo' | 'bar'>(key);
		expectType<string | number>(value);

		return false;
	}),
);
expectError<typeof object>(
	includeKeys(object, () => false),
);
expectType<{foo: string}>(includeKeys(object, ['foo']));
expectError<typeof object>(includeKeys(object, ['foo']));
expectError(includeKeys(object, ['baz']));

expectType<Partial<typeof object>>(
	excludeKeys(object, (key, value) => {
		expectType<'foo' | 'bar'>(key);
		expectType<string | number>(value);

		return false;
	}),
);
expectError<typeof object>(
	excludeKeys(object, () => false),
);
expectType<{bar: number}>(excludeKeys(object, ['foo']));
expectError<typeof object>(excludeKeys(object, ['foo']));
expectError(excludeKeys(object, ['baz']));
