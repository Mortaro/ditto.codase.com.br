exports.ids = [0];
exports.modules = {

/***/ "./node_modules/ws/index.js":
/*!**********************************!*\
  !*** ./node_modules/ws/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const WebSocket = __webpack_require__(/*! ./lib/websocket */ "./node_modules/ws/lib/websocket.js");

WebSocket.createWebSocketStream = __webpack_require__(/*! ./lib/stream */ "./node_modules/ws/lib/stream.js");
WebSocket.Server = __webpack_require__(/*! ./lib/websocket-server */ "./node_modules/ws/lib/websocket-server.js");
WebSocket.Receiver = __webpack_require__(/*! ./lib/receiver */ "./node_modules/ws/lib/receiver.js");
WebSocket.Sender = __webpack_require__(/*! ./lib/sender */ "./node_modules/ws/lib/sender.js");
module.exports = WebSocket;

/***/ }),

/***/ "./node_modules/ws/lib/buffer-util.js":
/*!********************************************!*\
  !*** ./node_modules/ws/lib/buffer-util.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  EMPTY_BUFFER
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
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
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;

  for (let i = 0; i < length; i++) {
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

try {
  const bufferUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  const bu = bufferUtil.BufferUtil || bufferUtil;
  module.exports = {
    concat,

    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);else bu.mask(source, mask, output, offset, length);
    },

    toArrayBuffer,
    toBuffer,

    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);else bu.unmask(buffer, mask);
    }

  };
} catch (e)
/* istanbul ignore next */
{
  module.exports = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}

/***/ }),

/***/ "./node_modules/ws/lib/constants.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/constants.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  EMPTY_BUFFER: Buffer.alloc(0),
  NOOP: () => {}
};

/***/ }),

/***/ "./node_modules/ws/lib/event-target.js":
/*!*********************************************!*\
  !*** ./node_modules/ws/lib/event-target.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Class representing an event.
 *
 * @private
 */

class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @param {Object} target A reference to the target to which the event was dispatched
   */
  constructor(type, target) {
    this.target = target;
    this.type = type;
  }

}
/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */


class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(data, target) {
    super('message', target);
    this.data = data;
  }

}
/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */


class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being closed
   * @param {String} reason A human-readable string explaining why the connection is closing
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(code, reason, target) {
    super('close', target);
    this.wasClean = target._closeFrameReceived && target._closeFrameSent;
    this.reason = reason;
    this.code = code;
  }

}
/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */


class OpenEvent extends Event {
  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(target) {
    super('open', target);
  }

}
/**
 * Class representing an error event.
 *
 * @extends Event
 * @private
 */


class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {Object} error The error that generated this event
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(error, target) {
    super('error', target);
    this.message = error.message;
    this.error = error;
  }

}
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
   * @param {Function} listener The listener to add
   * @param {Object} options An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} options.once A `Boolean`` indicating that the listener
   *     should be invoked at most once after being added. If `true`, the
   *     listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, listener, options) {
    if (typeof listener !== 'function') return;

    function onMessage(data) {
      listener.call(this, new MessageEvent(data, this));
    }

    function onClose(code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError(error) {
      listener.call(this, new ErrorEvent(error, this));
    }

    function onOpen() {
      listener.call(this, new OpenEvent(this));
    }

    const method = options && options.once ? 'once' : 'on';

    if (type === 'message') {
      onMessage._listener = listener;
      this[method](type, onMessage);
    } else if (type === 'close') {
      onClose._listener = listener;
      this[method](type, onClose);
    } else if (type === 'error') {
      onError._listener = listener;
      this[method](type, onError);
    } else if (type === 'open') {
      onOpen._listener = listener;
      this[method](type, onOpen);
    } else {
      this[method](type, listener);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener(type, listener) {
    const listeners = this.listeners(type);

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(type, listeners[i]);
      }
    }
  }

};
module.exports = EventTarget;

/***/ }),

/***/ "./node_modules/ws/lib/extension.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/extension.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

const tokenChars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];
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
  if (dest[name] === undefined) dest[name] = [elem];else dest[name].push(elem);
}
/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */


function parse(header) {
  const offers = Object.create(null);
  if (header === undefined || header === '') return offers;
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20
      /* ' ' */
      || code === 0x09
      /* '\t' */
      ) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b
      /* ';' */
      || code === 0x2c
      /* ',' */
      ) {
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
      if (end === -1 && tokenChars[code] === 1) {
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
      } else if (code === 0x3d
      /* '=' */
      && start !== -1 && end === -1) {
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
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (start === -1) start = i;else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22
        /* '"' */
        && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c
        /* '\' */
        ) {
            isEscaping = true;
          } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
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

  if (start === -1 || inQuotes) {
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


function format(extensions) {
  return Object.keys(extensions).map(extension => {
    let configurations = extensions[extension];
    if (!Array.isArray(configurations)) configurations = [configurations];
    return configurations.map(params => {
      return [extension].concat(Object.keys(params).map(k => {
        let values = params[k];
        if (!Array.isArray(values)) values = [values];
        return values.map(v => v === true ? k : `${k}=${v}`).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
}

module.exports = {
  format,
  parse
};

/***/ }),

/***/ "./node_modules/ws/lib/limiter.js":
/*!****************************************!*\
  !*** ./node_modules/ws/lib/limiter.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
   * @param {Number} concurrency The maximum number of jobs allowed to run
   *     concurrently
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

module.exports = Limiter;

/***/ }),

/***/ "./node_modules/ws/lib/permessage-deflate.js":
/*!***************************************************!*\
  !*** ./node_modules/ws/lib/permessage-deflate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const zlib = __webpack_require__(/*! zlib */ "zlib");

const bufferUtil = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const Limiter = __webpack_require__(/*! ./limiter */ "./node_modules/ws/lib/limiter.js");

const {
  kStatusCode,
  NOOP
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error'); //
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
   * @param {Object} options Configuration options
   * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
   *     of server context takeover
   * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
   *     disabling of client context takeover
   * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
   *     for, or request, a custom client window size
   * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
   * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
   * @param {Number} options.threshold Size (in bytes) below which messages
   *     should not be compressed
   * @param {Number} options.concurrencyLimit The number of concurrent calls to
   *     zlib
   * @param {Boolean} isServer Create the instance in either server or client
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold = this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;
    this.params = null;

    if (!zlibLimiter) {
      const concurrency = this._options.concurrencyLimit !== undefined ? this._options.concurrencyLimit : 10;
      zlibLimiter = new Limiter(concurrency);
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
    this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
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
        callback(new Error('The deflate stream was closed while data was being processed'));
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
    const accepted = offers.find(params => {
      if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === 'number' && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === 'number' && !params.client_max_window_bits) {
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
    } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
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

    if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === 'number' && params.client_max_window_bits > this._options.clientMaxWindowBits) {
      throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
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
    configurations.forEach(params => {
      Object.keys(params).forEach(key => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;

            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
            }

            value = num;
          } else if (!this._isServer) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;

          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
          }

          value = num;
        } else if (key === 'client_no_context_takeover' || key === 'server_no_context_takeover') {
          if (value !== true) {
            throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
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
    zlibLimiter.add(done => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }
  /**
   * Compress data. Concurrency limited.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */


  compress(data, fin, callback) {
    zlibLimiter.add(done => {
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
      const windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
      this._inflate = zlib.createInflateRaw({ ...this._options.zlibInflateOptions,
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
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();

        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._inflate.close();

        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];
      }

      callback(null, data);
    });
  }
  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */


  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
      this._deflate = zlib.createDeflateRaw({ ...this._options.zlibDeflateOptions,
        windowBits
      });
      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = []; //
      // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
      // `zlib.DeflateRaw` instance is closed while data is being processed.
      // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
      // time due to an abnormal WebSocket closure.
      //

      this._deflate.on('error', NOOP);

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

      let data = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
      if (fin) data = data.slice(0, data.length - 4); //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //

      this._deflate[kCallback] = null;

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.close();

        this._deflate = null;
      } else {
        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];
      }

      callback(null, data);
    });
  }

}

module.exports = PerMessageDeflate;
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

  if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError][kStatusCode] = 1009;
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
  err[kStatusCode] = 1007;
  this[kCallback](err);
}

/***/ }),

/***/ "./node_modules/ws/lib/receiver.js":
/*!*****************************************!*\
  !*** ./node_modules/ws/lib/receiver.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Writable
} = __webpack_require__(/*! stream */ "stream");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");

const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const {
  concat,
  toArrayBuffer,
  unmask
} = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const {
  isValidStatusCode,
  isValidUTF8
} = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;
/**
 * HyBi Receiver implementation.
 *
 * @extends stream.Writable
 */

class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {String} binaryType The type for binary data
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Boolean} isServer Specifies whether to operate in client or server
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  constructor(binaryType, extensions, isServer, maxPayload) {
    super();
    this._binaryType = binaryType || BINARY_TYPES[0];
    this[kWebSocket] = undefined;
    this._extensions = extensions || {};
    this._isServer = !!isServer;
    this._maxPayload = maxPayload | 0;
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
      return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(RangeError, 'RSV1 must be clear', true, 1002);
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(RangeError, 'invalid opcode 0', true, 1002);
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(RangeError, 'FIN must be set', true, 1002);
      }

      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002);
      }
    } else {
      this._loop = false;
      return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(RangeError, 'MASK must be set', true, 1002);
      }
    } else if (this._masked) {
      this._loop = false;
      return error(RangeError, 'MASK must be clear', true, 1002);
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;else return this.haveLength();
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
    const num = buf.readUInt32BE(0); //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //

    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(RangeError, 'Unsupported WebSocket frame: payload length > 2^53 - 1', false, 1009);
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
        return error(RangeError, 'Max payload size exceeded', false, 1009);
      }
    }

    if (this._masked) this._state = GET_MASK;else this._state = GET_DATA;
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
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);
      if (this._masked) unmask(data, this._mask);
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its lenght is the sum of the payload
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
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;

        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(error(RangeError, 'Max payload size exceeded', false, 1009));
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

        this.emit('message', data);
      } else {
        const buf = concat(fragments, messageLength);

        if (!isValidUTF8(buf)) {
          this._loop = false;
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('message', buf.toString());
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
        this.emit('conclude', 1005, '');
        this.end();
      } else if (data.length === 1) {
        return error(RangeError, 'invalid payload length 1', true, 1002);
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(RangeError, `invalid status code ${code}`, true, 1002);
        }

        const buf = data.slice(2);

        if (!isValidUTF8(buf)) {
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('conclude', code, buf.toString());
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

module.exports = Receiver;
/**
 * Builds an error object.
 *
 * @param {(Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @return {(Error|RangeError)} The error
 * @private
 */

function error(ErrorCtor, message, prefix, statusCode) {
  const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
  Error.captureStackTrace(err, error);
  err[kStatusCode] = statusCode;
  return err;
}

/***/ }),

/***/ "./node_modules/ws/lib/sender.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/sender.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  randomFillSync
} = __webpack_require__(/*! crypto */ "crypto");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");

const {
  EMPTY_BUFFER
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const {
  isValidStatusCode
} = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

const {
  mask: applyMask,
  toBuffer
} = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const mask = Buffer.alloc(4);
/**
 * HyBi Sender implementation.
 */

class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  constructor(socket, extensions) {
    this._extensions = extensions || {};
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
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */


  static frame(data, options) {
    const merge = options.mask && options.readOnly;
    let offset = options.mask ? 6 : 2;
    let payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;
    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2);
      target.writeUInt32BE(data.length, 6);
    }

    if (!options.mask) return [target, data];
    randomFillSync(mask, 0, 4);
    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      applyMask(data, mask, target, offset, data.length);
      return [target];
    }

    applyMask(data, mask, data, 0, data.length);
    return [target, data];
  }
  /**
   * Sends a close message to the other peer.
   *
   * @param {(Number|undefined)} code The status code component of the body
   * @param {String} data The message component of the body
   * @param {Boolean} mask Specifies whether or not to mask the message
   * @param {Function} cb Callback
   * @public
   */


  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || data === '') {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);
      buf.write(data, 2);
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }
  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @private
   */


  doClose(data, mask, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x08,
      mask,
      readOnly: false
    }), cb);
  }
  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */


  ping(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPing(buf, mask, toBuffer.readOnly, cb);
    }
  }
  /**
   * Frames and sends a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */


  doPing(data, mask, readOnly, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x09,
      mask,
      readOnly
    }), cb);
  }
  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */


  pong(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPong(buf, mask, toBuffer.readOnly, cb);
    }
  }
  /**
   * Frames and sends a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */


  doPong(data, mask, readOnly, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x0a,
      mask,
      readOnly
    }), cb);
  }
  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */


  send(data, options, cb) {
    const buf = toBuffer(data);
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    if (this._firstFragment) {
      this._firstFragment = false;

      if (rsv1 && perMessageDeflate) {
        rsv1 = buf.length >= perMessageDeflate._threshold;
      }

      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
      } else {
        this.dispatch(buf, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(Sender.frame(buf, {
        fin: options.fin,
        rsv1: false,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      }), cb);
    }
  }
  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} compress Specifies whether or not to compress `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @param {Function} cb Callback
   * @private
   */


  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error('The socket was closed while data was being compressed');
        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const callback = this._queue[i][4];
          if (typeof callback === 'function') callback(err);
        }

        return;
      }

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

      this._bufferedBytes -= params[1].length;
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
    this._bufferedBytes += params[1].length;

    this._queue.push(params);
  }
  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} cb Callback
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

module.exports = Sender;

/***/ }),

/***/ "./node_modules/ws/lib/stream.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/stream.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Duplex
} = __webpack_require__(/*! stream */ "stream");
/**
 * Emits the `'close'` event on a stream.
 *
 * @param {stream.Duplex} The stream.
 * @private
 */


function emitClose(stream) {
  stream.emit('close');
}
/**
 * The listener of the `'end'` event.
 *
 * @private
 */


function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}
/**
 * The listener of the `'error'` event.
 *
 * @private
 */


function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();

  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}
/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} options The options for the `Duplex` constructor
 * @return {stream.Duplex} The duplex stream
 * @public
 */


function createWebSocketStream(ws, options) {
  let resumeOnReceiverDrain = true;

  function receiverOnDrain() {
    if (resumeOnReceiverDrain) ws._socket.resume();
  }

  if (ws.readyState === ws.CONNECTING) {
    ws.once('open', function open() {
      ws._receiver.removeAllListeners('drain');

      ws._receiver.on('drain', receiverOnDrain);
    });
  } else {
    ws._receiver.removeAllListeners('drain');

    ws._receiver.on('drain', receiverOnDrain);
  }

  const duplex = new Duplex({ ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });
  ws.on('message', function message(msg) {
    if (!duplex.push(msg)) {
      resumeOnReceiverDrain = false;

      ws._socket.pause();
    }
  });
  ws.once('error', function error(err) {
    if (duplex.destroyed) return;
    duplex.destroy(err);
  });
  ws.once('close', function close() {
    if (duplex.destroyed) return;
    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;
    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });
    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });
    ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    } // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.


    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });

      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
      resumeOnReceiverDrain = true;
      if (!ws._receiver._writableState.needDrain) ws._socket.resume();
    }
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;

/***/ }),

/***/ "./node_modules/ws/lib/validation.js":
/*!*******************************************!*\
  !*** ./node_modules/ws/lib/validation.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  const isValidUTF8 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  exports.isValidUTF8 = typeof isValidUTF8 === 'object' ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
  : isValidUTF8;
} catch (e)
/* istanbul ignore next */
{
  exports.isValidUTF8 = () => true;
}
/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */


exports.isValidStatusCode = code => {
  return code >= 1000 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3000 && code <= 4999;
};

/***/ }),

/***/ "./node_modules/ws/lib/websocket-server.js":
/*!*************************************************!*\
  !*** ./node_modules/ws/lib/websocket-server.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__(/*! events */ "events");

const {
  createHash
} = __webpack_require__(/*! crypto */ "crypto");

const {
  createServer,
  STATUS_CODES
} = __webpack_require__(/*! http */ "http");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");

const WebSocket = __webpack_require__(/*! ./websocket */ "./node_modules/ws/lib/websocket.js");

const {
  format,
  parse
} = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");

const {
  GUID,
  kWebSocket
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;
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
   * @param {Number} options.backlog The maximum length of the queue of pending
   *     connections
   * @param {Boolean} options.clientTracking Specifies whether or not to track
   *     clients
   * @param {Function} options.handleProtocols A hook to handle protocols
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Boolean} options.noServer Enable no server mode
   * @param {String} options.path Accept only connections matching this path
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
   *     permessage-deflate
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient A hook to reject connections
   * @param {Function} callback A listener for the `listening` event
   */
  constructor(options, callback) {
    super();
    options = {
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null,
      // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      ...options
    };

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError('One of the "port", "server", or "noServer" options must be specified');
    }

    if (options.port != null) {
      this._server = createServer((req, res) => {
        const body = STATUS_CODES[426];
        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });

      this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, ws => {
            this.emit('connection', ws, req);
          });
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) this.clients = new Set();
    this.options = options;
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
   * Close the server.
   *
   * @param {Function} cb Callback
   * @public
   */


  close(cb) {
    if (cb) this.once('close', cb); //
    // Terminate all associated clients.
    //

    if (this.clients) {
      for (const client of this.clients) client.terminate();
    }

    const server = this._server;

    if (server) {
      this._removeListeners();

      this._removeListeners = this._server = null; //
      // Close the http server if it was internally created.
      //

      if (this.options.port != null) {
        server.close(() => this.emit('close'));
        return;
      }
    }

    process.nextTick(emitClose, this);
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
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */


  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);
    const key = req.headers['sec-websocket-key'] !== undefined ? req.headers['sec-websocket-key'].trim() : false;
    const version = +req.headers['sec-websocket-version'];
    const extensions = {};

    if (req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket' || !key || !keyRegex.test(key) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
      return abortHandshake(socket, 400);
    }

    if (this.options.perMessageDeflate) {
      const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);

      try {
        const offers = parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    } //
    // Optionally call external client verification handler.
    //


    if (this.options.verifyClient) {
      const info = {
        origin: req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.connection.authorized || req.connection.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(key, extensions, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(key, extensions, req, socket, head, cb);
  }
  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Object} extensions The accepted extensions
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */


  completeUpgrade(key, extensions, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error('server.handleUpgrade() was called more than once with the same ' + 'socket, possibly due to a misconfiguration');
    }

    const digest = createHash('sha1').update(key + GUID).digest('base64');
    const headers = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade', `Sec-WebSocket-Accept: ${digest}`];
    const ws = new WebSocket(null);
    let protocol = req.headers['sec-websocket-protocol'];

    if (protocol) {
      protocol = protocol.trim().split(/ *, */); //
      // Optionally call external protocol selection handler.
      //

      if (this.options.handleProtocols) {
        protocol = this.options.handleProtocols(protocol, req);
      } else {
        protocol = protocol[0];
      }

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws.protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    } //
    // Allow external modification/inspection of handshake headers.
    //


    this.emit('headers', headers, req);
    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);
    ws.setSocket(socket, head, this.options.maxPayload);

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
    }

    cb(ws);
  }

}

module.exports = WebSocketServer;
/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when called
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
  server.emit('close');
}
/**
 * Handle premature socket errors.
 *
 * @private
 */


function socketOnError() {
  this.destroy();
}
/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */


function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || STATUS_CODES[code];
    headers = {
      Connection: 'close',
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(message),
      ...headers
    };
    socket.write(`HTTP/1.1 ${code} ${STATUS_CODES[code]}\r\n` + Object.keys(headers).map(h => `${h}: ${headers[h]}`).join('\r\n') + '\r\n\r\n' + message);
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}

/***/ }),

/***/ "./node_modules/ws/lib/websocket.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/websocket.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__(/*! events */ "events");

const https = __webpack_require__(/*! https */ "https");

const http = __webpack_require__(/*! http */ "http");

const net = __webpack_require__(/*! net */ "net");

const tls = __webpack_require__(/*! tls */ "tls");

const {
  randomBytes,
  createHash
} = __webpack_require__(/*! crypto */ "crypto");

const {
  URL
} = __webpack_require__(/*! url */ "url");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");

const Receiver = __webpack_require__(/*! ./receiver */ "./node_modules/ws/lib/receiver.js");

const Sender = __webpack_require__(/*! ./sender */ "./node_modules/ws/lib/sender.js");

const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const {
  addEventListener,
  removeEventListener
} = __webpack_require__(/*! ./event-target */ "./node_modules/ws/lib/event-target.js");

const {
  format,
  parse
} = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");

const {
  toBuffer
} = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000;
/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */

class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|url.URL)} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  constructor(address, protocols, options) {
    super();
    this.readyState = WebSocket.CONNECTING;
    this.protocol = '';
    this._binaryType = BINARY_TYPES[0];
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = '';
    this._closeTimer = null;
    this._closeCode = 1006;
    this._extensions = {};
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  get CONNECTING() {
    return WebSocket.CONNECTING;
  }

  get CLOSING() {
    return WebSocket.CLOSING;
  }

  get CLOSED() {
    return WebSocket.CLOSED;
  }

  get OPEN() {
    return WebSocket.OPEN;
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
    this._binaryType = type; //
    // Allow to change `binaryType` on the fly.
    //

    if (this._receiver) this._receiver._binaryType = type;
  }
  /**
   * @type {Number}
   */


  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount; //
    // `socket.bufferSize` is `undefined` if the socket is closed.
    //

    return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
  }
  /**
   * @type {String}
   */


  get extensions() {
    return Object.keys(this._extensions).join();
  }
  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Number} maxPayload The maximum allowed message size
   * @private
   */


  setSocket(socket, head, maxPayload) {
    const receiver = new Receiver(this._binaryType, this._extensions, this._isServer, maxPayload);
    this._sender = new Sender(socket, this._extensions);
    this._receiver = receiver;
    this._socket = socket;
    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;
    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);
    socket.setTimeout(0);
    socket.setNoDelay();
    if (head.length > 0) socket.unshift(head);
    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);
    this.readyState = WebSocket.OPEN;
    this.emit('open');
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */


  emitClose() {
    if (!this._socket) {
      this.readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();

    this.readyState = WebSocket.CLOSED;
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
   * @param {Number} code Status code explaining why the connection is closing
   * @param {String} data A string explaining why the connection is closing
   * @public
   */


  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;

    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
      return;
    }

    this.readyState = WebSocket.CLOSING;

    this._sender.close(code, data, !this._isServer, err => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;
      this._closeFrameSent = true;
      if (this._closeFrameReceived) this._socket.end();
    }); //
    // Specify a timeout for the closing handshake to complete.
    //


    this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
  }
  /**
   * Send a ping.
   *
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the ping is sent
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
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the pong is sent
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
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress
   *     `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback which is executed when data is written out
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

    if (!this._extensions[PerMessageDeflate.extensionName]) {
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
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this.readyState = WebSocket.CLOSING;

      this._socket.destroy();
    }
  }

}

readyStates.forEach((readyState, i) => {
  WebSocket[readyState] = i;
}); //
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//

['open', 'error', 'close', 'message'].forEach(method => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method);

      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },

    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method);

      for (let i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }

      this.addEventListener(method, listener);
    }

  });
});
WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;
module.exports = WebSocket;
/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|url.URL)} address The URL to which to connect
 * @param {String} protocols The subprotocols
 * @param {Object} options Connection options
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
 *     permessage-deflate
 * @param {Number} options.handshakeTimeout Timeout in milliseconds for the
 *     handshake request
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version`
 *     header
 * @param {String} options.origin Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {Boolean} options.followRedirects Whether or not to follow redirects
 * @param {Number} options.maxRedirects The maximum number of redirects allowed
 * @private
 */

function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: undefined,
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} ` + `(supported versions: ${protocolVersions.join(', ')})`);
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket.url = address.href;
  } else {
    parsedUrl = new URL(address);
    websocket.url = address;
  }

  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
    throw new Error(`Invalid URL: ${websocket.url}`);
  }

  const isSecure = parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const get = isSecure ? https.get : http.get;
  let perMessageDeflate;
  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[') ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }

  if (protocols) {
    opts.headers['Sec-WebSocket-Protocol'] = protocols;
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

  if (isUnixSocket) {
    const parts = opts.path.split(':');
    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req = websocket._req = get(opts);

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', err => {
    if (websocket._req.aborted) return;
    req = websocket._req = null;
    websocket.readyState = WebSocket.CLOSING;
    websocket.emit('error', err);
    websocket.emitClose();
  });
  req.on('response', res => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();
      const addr = new URL(location, address);
      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
    }
  });
  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res); //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //

    if (websocket.readyState !== WebSocket.CONNECTING) return;
    req = websocket._req = null;
    const digest = createHash('sha1').update(key + GUID).digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    const protList = (protocols || '').split(/, */);
    let protError;

    if (!protocols && serverProt) {
      protError = 'Server sent a subprotocol but none was requested';
    } else if (protocols && !serverProt) {
      protError = 'Server sent no subprotocol';
    } else if (serverProt && !protList.includes(serverProt)) {
      protError = 'Server sent an invalid subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket.protocol = serverProt;

    if (perMessageDeflate) {
      try {
        const extensions = parse(res.headers['sec-websocket-extensions']);

        if (extensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Extensions header');
        return;
      }
    }

    websocket.setSocket(socket, head, opts.maxPayload);
  });
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
    options.servername = options.host;
  }

  return tls.connect(options);
}
/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
 *     socket to destroy
 * @param {String} message The error message
 * @private
 */


function abortHandshake(websocket, stream, message) {
  websocket.readyState = WebSocket.CLOSING;
  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();
    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
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
 * @param {*} data The data to send
 * @param {Function} cb Callback
 * @private
 */


function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length; //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //

    if (websocket._socket) websocket._sender._bufferedBytes += length;else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} ` + `(${readyStates[websocket.readyState]})`);
    cb(err);
  }
}
/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {String} reason The reason for closing
 * @private
 */


function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket._socket.resume();

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;
  if (code === 1005) websocket.close();else websocket.close(code, reason);
}
/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */


function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}
/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */


function receiverOnError(err) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket.readyState = WebSocket.CLOSING;
  websocket._closeCode = err[kStatusCode];
  websocket.emit('error', err);

  websocket._socket.destroy();
}
/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */


function receiverOnFinish() {
  this[kWebSocket].emitClose();
}
/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
 * @private
 */


function receiverOnMessage(data) {
  this[kWebSocket].emit('message', data);
}
/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */


function receiverOnPing(data) {
  const websocket = this[kWebSocket];
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
  this[kWebSocket].emit('pong', data);
}
/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */


function socketOnClose() {
  const websocket = this[kWebSocket];
  this.removeListener('close', socketOnClose);
  this.removeListener('end', socketOnEnd);
  websocket.readyState = WebSocket.CLOSING; //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk and emitted synchronously in a single
  // `'data'` event.
  //

  websocket._socket.read();

  websocket._receiver.end();

  this.removeListener('data', socketOnData);
  this[kWebSocket] = undefined;
  clearTimeout(websocket._closeTimer);

  if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
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
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}
/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */


function socketOnEnd() {
  const websocket = this[kWebSocket];
  websocket.readyState = WebSocket.CLOSING;

  websocket._receiver.end();

  this.end();
}
/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */


function socketOnError() {
  const websocket = this[kWebSocket];
  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket.readyState = WebSocket.CLOSING;
    this.destroy();
  }
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9idWZmZXItdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2V2ZW50LXRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2V4dGVuc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2xpbWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9wZXJtZXNzYWdlLWRlZmxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9yZWNlaXZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3NlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi93ZWJzb2NrZXQtc2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cy9saWIvd2Vic29ja2V0LmpzIl0sIm5hbWVzIjpbIldlYlNvY2tldCIsInJlcXVpcmUiLCJjcmVhdGVXZWJTb2NrZXRTdHJlYW0iLCJTZXJ2ZXIiLCJSZWNlaXZlciIsIlNlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJFTVBUWV9CVUZGRVIiLCJjb25jYXQiLCJsaXN0IiwidG90YWxMZW5ndGgiLCJsZW5ndGgiLCJ0YXJnZXQiLCJCdWZmZXIiLCJhbGxvY1Vuc2FmZSIsIm9mZnNldCIsImkiLCJidWYiLCJzZXQiLCJzbGljZSIsIl9tYXNrIiwic291cmNlIiwibWFzayIsIm91dHB1dCIsIl91bm1hc2siLCJidWZmZXIiLCJ0b0FycmF5QnVmZmVyIiwiYnl0ZUxlbmd0aCIsImJ5dGVPZmZzZXQiLCJ0b0J1ZmZlciIsImRhdGEiLCJyZWFkT25seSIsImlzQnVmZmVyIiwiQXJyYXlCdWZmZXIiLCJmcm9tIiwiaXNWaWV3IiwiYnVmZmVyVXRpbCIsImJ1IiwiQnVmZmVyVXRpbCIsInVubWFzayIsImUiLCJCSU5BUllfVFlQRVMiLCJHVUlEIiwia1N0YXR1c0NvZGUiLCJTeW1ib2wiLCJrV2ViU29ja2V0IiwiYWxsb2MiLCJOT09QIiwiRXZlbnQiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJNZXNzYWdlRXZlbnQiLCJDbG9zZUV2ZW50IiwiY29kZSIsInJlYXNvbiIsIndhc0NsZWFuIiwiX2Nsb3NlRnJhbWVSZWNlaXZlZCIsIl9jbG9zZUZyYW1lU2VudCIsIk9wZW5FdmVudCIsIkVycm9yRXZlbnQiLCJlcnJvciIsIm1lc3NhZ2UiLCJFdmVudFRhcmdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsIm9wdGlvbnMiLCJvbk1lc3NhZ2UiLCJjYWxsIiwib25DbG9zZSIsIm9uRXJyb3IiLCJvbk9wZW4iLCJtZXRob2QiLCJvbmNlIiwiX2xpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVycyIsInJlbW92ZUxpc3RlbmVyIiwidG9rZW5DaGFycyIsInB1c2giLCJkZXN0IiwibmFtZSIsImVsZW0iLCJ1bmRlZmluZWQiLCJwYXJzZSIsImhlYWRlciIsIm9mZmVycyIsIk9iamVjdCIsImNyZWF0ZSIsInBhcmFtcyIsIm11c3RVbmVzY2FwZSIsImlzRXNjYXBpbmciLCJpblF1b3RlcyIsImV4dGVuc2lvbk5hbWUiLCJwYXJhbU5hbWUiLCJzdGFydCIsImVuZCIsImNoYXJDb2RlQXQiLCJTeW50YXhFcnJvciIsInZhbHVlIiwicmVwbGFjZSIsInRva2VuIiwiZm9ybWF0IiwiZXh0ZW5zaW9ucyIsImtleXMiLCJtYXAiLCJleHRlbnNpb24iLCJjb25maWd1cmF0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJ2YWx1ZXMiLCJ2Iiwiam9pbiIsImtEb25lIiwia1J1biIsIkxpbWl0ZXIiLCJjb25jdXJyZW5jeSIsInBlbmRpbmciLCJJbmZpbml0eSIsImpvYnMiLCJhZGQiLCJqb2IiLCJzaGlmdCIsInpsaWIiLCJUUkFJTEVSIiwia1Blck1lc3NhZ2VEZWZsYXRlIiwia1RvdGFsTGVuZ3RoIiwia0NhbGxiYWNrIiwia0J1ZmZlcnMiLCJrRXJyb3IiLCJ6bGliTGltaXRlciIsIlBlck1lc3NhZ2VEZWZsYXRlIiwiaXNTZXJ2ZXIiLCJtYXhQYXlsb2FkIiwiX21heFBheWxvYWQiLCJfb3B0aW9ucyIsIl90aHJlc2hvbGQiLCJ0aHJlc2hvbGQiLCJfaXNTZXJ2ZXIiLCJfZGVmbGF0ZSIsIl9pbmZsYXRlIiwiY29uY3VycmVuY3lMaW1pdCIsIm9mZmVyIiwic2VydmVyTm9Db250ZXh0VGFrZW92ZXIiLCJzZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciIsImNsaWVudE5vQ29udGV4dFRha2VvdmVyIiwiY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXIiLCJzZXJ2ZXJNYXhXaW5kb3dCaXRzIiwic2VydmVyX21heF93aW5kb3dfYml0cyIsImNsaWVudE1heFdpbmRvd0JpdHMiLCJjbGllbnRfbWF4X3dpbmRvd19iaXRzIiwiYWNjZXB0Iiwibm9ybWFsaXplUGFyYW1zIiwiYWNjZXB0QXNTZXJ2ZXIiLCJhY2NlcHRBc0NsaWVudCIsImNsZWFudXAiLCJjbG9zZSIsImNhbGxiYWNrIiwiRXJyb3IiLCJvcHRzIiwiYWNjZXB0ZWQiLCJmaW5kIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwia2V5IiwibnVtIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwiVHlwZUVycm9yIiwiZGVjb21wcmVzcyIsImZpbiIsImRvbmUiLCJfZGVjb21wcmVzcyIsImVyciIsInJlc3VsdCIsImNvbXByZXNzIiwiX2NvbXByZXNzIiwiZW5kcG9pbnQiLCJ3aW5kb3dCaXRzIiwiWl9ERUZBVUxUX1dJTkRPV0JJVFMiLCJjcmVhdGVJbmZsYXRlUmF3IiwiemxpYkluZmxhdGVPcHRpb25zIiwib24iLCJpbmZsYXRlT25FcnJvciIsImluZmxhdGVPbkRhdGEiLCJ3cml0ZSIsImZsdXNoIiwiY3JlYXRlRGVmbGF0ZVJhdyIsInpsaWJEZWZsYXRlT3B0aW9ucyIsImRlZmxhdGVPbkRhdGEiLCJaX1NZTkNfRkxVU0giLCJjaHVuayIsIlJhbmdlRXJyb3IiLCJyZXNldCIsIldyaXRhYmxlIiwiaXNWYWxpZFN0YXR1c0NvZGUiLCJpc1ZhbGlkVVRGOCIsIkdFVF9JTkZPIiwiR0VUX1BBWUxPQURfTEVOR1RIXzE2IiwiR0VUX1BBWUxPQURfTEVOR1RIXzY0IiwiR0VUX01BU0siLCJHRVRfREFUQSIsIklORkxBVElORyIsImJpbmFyeVR5cGUiLCJfYmluYXJ5VHlwZSIsIl9leHRlbnNpb25zIiwiX2J1ZmZlcmVkQnl0ZXMiLCJfYnVmZmVycyIsIl9jb21wcmVzc2VkIiwiX3BheWxvYWRMZW5ndGgiLCJfZnJhZ21lbnRlZCIsIl9tYXNrZWQiLCJfZmluIiwiX29wY29kZSIsIl90b3RhbFBheWxvYWRMZW5ndGgiLCJfbWVzc2FnZUxlbmd0aCIsIl9mcmFnbWVudHMiLCJfc3RhdGUiLCJfbG9vcCIsIl93cml0ZSIsImVuY29kaW5nIiwiY2IiLCJzdGFydExvb3AiLCJjb25zdW1lIiwibiIsImRzdCIsIlVpbnQ4QXJyYXkiLCJnZXRJbmZvIiwiZ2V0UGF5bG9hZExlbmd0aDE2IiwiZ2V0UGF5bG9hZExlbmd0aDY0IiwiZ2V0TWFzayIsImdldERhdGEiLCJjb21wcmVzc2VkIiwiaGF2ZUxlbmd0aCIsInJlYWRVSW50MTZCRSIsInJlYWRVSW50MzJCRSIsIk1hdGgiLCJwb3ciLCJjb250cm9sTWVzc2FnZSIsImRhdGFNZXNzYWdlIiwicGVyTWVzc2FnZURlZmxhdGUiLCJlciIsIm1lc3NhZ2VMZW5ndGgiLCJmcmFnbWVudHMiLCJlbWl0IiwidG9TdHJpbmciLCJFcnJvckN0b3IiLCJwcmVmaXgiLCJzdGF0dXNDb2RlIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJyYW5kb21GaWxsU3luYyIsImFwcGx5TWFzayIsInNvY2tldCIsIl9zb2NrZXQiLCJfZmlyc3RGcmFnbWVudCIsIl9kZWZsYXRpbmciLCJfcXVldWUiLCJmcmFtZSIsIm1lcmdlIiwicGF5bG9hZExlbmd0aCIsIm9wY29kZSIsInJzdjEiLCJ3cml0ZVVJbnQxNkJFIiwid3JpdGVVSW50MzJCRSIsImVucXVldWUiLCJkb0Nsb3NlIiwic2VuZEZyYW1lIiwicGluZyIsImRvUGluZyIsInBvbmciLCJkb1BvbmciLCJzZW5kIiwiYmluYXJ5IiwiZGlzcGF0Y2giLCJfIiwiZGVzdHJveWVkIiwiZGVxdWV1ZSIsIlJlZmxlY3QiLCJhcHBseSIsImNvcmsiLCJ1bmNvcmsiLCJEdXBsZXgiLCJlbWl0Q2xvc2UiLCJzdHJlYW0iLCJkdXBsZXhPbkVuZCIsIl93cml0YWJsZVN0YXRlIiwiZmluaXNoZWQiLCJkZXN0cm95IiwiZHVwbGV4T25FcnJvciIsImxpc3RlbmVyQ291bnQiLCJ3cyIsInJlc3VtZU9uUmVjZWl2ZXJEcmFpbiIsInJlY2VpdmVyT25EcmFpbiIsInJlc3VtZSIsInJlYWR5U3RhdGUiLCJDT05ORUNUSU5HIiwib3BlbiIsIl9yZWNlaXZlciIsInJlbW92ZUFsbExpc3RlbmVycyIsImR1cGxleCIsImF1dG9EZXN0cm95Iiwib2JqZWN0TW9kZSIsIndyaXRhYmxlT2JqZWN0TW9kZSIsIm1zZyIsInBhdXNlIiwiX2Rlc3Ryb3kiLCJDTE9TRUQiLCJwcm9jZXNzIiwibmV4dFRpY2siLCJjYWxsZWQiLCJ0ZXJtaW5hdGUiLCJfZmluYWwiLCJfcmVhZGFibGVTdGF0ZSIsImVuZEVtaXR0ZWQiLCJmaW5pc2giLCJfcmVhZCIsIk9QRU4iLCJuZWVkRHJhaW4iLCJWYWxpZGF0aW9uIiwiRXZlbnRFbWl0dGVyIiwiY3JlYXRlSGFzaCIsImNyZWF0ZVNlcnZlciIsIlNUQVRVU19DT0RFUyIsImtleVJlZ2V4IiwiV2ViU29ja2V0U2VydmVyIiwiaGFuZGxlUHJvdG9jb2xzIiwiY2xpZW50VHJhY2tpbmciLCJ2ZXJpZnlDbGllbnQiLCJub1NlcnZlciIsImJhY2tsb2ciLCJzZXJ2ZXIiLCJob3N0IiwicGF0aCIsInBvcnQiLCJfc2VydmVyIiwicmVxIiwicmVzIiwiYm9keSIsIndyaXRlSGVhZCIsImxpc3RlbiIsIl9yZW1vdmVMaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lcnMiLCJsaXN0ZW5pbmciLCJiaW5kIiwidXBncmFkZSIsImhlYWQiLCJoYW5kbGVVcGdyYWRlIiwiY2xpZW50cyIsIlNldCIsImFkZHJlc3MiLCJjbGllbnQiLCJzaG91bGRIYW5kbGUiLCJpbmRleCIsInVybCIsImluZGV4T2YiLCJwYXRobmFtZSIsInNvY2tldE9uRXJyb3IiLCJoZWFkZXJzIiwidHJpbSIsInZlcnNpb24iLCJ0b0xvd2VyQ2FzZSIsInRlc3QiLCJhYm9ydEhhbmRzaGFrZSIsImluZm8iLCJvcmlnaW4iLCJzZWN1cmUiLCJjb25uZWN0aW9uIiwiYXV0aG9yaXplZCIsImVuY3J5cHRlZCIsInZlcmlmaWVkIiwiY29tcGxldGVVcGdyYWRlIiwicmVhZGFibGUiLCJ3cml0YWJsZSIsImRpZ2VzdCIsInVwZGF0ZSIsInByb3RvY29sIiwic3BsaXQiLCJzZXRTb2NrZXQiLCJkZWxldGUiLCJldmVudCIsInJlbW92ZUxpc3RlbmVycyIsIkNvbm5lY3Rpb24iLCJoIiwiaHR0cHMiLCJodHRwIiwibmV0IiwidGxzIiwicmFuZG9tQnl0ZXMiLCJVUkwiLCJyZWFkeVN0YXRlcyIsInByb3RvY29sVmVyc2lvbnMiLCJjbG9zZVRpbWVvdXQiLCJwcm90b2NvbHMiLCJfY2xvc2VNZXNzYWdlIiwiX2Nsb3NlVGltZXIiLCJfY2xvc2VDb2RlIiwiX3NlbmRlciIsIl9idWZmZXJlZEFtb3VudCIsIl9yZWRpcmVjdHMiLCJpbml0QXNDbGllbnQiLCJDTE9TSU5HIiwiaW5jbHVkZXMiLCJidWZmZXJlZEFtb3VudCIsImJ1ZmZlclNpemUiLCJyZWNlaXZlciIsInJlY2VpdmVyT25Db25jbHVkZSIsInJlY2VpdmVyT25FcnJvciIsInJlY2VpdmVyT25NZXNzYWdlIiwicmVjZWl2ZXJPblBpbmciLCJyZWNlaXZlck9uUG9uZyIsInNldFRpbWVvdXQiLCJzZXROb0RlbGF5IiwidW5zaGlmdCIsInNvY2tldE9uQ2xvc2UiLCJzb2NrZXRPbkRhdGEiLCJzb2NrZXRPbkVuZCIsIl9yZXEiLCJzZW5kQWZ0ZXJDbG9zZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0Iiwid2Vic29ja2V0IiwicHJvdG9jb2xWZXJzaW9uIiwiZm9sbG93UmVkaXJlY3RzIiwibWF4UmVkaXJlY3RzIiwiY3JlYXRlQ29ubmVjdGlvbiIsInNvY2tldFBhdGgiLCJob3N0bmFtZSIsInRpbWVvdXQiLCJwYXJzZWRVcmwiLCJocmVmIiwiaXNVbml4U29ja2V0IiwiaXNTZWN1cmUiLCJkZWZhdWx0UG9ydCIsInRsc0Nvbm5lY3QiLCJuZXRDb25uZWN0Iiwic3RhcnRzV2l0aCIsIlVwZ3JhZGUiLCJzZWFyY2giLCJoYW5kc2hha2VUaW1lb3V0IiwiT3JpZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJwYXJ0cyIsImFib3J0ZWQiLCJsb2NhdGlvbiIsImFib3J0IiwiYWRkciIsInNlcnZlclByb3QiLCJwcm90TGlzdCIsInByb3RFcnJvciIsImNvbm5lY3QiLCJzZXJ2ZXJuYW1lIiwic2V0SGVhZGVyIiwicmVjZWl2ZXJPbkZpbmlzaCIsInJlYWQiLCJjbGVhclRpbWVvdXQiLCJlcnJvckVtaXR0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWIsTUFBTUEsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLDJEQUFELENBQXpCOztBQUVBRCxTQUFTLENBQUNFLHFCQUFWLEdBQWtDRCxtQkFBTyxDQUFDLHFEQUFELENBQXpDO0FBQ0FELFNBQVMsQ0FBQ0csTUFBVixHQUFtQkYsbUJBQU8sQ0FBQyx5RUFBRCxDQUExQjtBQUNBRCxTQUFTLENBQUNJLFFBQVYsR0FBcUJILG1CQUFPLENBQUMseURBQUQsQ0FBNUI7QUFDQUQs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QUFDNUgsU0FBVixDQUFvQm5ILEVBQXBCLENBQXVCLFFBQXZCLEVBQWlDaVIsZ0JBQWpDO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7OztBQU1BLFNBQVN6QyxZQUFULENBQXNCL04sS0FBdEIsRUFBNkI7QUFDM0IsTUFBSSxDQUFDLEtBQUtsSixVQUFMLEVBQWlCNFAsU0FBakIsQ0FBMkJoSCxLQUEzQixDQUFpQ00sS0FBakMsQ0FBTCxFQUE4QztBQUM1QyxTQUFLaUgsS0FBTDtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OztBQUtBLFNBQVMrRyxXQUFULEdBQXVCO0FBQ3JCLFFBQU1NLFNBQVMsR0FBRyxLQUFLeFgsVUFBTCxDQUFsQjtBQUVBd1gsV0FBUyxDQUFDL0gsVUFBVixHQUF1QnZTLFNBQVMsQ0FBQ2laLE9BQWpDOztBQUNBcUIsV0FBUyxDQUFDNUgsU0FBVixDQUFvQjFNLEdBQXBCOztBQUNBLE9BQUtBLEdBQUw7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU3FRLGFBQVQsR0FBeUI7QUFDdkIsUUFBTWlFLFNBQVMsR0FBRyxLQUFLeFgsVUFBTCxDQUFsQjtBQUVBLE9BQUsrQixjQUFMLENBQW9CLE9BQXBCLEVBQTZCd1IsYUFBN0I7QUFDQSxPQUFLOUssRUFBTCxDQUFRLE9BQVIsRUFBaUJ2SSxJQUFqQjs7QUFFQSxNQUFJc1gsU0FBSixFQUFlO0FBQ2JBLGFBQVMsQ0FBQy9ILFVBQVYsR0FBdUJ2UyxTQUFTLENBQUNpWixPQUFqQztBQUNBLFNBQUtqSCxPQUFMO0FBQ0Q7QUFDRixDIiwiZmlsZSI6IjAuc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBXZWJTb2NrZXQgPSByZXF1aXJlKCcuL2xpYi93ZWJzb2NrZXQnKTtcblxuV2ViU29ja2V0LmNyZWF0ZVdlYlNvY2tldFN0cmVhbSA9IHJlcXVpcmUoJy4vbGliL3N0cmVhbScpO1xuV2ViU29ja2V0LlNlcnZlciA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldC1zZXJ2ZXInKTtcbldlYlNvY2tldC5SZWNlaXZlciA9IHJlcXVpcmUoJy4vbGliL3JlY2VpdmVyJyk7XG5XZWJTb2NrZXQuU2VuZGVyID0gcmVxdWlyZSgnLi9saWIvc2VuZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IEVNUFRZX0JVRkZFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuLyoqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2YgYnVmZmVycyBpbnRvIGEgbmV3IGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcltdfSBsaXN0IFRoZSBhcnJheSBvZiBidWZmZXJzIHRvIGNvbmNhdFxuICogQHBhcmFtIHtOdW1iZXJ9IHRvdGFsTGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggb2YgYnVmZmVycyBpbiB0aGUgbGlzdFxuICogQHJldHVybiB7QnVmZmVyfSBUaGUgcmVzdWx0aW5nIGJ1ZmZlclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBjb25jYXQobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gRU1QVFlfQlVGRkVSO1xuICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVybiBsaXN0WzBdO1xuXG4gIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSh0b3RhbExlbmd0aCk7XG4gIGxldCBvZmZzZXQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1ZiA9IGxpc3RbaV07XG4gICAgdGFyZ2V0LnNldChidWYsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IGJ1Zi5sZW5ndGg7XG4gIH1cblxuICBpZiAob2Zmc2V0IDwgdG90YWxMZW5ndGgpIHJldHVybiB0YXJnZXQuc2xpY2UoMCwgb2Zmc2V0KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIE1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBzb3VyY2UgVGhlIGJ1ZmZlciB0byBtYXNrXG4gKiBAcGFyYW0ge0J1ZmZlcn0gbWFzayBUaGUgbWFzayB0byB1c2VcbiAqIEBwYXJhbSB7QnVmZmVyfSBvdXRwdXQgVGhlIGJ1ZmZlciB3aGVyZSB0byBzdG9yZSB0aGUgcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgYXQgd2hpY2ggdG8gc3RhcnQgd3JpdGluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgbnVtYmVyIG9mIGJ5dGVzIHRvIG1hc2suXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF9tYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0W29mZnNldCArIGldID0gc291cmNlW2ldIF4gbWFza1tpICYgM107XG4gIH1cbn1cblxuLyoqXG4gKiBVbm1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byB1bm1hc2tcbiAqIEBwYXJhbSB7QnVmZmVyfSBtYXNrIFRoZSBtYXNrIHRvIHVzZVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBfdW5tYXNrKGJ1ZmZlciwgbWFzaykge1xuICAvLyBSZXF1aXJlZCB1bnRpbCBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzkwMDYgaXMgcmVzb2x2ZWQuXG4gIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBidWZmZXJbaV0gXj0gbWFza1tpICYgM107XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGJ1ZmZlciB0byBhbiBgQXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWYgVGhlIGJ1ZmZlciB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gQ29udmVydGVkIGJ1ZmZlclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b0FycmF5QnVmZmVyKGJ1Zikge1xuICBpZiAoYnVmLmJ5dGVMZW5ndGggPT09IGJ1Zi5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBidWYuYnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmJ5dGVMZW5ndGgpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBkYXRhYCB0byBhIGBCdWZmZXJgLlxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSBidWZmZXJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9CdWZmZXIoZGF0YSkge1xuICB0b0J1ZmZlci5yZWFkT25seSA9IHRydWU7XG5cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgcmV0dXJuIGRhdGE7XG5cbiAgbGV0IGJ1ZjtcblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgYnVmID0gQnVmZmVyLmZyb20oZGF0YSk7XG4gIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpKSB7XG4gICAgYnVmID0gQnVmZmVyLmZyb20oZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBCdWZmZXIuZnJvbShkYXRhKTtcbiAgICB0b0J1ZmZlci5yZWFkT25seSA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxudHJ5IHtcbiAgY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJ2J1ZmZlcnV0aWwnKTtcbiAgY29uc3QgYnUgPSBidWZmZXJVdGlsLkJ1ZmZlclV0aWwgfHwgYnVmZmVyVXRpbDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb25jYXQsXG4gICAgbWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgIGlmIChsZW5ndGggPCA0OCkgX21hc2soc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGVsc2UgYnUubWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgIH0sXG4gICAgdG9BcnJheUJ1ZmZlcixcbiAgICB0b0J1ZmZlcixcbiAgICB1bm1hc2soYnVmZmVyLCBtYXNrKSB7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA8IDMyKSBfdW5tYXNrKGJ1ZmZlciwgbWFzayk7XG4gICAgICBlbHNlIGJ1LnVubWFzayhidWZmZXIsIG1hc2spO1xuICAgIH1cbiAgfTtcbn0gY2F0Y2ggKGUpIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29uY2F0LFxuICAgIG1hc2s6IF9tYXNrLFxuICAgIHRvQXJyYXlCdWZmZXIsXG4gICAgdG9CdWZmZXIsXG4gICAgdW5tYXNrOiBfdW5tYXNrXG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCSU5BUllfVFlQRVM6IFsnbm9kZWJ1ZmZlcicsICdhcnJheWJ1ZmZlcicsICdmcmFnbWVudHMnXSxcbiAgR1VJRDogJzI1OEVBRkE1LUU5MTQtNDdEQS05NUNBLUM1QUIwREM4NUIxMScsXG4gIGtTdGF0dXNDb2RlOiBTeW1ib2woJ3N0YXR1cy1jb2RlJyksXG4gIGtXZWJTb2NrZXQ6IFN5bWJvbCgnd2Vic29ja2V0JyksXG4gIEVNUFRZX0JVRkZFUjogQnVmZmVyLmFsbG9jKDApLFxuICBOT09QOiAoKSA9PiB7fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBFdmVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhcyBkaXNwYXRjaGVkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlLCB0YXJnZXQpIHtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbWVzc2FnZSBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgTWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBNZXNzYWdlRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0geyhTdHJpbmd8QnVmZmVyfEFycmF5QnVmZmVyfEJ1ZmZlcltdKX0gZGF0YSBUaGUgcmVjZWl2ZWQgZGF0YVxuICAgKiBAcGFyYW0ge1dlYlNvY2tldH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhcyBkaXNwYXRjaGVkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhLCB0YXJnZXQpIHtcbiAgICBzdXBlcignbWVzc2FnZScsIHRhcmdldCk7XG5cbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgY2xvc2UgZXZlbnQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIENsb3NlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYENsb3NlRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29kZSBUaGUgc3RhdHVzIGNvZGUgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgYmVpbmcgY2xvc2VkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZ1xuICAgKiBAcGFyYW0ge1dlYlNvY2tldH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhcyBkaXNwYXRjaGVkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb2RlLCByZWFzb24sIHRhcmdldCkge1xuICAgIHN1cGVyKCdjbG9zZScsIHRhcmdldCk7XG5cbiAgICB0aGlzLndhc0NsZWFuID0gdGFyZ2V0Ll9jbG9zZUZyYW1lUmVjZWl2ZWQgJiYgdGFyZ2V0Ll9jbG9zZUZyYW1lU2VudDtcbiAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIG9wZW4gZXZlbnQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIE9wZW5FdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgT3BlbkV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IHRhcmdldCBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRoZSBldmVudCB3YXMgZGlzcGF0Y2hlZFxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0KSB7XG4gICAgc3VwZXIoJ29wZW4nLCB0YXJnZXQpO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVycm9yIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBFcnJvckV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBFcnJvckV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVycm9yIFRoZSBlcnJvciB0aGF0IGdlbmVyYXRlZCB0aGlzIGV2ZW50XG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSB0YXJnZXQgQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVycm9yLCB0YXJnZXQpIHtcbiAgICBzdXBlcignZXJyb3InLCB0YXJnZXQpO1xuXG4gICAgdGhpcy5tZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIHByb3ZpZGVzIG1ldGhvZHMgZm9yIGVtdWxhdGluZyB0aGUgYEV2ZW50VGFyZ2V0YCBpbnRlcmZhY2UuIEl0J3Mgbm90XG4gKiBtZWFudCB0byBiZSB1c2VkIGRpcmVjdGx5LlxuICpcbiAqIEBtaXhpblxuICovXG5jb25zdCBFdmVudFRhcmdldCA9IHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gYWRkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllcyBjaGFyYWN0ZXJpc3RpY3MgYWJvdXRcbiAgICogICAgIHRoZSBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMub25jZSBBIGBCb29sZWFuYGAgaW5kaWNhdGluZyB0aGF0IHRoZSBsaXN0ZW5lclxuICAgKiAgICAgc2hvdWxkIGJlIGludm9rZWQgYXQgbW9zdCBvbmNlIGFmdGVyIGJlaW5nIGFkZGVkLiBJZiBgdHJ1ZWAsIHRoZVxuICAgKiAgICAgbGlzdGVuZXIgd291bGQgYmUgYXV0b21hdGljYWxseSByZW1vdmVkIHdoZW4gaW52b2tlZC5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcblxuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShkYXRhKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIG5ldyBNZXNzYWdlRXZlbnQoZGF0YSwgdGhpcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xvc2UoY29kZSwgbWVzc2FnZSkge1xuICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBuZXcgQ2xvc2VFdmVudChjb2RlLCBtZXNzYWdlLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBuZXcgRXJyb3JFdmVudChlcnJvciwgdGhpcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlbigpIHtcbiAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgbmV3IE9wZW5FdmVudCh0aGlzKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0aG9kID0gb3B0aW9ucyAmJiBvcHRpb25zLm9uY2UgPyAnb25jZScgOiAnb24nO1xuXG4gICAgaWYgKHR5cGUgPT09ICdtZXNzYWdlJykge1xuICAgICAgb25NZXNzYWdlLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIG9uTWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICBvbkNsb3NlLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIG9uQ2xvc2UpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgb25FcnJvci5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgIHRoaXNbbWV0aG9kXSh0eXBlLCBvbkVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvcGVuJykge1xuICAgICAgb25PcGVuLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIG9uT3Blbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNbbWV0aG9kXSh0eXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIHJlbW92ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnModHlwZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdGVuZXJzW2ldLl9saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFRhcmdldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9cbi8vIEFsbG93ZWQgdG9rZW4gY2hhcmFjdGVyczpcbi8vXG4vLyAnIScsICcjJywgJyQnLCAnJScsICcmJywgJycnLCAnKicsICcrJywgJy0nLFxuLy8gJy4nLCAwLTksIEEtWiwgJ14nLCAnXycsICdgJywgYS16LCAnfCcsICd+J1xuLy9cbi8vIHRva2VuQ2hhcnNbMzJdID09PSAwIC8vICcgJ1xuLy8gdG9rZW5DaGFyc1szM10gPT09IDEgLy8gJyEnXG4vLyB0b2tlbkNoYXJzWzM0XSA9PT0gMCAvLyAnXCInXG4vLyAuLi5cbi8vXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IHRva2VuQ2hhcnMgPSBbXG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDAgLSAxNVxuICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyAxNiAtIDMxXG4gIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDEsIDAsIC8vIDMyIC0gNDdcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gNDggLSA2M1xuICAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAvLyA2NCAtIDc5XG4gIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDEsIDEsIC8vIDgwIC0gOTVcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgLy8gOTYgLSAxMTFcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCAvLyAxMTIgLSAxMjdcbl07XG5cbi8qKlxuICogQWRkcyBhbiBvZmZlciB0byB0aGUgbWFwIG9mIGV4dGVuc2lvbiBvZmZlcnMgb3IgYSBwYXJhbWV0ZXIgdG8gdGhlIG1hcCBvZlxuICogcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdCBUaGUgbWFwIG9mIGV4dGVuc2lvbiBvZmZlcnMgb3IgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIGV4dGVuc2lvbiBvciBwYXJhbWV0ZXIgbmFtZVxuICogQHBhcmFtIHsoT2JqZWN0fEJvb2xlYW58U3RyaW5nKX0gZWxlbSBUaGUgZXh0ZW5zaW9uIHBhcmFtZXRlcnMgb3IgdGhlXG4gKiAgICAgcGFyYW1ldGVyIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwdXNoKGRlc3QsIG5hbWUsIGVsZW0pIHtcbiAgaWYgKGRlc3RbbmFtZV0gPT09IHVuZGVmaW5lZCkgZGVzdFtuYW1lXSA9IFtlbGVtXTtcbiAgZWxzZSBkZXN0W25hbWVdLnB1c2goZWxlbSk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zYCBoZWFkZXIgaW50byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBUaGUgZmllbGQgdmFsdWUgb2YgdGhlIGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcGFyc2VkIG9iamVjdFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBwYXJzZShoZWFkZXIpIHtcbiAgY29uc3Qgb2ZmZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBpZiAoaGVhZGVyID09PSB1bmRlZmluZWQgfHwgaGVhZGVyID09PSAnJykgcmV0dXJuIG9mZmVycztcblxuICBsZXQgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgbGV0IG11c3RVbmVzY2FwZSA9IGZhbHNlO1xuICBsZXQgaXNFc2NhcGluZyA9IGZhbHNlO1xuICBsZXQgaW5RdW90ZXMgPSBmYWxzZTtcbiAgbGV0IGV4dGVuc2lvbk5hbWU7XG4gIGxldCBwYXJhbU5hbWU7XG4gIGxldCBzdGFydCA9IC0xO1xuICBsZXQgZW5kID0gLTE7XG4gIGxldCBpID0gMDtcblxuICBmb3IgKDsgaSA8IGhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvZGUgPSBoZWFkZXIuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChleHRlbnNpb25OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIwIC8qICcgJyAqLyB8fCBjb2RlID09PSAweDA5IC8qICdcXHQnICovKSB7XG4gICAgICAgIGlmIChlbmQgPT09IC0xICYmIHN0YXJ0ICE9PSAtMSkgZW5kID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgzYiAvKiAnOycgKi8gfHwgY29kZSA9PT0gMHgyYyAvKiAnLCcgKi8pIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIGlmIChjb2RlID09PSAweDJjKSB7XG4gICAgICAgICAgcHVzaChvZmZlcnMsIG5hbWUsIHBhcmFtcyk7XG4gICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHRlbnNpb25OYW1lID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcmFtTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZW5kID09PSAtMSAmJiB0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMCB8fCBjb2RlID09PSAweDA5KSB7XG4gICAgICAgIGlmIChlbmQgPT09IC0xICYmIHN0YXJ0ICE9PSAtMSkgZW5kID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgzYiB8fCBjb2RlID09PSAweDJjKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICAgICAgICBwdXNoKHBhcmFtcywgaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpLCB0cnVlKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgICBwdXNoKG9mZmVycywgZXh0ZW5zaW9uTmFtZSwgcGFyYW1zKTtcbiAgICAgICAgICBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGV4dGVuc2lvbk5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNkIC8qICc9JyAqLyAmJiBzdGFydCAhPT0gLTEgJiYgZW5kID09PSAtMSkge1xuICAgICAgICBwYXJhbU5hbWUgPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGkpO1xuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyBUaGUgdmFsdWUgb2YgYSBxdW90ZWQtc3RyaW5nIGFmdGVyIHVuZXNjYXBpbmcgbXVzdCBjb25mb3JtIHRvIHRoZVxuICAgICAgLy8gdG9rZW4gQUJORiwgc28gb25seSB0b2tlbiBjaGFyYWN0ZXJzIGFyZSB2YWxpZC5cbiAgICAgIC8vIFJlZjogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY0NTUjc2VjdGlvbi05LjFcbiAgICAgIC8vXG4gICAgICBpZiAoaXNFc2NhcGluZykge1xuICAgICAgICBpZiAodG9rZW5DaGFyc1tjb2RlXSAhPT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICAgICAgZWxzZSBpZiAoIW11c3RVbmVzY2FwZSkgbXVzdFVuZXNjYXBlID0gdHJ1ZTtcbiAgICAgICAgaXNFc2NhcGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChpblF1b3Rlcykge1xuICAgICAgICBpZiAodG9rZW5DaGFyc1tjb2RlXSA9PT0gMSkge1xuICAgICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIyIC8qICdcIicgKi8gJiYgc3RhcnQgIT09IC0xKSB7XG4gICAgICAgICAgaW5RdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4NWMgLyogJ1xcJyAqLykge1xuICAgICAgICAgIGlzRXNjYXBpbmcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIgJiYgaGVhZGVyLmNoYXJDb2RlQXQoaSAtIDEpID09PSAweDNkKSB7XG4gICAgICAgIGluUXVvdGVzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSAmJiB0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnQgIT09IC0xICYmIChjb2RlID09PSAweDIwIHx8IGNvZGUgPT09IDB4MDkpKSB7XG4gICAgICAgIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIHx8IGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgaWYgKG11c3RVbmVzY2FwZSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgICAgICAgbXVzdFVuZXNjYXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaChwYXJhbXMsIHBhcmFtTmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMHgyYykge1xuICAgICAgICAgIHB1c2gob2ZmZXJzLCBleHRlbnNpb25OYW1lLCBwYXJhbXMpO1xuICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZXh0ZW5zaW9uTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gLTEgfHwgaW5RdW90ZXMpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIGlucHV0Jyk7XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgY29uc3QgdG9rZW4gPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIGlmIChleHRlbnNpb25OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICBwdXNoKG9mZmVycywgdG9rZW4sIHBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwdXNoKHBhcmFtcywgdG9rZW4sIHRydWUpO1xuICAgIH0gZWxzZSBpZiAobXVzdFVuZXNjYXBlKSB7XG4gICAgICBwdXNoKHBhcmFtcywgcGFyYW1OYW1lLCB0b2tlbi5yZXBsYWNlKC9cXFxcL2csICcnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHRva2VuKTtcbiAgICB9XG4gICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gIH1cblxuICByZXR1cm4gb2ZmZXJzO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgYFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9uc2AgaGVhZGVyIGZpZWxkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIFRoZSBtYXAgb2YgZXh0ZW5zaW9ucyBhbmQgcGFyYW1ldGVycyB0byBmb3JtYXRcbiAqIEByZXR1cm4ge1N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZm9ybWF0KGV4dGVuc2lvbnMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGV4dGVuc2lvbnMpXG4gICAgLm1hcCgoZXh0ZW5zaW9uKSA9PiB7XG4gICAgICBsZXQgY29uZmlndXJhdGlvbnMgPSBleHRlbnNpb25zW2V4dGVuc2lvbl07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29uZmlndXJhdGlvbnMpKSBjb25maWd1cmF0aW9ucyA9IFtjb25maWd1cmF0aW9uc107XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbnNcbiAgICAgICAgLm1hcCgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtleHRlbnNpb25dXG4gICAgICAgICAgICAuY29uY2F0KFxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBwYXJhbXNba107XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgIC5tYXAoKHYpID0+ICh2ID09PSB0cnVlID8gayA6IGAke2t9PSR7dn1gKSlcbiAgICAgICAgICAgICAgICAgIC5qb2luKCc7ICcpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmpvaW4oJzsgJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcsICcpO1xuICAgIH0pXG4gICAgLmpvaW4oJywgJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBmb3JtYXQsIHBhcnNlIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGtEb25lID0gU3ltYm9sKCdrRG9uZScpO1xuY29uc3Qga1J1biA9IFN5bWJvbCgna1J1bicpO1xuXG4vKipcbiAqIEEgdmVyeSBzaW1wbGUgam9iIHF1ZXVlIHdpdGggYWRqdXN0YWJsZSBjb25jdXJyZW5jeS4gQWRhcHRlZCBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU1RSTUwvYXN5bmMtbGltaXRlclxuICovXG5jbGFzcyBMaW1pdGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYExpbWl0ZXJgLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29uY3VycmVuY3kgVGhlIG1heGltdW0gbnVtYmVyIG9mIGpvYnMgYWxsb3dlZCB0byBydW5cbiAgICogICAgIGNvbmN1cnJlbnRseVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uY3VycmVuY3kpIHtcbiAgICB0aGlzW2tEb25lXSA9ICgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZy0tO1xuICAgICAgdGhpc1trUnVuXSgpO1xuICAgIH07XG4gICAgdGhpcy5jb25jdXJyZW5jeSA9IGNvbmN1cnJlbmN5IHx8IEluZmluaXR5O1xuICAgIHRoaXMuam9icyA9IFtdO1xuICAgIHRoaXMucGVuZGluZyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGpvYiB0byB0aGUgcXVldWUuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZChqb2IpIHtcbiAgICB0aGlzLmpvYnMucHVzaChqb2IpO1xuICAgIHRoaXNba1J1bl0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgam9iIGZyb20gdGhlIHF1ZXVlIGFuZCBydW5zIGl0IGlmIHBvc3NpYmxlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgW2tSdW5dKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IHRoaXMuY29uY3VycmVuY3kpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmpvYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBqb2IgPSB0aGlzLmpvYnMuc2hpZnQoKTtcblxuICAgICAgdGhpcy5wZW5kaW5nKys7XG4gICAgICBqb2IodGhpc1trRG9uZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpbWl0ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHpsaWIgPSByZXF1aXJlKCd6bGliJyk7XG5cbmNvbnN0IGJ1ZmZlclV0aWwgPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5jb25zdCBMaW1pdGVyID0gcmVxdWlyZSgnLi9saW1pdGVyJyk7XG5jb25zdCB7IGtTdGF0dXNDb2RlLCBOT09QIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBUUkFJTEVSID0gQnVmZmVyLmZyb20oWzB4MDAsIDB4MDAsIDB4ZmYsIDB4ZmZdKTtcbmNvbnN0IGtQZXJNZXNzYWdlRGVmbGF0ZSA9IFN5bWJvbCgncGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCBrVG90YWxMZW5ndGggPSBTeW1ib2woJ3RvdGFsLWxlbmd0aCcpO1xuY29uc3Qga0NhbGxiYWNrID0gU3ltYm9sKCdjYWxsYmFjaycpO1xuY29uc3Qga0J1ZmZlcnMgPSBTeW1ib2woJ2J1ZmZlcnMnKTtcbmNvbnN0IGtFcnJvciA9IFN5bWJvbCgnZXJyb3InKTtcblxuLy9cbi8vIFdlIGxpbWl0IHpsaWIgY29uY3VycmVuY3ksIHdoaWNoIHByZXZlbnRzIHNldmVyZSBtZW1vcnkgZnJhZ21lbnRhdGlvblxuLy8gYXMgZG9jdW1lbnRlZCBpbiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzg4NzEjaXNzdWVjb21tZW50LTI1MDkxNTkxM1xuLy8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJzb2NrZXRzL3dzL2lzc3Vlcy8xMjAyXG4vL1xuLy8gSW50ZW50aW9uYWxseSBnbG9iYWw7IGl0J3MgdGhlIGdsb2JhbCB0aHJlYWQgcG9vbCB0aGF0J3MgYW4gaXNzdWUuXG4vL1xubGV0IHpsaWJMaW1pdGVyO1xuXG4vKipcbiAqIHBlcm1lc3NhZ2UtZGVmbGF0ZSBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgUGVyTWVzc2FnZURlZmxhdGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIFBlck1lc3NhZ2VEZWZsYXRlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnNlcnZlck5vQ29udGV4dFRha2VvdmVyIFJlcXVlc3QvYWNjZXB0IGRpc2FibGluZ1xuICAgKiAgICAgb2Ygc2VydmVyIGNvbnRleHQgdGFrZW92ZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmNsaWVudE5vQ29udGV4dFRha2VvdmVyIEFkdmVydGlzZS9hY2tub3dsZWRnZVxuICAgKiAgICAgZGlzYWJsaW5nIG9mIGNsaWVudCBjb250ZXh0IHRha2VvdmVyXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TnVtYmVyKX0gb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzIFJlcXVlc3QvY29uZmlybSB0aGVcbiAgICogICAgIHVzZSBvZiBhIGN1c3RvbSBzZXJ2ZXIgd2luZG93IHNpemVcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxOdW1iZXIpfSBvcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgQWR2ZXJ0aXNlIHN1cHBvcnRcbiAgICogICAgIGZvciwgb3IgcmVxdWVzdCwgYSBjdXN0b20gY2xpZW50IHdpbmRvdyBzaXplXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnpsaWJEZWZsYXRlT3B0aW9ucyBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvbiBkZWZsYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnpsaWJJbmZsYXRlT3B0aW9ucyBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvbiBpbmZsYXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnRocmVzaG9sZCBTaXplIChpbiBieXRlcykgYmVsb3cgd2hpY2ggbWVzc2FnZXNcbiAgICogICAgIHNob3VsZCBub3QgYmUgY29tcHJlc3NlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0IFRoZSBudW1iZXIgb2YgY29uY3VycmVudCBjYWxscyB0b1xuICAgKiAgICAgemxpYlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2VydmVyIENyZWF0ZSB0aGUgaW5zdGFuY2UgaW4gZWl0aGVyIHNlcnZlciBvciBjbGllbnRcbiAgICogICAgIG1vZGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFBheWxvYWQgVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgaXNTZXJ2ZXIsIG1heFBheWxvYWQpIHtcbiAgICB0aGlzLl9tYXhQYXlsb2FkID0gbWF4UGF5bG9hZCB8IDA7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fdGhyZXNob2xkID1cbiAgICAgIHRoaXMuX29wdGlvbnMudGhyZXNob2xkICE9PSB1bmRlZmluZWQgPyB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCA6IDEwMjQ7XG4gICAgdGhpcy5faXNTZXJ2ZXIgPSAhIWlzU2VydmVyO1xuICAgIHRoaXMuX2RlZmxhdGUgPSBudWxsO1xuICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuXG4gICAgaWYgKCF6bGliTGltaXRlcikge1xuICAgICAgY29uc3QgY29uY3VycmVuY3kgPVxuICAgICAgICB0aGlzLl9vcHRpb25zLmNvbmN1cnJlbmN5TGltaXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0XG4gICAgICAgICAgOiAxMDtcbiAgICAgIHpsaWJMaW1pdGVyID0gbmV3IExpbWl0ZXIoY29uY3VycmVuY3kpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldCBleHRlbnNpb25OYW1lKCkge1xuICAgIHJldHVybiAncGVybWVzc2FnZS1kZWZsYXRlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEV4dGVuc2lvbiBwYXJhbWV0ZXJzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG9mZmVyKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIHBhcmFtcy5zZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zLmNsaWVudE5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzKSB7XG4gICAgICBwYXJhbXMuc2VydmVyX21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuc2VydmVyTWF4V2luZG93Qml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cykge1xuICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT0gbnVsbCkge1xuICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0IGFuIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlci9yZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gY29uZmlndXJhdGlvbnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnMvcmVwb25zZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWNjZXB0KGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgY29uZmlndXJhdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZVBhcmFtcyhjb25maWd1cmF0aW9ucyk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuX2lzU2VydmVyXG4gICAgICA/IHRoaXMuYWNjZXB0QXNTZXJ2ZXIoY29uZmlndXJhdGlvbnMpXG4gICAgICA6IHRoaXMuYWNjZXB0QXNDbGllbnQoY29uZmlndXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFsbCByZXNvdXJjZXMgdXNlZCBieSB0aGUgZXh0ZW5zaW9uLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjbGVhbnVwKCkge1xuICAgIGlmICh0aGlzLl9pbmZsYXRlKSB7XG4gICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmbGF0ZSkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja107XG5cbiAgICAgIHRoaXMuX2RlZmxhdGUuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2RlZmxhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1RoZSBkZWZsYXRlIHN0cmVhbSB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIHByb2Nlc3NlZCdcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBBY2NlcHQgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBvZmZlcnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnNcbiAgICogQHJldHVybiB7T2JqZWN0fSBBY2NlcHRlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY2NlcHRBc1NlcnZlcihvZmZlcnMpIHtcbiAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICBjb25zdCBhY2NlcHRlZCA9IG9mZmVycy5maW5kKChwYXJhbXMpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKG9wdHMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIgPT09IGZhbHNlICYmXG4gICAgICAgICAgcGFyYW1zLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyKSB8fFxuICAgICAgICAocGFyYW1zLnNlcnZlcl9tYXhfd2luZG93X2JpdHMgJiZcbiAgICAgICAgICAob3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID09PSBmYWxzZSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgIG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA+IHBhcmFtcy5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzKSkpIHx8XG4gICAgICAgICh0eXBlb2Ygb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICFwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cylcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFhY2NlcHRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb25lIG9mIHRoZSBleHRlbnNpb24gb2ZmZXJzIGNhbiBiZSBhY2NlcHRlZCcpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnNlcnZlck5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBhY2NlcHRlZC5zZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRzLmNsaWVudE5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBhY2NlcHRlZC5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJykge1xuICAgICAgYWNjZXB0ZWQuc2VydmVyX21heF93aW5kb3dfYml0cyA9IG9wdHMuc2VydmVyTWF4V2luZG93Qml0cztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInKSB7XG4gICAgICBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzID0gb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzID09PSB0cnVlIHx8XG4gICAgICBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBkZWxldGUgYWNjZXB0ZWQuY2xpZW50X21heF93aW5kb3dfYml0cztcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjZXB0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0IHRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHJlc3BvbnNlIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gcmVzcG9uc2VcbiAgICogQHJldHVybiB7T2JqZWN0fSBBY2NlcHRlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY2NlcHRBc0NsaWVudChyZXNwb25zZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHJlc3BvbnNlWzBdO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fb3B0aW9ucy5jbGllbnROb0NvbnRleHRUYWtlb3ZlciA9PT0gZmFsc2UgJiZcbiAgICAgIHBhcmFtcy5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlclxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHBhcmFtZXRlciBcImNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyXCInKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gZmFsc2UgfHxcbiAgICAgICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJyAmJlxuICAgICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA+IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VuZXhwZWN0ZWQgb3IgaW52YWxpZCBwYXJhbWV0ZXIgXCJjbGllbnRfbWF4X3dpbmRvd19iaXRzXCInXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvbmZpZ3VyYXRpb25zIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXJzL3JlcG9uc2VcbiAgICogQHJldHVybiB7QXJyYXl9IFRoZSBvZmZlcnMvcmVzcG9uc2Ugd2l0aCBub3JtYWxpemVkIHBhcmFtZXRlcnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG5vcm1hbGl6ZVBhcmFtcyhjb25maWd1cmF0aW9ucykge1xuICAgIGNvbmZpZ3VyYXRpb25zLmZvckVhY2goKHBhcmFtcykgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyYW1zW2tleV07XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcIiR7a2V5fVwiIG11c3QgaGF2ZSBvbmx5IGEgc2luZ2xlIHZhbHVlYCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHZhbHVlWzBdO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdjbGllbnRfbWF4X3dpbmRvd19iaXRzJykge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gK3ZhbHVlO1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG51bSkgfHwgbnVtIDwgOCB8fCBudW0gPiAxNSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IG51bTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1NlcnZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3NlcnZlcl9tYXhfd2luZG93X2JpdHMnKSB7XG4gICAgICAgICAgY29uc3QgbnVtID0gK3ZhbHVlO1xuICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihudW0pIHx8IG51bSA8IDggfHwgbnVtID4gMTUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG51bTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBrZXkgPT09ICdjbGllbnRfbm9fY29udGV4dF90YWtlb3ZlcicgfHxcbiAgICAgICAgICBrZXkgPT09ICdzZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlcidcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtZXRlciBcIiR7a2V5fVwiYCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29uZmlndXJhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzcyBkYXRhLiBDb25jdXJyZW5jeSBsaW1pdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBDb21wcmVzc2VkIGRhdGFcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZGVjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgemxpYkxpbWl0ZXIuYWRkKChkb25lKSA9PiB7XG4gICAgICB0aGlzLl9kZWNvbXByZXNzKGRhdGEsIGZpbiwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHJlc3MgZGF0YS4gQ29uY3VycmVuY3kgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgRGF0YSB0byBjb21wcmVzc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgemxpYkxpbWl0ZXIuYWRkKChkb25lKSA9PiB7XG4gICAgICB0aGlzLl9jb21wcmVzcyhkYXRhLCBmaW4sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29tcHJlc3MgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgQ29tcHJlc3NlZCBkYXRhXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGVjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLl9pc1NlcnZlciA/ICdjbGllbnQnIDogJ3NlcnZlcic7XG5cbiAgICBpZiAoIXRoaXMuX2luZmxhdGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGAke2VuZHBvaW50fV9tYXhfd2luZG93X2JpdHNgO1xuICAgICAgY29uc3Qgd2luZG93Qml0cyA9XG4gICAgICAgIHR5cGVvZiB0aGlzLnBhcmFtc1trZXldICE9PSAnbnVtYmVyJ1xuICAgICAgICAgID8gemxpYi5aX0RFRkFVTFRfV0lORE9XQklUU1xuICAgICAgICAgIDogdGhpcy5wYXJhbXNba2V5XTtcblxuICAgICAgdGhpcy5faW5mbGF0ZSA9IHpsaWIuY3JlYXRlSW5mbGF0ZVJhdyh7XG4gICAgICAgIC4uLnRoaXMuX29wdGlvbnMuemxpYkluZmxhdGVPcHRpb25zLFxuICAgICAgICB3aW5kb3dCaXRzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2luZmxhdGVba1Blck1lc3NhZ2VEZWZsYXRlXSA9IHRoaXM7XG4gICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10gPSBbXTtcbiAgICAgIHRoaXMuX2luZmxhdGUub24oJ2Vycm9yJywgaW5mbGF0ZU9uRXJyb3IpO1xuICAgICAgdGhpcy5faW5mbGF0ZS5vbignZGF0YScsIGluZmxhdGVPbkRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuX2luZmxhdGVba0NhbGxiYWNrXSA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5faW5mbGF0ZS53cml0ZShkYXRhKTtcbiAgICBpZiAoZmluKSB0aGlzLl9pbmZsYXRlLndyaXRlKFRSQUlMRVIpO1xuXG4gICAgdGhpcy5faW5mbGF0ZS5mbHVzaCgoKSA9PiB7XG4gICAgICBjb25zdCBlcnIgPSB0aGlzLl9pbmZsYXRlW2tFcnJvcl07XG5cbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhpcy5faW5mbGF0ZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYnVmZmVyVXRpbC5jb25jYXQoXG4gICAgICAgIHRoaXMuX2luZmxhdGVba0J1ZmZlcnNdLFxuICAgICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF1cbiAgICAgICk7XG5cbiAgICAgIGlmIChmaW4gJiYgdGhpcy5wYXJhbXNbYCR7ZW5kcG9pbnR9X25vX2NvbnRleHRfdGFrZW92ZXJgXSkge1xuICAgICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10gPSBbXTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHJlc3MgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgRGF0YSB0byBjb21wcmVzc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuX2lzU2VydmVyID8gJ3NlcnZlcicgOiAnY2xpZW50JztcblxuICAgIGlmICghdGhpcy5fZGVmbGF0ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYCR7ZW5kcG9pbnR9X21heF93aW5kb3dfYml0c2A7XG4gICAgICBjb25zdCB3aW5kb3dCaXRzID1cbiAgICAgICAgdHlwZW9mIHRoaXMucGFyYW1zW2tleV0gIT09ICdudW1iZXInXG4gICAgICAgICAgPyB6bGliLlpfREVGQVVMVF9XSU5ET1dCSVRTXG4gICAgICAgICAgOiB0aGlzLnBhcmFtc1trZXldO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlID0gemxpYi5jcmVhdGVEZWZsYXRlUmF3KHtcbiAgICAgICAgLi4udGhpcy5fb3B0aW9ucy56bGliRGVmbGF0ZU9wdGlvbnMsXG4gICAgICAgIHdpbmRvd0JpdHNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQnVmZmVyc10gPSBbXTtcblxuICAgICAgLy9cbiAgICAgIC8vIEFuIGAnZXJyb3InYCBldmVudCBpcyBlbWl0dGVkLCBvbmx5IG9uIE5vZGUuanMgPCAxMC4wLjAsIGlmIHRoZVxuICAgICAgLy8gYHpsaWIuRGVmbGF0ZVJhd2AgaW5zdGFuY2UgaXMgY2xvc2VkIHdoaWxlIGRhdGEgaXMgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBQZXJNZXNzYWdlRGVmbGF0ZSNjbGVhbnVwKClgIGlzIGNhbGxlZCBhdCB0aGUgd3JvbmdcbiAgICAgIC8vIHRpbWUgZHVlIHRvIGFuIGFibm9ybWFsIFdlYlNvY2tldCBjbG9zdXJlLlxuICAgICAgLy9cbiAgICAgIHRoaXMuX2RlZmxhdGUub24oJ2Vycm9yJywgTk9PUCk7XG4gICAgICB0aGlzLl9kZWZsYXRlLm9uKCdkYXRhJywgZGVmbGF0ZU9uRGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVmbGF0ZVtrQ2FsbGJhY2tdID0gY2FsbGJhY2s7XG5cbiAgICB0aGlzLl9kZWZsYXRlLndyaXRlKGRhdGEpO1xuICAgIHRoaXMuX2RlZmxhdGUuZmx1c2goemxpYi5aX1NZTkNfRkxVU0gsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fZGVmbGF0ZSkge1xuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgZGVmbGF0ZSBzdHJlYW0gd2FzIGNsb3NlZCB3aGlsZSBkYXRhIHdhcyBiZWluZyBwcm9jZXNzZWQuXG4gICAgICAgIC8vXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGEgPSBidWZmZXJVdGlsLmNvbmNhdChcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrQnVmZmVyc10sXG4gICAgICAgIHRoaXMuX2RlZmxhdGVba1RvdGFsTGVuZ3RoXVxuICAgICAgKTtcblxuICAgICAgaWYgKGZpbikgZGF0YSA9IGRhdGEuc2xpY2UoMCwgZGF0YS5sZW5ndGggLSA0KTtcblxuICAgICAgLy9cbiAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIG5vdCBiZSBjYWxsZWQgYWdhaW4gaW5cbiAgICAgIC8vIGBQZXJNZXNzYWdlRGVmbGF0ZSNjbGVhbnVwKClgLlxuICAgICAgLy9cbiAgICAgIHRoaXMuX2RlZmxhdGVba0NhbGxiYWNrXSA9IG51bGw7XG5cbiAgICAgIGlmIChmaW4gJiYgdGhpcy5wYXJhbXNbYCR7ZW5kcG9pbnR9X25vX2NvbnRleHRfdGFrZW92ZXJgXSkge1xuICAgICAgICB0aGlzLl9kZWZsYXRlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2RlZmxhdGUgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrQnVmZmVyc10gPSBbXTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQZXJNZXNzYWdlRGVmbGF0ZTtcblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkRlZmxhdGVSYXdgIHN0cmVhbSBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZsYXRlT25EYXRhKGNodW5rKSB7XG4gIHRoaXNba0J1ZmZlcnNdLnB1c2goY2h1bmspO1xuICB0aGlzW2tUb3RhbExlbmd0aF0gKz0gY2h1bmsubGVuZ3RoO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYHpsaWIuSW5mbGF0ZVJhd2Agc3RyZWFtIGAnZGF0YSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBBIGNodW5rIG9mIGRhdGFcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluZmxhdGVPbkRhdGEoY2h1bmspIHtcbiAgdGhpc1trVG90YWxMZW5ndGhdICs9IGNodW5rLmxlbmd0aDtcblxuICBpZiAoXG4gICAgdGhpc1trUGVyTWVzc2FnZURlZmxhdGVdLl9tYXhQYXlsb2FkIDwgMSB8fFxuICAgIHRoaXNba1RvdGFsTGVuZ3RoXSA8PSB0aGlzW2tQZXJNZXNzYWdlRGVmbGF0ZV0uX21heFBheWxvYWRcbiAgKSB7XG4gICAgdGhpc1trQnVmZmVyc10ucHVzaChjaHVuayk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpc1trRXJyb3JdID0gbmV3IFJhbmdlRXJyb3IoJ01heCBwYXlsb2FkIHNpemUgZXhjZWVkZWQnKTtcbiAgdGhpc1trRXJyb3JdW2tTdGF0dXNDb2RlXSA9IDEwMDk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBpbmZsYXRlT25EYXRhKTtcbiAgdGhpcy5yZXNldCgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYHpsaWIuSW5mbGF0ZVJhd2Agc3RyZWFtIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgVGhlIGVtaXR0ZWQgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluZmxhdGVPbkVycm9yKGVycikge1xuICAvL1xuICAvLyBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYFpsaWIjY2xvc2UoKWAgYXMgdGhlIGhhbmRsZSBpcyBhdXRvbWF0aWNhbGx5XG4gIC8vIGNsb3NlZCB3aGVuIGFuIGVycm9yIGlzIGVtaXR0ZWQuXG4gIC8vXG4gIHRoaXNba1Blck1lc3NhZ2VEZWZsYXRlXS5faW5mbGF0ZSA9IG51bGw7XG4gIGVycltrU3RhdHVzQ29kZV0gPSAxMDA3O1xuICB0aGlzW2tDYWxsYmFja10oZXJyKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBXcml0YWJsZSB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IHtcbiAgQklOQVJZX1RZUEVTLFxuICBFTVBUWV9CVUZGRVIsXG4gIGtTdGF0dXNDb2RlLFxuICBrV2ViU29ja2V0XG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHsgY29uY2F0LCB0b0FycmF5QnVmZmVyLCB1bm1hc2sgfSA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcbmNvbnN0IHsgaXNWYWxpZFN0YXR1c0NvZGUsIGlzVmFsaWRVVEY4IH0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcblxuY29uc3QgR0VUX0lORk8gPSAwO1xuY29uc3QgR0VUX1BBWUxPQURfTEVOR1RIXzE2ID0gMTtcbmNvbnN0IEdFVF9QQVlMT0FEX0xFTkdUSF82NCA9IDI7XG5jb25zdCBHRVRfTUFTSyA9IDM7XG5jb25zdCBHRVRfREFUQSA9IDQ7XG5jb25zdCBJTkZMQVRJTkcgPSA1O1xuXG4vKipcbiAqIEh5QmkgUmVjZWl2ZXIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4dGVuZHMgc3RyZWFtLldyaXRhYmxlXG4gKi9cbmNsYXNzIFJlY2VpdmVyIGV4dGVuZHMgV3JpdGFibGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIFJlY2VpdmVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYmluYXJ5VHlwZSBUaGUgdHlwZSBmb3IgYmluYXJ5IGRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG5lZ290aWF0ZWQgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2VydmVyIFNwZWNpZmllcyB3aGV0aGVyIHRvIG9wZXJhdGUgaW4gY2xpZW50IG9yIHNlcnZlclxuICAgKiAgICAgbW9kZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4UGF5bG9hZCBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoXG4gICAqL1xuICBjb25zdHJ1Y3RvcihiaW5hcnlUeXBlLCBleHRlbnNpb25zLCBpc1NlcnZlciwgbWF4UGF5bG9hZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9iaW5hcnlUeXBlID0gYmluYXJ5VHlwZSB8fCBCSU5BUllfVFlQRVNbMF07XG4gICAgdGhpc1trV2ViU29ja2V0XSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9leHRlbnNpb25zID0gZXh0ZW5zaW9ucyB8fCB7fTtcbiAgICB0aGlzLl9pc1NlcnZlciA9ICEhaXNTZXJ2ZXI7XG4gICAgdGhpcy5fbWF4UGF5bG9hZCA9IG1heFBheWxvYWQgfCAwO1xuXG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyA9IDA7XG4gICAgdGhpcy5fYnVmZmVycyA9IFtdO1xuXG4gICAgdGhpcy5fY29tcHJlc3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSAwO1xuICAgIHRoaXMuX21hc2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZnJhZ21lbnRlZCA9IDA7XG4gICAgdGhpcy5fbWFza2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZmluID0gZmFsc2U7XG4gICAgdGhpcy5fb3Bjb2RlID0gMDtcblxuICAgIHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCA9IDA7XG4gICAgdGhpcy5fbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgdGhpcy5fZnJhZ21lbnRzID0gW107XG5cbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9JTkZPO1xuICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRzIGBXcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlKClgLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgVGhlIGNodW5rIG9mIGRhdGEgdG8gd3JpdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVuY29kaW5nIFRoZSBjaGFyYWN0ZXIgZW5jb2Rpbmcgb2YgYGNodW5rYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKi9cbiAgX3dyaXRlKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAweDA4ICYmIHRoaXMuX3N0YXRlID09IEdFVF9JTkZPKSByZXR1cm4gY2IoKTtcblxuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuICAgIHRoaXMuX2J1ZmZlcnMucHVzaChjaHVuayk7XG4gICAgdGhpcy5zdGFydExvb3AoY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN1bWVzIGBuYCBieXRlcyBmcm9tIHRoZSBidWZmZXJlZCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJ5dGVzIHRvIGNvbnN1bWVcbiAgICogQHJldHVybiB7QnVmZmVyfSBUaGUgY29uc3VtZWQgYnl0ZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnN1bWUobikge1xuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgLT0gbjtcblxuICAgIGlmIChuID09PSB0aGlzLl9idWZmZXJzWzBdLmxlbmd0aCkgcmV0dXJuIHRoaXMuX2J1ZmZlcnMuc2hpZnQoKTtcblxuICAgIGlmIChuIDwgdGhpcy5fYnVmZmVyc1swXS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJ1ZiA9IHRoaXMuX2J1ZmZlcnNbMF07XG4gICAgICB0aGlzLl9idWZmZXJzWzBdID0gYnVmLnNsaWNlKG4pO1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwLCBuKTtcbiAgICB9XG5cbiAgICBjb25zdCBkc3QgPSBCdWZmZXIuYWxsb2NVbnNhZmUobik7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBidWYgPSB0aGlzLl9idWZmZXJzWzBdO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gZHN0Lmxlbmd0aCAtIG47XG5cbiAgICAgIGlmIChuID49IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgZHN0LnNldCh0aGlzLl9idWZmZXJzLnNoaWZ0KCksIG9mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkc3Quc2V0KG5ldyBVaW50OEFycmF5KGJ1Zi5idWZmZXIsIGJ1Zi5ieXRlT2Zmc2V0LCBuKSwgb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5fYnVmZmVyc1swXSA9IGJ1Zi5zbGljZShuKTtcbiAgICAgIH1cblxuICAgICAgbiAtPSBidWYubGVuZ3RoO1xuICAgIH0gd2hpbGUgKG4gPiAwKTtcblxuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBwYXJzaW5nIGxvb3AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydExvb3AoY2IpIHtcbiAgICBsZXQgZXJyO1xuICAgIHRoaXMuX2xvb3AgPSB0cnVlO1xuXG4gICAgZG8ge1xuICAgICAgc3dpdGNoICh0aGlzLl9zdGF0ZSkge1xuICAgICAgICBjYXNlIEdFVF9JTkZPOlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0SW5mbygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9QQVlMT0FEX0xFTkdUSF8xNjpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldFBheWxvYWRMZW5ndGgxNigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9QQVlMT0FEX0xFTkdUSF82NDpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldFBheWxvYWRMZW5ndGg2NCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9NQVNLOlxuICAgICAgICAgIHRoaXMuZ2V0TWFzaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9EQVRBOlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0RGF0YShjYik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gYElORkxBVElOR2BcbiAgICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKHRoaXMuX2xvb3ApO1xuXG4gICAgY2IoZXJyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgZmlyc3QgdHdvIGJ5dGVzIG9mIGEgZnJhbWUuXG4gICAqXG4gICAqIEByZXR1cm4geyhSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldEluZm8oKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCAyKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmID0gdGhpcy5jb25zdW1lKDIpO1xuXG4gICAgaWYgKChidWZbMF0gJiAweDMwKSAhPT0gMHgwMCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdSU1YyIGFuZCBSU1YzIG11c3QgYmUgY2xlYXInLCB0cnVlLCAxMDAyKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wcmVzc2VkID0gKGJ1ZlswXSAmIDB4NDApID09PSAweDQwO1xuXG4gICAgaWYgKGNvbXByZXNzZWQgJiYgIXRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnUlNWMSBtdXN0IGJlIGNsZWFyJywgdHJ1ZSwgMTAwMik7XG4gICAgfVxuXG4gICAgdGhpcy5fZmluID0gKGJ1ZlswXSAmIDB4ODApID09PSAweDgwO1xuICAgIHRoaXMuX29wY29kZSA9IGJ1ZlswXSAmIDB4MGY7XG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IGJ1ZlsxXSAmIDB4N2Y7XG5cbiAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAweDAwKSB7XG4gICAgICBpZiAoY29tcHJlc3NlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnUlNWMSBtdXN0IGJlIGNsZWFyJywgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fZnJhZ21lbnRlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnaW52YWxpZCBvcGNvZGUgMCcsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9vcGNvZGUgPSB0aGlzLl9mcmFnbWVudGVkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fb3Bjb2RlID09PSAweDAxIHx8IHRoaXMuX29wY29kZSA9PT0gMHgwMikge1xuICAgICAgaWYgKHRoaXMuX2ZyYWdtZW50ZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgYGludmFsaWQgb3Bjb2RlICR7dGhpcy5fb3Bjb2RlfWAsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jb21wcmVzc2VkID0gY29tcHJlc3NlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wY29kZSA+IDB4MDcgJiYgdGhpcy5fb3Bjb2RlIDwgMHgwYikge1xuICAgICAgaWYgKCF0aGlzLl9maW4pIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ0ZJTiBtdXN0IGJlIHNldCcsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcHJlc3NlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnUlNWMSBtdXN0IGJlIGNsZWFyJywgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoID4gMHg3ZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgIGBpbnZhbGlkIHBheWxvYWQgbGVuZ3RoICR7dGhpcy5fcGF5bG9hZExlbmd0aH1gLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgYGludmFsaWQgb3Bjb2RlICR7dGhpcy5fb3Bjb2RlfWAsIHRydWUsIDEwMDIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZmluICYmICF0aGlzLl9mcmFnbWVudGVkKSB0aGlzLl9mcmFnbWVudGVkID0gdGhpcy5fb3Bjb2RlO1xuICAgIHRoaXMuX21hc2tlZCA9IChidWZbMV0gJiAweDgwKSA9PT0gMHg4MDtcblxuICAgIGlmICh0aGlzLl9pc1NlcnZlcikge1xuICAgICAgaWYgKCF0aGlzLl9tYXNrZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ01BU0sgbXVzdCBiZSBzZXQnLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX21hc2tlZCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdNQVNLIG11c3QgYmUgY2xlYXInLCB0cnVlLCAxMDAyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCA9PT0gMTI2KSB0aGlzLl9zdGF0ZSA9IEdFVF9QQVlMT0FEX0xFTkdUSF8xNjtcbiAgICBlbHNlIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoID09PSAxMjcpIHRoaXMuX3N0YXRlID0gR0VUX1BBWUxPQURfTEVOR1RIXzY0O1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuaGF2ZUxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgZXh0ZW5kZWQgcGF5bG9hZCBsZW5ndGggKDcrMTYpLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRQYXlsb2FkTGVuZ3RoMTYoKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCAyKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IHRoaXMuY29uc3VtZSgyKS5yZWFkVUludDE2QkUoMCk7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgZXh0ZW5kZWQgcGF5bG9hZCBsZW5ndGggKDcrNjQpLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRQYXlsb2FkTGVuZ3RoNjQoKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCA4KSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmID0gdGhpcy5jb25zdW1lKDgpO1xuICAgIGNvbnN0IG51bSA9IGJ1Zi5yZWFkVUludDMyQkUoMCk7XG5cbiAgICAvL1xuICAgIC8vIFRoZSBtYXhpbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0IGlzIDJeNTMgLSAxLiBBbiBlcnJvciBpcyByZXR1cm5lZFxuICAgIC8vIGlmIHBheWxvYWQgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiB0aGlzIG51bWJlci5cbiAgICAvL1xuICAgIGlmIChudW0gPiBNYXRoLnBvdygyLCA1MyAtIDMyKSAtIDEpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgJ1Vuc3VwcG9ydGVkIFdlYlNvY2tldCBmcmFtZTogcGF5bG9hZCBsZW5ndGggPiAyXjUzIC0gMScsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICAxMDA5XG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSBudW0gKiBNYXRoLnBvdygyLCAzMikgKyBidWYucmVhZFVJbnQzMkJFKDQpO1xuICAgIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXlsb2FkIGxlbmd0aCBoYXMgYmVlbiByZWFkLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYXZlTGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoICYmIHRoaXMuX29wY29kZSA8IDB4MDgpIHtcbiAgICAgIHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCArPSB0aGlzLl9wYXlsb2FkTGVuZ3RoO1xuICAgICAgaWYgKHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCA+IHRoaXMuX21heFBheWxvYWQgJiYgdGhpcy5fbWF4UGF5bG9hZCA+IDApIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ01heCBwYXlsb2FkIHNpemUgZXhjZWVkZWQnLCBmYWxzZSwgMTAwOSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21hc2tlZCkgdGhpcy5fc3RhdGUgPSBHRVRfTUFTSztcbiAgICBlbHNlIHRoaXMuX3N0YXRlID0gR0VUX0RBVEE7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgbWFzayBieXRlcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE1hc2soKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCA0KSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbWFzayA9IHRoaXMuY29uc3VtZSg0KTtcbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9EQVRBO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIGRhdGEgYnl0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEByZXR1cm4geyhFcnJvcnxSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldERhdGEoY2IpIHtcbiAgICBsZXQgZGF0YSA9IEVNUFRZX0JVRkZFUjtcblxuICAgIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IHRoaXMuX3BheWxvYWRMZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRhdGEgPSB0aGlzLmNvbnN1bWUodGhpcy5fcGF5bG9hZExlbmd0aCk7XG4gICAgICBpZiAodGhpcy5fbWFza2VkKSB1bm1hc2soZGF0YSwgdGhpcy5fbWFzayk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29wY29kZSA+IDB4MDcpIHJldHVybiB0aGlzLmNvbnRyb2xNZXNzYWdlKGRhdGEpO1xuXG4gICAgaWYgKHRoaXMuX2NvbXByZXNzZWQpIHtcbiAgICAgIHRoaXMuX3N0YXRlID0gSU5GTEFUSU5HO1xuICAgICAgdGhpcy5kZWNvbXByZXNzKGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIG1lc3NhZ2UgaXMgbm90IGNvbXByZXNzZWQgc28gaXRzIGxlbmdodCBpcyB0aGUgc3VtIG9mIHRoZSBwYXlsb2FkXG4gICAgICAvLyBsZW5ndGggb2YgYWxsIGZyYWdtZW50cy5cbiAgICAgIC8vXG4gICAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoID0gdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoO1xuICAgICAgdGhpcy5fZnJhZ21lbnRzLnB1c2goZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0YU1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXByZXNzZXMgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgQ29tcHJlc3NlZCBkYXRhXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWNvbXByZXNzKGRhdGEsIGNiKSB7XG4gICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdO1xuXG4gICAgcGVyTWVzc2FnZURlZmxhdGUuZGVjb21wcmVzcyhkYXRhLCB0aGlzLl9maW4sIChlcnIsIGJ1ZikgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAgIGlmIChidWYubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggKz0gYnVmLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VMZW5ndGggPiB0aGlzLl9tYXhQYXlsb2FkICYmIHRoaXMuX21heFBheWxvYWQgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNiKFxuICAgICAgICAgICAgZXJyb3IoUmFuZ2VFcnJvciwgJ01heCBwYXlsb2FkIHNpemUgZXhjZWVkZWQnLCBmYWxzZSwgMTAwOSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJhZ21lbnRzLnB1c2goYnVmKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXIgPSB0aGlzLmRhdGFNZXNzYWdlKCk7XG4gICAgICBpZiAoZXIpIHJldHVybiBjYihlcik7XG5cbiAgICAgIHRoaXMuc3RhcnRMb29wKGNiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgZGF0YSBtZXNzYWdlLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGF0YU1lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuX2Zpbikge1xuICAgICAgY29uc3QgbWVzc2FnZUxlbmd0aCA9IHRoaXMuX21lc3NhZ2VMZW5ndGg7XG4gICAgICBjb25zdCBmcmFnbWVudHMgPSB0aGlzLl9mcmFnbWVudHM7XG5cbiAgICAgIHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCA9IDA7XG4gICAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuX2ZyYWdtZW50ZWQgPSAwO1xuICAgICAgdGhpcy5fZnJhZ21lbnRzID0gW107XG5cbiAgICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDIpIHtcbiAgICAgICAgbGV0IGRhdGE7XG5cbiAgICAgICAgaWYgKHRoaXMuX2JpbmFyeVR5cGUgPT09ICdub2RlYnVmZmVyJykge1xuICAgICAgICAgIGRhdGEgPSBjb25jYXQoZnJhZ21lbnRzLCBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9iaW5hcnlUeXBlID09PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgICAgZGF0YSA9IHRvQXJyYXlCdWZmZXIoY29uY2F0KGZyYWdtZW50cywgbWVzc2FnZUxlbmd0aCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGEgPSBmcmFnbWVudHM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IGNvbmNhdChmcmFnbWVudHMsIG1lc3NhZ2VMZW5ndGgpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZFVURjgoYnVmKSkge1xuICAgICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZXJyb3IoRXJyb3IsICdpbnZhbGlkIFVURi04IHNlcXVlbmNlJywgdHJ1ZSwgMTAwNyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBidWYudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfSU5GTztcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgY29udHJvbCBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBEYXRhIHRvIGhhbmRsZVxuICAgKiBAcmV0dXJuIHsoRXJyb3J8UmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb250cm9sTWVzc2FnZShkYXRhKSB7XG4gICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwOCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25jbHVkZScsIDEwMDUsICcnKTtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdpbnZhbGlkIHBheWxvYWQgbGVuZ3RoIDEnLCB0cnVlLCAxMDAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBkYXRhLnJlYWRVSW50MTZCRSgwKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRTdGF0dXNDb2RlKGNvZGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsIGBpbnZhbGlkIHN0YXR1cyBjb2RlICR7Y29kZX1gLCB0cnVlLCAxMDAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ1ZiA9IGRhdGEuc2xpY2UoMik7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkVVRGOChidWYpKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKEVycm9yLCAnaW52YWxpZCBVVEYtOCBzZXF1ZW5jZScsIHRydWUsIDEwMDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCdjb25jbHVkZScsIGNvZGUsIGJ1Zi50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwOSkge1xuICAgICAgdGhpcy5lbWl0KCdwaW5nJywgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdCgncG9uZycsIGRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNlaXZlcjtcblxuLyoqXG4gKiBCdWlsZHMgYW4gZXJyb3Igb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7KEVycm9yfFJhbmdlRXJyb3IpfSBFcnJvckN0b3IgVGhlIGVycm9yIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtCb29sZWFufSBwcmVmaXggU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGFkZCBhIGRlZmF1bHQgcHJlZml4IHRvXG4gKiAgICAgYG1lc3NhZ2VgXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzQ29kZSBUaGUgc3RhdHVzIGNvZGVcbiAqIEByZXR1cm4geyhFcnJvcnxSYW5nZUVycm9yKX0gVGhlIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlcnJvcihFcnJvckN0b3IsIG1lc3NhZ2UsIHByZWZpeCwgc3RhdHVzQ29kZSkge1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3JDdG9yKFxuICAgIHByZWZpeCA/IGBJbnZhbGlkIFdlYlNvY2tldCBmcmFtZTogJHttZXNzYWdlfWAgOiBtZXNzYWdlXG4gICk7XG5cbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZXJyLCBlcnJvcik7XG4gIGVycltrU3RhdHVzQ29kZV0gPSBzdGF0dXNDb2RlO1xuICByZXR1cm4gZXJyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IHJhbmRvbUZpbGxTeW5jIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3QgeyBFTVBUWV9CVUZGRVIgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB7IGlzVmFsaWRTdGF0dXNDb2RlIH0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcbmNvbnN0IHsgbWFzazogYXBwbHlNYXNrLCB0b0J1ZmZlciB9ID0gcmVxdWlyZSgnLi9idWZmZXItdXRpbCcpO1xuXG5jb25zdCBtYXNrID0gQnVmZmVyLmFsbG9jKDQpO1xuXG4vKipcbiAqIEh5QmkgU2VuZGVyIGltcGxlbWVudGF0aW9uLlxuICovXG5jbGFzcyBTZW5kZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIFNlbmRlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtuZXQuU29ja2V0fSBzb2NrZXQgVGhlIGNvbm5lY3Rpb24gc29ja2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBuZWdvdGlhdGVkIGV4dGVuc2lvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNvY2tldCwgZXh0ZW5zaW9ucykge1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IHt9O1xuICAgIHRoaXMuX3NvY2tldCA9IHNvY2tldDtcblxuICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnQgPSB0cnVlO1xuICAgIHRoaXMuX2NvbXByZXNzID0gZmFsc2U7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzID0gMDtcbiAgICB0aGlzLl9kZWZsYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyYW1lcyBhIHBpZWNlIG9mIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBIeUJpIFdlYlNvY2tldCBwcm90b2NvbC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgdG8gZnJhbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMub3Bjb2RlIFRoZSBvcGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnJlYWRPbmx5IFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBjYW4gYmUgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBGSU4gYml0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5tYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMucnN2MSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBSU1YxIGJpdFxuICAgKiBAcmV0dXJuIHtCdWZmZXJbXX0gVGhlIGZyYW1lZCBkYXRhIGFzIGEgbGlzdCBvZiBgQnVmZmVyYCBpbnN0YW5jZXNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc3RhdGljIGZyYW1lKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBtZXJnZSA9IG9wdGlvbnMubWFzayAmJiBvcHRpb25zLnJlYWRPbmx5O1xuICAgIGxldCBvZmZzZXQgPSBvcHRpb25zLm1hc2sgPyA2IDogMjtcbiAgICBsZXQgcGF5bG9hZExlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID49IDY1NTM2KSB7XG4gICAgICBvZmZzZXQgKz0gODtcbiAgICAgIHBheWxvYWRMZW5ndGggPSAxMjc7XG4gICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEyNSkge1xuICAgICAgb2Zmc2V0ICs9IDI7XG4gICAgICBwYXlsb2FkTGVuZ3RoID0gMTI2O1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShtZXJnZSA/IGRhdGEubGVuZ3RoICsgb2Zmc2V0IDogb2Zmc2V0KTtcblxuICAgIHRhcmdldFswXSA9IG9wdGlvbnMuZmluID8gb3B0aW9ucy5vcGNvZGUgfCAweDgwIDogb3B0aW9ucy5vcGNvZGU7XG4gICAgaWYgKG9wdGlvbnMucnN2MSkgdGFyZ2V0WzBdIHw9IDB4NDA7XG5cbiAgICB0YXJnZXRbMV0gPSBwYXlsb2FkTGVuZ3RoO1xuXG4gICAgaWYgKHBheWxvYWRMZW5ndGggPT09IDEyNikge1xuICAgICAgdGFyZ2V0LndyaXRlVUludDE2QkUoZGF0YS5sZW5ndGgsIDIpO1xuICAgIH0gZWxzZSBpZiAocGF5bG9hZExlbmd0aCA9PT0gMTI3KSB7XG4gICAgICB0YXJnZXQud3JpdGVVSW50MzJCRSgwLCAyKTtcbiAgICAgIHRhcmdldC53cml0ZVVJbnQzMkJFKGRhdGEubGVuZ3RoLCA2KTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMubWFzaykgcmV0dXJuIFt0YXJnZXQsIGRhdGFdO1xuXG4gICAgcmFuZG9tRmlsbFN5bmMobWFzaywgMCwgNCk7XG5cbiAgICB0YXJnZXRbMV0gfD0gMHg4MDtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gNF0gPSBtYXNrWzBdO1xuICAgIHRhcmdldFtvZmZzZXQgLSAzXSA9IG1hc2tbMV07XG4gICAgdGFyZ2V0W29mZnNldCAtIDJdID0gbWFza1syXTtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gMV0gPSBtYXNrWzNdO1xuXG4gICAgaWYgKG1lcmdlKSB7XG4gICAgICBhcHBseU1hc2soZGF0YSwgbWFzaywgdGFyZ2V0LCBvZmZzZXQsIGRhdGEubGVuZ3RoKTtcbiAgICAgIHJldHVybiBbdGFyZ2V0XTtcbiAgICB9XG5cbiAgICBhcHBseU1hc2soZGF0YSwgbWFzaywgZGF0YSwgMCwgZGF0YS5sZW5ndGgpO1xuICAgIHJldHVybiBbdGFyZ2V0LCBkYXRhXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGNsb3NlIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7KE51bWJlcnx1bmRlZmluZWQpfSBjb2RlIFRoZSBzdGF0dXMgY29kZSBjb21wb25lbnQgb2YgdGhlIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgVGhlIG1lc3NhZ2UgY29tcG9uZW50IG9mIHRoZSBib2R5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBjbG9zZShjb2RlLCBkYXRhLCBtYXNrLCBjYikge1xuICAgIGxldCBidWY7XG5cbiAgICBpZiAoY29kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBidWYgPSBFTVBUWV9CVUZGRVI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29kZSAhPT0gJ251bWJlcicgfHwgIWlzVmFsaWRTdGF0dXNDb2RlKGNvZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdmFsaWQgZXJyb3IgY29kZSBudW1iZXInKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSAnJykge1xuICAgICAgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIpO1xuICAgICAgYnVmLndyaXRlVUludDE2QkUoY29kZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpO1xuXG4gICAgICBpZiAobGVuZ3RoID4gMTIzKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgbWVzc2FnZSBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gMTIzIGJ5dGVzJyk7XG4gICAgICB9XG5cbiAgICAgIGJ1ZiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgyICsgbGVuZ3RoKTtcbiAgICAgIGJ1Zi53cml0ZVVJbnQxNkJFKGNvZGUsIDApO1xuICAgICAgYnVmLndyaXRlKGRhdGEsIDIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShbdGhpcy5kb0Nsb3NlLCBidWYsIG1hc2ssIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9DbG9zZShidWYsIG1hc2ssIGNiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnJhbWVzIGFuZCBzZW5kcyBhIGNsb3NlIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZG9DbG9zZShkYXRhLCBtYXNrLCBjYikge1xuICAgIHRoaXMuc2VuZEZyYW1lKFxuICAgICAgU2VuZGVyLmZyYW1lKGRhdGEsIHtcbiAgICAgICAgZmluOiB0cnVlLFxuICAgICAgICByc3YxOiBmYWxzZSxcbiAgICAgICAgb3Bjb2RlOiAweDA4LFxuICAgICAgICBtYXNrLFxuICAgICAgICByZWFkT25seTogZmFsc2VcbiAgICAgIH0pLFxuICAgICAgY2JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGluZyBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBpbmcoZGF0YSwgbWFzaywgY2IpIHtcbiAgICBjb25zdCBidWYgPSB0b0J1ZmZlcihkYXRhKTtcblxuICAgIGlmIChidWYubGVuZ3RoID4gMTI1KSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIGRhdGEgc2l6ZSBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gMTI1IGJ5dGVzJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRvUGluZywgYnVmLCBtYXNrLCB0b0J1ZmZlci5yZWFkT25seSwgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb1BpbmcoYnVmLCBtYXNrLCB0b0J1ZmZlci5yZWFkT25seSwgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGcmFtZXMgYW5kIHNlbmRzIGEgcGluZyBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVhZE9ubHkgU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZSBtb2RpZmllZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZG9QaW5nKGRhdGEsIG1hc2ssIHJlYWRPbmx5LCBjYikge1xuICAgIHRoaXMuc2VuZEZyYW1lKFxuICAgICAgU2VuZGVyLmZyYW1lKGRhdGEsIHtcbiAgICAgICAgZmluOiB0cnVlLFxuICAgICAgICByc3YxOiBmYWxzZSxcbiAgICAgICAgb3Bjb2RlOiAweDA5LFxuICAgICAgICBtYXNrLFxuICAgICAgICByZWFkT25seVxuICAgICAgfSksXG4gICAgICBjYlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBwb25nIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcG9uZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGNvbnN0IGJ1ZiA9IHRvQnVmZmVyKGRhdGEpO1xuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPiAxMjUpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgZGF0YSBzaXplIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjUgYnl0ZXMnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmbGF0aW5nKSB7XG4gICAgICB0aGlzLmVucXVldWUoW3RoaXMuZG9Qb25nLCBidWYsIG1hc2ssIHRvQnVmZmVyLnJlYWRPbmx5LCBjYl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvUG9uZyhidWYsIG1hc2ssIHRvQnVmZmVyLnJlYWRPbmx5LCBjYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZyYW1lcyBhbmQgc2VuZHMgYSBwb25nIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSByZWFkT25seSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgY2FuIGJlIG1vZGlmaWVkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkb1BvbmcoZGF0YSwgbWFzaywgcmVhZE9ubHksIGNiKSB7XG4gICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICBTZW5kZXIuZnJhbWUoZGF0YSwge1xuICAgICAgICBmaW46IHRydWUsXG4gICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICBvcGNvZGU6IDB4MGEsXG4gICAgICAgIG1hc2ssXG4gICAgICAgIHJlYWRPbmx5XG4gICAgICB9KSxcbiAgICAgIGNiXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGRhdGEgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmNvbXByZXNzIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBjb21wcmVzcyBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmJpbmFyeSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgaXMgYmluYXJ5IG9yIHRleHRcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZpbiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZnJhZ21lbnQgaXMgdGhlIGxhc3Qgb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5tYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBzZW5kKGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgY29uc3QgYnVmID0gdG9CdWZmZXIoZGF0YSk7XG4gICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdO1xuICAgIGxldCBvcGNvZGUgPSBvcHRpb25zLmJpbmFyeSA/IDIgOiAxO1xuICAgIGxldCByc3YxID0gb3B0aW9ucy5jb21wcmVzcztcblxuICAgIGlmICh0aGlzLl9maXJzdEZyYWdtZW50KSB7XG4gICAgICB0aGlzLl9maXJzdEZyYWdtZW50ID0gZmFsc2U7XG4gICAgICBpZiAocnN2MSAmJiBwZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICByc3YxID0gYnVmLmxlbmd0aCA+PSBwZXJNZXNzYWdlRGVmbGF0ZS5fdGhyZXNob2xkO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tcHJlc3MgPSByc3YxO1xuICAgIH0gZWxzZSB7XG4gICAgICByc3YxID0gZmFsc2U7XG4gICAgICBvcGNvZGUgPSAwO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmZpbikgdGhpcy5fZmlyc3RGcmFnbWVudCA9IHRydWU7XG5cbiAgICBpZiAocGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgIGZpbjogb3B0aW9ucy5maW4sXG4gICAgICAgIHJzdjEsXG4gICAgICAgIG9wY29kZSxcbiAgICAgICAgbWFzazogb3B0aW9ucy5tYXNrLFxuICAgICAgICByZWFkT25seTogdG9CdWZmZXIucmVhZE9ubHlcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRpc3BhdGNoLCBidWYsIHRoaXMuX2NvbXByZXNzLCBvcHRzLCBjYl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChidWYsIHRoaXMuX2NvbXByZXNzLCBvcHRzLCBjYik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFxuICAgICAgICBTZW5kZXIuZnJhbWUoYnVmLCB7XG4gICAgICAgICAgZmluOiBvcHRpb25zLmZpbixcbiAgICAgICAgICByc3YxOiBmYWxzZSxcbiAgICAgICAgICBvcGNvZGUsXG4gICAgICAgICAgbWFzazogb3B0aW9ucy5tYXNrLFxuICAgICAgICAgIHJlYWRPbmx5OiB0b0J1ZmZlci5yZWFkT25seVxuICAgICAgICB9KSxcbiAgICAgICAgY2JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBkYXRhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBjb21wcmVzcyBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gY29tcHJlc3MgYGRhdGFgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm9wY29kZSBUaGUgb3Bjb2RlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5yZWFkT25seSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgY2FuIGJlIG1vZGlmaWVkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5maW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIHNldCB0aGUgRklOIGJpdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMubWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnJzdjEgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIHNldCB0aGUgUlNWMSBiaXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRpc3BhdGNoKGRhdGEsIGNvbXByZXNzLCBvcHRpb25zLCBjYikge1xuICAgIGlmICghY29tcHJlc3MpIHtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShkYXRhLCBvcHRpb25zKSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlck1lc3NhZ2VEZWZsYXRlID0gdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTtcblxuICAgIHRoaXMuX2RlZmxhdGluZyA9IHRydWU7XG4gICAgcGVyTWVzc2FnZURlZmxhdGUuY29tcHJlc3MoZGF0YSwgb3B0aW9ucy5maW4sIChfLCBidWYpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zb2NrZXQuZGVzdHJveWVkKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIHNvY2tldCB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIGNvbXByZXNzZWQnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IoZXJyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLl9xdWV1ZVtpXVs0XTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2RlZmxhdGluZyA9IGZhbHNlO1xuICAgICAgb3B0aW9ucy5yZWFkT25seSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGJ1Ziwgb3B0aW9ucyksIGNiKTtcbiAgICAgIHRoaXMuZGVxdWV1ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHF1ZXVlZCBzZW5kIG9wZXJhdGlvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXF1ZXVlKCkge1xuICAgIHdoaWxlICghdGhpcy5fZGVmbGF0aW5nICYmIHRoaXMuX3F1ZXVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5fcXVldWUuc2hpZnQoKTtcblxuICAgICAgdGhpcy5fYnVmZmVyZWRCeXRlcyAtPSBwYXJhbXNbMV0ubGVuZ3RoO1xuICAgICAgUmVmbGVjdC5hcHBseShwYXJhbXNbMF0sIHRoaXMsIHBhcmFtcy5zbGljZSgxKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIGEgc2VuZCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBTZW5kIG9wZXJhdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZW5xdWV1ZShwYXJhbXMpIHtcbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IHBhcmFtc1sxXS5sZW5ndGg7XG4gICAgdGhpcy5fcXVldWUucHVzaChwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyW119IGxpc3QgVGhlIGZyYW1lIHRvIHNlbmRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNlbmRGcmFtZShsaXN0LCBjYikge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy5fc29ja2V0LmNvcmsoKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzFdLCBjYik7XG4gICAgICB0aGlzLl9zb2NrZXQudW5jb3JrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdLCBjYik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IER1cGxleCB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbi8qKlxuICogRW1pdHMgdGhlIGAnY2xvc2UnYCBldmVudCBvbiBhIHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge3N0cmVhbS5EdXBsZXh9IFRoZSBzdHJlYW0uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbWl0Q2xvc2Uoc3RyZWFtKSB7XG4gIHN0cmVhbS5lbWl0KCdjbG9zZScpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlbmQnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVuZCgpIHtcbiAgaWYgKCF0aGlzLmRlc3Ryb3llZCAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVycm9yKGVycikge1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGR1cGxleE9uRXJyb3IpO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgaWYgKHRoaXMubGlzdGVuZXJDb3VudCgnZXJyb3InKSA9PT0gMCkge1xuICAgIC8vIERvIG5vdCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IuXG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBhIGBXZWJTb2NrZXRgIGluIGEgZHVwbGV4IHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd3MgVGhlIGBXZWJTb2NrZXRgIHRvIHdyYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgYER1cGxleGAgY29uc3RydWN0b3JcbiAqIEByZXR1cm4ge3N0cmVhbS5EdXBsZXh9IFRoZSBkdXBsZXggc3RyZWFtXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVdlYlNvY2tldFN0cmVhbSh3cywgb3B0aW9ucykge1xuICBsZXQgcmVzdW1lT25SZWNlaXZlckRyYWluID0gdHJ1ZTtcblxuICBmdW5jdGlvbiByZWNlaXZlck9uRHJhaW4oKSB7XG4gICAgaWYgKHJlc3VtZU9uUmVjZWl2ZXJEcmFpbikgd3MuX3NvY2tldC5yZXN1bWUoKTtcbiAgfVxuXG4gIGlmICh3cy5yZWFkeVN0YXRlID09PSB3cy5DT05ORUNUSU5HKSB7XG4gICAgd3Mub25jZSgnb3BlbicsIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICB3cy5fcmVjZWl2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdkcmFpbicpO1xuICAgICAgd3MuX3JlY2VpdmVyLm9uKCdkcmFpbicsIHJlY2VpdmVyT25EcmFpbik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd3MuX3JlY2VpdmVyLnJlbW92ZUFsbExpc3RlbmVycygnZHJhaW4nKTtcbiAgICB3cy5fcmVjZWl2ZXIub24oJ2RyYWluJywgcmVjZWl2ZXJPbkRyYWluKTtcbiAgfVxuXG4gIGNvbnN0IGR1cGxleCA9IG5ldyBEdXBsZXgoe1xuICAgIC4uLm9wdGlvbnMsXG4gICAgYXV0b0Rlc3Ryb3k6IGZhbHNlLFxuICAgIGVtaXRDbG9zZTogZmFsc2UsXG4gICAgb2JqZWN0TW9kZTogZmFsc2UsXG4gICAgd3JpdGFibGVPYmplY3RNb2RlOiBmYWxzZVxuICB9KTtcblxuICB3cy5vbignbWVzc2FnZScsIGZ1bmN0aW9uIG1lc3NhZ2UobXNnKSB7XG4gICAgaWYgKCFkdXBsZXgucHVzaChtc2cpKSB7XG4gICAgICByZXN1bWVPblJlY2VpdmVyRHJhaW4gPSBmYWxzZTtcbiAgICAgIHdzLl9zb2NrZXQucGF1c2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgaWYgKGR1cGxleC5kZXN0cm95ZWQpIHJldHVybjtcblxuICAgIGR1cGxleC5kZXN0cm95KGVycik7XG4gIH0pO1xuXG4gIHdzLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgaWYgKGR1cGxleC5kZXN0cm95ZWQpIHJldHVybjtcblxuICAgIGR1cGxleC5wdXNoKG51bGwpO1xuICB9KTtcblxuICBkdXBsZXguX2Rlc3Ryb3kgPSBmdW5jdGlvbihlcnIsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNMT1NFRCkge1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcblxuICAgIHdzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9KTtcblxuICAgIHdzLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgIH0pO1xuICAgIHdzLnRlcm1pbmF0ZSgpO1xuICB9O1xuXG4gIGR1cGxleC5fZmluYWwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSB3cy5DT05ORUNUSU5HKSB7XG4gICAgICB3cy5vbmNlKCdvcGVuJywgZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgZHVwbGV4Ll9maW5hbChjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIGBfc29ja2V0YCBwcm9wZXJ0eSBpcyBgbnVsbGAgaXQgbWVhbnMgdGhhdCBgd3NgIGlzIGFcbiAgICAvLyBjbGllbnQgd2Vic29ja2V0IGFuZCB0aGUgaGFuZHNoYWtlIGZhaWxlZC4gSW4gZmFjdCwgd2hlbiB0aGlzIGhhcHBlbnMsIGFcbiAgICAvLyBzb2NrZXQgaXMgbmV2ZXIgYXNzaWduZWQgdG8gdGhlIHdlYnNvY2tldC4gV2FpdCBmb3IgdGhlIGAnZXJyb3InYCBldmVudFxuICAgIC8vIHRoYXQgd2lsbCBiZSBlbWl0dGVkIGJ5IHRoZSB3ZWJzb2NrZXQuXG4gICAgaWYgKHdzLl9zb2NrZXQgPT09IG51bGwpIHJldHVybjtcblxuICAgIGlmICh3cy5fc29ja2V0Ll93cml0YWJsZVN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgaWYgKGR1cGxleC5fcmVhZGFibGVTdGF0ZS5lbmRFbWl0dGVkKSBkdXBsZXguZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cy5fc29ja2V0Lm9uY2UoJ2ZpbmlzaCcsIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgLy8gYGR1cGxleGAgaXMgbm90IGRlc3Ryb3llZCBoZXJlIGJlY2F1c2UgdGhlIGAnZW5kJ2AgZXZlbnQgd2lsbCBiZVxuICAgICAgICAvLyBlbWl0dGVkIG9uIGBkdXBsZXhgIGFmdGVyIHRoaXMgYCdmaW5pc2gnYCBldmVudC4gVGhlIEVPRiBzaWduYWxpbmdcbiAgICAgICAgLy8gYG51bGxgIGNodW5rIGlzLCBpbiBmYWN0LCBwdXNoZWQgd2hlbiB0aGUgd2Vic29ja2V0IGVtaXRzIGAnY2xvc2UnYC5cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgICAgd3MuY2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgZHVwbGV4Ll9yZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLk9QRU4gJiYgIXJlc3VtZU9uUmVjZWl2ZXJEcmFpbikge1xuICAgICAgcmVzdW1lT25SZWNlaXZlckRyYWluID0gdHJ1ZTtcbiAgICAgIGlmICghd3MuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLm5lZWREcmFpbikgd3MuX3NvY2tldC5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG5cbiAgZHVwbGV4Ll93cml0ZSA9IGZ1bmN0aW9uKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ09OTkVDVElORykge1xuICAgICAgd3Mub25jZSgnb3BlbicsIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgIGR1cGxleC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3cy5zZW5kKGNodW5rLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgZHVwbGV4Lm9uKCdlbmQnLCBkdXBsZXhPbkVuZCk7XG4gIGR1cGxleC5vbignZXJyb3InLCBkdXBsZXhPbkVycm9yKTtcbiAgcmV0dXJuIGR1cGxleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVXZWJTb2NrZXRTdHJlYW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnRyeSB7XG4gIGNvbnN0IGlzVmFsaWRVVEY4ID0gcmVxdWlyZSgndXRmLTgtdmFsaWRhdGUnKTtcblxuICBleHBvcnRzLmlzVmFsaWRVVEY4ID1cbiAgICB0eXBlb2YgaXNWYWxpZFVURjggPT09ICdvYmplY3QnXG4gICAgICA/IGlzVmFsaWRVVEY4LlZhbGlkYXRpb24uaXNWYWxpZFVURjggLy8gdXRmLTgtdmFsaWRhdGVAPDMuMC4wXG4gICAgICA6IGlzVmFsaWRVVEY4O1xufSBjYXRjaCAoZSkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge1xuICBleHBvcnRzLmlzVmFsaWRVVEY4ID0gKCkgPT4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGF0dXMgY29kZSBpcyBhbGxvd2VkIGluIGEgY2xvc2UgZnJhbWUuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIHN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHN0YXR1cyBjb2RlIGlzIHZhbGlkLCBlbHNlIGBmYWxzZWBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0cy5pc1ZhbGlkU3RhdHVzQ29kZSA9IChjb2RlKSA9PiB7XG4gIHJldHVybiAoXG4gICAgKGNvZGUgPj0gMTAwMCAmJlxuICAgICAgY29kZSA8PSAxMDE0ICYmXG4gICAgICBjb2RlICE9PSAxMDA0ICYmXG4gICAgICBjb2RlICE9PSAxMDA1ICYmXG4gICAgICBjb2RlICE9PSAxMDA2KSB8fFxuICAgIChjb2RlID49IDMwMDAgJiYgY29kZSA8PSA0OTk5KVxuICApO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCB7IGNyZWF0ZUhhc2ggfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuY29uc3QgeyBjcmVhdGVTZXJ2ZXIsIFNUQVRVU19DT0RFUyB9ID0gcmVxdWlyZSgnaHR0cCcpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCBXZWJTb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuY29uc3QgeyBmb3JtYXQsIHBhcnNlIH0gPSByZXF1aXJlKCcuL2V4dGVuc2lvbicpO1xuY29uc3QgeyBHVUlELCBrV2ViU29ja2V0IH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBrZXlSZWdleCA9IC9eWysvMC05QS1aYS16XXsyMn09PSQvO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFdlYlNvY2tldCBzZXJ2ZXIuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXG4gKi9cbmNsYXNzIFdlYlNvY2tldFNlcnZlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBgV2ViU29ja2V0U2VydmVyYCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmJhY2tsb2cgVGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBxdWV1ZSBvZiBwZW5kaW5nXG4gICAqICAgICBjb25uZWN0aW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuY2xpZW50VHJhY2tpbmcgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIHRyYWNrXG4gICAqICAgICBjbGllbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuaGFuZGxlUHJvdG9jb2xzIEEgaG9vayB0byBoYW5kbGUgcHJvdG9jb2xzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmhvc3QgVGhlIGhvc3RuYW1lIHdoZXJlIHRvIGJpbmQgdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhQYXlsb2FkIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBzaXplXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5ub1NlcnZlciBFbmFibGUgbm8gc2VydmVyIG1vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGF0aCBBY2NlcHQgb25seSBjb25uZWN0aW9ucyBtYXRjaGluZyB0aGlzIHBhdGhcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxPYmplY3QpfSBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlIEVuYWJsZS9kaXNhYmxlXG4gICAqICAgICBwZXJtZXNzYWdlLWRlZmxhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucG9ydCBUaGUgcG9ydCB3aGVyZSB0byBiaW5kIHRoZSBzZXJ2ZXJcbiAgICogQHBhcmFtIHtodHRwLlNlcnZlcn0gb3B0aW9ucy5zZXJ2ZXIgQSBwcmUtY3JlYXRlZCBIVFRQL1Mgc2VydmVyIHRvIHVzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnZlcmlmeUNsaWVudCBBIGhvb2sgdG8gcmVqZWN0IGNvbm5lY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgbGlzdGVuZXIgZm9yIHRoZSBgbGlzdGVuaW5nYCBldmVudFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpO1xuXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIG1heFBheWxvYWQ6IDEwMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IGZhbHNlLFxuICAgICAgaGFuZGxlUHJvdG9jb2xzOiBudWxsLFxuICAgICAgY2xpZW50VHJhY2tpbmc6IHRydWUsXG4gICAgICB2ZXJpZnlDbGllbnQ6IG51bGwsXG4gICAgICBub1NlcnZlcjogZmFsc2UsXG4gICAgICBiYWNrbG9nOiBudWxsLCAvLyB1c2UgZGVmYXVsdCAoNTExIGFzIGltcGxlbWVudGVkIGluIG5ldC5qcylcbiAgICAgIHNlcnZlcjogbnVsbCxcbiAgICAgIGhvc3Q6IG51bGwsXG4gICAgICBwYXRoOiBudWxsLFxuICAgICAgcG9ydDogbnVsbCxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgaWYgKG9wdGlvbnMucG9ydCA9PSBudWxsICYmICFvcHRpb25zLnNlcnZlciAmJiAhb3B0aW9ucy5ub1NlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ09uZSBvZiB0aGUgXCJwb3J0XCIsIFwic2VydmVyXCIsIG9yIFwibm9TZXJ2ZXJcIiBvcHRpb25zIG11c3QgYmUgc3BlY2lmaWVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wb3J0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZlciA9IGNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IFNUQVRVU19DT0RFU1s0MjZdO1xuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoNDI2LCB7XG4gICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogYm9keS5sZW5ndGgsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLmVuZChib2R5KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc2VydmVyLmxpc3RlbihcbiAgICAgICAgb3B0aW9ucy5wb3J0LFxuICAgICAgICBvcHRpb25zLmhvc3QsXG4gICAgICAgIG9wdGlvbnMuYmFja2xvZyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnNlcnZlcikge1xuICAgICAgdGhpcy5fc2VydmVyID0gb3B0aW9ucy5zZXJ2ZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NlcnZlcikge1xuICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzID0gYWRkTGlzdGVuZXJzKHRoaXMuX3NlcnZlciwge1xuICAgICAgICBsaXN0ZW5pbmc6IHRoaXMuZW1pdC5iaW5kKHRoaXMsICdsaXN0ZW5pbmcnKSxcbiAgICAgICAgZXJyb3I6IHRoaXMuZW1pdC5iaW5kKHRoaXMsICdlcnJvcicpLFxuICAgICAgICB1cGdyYWRlOiAocmVxLCBzb2NrZXQsIGhlYWQpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVVwZ3JhZGUocmVxLCBzb2NrZXQsIGhlYWQsICh3cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW9uJywgd3MsIHJlcSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlID09PSB0cnVlKSBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gICAgaWYgKG9wdGlvbnMuY2xpZW50VHJhY2tpbmcpIHRoaXMuY2xpZW50cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvdW5kIGFkZHJlc3MsIHRoZSBhZGRyZXNzIGZhbWlseSBuYW1lLCBhbmQgcG9ydCBvZiB0aGUgc2VydmVyXG4gICAqIGFzIHJlcG9ydGVkIGJ5IHRoZSBvcGVyYXRpbmcgc3lzdGVtIGlmIGxpc3RlbmluZyBvbiBhbiBJUCBzb2NrZXQuXG4gICAqIElmIHRoZSBzZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIGEgcGlwZSBvciBVTklYIGRvbWFpbiBzb2NrZXQsIHRoZSBuYW1lIGlzXG4gICAqIHJldHVybmVkIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoT2JqZWN0fFN0cmluZ3xudWxsKX0gVGhlIGFkZHJlc3Mgb2YgdGhlIHNlcnZlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRyZXNzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubm9TZXJ2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHNlcnZlciBpcyBvcGVyYXRpbmcgaW4gXCJub1NlcnZlclwiIG1vZGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3NlcnZlcikgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX3NlcnZlci5hZGRyZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY2IpIHtcbiAgICBpZiAoY2IpIHRoaXMub25jZSgnY2xvc2UnLCBjYik7XG5cbiAgICAvL1xuICAgIC8vIFRlcm1pbmF0ZSBhbGwgYXNzb2NpYXRlZCBjbGllbnRzLlxuICAgIC8vXG4gICAgaWYgKHRoaXMuY2xpZW50cykge1xuICAgICAgZm9yIChjb25zdCBjbGllbnQgb2YgdGhpcy5jbGllbnRzKSBjbGllbnQudGVybWluYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmVyID0gdGhpcy5fc2VydmVyO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSB0aGlzLl9zZXJ2ZXIgPSBudWxsO1xuXG4gICAgICAvL1xuICAgICAgLy8gQ2xvc2UgdGhlIGh0dHAgc2VydmVyIGlmIGl0IHdhcyBpbnRlcm5hbGx5IGNyZWF0ZWQuXG4gICAgICAvL1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb3J0ICE9IG51bGwpIHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCgpID0+IHRoaXMuZW1pdCgnY2xvc2UnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2VlIGlmIGEgZ2l2ZW4gcmVxdWVzdCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGlzIHNlcnZlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFJlcXVlc3Qgb2JqZWN0IHRvIGluc3BlY3RcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSByZXF1ZXN0IGlzIHZhbGlkLCBlbHNlIGBmYWxzZWBcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2hvdWxkSGFuZGxlKHJlcSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGF0aCkge1xuICAgICAgY29uc3QgaW5kZXggPSByZXEudXJsLmluZGV4T2YoJz8nKTtcbiAgICAgIGNvbnN0IHBhdGhuYW1lID0gaW5kZXggIT09IC0xID8gcmVxLnVybC5zbGljZSgwLCBpbmRleCkgOiByZXEudXJsO1xuXG4gICAgICBpZiAocGF0aG5hbWUgIT09IHRoaXMub3B0aW9ucy5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGEgSFRUUCBVcGdyYWRlIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtIHtuZXQuU29ja2V0fSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBoYW5kbGVVcGdyYWRlKHJlcSwgc29ja2V0LCBoZWFkLCBjYikge1xuICAgIHNvY2tldC5vbignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIGNvbnN0IGtleSA9XG4gICAgICByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1rZXknXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQta2V5J10udHJpbSgpXG4gICAgICAgIDogZmFsc2U7XG4gICAgY29uc3QgdmVyc2lvbiA9ICtyZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC12ZXJzaW9uJ107XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IHt9O1xuXG4gICAgaWYgKFxuICAgICAgcmVxLm1ldGhvZCAhPT0gJ0dFVCcgfHxcbiAgICAgIHJlcS5oZWFkZXJzLnVwZ3JhZGUudG9Mb3dlckNhc2UoKSAhPT0gJ3dlYnNvY2tldCcgfHxcbiAgICAgICFrZXkgfHxcbiAgICAgICFrZXlSZWdleC50ZXN0KGtleSkgfHxcbiAgICAgICh2ZXJzaW9uICE9PSA4ICYmIHZlcnNpb24gIT09IDEzKSB8fFxuICAgICAgIXRoaXMuc2hvdWxkSGFuZGxlKHJlcSlcbiAgICApIHtcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSBuZXcgUGVyTWVzc2FnZURlZmxhdGUoXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heFBheWxvYWRcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9mZmVycyA9IHBhcnNlKHJlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWV4dGVuc2lvbnMnXSk7XG5cbiAgICAgICAgaWYgKG9mZmVyc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLmFjY2VwdChvZmZlcnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pO1xuICAgICAgICAgIGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0gPSBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBPcHRpb25hbGx5IGNhbGwgZXh0ZXJuYWwgY2xpZW50IHZlcmlmaWNhdGlvbiBoYW5kbGVyLlxuICAgIC8vXG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgIG9yaWdpbjpcbiAgICAgICAgICByZXEuaGVhZGVyc1tgJHt2ZXJzaW9uID09PSA4ID8gJ3NlYy13ZWJzb2NrZXQtb3JpZ2luJyA6ICdvcmlnaW4nfWBdLFxuICAgICAgICBzZWN1cmU6ICEhKHJlcS5jb25uZWN0aW9uLmF1dGhvcml6ZWQgfHwgcmVxLmNvbm5lY3Rpb24uZW5jcnlwdGVkKSxcbiAgICAgICAgcmVxXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnZlcmlmeUNsaWVudC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnZlcmlmeUNsaWVudChpbmZvLCAodmVyaWZpZWQsIGNvZGUsIG1lc3NhZ2UsIGhlYWRlcnMpID0+IHtcbiAgICAgICAgICBpZiAoIXZlcmlmaWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCBjb2RlIHx8IDQwMSwgbWVzc2FnZSwgaGVhZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZVVwZ3JhZGUoa2V5LCBleHRlbnNpb25zLCByZXEsIHNvY2tldCwgaGVhZCwgY2IpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQoaW5mbykpIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21wbGV0ZVVwZ3JhZGUoa2V5LCBleHRlbnNpb25zLCByZXEsIHNvY2tldCwgaGVhZCwgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZ3JhZGUgdGhlIGNvbm5lY3Rpb24gdG8gV2ViU29ja2V0LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSB2YWx1ZSBvZiB0aGUgYFNlYy1XZWJTb2NrZXQtS2V5YCBoZWFkZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgVGhlIGFjY2VwdGVkIGV4dGVuc2lvbnNcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFRoZSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGUgc2VydmVyIGFuZCBjbGllbnRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGhlYWQgVGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgdXBncmFkZWQgc3RyZWFtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBjYWxsZWQgbW9yZSB0aGFuIG9uY2Ugd2l0aCB0aGUgc2FtZSBzb2NrZXRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbXBsZXRlVXBncmFkZShrZXksIGV4dGVuc2lvbnMsIHJlcSwgc29ja2V0LCBoZWFkLCBjYikge1xuICAgIC8vXG4gICAgLy8gRGVzdHJveSB0aGUgc29ja2V0IGlmIHRoZSBjbGllbnQgaGFzIGFscmVhZHkgc2VudCBhIEZJTiBwYWNrZXQuXG4gICAgLy9cbiAgICBpZiAoIXNvY2tldC5yZWFkYWJsZSB8fCAhc29ja2V0LndyaXRhYmxlKSByZXR1cm4gc29ja2V0LmRlc3Ryb3koKTtcblxuICAgIGlmIChzb2NrZXRba1dlYlNvY2tldF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ3NlcnZlci5oYW5kbGVVcGdyYWRlKCkgd2FzIGNhbGxlZCBtb3JlIHRoYW4gb25jZSB3aXRoIHRoZSBzYW1lICcgK1xuICAgICAgICAgICdzb2NrZXQsIHBvc3NpYmx5IGR1ZSB0byBhIG1pc2NvbmZpZ3VyYXRpb24nXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRpZ2VzdCA9IGNyZWF0ZUhhc2goJ3NoYTEnKVxuICAgICAgLnVwZGF0ZShrZXkgKyBHVUlEKVxuICAgICAgLmRpZ2VzdCgnYmFzZTY0Jyk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gW1xuICAgICAgJ0hUVFAvMS4xIDEwMSBTd2l0Y2hpbmcgUHJvdG9jb2xzJyxcbiAgICAgICdVcGdyYWRlOiB3ZWJzb2NrZXQnLFxuICAgICAgJ0Nvbm5lY3Rpb246IFVwZ3JhZGUnLFxuICAgICAgYFNlYy1XZWJTb2NrZXQtQWNjZXB0OiAke2RpZ2VzdH1gXG4gICAgXTtcblxuICAgIGNvbnN0IHdzID0gbmV3IFdlYlNvY2tldChudWxsKTtcbiAgICBsZXQgcHJvdG9jb2wgPSByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1wcm90b2NvbCddO1xuXG4gICAgaWYgKHByb3RvY29sKSB7XG4gICAgICBwcm90b2NvbCA9IHByb3RvY29sLnRyaW0oKS5zcGxpdCgvICosICovKTtcblxuICAgICAgLy9cbiAgICAgIC8vIE9wdGlvbmFsbHkgY2FsbCBleHRlcm5hbCBwcm90b2NvbCBzZWxlY3Rpb24gaGFuZGxlci5cbiAgICAgIC8vXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZVByb3RvY29scykge1xuICAgICAgICBwcm90b2NvbCA9IHRoaXMub3B0aW9ucy5oYW5kbGVQcm90b2NvbHMocHJvdG9jb2wsIHJlcSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm90b2NvbCA9IHByb3RvY29sWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvdG9jb2wpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKGBTZWMtV2ViU29ja2V0LVByb3RvY29sOiAke3Byb3RvY29sfWApO1xuICAgICAgICB3cy5wcm90b2NvbCA9IHByb3RvY29sO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdLnBhcmFtcztcbiAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0KHtcbiAgICAgICAgW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdOiBbcGFyYW1zXVxuICAgICAgfSk7XG4gICAgICBoZWFkZXJzLnB1c2goYFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9uczogJHt2YWx1ZX1gKTtcbiAgICAgIHdzLl9leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIEFsbG93IGV4dGVybmFsIG1vZGlmaWNhdGlvbi9pbnNwZWN0aW9uIG9mIGhhbmRzaGFrZSBoZWFkZXJzLlxuICAgIC8vXG4gICAgdGhpcy5lbWl0KCdoZWFkZXJzJywgaGVhZGVycywgcmVxKTtcblxuICAgIHNvY2tldC53cml0ZShoZWFkZXJzLmNvbmNhdCgnXFxyXFxuJykuam9pbignXFxyXFxuJykpO1xuICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIHdzLnNldFNvY2tldChzb2NrZXQsIGhlYWQsIHRoaXMub3B0aW9ucy5tYXhQYXlsb2FkKTtcblxuICAgIGlmICh0aGlzLmNsaWVudHMpIHtcbiAgICAgIHRoaXMuY2xpZW50cy5hZGQod3MpO1xuICAgICAgd3Mub24oJ2Nsb3NlJywgKCkgPT4gdGhpcy5jbGllbnRzLmRlbGV0ZSh3cykpO1xuICAgIH1cblxuICAgIGNiKHdzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldFNlcnZlcjtcblxuLyoqXG4gKiBBZGQgZXZlbnQgbGlzdGVuZXJzIG9uIGFuIGBFdmVudEVtaXR0ZXJgIHVzaW5nIGEgbWFwIG9mIDxldmVudCwgbGlzdGVuZXI+XG4gKiBwYWlycy5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gc2VydmVyIFRoZSBldmVudCBlbWl0dGVyXG4gKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBGdW5jdGlvbj59IG1hcCBUaGUgbGlzdGVuZXJzIHRvIGFkZFxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbW92ZSB0aGUgYWRkZWQgbGlzdGVuZXJzIHdoZW4gY2FsbGVkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2VydmVyLCBtYXApIHtcbiAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3Qua2V5cyhtYXApKSBzZXJ2ZXIub24oZXZlbnQsIG1hcFtldmVudF0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3Qua2V5cyhtYXApKSB7XG4gICAgICBzZXJ2ZXIucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIG1hcFtldmVudF0pO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBFbWl0IGEgYCdjbG9zZSdgIGV2ZW50IG9uIGFuIGBFdmVudEVtaXR0ZXJgLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBzZXJ2ZXIgVGhlIGV2ZW50IGVtaXR0ZXJcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVtaXRDbG9zZShzZXJ2ZXIpIHtcbiAgc2VydmVyLmVtaXQoJ2Nsb3NlJyk7XG59XG5cbi8qKlxuICogSGFuZGxlIHByZW1hdHVyZSBzb2NrZXQgZXJyb3JzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRXJyb3IoKSB7XG4gIHRoaXMuZGVzdHJveSgpO1xufVxuXG4vKipcbiAqIENsb3NlIHRoZSBjb25uZWN0aW9uIHdoZW4gcHJlY29uZGl0aW9ucyBhcmUgbm90IGZ1bGZpbGxlZC5cbiAqXG4gKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IG9mIHRoZSB1cGdyYWRlIHJlcXVlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBIVFRQIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdIFRoZSBIVFRQIHJlc3BvbnNlIGJvZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc10gQWRkaXRpb25hbCBIVFRQIHJlc3BvbnNlIGhlYWRlcnNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgY29kZSwgbWVzc2FnZSwgaGVhZGVycykge1xuICBpZiAoc29ja2V0LndyaXRhYmxlKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgU1RBVFVTX0NPREVTW2NvZGVdO1xuICAgIGhlYWRlcnMgPSB7XG4gICAgICBDb25uZWN0aW9uOiAnY2xvc2UnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnLFxuICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogQnVmZmVyLmJ5dGVMZW5ndGgobWVzc2FnZSksXG4gICAgICAuLi5oZWFkZXJzXG4gICAgfTtcblxuICAgIHNvY2tldC53cml0ZShcbiAgICAgIGBIVFRQLzEuMSAke2NvZGV9ICR7U1RBVFVTX0NPREVTW2NvZGVdfVxcclxcbmAgK1xuICAgICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKVxuICAgICAgICAgIC5tYXAoKGgpID0+IGAke2h9OiAke2hlYWRlcnNbaF19YClcbiAgICAgICAgICAuam9pbignXFxyXFxuJykgK1xuICAgICAgICAnXFxyXFxuXFxyXFxuJyArXG4gICAgICAgIG1lc3NhZ2VcbiAgICApO1xuICB9XG5cbiAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuICBzb2NrZXQuZGVzdHJveSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBuZXQgPSByZXF1aXJlKCduZXQnKTtcbmNvbnN0IHRscyA9IHJlcXVpcmUoJ3RscycpO1xuY29uc3QgeyByYW5kb21CeXRlcywgY3JlYXRlSGFzaCB9ID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5jb25zdCB7IFVSTCB9ID0gcmVxdWlyZSgndXJsJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IFJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlcicpO1xuY29uc3QgU2VuZGVyID0gcmVxdWlyZSgnLi9zZW5kZXInKTtcbmNvbnN0IHtcbiAgQklOQVJZX1RZUEVTLFxuICBFTVBUWV9CVUZGRVIsXG4gIEdVSUQsXG4gIGtTdGF0dXNDb2RlLFxuICBrV2ViU29ja2V0LFxuICBOT09QXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHsgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lciB9ID0gcmVxdWlyZSgnLi9ldmVudC10YXJnZXQnKTtcbmNvbnN0IHsgZm9ybWF0LCBwYXJzZSB9ID0gcmVxdWlyZSgnLi9leHRlbnNpb24nKTtcbmNvbnN0IHsgdG9CdWZmZXIgfSA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcblxuY29uc3QgcmVhZHlTdGF0ZXMgPSBbJ0NPTk5FQ1RJTkcnLCAnT1BFTicsICdDTE9TSU5HJywgJ0NMT1NFRCddO1xuY29uc3QgcHJvdG9jb2xWZXJzaW9ucyA9IFs4LCAxM107XG5jb25zdCBjbG9zZVRpbWVvdXQgPSAzMCAqIDEwMDA7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgV2ViU29ja2V0LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICovXG5jbGFzcyBXZWJTb2NrZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBXZWJTb2NrZXRgLlxuICAgKlxuICAgKiBAcGFyYW0geyhTdHJpbmd8dXJsLlVSTCl9IGFkZHJlc3MgVGhlIFVSTCB0byB3aGljaCB0byBjb25uZWN0XG4gICAqIEBwYXJhbSB7KFN0cmluZ3xTdHJpbmdbXSl9IHByb3RvY29scyBUaGUgc3VicHJvdG9jb2xzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbm5lY3Rpb24gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoYWRkcmVzcywgcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICAgIHRoaXMucHJvdG9jb2wgPSAnJztcblxuICAgIHRoaXMuX2JpbmFyeVR5cGUgPSBCSU5BUllfVFlQRVNbMF07XG4gICAgdGhpcy5fY2xvc2VGcmFtZVJlY2VpdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VGcmFtZVNlbnQgPSBmYWxzZTtcbiAgICB0aGlzLl9jbG9zZU1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLl9jbG9zZVRpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9jbG9zZUNvZGUgPSAxMDA2O1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSB7fTtcbiAgICB0aGlzLl9yZWNlaXZlciA9IG51bGw7XG4gICAgdGhpcy5fc2VuZGVyID0gbnVsbDtcbiAgICB0aGlzLl9zb2NrZXQgPSBudWxsO1xuXG4gICAgaWYgKGFkZHJlc3MgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ID0gMDtcbiAgICAgIHRoaXMuX2lzU2VydmVyID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZWRpcmVjdHMgPSAwO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm90b2NvbHMpKSB7XG4gICAgICAgIHByb3RvY29scyA9IHByb3RvY29scy5qb2luKCcsICcpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvdG9jb2xzID09PSAnb2JqZWN0JyAmJiBwcm90b2NvbHMgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IHByb3RvY29scztcbiAgICAgICAgcHJvdG9jb2xzID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpbml0QXNDbGllbnQodGhpcywgYWRkcmVzcywgcHJvdG9jb2xzLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNTZXJ2ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBDT05ORUNUSU5HKCkge1xuICAgIHJldHVybiBXZWJTb2NrZXQuQ09OTkVDVElORztcbiAgfVxuICBnZXQgQ0xPU0lORygpIHtcbiAgICByZXR1cm4gV2ViU29ja2V0LkNMT1NJTkc7XG4gIH1cbiAgZ2V0IENMT1NFRCgpIHtcbiAgICByZXR1cm4gV2ViU29ja2V0LkNMT1NFRDtcbiAgfVxuICBnZXQgT1BFTigpIHtcbiAgICByZXR1cm4gV2ViU29ja2V0Lk9QRU47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBkZXZpYXRlcyBmcm9tIHRoZSBXSEFUV0cgaW50ZXJmYWNlIHNpbmNlIHdzIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcbiAgICogcmVxdWlyZWQgZGVmYXVsdCBcImJsb2JcIiB0eXBlIChpbnN0ZWFkIHdlIGRlZmluZSBhIGN1c3RvbSBcIm5vZGVidWZmZXJcIlxuICAgKiB0eXBlKS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCBiaW5hcnlUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlUeXBlO1xuICB9XG5cbiAgc2V0IGJpbmFyeVR5cGUodHlwZSkge1xuICAgIGlmICghQklOQVJZX1RZUEVTLmluY2x1ZGVzKHR5cGUpKSByZXR1cm47XG5cbiAgICB0aGlzLl9iaW5hcnlUeXBlID0gdHlwZTtcblxuICAgIC8vXG4gICAgLy8gQWxsb3cgdG8gY2hhbmdlIGBiaW5hcnlUeXBlYCBvbiB0aGUgZmx5LlxuICAgIC8vXG4gICAgaWYgKHRoaXMuX3JlY2VpdmVyKSB0aGlzLl9yZWNlaXZlci5fYmluYXJ5VHlwZSA9IHR5cGU7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBidWZmZXJlZEFtb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkgcmV0dXJuIHRoaXMuX2J1ZmZlcmVkQW1vdW50O1xuXG4gICAgLy9cbiAgICAvLyBgc29ja2V0LmJ1ZmZlclNpemVgIGlzIGB1bmRlZmluZWRgIGlmIHRoZSBzb2NrZXQgaXMgY2xvc2VkLlxuICAgIC8vXG4gICAgcmV0dXJuICh0aGlzLl9zb2NrZXQuYnVmZmVyU2l6ZSB8fCAwKSArIHRoaXMuX3NlbmRlci5fYnVmZmVyZWRCeXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IGV4dGVuc2lvbnMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2V4dGVuc2lvbnMpLmpvaW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXAgdGhlIHNvY2tldCBhbmQgdGhlIGludGVybmFsIHJlc291cmNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtuZXQuU29ja2V0fSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4UGF5bG9hZCBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2Ugc2l6ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0U29ja2V0KHNvY2tldCwgaGVhZCwgbWF4UGF5bG9hZCkge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gbmV3IFJlY2VpdmVyKFxuICAgICAgdGhpcy5fYmluYXJ5VHlwZSxcbiAgICAgIHRoaXMuX2V4dGVuc2lvbnMsXG4gICAgICB0aGlzLl9pc1NlcnZlcixcbiAgICAgIG1heFBheWxvYWRcbiAgICApO1xuXG4gICAgdGhpcy5fc2VuZGVyID0gbmV3IFNlbmRlcihzb2NrZXQsIHRoaXMuX2V4dGVuc2lvbnMpO1xuICAgIHRoaXMuX3JlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgdGhpcy5fc29ja2V0ID0gc29ja2V0O1xuXG4gICAgcmVjZWl2ZXJba1dlYlNvY2tldF0gPSB0aGlzO1xuICAgIHNvY2tldFtrV2ViU29ja2V0XSA9IHRoaXM7XG5cbiAgICByZWNlaXZlci5vbignY29uY2x1ZGUnLCByZWNlaXZlck9uQ29uY2x1ZGUpO1xuICAgIHJlY2VpdmVyLm9uKCdkcmFpbicsIHJlY2VpdmVyT25EcmFpbik7XG4gICAgcmVjZWl2ZXIub24oJ2Vycm9yJywgcmVjZWl2ZXJPbkVycm9yKTtcbiAgICByZWNlaXZlci5vbignbWVzc2FnZScsIHJlY2VpdmVyT25NZXNzYWdlKTtcbiAgICByZWNlaXZlci5vbigncGluZycsIHJlY2VpdmVyT25QaW5nKTtcbiAgICByZWNlaXZlci5vbigncG9uZycsIHJlY2VpdmVyT25Qb25nKTtcblxuICAgIHNvY2tldC5zZXRUaW1lb3V0KDApO1xuICAgIHNvY2tldC5zZXROb0RlbGF5KCk7XG5cbiAgICBpZiAoaGVhZC5sZW5ndGggPiAwKSBzb2NrZXQudW5zaGlmdChoZWFkKTtcblxuICAgIHNvY2tldC5vbignY2xvc2UnLCBzb2NrZXRPbkNsb3NlKTtcbiAgICBzb2NrZXQub24oJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICAgIHNvY2tldC5vbignZW5kJywgc29ja2V0T25FbmQpO1xuICAgIHNvY2tldC5vbignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5PUEVOO1xuICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgdGhlIGAnY2xvc2UnYCBldmVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGVtaXRDbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRDtcbiAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCB0aGlzLl9jbG9zZUNvZGUsIHRoaXMuX2Nsb3NlTWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0uY2xlYW51cCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG4gICAgdGhpcy5lbWl0KCdjbG9zZScsIHRoaXMuX2Nsb3NlQ29kZSwgdGhpcy5fY2xvc2VNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIGNsb3NpbmcgaGFuZHNoYWtlLlxuICAgKlxuICAgKiAgICAgICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0rXG4gICAqICAgICAtIC0gLXx3cy5jbG9zZSgpfC0tPnxjbG9zZSBmcmFtZXwtLT58d3MuY2xvc2UoKXwtIC0gLVxuICAgKiAgICB8ICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0rICAgICB8XG4gICAqICAgICAgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICAgICAgICB8XG4gICAqIENMT1NJTkcgIHx3cy5jbG9zZSgpfDwtLXxjbG9zZSBmcmFtZXw8LS0rLS0tLS0rICAgICAgIENMT1NJTkdcbiAgICogICAgICAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgIHxcbiAgICogICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHwgICArLS0tKyAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tPnxmaW58IC0gLSAtIC1cbiAgICogICAgfCAgICAgICAgICstLS0rICAgICAgICAgICAgICAgICAgICAgIHwgICArLS0tK1xuICAgKiAgICAgLSAtIC0gLSAtfGZpbnw8LS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiAgICAgICAgICAgICAgKy0tLStcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgU3RhdHVzIGNvZGUgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBBIHN0cmluZyBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBjbG9zaW5nXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKSByZXR1cm47XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdXZWJTb2NrZXQgd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkJztcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZSh0aGlzLCB0aGlzLl9yZXEsIG1zZyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NJTkcpIHtcbiAgICAgIGlmICh0aGlzLl9jbG9zZUZyYW1lU2VudCAmJiB0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQpIHRoaXMuX3NvY2tldC5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICB0aGlzLl9zZW5kZXIuY2xvc2UoY29kZSwgZGF0YSwgIXRoaXMuX2lzU2VydmVyLCAoZXJyKSA9PiB7XG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBlcnJvciBpcyBoYW5kbGVkIGJ5IHRoZSBgJ2Vycm9yJ2AgbGlzdGVuZXIgb24gdGhlIHNvY2tldC4gV2Ugb25seVxuICAgICAgLy8gd2FudCB0byBrbm93IGlmIHRoZSBjbG9zZSBmcmFtZSBoYXMgYmVlbiBzZW50IGhlcmUuXG4gICAgICAvL1xuICAgICAgaWYgKGVycikgcmV0dXJuO1xuXG4gICAgICB0aGlzLl9jbG9zZUZyYW1lU2VudCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5fY2xvc2VGcmFtZVJlY2VpdmVkKSB0aGlzLl9zb2NrZXQuZW5kKCk7XG4gICAgfSk7XG5cbiAgICAvL1xuICAgIC8vIFNwZWNpZnkgYSB0aW1lb3V0IGZvciB0aGUgY2xvc2luZyBoYW5kc2hha2UgdG8gY29tcGxldGUuXG4gICAgLy9cbiAgICB0aGlzLl9jbG9zZVRpbWVyID0gc2V0VGltZW91dChcbiAgICAgIHRoaXMuX3NvY2tldC5kZXN0cm95LmJpbmQodGhpcy5fc29ja2V0KSxcbiAgICAgIGNsb3NlVGltZW91dFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIHBpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2sgd2hpY2ggaXMgZXhlY3V0ZWQgd2hlbiB0aGUgcGluZyBpcyBzZW50XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBpbmcoZGF0YSwgbWFzaywgY2IpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgMCAoQ09OTkVDVElORyknKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gZGF0YTtcbiAgICAgIGRhdGEgPSBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hc2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gbWFzaztcbiAgICAgIG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICBzZW5kQWZ0ZXJDbG9zZSh0aGlzLCBkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1hc2sgPT09IHVuZGVmaW5lZCkgbWFzayA9ICF0aGlzLl9pc1NlcnZlcjtcbiAgICB0aGlzLl9zZW5kZXIucGluZyhkYXRhIHx8IEVNUFRZX0JVRkZFUiwgbWFzaywgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBwb25nLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIGRhdGEgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrIHdoaWNoIGlzIGV4ZWN1dGVkIHdoZW4gdGhlIHBvbmcgaXMgc2VudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBwb25nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlIDAgKENPTk5FQ1RJTkcpJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IGRhdGE7XG4gICAgICBkYXRhID0gbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG1hc2s7XG4gICAgICBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgc2VuZEFmdGVyQ2xvc2UodGhpcywgZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtYXNrID09PSB1bmRlZmluZWQpIG1hc2sgPSAhdGhpcy5faXNTZXJ2ZXI7XG4gICAgdGhpcy5fc2VuZGVyLnBvbmcoZGF0YSB8fCBFTVBUWV9CVUZGRVIsIG1hc2ssIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgZGF0YSBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuY29tcHJlc3MgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGNvbXByZXNzXG4gICAqICAgICBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmJpbmFyeSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgaXMgYmluYXJ5IG9yIHRleHRcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZpbiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZnJhZ21lbnQgaXMgdGhlIGxhc3Qgb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5tYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIGRhdGEgaXMgd3JpdHRlbiBvdXRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2VuZChkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgc2VuZEFmdGVyQ2xvc2UodGhpcywgZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBiaW5hcnk6IHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyxcbiAgICAgIG1hc2s6ICF0aGlzLl9pc1NlcnZlcixcbiAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgZmluOiB0cnVlLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kZXIuc2VuZChkYXRhIHx8IEVNUFRZX0JVRkZFUiwgb3B0cywgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNpYmx5IGNsb3NlIHRoZSBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0ZXJtaW5hdGUoKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NFRCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICBjb25zdCBtc2cgPSAnV2ViU29ja2V0IHdhcyBjbG9zZWQgYmVmb3JlIHRoZSBjb25uZWN0aW9uIHdhcyBlc3RhYmxpc2hlZCc7XG4gICAgICByZXR1cm4gYWJvcnRIYW5kc2hha2UodGhpcywgdGhpcy5fcmVxLCBtc2cpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zb2NrZXQpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgICAgdGhpcy5fc29ja2V0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxucmVhZHlTdGF0ZXMuZm9yRWFjaCgocmVhZHlTdGF0ZSwgaSkgPT4ge1xuICBXZWJTb2NrZXRbcmVhZHlTdGF0ZV0gPSBpO1xufSk7XG5cbi8vXG4vLyBBZGQgdGhlIGBvbm9wZW5gLCBgb25lcnJvcmAsIGBvbmNsb3NlYCwgYW5kIGBvbm1lc3NhZ2VgIGF0dHJpYnV0ZXMuXG4vLyBTZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvY29tbXMuaHRtbCN0aGUtd2Vic29ja2V0LWludGVyZmFjZVxuLy9cblsnb3BlbicsICdlcnJvcicsICdjbG9zZScsICdtZXNzYWdlJ10uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCBgb24ke21ldGhvZH1gLCB7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBsaXN0ZW5lciBvZiB0aGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsoRnVuY3Rpb258dW5kZWZpbmVkKX0gVGhlIGV2ZW50IGxpc3RlbmVyIG9yIGB1bmRlZmluZWRgXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzKG1ldGhvZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdGVuZXJzW2ldLl9saXN0ZW5lcikgcmV0dXJuIGxpc3RlbmVyc1tpXS5fbGlzdGVuZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBBZGQgYSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIGFkZFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzZXQobGlzdGVuZXIpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzKG1ldGhvZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvL1xuICAgICAgICAvLyBSZW1vdmUgb25seSB0aGUgbGlzdGVuZXJzIGFkZGVkIHZpYSBgYWRkRXZlbnRMaXN0ZW5lcmAuXG4gICAgICAgIC8vXG4gICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uX2xpc3RlbmVyKSB0aGlzLnJlbW92ZUxpc3RlbmVyKG1ldGhvZCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2QsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbldlYlNvY2tldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5XZWJTb2NrZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldDtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgV2ViU29ja2V0IGNsaWVudC5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBjbGllbnQgdG8gaW5pdGlhbGl6ZVxuICogQHBhcmFtIHsoU3RyaW5nfHVybC5VUkwpfSBhZGRyZXNzIFRoZSBVUkwgdG8gd2hpY2ggdG8gY29ubmVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29scyBUaGUgc3VicHJvdG9jb2xzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBwYXJhbSB7KEJvb2xlYW58T2JqZWN0KX0gb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSBFbmFibGUvZGlzYWJsZVxuICogICAgIHBlcm1lc3NhZ2UtZGVmbGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaGFuZHNoYWtlVGltZW91dCBUaW1lb3V0IGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlXG4gKiAgICAgaGFuZHNoYWtlIHJlcXVlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnByb3RvY29sVmVyc2lvbiBWYWx1ZSBvZiB0aGUgYFNlYy1XZWJTb2NrZXQtVmVyc2lvbmBcbiAqICAgICBoZWFkZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLm9yaWdpbiBWYWx1ZSBvZiB0aGUgYE9yaWdpbmAgb3JcbiAqICAgICBgU2VjLVdlYlNvY2tldC1PcmlnaW5gIGhlYWRlclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4UGF5bG9hZCBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2Ugc2l6ZVxuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZvbGxvd1JlZGlyZWN0cyBXaGV0aGVyIG9yIG5vdCB0byBmb2xsb3cgcmVkaXJlY3RzXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhSZWRpcmVjdHMgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlZGlyZWN0cyBhbGxvd2VkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbml0QXNDbGllbnQod2Vic29ja2V0LCBhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBwcm90b2NvbFZlcnNpb246IHByb3RvY29sVmVyc2lvbnNbMV0sXG4gICAgbWF4UGF5bG9hZDogMTAwICogMTAyNCAqIDEwMjQsXG4gICAgcGVyTWVzc2FnZURlZmxhdGU6IHRydWUsXG4gICAgZm9sbG93UmVkaXJlY3RzOiBmYWxzZSxcbiAgICBtYXhSZWRpcmVjdHM6IDEwLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgY3JlYXRlQ29ubmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHNvY2tldFBhdGg6IHVuZGVmaW5lZCxcbiAgICBob3N0bmFtZTogdW5kZWZpbmVkLFxuICAgIHByb3RvY29sOiB1bmRlZmluZWQsXG4gICAgdGltZW91dDogdW5kZWZpbmVkLFxuICAgIG1ldGhvZDogdW5kZWZpbmVkLFxuICAgIGhvc3Q6IHVuZGVmaW5lZCxcbiAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgcG9ydDogdW5kZWZpbmVkXG4gIH07XG5cbiAgaWYgKCFwcm90b2NvbFZlcnNpb25zLmluY2x1ZGVzKG9wdHMucHJvdG9jb2xWZXJzaW9uKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgYFVuc3VwcG9ydGVkIHByb3RvY29sIHZlcnNpb246ICR7b3B0cy5wcm90b2NvbFZlcnNpb259IGAgK1xuICAgICAgICBgKHN1cHBvcnRlZCB2ZXJzaW9uczogJHtwcm90b2NvbFZlcnNpb25zLmpvaW4oJywgJyl9KWBcbiAgICApO1xuICB9XG5cbiAgbGV0IHBhcnNlZFVybDtcblxuICBpZiAoYWRkcmVzcyBpbnN0YW5jZW9mIFVSTCkge1xuICAgIHBhcnNlZFVybCA9IGFkZHJlc3M7XG4gICAgd2Vic29ja2V0LnVybCA9IGFkZHJlc3MuaHJlZjtcbiAgfSBlbHNlIHtcbiAgICBwYXJzZWRVcmwgPSBuZXcgVVJMKGFkZHJlc3MpO1xuICAgIHdlYnNvY2tldC51cmwgPSBhZGRyZXNzO1xuICB9XG5cbiAgY29uc3QgaXNVbml4U29ja2V0ID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3MrdW5peDonO1xuXG4gIGlmICghcGFyc2VkVXJsLmhvc3QgJiYgKCFpc1VuaXhTb2NrZXQgfHwgIXBhcnNlZFVybC5wYXRobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgVVJMOiAke3dlYnNvY2tldC51cmx9YCk7XG4gIH1cblxuICBjb25zdCBpc1NlY3VyZSA9XG4gICAgcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3NzOicgfHwgcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgY29uc3QgZGVmYXVsdFBvcnQgPSBpc1NlY3VyZSA/IDQ0MyA6IDgwO1xuICBjb25zdCBrZXkgPSByYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBjb25zdCBnZXQgPSBpc1NlY3VyZSA/IGh0dHBzLmdldCA6IGh0dHAuZ2V0O1xuICBsZXQgcGVyTWVzc2FnZURlZmxhdGU7XG5cbiAgb3B0cy5jcmVhdGVDb25uZWN0aW9uID0gaXNTZWN1cmUgPyB0bHNDb25uZWN0IDogbmV0Q29ubmVjdDtcbiAgb3B0cy5kZWZhdWx0UG9ydCA9IG9wdHMuZGVmYXVsdFBvcnQgfHwgZGVmYXVsdFBvcnQ7XG4gIG9wdHMucG9ydCA9IHBhcnNlZFVybC5wb3J0IHx8IGRlZmF1bHRQb3J0O1xuICBvcHRzLmhvc3QgPSBwYXJzZWRVcmwuaG9zdG5hbWUuc3RhcnRzV2l0aCgnWycpXG4gICAgPyBwYXJzZWRVcmwuaG9zdG5hbWUuc2xpY2UoMSwgLTEpXG4gICAgOiBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gIG9wdHMuaGVhZGVycyA9IHtcbiAgICAnU2VjLVdlYlNvY2tldC1WZXJzaW9uJzogb3B0cy5wcm90b2NvbFZlcnNpb24sXG4gICAgJ1NlYy1XZWJTb2NrZXQtS2V5Jzoga2V5LFxuICAgIENvbm5lY3Rpb246ICdVcGdyYWRlJyxcbiAgICBVcGdyYWRlOiAnd2Vic29ja2V0JyxcbiAgICAuLi5vcHRzLmhlYWRlcnNcbiAgfTtcbiAgb3B0cy5wYXRoID0gcGFyc2VkVXJsLnBhdGhuYW1lICsgcGFyc2VkVXJsLnNlYXJjaDtcbiAgb3B0cy50aW1lb3V0ID0gb3B0cy5oYW5kc2hha2VUaW1lb3V0O1xuXG4gIGlmIChvcHRzLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgcGVyTWVzc2FnZURlZmxhdGUgPSBuZXcgUGVyTWVzc2FnZURlZmxhdGUoXG4gICAgICBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlICE9PSB0cnVlID8gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA6IHt9LFxuICAgICAgZmFsc2UsXG4gICAgICBvcHRzLm1heFBheWxvYWRcbiAgICApO1xuICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zJ10gPSBmb3JtYXQoe1xuICAgICAgW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdOiBwZXJNZXNzYWdlRGVmbGF0ZS5vZmZlcigpXG4gICAgfSk7XG4gIH1cbiAgaWYgKHByb3RvY29scykge1xuICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1Qcm90b2NvbCddID0gcHJvdG9jb2xzO1xuICB9XG4gIGlmIChvcHRzLm9yaWdpbikge1xuICAgIGlmIChvcHRzLnByb3RvY29sVmVyc2lvbiA8IDEzKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtT3JpZ2luJ10gPSBvcHRzLm9yaWdpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5oZWFkZXJzLk9yaWdpbiA9IG9wdHMub3JpZ2luO1xuICAgIH1cbiAgfVxuICBpZiAocGFyc2VkVXJsLnVzZXJuYW1lIHx8IHBhcnNlZFVybC5wYXNzd29yZCkge1xuICAgIG9wdHMuYXV0aCA9IGAke3BhcnNlZFVybC51c2VybmFtZX06JHtwYXJzZWRVcmwucGFzc3dvcmR9YDtcbiAgfVxuXG4gIGlmIChpc1VuaXhTb2NrZXQpIHtcbiAgICBjb25zdCBwYXJ0cyA9IG9wdHMucGF0aC5zcGxpdCgnOicpO1xuXG4gICAgb3B0cy5zb2NrZXRQYXRoID0gcGFydHNbMF07XG4gICAgb3B0cy5wYXRoID0gcGFydHNbMV07XG4gIH1cblxuICBsZXQgcmVxID0gKHdlYnNvY2tldC5fcmVxID0gZ2V0KG9wdHMpKTtcblxuICBpZiAob3B0cy50aW1lb3V0KSB7XG4gICAgcmVxLm9uKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdPcGVuaW5nIGhhbmRzaGFrZSBoYXMgdGltZWQgb3V0Jyk7XG4gICAgfSk7XG4gIH1cblxuICByZXEub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIGlmICh3ZWJzb2NrZXQuX3JlcS5hYm9ydGVkKSByZXR1cm47XG5cbiAgICByZXEgPSB3ZWJzb2NrZXQuX3JlcSA9IG51bGw7XG4gICAgd2Vic29ja2V0LnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICB3ZWJzb2NrZXQuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIHdlYnNvY2tldC5lbWl0Q2xvc2UoKTtcbiAgfSk7XG5cbiAgcmVxLm9uKCdyZXNwb25zZScsIChyZXMpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHJlcy5oZWFkZXJzLmxvY2F0aW9uO1xuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMuc3RhdHVzQ29kZTtcblxuICAgIGlmIChcbiAgICAgIGxvY2F0aW9uICYmXG4gICAgICBvcHRzLmZvbGxvd1JlZGlyZWN0cyAmJlxuICAgICAgc3RhdHVzQ29kZSA+PSAzMDAgJiZcbiAgICAgIHN0YXR1c0NvZGUgPCA0MDBcbiAgICApIHtcbiAgICAgIGlmICgrK3dlYnNvY2tldC5fcmVkaXJlY3RzID4gb3B0cy5tYXhSZWRpcmVjdHMpIHtcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdNYXhpbXVtIHJlZGlyZWN0cyBleGNlZWRlZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlcS5hYm9ydCgpO1xuXG4gICAgICBjb25zdCBhZGRyID0gbmV3IFVSTChsb2NhdGlvbiwgYWRkcmVzcyk7XG5cbiAgICAgIGluaXRBc0NsaWVudCh3ZWJzb2NrZXQsIGFkZHIsIHByb3RvY29scywgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICghd2Vic29ja2V0LmVtaXQoJ3VuZXhwZWN0ZWQtcmVzcG9uc2UnLCByZXEsIHJlcykpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKFxuICAgICAgICB3ZWJzb2NrZXQsXG4gICAgICAgIHJlcSxcbiAgICAgICAgYFVuZXhwZWN0ZWQgc2VydmVyIHJlc3BvbnNlOiAke3Jlcy5zdGF0dXNDb2RlfWBcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICByZXEub24oJ3VwZ3JhZGUnLCAocmVzLCBzb2NrZXQsIGhlYWQpID0+IHtcbiAgICB3ZWJzb2NrZXQuZW1pdCgndXBncmFkZScsIHJlcyk7XG5cbiAgICAvL1xuICAgIC8vIFRoZSB1c2VyIG1heSBoYXZlIGNsb3NlZCB0aGUgY29ubmVjdGlvbiBmcm9tIGEgbGlzdGVuZXIgb2YgdGhlIGB1cGdyYWRlYFxuICAgIC8vIGV2ZW50LlxuICAgIC8vXG4gICAgaWYgKHdlYnNvY2tldC5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuQ09OTkVDVElORykgcmV0dXJuO1xuXG4gICAgcmVxID0gd2Vic29ja2V0Ll9yZXEgPSBudWxsO1xuXG4gICAgY29uc3QgZGlnZXN0ID0gY3JlYXRlSGFzaCgnc2hhMScpXG4gICAgICAudXBkYXRlKGtleSArIEdVSUQpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGlmIChyZXMuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1hY2NlcHQnXSAhPT0gZGlnZXN0KSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1BY2NlcHQgaGVhZGVyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmVyUHJvdCA9IHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXByb3RvY29sJ107XG4gICAgY29uc3QgcHJvdExpc3QgPSAocHJvdG9jb2xzIHx8ICcnKS5zcGxpdCgvLCAqLyk7XG4gICAgbGV0IHByb3RFcnJvcjtcblxuICAgIGlmICghcHJvdG9jb2xzICYmIHNlcnZlclByb3QpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhIHN1YnByb3RvY29sIGJ1dCBub25lIHdhcyByZXF1ZXN0ZWQnO1xuICAgIH0gZWxzZSBpZiAocHJvdG9jb2xzICYmICFzZXJ2ZXJQcm90KSB7XG4gICAgICBwcm90RXJyb3IgPSAnU2VydmVyIHNlbnQgbm8gc3VicHJvdG9jb2wnO1xuICAgIH0gZWxzZSBpZiAoc2VydmVyUHJvdCAmJiAhcHJvdExpc3QuaW5jbHVkZXMoc2VydmVyUHJvdCkpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhbiBpbnZhbGlkIHN1YnByb3RvY29sJztcbiAgICB9XG5cbiAgICBpZiAocHJvdEVycm9yKSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgcHJvdEVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2VydmVyUHJvdCkgd2Vic29ja2V0LnByb3RvY29sID0gc2VydmVyUHJvdDtcblxuICAgIGlmIChwZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHBhcnNlKHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWV4dGVuc2lvbnMnXSk7XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZS5hY2NlcHQoZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSk7XG4gICAgICAgICAgd2Vic29ja2V0Ll9leHRlbnNpb25zW1xuICAgICAgICAgICAgUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZVxuICAgICAgICAgIF0gPSBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlKFxuICAgICAgICAgIHdlYnNvY2tldCxcbiAgICAgICAgICBzb2NrZXQsXG4gICAgICAgICAgJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zIGhlYWRlcidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdlYnNvY2tldC5zZXRTb2NrZXQoc29ja2V0LCBoZWFkLCBvcHRzLm1heFBheWxvYWQpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgbmV0LlNvY2tldGAgYW5kIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4ge25ldC5Tb2NrZXR9IFRoZSBuZXdseSBjcmVhdGVkIHNvY2tldCB1c2VkIHRvIHN0YXJ0IHRoZSBjb25uZWN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBuZXRDb25uZWN0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5wYXRoID0gb3B0aW9ucy5zb2NrZXRQYXRoO1xuICByZXR1cm4gbmV0LmNvbm5lY3Qob3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYHRscy5UTFNTb2NrZXRgIGFuZCBpbml0aWF0ZSBhIGNvbm5lY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29ubmVjdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJuIHt0bHMuVExTU29ja2V0fSBUaGUgbmV3bHkgY3JlYXRlZCBzb2NrZXQgdXNlZCB0byBzdGFydCB0aGUgY29ubmVjdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdGxzQ29ubmVjdChvcHRpb25zKSB7XG4gIG9wdGlvbnMucGF0aCA9IHVuZGVmaW5lZDtcblxuICBpZiAoIW9wdGlvbnMuc2VydmVybmFtZSAmJiBvcHRpb25zLnNlcnZlcm5hbWUgIT09ICcnKSB7XG4gICAgb3B0aW9ucy5zZXJ2ZXJuYW1lID0gb3B0aW9ucy5ob3N0O1xuICB9XG5cbiAgcmV0dXJuIHRscy5jb25uZWN0KG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEFib3J0IHRoZSBoYW5kc2hha2UgYW5kIGVtaXQgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtXZWJTb2NrZXR9IHdlYnNvY2tldCBUaGUgV2ViU29ja2V0IGluc3RhbmNlXG4gKiBAcGFyYW0geyhodHRwLkNsaWVudFJlcXVlc3R8bmV0LlNvY2tldCl9IHN0cmVhbSBUaGUgcmVxdWVzdCB0byBhYm9ydCBvciB0aGVcbiAqICAgICBzb2NrZXQgdG8gZGVzdHJveVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc3RyZWFtLCBtZXNzYWdlKSB7XG4gIHdlYnNvY2tldC5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG5cbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIGFib3J0SGFuZHNoYWtlKTtcblxuICBpZiAoc3RyZWFtLnNldEhlYWRlcikge1xuICAgIHN0cmVhbS5hYm9ydCgpO1xuICAgIHN0cmVhbS5vbmNlKCdhYm9ydCcsIHdlYnNvY2tldC5lbWl0Q2xvc2UuYmluZCh3ZWJzb2NrZXQpKTtcbiAgICB3ZWJzb2NrZXQuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9IGVsc2Uge1xuICAgIHN0cmVhbS5kZXN0cm95KGVycik7XG4gICAgc3RyZWFtLm9uY2UoJ2Vycm9yJywgd2Vic29ja2V0LmVtaXQuYmluZCh3ZWJzb2NrZXQsICdlcnJvcicpKTtcbiAgICBzdHJlYW0ub25jZSgnY2xvc2UnLCB3ZWJzb2NrZXQuZW1pdENsb3NlLmJpbmQod2Vic29ja2V0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgY2FzZXMgd2hlcmUgdGhlIGBwaW5nKClgLCBgcG9uZygpYCwgb3IgYHNlbmQoKWAgbWV0aG9kcyBhcmUgY2FsbGVkXG4gKiB3aGVuIHRoZSBgcmVhZHlTdGF0ZWAgYXR0cmlidXRlIGlzIGBDTE9TSU5HYCBvciBgQ0xPU0VEYC5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBXZWJTb2NrZXQgaW5zdGFuY2VcbiAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBzZW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2VuZEFmdGVyQ2xvc2Uod2Vic29ja2V0LCBkYXRhLCBjYikge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRvQnVmZmVyKGRhdGEpLmxlbmd0aDtcblxuICAgIC8vXG4gICAgLy8gVGhlIGBfYnVmZmVyZWRBbW91bnRgIHByb3BlcnR5IGlzIHVzZWQgb25seSB3aGVuIHRoZSBwZWVyIGlzIGEgY2xpZW50IGFuZFxuICAgIC8vIHRoZSBvcGVuaW5nIGhhbmRzaGFrZSBmYWlscy4gVW5kZXIgdGhlc2UgY2lyY3Vtc3RhbmNlcywgaW4gZmFjdCwgdGhlXG4gICAgLy8gYHNldFNvY2tldCgpYCBtZXRob2QgaXMgbm90IGNhbGxlZCwgc28gdGhlIGBfc29ja2V0YCBhbmQgYF9zZW5kZXJgXG4gICAgLy8gcHJvcGVydGllcyBhcmUgc2V0IHRvIGBudWxsYC5cbiAgICAvL1xuICAgIGlmICh3ZWJzb2NrZXQuX3NvY2tldCkgd2Vic29ja2V0Ll9zZW5kZXIuX2J1ZmZlcmVkQnl0ZXMgKz0gbGVuZ3RoO1xuICAgIGVsc2Ugd2Vic29ja2V0Ll9idWZmZXJlZEFtb3VudCArPSBsZW5ndGg7XG4gIH1cblxuICBpZiAoY2IpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICBgV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlICR7d2Vic29ja2V0LnJlYWR5U3RhdGV9IGAgK1xuICAgICAgICBgKCR7cmVhZHlTdGF0ZXNbd2Vic29ja2V0LnJlYWR5U3RhdGVdfSlgXG4gICAgKTtcbiAgICBjYihlcnIpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnY29uY2x1ZGUnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY29kZSBUaGUgc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb24gVGhlIHJlYXNvbiBmb3IgY2xvc2luZ1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkNvbmNsdWRlKGNvZGUsIHJlYXNvbikge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5fc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgc29ja2V0T25EYXRhKTtcbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVzdW1lKCk7XG5cbiAgd2Vic29ja2V0Ll9jbG9zZUZyYW1lUmVjZWl2ZWQgPSB0cnVlO1xuICB3ZWJzb2NrZXQuX2Nsb3NlTWVzc2FnZSA9IHJlYXNvbjtcbiAgd2Vic29ja2V0Ll9jbG9zZUNvZGUgPSBjb2RlO1xuXG4gIGlmIChjb2RlID09PSAxMDA1KSB3ZWJzb2NrZXQuY2xvc2UoKTtcbiAgZWxzZSB3ZWJzb2NrZXQuY2xvc2UoY29kZSwgcmVhc29uKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdkcmFpbidgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25EcmFpbigpIHtcbiAgdGhpc1trV2ViU29ja2V0XS5fc29ja2V0LnJlc3VtZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2Vycm9yJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoUmFuZ2VFcnJvcnxFcnJvcil9IGVyciBUaGUgZW1pdHRlZCBlcnJvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkVycm9yKGVycikge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5fc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgc29ja2V0T25EYXRhKTtcblxuICB3ZWJzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuX2Nsb3NlQ29kZSA9IGVycltrU3RhdHVzQ29kZV07XG4gIHdlYnNvY2tldC5lbWl0KCdlcnJvcicsIGVycik7XG4gIHdlYnNvY2tldC5fc29ja2V0LmRlc3Ryb3koKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdmaW5pc2gnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRmluaXNoKCkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXRDbG9zZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ21lc3NhZ2UnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8QnVmZmVyfEFycmF5QnVmZmVyfEJ1ZmZlcltdKX0gZGF0YSBUaGUgbWVzc2FnZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbk1lc3NhZ2UoZGF0YSkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdwaW5nJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgaW5jbHVkZWQgaW4gdGhlIHBpbmcgZnJhbWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25QaW5nKGRhdGEpIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICB3ZWJzb2NrZXQucG9uZyhkYXRhLCAhd2Vic29ja2V0Ll9pc1NlcnZlciwgTk9PUCk7XG4gIHdlYnNvY2tldC5lbWl0KCdwaW5nJywgZGF0YSk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAncG9uZydgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIFRoZSBkYXRhIGluY2x1ZGVkIGluIHRoZSBwb25nIGZyYW1lXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uUG9uZyhkYXRhKSB7XG4gIHRoaXNba1dlYlNvY2tldF0uZW1pdCgncG9uZycsIGRhdGEpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnY2xvc2UnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkNsb3NlKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgc29ja2V0T25DbG9zZSk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHNvY2tldE9uRW5kKTtcblxuICB3ZWJzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuXG4gIC8vXG4gIC8vIFRoZSBjbG9zZSBmcmFtZSBtaWdodCBub3QgaGF2ZSBiZWVuIHJlY2VpdmVkIG9yIHRoZSBgJ2VuZCdgIGV2ZW50IGVtaXR0ZWQsXG4gIC8vIGZvciBleGFtcGxlLCBpZiB0aGUgc29ja2V0IHdhcyBkZXN0cm95ZWQgZHVlIHRvIGFuIGVycm9yLiBFbnN1cmUgdGhhdCB0aGVcbiAgLy8gYHJlY2VpdmVyYCBzdHJlYW0gaXMgY2xvc2VkIGFmdGVyIHdyaXRpbmcgYW55IHJlbWFpbmluZyBidWZmZXJlZCBkYXRhIHRvXG4gIC8vIGl0LiBJZiB0aGUgcmVhZGFibGUgc2lkZSBvZiB0aGUgc29ja2V0IGlzIGluIGZsb3dpbmcgbW9kZSB0aGVuIHRoZXJlIGlzIG5vXG4gIC8vIGJ1ZmZlcmVkIGRhdGEgYXMgZXZlcnl0aGluZyBoYXMgYmVlbiBhbHJlYWR5IHdyaXR0ZW4gYW5kIGByZWFkYWJsZS5yZWFkKClgXG4gIC8vIHdpbGwgcmV0dXJuIGBudWxsYC4gSWYgaW5zdGVhZCwgdGhlIHNvY2tldCBpcyBwYXVzZWQsIGFueSBwb3NzaWJsZSBidWZmZXJlZFxuICAvLyBkYXRhIHdpbGwgYmUgcmVhZCBhcyBhIHNpbmdsZSBjaHVuayBhbmQgZW1pdHRlZCBzeW5jaHJvbm91c2x5IGluIGEgc2luZ2xlXG4gIC8vIGAnZGF0YSdgIGV2ZW50LlxuICAvL1xuICB3ZWJzb2NrZXQuX3NvY2tldC5yZWFkKCk7XG4gIHdlYnNvY2tldC5fcmVjZWl2ZXIuZW5kKCk7XG5cbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIHNvY2tldE9uRGF0YSk7XG4gIHRoaXNba1dlYlNvY2tldF0gPSB1bmRlZmluZWQ7XG5cbiAgY2xlYXJUaW1lb3V0KHdlYnNvY2tldC5fY2xvc2VUaW1lcik7XG5cbiAgaWYgKFxuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgfHxcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZFxuICApIHtcbiAgICB3ZWJzb2NrZXQuZW1pdENsb3NlKCk7XG4gIH0gZWxzZSB7XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5vbignZXJyb3InLCByZWNlaXZlck9uRmluaXNoKTtcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLm9uKCdmaW5pc2gnLCByZWNlaXZlck9uRmluaXNoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZGF0YSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBBIGNodW5rIG9mIGRhdGFcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRGF0YShjaHVuaykge1xuICBpZiAoIXRoaXNba1dlYlNvY2tldF0uX3JlY2VpdmVyLndyaXRlKGNodW5rKSkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZW5kJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25FbmQoKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0LnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgd2Vic29ja2V0Ll9yZWNlaXZlci5lbmQoKTtcbiAgdGhpcy5lbmQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBuZXQuU29ja2V0YCBgJ2Vycm9yJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25FcnJvcigpIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuICB0aGlzLm9uKCdlcnJvcicsIE5PT1ApO1xuXG4gIGlmICh3ZWJzb2NrZXQpIHtcbiAgICB3ZWJzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9