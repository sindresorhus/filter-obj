export default function filterObject(object, predicate) {
	const result = {};

	if (Array.isArray(predicate)) {
		const set = new Set(predicate);
		for (const key of Object.keys(object)) {
			if (set.has(key)) {
				const value = object[key];
				Object.defineProperty(result, key, {
					value,
					writable: true,
					enumerable: true,
					configurable: true,
				});
			}
		}
	} else {
		for (const [key, value] of Object.entries(object)) {
			if (predicate(key, value, object)) {
				Object.defineProperty(result, key, {
					value,
					writable: true,
					enumerable: true,
					configurable: true,
				});
			}
		}
	}

	return result;
}
