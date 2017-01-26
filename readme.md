# filter-obj [![Build Status](https://travis-ci.org/sindresorhus/filter-obj.svg?branch=master)](https://travis-ci.org/sindresorhus/filter-obj)

> Filter object keys and values into a new object


## Install

```
$ npm install --save filter-obj
```


## Usage

```js
const filterObj = require('filter-obj');

const obj = {
	foo: true,
	bar: false
};

const newObject = filterObj(obj, (key, value) => value === true);
//=> {foo: true}

const newObject2 = filterObj(obj, ['bar']);
//=> {bar: false}
```


## API

### filterObj(source, filter)

#### source

Type: `Object`

Source object to filter properties from.

#### filter

Type: `Array` `Function`

Array of properties that should be filtered from the object or a filter function. The function has the signature `filterFn(sourceKey, sourceValue, source)`.


## Related

- [map-obj](https://github.com/sindresorhus/map-obj) - Map object keys and values into a new object


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
