export function includeKeys(object, predicate) {
	const result = {};
	const descriptors = Object.getOwnPropertyDescriptors(object)
	const keys = Reflect.ownKeys(descriptors)

	if (Array.isArray(predicate)) {
		const set = new Set(predicate);
		for (const key of keys) {
			const descriptor = descriptors[key]
			if (descriptor.enumerable && set.has(key)) {
				Object.defineProperty(result, key, descriptor);
			}
		}
	} else {
		for (const key of keys) {
			const descriptor = descriptors[key]
			if (descriptor.enumerable) {
				const value = object[key];
				if (predicate(key, value, object)) {
					Object.defineProperty(result, key, descriptor);
				}
			}
		}
	}

	return result;
}

export function excludeKeys(object, predicate) {
	if (Array.isArray(predicate)) {
		const set = new Set(predicate);
		return includeKeys(object, key => !set.has(key));
	}

	return includeKeys(object, (key, value, object) => !predicate(key, value, object));
}
