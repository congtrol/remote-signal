import net from 'net';
import require$$0$1, { webcrypto } from 'crypto';
import { Transform } from 'node:stream';
import fs, { readFileSync } from 'fs';
import require$$0 from 'stream';
import zlib from 'zlib';
import path from 'path';
import os from 'os';
import tls from 'tls';
import EventEmitter from 'events';
import https from 'https';
import http from 'http';
import require$$2 from 'url';

new TextEncoder();
new TextDecoder();

function isPrivateIP(ip){
  if(ip.indexOf("0.0.0.0") === 0) return  true 
  if(ip.indexOf("127.0.0.1") === 0) return  true 
  if(ip.indexOf("192.168.") === 0) return  true 
  if(ip.indexOf("10.") === 0) return  true 
  if(ip.indexOf("172.") === 0){
    if(ip.indexOf("172.16.") === 0) return  true 
    if(ip.indexOf("172.17.") === 0) return  true 
    if(ip.indexOf("172.18.") === 0) return  true 
    if(ip.indexOf("172.19.") === 0) return  true 
    if(ip.indexOf("172.20.") === 0) return  true 
    if(ip.indexOf("172.21.") === 0) return  true 
    if(ip.indexOf("172.22.") === 0) return  true 
    if(ip.indexOf("172.23.") === 0) return  true 
    if(ip.indexOf("172.24.") === 0) return  true 
    if(ip.indexOf("172.25.") === 0) return  true 
    if(ip.indexOf("172.26.") === 0) return  true 
    if(ip.indexOf("172.27.") === 0) return  true 
    if(ip.indexOf("172.28.") === 0) return  true 
    if(ip.indexOf("172.29.") === 0) return  true 
    if(ip.indexOf("172.30.") === 0) return  true 
    if(ip.indexOf("172.31.") === 0) return  true 
  }

  return false
}


function timeStamp () {
  const t = new Date();

  let o = {}; 

  let 
  v = t.getHours();
  o.hh = v < 10 ? '0'+v : v ;
  v = t.getMinutes();
  o.mm = v < 10 ? '0'+v : v ;
  v = t.getSeconds();
  o.ss = v < 10 ? '0'+v : v ;

  return o
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
}

var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
  lookup[i$1] = code[i$1];
  revLookup[code.charCodeAt(i$1)] = i$1;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens (b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4);

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen;

  var i;
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = (tmp >> 16) & 0xFF;
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    );
  }

  return parts.join('')
}

var base64Js = {
	byteLength: byteLength_1,
	toByteArray: toByteArray_1,
	fromByteArray: fromByteArray_1
};

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = (nBytes * 8) - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
};

var write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = (nBytes * 8) - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

var ieee754 = {
	read: read,
	write: write
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var buffer = createCommonjsModule(function (module, exports) {



const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null;

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  );
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1);
    const proto = { foo: function () { return 42 } };
    Object.setPrototypeOf(proto, Uint8Array.prototype);
    Object.setPrototypeOf(arr, proto);
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
});

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
});

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf();
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value);
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
};

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
};

function allocUnsafe (size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
};

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0;
  let buf = createBuffer(length);

  const actual = buf.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0;
  const buf = createBuffer(length);
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView);
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype);

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0;
    const buf = createBuffer(len);

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len);
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
};

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length;
  let y = b.length;

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  const buffer = Buffer.allocUnsafe(length);
  let pos = 0;
  for (i = 0; i < list.length; ++i) {
    let buf = list[i];
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
        buf.copy(buffer, pos);
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        );
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos);
    }
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length;
  const mustMatch = (arguments.length > 2 && arguments[2] === true);
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  let loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  const i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  const length = this.length;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.toLocaleString = Buffer.prototype.toString;

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  let str = '';
  const max = exports.INSPECT_MAX_BYTES;
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
  if (this.length > max) str += ' ... ';
  return '<Buffer ' + str + '>'
};
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength);
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  let x = thisEnd - thisStart;
  let y = end - start;
  const len = Math.min(x, y);

  const thisCopy = this.slice(thisStart, thisEnd);
  const targetCopy = target.slice(start, end);

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1;
  let arrLength = arr.length;
  let valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i;
  if (dir) {
    let foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      let found = true;
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  const remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  const strLen = string.length;

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  let i;
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  let loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64Js.fromByteArray(buf)
  } else {
    return base64Js.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  const res = [];

  let i = start;
  while (i < end) {
    const firstByte = buf[i];
    let codePoint = null;
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1;

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = '';
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = '';
  end = Math.min(buf.length, end);

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = '';
  end = Math.min(buf.length, end);

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  let out = '';
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end);
  let res = '';
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  const newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype);

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  let val = this[offset];
  let mul = 1;
  let i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  let val = this[offset + --byteLength];
  let mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0;
  validateNumber(offset, 'offset');
  const first = this[offset];
  const last = this[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8);
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24;

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24;

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
});

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0;
  validateNumber(offset, 'offset');
  const first = this[offset];
  const last = this[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8);
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset];

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last;

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
});

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  let val = this[offset];
  let mul = 1;
  let i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  let i = byteLength;
  let mul = 1;
  let val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  const val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  const val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0;
  validateNumber(offset, 'offset');
  const first = this[offset];
  const last = this[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8);
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24); // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
});

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0;
  validateNumber(offset, 'offset');
  const first = this[offset];
  const last = this[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8);
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset];

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
});

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  let mul = 1;
  let i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  let i = byteLength - 1;
  let mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = (value >>> 24);
  this[offset + 2] = (value >>> 16);
  this[offset + 1] = (value >>> 8);
  this[offset] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);

  let lo = Number(value & BigInt(0xffffffff));
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);

  let lo = Number(value & BigInt(0xffffffff));
  buf[offset + 7] = lo;
  lo = lo >> 8;
  buf[offset + 6] = lo;
  lo = lo >> 8;
  buf[offset + 5] = lo;
  lo = lo >> 8;
  buf[offset + 4] = lo;
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
  buf[offset + 3] = hi;
  hi = hi >> 8;
  buf[offset + 2] = hi;
  hi = hi >> 8;
  buf[offset + 1] = hi;
  hi = hi >> 8;
  buf[offset] = hi;
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
});

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
});

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  let i = 0;
  let mul = 1;
  let sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  let i = byteLength - 1;
  let mul = 1;
  let sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  this[offset + 2] = (value >>> 16);
  this[offset + 3] = (value >>> 24);
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
});

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
});

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  const len = end - start;

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0);
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } else if (typeof val === 'boolean') {
    val = Number(val);
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  let i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding);
    const len = bytes.length;
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super();

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      });

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`;
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack; // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name;
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      });
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  };
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError);
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError);
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === 'bigint') {
      received = String(input);
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received);
      }
      received += 'n';
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg
  }, RangeError);

function addNumericalSeparator (val) {
  let res = '';
  let i = val.length;
  const start = val[0] === '-' ? 1 : 0;
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`;
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset');
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1));
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : '';
    let range;
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`;
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`;
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength);
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type);
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0];
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo;
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64Js.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i;
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef';
  const table = new Array(256);
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16;
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j];
    }
  }
  return table
})();

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}
});

const encoder$1 = new TextEncoder();
const decoder$3 = new TextDecoder();


const NB$2 = numberBuffer;
function numberBuffer(type, initValue = 0) {
  let buffer$1;
  if (type === undefined || typeof type !== 'string' || typeof initValue !== 'number') {
    throw TypeError('invlaid init variablie type name. ')
  }
  type = type.toUpperCase();

  if (type.includes('8')) {
    buffer$1 = buffer.Buffer.alloc(1);
    if (type.includes('I')) buffer$1.writeInt8(initValue);
    else buffer$1.writeUint8(initValue);
  } else if (type.includes('16')) {
    buffer$1 = buffer.Buffer.alloc(2);
    if (type.includes('I')) {
      if (type.includes('L')) buffer$1.writeInt16LE(initValue);
      else buffer$1.writeInt16BE(initValue);
    } else {
      if (type.includes('L')) buffer$1.writeUint16LE(initValue);
      else buffer$1.writeUint16BE(initValue);
    }
  } else if (type.includes('32')) {
    buffer$1 = buffer.Buffer.alloc(4);
    if (type.includes('I')) {
      if (type.includes('L')) buffer$1.writeInt32LE(initValue);
      else buffer$1.writeInt32BE(initValue);
    } else {
      if (type.includes('L')) buffer$1.writeUint32LE(initValue);
      else buffer$1.writeUint32BE(initValue);
    }
  } else if (type.includes('F')) {
    buffer$1 = buffer.Buffer.alloc(4);
    if (type.includes('L')) {
      buffer$1.writeFloatLE(initValue);
    } else {
      buffer$1.writeFloatBE(initValue);
    }
  } else if (type.includes('N')) { // number as string
    buffer$1 = buffer.Buffer.from(String(initValue));
  } else {
    console.log(`invalid type: ${type} or initvalue: ${initValue}`);
  }
  return buffer$1
}


const MB$2 = metaBuffer;
function metaBuffer(name, typeOrData, initValue) {
  let buffer$1;
  let bufferType = 'B';
  if (typeof typeOrData === 'number') {
    if (typeof initValue === 'number') {  // initValue 0 should be passed.
      buffer$1 = buffer.Buffer.alloc(typeOrData);
      if( initValue !== 0) buffer$1.fill(initValue);
      bufferType = 'B';
    } else {
      buffer$1 = buffer.Buffer.from(String(typeOrData));
      bufferType = 'N';
    }
  } else if (typeof typeOrData === 'string' && typeof initValue === 'number') { // number with type.
    bufferType = typeOrData.toUpperCase(); // use explicit type name
    buffer$1 = numberBuffer(typeOrData, initValue); // notice.  two categories.  n: number string.  8, 16, 32: typed number.
  } else if (typeof typeOrData === 'string' && initValue === undefined) { //  string buffer
    buffer$1 = buffer.Buffer.from(typeOrData);
    bufferType = 'S';
  } else if (typeOrData instanceof Uint8Array && initValue === undefined) { // buffer | Uint8Array
    // Buffer.from:  Copies the passed buffer data onto a new Buffer instance.
    // typecasting Uint8Array to Buffer.
    buffer$1 = (typeOrData instanceof buffer.Buffer) ? typeOrData : buffer.Buffer.from(typeOrData);
  } else if (typeOrData instanceof ArrayBuffer && initValue === undefined) { // arrayBuffer
    // Notice. typedArray is recommended instead of arrayBuffer
    buffer$1 = buffer.Buffer.from(typeOrData);
  } else if (ArrayBuffer.isView(typeOrData)) { // typedarray buffer
    buffer$1 = buffer.Buffer.from(typeOrData.buffer, typeOrData.byteOffset, typeOrData.byteLength);
  } else if (typeof typeOrData === 'object' && initValue === undefined) { //   object. like array. stringify
    buffer$1 = buffer.Buffer.from(JSON.stringify(typeOrData));
    bufferType = 'O';
  } else if (typeof typeOrData === 'boolean' && initValue === undefined) { //   object. like array. stringify
    const v = typeOrData ? 1 : 0;
    buffer$1 = buffer.Buffer.from([v]);
    bufferType = '!';
  } else {
    throw TypeError('invalid meta buffer type')
  }

  if (typeof name === 'string' && name.includes('#')) name = ''; //

  return [name, bufferType, buffer$1]
}

const MBA$1 = metaBufferArguments;
function metaBufferArguments(...args) {
  let i = 0;
  const mba = args.map(
    data => {
      const argsIndex = i++;
      // tip. MBA use index number as metabuffer's property name.
      if (typeof data === 'number') {
        // * JS's primitive Number stored as string.
        return MB$2(argsIndex, 'N', data)
      } else {
        // typedarray, dataview, array, object, boolean
        return MB$2(argsIndex, data)
      }
    });

  return mba
}

function parseTypeName(type) {
  type = type.toUpperCase();

  if (type.includes('8')) {
    if (type.includes('I')) {
      return 'int8'
    } else {
      return 'uint8'
    }
  } else if (type.includes('16')) {
    if (type.includes('I')) {
      if (type.includes('L')) {
        return 'int16_le'
      } else {
        return 'int16_be'
      }
    } else {
      if (type.includes('L')) {
        return 'uint16_le'
      } else {
        return 'uint16_be'
      }
    }
  } else if (type.includes('32')) {
    if (type.includes('I')) {
      if (type.includes('L')) {
        return 'int32_le'
      } else {
        return 'int32_be'
      }
    } else {
      if (type.includes('L')) {
        return 'uint32_le'
      } else {
        return 'uint32_be'
      }
    }
  } else if (type.includes('F')) {
    if (type.includes('L')) {
      return 'float_le'
    } else {
      return 'float_be'
    }
  } else if (type === 'B') {
    return 'buffer'
  } else if (type === 'S') { // string or arguments
    return 'string'
  } else if (type === 'N') { // number encoded as string
    return 'number'
  } else if (type === 'O') { // object encoded string
    return 'object'
  } else if (type === '!') { // boolean  1:true 0:false
    return 'boolean'
  } else {
    throw TypeError('invalid data type')
  }

}

function readTypedBuffer(simpleType, buffer, offset, length) {

  const type = parseTypeName(simpleType);

  if (type == 'int8') return buffer.readInt8(offset)
  else if (type === 'uint8') return buffer.readUint8(offset)
  else if (type === 'int16_le') return buffer.readInt16LE(offset)
  else if (type === 'int16_be') return buffer.readInt16BE(offset)
  else if (type === 'uint16_le') return buffer.readUint16LE(offset)
  else if (type === 'uint16_be') return buffer.readUint16BE(offset)
  else if (type === 'int32_le') return buffer.readInt32LE(offset)
  else if (type === 'int32_be') return buffer.readInt32BE(offset)
  else if (type === 'uint32_le') return buffer.readUint32LE(offset)
  else if (type === 'uint32_be') return buffer.readUint32BE(offset)
  else if (type === 'float_le') return buffer.readFloatLE(offset)
  else if (type === 'float_be') return buffer.readFloatBE(offset)

  else if (type === 'buffer') {
    return buffer.subarray(offset, offset + length)
  } else if (type === 'string') {
    const strBuffer = buffer.subarray(offset, offset + length);
    return decoder$3.decode(strBuffer)
  } else if (type === 'number') {
    const strNumber = buffer.subarray(offset, offset + length);
    return Number(decoder$3.decode(strNumber))
  } else if (type === 'object') {
    const objEncoded = buffer.subarray(offset, offset + length);
    try {
      return JSON.parse(decoder$3.decode(objEncoded))
    } catch (error) {
      console.log('err. obj parse');
    }
  } else if (type === 'boolean') {
    const v = buffer.readInt8(offset);
    return v === 1
  } else {
    throw TypeError('invalid data')
  }
}

function flatSubArray(args) {
  let subArr = [];
  const mainArr = args.filter(item => {
    if (Array.isArray(item[0])) subArr = subArr.concat(item);
    else return item
  });
  return mainArr.concat(subArr)
}

function pack(...args) {
  const bufArr = flatSubArray(args);
  let size = 0;
  const info = [];
  let offset = 0;

  bufArr.forEach(bufPack => {
    const [name, type, data] = bufPack;
    size += data.byteLength;

    if (typeof name === 'number' || name.length > 0) {
    // MBA item use number type name.
    // MB item use string type name.   null string means omit.
    
    // change to store more informative meta info.  
    info.push([name, type, offset, data.byteLength]); 
    
    }
    offset = size;
  });


  let infoEncoded;
  let infoSize;

  if (info.length > 0) {
    let infoStr = JSON.stringify(info);
    // console.log('pack infoStr , size:', infoStr , infoStr.length )
    infoEncoded = encoder$1.encode(infoStr);
    infoSize = infoEncoded.byteLength;
    size = size + infoSize + 2;
  }

  const buffer$1 = buffer.Buffer.alloc(size);
  offset = 0;
  bufArr.forEach(bufPack => {
    const buf = bufPack[2];
    buffer$1.set(buf, offset);
    offset += buf.byteLength;
  });

  if (info.length > 0) {
    buffer$1.set(infoEncoded, offset);
    const infoSizeBuff = NB$2('16', infoSize);
    buffer$1.set(infoSizeBuff, offset + infoSize);
    return buffer$1
  } else {
    return buffer$1
  }
}


/**
 * unpack() will use embeded meta info from the binary pack.  
 * You can specify (optional) meta obejct. 
 * (It's useful to read pure buffer data.)
 * 
 * You can get the meta object from:  getFrame(pack) , meta()
 * @param {Buffer|Uint8Array} binPack binaryData
 * @param {Object} meta *OPTION*  
 * @returns {Object|undefined} success: return Object (include buffer data).   fail: return undefined
 */
function unpack(binPack, meta) {

  const infoArr = meta || getMeta(binPack);
  if (!infoArr) return

  const buffer$1 = buffer.Buffer.from(binPack);
  const binObj = {};
  let readCounter = 0;
  infoArr.forEach(bufPack => {
    const [name, type, offset, length] = bufPack;
    binObj[name] = readTypedBuffer(type, buffer$1, offset, length);
    // console.log( '###3 len',length )
    if( length) readCounter += length;
  });

  // Can not define meta for variable size buffer 
  // unpacker support automatic property to read left(did't read) buffers.
  // console.log("######, unpack: buffer " , readCounter, buffer ,buffer.byteLength)
  if(  meta && buffer$1.byteLength !== readCounter ){
    let leftSize = buffer$1.byteLength - readCounter;
    // console.log('total,left buffer size', buffer.byteLength, leftSize )
    binObj["$OTHERS"] = readTypedBuffer('b', buffer$1, readCounter, leftSize);
  }

  // set args with values if exist.
  let mbaIndex = 0;
  let args = [];
  while( binObj[mbaIndex]){
    args.push( binObj[mbaIndex++]);
  }
  
  if( args.length > 0 ) {
    binObj.args = args; 
    binObj.$ = binObj.args; 
  }

  return binObj

}
/**
 * 
 * @param {any} data 
 * @param {Boolean} shareArrayBuffer false(default):  return new( or copied) ArrayBuffer.    true: share the input data's arrayBuffer.
 * @returns {Uint8Array}
 */
function parseUint8Array(data, shareArrayBuffer = false) {
  if (data === undefined) throw TypeError('Invalid data type: Undefined')
  if (typeof data === 'string') {
    return encoder$1.encode(data)
  } else if (typeof data === 'number') { // number -> 1 byte uint8array(number)
    return Uint8Array.from([data])
  } else if (data instanceof ArrayBuffer) { // arraybuffer -> wrap uint8array(ab)
    if (shareArrayBuffer) {
      return new Uint8Array(data)
    } else {
      const originData = new Uint8Array(data);
      const dataCopy = new Uint8Array(data.byteLength);
      dataCopy.set(originData);
      return dataCopy
    }
  } else if (ArrayBuffer.isView(data)) { // accept Buffer too.
    if (shareArrayBuffer) {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength) // DataView, TypedArray >  uint8array( use offset, length )
    } else {
      // new memory to protect origin arraybuffer.
      const originData = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      const dataCopy = new Uint8Array(data.byteLength);
      dataCopy.set(originData);
      return dataCopy
    }
  } else { // array, object
    return encoder$1.encode(JSON.stringify(data)) // object(array.. )  > JSON.str > encode > unint8array
  }
}

const B8 = parseBuffer;

function parseBuffer(data, shareArrayBuffer = false) {

  const u8 = parseUint8Array(data, shareArrayBuffer);
  if( shareArrayBuffer){
    return buffer.Buffer.from( u8.buffer, u8.byteOffset, u8.byteLength )
  }else {
    return buffer.Buffer.from(u8)
  }
}


const U8pack = parseUint8ThenConcat; // alias
/**
 * 1. parse list of data into U8 list
 * 2. return new Uint8Array merged.
 * @param  {...any} dataArray 
 * @returns 
 */
function parseUint8ThenConcat(...dataArray) {
  try {
    let bufferSize = 0;
    let offset = 0;
    const buffers = dataArray.map(data => parseUint8Array(data));
    buffers.forEach(buf => { bufferSize += buf.byteLength; });
    const buffer = new Uint8Array(bufferSize);
    buffers.forEach(buf => {
      buffer.set(buf, offset);
      offset += buf.byteLength;
    });
    return buffer
  } catch (error) {
    console.log(error);
  }
}

// MB and MBA 
function parseMetaInfo(binPack, infoSize) {
  try {
    const buffer = new Uint8Array(binPack.buffer, binPack.byteOffset, binPack.byteLength);
    const infoFrom = buffer.byteLength - infoSize - 2;
    const infoEncoded = buffer.subarray(infoFrom, buffer.byteLength - 2);
    const decoded = decoder$3.decode(infoEncoded);
    const info = JSON.parse(decoded);

    if (!Array.isArray(info) || !Array.isArray(info[0])) return

    let firstItem = info[0];
    if (!firstItem) return

    if (firstItem.length < 3) return
    const [name, type, offset] = firstItem;

    if ( typeof type !== 'string' || typeof offset !== 'number') return

    return info
  } catch (error) {
    // return undefined
  }
}


/** 
 * Meta buffer pack Tail:
 * binary Pack include TAIL(two bytes size) info at the end if it has JSON info.
 * not include TAIL if it has not JSON.
 */
const TAIL_LEN = 2;

/**
 * 
 * @param {Buffer|Uint8Array|ArrayBuffer} binPack 
 * @returns {Number} last two byte value( read Uint16 bigendian )
 */
function readTail(binPack) {
  if( binPack instanceof ArrayBuffer ){
    binPack = buffer.Buffer.from(binPack); // creates a view for ArrayBuffer, without copying.
  } 
  if (binPack instanceof Uint8Array) {
    if (binPack.byteLength <= TAIL_LEN) return 0

    const dv = new DataView(binPack.buffer, binPack.byteOffset, binPack.byteLength);
    const infoSize = dv.getUint16(binPack.byteLength - TAIL_LEN);  // last 2 bytes for json-info-length.
    return infoSize

  } else {
    // throw TypeError('invalid data type.')
    return 0
  }

}



/**
 * extract Meta info object if it has.
 * 
 * @param {Buffer|Uint8Array|ArrayBuffer} binPack 
 * @param {Boolean} showDetail add additional item info: full data type name and bytelength.
 * @returns {Object|undefined} success: return MetaInfo Object.   fail: return undefined.(No valid JSON included.)
 */
function getMeta(binPack, showDetail = false) {
  if( binPack instanceof ArrayBuffer ){
    binPack = buffer.Buffer.from(binPack); // creates a view for ArrayBuffer, without copying.
  } 
  const infoSize = readTail(binPack);
  if (infoSize === 0) return

  // check valid Meta
  let metaInfo = parseMetaInfo(binPack, infoSize);
  if (!metaInfo) return

  if (!showDetail) {
    return metaInfo
  } else {
    // add additional info
    metaInfo.forEach(bufPack => {
      const len = bufPack[3];
      if (len == undefined) {  // add size info.
        if (bufPack[1].includes('8')) bufPack[3] = 1;
        else if (bufPack[1].includes('16')) bufPack[3] = 2;
        else if (bufPack[1].includes('32')) bufPack[3] = 4;
        else if (bufPack[1].includes('F')) bufPack[3] = 4;
        else if (bufPack[1].includes('!')) bufPack[3] = 1;
      }
      bufPack[4] = parseTypeName(bufPack[1]);  // add full-type-name.
    });
    return metaInfo
  }
}

function meta( ...args){
  return getMeta( pack(...args) )
}

const CongType = {
  TYPE_LEN1: 1,
  TYPE_LEN2: 2,
  TYPE_LEN3: 3,
  TYPE_LEN4: 4
};

// support LittleEndian system.
function CongTxSync(payload) {

  if (payload.byteLength < 256) { //one byte len
    return pack(
      MB$2('#type', '8', CongType.TYPE_LEN1),
      MB$2('#payloadLen1', '8', payload.byteLength),
      MB$2('#payload', payload)
    )

  } else if (payload.byteLength < 65536) {  // 2bytes len
    return pack(
      MB$2('#type', '8', CongType.TYPE_LEN2),
      MB$2('#payloadLen2', '16L', payload.byteLength),
      MB$2('#payload', payload)
    )

  } else if (payload.byteLength < 2 ** 24) {  // 3bytes len
    let len4Buffer = Buffer.alloc(4);
    len4Buffer.writeUint32LE( payload.byteLength ); 
    let cropLen3 = len4Buffer.subarray(0,3);
    return pack(
      MB$2('#type', '8', CongType.TYPE_LEN3),
      MB$2('#payloadLen3', cropLen3),
      MB$2('#payload', payload)
    )

  } else { //use 4 bytes.
    return pack(
      MB$2('#type', '8', CongType.TYPE_LEN4),
      MB$2('#payloadLen4', '32L', payload.byteLength),
      MB$2('#payload', payload)
    )
  }

}

// let totalCong = 0;

class CongRx extends Transform {
  constructor(options) {
    super(options);
    // console.log('new congRx. totalCong:', ++totalCong )
    this.buffer = Buffer.alloc(0);
    this.frames = [];
    this.rxi = 0;
    this.rxi_zero = 0;
  }



  _transform(chunk, encoding, callback) {
    this.addData(chunk);
    if (this.frames.length > 0) {
      this.frames.forEach(frame => {
        // console.log('emit frame:', frame)
        this.push(frame);
      });
      this.frames = [];
    }
    callback();
  }


  addData(chunk) {
    // console.log('congpack chunk:', chunk )
    let c = chunk.byteLength;
    let i = 0;
    while( c-- ){
      this.rxi++;
      if( chunk[ i++ ] == 0 ){
        this.rxi_zero++;
      }
    }

    if (this.buffer.byteLength > 0) {
      this.buffer = Buffer.concat([this.buffer, chunk]);
    } else {
      this.buffer = chunk;
    }
    this.parse();
  }


  parse() {
    let head = this.buffer[0];
    let headerLen;
    let payloadSize;
    // find header
    // console.log('>> parser head, buffer:', head , this.buffer )

    if (head == CongType.TYPE_LEN1) {
       headerLen = 2;
      if (this.buffer.byteLength < headerLen) return;
       payloadSize = this.buffer.readUint8(1);

    } else if (head == CongType.TYPE_LEN2) {
       headerLen = 3;
      if (this.buffer.byteLength < headerLen) return;
       payloadSize = this.buffer.readUint16LE(1);

    } else if (head == CongType.TYPE_LEN3) {
       headerLen = 4;
      if (this.buffer.byteLength < headerLen) return;
       payloadSize = this.buffer.readUint16LE(1) + this.buffer.readUint8(3) * 65536;

    } else if (head == CongType.TYPE_LEN4) {
       headerLen = 5;
      if (this.buffer.byteLength < headerLen) return;
       payloadSize = this.buffer.readUint32LE(1);

    } else {
      console.log('DROP -UNKNOWN_TYPE-  buffer: ', this.buffer);
      this.buffer = Buffer.alloc(0);

    }


    if (payloadSize == this.buffer.byteLength - headerLen) {
      this.frames.push(this.buffer.subarray(headerLen));
      this.buffer = Buffer.alloc(0);
      return
    } else if (payloadSize < this.buffer.byteLength - headerLen) {
      this.frames.push(this.buffer.subarray(headerLen, headerLen + payloadSize));
      this.buffer = this.buffer.subarray(headerLen + payloadSize);
      this.parse();
    } else { 
      //not ready
      // console.log('+')
      return
    }


  }


}

let RemoteOptions = {
    showMessage: 'none',
    showMetric: 0,
    adminChannel: null,
    pingTimeout: 50000,
    monitorPeriod: 3000
};

const e=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function r(t,r,n,i,o){let f,s,u,h,a,c,l,p,y,g,d,b,w;for(;o>=64;){for(f=r[0],s=r[1],u=r[2],h=r[3],a=r[4],c=r[5],l=r[6],p=r[7],g=0;g<16;g++)d=i+4*g,t[g]=(255&n[d])<<24|(255&n[d+1])<<16|(255&n[d+2])<<8|255&n[d+3];for(g=16;g<64;g++)y=t[g-2],b=(y>>>17|y<<15)^(y>>>19|y<<13)^y>>>10,y=t[g-15],w=(y>>>7|y<<25)^(y>>>18|y<<14)^y>>>3,t[g]=(b+t[g-7]|0)+(w+t[g-16]|0);for(g=0;g<64;g++)b=(((a>>>6|a<<26)^(a>>>11|a<<21)^(a>>>25|a<<7))+(a&c^~a&l)|0)+(p+(e[g]+t[g]|0)|0)|0,w=((f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10))+(f&s^f&u^s&u)|0,p=l,l=c,c=a,a=h+b|0,h=u,u=s,s=f,f=b+w|0;r[0]+=f,r[1]+=s,r[2]+=u,r[3]+=h,r[4]+=a,r[5]+=c,r[6]+=l,r[7]+=p,i+=64,o-=64;}return i}const n=function(){function t(){this.digestLength=32,this.blockSize=64,this.state=new Int32Array(8),this.temp=new Int32Array(64),this.buffer=new Uint8Array(128),this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this.reset();}return t.prototype.reset=function(){return this.state[0]=1779033703,this.state[1]=3144134277,this.state[2]=1013904242,this.state[3]=2773480762,this.state[4]=1359893119,this.state[5]=2600822924,this.state[6]=528734635,this.state[7]=1541459225,this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this},t.prototype.clean=function(){for(var t=0;t<this.buffer.length;t++)this.buffer[t]=0;for(t=0;t<this.temp.length;t++)this.temp[t]=0;this.reset();},t.prototype.update=function(t,e){if(void 0===e&&(e=t.length),this.finished)throw new Error("SHA256: can't update because hash was finished.");let n=0;if(this.bytesHashed+=e,this.bufferLength>0){for(;this.bufferLength<64&&e>0;)this.buffer[this.bufferLength++]=t[n++],e--;64===this.bufferLength&&(r(this.temp,this.state,this.buffer,0,64),this.bufferLength=0);}for(e>=64&&(n=r(this.temp,this.state,t,n,e),e%=64);e>0;)this.buffer[this.bufferLength++]=t[n++],e--;return this},t.prototype.finish=function(t){if(!this.finished){const t=this.bytesHashed,n=this.bufferLength,i=t/536870912|0,o=t<<3,f=t%64<56?64:128;this.buffer[n]=128;for(var e=n+1;e<f-8;e++)this.buffer[e]=0;this.buffer[f-8]=i>>>24&255,this.buffer[f-7]=i>>>16&255,this.buffer[f-6]=i>>>8&255,this.buffer[f-5]=i>>>0&255,this.buffer[f-4]=o>>>24&255,this.buffer[f-3]=o>>>16&255,this.buffer[f-2]=o>>>8&255,this.buffer[f-1]=o>>>0&255,r(this.temp,this.state,this.buffer,0,f),this.finished=!0;}for(e=0;e<8;e++)t[4*e+0]=this.state[e]>>>24&255,t[4*e+1]=this.state[e]>>>16&255,t[4*e+2]=this.state[e]>>>8&255,t[4*e+3]=this.state[e]>>>0&255;return this},t.prototype.digest=function(){const t=new Uint8Array(this.digestLength);return this.finish(t),t},t.prototype._saveState=function(t){for(let e=0;e<this.state.length;e++)t[e]=this.state[e];},t.prototype._restoreState=function(t,e){for(let e=0;e<this.state.length;e++)this.state[e]=t[e];this.bytesHashed=e,this.finished=!1,this.bufferLength=0;},t}(),i=function(){function t(t){this.inner=new n,this.outer=new n,this.blockSize=this.inner.blockSize,this.digestLength=this.inner.digestLength;const e=new Uint8Array(this.blockSize);if(t.length>this.blockSize)(new n).update(t).finish(e).clean();else for(var r=0;r<t.length;r++)e[r]=t[r];for(r=0;r<e.length;r++)e[r]^=54;this.inner.update(e);for(r=0;r<e.length;r++)e[r]^=106;this.outer.update(e),this.istate=new Uint32Array(8),this.ostate=new Uint32Array(8),this.inner._saveState(this.istate),this.outer._saveState(this.ostate);for(r=0;r<e.length;r++)e[r]=0;}return t.prototype.reset=function(){return this.inner._restoreState(this.istate,this.inner.blockSize),this.outer._restoreState(this.ostate,this.outer.blockSize),this},t.prototype.clean=function(){for(let t=0;t<this.istate.length;t++)this.ostate[t]=this.istate[t]=0;this.inner.clean(),this.outer.clean();},t.prototype.update=function(t){return this.inner.update(t),this},t.prototype.finish=function(t){return this.outer.finished?this.outer.finish(t):(this.inner.finish(t),this.outer.update(t,this.digestLength).finish(t)),this},t.prototype.digest=function(){const t=new Uint8Array(this.digestLength);return this.finish(t),t},t}();function o(t){const e=(new n).update(t),r=e.digest();return e.clean(),r}for(var f=function(t){var e=g(t),r=e[0],n=e[1];return 3*(r+n)/4-n},s=function(t){var e,r,n=g(t),i=n[0],o=n[1],f=new c(function(t,e,r){return 3*(e+r)/4-r}(0,i,o)),s=0,u=o>0?i-4:i;for(r=0;r<u;r+=4)e=a[t.charCodeAt(r)]<<18|a[t.charCodeAt(r+1)]<<12|a[t.charCodeAt(r+2)]<<6|a[t.charCodeAt(r+3)],f[s++]=e>>16&255,f[s++]=e>>8&255,f[s++]=255&e;2===o&&(e=a[t.charCodeAt(r)]<<2|a[t.charCodeAt(r+1)]>>4,f[s++]=255&e);1===o&&(e=a[t.charCodeAt(r)]<<10|a[t.charCodeAt(r+1)]<<4|a[t.charCodeAt(r+2)]>>2,f[s++]=e>>8&255,f[s++]=255&e);return f},u=function(t){for(var e,r=t.length,n=r%3,i=[],o=16383,f=0,s=r-n;f<s;f+=o)i.push(d(t,f,f+o>s?s:f+o));1===n?(e=t[r-1],i.push(h[e>>2]+h[e<<4&63]+"==")):2===n&&(e=(t[r-2]<<8)+t[r-1],i.push(h[e>>10]+h[e>>4&63]+h[e<<2&63]+"="));return i.join("")},h=[],a=[],c="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,y=l.length;p<y;++p)h[p]=l[p],a[l.charCodeAt(p)]=p;function g(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return -1===r&&(r=e),[r,r===e?0:4-r%4]}function d(t,e,r){for(var n,i,o=[],f=e;f<r;f+=3)n=(t[f]<<16&16711680)+(t[f+1]<<8&65280)+(255&t[f+2]),o.push(h[(i=n)>>18&63]+h[i>>12&63]+h[i>>6&63]+h[63&i]);return o.join("")}a["-".charCodeAt(0)]=62,a["_".charCodeAt(0)]=63;var b,w,B={byteLength:f,toByteArray:s,fromByteArray:u},m=function(t,e,r,n,i){var o,f,s=8*i-n-1,u=(1<<s)-1,h=u>>1,a=-7,c=r?i-1:0,l=r?-1:1,p=t[e+c];for(c+=l,o=p&(1<<-a)-1,p>>=-a,a+=s;a>0;o=256*o+t[e+c],c+=l,a-=8);for(f=o&(1<<-a)-1,o>>=-a,a+=n;a>0;f=256*f+t[e+c],c+=l,a-=8);if(0===o)o=1-h;else {if(o===u)return f?NaN:1/0*(p?-1:1);f+=Math.pow(2,n),o-=h;}return (p?-1:1)*f*Math.pow(2,o-n)},E=function(t,e,r,n,i,o){var f,s,u,h=8*o-i-1,a=(1<<h)-1,c=a>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,f=a):(f=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-f))<1&&(f--,u*=2),(e+=f+c>=1?l/u:l*Math.pow(2,1-c))*u>=2&&(f++,u/=2),f+c>=a?(s=0,f=a):f+c>=1?(s=(e*u-1)*Math.pow(2,i),f+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,i),f=0));i>=8;t[r+p]=255&s,p+=y,s/=256,i-=8);for(f=f<<i|s,h+=i;h>0;t[r+p]=255&f,p+=y,f/=256,h-=8);t[r+p-y]|=128*g;},A=(b=function(t,e){const r="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.Buffer=o,e.SlowBuffer=function(t){return +t!=t&&(t=0),o.alloc(+t)},e.INSPECT_MAX_BYTES=50;const n=2147483647;function i(t){if(t>n)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,o.prototype),e}function o(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return u(t)}return f(t,e,r)}function f(t,e,r){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!o.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|l(t,e);let n=i(r);const f=n.write(t,e);return f!==r&&(n=n.slice(0,f)),n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(J(t,Uint8Array)){const e=new Uint8Array(t);return a(e.buffer,e.byteOffset,e.byteLength)}return h(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(J(t,ArrayBuffer)||t&&J(t.buffer,ArrayBuffer))return a(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(J(t,SharedArrayBuffer)||t&&J(t.buffer,SharedArrayBuffer)))return a(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return o.from(n,e,r);const f=function(t){if(o.isBuffer(t)){const e=0|c(t.length),r=i(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||q(t.length)?i(0):h(t):"Buffer"===t.type&&Array.isArray(t.data)?h(t.data):void 0}(t);if(f)return f;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return o.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function u(t){return s(t),i(t<0?0:0|c(t))}function h(t){const e=t.length<0?0:0|c(t.length),r=i(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function a(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,o.prototype),n}function c(t){if(t>=n)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n.toString(16)+" bytes");return 0|t}function l(t,e){if(o.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||J(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return Y(t).length;default:if(i)return n?-1:W(t).length;e=(""+e).toLowerCase(),i=!0;}}function p(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return "";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return "";if((r>>>=0)<=(e>>>=0))return "";for(t||(t="utf8");;)switch(t){case"hex":return N(this,e,r);case"utf8":case"utf-8":return I(this,e,r);case"ascii":return v(this,e,r);case"latin1":case"binary":return C(this,e,r);case"base64":return L(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function y(t,e,r){const n=t[e];t[e]=t[r],t[r]=n;}function g(t,e,r,n,i){if(0===t.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),q(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return -1;r=t.length-1;}else if(r<0){if(!i)return -1;r=0;}if("string"==typeof e&&(e=o.from(e,n)),o.isBuffer(e))return 0===e.length?-1:d(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):d(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function d(t,e,r,n,i){let o,f=1,s=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return -1;f=2,s/=2,u/=2,r/=2;}function h(t,e){return 1===f?t[e]:t.readUInt16BE(e*f)}if(i){let n=-1;for(o=r;o<s;o++)if(h(t,o)===h(e,-1===n?0:o-n)){if(-1===n&&(n=o),o-n+1===u)return n*f}else -1!==n&&(o-=o-n),n=-1;}else for(r+u>s&&(r=s-u),o=r;o>=0;o--){let r=!0;for(let n=0;n<u;n++)if(h(t,o+n)!==h(e,n)){r=!1;break}if(r)return o}return -1}function b(t,e,r,n){r=Number(r)||0;const i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;const o=e.length;let f;for(n>o/2&&(n=o/2),f=0;f<n;++f){const n=parseInt(e.substr(2*f,2),16);if(q(n))return f;t[r+f]=n;}return f}function w(t,e,r,n){return G(W(e,t.length-r),t,r,n)}function A(t,e,r,n){return G(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function _(t,e,r,n){return G(Y(e),t,r,n)}function U(t,e,r,n){return G(function(t,e){let r,n,i;const o=[];for(let f=0;f<t.length&&!((e-=2)<0);++f)r=t.charCodeAt(f),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function L(t,e,r){return 0===e&&r===t.length?B.fromByteArray(t):B.fromByteArray(t.slice(e,r))}function I(t,e,r){r=Math.min(t.length,r);const n=[];let i=e;for(;i<r;){const e=t[i];let o=null,f=e>239?4:e>223?3:e>191?2:1;if(i+f<=r){let r,n,s,u;switch(f){case 1:e<128&&(o=e);break;case 2:r=t[i+1],128==(192&r)&&(u=(31&e)<<6|63&r,u>127&&(o=u));break;case 3:r=t[i+1],n=t[i+2],128==(192&r)&&128==(192&n)&&(u=(15&e)<<12|(63&r)<<6|63&n,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:r=t[i+1],n=t[i+2],s=t[i+3],128==(192&r)&&128==(192&n)&&128==(192&s)&&(u=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&s,u>65535&&u<1114112&&(o=u));}}null===o?(o=65533,f=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=f;}return function(t){const e=t.length;if(e<=T)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=T));return r}(n)}e.kMaxLength=n,o.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return !1}}(),o.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}}),o.poolSize=8192,o.from=function(t,e,r){return f(t,e,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array),o.alloc=function(t,e,r){return function(t,e,r){return s(t),t<=0?i(t):void 0!==e?"string"==typeof r?i(t).fill(e,r):i(t).fill(e):i(t)}(t,e,r)},o.allocUnsafe=function(t){return u(t)},o.allocUnsafeSlow=function(t){return u(t)},o.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==o.prototype},o.compare=function(t,e){if(J(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),J(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),!o.isBuffer(t)||!o.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},o.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return o.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=o.allocUnsafe(e);let i=0;for(r=0;r<t.length;++r){let e=t[r];if(J(e,Uint8Array))i+e.length>n.length?(o.isBuffer(e)||(e=o.from(e)),e.copy(n,i)):Uint8Array.prototype.set.call(n,e,i);else {if(!o.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,i);}i+=e.length;}return n},o.byteLength=l,o.prototype._isBuffer=!0,o.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)y(this,e,e+1);return this},o.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},o.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},o.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?I(this,0,t):p.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===o.compare(this,t)},o.prototype.inspect=function(){let t="";const r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},r&&(o.prototype[r]=o.prototype.inspect),o.prototype.compare=function(t,e,r,n,i){if(J(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return -1;if(e>=r)return 1;if(this===t)return 0;let f=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);const u=Math.min(f,s),h=this.slice(n,i),a=t.slice(e,r);for(let t=0;t<u;++t)if(h[t]!==a[t]){f=h[t],s=a[t];break}return f<s?-1:s<f?1:0},o.prototype.includes=function(t,e,r){return -1!==this.indexOf(t,e,r)},o.prototype.indexOf=function(t,e,r){return g(this,t,e,r,!0)},o.prototype.lastIndexOf=function(t,e,r){return g(this,t,e,r,!1)},o.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else {if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);}const i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let o=!1;for(;;)switch(n){case"hex":return b(this,t,e,r);case"utf8":case"utf-8":return w(this,t,e,r);case"ascii":case"latin1":case"binary":return A(this,t,e,r);case"base64":return _(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return U(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0;}},o.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const T=4096;function v(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function C(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function N(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=e;n<r;++n)i+=Q[t[n]];return i}function S(t,e,r){const n=t.slice(e,r);let i="";for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}function O(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function R(t,e,r,n,i,f){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<f)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function M(t,e,r,n,i){z(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,r}function x(t,e,r,n,i){z(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=f,f>>=8,t[r+2]=f,f>>=8,t[r+1]=f,f>>=8,t[r]=f,r+8}function H(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function k(t,e,r,n,i){return e=+e,r>>>=0,i||H(t,0,r,4),E(t,e,r,n,23,4),r+4}function P(t,e,r,n,i){return e=+e,r>>>=0,i||H(t,0,r,8),E(t,e,r,n,52,8),r+8}o.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,o.prototype),n},o.prototype.readUintLE=o.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},o.prototype.readUintBE=o.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t+--e],i=1;for(;e>0&&(i*=256);)n+=this[t+--e]*i;return n},o.prototype.readUint8=o.prototype.readUInt8=function(t,e){return t>>>=0,e||O(t,1,this.length),this[t]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(t,e){return t>>>=0,e||O(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(t,e){return t>>>=0,e||O(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(t,e){return t>>>=0,e||O(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(t,e){return t>>>=0,e||O(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readBigUInt64LE=X((function(t){D(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||K(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(i)<<BigInt(32))})),o.prototype.readBigUInt64BE=X((function(t){D(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||K(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return (BigInt(n)<<BigInt(32))+BigInt(i)})),o.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},o.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},o.prototype.readInt8=function(t,e){return t>>>=0,e||O(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},o.prototype.readInt16LE=function(t,e){t>>>=0,e||O(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt16BE=function(t,e){t>>>=0,e||O(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt32LE=function(t,e){return t>>>=0,e||O(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,e){return t>>>=0,e||O(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readBigInt64LE=X((function(t){D(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||K(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return (BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),o.prototype.readBigInt64BE=X((function(t){D(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||K(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return (BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),o.prototype.readFloatLE=function(t,e){return t>>>=0,e||O(t,4,this.length),m(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,e){return t>>>=0,e||O(t,4,this.length),m(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,e){return t>>>=0,e||O(t,8,this.length),m(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,e){return t>>>=0,e||O(t,8,this.length),m(this,t,!1,52,8)},o.prototype.writeUintLE=o.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||R(this,t,e,r,Math.pow(2,8*r)-1,0);let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||R(this,t,e,r,Math.pow(2,8*r)-1,0);let i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},o.prototype.writeUint8=o.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,1,255,0),this[e]=255&t,e+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},o.prototype.writeBigUInt64LE=X((function(t,e=0){return M(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),o.prototype.writeBigUInt64BE=X((function(t,e=0){return x(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),o.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);R(this,t,e,r,n-1,-n);}let i=0,o=1,f=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===f&&0!==this[e+i-1]&&(f=1),this[e+i]=(t/o>>0)-f&255;return e+r},o.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);R(this,t,e,r,n-1,-n);}let i=r-1,o=1,f=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===f&&0!==this[e+i+1]&&(f=1),this[e+i]=(t/o>>0)-f&255;return e+r},o.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},o.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},o.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},o.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},o.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||R(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},o.prototype.writeBigInt64LE=X((function(t,e=0){return M(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),o.prototype.writeBigInt64BE=X((function(t,e=0){return x(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),o.prototype.writeFloatLE=function(t,e,r){return k(this,t,e,!0,r)},o.prototype.writeFloatBE=function(t,e,r){return k(this,t,e,!1,r)},o.prototype.writeDoubleLE=function(t,e,r){return P(this,t,e,!0,r)},o.prototype.writeDoubleBE=function(t,e,r){return P(this,t,e,!1,r)},o.prototype.copy=function(t,e,r,n){if(!o.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const i=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},o.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e);}}else "number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else {const f=o.isBuffer(t)?t:o.from(t,n),s=f.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<r-e;++i)this[i+e]=f[i%s];}return this};const $={};function j(t,e,r){$[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name;}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0});}toString(){return `${this.name} [${t}]: ${this.message}`}};}function F(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return `${t.slice(0,r)}${e}`}function z(t,e,r,n,i,o){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(o+1)}${n}`:`>= -(2${n} ** ${8*(o+1)-1}${n}) and < 2 ** ${8*(o+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new $.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,r){D(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||K(e,t.length-(r+1));}(n,i,o);}function D(t,e){if("number"!=typeof t)throw new $.ERR_INVALID_ARG_TYPE(e,"number",t)}function K(t,e,r){if(Math.floor(t)!==t)throw D(t,r),new $.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new $.ERR_BUFFER_OUT_OF_BOUNDS;throw new $.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}j("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),j("ERR_INVALID_ARG_TYPE",(function(t,e){return `The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),j("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=F(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=F(i)),i+="n"),n+=` It must be ${e}. Received ${i}`,n}),RangeError);const V=/[^+/0-9A-Za-z-_]/g;function W(t,e){let r;e=e||1/0;const n=t.length;let i=null;const o=[];for(let f=0;f<n;++f){if(r=t.charCodeAt(f),r>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320);}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r);}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128);}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128);}else {if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);}}return o}function Y(t){return B.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(V,"")).length<2)return "";for(;t.length%4!=0;)t+="=";return t}(t))}function G(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function J(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function q(t){return t!=t}const Q=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let i=0;i<16;++i)e[n+i]=t[r]+t[i];}return e}();function X(t){return "undefined"==typeof BigInt?Z:t}function Z(){throw new Error("BigInt not supported")}},b(w={exports:{}},w.exports),w.exports);
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */const _=new TextEncoder,U=new TextDecoder,L=I;function I(t,e=0){let r;if(void 0===t||"string"!=typeof t||"number"!=typeof e)throw TypeError("invlaid init variablie type name. ");return (t=t.toUpperCase()).includes("8")?(r=A.Buffer.alloc(1),t.includes("I")?r.writeInt8(e):r.writeUint8(e)):t.includes("16")?(r=A.Buffer.alloc(2),t.includes("I")?t.includes("L")?r.writeInt16LE(e):r.writeInt16BE(e):t.includes("L")?r.writeUint16LE(e):r.writeUint16BE(e)):t.includes("32")?(r=A.Buffer.alloc(4),t.includes("I")?t.includes("L")?r.writeInt32LE(e):r.writeInt32BE(e):t.includes("L")?r.writeUint32LE(e):r.writeUint32BE(e)):t.includes("F")?(r=A.Buffer.alloc(4),t.includes("L")?r.writeFloatLE(e):r.writeFloatBE(e)):t.includes("N")?r=A.Buffer.from(String(e)):console.log(`invalid type: ${t} or initvalue: ${e}`),r}const T=v;function v(t,e,r){let n,i="B";if("number"==typeof e)"number"==typeof r?(n=A.Buffer.alloc(e),0!==r&&n.fill(r),i="B"):(n=A.Buffer.from(String(e)),i="N");else if("string"==typeof e&&"number"==typeof r)i=e.toUpperCase(),n=I(e,r);else if("string"==typeof e&&void 0===r)n=A.Buffer.from(e),i="S";else if(e instanceof Uint8Array&&void 0===r)n=e instanceof A.Buffer?e:A.Buffer.from(e);else if(e instanceof ArrayBuffer&&void 0===r)n=A.Buffer.from(e);else if(ArrayBuffer.isView(e))n=A.Buffer.from(e.buffer,e.byteOffset,e.byteLength);else if("object"==typeof e&&void 0===r)n=A.Buffer.from(JSON.stringify(e)),i="O";else {if("boolean"!=typeof e||void 0!==r)throw TypeError("invalid meta buffer type");{const t=e?1:0;n=A.Buffer.from([t]),i="!";}}return "string"==typeof t&&t.includes("#")&&(t=""),[t,i,n]}const C=N;function N(...t){let e=0;const r=t.map((t=>{const r=e++;return "number"==typeof t?T(r,"N",t):T(r,t)}));return r.push(T("$","8",r.length)),r}function S(t){if((t=t.toUpperCase()).includes("8"))return t.includes("I")?"int8":"uint8";if(t.includes("16"))return t.includes("I")?t.includes("L")?"int16_le":"int16_be":t.includes("L")?"uint16_le":"uint16_be";if(t.includes("32"))return t.includes("I")?t.includes("L")?"int32_le":"int32_be":t.includes("L")?"uint32_le":"uint32_be";if(t.includes("F"))return t.includes("L")?"float_le":"float_be";if("B"===t)return "buffer";if("S"===t)return "string";if("N"===t)return "number";if("O"===t)return "object";if("!"===t)return "boolean";throw TypeError("invalid data type")}function O(t,e,r,n){const i=S(t);if("int8"==i)return e.readInt8(r);if("uint8"===i)return e.readUint8(r);if("int16_le"===i)return e.readInt16LE(r);if("int16_be"===i)return e.readInt16BE(r);if("uint16_le"===i)return e.readUint16LE(r);if("uint16_be"===i)return e.readUint16BE(r);if("int32_le"===i)return e.readInt32LE(r);if("int32_be"===i)return e.readInt32BE(r);if("uint32_le"===i)return e.readUint32LE(r);if("uint32_be"===i)return e.readUint32BE(r);if("float_le"===i)return e.readFloatLE(r);if("float_be"===i)return e.readFloatBE(r);if("buffer"===i)return e.subarray(r,r+n);if("string"===i){const t=e.subarray(r,r+n);return U.decode(t)}if("number"===i){const t=e.subarray(r,r+n);return Number(U.decode(t))}if("object"!==i){if("boolean"===i){return 1===e.readInt8(r)}throw TypeError("invalid data")}{const t=e.subarray(r,r+n);try{return JSON.parse(U.decode(t))}catch(t){console.log("err. obj parse");}}}function R(...t){const e=function(t){let e=[];return t.filter((t=>{if(!Array.isArray(t[0]))return t;e=e.concat(t);})).concat(e)}(t);let r=0;const n=[];let i,o,f=0;e.forEach((t=>{const[e,i,o]=t;r+=o.byteLength,("number"==typeof e||e.length>0)&&n.push([e,i,f,o.byteLength]),f=r;})),n.length>0&&(i=_.encode(JSON.stringify(n)),o=i.byteLength,r=r+o+2);const s=A.Buffer.alloc(r);if(f=0,e.forEach((t=>{const e=t[2];s.set(e,f),f+=e.byteLength;})),n.length>0){s.set(i,f);const t=L("16",o);return s.set(t,f+o),s}return s}function M(t,e){const r=e||Q(t);if(!r)return;const n=A.Buffer.from(t),i={};let o=0;if(r.forEach((t=>{const[e,r,f,s]=t;i[e]=O(r,n,f,s),s&&(o+=s);})),e&&n.byteLength!==o){let t=n.byteLength-o;i.$OTHERS=O("b",n,o,t);}if(i.$){const t=i.$,e=[];for(let r=0;r<t;r++)e.push(i[r]);i.args=e,i.$=i.args;}return i}const x=H;function H(t,e=!1){if(void 0===t)throw TypeError("Invalid data type: Undefined");if("string"==typeof t)return _.encode(t);if("number"==typeof t)return Uint8Array.from([t]);if(t instanceof ArrayBuffer){if(e)return new Uint8Array(t);{const e=new Uint8Array(t),r=new Uint8Array(t.byteLength);return r.set(e),r}}if(ArrayBuffer.isView(t)){if(e)return new Uint8Array(t.buffer,t.byteOffset,t.byteLength);{const e=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),r=new Uint8Array(t.byteLength);return r.set(e),r}}return _.encode(JSON.stringify(t))}const k=P;function P(t,e=!1){const r=H(t,e);return e?A.Buffer.from(r.buffer,r.byteOffset,r.byteLength):A.Buffer.from(r)}const $=j;function j(...t){const e=t.map((t=>P(t)));return A.Buffer.concat(e)}const F=z;function z(...t){try{let e=0,r=0;const n=t.map((t=>H(t)));n.forEach((t=>{e+=t.byteLength;}));const i=new Uint8Array(e);return n.forEach((t=>{i.set(t,r),r+=t.byteLength;})),i}catch(t){console.log(t);}}function D(t){return Array.prototype.map.call(new Uint8Array(t),(t=>("00"+t.toString(16)).slice(-2))).join("")}function K(t,e){if(t.byteLength!==e.byteLength)return !1;for(let r=0;r<t.byteLength;r++)if(t[r]!==e[r])return !1;return !0}function V(t){return 0===J(t)?t.byteLength:t.byteLength-J(t)-Y}function W(t,e){try{const r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=r.byteLength-e-2,i=r.subarray(n,r.byteLength-2),o=U.decode(i),f=JSON.parse(o);if(!Array.isArray(f)||!Array.isArray(f[0]))return;let s=f[0];if(!s)return;if(s.length<3)return;const[u,h,a]=s;if("string"!=typeof h||"number"!=typeof a)return;return f}catch(t){}}const Y=2;function G(t){if(t instanceof ArrayBuffer&&(t=A.Buffer.from(t)),t instanceof Uint8Array){if(t.byteLength<=Y)return 0;return new DataView(t.buffer,t.byteOffset,t.byteLength).getUint16(t.byteLength-Y)}return 0}function J(t){if(t instanceof ArrayBuffer&&(t=A.Buffer.from(t)),t instanceof Uint8Array){const e=t.byteLength;if(e<=Y)return 0;const r=G(t);if(0===r||r>e)return 0;return W(t,r)?r:0}return 0}function q(t){const e=V(t);return t.subarray(0,e)}function Q(t,e=!1){t instanceof ArrayBuffer&&(t=A.Buffer.from(t));const r=G(t);if(0===r)return;let n=W(t,r);return n?e?(n.forEach((t=>{null==t[3]&&(t[1].includes("8")?t[3]=1:t[1].includes("16")?t[3]=2:t[1].includes("32")||t[1].includes("F")?t[3]=4:t[1].includes("!")&&(t[3]=1)),t[4]=S(t[1]);})),n):n:void 0}function X(...t){return q(R(...t))}function Z(...t){return Q(R(...t))}var tt=Object.freeze({__proto__:null,Buffer:A.Buffer,NB:L,numberBuffer:I,MB:T,metaBuffer:v,MBA:C,metaBufferArguments:N,parseTypeName:S,readTypedBuffer:O,pack:R,unpack:M,U8:x,parseUint8Array:H,B8:k,parseBuffer:P,B8pack:$,parseBufferThenConcat:j,U8pack:F,parseUint8ThenConcat:z,hex:D,equal:K,getBufferSize:V,parseMetaInfo:W,TAIL_LEN:Y,readTail:G,getMetaSize:J,getBuffer:q,getMeta:Q,rawPack:X,meta:Z,metaDetail:function(...t){return Q(R(...t),!0)},getMetaDetail:function(t){return Q(t,!0)}});o.hash=function(t){return o(x(t))},o.hex=function(t){return D(o.hash(t))},o.hmac=function(t,e){return function(t,e){const r=new i(t).update(e),n=r.digest();return r.clean(),n}(x(t),x(e))};const et=T;let rt={AUTH_REQ:176,AUTH_NONCE:177,AUTH_HMAC:178,AUTH_ACK:179,AUTH_FAIL:180,ENC_PACK:182,ENC_E2E:183,ENC_488:184};for(let t in rt)rt[rt[t]]=t;const nt={AUTH_REQ:Z(et("header","8",0),et("reserved","8",0)),AUTH_NONCE:Z(et("header","8",0),et("unixTime","32L",0),et("milTime","32L",0),et("nonce",A.Buffer.alloc(4))),AUTH_HMAC:Z(et("header","8",0),et("id8",A.Buffer.alloc(8)),et("hmac8",A.Buffer.alloc(8)),et("nonce",A.Buffer.alloc(4))),AUTH_ACK:Z(et("header","8",0),et("hmac8",A.Buffer.alloc(8))),AUTH_TOCKEN:Z(et("header","8",0),et("tocken",A.Buffer.alloc(20))),ENC_PACK:Z(et("type","8",0),et("len","32L",0),et("salt12",A.Buffer.alloc(12)),et("hmac",8,0)),ENC_88:Z(et("type","8",0),et("len","16L",0),et("otpSrc8",A.Buffer.alloc(8)),et("hmac8",A.Buffer.alloc(8))),ENC_488:Z(et("type","8",0),et("len","32L",0),et("otpSrc8",A.Buffer.alloc(8)),et("hmac8",A.Buffer.alloc(8)))};function it(t){let e=t[t.length-1];return e[2]+e[3]}const ot={AUTH_REQ:it(nt.AUTH_REQ),AUTH_NONCE:it(nt.AUTH_NONCE),AUTH_HMAC:it(nt.AUTH_HMAC),AUTH_ACK:it(nt.AUTH_ACK),ENC_PACK:it(nt.ENC_PACK),ENC_88:it(nt.ENC_88),ENC_488:it(nt.ENC_488)};let ft,st=!1;try{st="[object process]"===Object.prototype.toString.call(global.process);}catch(t){}function ut(t){return ft.getRandomValues(A.Buffer.alloc(t))}st?(console.log("-- Boho in Node.js"),ft=webcrypto):"function"==typeof importScripts?(ft=self.crypto,console.log("-- Boho in Web Worker")):"undefined"!=typeof document&&(ft=window.crypto,"object"!=typeof ft.subtle?console.log("-- Boho in Web Browser: No WebCrypto API."):console.log("-- Boho in Web Browser: WebCrypto Ready."));const ht=T,at=L;class ct{constructor(){this._id8=A.Buffer.alloc(8),this._otpSrc44=A.Buffer.alloc(44),this._otp36=A.Buffer.alloc(36),this._hmac=A.Buffer.alloc(32),this.auth_salt12=A.Buffer.alloc(12),this.localNonce=A.Buffer.alloc(4),this.remoteNonce=A.Buffer.alloc(4),this.isAuthorized=!1,this.dataMax=64;}set_id8(t){let e=k(t);this._id8.fill(0),e.copy(this._id8,0,0,8);}set_hash_id8(t){k(o.hash(t)).copy(this._id8,0,0,8);}set_key(t){k(o.hash(t)).copy(this._otpSrc44,0,0,32);}copy_id8(t){t.copy(this._id8,0,0,8);}copy_key(t){t.copy(this._otpSrc44,0,0,32);}sha256_n(t,e){let r=o.hash(t);for(let t=0;t<e;t++)r=o.hash(r);return r}set_clock_rand(){let t=Date.now(),e=parseInt(t/1e3);t%=4294967295;A.Buffer.concat([at("32L",e),at("32L",t),ut(4)]).copy(this._otpSrc44,32);}set_clock_nonce(t){let e=Date.now(),r=parseInt(e/1e3);e%=4294967295;A.Buffer.concat([at("32L",r),at("32L",e),t]).copy(this._otpSrc44,32);}set_salt12(t){t.copy(this._otpSrc44,32);}resetOTP(){k(o.hash(this._otpSrc44)).copy(this._otp36,0,0,32);}getIndexOTP(t){return this._otp36.writeUInt32LE(t,32),o.hash(this._otp36)}generateHMAC(t){let e=A.Buffer.concat([this._otpSrc44,t]);this._hmac=k(o.hash(e));}getHMAC8(t){let e=A.Buffer.concat([this._otpSrc44,t]);return this._hmac=k(o.hash(e)),this._hmac.subarray(0,8)}xotp(t,e=0,r=!1){let n=(t=k(t,r)).byteLength,i=e,o=0,f=0;for(;n>0;){f=n<32?n:32;let e=this.getIndexOTP(++i);for(let r=0;r<f;r++)t[o++]^=e[r];n-=32;}return t}auth_req(){return R(T("#type","8",rt.AUTH_REQ),T("#reserved","8",0))}auth_nonce(){let t=Date.now(),e=Math.floor(t/1e3),r=t%1e3;return this.localNonce=ut(4),this.auth_salt12=A.Buffer.concat([at("32L",e),at("32L",r),this.localNonce]),A.Buffer.concat([at("8",rt.AUTH_NONCE),this.auth_salt12])}auth_hmac(t){let e=M(t,nt.AUTH_NONCE);if(e){let t=A.Buffer.concat([at("32L",e.unixTime),at("32L",e.milTime),e.nonce]);this.set_salt12(t),this.localNonce=ut(4),this.generateHMAC(this.localNonce);let r=this._hmac.subarray(0,8);return this.remoteNonce=e.nonce,R(ht("#header","8",rt.AUTH_HMAC),ht("#id8",this._id8),ht("#hmac8",r),ht("#nonce",this.localNonce))}return !1}check_auth_hmac(t){let e;if(t instanceof Uint8Array){if(e=M(t,nt.AUTH_HMAC),!e)return}else e=t;this.set_salt12(this.auth_salt12),this.generateHMAC(e.nonce);let r=this._hmac.subarray(0,8);if(K(e.hmac8,r)){this.remoteNonce=e.nonce;let t=A.Buffer.concat([this.localNonce,this.remoteNonce,this.localNonce]);this.set_salt12(t),this.generateHMAC(e.nonce);let r=this._hmac.subarray(0,8),n=X(ht("header","8",rt.AUTH_ACK),ht("hmac8",r));return this.isAuthorized=!0,n}return !1}check_auth_ack_hmac(t){let e=M(t,nt.AUTH_ACK);if(e){let t=A.Buffer.concat([this.remoteNonce,this.localNonce,this.remoteNonce]);if(this.set_salt12(t),this.generateHMAC(this.localNonce),K(this._hmac.subarray(0,8),e.hmac8))return this.isAuthorized=!0,!0}}encrypt_488(t){if(!this.isAuthorized)return;t=k(t),this.set_clock_nonce(this.remoteNonce),this.resetOTP();let e=this.getHMAC8(t),r=this.xotp(t);return R(T("#type","8",rt.ENC_488),T("#len","32L",t.byteLength),T("#otpSrc8",this._otpSrc44.subarray(32,40)),T("#hmac8",e),T("#xdata",r))}decrypt_488(t){let e=M(t=k(t),nt.ENC_488);if(e){let t=A.Buffer.concat([e.otpSrc8,this.localNonce]);this.set_salt12(t),this.resetOTP();let r=e.$OTHERS.subarray(0,e.len),n=this.xotp(r);if(K(this.getHMAC8(n),e.hmac8))return n}}encryptPack(t){t=k(t),this.set_clock_rand(),this.resetOTP();let e=this.getHMAC8(t),r=this.xotp(t);return R(T("#type","8",rt.ENC_PACK),T("#len","32L",t.byteLength),T("#salt12",this._otpSrc44.subarray(32)),T("#hmac8",e),T("#xdata",r))}decryptPack(t){if(t[0]!==rt.ENC_PACK)return;if(t.readUint32LE(1)==t.byteLength-ot.ENC_PACK)try{let e=M(t,nt.ENC_PACK);if(!e)return;this.set_salt12(e.salt12),this.resetOTP();let r=e.$OTHERS,n=this.xotp(r),i=this.getHMAC8(n);if(K(e.hmac,i))return e.data=n,e}catch(t){}}encrypt_e2e(t,e){let r=A.Buffer.alloc(32);r.set(this._otpSrc44.subarray(0,32)),this.set_key(e);let n=this.encryptPack(t);return this._otpSrc44.set(r),n}decrypt_e2e(t,e){let r=A.Buffer.alloc(32);r.set(this._otpSrc44.subarray(0,32)),this.set_key(e);let n=this.decryptPack(t);return this._otpSrc44.set(r),n}}var lt=A.Buffer;

var boho = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Boho: ct,
  BohoMsg: rt,
  Buffer: lt,
  MBP: tt,
  Meta: nt,
  MetaSize: ot,
  RAND: ut,
  sha256: o,
  get webCrypto () { return ft; }
});

const WS_PORT = 7777;
const TCP_PORT = 7778;

let ENC_MODE = {
  "NO": 0,
  "YES": 1,
  "AUTO": 2
};

for (let c in ENC_MODE) { ENC_MODE[ENC_MODE[c]] = c; }


const SIZE_LIMIT = {
  TAG_LEN1: 255,
  TAG_LEN2: 65535
};

let PAYLOAD_TYPE = {
  EMPTY: 0, 
  STRING: 1,
  BUFFER: 2, 
  OBJECT: 3, // one stringify able object. no buffer.
  MJSON: 4, // multiple stringify able obejct.  JSON string. with top levle array , no buffer
  MBA: 5  // "meta_buffer_arguments" arbitary types.  buffer included.
};
for (let c in PAYLOAD_TYPE) { PAYLOAD_TYPE[PAYLOAD_TYPE[c]] = c; }
// console.log( PAYLOAD_TYPE )

// MJSON: multiple arguments 
// accepet only string, number, root depth js primittive object, 
// unpack and will send to receiver handler with multiple params.

// MBA: buffer pack of multiple arguments.  check "meta-buffer-pack" module. 
// MBA: when armuents includes raw Buffer( TypedArray )

// remote message pack one byte header. 
let RemoteMsg = {

  /* 
  * 0~127dec.  reserved. for text stream.
  * 0~31: control code
  * 32~126: ascii charactor
  * 127: DEL
  */
  
  "ADMIN_REQ": 0xA0,
  "ADMIN_ACK": 0xA1,

  // DO NOT USE 
  // range: 0xB0~ 0xBF
  // It's Boho encryption message header.

  // C. Remote status contorl.
  "SERVER_READY": 0xC0,
  "CID_REQ": 0xC1, 
  "CID_ACK": 0xC2,  
  // ..
  "LOOP": 0xCB,
  "ECHO": 0xCC,
  "PING": 0xCD,  
  "PONG": 0xCE,
  "CLOSE": 0xCF,
  // ~CF


  // D. Remote data signaling
  "SIGNAL": 0xD0,  
  "SIGNAL_REQ": 0xD1, 
  "SIGNAL_E2E": 0xD2, 
  "SUBSCRIBE": 0xD3,
  "SUBSCRIBE_REQ": 0xD4, 
  "UNSUBSCRIBE": 0xD5, 
  // ..
  "IAM": 0xD9,
  "IAM_ACK": 0xDA,
  //.. 
  "SET": 0xDB,   // setting server database.
  "RESPONSE_CODE": 0xDC,   
  "RESPONSE_MBP": 0xDD,   
  "REQUEST": 0xDE,
  "RESPONSE": 0xDF,
  // ~DF


  // F. Framing Flow control related framing protocol.(CongPacket)
  "FLOW_MODE": 0xF0,
  "WAIT": 0xF1,
  "RESUME": 0xF2,
  //..
  "TIME_OUT": 0xFD,
  "OVER_SIZE": 0xFE,
  "OVER_FLOW": 0xFF

};

for (let c in RemoteMsg) { RemoteMsg[RemoteMsg[c]] = c; }

// console.log( RemoteMsg );

const Meta = {

    IAM_ACK: meta( //
      MB$2('header','8', 0)
    //  MBP.MB('iamInfo', varsize)  // size will change.
    ),
      

};

const decoder$2 = new TextDecoder();

const NB$1 = NB$2; 
const MB$1 = MB$2;


class ServerRemoteCore {
  constructor( socket, manager) {

    this.socket = socket; 
    socket.isAlive = true;
    socket.txCounter = 0;
    socket.rxCounter = 0;
    socket.openTime = Date.now();

    this.boho = new ct();
    this.encMode = ENC_MODE.AUTO; // use encryption after auth. if not use secureline
    this.channels = new Set();  //  sub tags
    this.memory = new Map();
    
    this.ssid = ServerRemoteCore.getID();  // ordered index number
    console.log('ssid', this.ssid);
    this.manager = manager;

    this.cid ;  // 초기에 미지정,  요청시 랜덤,  인증시 db cid등록.
    
    // webcrypto.getRandomValues( Buffer.alloc(3) ).toString('base64') 
    // this.manager.cid_map.set( this.cid , this )

    this.did; // device id. load from DB
    this.nick; // load from DB

    this.adminLevel = 0; //normal user.  adminuser 1~
    this.lastEchoMessage = "N";
    this.privateNode = false;
    this.HOME_CHANNEL = "";

    // this.uuid = webcrypto.randomUUID();
    // this.id = String(this.ssid) 
    // this.id = webcrypto.getRandomValues( Buffer.alloc(15) ).toString('base64') //15bytes, 20 characters
    // this.cid = webcrypto.getRandomValues( Buffer.alloc(3) ).toString('hex') 
    


  }

  static ssid = 1;
  static getID() {
    return ServerRemoteCore.ssid++;
  }



  showMessageLog(message, isBinary){
    let from = this.boho.isAuthorized ? `did: ${this.did} ( ${this.cid}) ` : "";
    if(isBinary){
      let cmdName = RemoteMsg[message[0] ]; 
      if( !cmdName ) cmdName =  rt[message[0] ]; 
      cmdName = '[SHOW_MESSAGE][ ' + cmdName + ' ]';
      if(message.byteLength > 40 ){
        console.log(cmdName + from + ' LEN:', message.length );
      }else {
        console.log(cmdName + from , message );
      }

    }else {
      console.log(from + '[SHOW_MESSAGE][ STR ] %s', message );
    }
  }

  // TCP or WebSocket
  onSocketMessage(message, isBinary = true) {

    this.receiveMonitor();
    // this.permissionChecker()
    
    if(RemoteOptions.showMessage === 'message') this.showMessageLog(message,isBinary);
   
    let cmd , decoded; 
    if( isBinary){
      cmd = message[0]; 
       
    
      if( cmd === rt.ENC_488 ){
        let from = this.boho.isAuthorized ? this.cid : "anonymous";
        console.log(`>> [E488] from: ${from} LEN ${message.byteLength}`);
        // console.log( "ENC buffer", message)
        try{
          decoded = this.boho.decrypt_488( message );
        }catch(err){
          console.log('-- E488 DEC_FAIL', err);
          return
        }

        if( decoded ){
          cmd = decoded[0];
          message = decoded;   //시그널메시지
          // console.log('[D]', RemoteMsg[ cmd ] )
        }else {
          return
        }
    
      }else if( cmd === rt.ENC_E2E ){
        // 이걸 받았다는건 이미 암호통신모드 인것이다.
        
          try{
            decoded = this.boho.decrypt_488( message );
            //헤더를 읽고 헤더크기만큼만 해석한다.
          }catch(err){
            console.log('-- E2E DEC_FAIL', err);
            return
          }
  
          // console.log('e2e unpack:', decoded )
          if( decoded ){
            cmd = decoded[0];
            // decoded has msg_header only. 
            message.set( decoded ,ot.ENC_488); // set decoded signal_e2e headaer.
            message = message.subarray( ot.ENC_488 ); // reset offset.
            // console.log('[D]', RemoteMsg[ cmd ] )
          }else {
            return
          }
   

      }else;

      switch(cmd){ 
        case RemoteMsg.PING:
          console.log('ping from:' , this.cid );
          this.pong();
          break;

        case RemoteMsg.PONG:
          // console.log('<-pong')
          break;

        case RemoteMsg.CID_REQ:
          //값이 없는경우에만 랜덤생성후 cid_map등록, 클라이언트에 전송.
          if( !this.cid ){
            this.cid = webcrypto.getRandomValues( Buffer.alloc(3) ).toString('base64'); 
            this.manager.cid_map.set( this.cid , this );
          }

          console.log('<< SENDING CID_ACK:', this.cid);
          this.send_enc_mode( pack( 
            MB$1('#response_cid', '8', RemoteMsg.CID_ACK ),
            MB$1('#cid', this.cid )
            // MB('#cid', this.cid +':'+ this.ssid )
          ));
          break;


        case RemoteMsg.ECHO : // echo back. 
          // return frame without modify. 
          try {
            let msg = decoder$2.decode( message.subarray(1));
            this.lastEchoMessage = msg;            
          } catch (error) {
            // console.log('ECHO message is not a text')
          }
          this.send(message, isBinary);
          break;
        case RemoteMsg.LOOP : // loop back. 
          // return only payload. useful to loopback test
          let payloadOnly = message.subarray(1);
          this.send(payloadOnly, isBinary);
          break;

        case RemoteMsg.IAM : // iam
          if(message.byteLength > 1){
            let iamInfo = message.subarray(1);
            this.nick = decoder$2.decode(iamInfo);  
            console.log('iam nick reset', this.nick);
          }
          this.iamResponse();
          break;


          //시그널메시지,  채널값은 여기서 해석하여 채널브로트캐스터메니저에 전달.
          // 채널을 인자로 넘기지만, 데이타 정보는 시그널 메시지에서 헤더가 포함된 시그널 통메시지 그대로 전달됨
        case RemoteMsg.SIGNAL_E2E :
        case RemoteMsg.SIGNAL :
          if( message.byteLength >= 3 ){


            let tagLen = message.readUInt8(1); 
            if( message.byteLength >= tagLen + 2 ){
              let tag = message.subarray(2, 2 + tagLen );
              tag = decoder$2.decode(tag);

              // console.log('signal tag:' , tag )
              // console.log('this.memory:' , this.memory )

              if( tag.includes('$') ){
                let setKey, right , newTag;
                let newKey;
                if(tag.indexOf('#') > 2 ){
                  setKey = tag.substring(0, tag.indexOf('#') );
                  right = tag.substring( tag.indexOf('#') );
                  console.log('setkey for tag', setKey);
        
                }else if(tag.indexOf('@') > 2 ){
                  setKey = tag.substring(0, tag.indexOf('@') );
                  right = tag.substring( tag.indexOf('@') );
                  console.log('setkey for cid', setKey);
                }
                
                // substitution:  set values. ex $name=value
                if( newKey = this.memory.get( setKey )){
                  newTag = newKey + right;
                  let newBody = message.subarray( 2 + tagLen );
                  let newHead = Buffer.alloc( 2 + newTag.length );
                  newHead[0] = message[0];
                  newHead[1] = newTag.length;
                  let newTagBuffer = Buffer.from(newTag);
                  newHead.set( newTagBuffer, 2);
                  let newMessage = Buffer.concat( [ newHead, newBody ]);
                  //
                  this.manager.sender(newTag ,this , newMessage, true );
                  break;
                }
              }
              
              this.manager.sender(tag ,this , message, true );

            }
          }
          break;

        case RemoteMsg.SIGNAL_REQ :  
          if( message.byteLength >= 6 ){


                let msgID = message.readUInt16BE(1); 
                let tagLen = message.readUInt8(3); 
                if( message.byteLength >= tagLen + 4 ){
                  let tag = message.subarray(4, 4 + tagLen );
                  tag = decoder$2.decode(tag);


                  let [result , info] = this.manager.sender(tag ,this , message, isBinary );
                    //let code = 0 // 0~127 success.
                    let mp ,code =0 ;
                    if( result == 'ok'){
                      mp = pack( MB$1('receiver','8',info));
                    }else {
                      mp = pack( MB$1('result', info));
                      code = 0xff;
                    }
                    this.response(  msgID, code ,mp  );
                }

            }
          break;



        case RemoteMsg.UNSUBSCRIBE:
          if(message.byteLength == 2 ){
            this.manager.unsubscribe([""] ,this );
          }else if( message.byteLength >= 3 ){
              let tagLen = message.readUInt8(1); 

              if( message.byteLength == tagLen + 2 ){
                let tag = message.subarray(2, 2 + tagLen );
                tag = decoder$2.decode(tag);
                // console.log('unsub:  tag', tag)
                let tagList = tag.split(',');
                this.manager.unsubscribe(tagList ,this );
              }
          }
        break;

        case RemoteMsg.SET: 
          if( message.byteLength >= 3 ){
            let setLen = message.readUInt8(1); 
            if( message.byteLength == setLen + 2 ){
              let set = message.subarray(2, 2 + setLen );
              set = decoder$2.decode(set);
              let setList = set.split(',');
              // console.log('######### SET List', setList)

              // multiple set use  ',' comma separator.
              // single set format: begin with $ , one char , then '=' and value sting.
              // ex.   "$1=channel_name"
              // ex.   "$1=firt_channel,$2=other_channel"
             setList.forEach((setStr,i)=>{
                if( setStr.indexOf('$') == 0 && setStr.includes('=')){
                  let key = setStr.substring( 0, setStr.indexOf('=') );
                  let value = setStr.substring( setStr.indexOf('=') + 1 );
                  if(key && value ){
                    // console.log( 'key: ', key, 'value: ',value)
                    let memoryKeyLimit = 3;
                    if( this.memory.size < memoryKeyLimit ){
                      this.memory.set( key, value);
                    }else if( this.memory.has( key )){
                      console.log('this.memory come to sizelimit. but change value is allowed' );
                      this.memory.set( key, value);
                    }else {
                      console.log('this.memory size over. no addition allowed, change is okay.', this.memory.size );
                    }
                  }else if( key && value == ""){
                    console.log('delete memory key', key );
                    this.memory.delete(key);
                  }
                  
                }
              });
              
              console.log('>> SET memory:', this.memory );

            }
          }
        break;

        case RemoteMsg.SUBSCRIBE: // 1byte tagLen
          if( message.byteLength >= 3 ){
            let tagLen = message.readUInt8(1); 
            if( message.byteLength == tagLen + 2 ){
              let tag = message.subarray(2, 2 + tagLen );
              tag = decoder$2.decode(tag);
              let tagList = tag.split(',');
              console.log('SUBSCRIBE req splittagList', tagList);
              this.manager.subscribe(tagList ,this );
            }
          }
        break;

        case RemoteMsg.SUBSCRIBE_REQ:  // 2bytes tagLen
          // console.log('#####recv sub_req ', message, message.byteLength )
          if( message.byteLength >= 6 ){
              let msgID = message.readUInt16BE(1); 
              let tagLen = message.readUInt16BE(3); 
              if( message.byteLength == tagLen + 5 ){
                let tag = message.subarray(5, 5 + tagLen );
                tag = decoder$2.decode(tag);
                let tagList = tag.split(',');
                console.log('>> SUBSCRIBE_REQ from:', this.cid, tagList);
                let size = this.manager.subscribe(tagList ,this );

                this.response( msgID,  size );
              }else {
                this.response( msgID, 255 );
              }
          }
        break;

        case RemoteMsg.REQUEST:  // 1byte tagLen
          if( message.byteLength >= 6 ){
              let msgID = message.readUInt16BE(1); 
              let tagLen = message.readUInt8(3); 

              if( message.byteLength == tagLen + 4 ){
                let tag = decoder$2.decode(message.subarray(4, 4 + tagLen ));
                console.log('>> REQUEST tag from:',tag, this.cid  );
               
                if(!this.manager.authManager ) return

                 this.manager.authManager.getPublic(tag ).then( result=>{
                  console.log('public info', result );
                  if(result){
             
                    this.response( msgID,  0, 
                      pack( 
                        MB$1('req', tag),
                        MB$1('result', result )
                        ));
                  }else {
                    this.response( msgID,  0, 
                      pack( 
                        MB$1('req', tag),
                        MB$1('result', "NOP" )
                        ));

                  }
                }).catch(err=>{
                  this.response( msgID, 255 );
                });


              }else {
                this.response( msgID, 255 );
              }
          }
        break;

        case RemoteMsg.CLOSE:
          if(message.byteLength > 1){
            let reason = decoder$2.decode( message.subarray(1));  
            console.log('>> CLOSE reason:', reason );
            this.close();
          }
        break;


        // Auth
        case rt.AUTH_REQ:
          let auth_nonce_pack = this.boho.auth_nonce(); 
          console.log('auth_nonce_pack', auth_nonce_pack );
          this.send( auth_nonce_pack );
          if(this.boho.isAuthorized){
            console.log('already login.  relogin.');
          }
          break;        

        case rt.AUTH_HMAC:
          // console.log('login inprogress.. auth_hmac')
          if( !this.manager.authManager ) return
          
          this.manager.authManager.verify_auth_hmac( message , this );
          return;

        // Admin
        case RemoteMsg.ADMIN:
          
          break;


        default:
          console.log('unknown binary from,cmd,msg:', this.cid, cmd, message);
      }


    }

  }

  
  response(msgID, statusCode, metaBufferPack = new Uint8Array(0)){
      let pack = Buffer.concat( [
        NB$1('8',RemoteMsg.RESPONSE_MBP),  
        NB$1('8', statusCode), 
        NB$1('16', msgID), 
        metaBufferPack
      ]);

        // console.log('response pack', pack)
      this.send( pack );

  }


  send_enc_mode( data , useEncryption = false){

    if( this.encMode === ENC_MODE.YES || 
      this.encMode === ENC_MODE.AUTO && 
      !this.TLS && this.boho.isAuthorized
      )  useEncryption = true;
      

      // console.log('svr useEnc',  useEncryption, data )

    if( useEncryption && data[0] == RemoteMsg.SIGNAL_E2E){
      // E2E는,
      // 서버는 수신자와 암호통신하는경우, 헤더부분만 암호화 하고, 데이타 부분은 그대로 전달해야한다.
      let tagLen = data[1];

      // let tagInfo = decoder.decode( data.subarray( 2, 2 + tagLen) )
      // console.log('server bypass E2E signal taginfo:', tagInfo )
      
      let encHeader = this.boho.encrypt_488( data.subarray( 0, 3 + tagLen));
      // console.log('size check:', encHeader.byteLength == (tagLen + 3 + 21 ) )
      encHeader[0] = rt.ENC_E2E;
      // encHeader 크기가 21(enc_488)크기 만큼 커짐. tagLen+3 + 21 
      let newEncBuffer = Buffer.concat( [ encHeader , data.subarray(3+tagLen)]);
      
      // console.log('ENC_E2E', newEncBuffer)
      this.send( newEncBuffer ); 
      
    }else if( useEncryption ){
      let encPack = this.boho.encrypt_488( data ); 
      if(encPack){
        // console.log('send *S* LEN:', encPack.byteLength)
        this.send( encPack );
      }else {
        console.log('encryption FAIL: NO DATA TRANSIT' );
      }
    }else {
      // console.log('send -N-')
      this.send( data );

    }

  }



  iamResponse( info = "" ){

    if( info == "" ){
      //send general info

      let tags = [];

      for(let tag of this.channels.keys() ){
        tags.push(tag); 
      }
      
      info = { 
        "cid": this.cid, 
        "ssid": this.ssid, 
        "userid": this.did, 
        "nick": this.nick , 
        "ip": this.ip , 
        'tag': tags 
      };
    }
    
    // let userInfo = { "id": this.did }
    
    let pack$1 = pack( 
      MB$1('#MsgType','8', RemoteMsg.IAM_ACK ) , 
      MB$1('#info', info )
    );

    // console.log('iam pack', pack)
    this.send_enc_mode( pack$1 );

  }


}

class ServerRemote extends ServerRemoteCore {
  constructor(socket, req, manager) {
    super(socket, manager);

    if( socket.isWS ){
      this.isWS = true;
      this.TLS = req.headers["x-forwarded-proto"] === 'https' ?  true : false;
      this.ip = this.getClientIP(req);
    }else {
      this.TLS = false;
      this.ip = this.getClientIP( socket.remoteAddress );
    }
    

    // default channel : HOME_CHANNEL
    // console.log('connected ip:', this.ip)

    if( isPrivateIP(this.ip)){
      // connection from local or private network has default private channel.
      this.HOME_CHANNEL = this.manager.getPrivateChannel(this);
      this.privateNode = true; 
    }else {
      // client have default channel name as global IP address.
      this.HOME_CHANNEL = this.manager.getGlobalIPChannel(this);
    }

    
    if(this.isWS ){ // WS
      socket.on("message", this.onSocketMessage.bind(this));
      socket.on("pong", this.receiveMonitor.bind(this));
      socket.on("ping", this.receiveMonitor.bind(this));
      socket.on("error", (e) => { console.log('Websocket error',e, e.code); }); 
      socket.onclose = (e) => {
        console.log('websocket closed' );
        this.manager.removeClient(this);
      };
    }else { // TCP else
      this.congRx = new CongRx();
      socket.pipe( this.congRx );
      this.congRx.on('data', this.onSocketMessage.bind(this));
      socket.on('error', e=>{ console.log('TCP Socket error',e );});
      socket.on('close', e=>{ 
        console.log('tcp socket closed' );
        this.manager.removeClient(this);
        });
      
    }


  }


  // 
  permissionChecker(){
    
    // type1.
    // accept some traffic before authorize.
    
    const limitBytes = 100;
    
    let txBytes =  this.socket.bytesWritten || this.socket._socket?.bytesWritten;
    let rxBytes = this.socket.bytesRead || this.socket._socket?.bytesRead; 

    if( txBytes == undefined) txBytes = 0;
    if( rxBytes == undefined) rxBytes = 0;

    // console.log( txBytes, rxBytes )

    if( !this.boho.isAuthorized &&  txBytes + rxBytes > limitBytes){
      console.log('limit over.');
      // this.send("PLEASE LOGIN")
      this.close();
    }
  }
 

// any type of received messages:  message, ping, pong
  receiveMonitor(){
    this.socket.rxCounter++;
    this.socket.isAlive = true;
  }

  isConnectionHTTPS(req){ 
    //In case of reverse proxy environment.  i.e. using nginx https 443 port.
    return req.headers["x-forwarded-proto"];   //https or undefined
  }

  // 정리요함
  // nginx https reversproxy , http redirect , direct tcp 
  getClientIP(req) { //req or ip string
    let ip;
    if( req.headers ){
      ip = req.headers["x-forwarded-for"];
      if (ip == undefined ) ip = req.socket.remoteAddress;
    }else {
      ip = req;
    }

    if (ip) {
      if (ip.indexOf("::ffff:") == 0) ip = ip.substring(7);
      if (ip == "::1") ip = "127.0.0.1";
    } else {
      ip = "0.0.0.0";
    }
    console.log('getClientIP', ip );
    
    return ip;
  }


  ping(){
    if(this.isWS){
      this.socket.ping();
      this.socket.txCounter++;
    }else {
      this.send( Buffer.from( [ RemoteMsg.PING ]));
    }
  }

  pong(){
    if(this.isWS){
      this.socket.ping();
      this.socket.txCounter++;
    }else {
      this.send( Buffer.from( [ RemoteMsg.PONG ]));
    }
  }


  close(){
    if( this.isWS ){
      this.socket.terminate();
    }else {
      this.socket.end();
    }
  }



  send( message, isBinary ){
    
    this.socket.txCounter++;
    if(this.isWS ){ //WebSocket

      if( this.socket.readyState === 1) {
        if( isBinary != undefined ){
          this.socket.send(message, { binary: isBinary });
        }else {
          this.socket.send(message );
        }
      }else {
        // not open 
        console.log('소켓만 종료된상태: ServerRemote::send(), WS not open. cid:', this.cid , message );
        // this.close() 이명령은 소켓만종료됨.  리모콘클라이언트를 제거해야함.
      }

    }else { //TCP Socket
      // this.socket.write( CongTxSync(message) )

      if( this.socket.readyState == 'open'){
        this.socket.write( CongTxSync(message) );
      }else {
        console.log('소켓만 종료된상태: ServerRemote::send(), TCP socket not open: cid:' , this.cid , message );
        // this.close() 이명령은 소켓만종료됨.  리모콘클라이언트를 제거해야함.
      }
    }

  }

}


process.on('uncaughtException', (err, origin) => {
  console.log('serverRemote::uncaughtException', err,origin);
});

class FileLogger{
  constructor(path ){
    this.file = fs.openSync(path ,'a+');
    console.log('new logFile', path, this.file );
  }
  

  add(msg){
    let format = this.timeStamp() + " "+ msg +'\n';
    fs.write( this.file, format , (err) => {
      if (err) throw err;
    });

  }


  timeStamp(){
    let now = new Date();
    let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
    return time
  }

}




// let logger = new FileLogger('log.txt')

// setInterval( e=>{
//   logger.add("hi",'b')
// }, 2000)

class Admin{
  constructor( manager ){
    this.manager = manager;
    this.remocons = manager.remocons;
    this.channel_map = manager.channel_map;
    this.cid_map = manager.cid_map;

  }

  getRemotes(){
    let remocons = Array.from( this.manager.remocons.keys() );
    return remocons.map( r=>{ return r.cid })
  }

  getCIDList(){
    return Array.from( this.manager.cid_map.keys() )
  }

  getChannelList(){
    return Array.from( this.channel_map.keys() )
  }

  closeRemoteByCID( cid ){
    this.manager.cid_map.get(cid );
  }

}

class Manager {
  constructor ( authManager ) {
    
    this.authManager = authManager;
    
    this.logger = new FileLogger('manager.log');
    console.log('manager logger', this.logger );

    this.privateChannelName =  webcrypto.getRandomValues( Buffer.alloc(15) ).toString('base64'); 
    this.publicIPChannelBaseName = webcrypto.getRandomValues( Buffer.alloc(15) ).toString('base64'); 
    // this.privateChannelName = randomUUID().substring(0,18)
    // this.publicIPChannelBaseName = randomUUID().substring(0,13)

    this.remocons = new Set(); // total ServerRemotes
    this.channel_map = new Map();  //  key: channelName  value: < ServerRemote : Set >
    this.cid_map = new Map(); //  map:[ key:cid -> value:client ]



    this.admin = new Admin( this );
    this.adminChannelIntervalID = null; 
    this.adminMetricOption = 0;

    this.pingIntervalID = setInterval( e=>{
      this.remocons.forEach(function each(remo) {
        //timeout
        let socket = remo.socket;
        if (socket.isAlive === false){
          console.log('timeout.');
          if( remo.isWS ){
            socket.terminate();
          } else {
            socket.end();
          } 
        } 

          socket.txCounter++;
          socket.isAlive = false;
          if( remo.isWS ){
            socket.ping();
          }else {
            remo.ping();
          }
          // console.log('P>>')
      });
    }, RemoteOptions.pingTimeout );


    this.monitIntervalID = setInterval((e) => {
      if ( RemoteOptions.showMetric ) {
        this.monitor();

      }
    }, RemoteOptions.monitorPeriod);

  }


  addClient (socket, req) {
      socket.isAlive = true;
      console.log( `client type: ${ socket.isWS ? "WS" : "TCP" }`);
      this.logger.add( `client type: ${ socket.isWS ? "WS" : "TCP" }`);
      let client =  new ServerRemote(socket, req, this); 
      this.remocons.add(client );

      client.send( Buffer.from([RemoteMsg.SERVER_READY  ]) );

  };


  //remove client from the all subscribed channels.
  removeClient ( client) {
    
    for( let ch of client.channels.keys( )){
      if (this.channel_map.has(ch)) {
        const clients = this.channel_map.get(ch);
        console.log(`-- channel [ ${ch} ] removes client id: ${client.cid} `);
        clients.delete(client);
        if(clients.size == 0 ) this.channel_map.delete( ch );
      }
    }

    this.remocons.delete( client );
    this.cid_map.delete( client.cid );
    console.log('-- a client will be removed:', client.cid  );

    client = null;

 }



  
  sender( tag , client, message, isBinary){

    if( tag == 'sudo:channels'){
      let result = this.admin.getChannelList();
      console.log(tag , result);
      return
    }else if( tag == 'sudo:remocons'){
      let result = this.admin.getRemotes();
      console.log(tag , result);
      return
    
    }else if( tag == 'sudo:cid'){
      let result = this.admin.getCIDList();
      console.log(tag , result);
      return
    }

    console.log('-- chMan.sender tag:', tag );
    let sentCounter = 0;

    // #topic  ->  home_channel#topic
    if(tag.includes('#') && tag.split('#')[0] == "" ){
        tag = client.HOME_CHANNEL + tag;

    }else if( tag.includes('@')  ){
      // - if tag has @ then no modification. 
       let cid = tag.split('@')[0];
        if( this.cid_map.has( cid ) ){
          console.log('<< unicast to: ', cid , '<= from:' ,client.cid , ' len: ', message.byteLength );
          this.cid_map.get( cid ).send_enc_mode( message );
          return [ 'ok', 1 ]
        }else {
          return [ 'err', 'Invalid node id' ]
        }
    
    }else if( this.cid_map.has( tag )  ){
      // if tag is cid  without @ sign then chage last one charactor of cid as @. (to check receiver easily.)
      let lastTopicPosition = 1 + message.readUInt8(1); 
      message[lastTopicPosition] = '@'.charCodeAt();
      this.cid_map.get( tag ).send_enc_mode( message );
      return [ 'ok', 1 ]
    }


    console.log('cid_map: ', this.cid_map.keys() );

 
  if (this.channel_map.has(tag)) {
      console.log('sender tag', tag);
      let clients = this.channel_map.get(tag);

      if(clients.size >= 1){ 
        console.log('ch: ' + tag + ' has clients:', clients.size );
          clients.forEach( (channelClient)=> {
            if ( channelClient !== client ) {
              channelClient.send_enc_mode( message );
              sentCounter++;
            }
          });
      }
      return [ 'ok', sentCounter ]
    }else {
      console.log('no one subscribed ch: ' , tag );
      return [ 'err', 'No one subscribed.' ]
    }

  }






  getPrivateChannel( client ){
    return "PIP:" + this.privateChannelName;
  }

  getGlobalIPChannel( client ){
    return "GIP:" + client.ip + this.publicIPChannelBaseName 
  }


  subscribe(chArr, client ){
    // console.log('ChannelManager:: subscribe: ',chArr)

    chArr.forEach(tag=>{

      if(tag.includes('#') && tag.split('#')[0] == ""){
          tag = client.HOME_CHANNEL + tag;
      }
      
      //1.regist channel map
      if (this.channel_map.has(tag)) {
        this.channel_map.get(tag).add(client);
      } else {
        this.channel_map.set(tag, new Set([client]));
      }
      // console.log('Manager::map:', this.channel_map.keys() )

      //2.add to client channels.
      client.channels.add( tag );
      // console.log('client.channels set.', client.channels  )
  
    } );

    // this.checker()
    return client.channels.size;

  }



  unsubscribe(chArr, client) {

      //unsubscribe all channels of the client.
      if(chArr.length == 1 && chArr[0] == ""){

        client.channels.forEach( ch=>{
          if( this.channel_map.has(ch ) ){
            let clients = this.channel_map.get( ch );
            clients.delete(client);
            if(clients.size == 0 ) this.channel_map.delete( ch );
          }
        });
        client.channels.clear();

      }else {
        // unsubscribe each channels.
        chArr.forEach(ch=>{

          // substitution home_channel
          if(ch.includes('#') && ch.split('#')[0] == "" ){
            ch = client.HOME_CHANNEL + ch;
          }
          console.log('Manager::unsubscribe:', ch );
    
          // delete manager map.
          if( this.channel_map.has(ch ) ){
            let clients = this.channel_map.get( ch );
            clients.delete(client);
            if(clients.size == 0 ) this.channel_map.delete( ch );

          }else {
            console.log('no sub ch', ch );
          }
          client.channels.delete( ch );
        });
      }
    
    console.log( 'result unsub:', client.channels );
    // this.checker()

  }



  monitor() {

    //cid_map
    let cid_remocon_list = [];

    this.cid_map.forEach( (v, cid )=>{
      cid_remocon_list.push( {
        cid_key: cid,
        cid: v.cid,
        ssid: v.ssid,
        uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
        isSecure: v.isSecureLine,
        isAuth: v.boho.isAuthorized,
        encMode:  ENC_MODE[v.encMode]
      });
    });


   
    //remocons Set
    let remocons = Array.from(this.remocons.keys());
  
    let remocon_list = remocons.map( v => {
      return { 
        cid: v.cid,
        ssid: v.ssid,
        uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
        isSecure: v.isSecureLine,
        isAuth: v.boho.isAuthorized,
        encMode:  ENC_MODE[v.encMode]
      }
    });
    console.log('\n\ncid_map:');
    console.table(cid_remocon_list, [ 'cid_key', 'cid', 'ssid','uptime','isSecure','isAuth','encMode']);
    console.log('remocons_set:');
    console.table(remocon_list, [ 'cid', 'ssid','uptime','isSecure','isAuth','encMode']);
    
    return 


    // if( RemoteOptions.showMetric)  console.log(`total ${this.channel_map.size} channels.  time: ${util.timeStamp()} `)
  }

  adminChannelBroadCast(){
    
    let list = {};
    list.channels = this.getMetric( this.adminMetricOption );
    list.time = Date.now();
    list.timeStamp = timeStamp();
    let adminPack = ["pub","admin", list];
    this.sender( RemoteOptions.adminChannel, "", JSON.stringify( adminPack)  );
  }


  adminResponse( cid ){
    
    let list = {};
    list.channels = this.getMetric( this.adminMetricOption );
    list.time = Date.now();
    list.timeStamp = timeStamp();
    let adminPack = ["pub","admin", list];
    this.sender( RemoteOptions.adminChannel, "", JSON.stringify( adminPack)  );
  }

  

  getMetric ( filter = 0) {

    let channelMetric = [];
    let clientsSet;

    if( filter == 0){
      clientsSet = this.remocons;
    }else if( filter == 1);else {
      //one channel
      clientsSet = this.channel_map.get( filter );
    }
    
    if(filter == 1){

      this.channel_map.forEach((clients, key) => {
          let list =[];
          list = Array.from(clients);
          list = list.map((v) => {
            return {
              ip: v.ip,
              ssid: v.ssid,
              id: v.cid,
              cid: v.cid,
              uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
              tx: v.socket.txCounter,
              rx: v.socket.rxCounter,
              txBytes: v.socket.bytesWritten || v.socket._socket?.bytesWritten,
              rxBytes: v.socket.bytesRead || v.socket._socket?.bytesRead
            }
          });

          let channel = { "name": key , "clients": list };
          channelMetric.push( channel );
        
      });

    }else {
  
        let list =[];
        if( !clientsSet){
          // no such a chnannel name
          return [ { "name": 'no channel' , "clients": [] }]
        } 
        list = Array.from(clientsSet);
        list = list.map((v) => {
          return {
            ip: v.ip,
            id: v.cid,
            ssid: v.ssid,
            nick: v.nick,
            uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
            tx: v.socket.txCounter,
            rx: v.socket.rxCounter,
            txBytes: v.socket.bytesWritten || v.socket._socket?.bytesWritten,
            rxBytes: v.socket.bytesRead || v.socket._socket?.bytesRead 
          }
        });

        let channel = { "name": filter , "clients": list };
        channelMetric.push( channel );

    }


    // console.log( channelMetric )
    return channelMetric
  }


  
}




// keys () {
//   return this.channel_map.keys()
// }


  // has (ch) {
  //   return this.channel_map.has(ch)
  // }


  //전체 순환.  미사용? 제거예정

  // removeEmptyChannel () {

  //   const emptyCh = []
  //   this.channel_map.forEach((clients, key) => {
  //     if (clients.size === 0) {
  //       emptyCh.push(key)
  //     }
  //   })

  //   if (emptyCh.length >= 1) {
  //     if( RemoteOptions.showMetric)  console.log('removed empty channel : ', emptyCh)
  //     emptyCh.forEach((ch) => {
  //       this.channel_map.delete(ch)
  //     })
  //   }
    
  // }

  // admin  능동호출. 원할때마다 호출가능.  해당 소켓으로 직접전송

  // adminCall( client, cmd =[] ){
  //   // console.log('admin cmd:', cmd)
  //     if( cmd[0] === 't' ){
  //       if( this.adminChannelIntervalID ) clearInterval( this.adminChannelIntervalID)
  //       let period = cmd[1] > 300 ? cmd[1] : 1000
  //       // console.log('period', period  )
  //       // this.adminChannelIntervalID =  setInterval ( this.adminChannelBroadCast.bind(this)  ,period);
  //       this.adminChannelIntervalID =  setInterval(e=>{ this.adminChannelBroadCast(); }  ,period);

  //     }else if( cmd[0] === 'c'){ 
  //       this.adminMetricOption = cmd[1]
  //     }else {
  //       // console.log( 'known admin cmd',  cmd[0])
  //     }
  //     // client.frame( 'admin', cmd)
  // }


  // 상태변경시 서버에서 호출, 채널로 전송, 다중 수신가능.
  // adminChannelBroadCast(){
    
  //   let list = {};
  //   list.channels = this.getMetric( this.adminMetricOption )
  //   list.time = Date.now()
  //   list.timeStamp = util.timeStamp()
  //   let adminPack = ["pub","admin", list]
  //   this.sender( RemoteOptions.adminChannel, "", JSON.stringify( adminPack)  )
  // }



/**
 * 
 * filter: 
 * 0: all clients , 
 * 1: all group by channel , 
 * else: 'chName' string
 */

//  getMetric ( filter = 0) {

//   let channelMetric = []
//   let clientsSet;

//   if( filter == 0){
//     clientsSet = this.remocons
//   }else if( filter == 1){
//     //all channel from map
//   }else{
//     //one channel
//     clientsSet = this.channel_map.get( filter )
//   }
  
//   if(filter == 1){

//     this.channel_map.forEach((clients, key) => {
//         let list =[];
//         list = Array.from(clients);
//         list = list.map((v) => {
//           return {
//             ip: v.ip,
//             ssid: v.ssid,
//             id: v.cid,
//             cid: v.cid,
//             uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
//             tx: v.socket.txCounter,
//             rx: v.socket.rxCounter,
//             txBytes: v.socket.bytesWritten || v.socket._socket?.bytesWritten,
//             rxBytes: v.socket.bytesRead || v.socket._socket?.bytesRead
//           }
//         });

//         let channel = { "name": key , "clients": list };
//         channelMetric.push( channel )
      
//     });

//   }else{
 
//       let list =[];
//       if( !clientsSet){
//         // no such a chnannel name
//         return [ { "name": 'no channel' , "clients": [] }]
//       } 
//       list = Array.from(clientsSet);
//       list = list.map((v) => {
//         return {
//           ip: v.ip,
//           id: v.cid,
//           ssid: v.ssid,
//           nick: v.nick,
//           uptime:  Math.trunc( ( Date.now() - v.socket.openTime ) / 1000),
//           tx: v.socket.txCounter,
//           rx: v.socket.rxCounter,
//           txBytes: v.socket.bytesWritten || v.socket._socket?.bytesWritten,
//           rxBytes: v.socket.bytesRead || v.socket._socket?.bytesRead 
//         }
//       });

//       let channel = { "name": filter , "clients": list };
//       channelMetric.push( channel )

//   }


//   // console.log( channelMetric )
//   return channelMetric
// }


  // addToPrivateChannel( client ){
  //   let ch = "PIP" + this.privateChannelName;
  //   this.subscribe([ch],client)
  //   this.checker()
  //   return ch
  // }

  // addToGlobalIPChannel( client ){
  //   let ch = client.ip + "GIP" + this.publicIPChannelBaseName
  //   this.subscribe([ch],client)
  //   this.checker()
  //   return ch
  // }

var constants = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};

// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'
var runtimeRequire = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : commonjsRequire; // eslint-disable-line

var vars = (process.config && process.config.variables) || {};
var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
var abi = process.versions.modules; // TODO: support old node where this is undef
var runtime = isElectron() ? 'electron' : (isNwjs() ? 'node-webkit' : 'node');

var arch = process.env.npm_config_arch || os.arch();
var platform = process.env.npm_config_platform || os.platform();
var libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc');
var armv = process.env.ARM_VERSION || (arch === 'arm64' ? '8' : vars.arm_version) || '';
var uv = (process.versions.uv || '').split('.')[0];

var nodeGypBuild = load;

function load (dir) {
  return runtimeRequire(load.path(dir))
}

load.path = function (dir) {
  dir = path.resolve(dir || '.');

  try {
    var name = runtimeRequire(path.join(dir, 'package.json')).name.toUpperCase().replace(/-/g, '_');
    if (process.env[name + '_PREBUILD']) dir = process.env[name + '_PREBUILD'];
  } catch (err) {}

  if (!prebuildsOnly) {
    var release = getFirst(path.join(dir, 'build/Release'), matchBuild);
    if (release) return release

    var debug = getFirst(path.join(dir, 'build/Debug'), matchBuild);
    if (debug) return debug
  }

  var prebuild = resolve(dir);
  if (prebuild) return prebuild

  var nearby = resolve(path.dirname(process.execPath));
  if (nearby) return nearby

  var target = [
    'platform=' + platform,
    'arch=' + arch,
    'runtime=' + runtime,
    'abi=' + abi,
    'uv=' + uv,
    armv ? 'armv=' + armv : '',
    'libc=' + libc,
    'node=' + process.versions.node,
    process.versions.electron ? 'electron=' + process.versions.electron : '',
    typeof __webpack_require__ === 'function' ? 'webpack=true' : '' // eslint-disable-line
  ].filter(Boolean).join(' ');

  throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n')

  function resolve (dir) {
    // Find matching "prebuilds/<platform>-<arch>" directory
    var tuples = readdirSync(path.join(dir, 'prebuilds')).map(parseTuple);
    var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
    if (!tuple) return

    // Find most specific flavor first
    var prebuilds = path.join(dir, 'prebuilds', tuple.name);
    var parsed = readdirSync(prebuilds).map(parseTags);
    var candidates = parsed.filter(matchTags(runtime, abi));
    var winner = candidates.sort(compareTags(runtime))[0];
    if (winner) return path.join(prebuilds, winner.file)
  }
};

function readdirSync (dir) {
  try {
    return fs.readdirSync(dir)
  } catch (err) {
    return []
  }
}

function getFirst (dir, filter) {
  var files = readdirSync(dir).filter(filter);
  return files[0] && path.join(dir, files[0])
}

function matchBuild (name) {
  return /\.node$/.test(name)
}

function parseTuple (name) {
  // Example: darwin-x64+arm64
  var arr = name.split('-');
  if (arr.length !== 2) return

  var platform = arr[0];
  var architectures = arr[1].split('+');

  if (!platform) return
  if (!architectures.length) return
  if (!architectures.every(Boolean)) return

  return { name, platform, architectures }
}

function matchTuple (platform, arch) {
  return function (tuple) {
    if (tuple == null) return false
    if (tuple.platform !== platform) return false
    return tuple.architectures.includes(arch)
  }
}

function compareTuples (a, b) {
  // Prefer single-arch prebuilds over multi-arch
  return a.architectures.length - b.architectures.length
}

function parseTags (file) {
  var arr = file.split('.');
  var extension = arr.pop();
  var tags = { file: file, specificity: 0 };

  if (extension !== 'node') return

  for (var i = 0; i < arr.length; i++) {
    var tag = arr[i];

    if (tag === 'node' || tag === 'electron' || tag === 'node-webkit') {
      tags.runtime = tag;
    } else if (tag === 'napi') {
      tags.napi = true;
    } else if (tag.slice(0, 3) === 'abi') {
      tags.abi = tag.slice(3);
    } else if (tag.slice(0, 2) === 'uv') {
      tags.uv = tag.slice(2);
    } else if (tag.slice(0, 4) === 'armv') {
      tags.armv = tag.slice(4);
    } else if (tag === 'glibc' || tag === 'musl') {
      tags.libc = tag;
    } else {
      continue
    }

    tags.specificity++;
  }

  return tags
}

function matchTags (runtime, abi) {
  return function (tags) {
    if (tags == null) return false
    if (tags.runtime !== runtime && !runtimeAgnostic(tags)) return false
    if (tags.abi !== abi && !tags.napi) return false
    if (tags.uv && tags.uv !== uv) return false
    if (tags.armv && tags.armv !== armv) return false
    if (tags.libc && tags.libc !== libc) return false

    return true
  }
}

function runtimeAgnostic (tags) {
  return tags.runtime === 'node' && tags.napi
}

function compareTags (runtime) {
  // Precedence: non-agnostic runtime, abi over napi, then by specificity.
  return function (a, b) {
    if (a.runtime !== b.runtime) {
      return a.runtime === runtime ? -1 : 1
    } else if (a.abi !== b.abi) {
      return a.abi ? -1 : 1
    } else if (a.specificity !== b.specificity) {
      return a.specificity > b.specificity ? -1 : 1
    } else {
      return 0
    }
  }
}

function isNwjs () {
  return !!(process.versions && process.versions.nw)
}

function isElectron () {
  if (process.versions && process.versions.electron) return true
  if (process.env.ELECTRON_RUN_AS_NODE) return true
  return typeof window !== 'undefined' && window.process && window.process.type === 'renderer'
}

function isAlpine (platform) {
  return platform === 'linux' && fs.existsSync('/etc/alpine-release')
}

// Exposed for unit tests
// TODO: move to lib
load.parseTags = parseTags;
load.matchTags = matchTags;
load.compareTags = compareTags;
load.parseTuple = parseTuple;
load.matchTuple = matchTuple;
load.compareTuples = compareTuples;

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
const mask = (source, mask, output, offset, length) => {
  for (var i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
};

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
const unmask$1 = (buffer, mask) => {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
};

var fallback$1 = { mask, unmask: unmask$1 };

var bufferutil = createCommonjsModule(function (module) {

try {
  module.exports = nodeGypBuild(__dirname);
} catch (e) {
  module.exports = fallback$1;
}
});

var bufferUtil = createCommonjsModule(function (module) {

const { EMPTY_BUFFER } = constants;

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

module.exports = {
  concat,
  mask: _mask,
  toArrayBuffer,
  toBuffer,
  unmask: _unmask
};

/* istanbul ignore else  */
if (!process.env.WS_NO_BUFFER_UTIL) {
  try {
    const bufferUtil = bufferutil;

    module.exports.mask = function (source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    };

    module.exports.unmask = function (buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}
});

const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

var limiter = Limiter;

const { kStatusCode: kStatusCode$2 } = constants;

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError$1 = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError$1];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

var permessageDeflate = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError$1] = new RangeError('Max payload size exceeded');
  this[kError$1].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError$1][kStatusCode$2] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode$2] = 1007;
  this[kCallback](err);
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function isValidUTF8$1(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0x00) {  // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {  // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0  // overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {  // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80 ||  // overlong
        buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0  // surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {  // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80 ||  // overlong
        buf[i] === 0xf4 && buf[i + 1] > 0x8f || buf[i] > 0xf4  // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

var fallback = isValidUTF8$1;

var utf8Validate = createCommonjsModule(function (module) {

try {
  module.exports = nodeGypBuild(__dirname);
} catch (e) {
  module.exports = fallback;
}
});

var validation = createCommonjsModule(function (module) {

//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

module.exports = {
  isValidStatusCode,
  isValidUTF8: _isValidUTF8,
  tokenChars
};

/* istanbul ignore else  */
if (!process.env.WS_NO_UTF_8_VALIDATE) {
  try {
    const isValidUTF8 = utf8Validate;

    module.exports.isValidUTF8 = function (buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}
});

const { Writable } = require$$0;


const {
  BINARY_TYPES: BINARY_TYPES$1,
  EMPTY_BUFFER: EMPTY_BUFFER$2,
  kStatusCode: kStatusCode$1,
  kWebSocket: kWebSocket$2
} = constants;
const { concat, toArrayBuffer, unmask } = bufferUtil;
const { isValidStatusCode: isValidStatusCode$1, isValidUTF8 } = validation;

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES$1[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket$2] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[permessageDeflate.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER$2;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER$2);
        this.end();
      } else if (data.length === 1) {
        return error(
          RangeError,
          'invalid payload length 1',
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode$1(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

var receiver = Receiver;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode$1] = statusCode;
  return err;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */



const { randomFillSync } = require$$0$1;


const { EMPTY_BUFFER: EMPTY_BUFFER$1 } = constants;
const { isValidStatusCode } = validation;
const { mask: applyMask, toBuffer: toBuffer$1 } = bufferUtil;

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER$1;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[permessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

var sender = Sender;

const { kForOnEventAttribute: kForOnEventAttribute$1, kListener: kListener$1 } = constants;

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, handler, options = {}) {
    for (const listener of this.listeners(type)) {
      if (
        !options[kForOnEventAttribute$1] &&
        listener[kListener$1] === handler &&
        !listener[kForOnEventAttribute$1]
      ) {
        return;
      }
    }

    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute$1] = !!options[kForOnEventAttribute$1];
    wrapper[kListener$1] = handler;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener$1] === handler && !listener[kForOnEventAttribute$1]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

var eventTarget = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};

/**
 * Call an event listener
 *
 * @param {(Function|Object)} listener The listener to call
 * @param {*} thisArg The value to use as `this`` when calling the listener
 * @param {Event} event The event to pass to the listener
 * @private
 */
function callListener(listener, thisArg, event) {
  if (typeof listener === 'object' && listener.handleEvent) {
    listener.handleEvent.call(listener, event);
  } else {
    listener.call(thisArg, event);
  }
}

const { tokenChars: tokenChars$1 } = validation;

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse$2(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars$1[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars$1[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format$1(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

var extension = { format: format$1, parse: parse$2 };

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */






const { randomBytes, createHash: createHash$1 } = require$$0$1;
const { URL: URL$1 } = require$$2;




const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID: GUID$1,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket: kWebSocket$1,
  NOOP
} = constants;
const {
  EventTarget: { addEventListener, removeEventListener }
} = eventTarget;
const { format, parse: parse$1 } = extension;
const { toBuffer } = bufferUtil;

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver$1 = new receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new sender(socket, this._extensions, options.generateMask);
    this._receiver = receiver$1;
    this._socket = socket;

    receiver$1[kWebSocket$1] = this;
    socket[kWebSocket$1] = this;

    receiver$1.on('conclude', receiverOnConclude);
    receiver$1.on('drain', receiverOnDrain);
    receiver$1.on('error', receiverOnError);
    receiver$1.on('message', receiverOnMessage);
    receiver$1.on('ping', receiverOnPing);
    receiver$1.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError$1);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[permessageDeflate.extensionName]) {
      this._extensions[permessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake$1(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[permessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake$1(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

var websocket = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL$1) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL$1(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
  let invalidUrlMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
    invalidUrlMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isIpcUrl && !parsedUrl.pathname) {
    invalidUrlMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidUrlMessage = 'The URL contains a fragment identifier';
  }

  if (invalidUrlMessage) {
    const err = new SyntaxError(invalidUrlMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    ...opts.headers,
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket'
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new permessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [permessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isIpcUrl) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalIpc = isIpcUrl;
      websocket._originalSecure = isSecure;
      websocket._originalHostOrSocketPath = isIpcUrl
        ? opts.socketPath
        : parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = isIpcUrl
        ? websocket._originalIpc
          ? opts.socketPath === websocket._originalHostOrSocketPath
          : false
        : websocket._originalIpc
        ? false
        : parsedUrl.host === websocket._originalHostOrSocketPath;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake$1(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake$1(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL$1(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake$1(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    if (res.headers.upgrade.toLowerCase() !== 'websocket') {
      abortHandshake$1(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash$1('sha1')
      .update(key + GUID$1)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake$1(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake$1(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse$1(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== permessageDeflate.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[permessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      websocket._extensions[permessageDeflate.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake$1(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake$1);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket$1];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket$1] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket$1];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket$1];

  if (websocket._socket[kWebSocket$1] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket$1].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket$1].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket$1];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket$1].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket$1];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket$1] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket$1]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket$1];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError$1() {
  const websocket = this[kWebSocket$1];

  this.removeListener('error', socketOnError$1);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}

const { tokenChars } = validation;

/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */
function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (
      i !== 0 &&
      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c /* ',' */) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;

      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

var subprotocol = { parse };

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls|https$" }] */






const { createHash } = require$$0$1;





const { GUID, kWebSocket } = constants;

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket: websocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key = req.headers['sec-websocket-key'];
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET') {
      const message = 'Invalid HTTP method';
      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
      return;
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      const message = 'Invalid Upgrade header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!key || !keyRegex.test(key)) {
      const message = 'Missing or invalid Sec-WebSocket-Key header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (version !== 8 && version !== 13) {
      const message = 'Missing or invalid Sec-WebSocket-Version header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!this.shouldHandle(req)) {
      abortHandshake(socket, 400);
      return;
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Protocol header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new permessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[permessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[permessageDeflate.extensionName]);
          extensions[permessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        const message =
          'Invalid or unacceptable Sec-WebSocket-Extensions header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[permessageDeflate.extensionName]) {
      const params = extensions[permessageDeflate.extensionName].params;
      const value = extension.format({
        [permessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

var websocketServer = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  //
  // The socket is writable unless the user destroyed or ended it before calling
  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
  // error. Handling this does not make much sense as the worst that can happen
  // is that some of the data written by the user might be discarded due to the
  // call to `socket.end()` below, which triggers an `'error'` event that in
  // turn causes the socket to be destroyed.
  //
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: 'close',
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(message),
    ...headers
  };

  socket.once('finish', socket.destroy);

  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      Object.keys(headers)
        .map((h) => `${h}: ${headers[h]}`)
        .join('\r\n') +
      '\r\n\r\n' +
      message
  );
}

/**
 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
 * one listener for it, otherwise call `abortHandshake()`.
 *
 * @param {WebSocketServer} server The WebSocket server
 * @param {http.IncomingMessage} req The request object
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} message The HTTP response body
 * @private
 */
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount('wsClientError')) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

    server.emit('wsClientError', err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}

/*
서버를 시작한다.
프로그램 호출 또는 CLI에서 호출 마찬가지.
- 이때 옵션을 전달해준다.
  옵션으로 실행방식을 정해준다.
  가장중요한건 포트번호
  핑주기는 곧 타임아웃과 대등,
  이밖에 모니터링 방식, 그런데 이건 기본 서버옵션에서 제거예정.
  어드민 호출에 응답하는 방식으로 변경

- 인증 옵션
  이때 가장 중요한 옵션은 인증관련
  - 유형: 파일인지 레디스인지
  - 파일: 파일에서 읽어서 처리.
    메모리에 로딩하면될것.
    파일, 맵에 로딩
  - 레디스:  접속주소, 포트 등.





*/
class RemoteServer {
  constructor (options, authManager ) {
    this.options = options;
    // console.log('websocket server options', options )

    let pingT = parseInt( options.timeout );
    if(pingT && pingT >= 1000) RemoteOptions.pingTimeout = pingT;

    let monitorT = parseInt( options.monitorPeriod );
    if(monitorT && monitorT >= 1000) RemoteOptions.monitorPeriod = monitorT;
    
    this.wss = new websocketServer( options );
    this.wss.setMaxListeners(0);
    
    this.manager = new Manager( authManager );

    this.wss.on('error', (e) => {
      console.error('### ws server error:', e);
    });

    this.wss.on('close', (e) => {
      console.log('remoon server closed.' ,e );
    });


    this.wss.on('connection', (ws, req) => {
      ws.isWS = true;
      this.manager.addClient(ws, req);
    });

    // TCP socket server
    // TCP port number == WSS port + 1
    this.tcpPort = parseInt(options.port) + 1;
    console.log('tcp listen:', this.tcpPort );
    this.tcpserver = net.createServer( (socket)=>{

    this.manager.addClient(socket );
    
    }).on('data', (data) => {
      console.log('tcp server data:', data );
    }).on('error', (err) => {
      // throw err;
      console.log('RemoteServer.js: tcpserver error:', err );
    }).listen( this.tcpPort, () => {
      console.log('server bound');
    });


  }



}

var eventemitter3 = createCommonjsModule(function (module, exports) {
(function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}]},{},[1])(1)
});
});

const encoder = new TextEncoder();
const decoder$1 = new TextDecoder();
const NB = NB$2;
const MB = MB$2;
const MBA = MBA$1;

class RemoteCore extends eventemitter3{
  static BOHO = boho
  constructor( url) {
    super();

    this.cid = "";  // get from server  CID_ACK
    this.ssid = "";  // get from server  IAM_ACK message.
    this.ip = "";  // get from server  IAM_ACK message.

    this.socket;
    this.serverURL = url;
    this.isOpen = false;

    this.txCounter = 0;
    this.rxCounter = 0;
    this.lastTxRxTime = Date.now();
    this.lastTxRxTimeOut = 65000;  // timeout after trx.
    this.runCheckPeriod = 3000 ;//only check state. 
    this.runCheckIntervalID = null;

    this.boho = new ct();
    this.TLS = false; // true if connection opened with wss:// protocol (TLS)
    this.encMode = ENC_MODE.AUTO; 
    // this.autoLogin = true; // if 
    this.useAuth = false;

    this.nick = "";
    this.channels = new Set();
    this.promiseMap = new Map();
    this.promiseTimeOut = 3000;
    this.mid = 0;

    this.on('open',this.onOpenEventHandler.bind(this));
    this.on('close',this.onCloseEventHandler.bind(this));
    this.on('socket_data',this.onWrapSocketMessageEventHandler.bind(this));
  }

  onOpenEventHandler( ){
    if( this.serverURL.includes("wss://" )){
      this.TLS = true;
    }
    this.isOpen = true;
  }

  onCloseEventHandler(){
    this.isSecre = false;
    this.boho.isAuthorized = false;
    console.log('-- remote is closed:');
    this.isOpen = false;
  }

  // manual login
  login( id, key){
    console.log('try manual instance login: ', id);
    this.boho.set_id8(id);
    this.boho.set_key(key);
    this.useAuth = true;
    let auth_pack = this.boho.auth_req();
    // console.log('auth_req_pack', auth_pack )
    this.send(auth_pack );
  }

  // auto login
  auth( id, key){
    console.log('set auto auth: ', id);
    this.boho.set_id8(id);
    this.boho.set_key(key);
    this.useAuth = true;
  }

  onWrapSocketMessageEventHandler( buffer$1 ){
    // console.log('remote rcv socket_message', buffer )
    //check first byte (remote message type)
   let msgType = buffer$1[0];
   let decoded;
   
    if( msgType === rt.ENC_488 ){
      decoded = this.boho.decrypt_488( buffer$1 );
      if( decoded ){
       //  console.log( decoded )
        msgType = decoded[0];
        buffer$1 = decoded; 
        // console.log('DECODED MsgType:', RemoteMsg[ msgType ] )
       }else {
         console.log('DEC_FAIL', buffer$1.byteLength);
       }
     }else if( msgType === rt.ENC_E2E ){
      // console.log('rcv ENC_E2E' )

      try{
        decoded = this.boho.decrypt_488( buffer$1 );
        //헤더를 읽고 헤더크기만큼만 해석한다.
        if( decoded ){
          // console.log( 'ENC_E2E decoded ', decoded )
          msgType = decoded[0];
          // decoded has msg_header only. 
          buffer$1.set( decoded ,ot.ENC_488); // set decoded signal_e2e headaer.
          buffer$1 = buffer$1.subarray( ot.ENC_488 ); // reset offset.
  // console.log('DECODED MsgType:', RemoteMsg[ msgType ] )
          }else {
            console.log('488 DEC_FAIL', buffer$1);
            return
          }

      }catch(err){
        console.log('E2E DEC_FAIL decryption error', err);
        return
      }



     }

    let type = RemoteMsg[ msgType ];
    if( !type ) type = rt[ msgType ]; 

// console.log( "MsgType: ", type , " LEN ", buffer.byteLength)

   switch( msgType){
      case RemoteMsg.PING :
          this.pong();
      break;

      case RemoteMsg.PONG :
      break;

      case RemoteMsg.IAM_ACK:
          try {
            let str = new TextDecoder().decode( buffer$1.subarray(1) );
            let jsonInfo = JSON.parse(str); 

            if( jsonInfo.ip ){
              this.ip = jsonInfo.ip;
            }

            console.log('<IAM_ACK>', JSON.stringify(jsonInfo));
            // console.log('<IAM_ACK>', JSON.stringify(jsonInfo,null,2))
          } catch (error) {
            console.log('<IAM_ACK> data error');
          }
        // }
      break;

    case RemoteMsg.CID_ACK :
      let cidStr = new TextDecoder().decode( buffer$1.subarray(1) );
      console.log( '>> CID_ACK: ' ,cidStr );
      this.cid = cidStr;
      this.subscribe_memory_channels();
      this.emit('ready', 'ready');

      break;

    case RemoteMsg.SERVER_READY :
      console.log('>> SERVER_READY');
      if(this.useAuth){
        this.send( this.boho.auth_req() );
        // CID_REQ will be called, after auth_ack.
      }else {
        // CID_REQ here, if not using auth.
        this.send( buffer.Buffer.from([RemoteMsg.CID_REQ])  );
      }
      break;
      
     case RemoteMsg.SIGNAL_E2E: 
     case RemoteMsg.SIGNAL: 
      try{
          let tagLen = buffer$1.readUint8(1);
          let tagBuf = buffer$1.subarray(2, 2 + tagLen );
          let tag = decoder$1.decode(tagBuf);

          let payloadType = buffer$1.readUint8( 2 + tagLen );
          let payloadBuffer = buffer$1.subarray( 3 + tagLen );

  
          let targetName, topic;
          let tagPath;
         
          if( tag.includes( '@') ){
            tagPath = tag.split( '@' );
            targetName = '@'; // substitution:  self.cid into '@' symbol.  !! server also fix some cid info.
            topic = tagPath[1];
            if( tagPath.length == 2 ){ //id@event
              tag = '@' + topic ;  // '@' is id 
            }else {  //id only ,no event name
              tag = '@';
              topic = '';
            }
          }else {
            tagPath = tag.split('#');
            targetName = tagPath[0];
            topic = tagPath[1];
            if(tagPath.length == 1 ){
              topic = '';
            }
            if(!targetName ) targetName = 'HOME_CH';
            
          }
        
          
          // console.log(`>> sig tag: ${tag}  target: ${targetName} topic: ${topic} ` )
          // console.log('[payload type ]',  PAYLOAD_TYPE[ payloadType ] )
      
          switch( payloadType ){

            case PAYLOAD_TYPE.EMPTY:  // 0
              // this.emit( tag , targetName, topic )
              this.emit( tag , tag );
              break;

            case PAYLOAD_TYPE.STRING: // 1
            // !! Must remove null char before decode in JS.
            // string payload contains null char for the c/cpp devices.
              let payloadStringWithoutNull = payloadBuffer.subarray(0,payloadBuffer.byteLength - 1 );
              let oneString = decoder$1.decode( payloadStringWithoutNull );
              // this.emit( tag, oneString , targetName, topic  )
              this.emit( tag, oneString , tag );
              if( tag.includes('@'))  this.emit( '@', oneString , tag );
              break;

              
            case PAYLOAD_TYPE.BUFFER: // 2
              this.emit( tag, payloadBuffer , tag );
              if( tag.includes('@')) this.emit( '@', payloadBuffer , tag  );
              break;


            case PAYLOAD_TYPE.OBJECT:
              let oneObjectBuffer = decoder$1.decode( payloadBuffer );
              let oneJSONObject = JSON.parse( oneObjectBuffer );
              this.emit( tag, oneJSONObject , tag  );
              break;
                
            case PAYLOAD_TYPE.MJSON: 
              let mjsonBuffer = decoder$1.decode( payloadBuffer );
              let mjson = JSON.parse( mjsonBuffer );
              this.emit( tag, ...mjson , tag  );
              break;

            case PAYLOAD_TYPE.MBA: 
              let mbaObject = unpack( buffer$1 );
              this.emit( tag, ...mbaObject.args , tag  );
              break;

            default:
              console.log('unkown payloadtype', payloadType);

          }


        }catch(err){
          console.log('signal parse err',err);
        }
        break;


     case RemoteMsg.SIGNAL_REQ: 
      try{
          let tagLen = buffer$1.readUint8(3);
          let tagBuf = buffer$1.subarray(4, 4 + tagLen );
          let tag = decoder$1.decode(tagBuf);

            let binObj = unpack( buffer$1 );
            if(binObj){
              let params = binObj.args; 
              console.log('[PUB_STR_CH_RET] ...args', ...params );
              this.emit( tag, ...params);
            }
            
          }catch(err){
            console.log('SIGNAL_REQ err',err);
          }
          break;

      
      case RemoteMsg.RESPONSE_MBP:
        let code = buffer$1.readUint8(1);
        let mid = buffer$1.readUint16BE(2);
        let meta = ( buffer$1.byteLength > 4  ) ?  buffer$1.subarray(4) : "";
        // console.log(`[RES] MID: ${mid} CODE: ${code} `)
        this.testPromise( mid , code , meta);
        break;

      case rt.AUTH_NONCE:
        // console.log('auth_nonce', buffer )
        let auth_hmac = this.boho.auth_hmac( buffer$1 );
        if(auth_hmac){
          this.send( auth_hmac );
        }else {
          console.log('Invalid auth_req');
         this.close();
        }
        break;
      case rt.AUTH_FAIL:
          console.log('AUTH FAIL');
          // this.close()
          break;
      case rt.AUTH_ACK:
        if(this.boho.check_auth_ack_hmac( buffer$1 ) ){
          // console.log(" AUTH SUCCESS:  the server is verified." )
          this.emit("authorized" );   
          this.send( buffer.Buffer.from([RemoteMsg.CID_REQ ]) );
          
        }else {
          console.log('invalid server hmac');
          this.close();
        }
        break;

    }
  }

  iam( title ){
    // console.log('iam', title)
    if(title ){
      this.send_enc_mode(  pack( 
          MB('#MsgType','8', RemoteMsg.IAM ) , 
          MB('#', title )
        ));
    }else {
      this.send_enc_mode(  pack( 
          MB('#MsgType','8', RemoteMsg.IAM )
        ));
    }
  }


  ping(){
    this.send( buffer.Buffer.from( [ RemoteMsg.PING ]));
  }

  pong(){
    this.send( buffer.Buffer.from( [ RemoteMsg.PONG ]));
  }


  // remote application level ping tool.  
  // simple message sending and reply.
  echo( args ){

    if(args ){
      console.log( 'echo args:', args );
      this.send_enc_mode(  pack( 
        MB('#MsgType','8', RemoteMsg.ECHO ) , 
        MB('#msg', args )
      ));
    }else {
      // # do not encrypt blank echo #
      this.send( buffer.Buffer.from([ RemoteMsg.ECHO ]));
    }
  }


  bin(...data){
    this.send( U8pack( ...data) );
  }

  send_enc_mode( data ,useEncryption = false ){

    if( this.encMode === ENC_MODE.YES || 
      this.encMode === ENC_MODE.AUTO && 
      !this.TLS && this.boho.isAuthorized
      )  useEncryption = true;
      
    if( data[0] == RemoteMsg.SIGNAL_E2E && useEncryption){
      // input data:  signal_header + e2ePayload
      // encrypt signal_header area only. payload is encrypted with e2e key already.
      let tagLen = data[1];
      let encHeader = this.boho.encrypt_488( data.subarray(0, 3 + tagLen));
      encHeader[0] = rt.ENC_E2E;
      this.send( buffer.Buffer.concat([encHeader, data.subarray(3+tagLen) ]));
      // console.log('<< send_enc_mode [ ENC_E2E ]')
      
    }else if( useEncryption ){
      // console.log('<< send_enc_mode [ ENC_488 ]')
      let encPack = this.boho.encrypt_488( data ); 
      this.send( encPack );
    }else {
      // console.log('<< send_enc_mode  [ PLAIN ]' )
      this.send( data );
    }

  }

  
  setMsgPromise(mid ){
    return new Promise( (resolve, reject)=>{
      this.promiseMap.set( mid, [resolve, reject ] );
      // console.log('set promise.  mid, size', mid, this.promiseMap.size)
      setTimeout( e=>{ 
        if(this.promiseMap.has(mid )){
          reject('timeout');
          this.promiseMap.delete( mid );
          // console.log('promise timeout. mid, size:', mid, this.promiseMap.size)
        }
      }, this.promiseTimeOut);
    })
  }

  testPromise(mid , code , metaPack){
    if( this.promiseMap.has(mid)){
      // console.log('res promise msg', mid)
      let [ resolve, reject ] = this.promiseMap.get( mid );
      this.promiseMap.delete( mid );
      let meta;
      if( metaPack ){
        meta = unpack( metaPack);
      }

      if(code < 128){
        // console.log( 'unpack meta:', meta)
        if(meta) resolve( meta );
          else resolve(code);

      } else {
        if(meta) reject( meta );
          else reject( meta);
      } 

      
    }
  }


  publish( ...args ){
      this.signal( ...args );
  }


  parsePayload( args ){
    // console.log( 'parsePayload args', args )
    let type;
    let pack;
    if( args.length == 0){
      type = PAYLOAD_TYPE.EMPTY; 
      pack = null;
    }else if( args.length == 1){
      if( typeof args[0] === 'string' || typeof args[0] === 'number'){
       type = PAYLOAD_TYPE.STRING;
       pack = encoder.encode( args[0] + "."); // add null area.
       pack[pack.byteLength - 1 ] = 0; // set null.

      }else if( ArrayBuffer.isView( args[0]) || args[0] instanceof ArrayBuffer ){  //one buffer
        type = PAYLOAD_TYPE.BUFFER;
        pack = B8( args[0 ] );
      }else if(typeof args[0] === 'object'){ 
        type = PAYLOAD_TYPE.OBJECT;
        pack = encoder.encode( JSON.stringify( args[0]) );
      }else {
        //
        console.log('unknown type payload arguments');
      }
    }else { // args 2 and more
      let containsBuffer = false;
      args.forEach( item =>{
        if( ArrayBuffer.isView( item ) || item instanceof ArrayBuffer ) containsBuffer = true;
        // console.log('payload item', item )
      });

      if( containsBuffer ){
        type = PAYLOAD_TYPE.MBA;
        // pack 
      }else {
        type = PAYLOAD_TYPE.MJSON;
          // args is array
        pack = encoder.encode( JSON.stringify( args ) );
      }
      
    }
    
    return { type: type, buffer: pack }

  }  

  get_signal_pack( target, ...args ){
    if( typeof target !== 'string') throw TypeError('target should be string.')
    
    let targetEncoded = encoder.encode( target);
    let payload = this.parsePayload( args );

    // let payloadTypeName = PAYLOAD_TYPE[ payload.type ]
    // console.log('[SIG_SENDER: payload type]', payloadTypeName )

    let sigPack;
    if( payload.type == PAYLOAD_TYPE.EMPTY ){
      sigPack = pack( 
        MB('#MsgType','8', RemoteMsg.SIGNAL) , 
        MB('#targetLen','8', targetEncoded.byteLength),
        MB('#target', targetEncoded),
        MB('#payloadType', '8', payload.type )
        );
    }else if( payload.type == PAYLOAD_TYPE.MBA ){
      sigPack = pack( 
        MB('#MsgType','8', RemoteMsg.SIGNAL) , 
        MB('#targetLen','8', targetEncoded.byteLength),
        MB('#target', targetEncoded),
        MB('#payloadType', '8', payload.type ),
        MBA(...args)
        );
    }else {
      sigPack = pack( 
        MB('#MsgType','8', RemoteMsg.SIGNAL) , 
        MB('#targetLen','8', targetEncoded.byteLength),
        MB('#target', targetEncoded),
        MB('#payloadType', '8', payload.type ),
        MB('#payload', payload.buffer )
        );
    }
    return sigPack
  }


  signal( target , ...args ){
    if( typeof target !== 'string') throw TypeError('target should be string.')

    let signalPack = this.get_signal_pack(target, ...args );
    this.send_enc_mode( signalPack );
  }

  decrypt_e2e( data, key ){
   return this.boho.decrypt_e2e( data, key )
  }

  signal_e2e( target , data, key){

    if( typeof target !== 'string') throw TypeError('target should be string.')
    let targetEncoded = encoder.encode( target);
    let dataPack = B8( data  );

    let sercretPack = this.boho.encrypt_e2e( dataPack, key );
    // let sercretPack = Buffer.alloc(10)
// console.log( 'encrypt_e2e', sercretPack )

    let signalPack = pack( 
      MB('#MsgType','8', RemoteMsg.SIGNAL_E2E) , 
      MB('#targetLen','8', targetEncoded.byteLength),
      MB('#target', targetEncoded),
      MB('#payloadType', '8', PAYLOAD_TYPE.BUFFER ),
      MB('#payload', sercretPack )
      );
    //encrypt payload area with key

    //change signal header into SIGNAL_E2E


    this.send_enc_mode( signalPack );
  }
    

  signal_promise(tag , ...args ){
      let sigPack = this.get_signal_pack( tag, ...args );
      let sigRetPack = pack( 
        MB('#MsgType','8',RemoteMsg.SIGNAL_REQ) , 
        MB('#mid','16',++this.mid), 
        MB('#sigPack_withoutHeader', sigPack.subarray(1))
        );
      this.send_enc_mode(  sigRetPack  );
      return this.setMsgPromise( this.mid )
  }
    
 
  sudo( command , ...args ){
     return this.signal_promise('sudo:'+ command, ...args )
  }
    
  

  listen(tag , handler){
    if( typeof tag !== 'string') throw TypeError('tag should be string.')
    if( tag.length > 255 || tag.length == 0 ) throw TypeError('tag string length range: 1~255')
    
    if( tag.includes('@'));else { // channel listener.
      // store channel info for auto re-subscribing.
      this.channels.add(tag); 
    }
    console.log('channels:', this.channels );
   
    if( handler ){
      if( typeof( handler) === 'function'){ 
        this.on( tag , handler);
      }else {
        throw TypeError('listener handler is not a function')
      }
    }
    // susbscribe when 'ready'
  
  }
  

  
  set(target ){
    if( typeof target !== 'string') throw TypeError('target should be string.')

    if( !this.isOpen ) return 
    let targetEncoded = encoder.encode( target); 
    if( targetEncoded.byteLength > SIZE_LIMIT.TAG_LEN1 ) throw TypeError('please use target string bytelength below:' + SIZE_LIMIT.TAG_LEN1 )

    this.send_enc_mode( 
      buffer.Buffer.concat( [
        NB('8',RemoteMsg.SET),  
        NB('8', targetEncoded.byteLength), 
        targetEncoded ]) );
  }


  subscribe(tag ){
    if( typeof tag !== 'string') throw TypeError('tag should be string.')

    if( !this.isOpen ) return 

    let tagList = tag.split(',');
    tagList.forEach( tag=>{
      this.channels.add(tag);
    });

    let tagEncoded = encoder.encode( tag); 
    if( tagEncoded.byteLength > SIZE_LIMIT.TAG_LEN1 ) throw TypeError('please use tag string bytelength below:' + SIZE_LIMIT.TAG_LEN1 )

    this.send_enc_mode( 
      buffer.Buffer.concat( [
        NB('8',RemoteMsg.SUBSCRIBE),  
        NB('8', tagEncoded.byteLength), 
        tagEncoded ]) );
  }


  // request returns promise.
  request(tag){
    if( typeof tag !== 'string') throw TypeError('tag should be string.')
    let tagEncoded = encoder.encode( tag); 
    if( tagEncoded.byteLength > SIZE_LIMIT.TAG_LEN1 ) throw TypeError('please use tag string bytelength: ' + SIZE_LIMIT.TAG_LEN1 )

    this.send_enc_mode( 
      buffer.Buffer.concat( [
        NB('8',RemoteMsg.REQUEST),  
        NB('16', ++this.mid), 
        NB('8', tagEncoded.byteLength), 
        tagEncoded ]) );
    return this.setMsgPromise( this.mid )
  }


  subscribe_promise(tag){
    if( typeof tag !== 'string') throw TypeError('tag should be string.')

    if( !this.isOpen ){
      return Promise.reject('subscribe_promise:: connection is not open')
    }

    let tagEncoded = encoder.encode( tag); 
    if( tagEncoded.byteLength > SIZE_LIMIT.TAG_LEN2 ) throw TypeError('please use tag string bytelength: ' + SIZE_LIMIT.TAG_LEN2)

    this.send_enc_mode( 
      buffer.Buffer.concat( [
        NB('8',RemoteMsg.SUBSCRIBE_REQ),  
        NB('16', ++this.mid), 
        NB('16', tagEncoded.byteLength), 
        tagEncoded ]) );
    return this.setMsgPromise( this.mid )
  }

  subscribe_memory_channels( ){ //local cache . auto_resubscribe
    if(this.channels.size == 0) return
    let chList = Array.from( this.channels).join(',');
    console.log('<< AUTO_SUBSCRIBE_PROMISE', chList );

    this.subscribe_promise( chList)
    .then( (r)=>{ 
      console.log('>> SUBSCRIBE_REQ SUCCESS reg_channels: ', r); // return code == map.size
      console.log('-- local channels: ', this.channels ); // return code == map.size
    }).catch( (e)=>{
      console.log('>> SUBSCRIBE_REQ FAIL:', e);
    }); 

  }

  unsubscribe(tag = ""){
    console.log('unsub', tag);
    if( typeof tag !== 'string') throw TypeError('tag should be string.')

    
    if(tag == ""){
      console.log('unsub all');
      this.channels.clear();
    }else {
      let tagList = tag.split(',');
      tagList.forEach( tag=>{
        this.channels.delete(tag);
        this.removeAllListeners( tag );
      });

    }


    let tagEncoded = encoder.encode( tag); 
    if( tagEncoded.byteLength > SIZE_LIMIT.TAG_LEN1 ) throw TypeError('please use tag string bytelength below:' + SIZE_LIMIT.TAG_LEN1 )

    this.send_enc_mode( buffer.Buffer.concat( [
      NB('8',RemoteMsg.UNSUBSCRIBE),  
      NB('8', tagEncoded.byteLength), 
      tagEncoded ]) );

  }




 
}

class RemoteCongTCP extends RemoteCore{
  constructor( url  ) {
    super( url );
    this.connect();
  }

  runChecker(url) {
    // console.log('.')
    if ( this.socket?.readyState != 'open' ) {
      this.connect();
    } 
  }

  close() {
    this.socket?.end();
    this.socket = null;
    clearInterval(this.runCheckIntervalID);
    this.runCheckIntervalID = null;
  }

  open(url){
    this.connect(url);
  }


  connect(url) {
    if (url) this.serverURL = url;

    if(this.runCheckIntervalID)  clearInterval(this.runCheckIntervalID);
    this.runCheckIntervalID = setInterval(this.runChecker.bind(this), this.runCheckPeriod);
    console.log('+');

    this.socket?.end(); // TCP 
    this.socket = null;
   
    // TCP Socket
      let urlObj = new URL( this.serverURL );
      console.log('connect port, url',urlObj.port,  urlObj.hostname );
      this.socket = net.createConnection( urlObj.port,  urlObj.hostname );

      this.socket.on('connect' , e=>{
        console.log('tcp connected' );
        this.congRx = new CongRx();
        this.socket.pipe( this.congRx );
        this.congRx.on("data", this.onTCPSocketMessage.bind(this));
        this.emit('open'); 
      });

      this.socket.on('error', e=>{ 
        this.emit('error', e);
      });

      this.socket.on('close', e=>{ 
      this.emit('close');
      });
  
  } //end connect 

  onTCPSocketMessage( data ) {
    this.rxCounter++;
    this.lastTxRxTime = Date.now();
    // console.log('>> congRx data.len:', data.byteLength )
    // console.log('>> cong.rxi, rxi_zero:', this.congRx.rxi, this.congRx.rxi_zero )
    this.emit('socket_data', data  );
    
  }

  send(data) {  
    if( this.socket?.readyState == 'open'){
      // console.log('tcp send raw payload:', data)
      let packData = CongTxSync(data);
      // console.log('tcp send cong packed:', packData)
      this.socket.write( packData );
      this.txCounter++;
      this.lastTxRxTime = Date.now();
    }else {
      console.log('send()::socket not open');
    }
  }
 
}

class RemoteWS extends RemoteCore{
  constructor(url  ) {
    super(url);
    this.connect();
  }

  runChecker(url) {
    // console.log('.')
    if ( this.socket?.readyState !== 1 ) {
      this.connect();
    }
  }

  close() {
    this.socket?.close();
    this.socket = null;
    clearInterval(this.runCheckIntervalID);
    this.runCheckIntervalID = null;
  }

  open(url){
    this.connect(url);
  }


  connect(url) {
    if (url) this.serverURL = url;

    if(this.runCheckIntervalID)  clearInterval(this.runCheckIntervalID);
    this.runCheckIntervalID = setInterval(this.runChecker.bind(this), this.runCheckPeriod);
    console.log('+');

    this.socket?.close();
    this.socket = null;
   
    // node WebSocket
      this.socket = new websocket (this.serverURL );

      this.socket.onopen = (e) => {
        this.socket.on('message', this.onWebSocketMessage.bind(this) );
        this.emit("open" );
      };

      this.socket.onerror = (e)=>{ 
        this.emit('error', e);
      };

      this.socket.onclose = (e)=>{ 
        this.emit("close" );
      };
  
  } //end connect 

  onWebSocketMessage( data  ) {
    this.rxCounter++;
    this.lastTxRxTime = Date.now();
    this.emit('socket_data', data  );
  }

  send(data) {  
    if( this.socket?.readyState === 1 ){
      // console.log('websocket send', data)
      this.socket.send( data );
      this.txCounter++;
      this.lastTxRxTime = Date.now();
    }else {
      console.log('send()::socket not open');
    }
  }
 
}

const decoder = new TextDecoder();

class AuthCore{

  constructor(){ 

  }

  send_auth_fail( peer , reason){
    console.log('-- AUTH_FAIL: ', reason );
    peer.send( Buffer.from( [rt.AUTH_FAIL] ));
  }

  async verify_auth_hmac( auth_hmac , peer ){

    try {
      //1. unpack 
      let infoPack = unpack( auth_hmac , nt.AUTH_HMAC );
      if(!infoPack){
        this.send_auth_fail( peer ,'unpack auth_pack');
        return
      }

      let id = "";
      if( infoPack.id8.includes(0)){
        id = decoder.decode( infoPack.id8.subarray( 0, infoPack.id8.indexOf(0) ) );
      }else {
        id = decoder.decode( infoPack.id8 );
      }

      //2. get key of id from DB
      let authKey = await this.getAuthKey( id );
      if( !authKey ){
        this.send_auth_fail( peer , 'NO ID:'+ id);
        return
      }

      //3. check hmac
      // console.log('-- found: authKey of id: ', id, authKey.toString('hex'))
      peer.boho.copy_id8( infoPack.id8 );
      peer.boho.copy_key( authKey );
      let auth_ack = peer.boho.check_auth_hmac( infoPack );

      if( !auth_ack ){
        this.send_auth_fail( peer, 'hmac dismatched' );
        return
      }

      //4. get info
        // console.log('#### auth success' )
      let info =  await this.getInfo(id);
      if( !info ){
        this.send_auth_fail( peer , 'NO Info');
        return
      }

      //5. check duplicate login.
      // current policy. Deny duplicate login
      if( peer.manager.cid_map.has( info.cid  ) ){
        // send ping to check alive.
        this.manager.cid_map.get(info.cid ).ping();
        this.send_auth_fail( peer , 'Deny: duplicate login' );
        return
      }

      //6. delete current cid if exist.
      if( peer.cid ){
        peer.manager.cid_map.delete( peer.cid ); 
      }

      //7. setting info.
      peer.did = id;
      peer.cid = info.cid;
      peer.nick =  info.cid; // temporary: nick as cid

      //8. setting admin level. 
      if(info.adminLevel){
        peer.adminLevel = info.adminLevel;
        console.log('-- admin user: ', peer.cid , 'level: ', peer.adminLevel );
      } 

      //9. set cid_map
      peer.manager.cid_map.set( peer.cid , peer );

      let cid_map_arr = Array.from( peer.manager.cid_map.keys() );
      console.log('-- cid_map list:', cid_map_arr );

      console.log(">> LOGIN: ", `did: ${ peer.did} cid: ${peer.cid}` );
      //10. send ack.
      peer.send( auth_ack );

    } catch (error) {
      this.send_auth_fail( peer ,'caught: unknown error' + error );
    }

  }



  
}

class AuthFile extends AuthCore{
  constructor( path ){
    super();
    //read auth from file
    this.AUTH = new Map();
    this.INFO = new Map();
    this.PUBLIC = new Map();
    this.path = path;
    if(path){
      this.loadAuthInfoFile(path);
    }else {
      console.log('no authinfofile path.');
    }
    console.log('authfromfile path:', path );
  }


  async getAuthKey( id ){
    return this.AUTH.get( id )
  }

  async getInfo( id ){
    return this.INFO.get( id )
  }

  async getPublic( id ){
    return this.PUBLIC.get( id )
  }

  //sync
   loadAuthInfoFile(path){ 
    let file = readFileSync( path );
    file = new TextDecoder().decode( file );
    // console.log(file )
    let list = JSON.parse( file );
    list.forEach( item =>{
      this.addAuthInfo(...item );
    });
    console.log('total AUTH,INFO size: ', this.AUTH.size , this.INFO.size );

  }


  addAuthInfo( id, keyStr , cid ){
    let hashKey = Buffer.from( o.hash(keyStr));
    this.AUTH.set( id, hashKey );
    this.INFO.set( id, {cid: cid } );

  }

  setPublic( id, infoObj = {} ){
    this.PUBLIC.set( id, infoObj );
  }

}

export { AuthCore, AuthFile, ENC_MODE, Meta, PAYLOAD_TYPE, RemoteWS as Remote, RemoteCongTCP, RemoteMsg, RemoteOptions, RemoteServer, SIZE_LIMIT, TCP_PORT, WS_PORT, o as sha256, timeStamp };
