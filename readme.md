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
//=> {bar: true}
```


## API

### filterObj(source, filter)

#### source

Type: `object`

Source object to filter properties from.

#### filter

Type: `array` `function`

Array of properties that should be filtered from the object or a filter function. The function has the signature `filterFn(sourceKey, sourceValue, source)`.


## Related

- [map-obj](https://github.com/sindresorhus/map-obj) - Map object keys and values into a new object
- [object-assign](https://github.com/sindresorhus/object-assign) - Copy enumerable own properties from one or more source objects to a target object


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
