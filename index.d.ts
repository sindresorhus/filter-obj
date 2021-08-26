/**
Filter object keys and values into a new object.

@param object - The source object to filter properties from.
@param predicate - Predicate function that detemines whether a property should be assigned to the new object.
@param includeKeys - Property names that should be assigned to the new object.

@example
```
import filterObject from 'filter-obj';

const object = {
	foo: true,
	bar: false
};

const newObject = filterObject(object, (key, value) => value === true);
//=> {foo: true}

const newObject2 = filterObject(object, ['bar']);
//=> {bar: false}
```
*/
export default function filterObject<ObjectType extends Record<string, any>>(
	object: ObjectType,
	predicate: (
		key: keyof ObjectType,
		value: ObjectType[keyof ObjectType]
	) => boolean
): Partial<ObjectType>;
export default function filterObject<
	ObjectType extends Record<string, any>,
	IncludedKeys extends keyof ObjectType,
>(
	object: ObjectType,
	includeKeys: readonly IncludedKeys[]
): Pick<ObjectType, IncludedKeys>;
