'use strict';
module.exports = function (obj, fn) {
	var ret = {};
	var keys = Object.keys(obj);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (fn(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};
