export function includeKeys(object, predicate) {
	const result = {};

	if (Array.isArray(predicate)) {
		for (const key of predicate) {
			if (isEnumerable.call(object, key)) {
				const descriptor = Object.getOwnPropertyDescriptor(object, key);
				Object.defineProperty(result, key, descriptor);
			}
		}
	} else {
		// `for ... of Reflect.ownKeys()` is faster than `for ... of Object.entries()`.
		for (const key of Reflect.ownKeys(object)) {
			if (isEnumerable.call(object, key)) {
				const value = object[key];
				if (predicate(key, value, object)) {
					const descriptor = Object.getOwnPropertyDescriptor(object, key);
					Object.defineProperty(result, key, descriptor);
				}
			}
		}
	}

	return result;
}

const {propertyIsEnumerable: isEnumerable} = Object.prototype;

export function excludeKeys(object, predicate) {
	if (Array.isArray(predicate)) {
		const set = new Set(predicate);
		return includeKeys(object, key => !set.has(key));
	}

	return includeKeys(object, (key, value, object) => !predicate(key, value, object));
}
