import {expectType, expectError} from 'tsd';
import filterObject = require('.');

const object = {
	foo: 'foo',
	bar: 1
};

expectType<Partial<typeof object>>(
	filterObject(object, (key, value) => {
		expectType<'foo' | 'bar'>(key);
		expectType<string | number>(value);

		return false;
	})
);
expectError<typeof object>(
	filterObject(object, () => {
		return false;
	})
);
expectType<{foo: string}>(filterObject(object, ['foo']));
expectError<typeof object>(filterObject(object, ['foo']));
expectError(filterObject(object, ['baz']));
