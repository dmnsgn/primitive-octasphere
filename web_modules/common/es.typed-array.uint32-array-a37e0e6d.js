import { e as toObject, x as indexedObject, t as toLength, f as fails, _ as _export, y as engineIsNode, z as engineV8Version, b as anObject, g as getBuiltIn, A as createPropertyDescriptor, q as createNonEnumerableProperty } from './well-known-symbol-e7c5f5fe.js';
import { a as aFunction, f as functionBindContext, o as objectCreate, b as objectSetPrototypeOf, c as objectGetPrototypeOf } from './object-create-d2d6e615.js';
import { i as isPure, c as collectionDeleteAll, s as speciesConstructor, a as iterate, g as getIterator } from './esnext.map.update-b49dacaa.js';
import { t as typedArrayConstructor } from './es.typed-array.float32-array-ef7a228d.js';

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $reduce = arrayReduce.left;




var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://github.com/tc39/collection-methods
var collectionAddAll = function (/* ...elements */) {
  var set = anObject(this);
  var adder = aFunction(set.add);
  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k]);
  }
  return set;
};

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  addAll: function addAll(/* ...elements */) {
    return collectionAddAll.apply(this, arguments);
  }
});

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  difference: function difference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    iterate(iterable, function (value) {
      remover.call(newSet, value);
    });
    return newSet;
  }
});

var getSetIterator =  function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return Set.prototype.values.call(it);
};

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate(iterator, function (value, stop) {
      if (!boundFunction(value, value, set)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) adder.call(newSet, value);
    }, { IS_ITERATOR: true });
    return newSet;
  }
});

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop(value);
    }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  intersection: function intersection(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var hasCheck = aFunction(set.has);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === true) return stop();
    }, { INTERRUPTED: true }).stopped;
  }
});

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject(iterable);
    var hasCheck = otherSet.has;
    if (typeof hasCheck != 'function') {
      otherSet = new (getBuiltIn('Set'))(iterable);
      hasCheck = aFunction(otherSet.has);
    }
    return !iterate(iterator, function (value, stop) {
      if (hasCheck.call(otherSet, value) === false) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === false) return stop();
    }, { INTERRUPTED: true }).stopped;
  }
});

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  join: function join(separator) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var sep = separator === undefined ? ',' : String(separator);
    var result = [];
    iterate(iterator, result.push, { that: result, IS_ITERATOR: true });
    return result.join(sep);
  }
});

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      adder.call(newSet, boundFunction(value, value, set));
    }, { IS_ITERATOR: true });
    return newSet;
  }
});

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction(callbackfn);
    iterate(iterator, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    }, { IS_ITERATOR: true });
    if (noInitial) throw TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    iterate(iterable, aFunction(newSet.add), { that: newSet });
    return newSet;
  }
});

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'WeakMap', proto: true, real: true, forced: isPure }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'WeakSet', proto: true, real: true, forced: isPure }, {
  addAll: function addAll(/* ...elements */) {
    return collectionAddAll.apply(this, arguments);
  }
});

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
_export({ target: 'WeakSet', proto: true, real: true, forced: isPure }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (objectSetPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = objectCreate(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
_export({ global: true }, {
  AggregateError: $AggregateError
});

// `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

export { arrayMethodIsStrict as a, arrayReduce as b };
