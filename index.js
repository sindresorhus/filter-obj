'use strict';
module.exports = (obj, predicate) => {
	const ret = {};
	const keys = Object.keys(obj);
	const isArray = Array.isArray(predicate);

	for (const key of keys) {
		const val = obj[key];

		if (isArray ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};
