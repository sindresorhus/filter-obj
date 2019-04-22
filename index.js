'use strict';
module.exports = (object, predicate) => {
	const result = {};
	const isArray = Array.isArray(predicate);

	for (const [key, value] of Object.entries(object)) {
		if (isArray ? predicate.indexOf(key) !== -1 : predicate(key, value, object)) {
			result[key] = value;
		}
	}

	return result;
};
