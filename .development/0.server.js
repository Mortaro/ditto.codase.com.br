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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9idWZmZXItdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2V2ZW50LXRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2V4dGVuc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL2xpbWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9wZXJtZXNzYWdlLWRlZmxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9yZWNlaXZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3NlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3MvbGliL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi93ZWJzb2NrZXQtc2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cy9saWIvd2Vic29ja2V0LmpzIl0sIm5hbWVzIjpbIldlYlNvY2tldCIsInJlcXVpcmUiLCJjcmVhdGVXZWJTb2NrZXRTdHJlYW0iLCJTZXJ2ZXIiLCJSZWNlaXZlciIsIlNlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJFTVBUWV9CVUZGRVIiLCJjb25jYXQiLCJsaXN0IiwidG90YWxMZW5ndGgiLCJsZW5ndGgiLCJ0YXJnZXQiLCJCdWZmZXIiLCJhbGxvY1Vuc2FmZSIsIm9mZnNldCIsImkiLCJidWYiLCJzZXQiLCJzbGljZSIsIl9tYXNrIiwic291cmNlIiwibWFzayIsIm91dHB1dCIsIl91bm1hc2siLCJidWZmZXIiLCJ0b0FycmF5QnVmZmVyIiwiYnl0ZUxlbmd0aCIsImJ5dGVPZmZzZXQiLCJ0b0J1ZmZlciIsImRhdGEiLCJyZWFkT25seSIsImlzQnVmZmVyIiwiQXJyYXlCdWZmZXIiLCJmcm9tIiwiaXNWaWV3IiwiYnVmZmVyVXRpbCIsImJ1IiwiQnVmZmVyVXRpbCIsInVubWFzayIsImUiLCJCSU5BUllfVFlQRVMiLCJHVUlEIiwia1N0YXR1c0NvZGUiLCJTeW1ib2wiLCJrV2ViU29ja2V0IiwiYWxsb2MiLCJOT09QIiwiRXZlbnQiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJNZXNzYWdlRXZlbnQiLCJDbG9zZUV2ZW50IiwiY29kZSIsInJlYXNvbiIsIndhc0NsZWFuIiwiX2Nsb3NlRnJhbWVSZWNlaXZlZCIsIl9jbG9zZUZyYW1lU2VudCIsIk9wZW5FdmVudCIsIkVycm9yRXZlbnQiLCJlcnJvciIsIm1lc3NhZ2UiLCJFdmVudFRhcmdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsIm9wdGlvbnMiLCJvbk1lc3NhZ2UiLCJjYWxsIiwib25DbG9zZSIsIm9uRXJyb3IiLCJvbk9wZW4iLCJtZXRob2QiLCJvbmNlIiwiX2xpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVycyIsInJlbW92ZUxpc3RlbmVyIiwidG9rZW5DaGFycyIsInB1c2giLCJkZXN0IiwibmFtZSIsImVsZW0iLCJ1bmRlZmluZWQiLCJwYXJzZSIsImhlYWRlciIsIm9mZmVycyIsIk9iamVjdCIsImNyZWF0ZSIsInBhcmFtcyIsIm11c3RVbmVzY2FwZSIsImlzRXNjYXBpbmciLCJpblF1b3RlcyIsImV4dGVuc2lvbk5hbWUiLCJwYXJhbU5hbWUiLCJzdGFydCIsImVuZCIsImNoYXJDb2RlQXQiLCJTeW50YXhFcnJvciIsInZhbHVlIiwicmVwbGFjZSIsInRva2VuIiwiZm9ybWF0IiwiZXh0ZW5zaW9ucyIsImtleXMiLCJtYXAiLCJleHRlbnNpb24iLCJjb25maWd1cmF0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJ2YWx1ZXMiLCJ2Iiwiam9pbiIsImtEb25lIiwia1J1biIsIkxpbWl0ZXIiLCJjb25jdXJyZW5jeSIsInBlbmRpbmciLCJJbmZpbml0eSIsImpvYnMiLCJhZGQiLCJqb2IiLCJzaGlmdCIsInpsaWIiLCJUUkFJTEVSIiwia1Blck1lc3NhZ2VEZWZsYXRlIiwia1RvdGFsTGVuZ3RoIiwia0NhbGxiYWNrIiwia0J1ZmZlcnMiLCJrRXJyb3IiLCJ6bGliTGltaXRlciIsIlBlck1lc3NhZ2VEZWZsYXRlIiwiaXNTZXJ2ZXIiLCJtYXhQYXlsb2FkIiwiX21heFBheWxvYWQiLCJfb3B0aW9ucyIsIl90aHJlc2hvbGQiLCJ0aHJlc2hvbGQiLCJfaXNTZXJ2ZXIiLCJfZGVmbGF0ZSIsIl9pbmZsYXRlIiwiY29uY3VycmVuY3lMaW1pdCIsIm9mZmVyIiwic2VydmVyTm9Db250ZXh0VGFrZW92ZXIiLCJzZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciIsImNsaWVudE5vQ29udGV4dFRha2VvdmVyIiwiY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXIiLCJzZXJ2ZXJNYXhXaW5kb3dCaXRzIiwic2VydmVyX21heF93aW5kb3dfYml0cyIsImNsaWVudE1heFdpbmRvd0JpdHMiLCJjbGllbnRfbWF4X3dpbmRvd19iaXRzIiwiYWNjZXB0Iiwibm9ybWFsaXplUGFyYW1zIiwiYWNjZXB0QXNTZXJ2ZXIiLCJhY2NlcHRBc0NsaWVudCIsImNsZWFudXAiLCJjbG9zZSIsImNhbGxiYWNrIiwiRXJyb3IiLCJvcHRzIiwiYWNjZXB0ZWQiLCJmaW5kIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwia2V5IiwibnVtIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwiVHlwZUVycm9yIiwiZGVjb21wcmVzcyIsImZpbiIsImRvbmUiLCJfZGVjb21wcmVzcyIsImVyciIsInJlc3VsdCIsImNvbXByZXNzIiwiX2NvbXByZXNzIiwiZW5kcG9pbnQiLCJ3aW5kb3dCaXRzIiwiWl9ERUZBVUxUX1dJTkRPV0JJVFMiLCJjcmVhdGVJbmZsYXRlUmF3IiwiemxpYkluZmxhdGVPcHRpb25zIiwib24iLCJpbmZsYXRlT25FcnJvciIsImluZmxhdGVPbkRhdGEiLCJ3cml0ZSIsImZsdXNoIiwiY3JlYXRlRGVmbGF0ZVJhdyIsInpsaWJEZWZsYXRlT3B0aW9ucyIsImRlZmxhdGVPbkRhdGEiLCJaX1NZTkNfRkxVU0giLCJjaHVuayIsIlJhbmdlRXJyb3IiLCJyZXNldCIsIldyaXRhYmxlIiwiaXNWYWxpZFN0YXR1c0NvZGUiLCJpc1ZhbGlkVVRGOCIsIkdFVF9JTkZPIiwiR0VUX1BBWUxPQURfTEVOR1RIXzE2IiwiR0VUX1BBWUxPQURfTEVOR1RIXzY0IiwiR0VUX01BU0siLCJHRVRfREFUQSIsIklORkxBVElORyIsImJpbmFyeVR5cGUiLCJfYmluYXJ5VHlwZSIsIl9leHRlbnNpb25zIiwiX2J1ZmZlcmVkQnl0ZXMiLCJfYnVmZmVycyIsIl9jb21wcmVzc2VkIiwiX3BheWxvYWRMZW5ndGgiLCJfZnJhZ21lbnRlZCIsIl9tYXNrZWQiLCJfZmluIiwiX29wY29kZSIsIl90b3RhbFBheWxvYWRMZW5ndGgiLCJfbWVzc2FnZUxlbmd0aCIsIl9mcmFnbWVudHMiLCJfc3RhdGUiLCJfbG9vcCIsIl93cml0ZSIsImVuY29kaW5nIiwiY2IiLCJzdGFydExvb3AiLCJjb25zdW1lIiwibiIsImRzdCIsIlVpbnQ4QXJyYXkiLCJnZXRJbmZvIiwiZ2V0UGF5bG9hZExlbmd0aDE2IiwiZ2V0UGF5bG9hZExlbmd0aDY0IiwiZ2V0TWFzayIsImdldERhdGEiLCJjb21wcmVzc2VkIiwiaGF2ZUxlbmd0aCIsInJlYWRVSW50MTZCRSIsInJlYWRVSW50MzJCRSIsIk1hdGgiLCJwb3ciLCJjb250cm9sTWVzc2FnZSIsImRhdGFNZXNzYWdlIiwicGVyTWVzc2FnZURlZmxhdGUiLCJlciIsIm1lc3NhZ2VMZW5ndGgiLCJmcmFnbWVudHMiLCJlbWl0IiwidG9TdHJpbmciLCJFcnJvckN0b3IiLCJwcmVmaXgiLCJzdGF0dXNDb2RlIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJyYW5kb21GaWxsU3luYyIsImFwcGx5TWFzayIsInNvY2tldCIsIl9zb2NrZXQiLCJfZmlyc3RGcmFnbWVudCIsIl9kZWZsYXRpbmciLCJfcXVldWUiLCJmcmFtZSIsIm1lcmdlIiwicGF5bG9hZExlbmd0aCIsIm9wY29kZSIsInJzdjEiLCJ3cml0ZVVJbnQxNkJFIiwid3JpdGVVSW50MzJCRSIsImVucXVldWUiLCJkb0Nsb3NlIiwic2VuZEZyYW1lIiwicGluZyIsImRvUGluZyIsInBvbmciLCJkb1BvbmciLCJzZW5kIiwiYmluYXJ5IiwiZGlzcGF0Y2giLCJfIiwiZGVzdHJveWVkIiwiZGVxdWV1ZSIsIlJlZmxlY3QiLCJhcHBseSIsImNvcmsiLCJ1bmNvcmsiLCJEdXBsZXgiLCJlbWl0Q2xvc2UiLCJzdHJlYW0iLCJkdXBsZXhPbkVuZCIsIl93cml0YWJsZVN0YXRlIiwiZmluaXNoZWQiLCJkZXN0cm95IiwiZHVwbGV4T25FcnJvciIsImxpc3RlbmVyQ291bnQiLCJ3cyIsInJlc3VtZU9uUmVjZWl2ZXJEcmFpbiIsInJlY2VpdmVyT25EcmFpbiIsInJlc3VtZSIsInJlYWR5U3RhdGUiLCJDT05ORUNUSU5HIiwib3BlbiIsIl9yZWNlaXZlciIsInJlbW92ZUFsbExpc3RlbmVycyIsImR1cGxleCIsImF1dG9EZXN0cm95Iiwib2JqZWN0TW9kZSIsIndyaXRhYmxlT2JqZWN0TW9kZSIsIm1zZyIsInBhdXNlIiwiX2Rlc3Ryb3kiLCJDTE9TRUQiLCJwcm9jZXNzIiwibmV4dFRpY2siLCJjYWxsZWQiLCJ0ZXJtaW5hdGUiLCJfZmluYWwiLCJfcmVhZGFibGVTdGF0ZSIsImVuZEVtaXR0ZWQiLCJmaW5pc2giLCJfcmVhZCIsIk9QRU4iLCJuZWVkRHJhaW4iLCJWYWxpZGF0aW9uIiwiRXZlbnRFbWl0dGVyIiwiY3JlYXRlSGFzaCIsImNyZWF0ZVNlcnZlciIsIlNUQVRVU19DT0RFUyIsImtleVJlZ2V4IiwiV2ViU29ja2V0U2VydmVyIiwiaGFuZGxlUHJvdG9jb2xzIiwiY2xpZW50VHJhY2tpbmciLCJ2ZXJpZnlDbGllbnQiLCJub1NlcnZlciIsImJhY2tsb2ciLCJzZXJ2ZXIiLCJob3N0IiwicGF0aCIsInBvcnQiLCJfc2VydmVyIiwicmVxIiwicmVzIiwiYm9keSIsIndyaXRlSGVhZCIsImxpc3RlbiIsIl9yZW1vdmVMaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lcnMiLCJsaXN0ZW5pbmciLCJiaW5kIiwidXBncmFkZSIsImhlYWQiLCJoYW5kbGVVcGdyYWRlIiwiY2xpZW50cyIsIlNldCIsImFkZHJlc3MiLCJjbGllbnQiLCJzaG91bGRIYW5kbGUiLCJpbmRleCIsInVybCIsImluZGV4T2YiLCJwYXRobmFtZSIsInNvY2tldE9uRXJyb3IiLCJoZWFkZXJzIiwidHJpbSIsInZlcnNpb24iLCJ0b0xvd2VyQ2FzZSIsInRlc3QiLCJhYm9ydEhhbmRzaGFrZSIsImluZm8iLCJvcmlnaW4iLCJzZWN1cmUiLCJjb25uZWN0aW9uIiwiYXV0aG9yaXplZCIsImVuY3J5cHRlZCIsInZlcmlmaWVkIiwiY29tcGxldGVVcGdyYWRlIiwicmVhZGFibGUiLCJ3cml0YWJsZSIsImRpZ2VzdCIsInVwZGF0ZSIsInByb3RvY29sIiwic3BsaXQiLCJzZXRTb2NrZXQiLCJkZWxldGUiLCJldmVudCIsInJlbW92ZUxpc3RlbmVycyIsIkNvbm5lY3Rpb24iLCJoIiwiaHR0cHMiLCJodHRwIiwibmV0IiwidGxzIiwicmFuZG9tQnl0ZXMiLCJVUkwiLCJyZWFkeVN0YXRlcyIsInByb3RvY29sVmVyc2lvbnMiLCJjbG9zZVRpbWVvdXQiLCJwcm90b2NvbHMiLCJfY2xvc2VNZXNzYWdlIiwiX2Nsb3NlVGltZXIiLCJfY2xvc2VDb2RlIiwiX3NlbmRlciIsIl9idWZmZXJlZEFtb3VudCIsIl9yZWRpcmVjdHMiLCJpbml0QXNDbGllbnQiLCJDTE9TSU5HIiwiaW5jbHVkZXMiLCJidWZmZXJlZEFtb3VudCIsImJ1ZmZlclNpemUiLCJyZWNlaXZlciIsInJlY2VpdmVyT25Db25jbHVkZSIsInJlY2VpdmVyT25FcnJvciIsInJlY2VpdmVyT25NZXNzYWdlIiwicmVjZWl2ZXJPblBpbmciLCJyZWNlaXZlck9uUG9uZyIsInNldFRpbWVvdXQiLCJzZXROb0RlbGF5IiwidW5zaGlmdCIsInNvY2tldE9uQ2xvc2UiLCJzb2NrZXRPbkRhdGEiLCJzb2NrZXRPbkVuZCIsIl9yZXEiLCJzZW5kQWZ0ZXJDbG9zZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0Iiwid2Vic29ja2V0IiwicHJvdG9jb2xWZXJzaW9uIiwiZm9sbG93UmVkaXJlY3RzIiwibWF4UmVkaXJlY3RzIiwiY3JlYXRlQ29ubmVjdGlvbiIsInNvY2tldFBhdGgiLCJob3N0bmFtZSIsInRpbWVvdXQiLCJwYXJzZWRVcmwiLCJocmVmIiwiaXNVbml4U29ja2V0IiwiaXNTZWN1cmUiLCJkZWZhdWx0UG9ydCIsInRsc0Nvbm5lY3QiLCJuZXRDb25uZWN0Iiwic3RhcnRzV2l0aCIsIlVwZ3JhZGUiLCJzZWFyY2giLCJoYW5kc2hha2VUaW1lb3V0IiwiT3JpZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJwYXJ0cyIsImFib3J0ZWQiLCJsb2NhdGlvbiIsImFib3J0IiwiYWRkciIsInNlcnZlclByb3QiLCJwcm90TGlzdCIsInByb3RFcnJvciIsImNvbm5lY3QiLCJzZXJ2ZXJuYW1lIiwic2V0SGVhZGVyIiwicmVjZWl2ZXJPbkZpbmlzaCIsInJlYWQiLCJjbGVhclRpbWVvdXQiLCJlcnJvckVtaXR0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWIsTUFBTUEsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLDJEQUFELENBQXpCOztBQUVBRCxTQUFTLENBQUNFLHFCQUFWLEdBQWtDRCxtQkFBTyxDQUFDLHFEQUFELENBQXpDO0FBQ0FELFNBQVMsQ0FBQ0csTUFBVixHQUFtQkYsbUJBQU8sQ0FBQyx5RUFBRCxDQUExQjtBQUNBRCxTQUFTLENBQUNJLFFBQVYsR0FBcUJILG1CQUFPLENBQUMseURBQUQsQ0FBNUI7QUFDQUQs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ZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFdlYlNvY2tldCA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldCcpO1xuXG5XZWJTb2NrZXQuY3JlYXRlV2ViU29ja2V0U3RyZWFtID0gcmVxdWlyZSgnLi9saWIvc3RyZWFtJyk7XG5XZWJTb2NrZXQuU2VydmVyID0gcmVxdWlyZSgnLi9saWIvd2Vic29ja2V0LXNlcnZlcicpO1xuV2ViU29ja2V0LlJlY2VpdmVyID0gcmVxdWlyZSgnLi9saWIvcmVjZWl2ZXInKTtcbldlYlNvY2tldC5TZW5kZXIgPSByZXF1aXJlKCcuL2xpYi9zZW5kZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgRU1QVFlfQlVGRkVSIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIE1lcmdlcyBhbiBhcnJheSBvZiBidWZmZXJzIGludG8gYSBuZXcgYnVmZmVyLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyW119IGxpc3QgVGhlIGFycmF5IG9mIGJ1ZmZlcnMgdG8gY29uY2F0XG4gKiBAcGFyYW0ge051bWJlcn0gdG90YWxMZW5ndGggVGhlIHRvdGFsIGxlbmd0aCBvZiBidWZmZXJzIGluIHRoZSBsaXN0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSByZXN1bHRpbmcgYnVmZmVyXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGNvbmNhdChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHJldHVybiBFTVBUWV9CVUZGRVI7XG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuIGxpc3RbMF07XG5cbiAgY29uc3QgdGFyZ2V0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKHRvdGFsTGVuZ3RoKTtcbiAgbGV0IG9mZnNldCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnVmID0gbGlzdFtpXTtcbiAgICB0YXJnZXQuc2V0KGJ1Ziwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gYnVmLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPCB0b3RhbExlbmd0aCkgcmV0dXJuIHRhcmdldC5zbGljZSgwLCBvZmZzZXQpO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogTWFza3MgYSBidWZmZXIgdXNpbmcgdGhlIGdpdmVuIG1hc2suXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IHNvdXJjZSBUaGUgYnVmZmVyIHRvIG1hc2tcbiAqIEBwYXJhbSB7QnVmZmVyfSBtYXNrIFRoZSBtYXNrIHRvIHVzZVxuICogQHBhcmFtIHtCdWZmZXJ9IG91dHB1dCBUaGUgYnVmZmVyIHdoZXJlIHRvIHN0b3JlIHRoZSByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCBhdCB3aGljaCB0byBzdGFydCB3cml0aW5nXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBudW1iZXIgb2YgYnl0ZXMgdG8gbWFzay5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gX21hc2soc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRbb2Zmc2V0ICsgaV0gPSBzb3VyY2VbaV0gXiBtYXNrW2kgJiAzXTtcbiAgfVxufVxuXG4vKipcbiAqIFVubWFza3MgYSBidWZmZXIgdXNpbmcgdGhlIGdpdmVuIG1hc2suXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIHVubWFza1xuICogQHBhcmFtIHtCdWZmZXJ9IG1hc2sgVGhlIG1hc2sgdG8gdXNlXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF91bm1hc2soYnVmZmVyLCBtYXNrKSB7XG4gIC8vIFJlcXVpcmVkIHVudGlsIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvOTAwNiBpcyByZXNvbHZlZC5cbiAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJ1ZmZlcltpXSBePSBtYXNrW2kgJiAzXTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYnVmZmVyIHRvIGFuIGBBcnJheUJ1ZmZlcmAuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZiBUaGUgYnVmZmVyIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBDb252ZXJ0ZWQgYnVmZmVyXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXlCdWZmZXIoYnVmKSB7XG4gIGlmIChidWYuYnl0ZUxlbmd0aCA9PT0gYnVmLmJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJ1Zi5idWZmZXI7XG4gIH1cblxuICByZXR1cm4gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGRhdGFgIHRvIGEgYEJ1ZmZlcmAuXG4gKlxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gVGhlIGJ1ZmZlclxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b0J1ZmZlcihkYXRhKSB7XG4gIHRvQnVmZmVyLnJlYWRPbmx5ID0gdHJ1ZTtcblxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSByZXR1cm4gZGF0YTtcblxuICBsZXQgYnVmO1xuXG4gIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICBidWYgPSBCdWZmZXIuZnJvbShkYXRhKTtcbiAgfSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZGF0YSkpIHtcbiAgICBidWYgPSBCdWZmZXIuZnJvbShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IEJ1ZmZlci5mcm9tKGRhdGEpO1xuICAgIHRvQnVmZmVyLnJlYWRPbmx5ID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG50cnkge1xuICBjb25zdCBidWZmZXJVdGlsID0gcmVxdWlyZSgnYnVmZmVydXRpbCcpO1xuICBjb25zdCBidSA9IGJ1ZmZlclV0aWwuQnVmZmVyVXRpbCB8fCBidWZmZXJVdGlsO1xuXG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbmNhdCxcbiAgICBtYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgaWYgKGxlbmd0aCA8IDQ4KSBfbWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgZWxzZSBidS5tYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgfSxcbiAgICB0b0FycmF5QnVmZmVyLFxuICAgIHRvQnVmZmVyLFxuICAgIHVubWFzayhidWZmZXIsIG1hc2spIHtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoIDwgMzIpIF91bm1hc2soYnVmZmVyLCBtYXNrKTtcbiAgICAgIGVsc2UgYnUudW5tYXNrKGJ1ZmZlciwgbWFzayk7XG4gICAgfVxuICB9O1xufSBjYXRjaCAoZSkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb25jYXQsXG4gICAgbWFzazogX21hc2ssXG4gICAgdG9BcnJheUJ1ZmZlcixcbiAgICB0b0J1ZmZlcixcbiAgICB1bm1hc2s6IF91bm1hc2tcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJJTkFSWV9UWVBFUzogWydub2RlYnVmZmVyJywgJ2FycmF5YnVmZmVyJywgJ2ZyYWdtZW50cyddLFxuICBHVUlEOiAnMjU4RUFGQTUtRTkxNC00N0RBLTk1Q0EtQzVBQjBEQzg1QjExJyxcbiAga1N0YXR1c0NvZGU6IFN5bWJvbCgnc3RhdHVzLWNvZGUnKSxcbiAga1dlYlNvY2tldDogU3ltYm9sKCd3ZWJzb2NrZXQnKSxcbiAgRU1QVFlfQlVGRkVSOiBCdWZmZXIuYWxsb2MoMCksXG4gIE5PT1A6ICgpID0+IHt9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGUsIHRhcmdldCkge1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBtZXNzYWdlIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYE1lc3NhZ2VFdmVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xCdWZmZXJ8QXJyYXlCdWZmZXJ8QnVmZmVyW10pfSBkYXRhIFRoZSByZWNlaXZlZCBkYXRhXG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSB0YXJnZXQgQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGEsIHRhcmdldCkge1xuICAgIHN1cGVyKCdtZXNzYWdlJywgdGFyZ2V0KTtcblxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjbG9zZSBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQ2xvc2VFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgQ2xvc2VFdmVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjbG9zZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvbiBBIGh1bWFuLXJlYWRhYmxlIHN0cmluZyBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBjbG9zaW5nXG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSB0YXJnZXQgQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvZGUsIHJlYXNvbiwgdGFyZ2V0KSB7XG4gICAgc3VwZXIoJ2Nsb3NlJywgdGFyZ2V0KTtcblxuICAgIHRoaXMud2FzQ2xlYW4gPSB0YXJnZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCAmJiB0YXJnZXQuX2Nsb3NlRnJhbWVTZW50O1xuICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gb3BlbiBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgT3BlbkV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBPcGVuRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1dlYlNvY2tldH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhcyBkaXNwYXRjaGVkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcbiAgICBzdXBlcignb3BlbicsIHRhcmdldCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXJyb3IgZXZlbnQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEVycm9yRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEVycm9yRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXJyb3IgVGhlIGVycm9yIHRoYXQgZ2VuZXJhdGVkIHRoaXMgZXZlbnRcbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IHRhcmdldCBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRoZSBldmVudCB3YXMgZGlzcGF0Y2hlZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZXJyb3IsIHRhcmdldCkge1xuICAgIHN1cGVyKCdlcnJvcicsIHRhcmdldCk7XG5cbiAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgcHJvdmlkZXMgbWV0aG9kcyBmb3IgZW11bGF0aW5nIHRoZSBgRXZlbnRUYXJnZXRgIGludGVyZmFjZS4gSXQncyBub3RcbiAqIG1lYW50IHRvIGJlIHVzZWQgZGlyZWN0bHkuXG4gKlxuICogQG1peGluXG4gKi9cbmNvbnN0IEV2ZW50VGFyZ2V0ID0ge1xuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciB0byBhZGRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVzIGNoYXJhY3RlcmlzdGljcyBhYm91dFxuICAgKiAgICAgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5vbmNlIEEgYEJvb2xlYW5gYCBpbmRpY2F0aW5nIHRoYXQgdGhlIGxpc3RlbmVyXG4gICAqICAgICBzaG91bGQgYmUgaW52b2tlZCBhdCBtb3N0IG9uY2UgYWZ0ZXIgYmVpbmcgYWRkZWQuIElmIGB0cnVlYCwgdGhlXG4gICAqICAgICBsaXN0ZW5lciB3b3VsZCBiZSBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgd2hlbiBpbnZva2VkLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGRhdGEpIHtcbiAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgbmV3IE1lc3NhZ2VFdmVudChkYXRhLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZShjb2RlLCBtZXNzYWdlKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIG5ldyBDbG9zZUV2ZW50KGNvZGUsIG1lc3NhZ2UsIHRoaXMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIG5ldyBFcnJvckV2ZW50KGVycm9yLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25PcGVuKCkge1xuICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBuZXcgT3BlbkV2ZW50KHRoaXMpKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXRob2QgPSBvcHRpb25zICYmIG9wdGlvbnMub25jZSA/ICdvbmNlJyA6ICdvbic7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICBvbk1lc3NhZ2UuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25NZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG9uQ2xvc2UuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25DbG9zZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBvbkVycm9yLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIG9uRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29wZW4nKSB7XG4gICAgICBvbk9wZW4uX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25PcGVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyh0eXBlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldID09PSBsaXN0ZW5lciB8fCBsaXN0ZW5lcnNbaV0uX2xpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50VGFyZ2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL1xuLy8gQWxsb3dlZCB0b2tlbiBjaGFyYWN0ZXJzOlxuLy9cbi8vICchJywgJyMnLCAnJCcsICclJywgJyYnLCAnJycsICcqJywgJysnLCAnLScsXG4vLyAnLicsIDAtOSwgQS1aLCAnXicsICdfJywgJ2AnLCBhLXosICd8JywgJ34nXG4vL1xuLy8gdG9rZW5DaGFyc1szMl0gPT09IDAgLy8gJyAnXG4vLyB0b2tlbkNoYXJzWzMzXSA9PT0gMSAvLyAnISdcbi8vIHRva2VuQ2hhcnNbMzRdID09PSAwIC8vICdcIidcbi8vIC4uLlxuLy9cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgdG9rZW5DaGFycyA9IFtcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gMCAtIDE1XG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDE2IC0gMzFcbiAgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgLy8gMzIgLSA0N1xuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyA0OCAtIDYzXG4gIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIC8vIDY0IC0gNzlcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgLy8gODAgLSA5NVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAvLyA5NiAtIDExMVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwIC8vIDExMiAtIDEyN1xuXTtcblxuLyoqXG4gKiBBZGRzIGFuIG9mZmVyIHRvIHRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBhIHBhcmFtZXRlciB0byB0aGUgbWFwIG9mXG4gKiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0IFRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgZXh0ZW5zaW9uIG9yIHBhcmFtZXRlciBuYW1lXG4gKiBAcGFyYW0geyhPYmplY3R8Qm9vbGVhbnxTdHJpbmcpfSBlbGVtIFRoZSBleHRlbnNpb24gcGFyYW1ldGVycyBvciB0aGVcbiAqICAgICBwYXJhbWV0ZXIgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHB1c2goZGVzdCwgbmFtZSwgZWxlbSkge1xuICBpZiAoZGVzdFtuYW1lXSA9PT0gdW5kZWZpbmVkKSBkZXN0W25hbWVdID0gW2VsZW1dO1xuICBlbHNlIGRlc3RbbmFtZV0ucHVzaChlbGVtKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnNgIGhlYWRlciBpbnRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFRoZSBmaWVsZCB2YWx1ZSBvZiB0aGUgaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBwYXJzZWQgb2JqZWN0XG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGhlYWRlcikge1xuICBjb25zdCBvZmZlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGlmIChoZWFkZXIgPT09IHVuZGVmaW5lZCB8fCBoZWFkZXIgPT09ICcnKSByZXR1cm4gb2ZmZXJzO1xuXG4gIGxldCBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBsZXQgbXVzdFVuZXNjYXBlID0gZmFsc2U7XG4gIGxldCBpc0VzY2FwaW5nID0gZmFsc2U7XG4gIGxldCBpblF1b3RlcyA9IGZhbHNlO1xuICBsZXQgZXh0ZW5zaW9uTmFtZTtcbiAgbGV0IHBhcmFtTmFtZTtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIGxldCBlbmQgPSAtMTtcbiAgbGV0IGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY29kZSA9IGhlYWRlci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGV4dGVuc2lvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgdG9rZW5DaGFyc1tjb2RlXSA9PT0gMSkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjAgLyogJyAnICovIHx8IGNvZGUgPT09IDB4MDkgLyogJ1xcdCcgKi8pIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIC8qICc7JyAqLyB8fCBjb2RlID09PSAweDJjIC8qICcsJyAqLykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgICBwdXNoKG9mZmVycywgbmFtZSwgcGFyYW1zKTtcbiAgICAgICAgICBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4dGVuc2lvbk5hbWUgPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIwIHx8IGNvZGUgPT09IDB4MDkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIHx8IGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICAgIHB1c2gocGFyYW1zLCBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCksIHRydWUpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMHgyYykge1xuICAgICAgICAgIHB1c2gob2ZmZXJzLCBleHRlbnNpb25OYW1lLCBwYXJhbXMpO1xuICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZXh0ZW5zaW9uTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2QgLyogJz0nICovICYmIHN0YXJ0ICE9PSAtMSAmJiBlbmQgPT09IC0xKSB7XG4gICAgICAgIHBhcmFtTmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgaSk7XG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIFRoZSB2YWx1ZSBvZiBhIHF1b3RlZC1zdHJpbmcgYWZ0ZXIgdW5lc2NhcGluZyBtdXN0IGNvbmZvcm0gdG8gdGhlXG4gICAgICAvLyB0b2tlbiBBQk5GLCBzbyBvbmx5IHRva2VuIGNoYXJhY3RlcnMgYXJlIHZhbGlkLlxuICAgICAgLy8gUmVmOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjQ1NSNzZWN0aW9uLTkuMVxuICAgICAgLy9cbiAgICAgIGlmIChpc0VzY2FwaW5nKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICBlbHNlIGlmICghbXVzdFVuZXNjYXBlKSBtdXN0VW5lc2NhcGUgPSB0cnVlO1xuICAgICAgICBpc0VzY2FwaW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGluUXVvdGVzKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIgLyogJ1wiJyAqLyAmJiBzdGFydCAhPT0gLTEpIHtcbiAgICAgICAgICBpblF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHg1YyAvKiAnXFwnICovKSB7XG4gICAgICAgICAgaXNFc2NhcGluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMiAmJiBoZWFkZXIuY2hhckNvZGVBdChpIC0gMSkgPT09IDB4M2QpIHtcbiAgICAgICAgaW5RdW90ZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChzdGFydCAhPT0gLTEgJiYgKGNvZGUgPT09IDB4MjAgfHwgY29kZSA9PT0gMHgwOSkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2IgfHwgY29kZSA9PT0gMHgyYykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgbGV0IHZhbHVlID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICBpZiAobXVzdFVuZXNjYXBlKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICAgICAgICBtdXN0VW5lc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoKHBhcmFtcywgcGFyYW1OYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmIChjb2RlID09PSAweDJjKSB7XG4gICAgICAgICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBleHRlbnNpb25OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSAtMSB8fCBpblF1b3Rlcykge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQnKTtcbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICBjb25zdCB0b2tlbiA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgaWYgKGV4dGVuc2lvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHB1c2gob2ZmZXJzLCB0b2tlbiwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHB1c2gocGFyYW1zLCB0b2tlbiwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChtdXN0VW5lc2NhcGUpIHtcbiAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHRva2VuLnJlcGxhY2UoL1xcXFwvZywgJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaChwYXJhbXMsIHBhcmFtTmFtZSwgdG9rZW4pO1xuICAgIH1cbiAgICBwdXNoKG9mZmVycywgZXh0ZW5zaW9uTmFtZSwgcGFyYW1zKTtcbiAgfVxuXG4gIHJldHVybiBvZmZlcnM7XG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSBgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zYCBoZWFkZXIgZmllbGQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgVGhlIG1hcCBvZiBleHRlbnNpb25zIGFuZCBwYXJhbWV0ZXJzIHRvIGZvcm1hdFxuICogQHJldHVybiB7U3RyaW5nfSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIG9iamVjdFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBmb3JtYXQoZXh0ZW5zaW9ucykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZXh0ZW5zaW9ucylcbiAgICAubWFwKChleHRlbnNpb24pID0+IHtcbiAgICAgIGxldCBjb25maWd1cmF0aW9ucyA9IGV4dGVuc2lvbnNbZXh0ZW5zaW9uXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb25maWd1cmF0aW9ucykpIGNvbmZpZ3VyYXRpb25zID0gW2NvbmZpZ3VyYXRpb25zXTtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uc1xuICAgICAgICAubWFwKChwYXJhbXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gW2V4dGVuc2lvbl1cbiAgICAgICAgICAgIC5jb25jYXQoXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgLm1hcCgodikgPT4gKHYgPT09IHRydWUgPyBrIDogYCR7a309JHt2fWApKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJzsgJyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuam9pbignOyAnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJywgJyk7XG4gICAgfSlcbiAgICAuam9pbignLCAnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGZvcm1hdCwgcGFyc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga0RvbmUgPSBTeW1ib2woJ2tEb25lJyk7XG5jb25zdCBrUnVuID0gU3ltYm9sKCdrUnVuJyk7XG5cbi8qKlxuICogQSB2ZXJ5IHNpbXBsZSBqb2IgcXVldWUgd2l0aCBhZGp1c3RhYmxlIGNvbmN1cnJlbmN5LiBBZGFwdGVkIGZyb21cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TVFJNTC9hc3luYy1saW1pdGVyXG4gKi9cbmNsYXNzIExpbWl0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgTGltaXRlcmAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb25jdXJyZW5jeSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygam9icyBhbGxvd2VkIHRvIHJ1blxuICAgKiAgICAgY29uY3VycmVudGx5XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25jdXJyZW5jeSkge1xuICAgIHRoaXNba0RvbmVdID0gKCkgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nLS07XG4gICAgICB0aGlzW2tSdW5dKCk7XG4gICAgfTtcbiAgICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3kgfHwgSW5maW5pdHk7XG4gICAgdGhpcy5qb2JzID0gW107XG4gICAgdGhpcy5wZW5kaW5nID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZSBxdWV1ZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkKGpvYikge1xuICAgIHRoaXMuam9icy5wdXNoKGpvYik7XG4gICAgdGhpc1trUnVuXSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBqb2IgZnJvbSB0aGUgcXVldWUgYW5kIHJ1bnMgaXQgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBba1J1bl0oKSB7XG4gICAgaWYgKHRoaXMucGVuZGluZyA9PT0gdGhpcy5jb25jdXJyZW5jeSkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuam9icy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGpvYiA9IHRoaXMuam9icy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLnBlbmRpbmcrKztcbiAgICAgIGpvYih0aGlzW2tEb25lXSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGltaXRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgemxpYiA9IHJlcXVpcmUoJ3psaWInKTtcblxuY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcbmNvbnN0IExpbWl0ZXIgPSByZXF1aXJlKCcuL2xpbWl0ZXInKTtcbmNvbnN0IHsga1N0YXR1c0NvZGUsIE5PT1AgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IFRSQUlMRVIgPSBCdWZmZXIuZnJvbShbMHgwMCwgMHgwMCwgMHhmZiwgMHhmZl0pO1xuY29uc3Qga1Blck1lc3NhZ2VEZWZsYXRlID0gU3ltYm9sKCdwZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IGtUb3RhbExlbmd0aCA9IFN5bWJvbCgndG90YWwtbGVuZ3RoJyk7XG5jb25zdCBrQ2FsbGJhY2sgPSBTeW1ib2woJ2NhbGxiYWNrJyk7XG5jb25zdCBrQnVmZmVycyA9IFN5bWJvbCgnYnVmZmVycycpO1xuY29uc3Qga0Vycm9yID0gU3ltYm9sKCdlcnJvcicpO1xuXG4vL1xuLy8gV2UgbGltaXQgemxpYiBjb25jdXJyZW5jeSwgd2hpY2ggcHJldmVudHMgc2V2ZXJlIG1lbW9yeSBmcmFnbWVudGF0aW9uXG4vLyBhcyBkb2N1bWVudGVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvODg3MSNpc3N1ZWNvbW1lbnQtMjUwOTE1OTEzXG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvaXNzdWVzLzEyMDJcbi8vXG4vLyBJbnRlbnRpb25hbGx5IGdsb2JhbDsgaXQncyB0aGUgZ2xvYmFsIHRocmVhZCBwb29sIHRoYXQncyBhbiBpc3N1ZS5cbi8vXG5sZXQgemxpYkxpbWl0ZXI7XG5cbi8qKlxuICogcGVybWVzc2FnZS1kZWZsYXRlIGltcGxlbWVudGF0aW9uLlxuICovXG5jbGFzcyBQZXJNZXNzYWdlRGVmbGF0ZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUGVyTWVzc2FnZURlZmxhdGUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIgUmVxdWVzdC9hY2NlcHQgZGlzYWJsaW5nXG4gICAqICAgICBvZiBzZXJ2ZXIgY29udGV4dCB0YWtlb3ZlclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIgQWR2ZXJ0aXNlL2Fja25vd2xlZGdlXG4gICAqICAgICBkaXNhYmxpbmcgb2YgY2xpZW50IGNvbnRleHQgdGFrZW92ZXJcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxOdW1iZXIpfSBvcHRpb25zLnNlcnZlck1heFdpbmRvd0JpdHMgUmVxdWVzdC9jb25maXJtIHRoZVxuICAgKiAgICAgdXNlIG9mIGEgY3VzdG9tIHNlcnZlciB3aW5kb3cgc2l6ZVxuICAgKiBAcGFyYW0geyhCb29sZWFufE51bWJlcil9IG9wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyBBZHZlcnRpc2Ugc3VwcG9ydFxuICAgKiAgICAgZm9yLCBvciByZXF1ZXN0LCBhIGN1c3RvbSBjbGllbnQgd2luZG93IHNpemVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuemxpYkRlZmxhdGVPcHRpb25zIE9wdGlvbnMgdG8gcGFzcyB0byB6bGliIG9uIGRlZmxhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuemxpYkluZmxhdGVPcHRpb25zIE9wdGlvbnMgdG8gcGFzcyB0byB6bGliIG9uIGluZmxhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMudGhyZXNob2xkIFNpemUgKGluIGJ5dGVzKSBiZWxvdyB3aGljaCBtZXNzYWdlc1xuICAgKiAgICAgc2hvdWxkIG5vdCBiZSBjb21wcmVzc2VkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmNvbmN1cnJlbmN5TGltaXQgVGhlIG51bWJlciBvZiBjb25jdXJyZW50IGNhbGxzIHRvXG4gICAqICAgICB6bGliXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNTZXJ2ZXIgQ3JlYXRlIHRoZSBpbnN0YW5jZSBpbiBlaXRoZXIgc2VydmVyIG9yIGNsaWVudFxuICAgKiAgICAgbW9kZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4UGF5bG9hZCBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBpc1NlcnZlciwgbWF4UGF5bG9hZCkge1xuICAgIHRoaXMuX21heFBheWxvYWQgPSBtYXhQYXlsb2FkIHwgMDtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl90aHJlc2hvbGQgPVxuICAgICAgdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQgIT09IHVuZGVmaW5lZCA/IHRoaXMuX29wdGlvbnMudGhyZXNob2xkIDogMTAyNDtcbiAgICB0aGlzLl9pc1NlcnZlciA9ICEhaXNTZXJ2ZXI7XG4gICAgdGhpcy5fZGVmbGF0ZSA9IG51bGw7XG4gICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG5cbiAgICB0aGlzLnBhcmFtcyA9IG51bGw7XG5cbiAgICBpZiAoIXpsaWJMaW1pdGVyKSB7XG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9XG4gICAgICAgIHRoaXMuX29wdGlvbnMuY29uY3VycmVuY3lMaW1pdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB0aGlzLl9vcHRpb25zLmNvbmN1cnJlbmN5TGltaXRcbiAgICAgICAgICA6IDEwO1xuICAgICAgemxpYkxpbWl0ZXIgPSBuZXcgTGltaXRlcihjb25jdXJyZW5jeSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGV4dGVuc2lvbk5hbWUoKSB7XG4gICAgcmV0dXJuICdwZXJtZXNzYWdlLWRlZmxhdGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gRXh0ZW5zaW9uIHBhcmFtZXRlcnNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgb2ZmZXIoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5zZXJ2ZXJOb0NvbnRleHRUYWtlb3Zlcikge1xuICAgICAgcGFyYW1zLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIHBhcmFtcy5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zLnNlcnZlck1heFdpbmRvd0JpdHMpIHtcbiAgICAgIHBhcmFtcy5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzID0gdGhpcy5fb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PSBudWxsKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHQgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyL3Jlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBjb25maWd1cmF0aW9ucyBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVycy9yZXBvbnNlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQWNjZXB0ZWQgY29uZmlndXJhdGlvblxuICAgKiBAcHVibGljXG4gICAqL1xuICBhY2NlcHQoY29uZmlndXJhdGlvbnMpIHtcbiAgICBjb25maWd1cmF0aW9ucyA9IHRoaXMubm9ybWFsaXplUGFyYW1zKGNvbmZpZ3VyYXRpb25zKTtcblxuICAgIHRoaXMucGFyYW1zID0gdGhpcy5faXNTZXJ2ZXJcbiAgICAgID8gdGhpcy5hY2NlcHRBc1NlcnZlcihjb25maWd1cmF0aW9ucylcbiAgICAgIDogdGhpcy5hY2NlcHRBc0NsaWVudChjb25maWd1cmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUmVsZWFzZXMgYWxsIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBleHRlbnNpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2luZmxhdGUpIHtcbiAgICAgIHRoaXMuX2luZmxhdGUuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZsYXRlKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuX2RlZmxhdGVba0NhbGxiYWNrXTtcblxuICAgICAgdGhpcy5fZGVmbGF0ZS5jbG9zZSgpO1xuICAgICAgdGhpcy5fZGVmbGF0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnVGhlIGRlZmxhdGUgc3RyZWFtIHdhcyBjbG9zZWQgd2hpbGUgZGF0YSB3YXMgYmVpbmcgcHJvY2Vzc2VkJ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIEFjY2VwdCBhbiBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9mZmVycyBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjY2VwdEFzU2VydmVyKG9mZmVycykge1xuICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgIGNvbnN0IGFjY2VwdGVkID0gb2ZmZXJzLmZpbmQoKHBhcmFtcykgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0cy5zZXJ2ZXJOb0NvbnRleHRUYWtlb3ZlciA9PT0gZmFsc2UgJiZcbiAgICAgICAgICBwYXJhbXMuc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXIpIHx8XG4gICAgICAgIChwYXJhbXMuc2VydmVyX21heF93aW5kb3dfYml0cyAmJlxuICAgICAgICAgIChvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09IGZhbHNlIHx8XG4gICAgICAgICAgICAodHlwZW9mIG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID4gcGFyYW1zLnNlcnZlcl9tYXhfd2luZG93X2JpdHMpKSkgfHxcbiAgICAgICAgKHR5cGVvZiBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgIXBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWFjY2VwdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbmUgb2YgdGhlIGV4dGVuc2lvbiBvZmZlcnMgY2FuIGJlIGFjY2VwdGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIGFjY2VwdGVkLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdHMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInKSB7XG4gICAgICBhY2NlcHRlZC5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzID0gb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPT09IHRydWUgfHxcbiAgICAgIG9wdHMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGRlbGV0ZSBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzO1xuICAgIH1cblxuICAgIHJldHVybiBhY2NlcHRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHQgdGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiByZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcmVzcG9uc2UgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjY2VwdEFzQ2xpZW50KHJlc3BvbnNlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gcmVzcG9uc2VbMF07XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLl9vcHRpb25zLmNsaWVudE5vQ29udGV4dFRha2VvdmVyID09PSBmYWxzZSAmJlxuICAgICAgcGFyYW1zLmNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcGFyYW1ldGVyIFwiY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXJcIicpO1xuICAgIH1cblxuICAgIGlmICghcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSBmYWxzZSB8fFxuICAgICAgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgIHBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzID4gdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVW5leHBlY3RlZCBvciBpbnZhbGlkIHBhcmFtZXRlciBcImNsaWVudF9tYXhfd2luZG93X2JpdHNcIidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gY29uZmlndXJhdGlvbnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnMvcmVwb25zZVxuICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG9mZmVycy9yZXNwb25zZSB3aXRoIG5vcm1hbGl6ZWQgcGFyYW1ldGVyc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbm9ybWFsaXplUGFyYW1zKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgY29uZmlndXJhdGlvbnMuZm9yRWFjaCgocGFyYW1zKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBwYXJhbXNba2V5XTtcblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtrZXl9XCIgbXVzdCBoYXZlIG9ubHkgYSBzaW5nbGUgdmFsdWVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlID0gdmFsdWVbMF07XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ2NsaWVudF9tYXhfd2luZG93X2JpdHMnKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSArdmFsdWU7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobnVtKSB8fCBudW0gPCA4IHx8IG51bSA+IDE1KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gbnVtO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2VydmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc2VydmVyX21heF93aW5kb3dfYml0cycpIHtcbiAgICAgICAgICBjb25zdCBudW0gPSArdmFsdWU7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG51bSkgfHwgbnVtIDwgOCB8fCBudW0gPiAxNSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbnVtO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGtleSA9PT0gJ2NsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyJyB8fFxuICAgICAgICAgIGtleSA9PT0gJ3NlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyJ1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGFyYW1ldGVyIFwiJHtrZXl9XCJgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb25maWd1cmF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXByZXNzIGRhdGEuIENvbmN1cnJlbmN5IGxpbWl0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIENvbXByZXNzZWQgZGF0YVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBkZWNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICB6bGliTGltaXRlci5hZGQoKGRvbmUpID0+IHtcbiAgICAgIHRoaXMuX2RlY29tcHJlc3MoZGF0YSwgZmluLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wcmVzcyBkYXRhLiBDb25jdXJyZW5jeSBsaW1pdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBEYXRhIHRvIGNvbXByZXNzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICB6bGliTGltaXRlci5hZGQoKGRvbmUpID0+IHtcbiAgICAgIHRoaXMuX2NvbXByZXNzKGRhdGEsIGZpbiwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBDb21wcmVzc2VkIGRhdGFcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kZWNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuX2lzU2VydmVyID8gJ2NsaWVudCcgOiAnc2VydmVyJztcblxuICAgIGlmICghdGhpcy5faW5mbGF0ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYCR7ZW5kcG9pbnR9X21heF93aW5kb3dfYml0c2A7XG4gICAgICBjb25zdCB3aW5kb3dCaXRzID1cbiAgICAgICAgdHlwZW9mIHRoaXMucGFyYW1zW2tleV0gIT09ICdudW1iZXInXG4gICAgICAgICAgPyB6bGliLlpfREVGQVVMVF9XSU5ET1dCSVRTXG4gICAgICAgICAgOiB0aGlzLnBhcmFtc1trZXldO1xuXG4gICAgICB0aGlzLl9pbmZsYXRlID0gemxpYi5jcmVhdGVJbmZsYXRlUmF3KHtcbiAgICAgICAgLi4udGhpcy5fb3B0aW9ucy56bGliSW5mbGF0ZU9wdGlvbnMsXG4gICAgICAgIHdpbmRvd0JpdHNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5faW5mbGF0ZVtrUGVyTWVzc2FnZURlZmxhdGVdID0gdGhpcztcbiAgICAgIHRoaXMuX2luZmxhdGVba1RvdGFsTGVuZ3RoXSA9IDA7XG4gICAgICB0aGlzLl9pbmZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuICAgICAgdGhpcy5faW5mbGF0ZS5vbignZXJyb3InLCBpbmZsYXRlT25FcnJvcik7XG4gICAgICB0aGlzLl9pbmZsYXRlLm9uKCdkYXRhJywgaW5mbGF0ZU9uRGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5mbGF0ZVtrQ2FsbGJhY2tdID0gY2FsbGJhY2s7XG5cbiAgICB0aGlzLl9pbmZsYXRlLndyaXRlKGRhdGEpO1xuICAgIGlmIChmaW4pIHRoaXMuX2luZmxhdGUud3JpdGUoVFJBSUxFUik7XG5cbiAgICB0aGlzLl9pbmZsYXRlLmZsdXNoKCgpID0+IHtcbiAgICAgIGNvbnN0IGVyciA9IHRoaXMuX2luZmxhdGVba0Vycm9yXTtcblxuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBidWZmZXJVdGlsLmNvbmNhdChcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10sXG4gICAgICAgIHRoaXMuX2luZmxhdGVba1RvdGFsTGVuZ3RoXVxuICAgICAgKTtcblxuICAgICAgaWYgKGZpbiAmJiB0aGlzLnBhcmFtc1tgJHtlbmRwb2ludH1fbm9fY29udGV4dF90YWtlb3ZlcmBdKSB7XG4gICAgICAgIHRoaXMuX2luZmxhdGUuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgICB0aGlzLl9pbmZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wcmVzcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBEYXRhIHRvIGNvbXByZXNzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29tcHJlc3MoZGF0YSwgZmluLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5faXNTZXJ2ZXIgPyAnc2VydmVyJyA6ICdjbGllbnQnO1xuXG4gICAgaWYgKCF0aGlzLl9kZWZsYXRlKSB7XG4gICAgICBjb25zdCBrZXkgPSBgJHtlbmRwb2ludH1fbWF4X3dpbmRvd19iaXRzYDtcbiAgICAgIGNvbnN0IHdpbmRvd0JpdHMgPVxuICAgICAgICB0eXBlb2YgdGhpcy5wYXJhbXNba2V5XSAhPT0gJ251bWJlcidcbiAgICAgICAgICA/IHpsaWIuWl9ERUZBVUxUX1dJTkRPV0JJVFNcbiAgICAgICAgICA6IHRoaXMucGFyYW1zW2tleV07XG5cbiAgICAgIHRoaXMuX2RlZmxhdGUgPSB6bGliLmNyZWF0ZURlZmxhdGVSYXcoe1xuICAgICAgICAuLi50aGlzLl9vcHRpb25zLnpsaWJEZWZsYXRlT3B0aW9ucyxcbiAgICAgICAgd2luZG93Qml0c1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2RlZmxhdGVba1RvdGFsTGVuZ3RoXSA9IDA7XG4gICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuXG4gICAgICAvL1xuICAgICAgLy8gQW4gYCdlcnJvcidgIGV2ZW50IGlzIGVtaXR0ZWQsIG9ubHkgb24gTm9kZS5qcyA8IDEwLjAuMCwgaWYgdGhlXG4gICAgICAvLyBgemxpYi5EZWZsYXRlUmF3YCBpbnN0YW5jZSBpcyBjbG9zZWQgd2hpbGUgZGF0YSBpcyBiZWluZyBwcm9jZXNzZWQuXG4gICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgYFBlck1lc3NhZ2VEZWZsYXRlI2NsZWFudXAoKWAgaXMgY2FsbGVkIGF0IHRoZSB3cm9uZ1xuICAgICAgLy8gdGltZSBkdWUgdG8gYW4gYWJub3JtYWwgV2ViU29ja2V0IGNsb3N1cmUuXG4gICAgICAvL1xuICAgICAgdGhpcy5fZGVmbGF0ZS5vbignZXJyb3InLCBOT09QKTtcbiAgICAgIHRoaXMuX2RlZmxhdGUub24oJ2RhdGEnLCBkZWZsYXRlT25EYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja10gPSBjYWxsYmFjaztcblxuICAgIHRoaXMuX2RlZmxhdGUud3JpdGUoZGF0YSk7XG4gICAgdGhpcy5fZGVmbGF0ZS5mbHVzaCh6bGliLlpfU1lOQ19GTFVTSCwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZWZsYXRlKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBkZWZsYXRlIHN0cmVhbSB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9IGJ1ZmZlclV0aWwuY29uY2F0KFxuICAgICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSxcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdXG4gICAgICApO1xuXG4gICAgICBpZiAoZmluKSBkYXRhID0gZGF0YS5zbGljZSgwLCBkYXRhLmxlbmd0aCAtIDQpO1xuXG4gICAgICAvL1xuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGNhbGxiYWNrIHdpbGwgbm90IGJlIGNhbGxlZCBhZ2FpbiBpblxuICAgICAgLy8gYFBlck1lc3NhZ2VEZWZsYXRlI2NsZWFudXAoKWAuXG4gICAgICAvL1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQ2FsbGJhY2tdID0gbnVsbDtcblxuICAgICAgaWYgKGZpbiAmJiB0aGlzLnBhcmFtc1tgJHtlbmRwb2ludH1fbm9fY29udGV4dF90YWtlb3ZlcmBdKSB7XG4gICAgICAgIHRoaXMuX2RlZmxhdGUuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5fZGVmbGF0ZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kZWZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBlck1lc3NhZ2VEZWZsYXRlO1xuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYHpsaWIuRGVmbGF0ZVJhd2Agc3RyZWFtIGAnZGF0YSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBBIGNodW5rIG9mIGRhdGFcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVPbkRhdGEoY2h1bmspIHtcbiAgdGhpc1trQnVmZmVyc10ucHVzaChjaHVuayk7XG4gIHRoaXNba1RvdGFsTGVuZ3RoXSArPSBjaHVuay5sZW5ndGg7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgemxpYi5JbmZsYXRlUmF3YCBzdHJlYW0gYCdkYXRhJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIEEgY2h1bmsgb2YgZGF0YVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaW5mbGF0ZU9uRGF0YShjaHVuaykge1xuICB0aGlzW2tUb3RhbExlbmd0aF0gKz0gY2h1bmsubGVuZ3RoO1xuXG4gIGlmIChcbiAgICB0aGlzW2tQZXJNZXNzYWdlRGVmbGF0ZV0uX21heFBheWxvYWQgPCAxIHx8XG4gICAgdGhpc1trVG90YWxMZW5ndGhdIDw9IHRoaXNba1Blck1lc3NhZ2VEZWZsYXRlXS5fbWF4UGF5bG9hZFxuICApIHtcbiAgICB0aGlzW2tCdWZmZXJzXS5wdXNoKGNodW5rKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzW2tFcnJvcl0gPSBuZXcgUmFuZ2VFcnJvcignTWF4IHBheWxvYWQgc2l6ZSBleGNlZWRlZCcpO1xuICB0aGlzW2tFcnJvcl1ba1N0YXR1c0NvZGVdID0gMTAwOTtcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIGluZmxhdGVPbkRhdGEpO1xuICB0aGlzLnJlc2V0KCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgemxpYi5JbmZsYXRlUmF3YCBzdHJlYW0gYCdlcnJvcidgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBUaGUgZW1pdHRlZCBlcnJvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaW5mbGF0ZU9uRXJyb3IoZXJyKSB7XG4gIC8vXG4gIC8vIFRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBgWmxpYiNjbG9zZSgpYCBhcyB0aGUgaGFuZGxlIGlzIGF1dG9tYXRpY2FsbHlcbiAgLy8gY2xvc2VkIHdoZW4gYW4gZXJyb3IgaXMgZW1pdHRlZC5cbiAgLy9cbiAgdGhpc1trUGVyTWVzc2FnZURlZmxhdGVdLl9pbmZsYXRlID0gbnVsbDtcbiAgZXJyW2tTdGF0dXNDb2RlXSA9IDEwMDc7XG4gIHRoaXNba0NhbGxiYWNrXShlcnIpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IFdyaXRhYmxlIH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3Qge1xuICBCSU5BUllfVFlQRVMsXG4gIEVNUFRZX0JVRkZFUixcbiAga1N0YXR1c0NvZGUsXG4gIGtXZWJTb2NrZXRcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgeyBjb25jYXQsIHRvQXJyYXlCdWZmZXIsIHVubWFzayB9ID0gcmVxdWlyZSgnLi9idWZmZXItdXRpbCcpO1xuY29uc3QgeyBpc1ZhbGlkU3RhdHVzQ29kZSwgaXNWYWxpZFVURjggfSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG5jb25zdCBHRVRfSU5GTyA9IDA7XG5jb25zdCBHRVRfUEFZTE9BRF9MRU5HVEhfMTYgPSAxO1xuY29uc3QgR0VUX1BBWUxPQURfTEVOR1RIXzY0ID0gMjtcbmNvbnN0IEdFVF9NQVNLID0gMztcbmNvbnN0IEdFVF9EQVRBID0gNDtcbmNvbnN0IElORkxBVElORyA9IDU7XG5cbi8qKlxuICogSHlCaSBSZWNlaXZlciBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAZXh0ZW5kcyBzdHJlYW0uV3JpdGFibGVcbiAqL1xuY2xhc3MgUmVjZWl2ZXIgZXh0ZW5kcyBXcml0YWJsZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVjZWl2ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiaW5hcnlUeXBlIFRoZSB0eXBlIGZvciBiaW5hcnkgZGF0YVxuICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9ucyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbmVnb3RpYXRlZCBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNTZXJ2ZXIgU3BlY2lmaWVzIHdoZXRoZXIgdG8gb3BlcmF0ZSBpbiBjbGllbnQgb3Igc2VydmVyXG4gICAqICAgICBtb2RlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhQYXlsb2FkIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGhcbiAgICovXG4gIGNvbnN0cnVjdG9yKGJpbmFyeVR5cGUsIGV4dGVuc2lvbnMsIGlzU2VydmVyLCBtYXhQYXlsb2FkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2JpbmFyeVR5cGUgPSBiaW5hcnlUeXBlIHx8IEJJTkFSWV9UWVBFU1swXTtcbiAgICB0aGlzW2tXZWJTb2NrZXRdID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IHt9O1xuICAgIHRoaXMuX2lzU2VydmVyID0gISFpc1NlcnZlcjtcbiAgICB0aGlzLl9tYXhQYXlsb2FkID0gbWF4UGF5bG9hZCB8IDA7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzID0gMDtcbiAgICB0aGlzLl9idWZmZXJzID0gW107XG5cbiAgICB0aGlzLl9jb21wcmVzc2VkID0gZmFsc2U7XG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IDA7XG4gICAgdGhpcy5fbWFzayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9mcmFnbWVudGVkID0gMDtcbiAgICB0aGlzLl9tYXNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9maW4gPSBmYWxzZTtcbiAgICB0aGlzLl9vcGNvZGUgPSAwO1xuXG4gICAgdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9mcmFnbWVudHMgPSBbXTtcblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudHMgYFdyaXRhYmxlLnByb3RvdHlwZS5fd3JpdGUoKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBUaGUgY2h1bmsgb2YgZGF0YSB0byB3cml0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW5jb2RpbmcgVGhlIGNoYXJhY3RlciBlbmNvZGluZyBvZiBgY2h1bmtgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqL1xuICBfd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDggJiYgdGhpcy5fc3RhdGUgPT0gR0VUX0lORk8pIHJldHVybiBjYigpO1xuXG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyArPSBjaHVuay5sZW5ndGg7XG4gICAgdGhpcy5fYnVmZmVycy5wdXNoKGNodW5rKTtcbiAgICB0aGlzLnN0YXJ0TG9vcChjYik7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3VtZXMgYG5gIGJ5dGVzIGZyb20gdGhlIGJ1ZmZlcmVkIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYnl0ZXMgdG8gY29uc3VtZVxuICAgKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSBjb25zdW1lZCBieXRlc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3VtZShuKSB7XG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyAtPSBuO1xuXG4gICAgaWYgKG4gPT09IHRoaXMuX2J1ZmZlcnNbMF0ubGVuZ3RoKSByZXR1cm4gdGhpcy5fYnVmZmVycy5zaGlmdCgpO1xuXG4gICAgaWYgKG4gPCB0aGlzLl9idWZmZXJzWzBdLmxlbmd0aCkge1xuICAgICAgY29uc3QgYnVmID0gdGhpcy5fYnVmZmVyc1swXTtcbiAgICAgIHRoaXMuX2J1ZmZlcnNbMF0gPSBidWYuc2xpY2Uobik7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDAsIG4pO1xuICAgIH1cblxuICAgIGNvbnN0IGRzdCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuKTtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGJ1ZiA9IHRoaXMuX2J1ZmZlcnNbMF07XG4gICAgICBjb25zdCBvZmZzZXQgPSBkc3QubGVuZ3RoIC0gbjtcblxuICAgICAgaWYgKG4gPj0gYnVmLmxlbmd0aCkge1xuICAgICAgICBkc3Quc2V0KHRoaXMuX2J1ZmZlcnMuc2hpZnQoKSwgb2Zmc2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRzdC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLmJ1ZmZlciwgYnVmLmJ5dGVPZmZzZXQsIG4pLCBvZmZzZXQpO1xuICAgICAgICB0aGlzLl9idWZmZXJzWzBdID0gYnVmLnNsaWNlKG4pO1xuICAgICAgfVxuXG4gICAgICBuIC09IGJ1Zi5sZW5ndGg7XG4gICAgfSB3aGlsZSAobiA+IDApO1xuXG4gICAgcmV0dXJuIGRzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHBhcnNpbmcgbG9vcC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0TG9vcChjYikge1xuICAgIGxldCBlcnI7XG4gICAgdGhpcy5fbG9vcCA9IHRydWU7XG5cbiAgICBkbyB7XG4gICAgICBzd2l0Y2ggKHRoaXMuX3N0YXRlKSB7XG4gICAgICAgIGNhc2UgR0VUX0lORk86XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXRJbmZvKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR0VUX1BBWUxPQURfTEVOR1RIXzE2OlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0UGF5bG9hZExlbmd0aDE2KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR0VUX1BBWUxPQURfTEVOR1RIXzY0OlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0UGF5bG9hZExlbmd0aDY0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR0VUX01BU0s6XG4gICAgICAgICAgdGhpcy5nZXRNYXNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR0VUX0RBVEE6XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXREYXRhKGNiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBgSU5GTEFUSU5HYFxuICAgICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSB3aGlsZSAodGhpcy5fbG9vcCk7XG5cbiAgICBjYihlcnIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBmaXJzdCB0d28gYnl0ZXMgb2YgYSBmcmFtZS5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0SW5mbygpIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IDIpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidWYgPSB0aGlzLmNvbnN1bWUoMik7XG5cbiAgICBpZiAoKGJ1ZlswXSAmIDB4MzApICE9PSAweDAwKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ1JTVjIgYW5kIFJTVjMgbXVzdCBiZSBjbGVhcicsIHRydWUsIDEwMDIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXByZXNzZWQgPSAoYnVmWzBdICYgMHg0MCkgPT09IDB4NDA7XG5cbiAgICBpZiAoY29tcHJlc3NlZCAmJiAhdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdSU1YxIG11c3QgYmUgY2xlYXInLCB0cnVlLCAxMDAyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9maW4gPSAoYnVmWzBdICYgMHg4MCkgPT09IDB4ODA7XG4gICAgdGhpcy5fb3Bjb2RlID0gYnVmWzBdICYgMHgwZjtcbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gYnVmWzFdICYgMHg3ZjtcblxuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDApIHtcbiAgICAgIGlmIChjb21wcmVzc2VkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdSU1YxIG11c3QgYmUgY2xlYXInLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9mcmFnbWVudGVkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdpbnZhbGlkIG9wY29kZSAwJywgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX29wY29kZSA9IHRoaXMuX2ZyYWdtZW50ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDEgfHwgdGhpcy5fb3Bjb2RlID09PSAweDAyKSB7XG4gICAgICBpZiAodGhpcy5fZnJhZ21lbnRlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCBgaW52YWxpZCBvcGNvZGUgJHt0aGlzLl9vcGNvZGV9YCwgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NvbXByZXNzZWQgPSBjb21wcmVzc2VkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fb3Bjb2RlID4gMHgwNyAmJiB0aGlzLl9vcGNvZGUgPCAweDBiKSB7XG4gICAgICBpZiAoIXRoaXMuX2Zpbikge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnRklOIG11c3QgYmUgc2V0JywgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wcmVzc2VkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdSU1YxIG11c3QgYmUgY2xlYXInLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGggPiAweDdkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgYGludmFsaWQgcGF5bG9hZCBsZW5ndGggJHt0aGlzLl9wYXlsb2FkTGVuZ3RofWAsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAxMDAyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCBgaW52YWxpZCBvcGNvZGUgJHt0aGlzLl9vcGNvZGV9YCwgdHJ1ZSwgMTAwMik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maW4gJiYgIXRoaXMuX2ZyYWdtZW50ZWQpIHRoaXMuX2ZyYWdtZW50ZWQgPSB0aGlzLl9vcGNvZGU7XG4gICAgdGhpcy5fbWFza2VkID0gKGJ1ZlsxXSAmIDB4ODApID09PSAweDgwO1xuXG4gICAgaWYgKHRoaXMuX2lzU2VydmVyKSB7XG4gICAgICBpZiAoIXRoaXMuX21hc2tlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnTUFTSyBtdXN0IGJlIHNldCcsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza2VkKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ01BU0sgbXVzdCBiZSBjbGVhcicsIHRydWUsIDEwMDIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoID09PSAxMjYpIHRoaXMuX3N0YXRlID0gR0VUX1BBWUxPQURfTEVOR1RIXzE2O1xuICAgIGVsc2UgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGggPT09IDEyNykgdGhpcy5fc3RhdGUgPSBHRVRfUEFZTE9BRF9MRU5HVEhfNjQ7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5oYXZlTGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBleHRlbmRlZCBwYXlsb2FkIGxlbmd0aCAoNysxNikuXG4gICAqXG4gICAqIEByZXR1cm4geyhSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFBheWxvYWRMZW5ndGgxNigpIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IDIpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gdGhpcy5jb25zdW1lKDIpLnJlYWRVSW50MTZCRSgwKTtcbiAgICByZXR1cm4gdGhpcy5oYXZlTGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBleHRlbmRlZCBwYXlsb2FkIGxlbmd0aCAoNys2NCkuXG4gICAqXG4gICAqIEByZXR1cm4geyhSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFBheWxvYWRMZW5ndGg2NCgpIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IDgpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidWYgPSB0aGlzLmNvbnN1bWUoOCk7XG4gICAgY29uc3QgbnVtID0gYnVmLnJlYWRVSW50MzJCRSgwKTtcblxuICAgIC8vXG4gICAgLy8gVGhlIG1heGltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHQgaXMgMl41MyAtIDEuIEFuIGVycm9yIGlzIHJldHVybmVkXG4gICAgLy8gaWYgcGF5bG9hZCBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIHRoaXMgbnVtYmVyLlxuICAgIC8vXG4gICAgaWYgKG51bSA+IE1hdGgucG93KDIsIDUzIC0gMzIpIC0gMSkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAnVW5zdXBwb3J0ZWQgV2ViU29ja2V0IGZyYW1lOiBwYXlsb2FkIGxlbmd0aCA+IDJeNTMgLSAxJyxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIDEwMDlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IG51bSAqIE1hdGgucG93KDIsIDMyKSArIGJ1Zi5yZWFkVUludDMyQkUoNCk7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBheWxvYWQgbGVuZ3RoIGhhcyBiZWVuIHJlYWQuXG4gICAqXG4gICAqIEByZXR1cm4geyhSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhdmVMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGggJiYgdGhpcy5fb3Bjb2RlIDwgMHgwOCkge1xuICAgICAgdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoICs9IHRoaXMuX3BheWxvYWRMZW5ndGg7XG4gICAgICBpZiAodGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoID4gdGhpcy5fbWF4UGF5bG9hZCAmJiB0aGlzLl9tYXhQYXlsb2FkID4gMCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnTWF4IHBheWxvYWQgc2l6ZSBleGNlZWRlZCcsIGZhbHNlLCAxMDA5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWFza2VkKSB0aGlzLl9zdGF0ZSA9IEdFVF9NQVNLO1xuICAgIGVsc2UgdGhpcy5fc3RhdGUgPSBHRVRfREFUQTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBtYXNrIGJ5dGVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWFzaygpIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IDQpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXNrID0gdGhpcy5jb25zdW1lKDQpO1xuICAgIHRoaXMuX3N0YXRlID0gR0VUX0RBVEE7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgZGF0YSBieXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0RGF0YShjYikge1xuICAgIGxldCBkYXRhID0gRU1QVFlfQlVGRkVSO1xuXG4gICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgdGhpcy5fcGF5bG9hZExlbmd0aCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGF0YSA9IHRoaXMuY29uc3VtZSh0aGlzLl9wYXlsb2FkTGVuZ3RoKTtcbiAgICAgIGlmICh0aGlzLl9tYXNrZWQpIHVubWFzayhkYXRhLCB0aGlzLl9tYXNrKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3Bjb2RlID4gMHgwNykgcmV0dXJuIHRoaXMuY29udHJvbE1lc3NhZ2UoZGF0YSk7XG5cbiAgICBpZiAodGhpcy5fY29tcHJlc3NlZCkge1xuICAgICAgdGhpcy5fc3RhdGUgPSBJTkZMQVRJTkc7XG4gICAgICB0aGlzLmRlY29tcHJlc3MoZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgLy9cbiAgICAgIC8vIFRoaXMgbWVzc2FnZSBpcyBub3QgY29tcHJlc3NlZCBzbyBpdHMgbGVuZ2h0IGlzIHRoZSBzdW0gb2YgdGhlIHBheWxvYWRcbiAgICAgIC8vIGxlbmd0aCBvZiBhbGwgZnJhZ21lbnRzLlxuICAgICAgLy9cbiAgICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggPSB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGg7XG4gICAgICB0aGlzLl9mcmFnbWVudHMucHVzaChkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kYXRhTWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29tcHJlc3NlcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBDb21wcmVzc2VkIGRhdGFcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlY29tcHJlc3MoZGF0YSwgY2IpIHtcbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG5cbiAgICBwZXJNZXNzYWdlRGVmbGF0ZS5kZWNvbXByZXNzKGRhdGEsIHRoaXMuX2ZpbiwgKGVyciwgYnVmKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcblxuICAgICAgaWYgKGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUxlbmd0aCArPSBidWYubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5fbWVzc2FnZUxlbmd0aCA+IHRoaXMuX21heFBheWxvYWQgJiYgdGhpcy5fbWF4UGF5bG9hZCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gY2IoXG4gICAgICAgICAgICBlcnJvcihSYW5nZUVycm9yLCAnTWF4IHBheWxvYWQgc2l6ZSBleGNlZWRlZCcsIGZhbHNlLCAxMDA5KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9mcmFnbWVudHMucHVzaChidWYpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlciA9IHRoaXMuZGF0YU1lc3NhZ2UoKTtcbiAgICAgIGlmIChlcikgcmV0dXJuIGNiKGVyKTtcblxuICAgICAgdGhpcy5zdGFydExvb3AoY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBkYXRhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEByZXR1cm4geyhFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkYXRhTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5fZmluKSB7XG4gICAgICBjb25zdCBtZXNzYWdlTGVuZ3RoID0gdGhpcy5fbWVzc2FnZUxlbmd0aDtcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IHRoaXMuX2ZyYWdtZW50cztcblxuICAgICAgdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgdGhpcy5fZnJhZ21lbnRlZCA9IDA7XG4gICAgICB0aGlzLl9mcmFnbWVudHMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMikge1xuICAgICAgICBsZXQgZGF0YTtcblxuICAgICAgICBpZiAodGhpcy5fYmluYXJ5VHlwZSA9PT0gJ25vZGVidWZmZXInKSB7XG4gICAgICAgICAgZGF0YSA9IGNvbmNhdChmcmFnbWVudHMsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JpbmFyeVR5cGUgPT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgICBkYXRhID0gdG9BcnJheUJ1ZmZlcihjb25jYXQoZnJhZ21lbnRzLCBtZXNzYWdlTGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YSA9IGZyYWdtZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnVmID0gY29uY2F0KGZyYWdtZW50cywgbWVzc2FnZUxlbmd0aCk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkVVRGOChidWYpKSB7XG4gICAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBlcnJvcihFcnJvciwgJ2ludmFsaWQgVVRGLTggc2VxdWVuY2UnLCB0cnVlLCAxMDA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGJ1Zi50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9JTkZPO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBjb250cm9sIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIERhdGEgdG8gaGFuZGxlXG4gICAqIEByZXR1cm4geyhFcnJvcnxSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnRyb2xNZXNzYWdlKGRhdGEpIHtcbiAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAweDA4KSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG5cbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2NvbmNsdWRlJywgMTAwNSwgJycpO1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ2ludmFsaWQgcGF5bG9hZCBsZW5ndGggMScsIHRydWUsIDEwMDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29kZSA9IGRhdGEucmVhZFVJbnQxNkJFKDApO1xuXG4gICAgICAgIGlmICghaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgYGludmFsaWQgc3RhdHVzIGNvZGUgJHtjb2RlfWAsIHRydWUsIDEwMDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnVmID0gZGF0YS5zbGljZSgyKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRVVEY4KGJ1ZikpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3IoRXJyb3IsICdpbnZhbGlkIFVURi04IHNlcXVlbmNlJywgdHJ1ZSwgMTAwNyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ2NvbmNsdWRlJywgY29kZSwgYnVmLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fb3Bjb2RlID09PSAweDA5KSB7XG4gICAgICB0aGlzLmVtaXQoJ3BpbmcnLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KCdwb25nJywgZGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfSU5GTztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY2VpdmVyO1xuXG4vKipcbiAqIEJ1aWxkcyBhbiBlcnJvciBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsoRXJyb3J8UmFuZ2VFcnJvcil9IEVycm9yQ3RvciBUaGUgZXJyb3IgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHByZWZpeCBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gYWRkIGEgZGVmYXVsdCBwcmVmaXggdG9cbiAqICAgICBgbWVzc2FnZWBcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNDb2RlIFRoZSBzdGF0dXMgY29kZVxuICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3IpfSBUaGUgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVycm9yKEVycm9yQ3RvciwgbWVzc2FnZSwgcHJlZml4LCBzdGF0dXNDb2RlKSB7XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvckN0b3IoXG4gICAgcHJlZml4ID8gYEludmFsaWQgV2ViU29ja2V0IGZyYW1lOiAke21lc3NhZ2V9YCA6IG1lc3NhZ2VcbiAgKTtcblxuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIGVycm9yKTtcbiAgZXJyW2tTdGF0dXNDb2RlXSA9IHN0YXR1c0NvZGU7XG4gIHJldHVybiBlcnI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgcmFuZG9tRmlsbFN5bmMgfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCB7IEVNUFRZX0JVRkZFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHsgaXNWYWxpZFN0YXR1c0NvZGUgfSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuY29uc3QgeyBtYXNrOiBhcHBseU1hc2ssIHRvQnVmZmVyIH0gPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5cbmNvbnN0IG1hc2sgPSBCdWZmZXIuYWxsb2MoNCk7XG5cbi8qKlxuICogSHlCaSBTZW5kZXIgaW1wbGVtZW50YXRpb24uXG4gKi9cbmNsYXNzIFNlbmRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU2VuZGVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgY29ubmVjdGlvbiBzb2NrZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG5lZ290aWF0ZWQgZXh0ZW5zaW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc29ja2V0LCBleHRlbnNpb25zKSB7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwge307XG4gICAgdGhpcy5fc29ja2V0ID0gc29ja2V0O1xuXG4gICAgdGhpcy5fZmlyc3RGcmFnbWVudCA9IHRydWU7XG4gICAgdGhpcy5fY29tcHJlc3MgPSBmYWxzZTtcblxuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPSAwO1xuICAgIHRoaXMuX2RlZmxhdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3F1ZXVlID0gW107XG4gIH1cblxuICAvKipcbiAgICogRnJhbWVzIGEgcGllY2Ugb2YgZGF0YSBhY2NvcmRpbmcgdG8gdGhlIEh5QmkgV2ViU29ja2V0IHByb3RvY29sLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBUaGUgZGF0YSB0byBmcmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5vcGNvZGUgVGhlIG9wY29kZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMucmVhZE9ubHkgU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZSBtb2RpZmllZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlIEZJTiBiaXRcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLm1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5yc3YxIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlIFJTVjEgYml0XG4gICAqIEByZXR1cm4ge0J1ZmZlcltdfSBUaGUgZnJhbWVkIGRhdGEgYXMgYSBsaXN0IG9mIGBCdWZmZXJgIGluc3RhbmNlc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBzdGF0aWMgZnJhbWUoZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG1lcmdlID0gb3B0aW9ucy5tYXNrICYmIG9wdGlvbnMucmVhZE9ubHk7XG4gICAgbGV0IG9mZnNldCA9IG9wdGlvbnMubWFzayA/IDYgOiAyO1xuICAgIGxldCBwYXlsb2FkTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPj0gNjU1MzYpIHtcbiAgICAgIG9mZnNldCArPSA4O1xuICAgICAgcGF5bG9hZExlbmd0aCA9IDEyNztcbiAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMTI1KSB7XG4gICAgICBvZmZzZXQgKz0gMjtcbiAgICAgIHBheWxvYWRMZW5ndGggPSAxMjY7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG1lcmdlID8gZGF0YS5sZW5ndGggKyBvZmZzZXQgOiBvZmZzZXQpO1xuXG4gICAgdGFyZ2V0WzBdID0gb3B0aW9ucy5maW4gPyBvcHRpb25zLm9wY29kZSB8IDB4ODAgOiBvcHRpb25zLm9wY29kZTtcbiAgICBpZiAob3B0aW9ucy5yc3YxKSB0YXJnZXRbMF0gfD0gMHg0MDtcblxuICAgIHRhcmdldFsxXSA9IHBheWxvYWRMZW5ndGg7XG5cbiAgICBpZiAocGF5bG9hZExlbmd0aCA9PT0gMTI2KSB7XG4gICAgICB0YXJnZXQud3JpdGVVSW50MTZCRShkYXRhLmxlbmd0aCwgMik7XG4gICAgfSBlbHNlIGlmIChwYXlsb2FkTGVuZ3RoID09PSAxMjcpIHtcbiAgICAgIHRhcmdldC53cml0ZVVJbnQzMkJFKDAsIDIpO1xuICAgICAgdGFyZ2V0LndyaXRlVUludDMyQkUoZGF0YS5sZW5ndGgsIDYpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5tYXNrKSByZXR1cm4gW3RhcmdldCwgZGF0YV07XG5cbiAgICByYW5kb21GaWxsU3luYyhtYXNrLCAwLCA0KTtcblxuICAgIHRhcmdldFsxXSB8PSAweDgwO1xuICAgIHRhcmdldFtvZmZzZXQgLSA0XSA9IG1hc2tbMF07XG4gICAgdGFyZ2V0W29mZnNldCAtIDNdID0gbWFza1sxXTtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gMl0gPSBtYXNrWzJdO1xuICAgIHRhcmdldFtvZmZzZXQgLSAxXSA9IG1hc2tbM107XG5cbiAgICBpZiAobWVyZ2UpIHtcbiAgICAgIGFwcGx5TWFzayhkYXRhLCBtYXNrLCB0YXJnZXQsIG9mZnNldCwgZGF0YS5sZW5ndGgpO1xuICAgICAgcmV0dXJuIFt0YXJnZXRdO1xuICAgIH1cblxuICAgIGFwcGx5TWFzayhkYXRhLCBtYXNrLCBkYXRhLCAwLCBkYXRhLmxlbmd0aCk7XG4gICAgcmV0dXJuIFt0YXJnZXQsIGRhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgY2xvc2UgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsoTnVtYmVyfHVuZGVmaW5lZCl9IGNvZGUgVGhlIHN0YXR1cyBjb2RlIGNvbXBvbmVudCBvZiB0aGUgYm9keVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBUaGUgbWVzc2FnZSBjb21wb25lbnQgb2YgdGhlIGJvZHlcbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgbGV0IGJ1ZjtcblxuICAgIGlmIChjb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1ZiA9IEVNUFRZX0JVRkZFUjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2RlICE9PSAnbnVtYmVyJyB8fCAhaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBlcnJvciBjb2RlIG51bWJlcicpO1xuICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09ICcnKSB7XG4gICAgICBidWYgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMik7XG4gICAgICBidWYud3JpdGVVSW50MTZCRShjb2RlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAxMjMpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBtZXNzYWdlIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjMgYnl0ZXMnKTtcbiAgICAgIH1cblxuICAgICAgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIgKyBsZW5ndGgpO1xuICAgICAgYnVmLndyaXRlVUludDE2QkUoY29kZSwgMCk7XG4gICAgICBidWYud3JpdGUoZGF0YSwgMik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRvQ2xvc2UsIGJ1ZiwgbWFzaywgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0Nsb3NlKGJ1ZiwgbWFzaywgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGcmFtZXMgYW5kIHNlbmRzIGEgY2xvc2UgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkb0Nsb3NlKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICBTZW5kZXIuZnJhbWUoZGF0YSwge1xuICAgICAgICBmaW46IHRydWUsXG4gICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICBvcGNvZGU6IDB4MDgsXG4gICAgICAgIG1hc2ssXG4gICAgICAgIHJlYWRPbmx5OiBmYWxzZVxuICAgICAgfSksXG4gICAgICBjYlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBwaW5nIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcGluZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGNvbnN0IGJ1ZiA9IHRvQnVmZmVyKGRhdGEpO1xuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPiAxMjUpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgZGF0YSBzaXplIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjUgYnl0ZXMnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmbGF0aW5nKSB7XG4gICAgICB0aGlzLmVucXVldWUoW3RoaXMuZG9QaW5nLCBidWYsIG1hc2ssIHRvQnVmZmVyLnJlYWRPbmx5LCBjYl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvUGluZyhidWYsIG1hc2ssIHRvQnVmZmVyLnJlYWRPbmx5LCBjYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZyYW1lcyBhbmQgc2VuZHMgYSBwaW5nIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSByZWFkT25seSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgY2FuIGJlIG1vZGlmaWVkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkb1BpbmcoZGF0YSwgbWFzaywgcmVhZE9ubHksIGNiKSB7XG4gICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICBTZW5kZXIuZnJhbWUoZGF0YSwge1xuICAgICAgICBmaW46IHRydWUsXG4gICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICBvcGNvZGU6IDB4MDksXG4gICAgICAgIG1hc2ssXG4gICAgICAgIHJlYWRPbmx5XG4gICAgICB9KSxcbiAgICAgIGNiXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIHBvbmcgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBwb25nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgY29uc3QgYnVmID0gdG9CdWZmZXIoZGF0YSk7XG5cbiAgICBpZiAoYnVmLmxlbmd0aCA+IDEyNSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBkYXRhIHNpemUgbXVzdCBub3QgYmUgZ3JlYXRlciB0aGFuIDEyNSBieXRlcycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShbdGhpcy5kb1BvbmcsIGJ1ZiwgbWFzaywgdG9CdWZmZXIucmVhZE9ubHksIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9Qb25nKGJ1ZiwgbWFzaywgdG9CdWZmZXIucmVhZE9ubHksIGNiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnJhbWVzIGFuZCBzZW5kcyBhIHBvbmcgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlYWRPbmx5IFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBjYW4gYmUgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRvUG9uZyhkYXRhLCBtYXNrLCByZWFkT25seSwgY2IpIHtcbiAgICB0aGlzLnNlbmRGcmFtZShcbiAgICAgIFNlbmRlci5mcmFtZShkYXRhLCB7XG4gICAgICAgIGZpbjogdHJ1ZSxcbiAgICAgICAgcnN2MTogZmFsc2UsXG4gICAgICAgIG9wY29kZTogMHgwYSxcbiAgICAgICAgbWFzayxcbiAgICAgICAgcmVhZE9ubHlcbiAgICAgIH0pLFxuICAgICAgY2JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgZGF0YSBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuY29tcHJlc3MgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGNvbXByZXNzIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuYmluYXJ5IFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBpcyBiaW5hcnkgb3IgdGV4dFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZmluIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBmcmFnbWVudCBpcyB0aGUgbGFzdCBvbmVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLm1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNlbmQoZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBjb25zdCBidWYgPSB0b0J1ZmZlcihkYXRhKTtcbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG4gICAgbGV0IG9wY29kZSA9IG9wdGlvbnMuYmluYXJ5ID8gMiA6IDE7XG4gICAgbGV0IHJzdjEgPSBvcHRpb25zLmNvbXByZXNzO1xuXG4gICAgaWYgKHRoaXMuX2ZpcnN0RnJhZ21lbnQpIHtcbiAgICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnQgPSBmYWxzZTtcbiAgICAgIGlmIChyc3YxICYmIHBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgIHJzdjEgPSBidWYubGVuZ3RoID49IHBlck1lc3NhZ2VEZWZsYXRlLl90aHJlc2hvbGQ7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb21wcmVzcyA9IHJzdjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJzdjEgPSBmYWxzZTtcbiAgICAgIG9wY29kZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZmluKSB0aGlzLl9maXJzdEZyYWdtZW50ID0gdHJ1ZTtcblxuICAgIGlmIChwZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgICAgZmluOiBvcHRpb25zLmZpbixcbiAgICAgICAgcnN2MSxcbiAgICAgICAgb3Bjb2RlLFxuICAgICAgICBtYXNrOiBvcHRpb25zLm1hc2ssXG4gICAgICAgIHJlYWRPbmx5OiB0b0J1ZmZlci5yZWFkT25seVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgICB0aGlzLmVucXVldWUoW3RoaXMuZGlzcGF0Y2gsIGJ1ZiwgdGhpcy5fY29tcHJlc3MsIG9wdHMsIGNiXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKGJ1ZiwgdGhpcy5fY29tcHJlc3MsIG9wdHMsIGNiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICAgIFNlbmRlci5mcmFtZShidWYsIHtcbiAgICAgICAgICBmaW46IG9wdGlvbnMuZmluLFxuICAgICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICAgIG9wY29kZSxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zLm1hc2ssXG4gICAgICAgICAgcmVhZE9ubHk6IHRvQnVmZmVyLnJlYWRPbmx5XG4gICAgICAgIH0pLFxuICAgICAgICBjYlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIGRhdGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNvbXByZXNzIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBjb21wcmVzcyBgZGF0YWBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMub3Bjb2RlIFRoZSBvcGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnJlYWRPbmx5IFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBjYW4gYmUgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBGSU4gYml0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5tYXNrIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMucnN2MSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBSU1YxIGJpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGlzcGF0Y2goZGF0YSwgY29tcHJlc3MsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKCFjb21wcmVzcykge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGRhdGEsIG9wdGlvbnMpLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdO1xuXG4gICAgdGhpcy5fZGVmbGF0aW5nID0gdHJ1ZTtcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZS5jb21wcmVzcyhkYXRhLCBvcHRpb25zLmZpbiwgKF8sIGJ1ZikgPT4ge1xuICAgICAgaWYgKHRoaXMuX3NvY2tldC5kZXN0cm95ZWQpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICdUaGUgc29ja2V0IHdhcyBjbG9zZWQgd2hpbGUgZGF0YSB3YXMgYmVpbmcgY29tcHJlc3NlZCdcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYihlcnIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuX3F1ZXVlW2ldWzRdO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGVmbGF0aW5nID0gZmFsc2U7XG4gICAgICBvcHRpb25zLnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgICB0aGlzLnNlbmRGcmFtZShTZW5kZXIuZnJhbWUoYnVmLCBvcHRpb25zKSwgY2IpO1xuICAgICAgdGhpcy5kZXF1ZXVlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgcXVldWVkIHNlbmQgb3BlcmF0aW9ucy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlcXVldWUoKSB7XG4gICAgd2hpbGUgKCF0aGlzLl9kZWZsYXRpbmcgJiYgdGhpcy5fcXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuXG4gICAgICB0aGlzLl9idWZmZXJlZEJ5dGVzIC09IHBhcmFtc1sxXS5sZW5ndGg7XG4gICAgICBSZWZsZWN0LmFwcGx5KHBhcmFtc1swXSwgdGhpcywgcGFyYW1zLnNsaWNlKDEpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW5xdWV1ZXMgYSBzZW5kIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIFNlbmQgb3BlcmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBlbnF1ZXVlKHBhcmFtcykge1xuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgKz0gcGFyYW1zWzFdLmxlbmd0aDtcbiAgICB0aGlzLl9xdWV1ZS5wdXNoKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBmcmFtZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJbXX0gbGlzdCBUaGUgZnJhbWUgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2VuZEZyYW1lKGxpc3QsIGNiKSB7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aGlzLl9zb2NrZXQuY29yaygpO1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMF0pO1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMV0sIGNiKTtcbiAgICAgIHRoaXMuX3NvY2tldC51bmNvcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMF0sIGNiKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW5kZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxuLyoqXG4gKiBFbWl0cyB0aGUgYCdjbG9zZSdgIGV2ZW50IG9uIGEgc3RyZWFtLlxuICpcbiAqIEBwYXJhbSB7c3RyZWFtLkR1cGxleH0gVGhlIHN0cmVhbS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVtaXRDbG9zZShzdHJlYW0pIHtcbiAgc3RyZWFtLmVtaXQoJ2Nsb3NlJyk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgJ2VuZCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGR1cGxleE9uRW5kKCkge1xuICBpZiAoIXRoaXMuZGVzdHJveWVkICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlcnJvcidgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGR1cGxleE9uRXJyb3IoZXJyKSB7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZHVwbGV4T25FcnJvcik7XG4gIHRoaXMuZGVzdHJveSgpO1xuICBpZiAodGhpcy5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgLy8gRG8gbm90IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvci5cbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIFdyYXBzIGEgYFdlYlNvY2tldGAgaW4gYSBkdXBsZXggc3RyZWFtLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3cyBUaGUgYFdlYlNvY2tldGAgdG8gd3JhcFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSBgRHVwbGV4YCBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7c3RyZWFtLkR1cGxleH0gVGhlIGR1cGxleCBzdHJlYW1cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlV2ViU29ja2V0U3RyZWFtKHdzLCBvcHRpb25zKSB7XG4gIGxldCByZXN1bWVPblJlY2VpdmVyRHJhaW4gPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHJlY2VpdmVyT25EcmFpbigpIHtcbiAgICBpZiAocmVzdW1lT25SZWNlaXZlckRyYWluKSB3cy5fc29ja2V0LnJlc3VtZSgpO1xuICB9XG5cbiAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNPTk5FQ1RJTkcpIHtcbiAgICB3cy5vbmNlKCdvcGVuJywgZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgIHdzLl9yZWNlaXZlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2RyYWluJyk7XG4gICAgICB3cy5fcmVjZWl2ZXIub24oJ2RyYWluJywgcmVjZWl2ZXJPbkRyYWluKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB3cy5fcmVjZWl2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdkcmFpbicpO1xuICAgIHdzLl9yZWNlaXZlci5vbignZHJhaW4nLCByZWNlaXZlck9uRHJhaW4pO1xuICB9XG5cbiAgY29uc3QgZHVwbGV4ID0gbmV3IER1cGxleCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBhdXRvRGVzdHJveTogZmFsc2UsXG4gICAgZW1pdENsb3NlOiBmYWxzZSxcbiAgICBvYmplY3RNb2RlOiBmYWxzZSxcbiAgICB3cml0YWJsZU9iamVjdE1vZGU6IGZhbHNlXG4gIH0pO1xuXG4gIHdzLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gbWVzc2FnZShtc2cpIHtcbiAgICBpZiAoIWR1cGxleC5wdXNoKG1zZykpIHtcbiAgICAgIHJlc3VtZU9uUmVjZWl2ZXJEcmFpbiA9IGZhbHNlO1xuICAgICAgd3MuX3NvY2tldC5wYXVzZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgd3Mub25jZSgnZXJyb3InLCBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgZHVwbGV4LmRlc3Ryb3koZXJyKTtcbiAgfSk7XG5cbiAgd3Mub25jZSgnY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgZHVwbGV4LnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIGR1cGxleC5fZGVzdHJveSA9IGZ1bmN0aW9uKGVyciwgY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ0xPU0VEKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIGR1cGxleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuXG4gICAgd3Mub25jZSgnZXJyb3InLCBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0pO1xuXG4gICAgd3Mub25jZSgnY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgIGlmICghY2FsbGVkKSBjYWxsYmFjayhlcnIpO1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIGR1cGxleCk7XG4gICAgfSk7XG4gICAgd3MudGVybWluYXRlKCk7XG4gIH07XG5cbiAgZHVwbGV4Ll9maW5hbCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNPTk5FQ1RJTkcpIHtcbiAgICAgIHdzLm9uY2UoJ29wZW4nLCBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICBkdXBsZXguX2ZpbmFsKGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgYF9zb2NrZXRgIHByb3BlcnR5IGlzIGBudWxsYCBpdCBtZWFucyB0aGF0IGB3c2AgaXMgYVxuICAgIC8vIGNsaWVudCB3ZWJzb2NrZXQgYW5kIHRoZSBoYW5kc2hha2UgZmFpbGVkLiBJbiBmYWN0LCB3aGVuIHRoaXMgaGFwcGVucywgYVxuICAgIC8vIHNvY2tldCBpcyBuZXZlciBhc3NpZ25lZCB0byB0aGUgd2Vic29ja2V0LiBXYWl0IGZvciB0aGUgYCdlcnJvcidgIGV2ZW50XG4gICAgLy8gdGhhdCB3aWxsIGJlIGVtaXR0ZWQgYnkgdGhlIHdlYnNvY2tldC5cbiAgICBpZiAod3MuX3NvY2tldCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgaWYgKHdzLl9zb2NrZXQuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICBpZiAoZHVwbGV4Ll9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQpIGR1cGxleC5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdzLl9zb2NrZXQub25jZSgnZmluaXNoJywgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICAvLyBgZHVwbGV4YCBpcyBub3QgZGVzdHJveWVkIGhlcmUgYmVjYXVzZSB0aGUgYCdlbmQnYCBldmVudCB3aWxsIGJlXG4gICAgICAgIC8vIGVtaXR0ZWQgb24gYGR1cGxleGAgYWZ0ZXIgdGhpcyBgJ2ZpbmlzaCdgIGV2ZW50LiBUaGUgRU9GIHNpZ25hbGluZ1xuICAgICAgICAvLyBgbnVsbGAgY2h1bmsgaXMsIGluIGZhY3QsIHB1c2hlZCB3aGVuIHRoZSB3ZWJzb2NrZXQgZW1pdHMgYCdjbG9zZSdgLlxuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgICB3cy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBkdXBsZXguX3JlYWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuT1BFTiAmJiAhcmVzdW1lT25SZWNlaXZlckRyYWluKSB7XG4gICAgICByZXN1bWVPblJlY2VpdmVyRHJhaW4gPSB0cnVlO1xuICAgICAgaWYgKCF3cy5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUubmVlZERyYWluKSB3cy5fc29ja2V0LnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICBkdXBsZXguX3dyaXRlID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSB3cy5DT05ORUNUSU5HKSB7XG4gICAgICB3cy5vbmNlKCdvcGVuJywgZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgZHVwbGV4Ll93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdzLnNlbmQoY2h1bmssIGNhbGxiYWNrKTtcbiAgfTtcblxuICBkdXBsZXgub24oJ2VuZCcsIGR1cGxleE9uRW5kKTtcbiAgZHVwbGV4Lm9uKCdlcnJvcicsIGR1cGxleE9uRXJyb3IpO1xuICByZXR1cm4gZHVwbGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVdlYlNvY2tldFN0cmVhbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudHJ5IHtcbiAgY29uc3QgaXNWYWxpZFVURjggPSByZXF1aXJlKCd1dGYtOC12YWxpZGF0ZScpO1xuXG4gIGV4cG9ydHMuaXNWYWxpZFVURjggPVxuICAgIHR5cGVvZiBpc1ZhbGlkVVRGOCA9PT0gJ29iamVjdCdcbiAgICAgID8gaXNWYWxpZFVURjguVmFsaWRhdGlvbi5pc1ZhbGlkVVRGOCAvLyB1dGYtOC12YWxpZGF0ZUA8My4wLjBcbiAgICAgIDogaXNWYWxpZFVURjg7XG59IGNhdGNoIChlKSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7XG4gIGV4cG9ydHMuaXNWYWxpZFVURjggPSAoKSA9PiB0cnVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YXR1cyBjb2RlIGlzIGFsbG93ZWQgaW4gYSBjbG9zZSBmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY29kZSBUaGUgc3RhdHVzIGNvZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgc3RhdHVzIGNvZGUgaXMgdmFsaWQsIGVsc2UgYGZhbHNlYFxuICogQHB1YmxpY1xuICovXG5leHBvcnRzLmlzVmFsaWRTdGF0dXNDb2RlID0gKGNvZGUpID0+IHtcbiAgcmV0dXJuIChcbiAgICAoY29kZSA+PSAxMDAwICYmXG4gICAgICBjb2RlIDw9IDEwMTQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDUgJiZcbiAgICAgIGNvZGUgIT09IDEwMDYpIHx8XG4gICAgKGNvZGUgPj0gMzAwMCAmJiBjb2RlIDw9IDQ5OTkpXG4gICk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHsgY3JlYXRlSGFzaCB9ID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5jb25zdCB7IGNyZWF0ZVNlcnZlciwgU1RBVFVTX0NPREVTIH0gPSByZXF1aXJlKCdodHRwJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IFdlYlNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XG5jb25zdCB7IGZvcm1hdCwgcGFyc2UgfSA9IHJlcXVpcmUoJy4vZXh0ZW5zaW9uJyk7XG5jb25zdCB7IEdVSUQsIGtXZWJTb2NrZXQgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IGtleVJlZ2V4ID0gL15bKy8wLTlBLVphLXpdezIyfT09JC87XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgV2ViU29ja2V0IHNlcnZlci5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqL1xuY2xhc3MgV2ViU29ja2V0U2VydmVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGBXZWJTb2NrZXRTZXJ2ZXJgIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuYmFja2xvZyBUaGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIHF1ZXVlIG9mIHBlbmRpbmdcbiAgICogICAgIGNvbm5lY3Rpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jbGllbnRUcmFja2luZyBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gdHJhY2tcbiAgICogICAgIGNsaWVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5oYW5kbGVQcm90b2NvbHMgQSBob29rIHRvIGhhbmRsZSBwcm90b2NvbHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuaG9zdCBUaGUgaG9zdG5hbWUgd2hlcmUgdG8gYmluZCB0aGUgc2VydmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heFBheWxvYWQgVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIHNpemVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLm5vU2VydmVyIEVuYWJsZSBubyBzZXJ2ZXIgbW9kZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5wYXRoIEFjY2VwdCBvbmx5IGNvbm5lY3Rpb25zIG1hdGNoaW5nIHRoaXMgcGF0aFxuICAgKiBAcGFyYW0geyhCb29sZWFufE9iamVjdCl9IG9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUgRW5hYmxlL2Rpc2FibGVcbiAgICogICAgIHBlcm1lc3NhZ2UtZGVmbGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5wb3J0IFRoZSBwb3J0IHdoZXJlIHRvIGJpbmQgdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge2h0dHAuU2VydmVyfSBvcHRpb25zLnNlcnZlciBBIHByZS1jcmVhdGVkIEhUVFAvUyBzZXJ2ZXIgdG8gdXNlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudmVyaWZ5Q2xpZW50IEEgaG9vayB0byByZWplY3QgY29ubmVjdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQSBsaXN0ZW5lciBmb3IgdGhlIGBsaXN0ZW5pbmdgIGV2ZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBvcHRpb25zID0ge1xuICAgICAgbWF4UGF5bG9hZDogMTAwICogMTAyNCAqIDEwMjQsXG4gICAgICBwZXJNZXNzYWdlRGVmbGF0ZTogZmFsc2UsXG4gICAgICBoYW5kbGVQcm90b2NvbHM6IG51bGwsXG4gICAgICBjbGllbnRUcmFja2luZzogdHJ1ZSxcbiAgICAgIHZlcmlmeUNsaWVudDogbnVsbCxcbiAgICAgIG5vU2VydmVyOiBmYWxzZSxcbiAgICAgIGJhY2tsb2c6IG51bGwsIC8vIHVzZSBkZWZhdWx0ICg1MTEgYXMgaW1wbGVtZW50ZWQgaW4gbmV0LmpzKVxuICAgICAgc2VydmVyOiBudWxsLFxuICAgICAgaG9zdDogbnVsbCxcbiAgICAgIHBhdGg6IG51bGwsXG4gICAgICBwb3J0OiBudWxsLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICBpZiAob3B0aW9ucy5wb3J0ID09IG51bGwgJiYgIW9wdGlvbnMuc2VydmVyICYmICFvcHRpb25zLm5vU2VydmVyKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnT25lIG9mIHRoZSBcInBvcnRcIiwgXCJzZXJ2ZXJcIiwgb3IgXCJub1NlcnZlclwiIG9wdGlvbnMgbXVzdCBiZSBzcGVjaWZpZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBvcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmVyID0gY3JlYXRlU2VydmVyKChyZXEsIHJlcykgPT4ge1xuICAgICAgICBjb25zdCBib2R5ID0gU1RBVFVTX0NPREVTWzQyNl07XG5cbiAgICAgICAgcmVzLndyaXRlSGVhZCg0MjYsIHtcbiAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBib2R5Lmxlbmd0aCxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuZW5kKGJvZHkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zZXJ2ZXIubGlzdGVuKFxuICAgICAgICBvcHRpb25zLnBvcnQsXG4gICAgICAgIG9wdGlvbnMuaG9zdCxcbiAgICAgICAgb3B0aW9ucy5iYWNrbG9nLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuc2VydmVyKSB7XG4gICAgICB0aGlzLl9zZXJ2ZXIgPSBvcHRpb25zLnNlcnZlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2VydmVyKSB7XG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSBhZGRMaXN0ZW5lcnModGhpcy5fc2VydmVyLCB7XG4gICAgICAgIGxpc3RlbmluZzogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2xpc3RlbmluZycpLFxuICAgICAgICBlcnJvcjogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2Vycm9yJyksXG4gICAgICAgIHVwZ3JhZGU6IChyZXEsIHNvY2tldCwgaGVhZCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlVXBncmFkZShyZXEsIHNvY2tldCwgaGVhZCwgKHdzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3Rpb24nLCB3cywgcmVxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUgPT09IHRydWUpIG9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUgPSB7fTtcbiAgICBpZiAob3B0aW9ucy5jbGllbnRUcmFja2luZykgdGhpcy5jbGllbnRzID0gbmV3IFNldCgpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm91bmQgYWRkcmVzcywgdGhlIGFkZHJlc3MgZmFtaWx5IG5hbWUsIGFuZCBwb3J0IG9mIHRoZSBzZXJ2ZXJcbiAgICogYXMgcmVwb3J0ZWQgYnkgdGhlIG9wZXJhdGluZyBzeXN0ZW0gaWYgbGlzdGVuaW5nIG9uIGFuIElQIHNvY2tldC5cbiAgICogSWYgdGhlIHNlcnZlciBpcyBsaXN0ZW5pbmcgb24gYSBwaXBlIG9yIFVOSVggZG9tYWluIHNvY2tldCwgdGhlIG5hbWUgaXNcbiAgICogcmV0dXJuZWQgYXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEByZXR1cm4geyhPYmplY3R8U3RyaW5nfG51bGwpfSBUaGUgYWRkcmVzcyBvZiB0aGUgc2VydmVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZHJlc3MoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub1NlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc2VydmVyIGlzIG9wZXJhdGluZyBpbiBcIm5vU2VydmVyXCIgbW9kZScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fc2VydmVyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fc2VydmVyLmFkZHJlc3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBjbG9zZShjYikge1xuICAgIGlmIChjYikgdGhpcy5vbmNlKCdjbG9zZScsIGNiKTtcblxuICAgIC8vXG4gICAgLy8gVGVybWluYXRlIGFsbCBhc3NvY2lhdGVkIGNsaWVudHMuXG4gICAgLy9cbiAgICBpZiAodGhpcy5jbGllbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNsaWVudCBvZiB0aGlzLmNsaWVudHMpIGNsaWVudC50ZXJtaW5hdGUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXJ2ZXIgPSB0aGlzLl9zZXJ2ZXI7XG5cbiAgICBpZiAoc2VydmVyKSB7XG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycyA9IHRoaXMuX3NlcnZlciA9IG51bGw7XG5cbiAgICAgIC8vXG4gICAgICAvLyBDbG9zZSB0aGUgaHR0cCBzZXJ2ZXIgaWYgaXQgd2FzIGludGVybmFsbHkgY3JlYXRlZC5cbiAgICAgIC8vXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBvcnQgIT0gbnVsbCkge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKCkgPT4gdGhpcy5lbWl0KCdjbG9zZScpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWUgaWYgYSBnaXZlbiByZXF1ZXN0IHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoaXMgc2VydmVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge2h0dHAuSW5jb21pbmdNZXNzYWdlfSByZXEgUmVxdWVzdCBvYmplY3QgdG8gaW5zcGVjdFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHJlcXVlc3QgaXMgdmFsaWQsIGVsc2UgYGZhbHNlYFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaG91bGRIYW5kbGUocmVxKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYXRoKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHJlcS51cmwuaW5kZXhPZignPycpO1xuICAgICAgY29uc3QgcGF0aG5hbWUgPSBpbmRleCAhPT0gLTEgPyByZXEudXJsLnNsaWNlKDAsIGluZGV4KSA6IHJlcS51cmw7XG5cbiAgICAgIGlmIChwYXRobmFtZSAhPT0gdGhpcy5vcHRpb25zLnBhdGgpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYSBIVFRQIFVwZ3JhZGUgcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFRoZSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGUgc2VydmVyIGFuZCBjbGllbnRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGhlYWQgVGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgdXBncmFkZWQgc3RyZWFtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGhhbmRsZVVwZ3JhZGUocmVxLCBzb2NrZXQsIGhlYWQsIGNiKSB7XG4gICAgc29ja2V0Lm9uKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuXG4gICAgY29uc3Qga2V5ID1cbiAgICAgIHJlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWtleSddICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1rZXknXS50cmltKClcbiAgICAgICAgOiBmYWxzZTtcbiAgICBjb25zdCB2ZXJzaW9uID0gK3JlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXZlcnNpb24nXTtcbiAgICBjb25zdCBleHRlbnNpb25zID0ge307XG5cbiAgICBpZiAoXG4gICAgICByZXEubWV0aG9kICE9PSAnR0VUJyB8fFxuICAgICAgcmVxLmhlYWRlcnMudXBncmFkZS50b0xvd2VyQ2FzZSgpICE9PSAnd2Vic29ja2V0JyB8fFxuICAgICAgIWtleSB8fFxuICAgICAgIWtleVJlZ2V4LnRlc3Qoa2V5KSB8fFxuICAgICAgKHZlcnNpb24gIT09IDggJiYgdmVyc2lvbiAhPT0gMTMpIHx8XG4gICAgICAhdGhpcy5zaG91bGRIYW5kbGUocmVxKVxuICAgICkge1xuICAgICAgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgNDAwKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IG5ldyBQZXJNZXNzYWdlRGVmbGF0ZShcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0aGlzLm9wdGlvbnMubWF4UGF5bG9hZFxuICAgICAgKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2ZmZXJzID0gcGFyc2UocmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtZXh0ZW5zaW9ucyddKTtcblxuICAgICAgICBpZiAob2ZmZXJzW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICAgICAgcGVyTWVzc2FnZURlZmxhdGUuYWNjZXB0KG9mZmVyc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSk7XG4gICAgICAgICAgZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSA9IHBlck1lc3NhZ2VEZWZsYXRlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgNDAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIE9wdGlvbmFsbHkgY2FsbCBleHRlcm5hbCBjbGllbnQgdmVyaWZpY2F0aW9uIGhhbmRsZXIuXG4gICAgLy9cbiAgICBpZiAodGhpcy5vcHRpb25zLnZlcmlmeUNsaWVudCkge1xuICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgb3JpZ2luOlxuICAgICAgICAgIHJlcS5oZWFkZXJzW2Ake3ZlcnNpb24gPT09IDggPyAnc2VjLXdlYnNvY2tldC1vcmlnaW4nIDogJ29yaWdpbid9YF0sXG4gICAgICAgIHNlY3VyZTogISEocmVxLmNvbm5lY3Rpb24uYXV0aG9yaXplZCB8fCByZXEuY29ubmVjdGlvbi5lbmNyeXB0ZWQpLFxuICAgICAgICByZXFcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50KGluZm8sICh2ZXJpZmllZCwgY29kZSwgbWVzc2FnZSwgaGVhZGVycykgPT4ge1xuICAgICAgICAgIGlmICghdmVyaWZpZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIGNvZGUgfHwgNDAxLCBtZXNzYWdlLCBoZWFkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNvbXBsZXRlVXBncmFkZShrZXksIGV4dGVuc2lvbnMsIHJlcSwgc29ja2V0LCBoZWFkLCBjYik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnZlcmlmeUNsaWVudChpbmZvKSkgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgNDAxKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBsZXRlVXBncmFkZShrZXksIGV4dGVuc2lvbnMsIHJlcSwgc29ja2V0LCBoZWFkLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogVXBncmFkZSB0aGUgY29ubmVjdGlvbiB0byBXZWJTb2NrZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIHZhbHVlIG9mIHRoZSBgU2VjLVdlYlNvY2tldC1LZXlgIGhlYWRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9ucyBUaGUgYWNjZXB0ZWQgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0ge2h0dHAuSW5jb21pbmdNZXNzYWdlfSByZXEgVGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEBwYXJhbSB7bmV0LlNvY2tldH0gc29ja2V0IFRoZSBuZXR3b3JrIHNvY2tldCBiZXR3ZWVuIHRoZSBzZXJ2ZXIgYW5kIGNsaWVudFxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gaGVhZCBUaGUgZmlyc3QgcGFja2V0IG9mIHRoZSB1cGdyYWRlZCBzdHJlYW1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGNhbGxlZCBtb3JlIHRoYW4gb25jZSB3aXRoIHRoZSBzYW1lIHNvY2tldFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29tcGxldGVVcGdyYWRlKGtleSwgZXh0ZW5zaW9ucywgcmVxLCBzb2NrZXQsIGhlYWQsIGNiKSB7XG4gICAgLy9cbiAgICAvLyBEZXN0cm95IHRoZSBzb2NrZXQgaWYgdGhlIGNsaWVudCBoYXMgYWxyZWFkeSBzZW50IGEgRklOIHBhY2tldC5cbiAgICAvL1xuICAgIGlmICghc29ja2V0LnJlYWRhYmxlIHx8ICFzb2NrZXQud3JpdGFibGUpIHJldHVybiBzb2NrZXQuZGVzdHJveSgpO1xuXG4gICAgaWYgKHNvY2tldFtrV2ViU29ja2V0XSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnc2VydmVyLmhhbmRsZVVwZ3JhZGUoKSB3YXMgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIHdpdGggdGhlIHNhbWUgJyArXG4gICAgICAgICAgJ3NvY2tldCwgcG9zc2libHkgZHVlIHRvIGEgbWlzY29uZmlndXJhdGlvbidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlnZXN0ID0gY3JlYXRlSGFzaCgnc2hhMScpXG4gICAgICAudXBkYXRlKGtleSArIEdVSUQpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBbXG4gICAgICAnSFRUUC8xLjEgMTAxIFN3aXRjaGluZyBQcm90b2NvbHMnLFxuICAgICAgJ1VwZ3JhZGU6IHdlYnNvY2tldCcsXG4gICAgICAnQ29ubmVjdGlvbjogVXBncmFkZScsXG4gICAgICBgU2VjLVdlYlNvY2tldC1BY2NlcHQ6ICR7ZGlnZXN0fWBcbiAgICBdO1xuXG4gICAgY29uc3Qgd3MgPSBuZXcgV2ViU29ja2V0KG51bGwpO1xuICAgIGxldCBwcm90b2NvbCA9IHJlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXByb3RvY29sJ107XG5cbiAgICBpZiAocHJvdG9jb2wpIHtcbiAgICAgIHByb3RvY29sID0gcHJvdG9jb2wudHJpbSgpLnNwbGl0KC8gKiwgKi8pO1xuXG4gICAgICAvL1xuICAgICAgLy8gT3B0aW9uYWxseSBjYWxsIGV4dGVybmFsIHByb3RvY29sIHNlbGVjdGlvbiBoYW5kbGVyLlxuICAgICAgLy9cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFuZGxlUHJvdG9jb2xzKSB7XG4gICAgICAgIHByb3RvY29sID0gdGhpcy5vcHRpb25zLmhhbmRsZVByb3RvY29scyhwcm90b2NvbCwgcmVxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3RvY29sID0gcHJvdG9jb2xbMF07XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm90b2NvbCkge1xuICAgICAgICBoZWFkZXJzLnB1c2goYFNlYy1XZWJTb2NrZXQtUHJvdG9jb2w6ICR7cHJvdG9jb2x9YCk7XG4gICAgICAgIHdzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0ucGFyYW1zO1xuICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXQoe1xuICAgICAgICBbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV06IFtwYXJhbXNdXG4gICAgICB9KTtcbiAgICAgIGhlYWRlcnMucHVzaChgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zOiAke3ZhbHVlfWApO1xuICAgICAgd3MuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gQWxsb3cgZXh0ZXJuYWwgbW9kaWZpY2F0aW9uL2luc3BlY3Rpb24gb2YgaGFuZHNoYWtlIGhlYWRlcnMuXG4gICAgLy9cbiAgICB0aGlzLmVtaXQoJ2hlYWRlcnMnLCBoZWFkZXJzLCByZXEpO1xuXG4gICAgc29ja2V0LndyaXRlKGhlYWRlcnMuY29uY2F0KCdcXHJcXG4nKS5qb2luKCdcXHJcXG4nKSk7XG4gICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuXG4gICAgd3Muc2V0U29ja2V0KHNvY2tldCwgaGVhZCwgdGhpcy5vcHRpb25zLm1heFBheWxvYWQpO1xuXG4gICAgaWYgKHRoaXMuY2xpZW50cykge1xuICAgICAgdGhpcy5jbGllbnRzLmFkZCh3cyk7XG4gICAgICB3cy5vbignY2xvc2UnLCAoKSA9PiB0aGlzLmNsaWVudHMuZGVsZXRlKHdzKSk7XG4gICAgfVxuXG4gICAgY2Iod3MpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0U2VydmVyO1xuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lcnMgb24gYW4gYEV2ZW50RW1pdHRlcmAgdXNpbmcgYSBtYXAgb2YgPGV2ZW50LCBsaXN0ZW5lcj5cbiAqIHBhaXJzLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBzZXJ2ZXIgVGhlIGV2ZW50IGVtaXR0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0LjxTdHJpbmcsIEZ1bmN0aW9uPn0gbWFwIFRoZSBsaXN0ZW5lcnMgdG8gYWRkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBhZGRlZCBsaXN0ZW5lcnMgd2hlbiBjYWxsZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVycyhzZXJ2ZXIsIG1hcCkge1xuICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHNlcnZlci5vbihldmVudCwgbWFwW2V2ZW50XSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHtcbiAgICAgIHNlcnZlci5yZW1vdmVMaXN0ZW5lcihldmVudCwgbWFwW2V2ZW50XSk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEVtaXQgYSBgJ2Nsb3NlJ2AgZXZlbnQgb24gYW4gYEV2ZW50RW1pdHRlcmAuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IHNlcnZlciBUaGUgZXZlbnQgZW1pdHRlclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW1pdENsb3NlKHNlcnZlcikge1xuICBzZXJ2ZXIuZW1pdCgnY2xvc2UnKTtcbn1cblxuLyoqXG4gKiBIYW5kbGUgcHJlbWF0dXJlIHNvY2tldCBlcnJvcnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25FcnJvcigpIHtcbiAgdGhpcy5kZXN0cm95KCk7XG59XG5cbi8qKlxuICogQ2xvc2UgdGhlIGNvbm5lY3Rpb24gd2hlbiBwcmVjb25kaXRpb25zIGFyZSBub3QgZnVsZmlsbGVkLlxuICpcbiAqIEBwYXJhbSB7bmV0LlNvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgb2YgdGhlIHVwZ3JhZGUgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIEhUVFAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV0gVGhlIEhUVFAgcmVzcG9uc2UgYm9keVxuICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXSBBZGRpdGlvbmFsIEhUVFAgcmVzcG9uc2UgaGVhZGVyc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCBjb2RlLCBtZXNzYWdlLCBoZWFkZXJzKSB7XG4gIGlmIChzb2NrZXQud3JpdGFibGUpIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBTVEFUVVNfQ09ERVNbY29kZV07XG4gICAgaGVhZGVycyA9IHtcbiAgICAgIENvbm5lY3Rpb246ICdjbG9zZScsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcsXG4gICAgICAnQ29udGVudC1MZW5ndGgnOiBCdWZmZXIuYnl0ZUxlbmd0aChtZXNzYWdlKSxcbiAgICAgIC4uLmhlYWRlcnNcbiAgICB9O1xuXG4gICAgc29ja2V0LndyaXRlKFxuICAgICAgYEhUVFAvMS4xICR7Y29kZX0gJHtTVEFUVVNfQ09ERVNbY29kZV19XFxyXFxuYCArXG4gICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgLm1hcCgoaCkgPT4gYCR7aH06ICR7aGVhZGVyc1toXX1gKVxuICAgICAgICAgIC5qb2luKCdcXHJcXG4nKSArXG4gICAgICAgICdcXHJcXG5cXHJcXG4nICtcbiAgICAgICAgbWVzc2FnZVxuICAgICk7XG4gIH1cblxuICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG4gIHNvY2tldC5kZXN0cm95KCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xuY29uc3QgdGxzID0gcmVxdWlyZSgndGxzJyk7XG5jb25zdCB7IHJhbmRvbUJ5dGVzLCBjcmVhdGVIYXNoIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcbmNvbnN0IHsgVVJMIH0gPSByZXF1aXJlKCd1cmwnKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3QgUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyJyk7XG5jb25zdCBTZW5kZXIgPSByZXF1aXJlKCcuL3NlbmRlcicpO1xuY29uc3Qge1xuICBCSU5BUllfVFlQRVMsXG4gIEVNUFRZX0JVRkZFUixcbiAgR1VJRCxcbiAga1N0YXR1c0NvZGUsXG4gIGtXZWJTb2NrZXQsXG4gIE5PT1Bcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgeyBhZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyIH0gPSByZXF1aXJlKCcuL2V2ZW50LXRhcmdldCcpO1xuY29uc3QgeyBmb3JtYXQsIHBhcnNlIH0gPSByZXF1aXJlKCcuL2V4dGVuc2lvbicpO1xuY29uc3QgeyB0b0J1ZmZlciB9ID0gcmVxdWlyZSgnLi9idWZmZXItdXRpbCcpO1xuXG5jb25zdCByZWFkeVN0YXRlcyA9IFsnQ09OTkVDVElORycsICdPUEVOJywgJ0NMT1NJTkcnLCAnQ0xPU0VEJ107XG5jb25zdCBwcm90b2NvbFZlcnNpb25zID0gWzgsIDEzXTtcbmNvbnN0IGNsb3NlVGltZW91dCA9IDMwICogMTAwMDtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBXZWJTb2NrZXQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXG4gKi9cbmNsYXNzIFdlYlNvY2tldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYFdlYlNvY2tldGAuXG4gICAqXG4gICAqIEBwYXJhbSB7KFN0cmluZ3x1cmwuVVJMKX0gYWRkcmVzcyBUaGUgVVJMIHRvIHdoaWNoIHRvIGNvbm5lY3RcbiAgICogQHBhcmFtIHsoU3RyaW5nfFN0cmluZ1tdKX0gcHJvdG9jb2xzIFRoZSBzdWJwcm90b2NvbHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29ubmVjdGlvbiBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkc7XG4gICAgdGhpcy5wcm90b2NvbCA9ICcnO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IEJJTkFSWV9UWVBFU1swXTtcbiAgICB0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9jbG9zZUZyYW1lU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMuX2Nsb3NlVGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2Nsb3NlQ29kZSA9IDEwMDY7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IHt9O1xuICAgIHRoaXMuX3JlY2VpdmVyID0gbnVsbDtcbiAgICB0aGlzLl9zZW5kZXIgPSBudWxsO1xuICAgIHRoaXMuX3NvY2tldCA9IG51bGw7XG5cbiAgICBpZiAoYWRkcmVzcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnVmZmVyZWRBbW91bnQgPSAwO1xuICAgICAgdGhpcy5faXNTZXJ2ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3JlZGlyZWN0cyA9IDA7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3RvY29scykpIHtcbiAgICAgICAgcHJvdG9jb2xzID0gcHJvdG9jb2xzLmpvaW4oJywgJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm90b2NvbHMgPT09ICdvYmplY3QnICYmIHByb3RvY29scyAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gcHJvdG9jb2xzO1xuICAgICAgICBwcm90b2NvbHMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGluaXRBc0NsaWVudCh0aGlzLCBhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc1NlcnZlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IENPTk5FQ1RJTkcoKSB7XG4gICAgcmV0dXJuIFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICB9XG4gIGdldCBDTE9TSU5HKCkge1xuICAgIHJldHVybiBXZWJTb2NrZXQuQ0xPU0lORztcbiAgfVxuICBnZXQgQ0xPU0VEKCkge1xuICAgIHJldHVybiBXZWJTb2NrZXQuQ0xPU0VEO1xuICB9XG4gIGdldCBPUEVOKCkge1xuICAgIHJldHVybiBXZWJTb2NrZXQuT1BFTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGRldmlhdGVzIGZyb20gdGhlIFdIQVRXRyBpbnRlcmZhY2Ugc2luY2Ugd3MgZG9lc24ndCBzdXBwb3J0IHRoZVxuICAgKiByZXF1aXJlZCBkZWZhdWx0IFwiYmxvYlwiIHR5cGUgKGluc3RlYWQgd2UgZGVmaW5lIGEgY3VzdG9tIFwibm9kZWJ1ZmZlclwiXG4gICAqIHR5cGUpLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IGJpbmFyeVR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVR5cGU7XG4gIH1cblxuICBzZXQgYmluYXJ5VHlwZSh0eXBlKSB7XG4gICAgaWYgKCFCSU5BUllfVFlQRVMuaW5jbHVkZXModHlwZSkpIHJldHVybjtcblxuICAgIHRoaXMuX2JpbmFyeVR5cGUgPSB0eXBlO1xuXG4gICAgLy9cbiAgICAvLyBBbGxvdyB0byBjaGFuZ2UgYGJpbmFyeVR5cGVgIG9uIHRoZSBmbHkuXG4gICAgLy9cbiAgICBpZiAodGhpcy5fcmVjZWl2ZXIpIHRoaXMuX3JlY2VpdmVyLl9iaW5hcnlUeXBlID0gdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IGJ1ZmZlcmVkQW1vdW50KCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSByZXR1cm4gdGhpcy5fYnVmZmVyZWRBbW91bnQ7XG5cbiAgICAvL1xuICAgIC8vIGBzb2NrZXQuYnVmZmVyU2l6ZWAgaXMgYHVuZGVmaW5lZGAgaWYgdGhlIHNvY2tldCBpcyBjbG9zZWQuXG4gICAgLy9cbiAgICByZXR1cm4gKHRoaXMuX3NvY2tldC5idWZmZXJTaXplIHx8IDApICsgdGhpcy5fc2VuZGVyLl9idWZmZXJlZEJ5dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgZXh0ZW5zaW9ucygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZXh0ZW5zaW9ucykuam9pbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1cCB0aGUgc29ja2V0IGFuZCB0aGUgaW50ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGUgc2VydmVyIGFuZCBjbGllbnRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGhlYWQgVGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgdXBncmFkZWQgc3RyZWFtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhQYXlsb2FkIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBzaXplXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRTb2NrZXQoc29ja2V0LCBoZWFkLCBtYXhQYXlsb2FkKSB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBuZXcgUmVjZWl2ZXIoXG4gICAgICB0aGlzLl9iaW5hcnlUeXBlLFxuICAgICAgdGhpcy5fZXh0ZW5zaW9ucyxcbiAgICAgIHRoaXMuX2lzU2VydmVyLFxuICAgICAgbWF4UGF5bG9hZFxuICAgICk7XG5cbiAgICB0aGlzLl9zZW5kZXIgPSBuZXcgU2VuZGVyKHNvY2tldCwgdGhpcy5fZXh0ZW5zaW9ucyk7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0aGlzLl9zb2NrZXQgPSBzb2NrZXQ7XG5cbiAgICByZWNlaXZlcltrV2ViU29ja2V0XSA9IHRoaXM7XG4gICAgc29ja2V0W2tXZWJTb2NrZXRdID0gdGhpcztcblxuICAgIHJlY2VpdmVyLm9uKCdjb25jbHVkZScsIHJlY2VpdmVyT25Db25jbHVkZSk7XG4gICAgcmVjZWl2ZXIub24oJ2RyYWluJywgcmVjZWl2ZXJPbkRyYWluKTtcbiAgICByZWNlaXZlci5vbignZXJyb3InLCByZWNlaXZlck9uRXJyb3IpO1xuICAgIHJlY2VpdmVyLm9uKCdtZXNzYWdlJywgcmVjZWl2ZXJPbk1lc3NhZ2UpO1xuICAgIHJlY2VpdmVyLm9uKCdwaW5nJywgcmVjZWl2ZXJPblBpbmcpO1xuICAgIHJlY2VpdmVyLm9uKCdwb25nJywgcmVjZWl2ZXJPblBvbmcpO1xuXG4gICAgc29ja2V0LnNldFRpbWVvdXQoMCk7XG4gICAgc29ja2V0LnNldE5vRGVsYXkoKTtcblxuICAgIGlmIChoZWFkLmxlbmd0aCA+IDApIHNvY2tldC51bnNoaWZ0KGhlYWQpO1xuXG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIHNvY2tldE9uQ2xvc2UpO1xuICAgIHNvY2tldC5vbignZGF0YScsIHNvY2tldE9uRGF0YSk7XG4gICAgc29ja2V0Lm9uKCdlbmQnLCBzb2NrZXRPbkVuZCk7XG4gICAgc29ja2V0Lm9uKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0Lk9QRU47XG4gICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCB0aGUgYCdjbG9zZSdgIGV2ZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZW1pdENsb3NlKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSB7XG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIHRoaXMuX2Nsb3NlQ29kZSwgdGhpcy5fY2xvc2VNZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXS5jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRDtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgdGhpcy5fY2xvc2VDb2RlLCB0aGlzLl9jbG9zZU1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgY2xvc2luZyBoYW5kc2hha2UuXG4gICAqXG4gICAqICAgICAgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLStcbiAgICogICAgIC0gLSAtfHdzLmNsb3NlKCl8LS0+fGNsb3NlIGZyYW1lfC0tPnx3cy5jbG9zZSgpfC0gLSAtXG4gICAqICAgIHwgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLSsgICAgIHxcbiAgICogICAgICAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgICAgICAgIHxcbiAgICogQ0xPU0lORyAgfHdzLmNsb3NlKCl8PC0tfGNsb3NlIGZyYW1lfDwtLSstLS0tLSsgICAgICAgQ0xPU0lOR1xuICAgKiAgICAgICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgfFxuICAgKiAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICstLS0rICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0+fGZpbnwgLSAtIC0gLVxuICAgKiAgICB8ICAgICAgICAgKy0tLSsgICAgICAgICAgICAgICAgICAgICAgfCAgICstLS0rXG4gICAqICAgICAtIC0gLSAtIC18ZmlufDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqICAgICAgICAgICAgICArLS0tK1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29kZSBTdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBjbG9zaW5nXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIEEgc3RyaW5nIGV4cGxhaW5pbmcgd2h5IHRoZSBjb25uZWN0aW9uIGlzIGNsb3NpbmdcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY29kZSwgZGF0YSkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRUQpIHJldHVybjtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgY29uc3QgbXNnID0gJ1dlYlNvY2tldCB3YXMgY2xvc2VkIGJlZm9yZSB0aGUgY29ubmVjdGlvbiB3YXMgZXN0YWJsaXNoZWQnO1xuICAgICAgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHRoaXMsIHRoaXMuX3JlcSwgbXNnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0lORykge1xuICAgICAgaWYgKHRoaXMuX2Nsb3NlRnJhbWVTZW50ICYmIHRoaXMuX2Nsb3NlRnJhbWVSZWNlaXZlZCkgdGhpcy5fc29ja2V0LmVuZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIHRoaXMuX3NlbmRlci5jbG9zZShjb2RlLCBkYXRhLCAhdGhpcy5faXNTZXJ2ZXIsIChlcnIpID0+IHtcbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIGVycm9yIGlzIGhhbmRsZWQgYnkgdGhlIGAnZXJyb3InYCBsaXN0ZW5lciBvbiB0aGUgc29ja2V0LiBXZSBvbmx5XG4gICAgICAvLyB3YW50IHRvIGtub3cgaWYgdGhlIGNsb3NlIGZyYW1lIGhhcyBiZWVuIHNlbnQgaGVyZS5cbiAgICAgIC8vXG4gICAgICBpZiAoZXJyKSByZXR1cm47XG5cbiAgICAgIHRoaXMuX2Nsb3NlRnJhbWVTZW50ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQpIHRoaXMuX3NvY2tldC5lbmQoKTtcbiAgICB9KTtcblxuICAgIC8vXG4gICAgLy8gU3BlY2lmeSBhIHRpbWVvdXQgZm9yIHRoZSBjbG9zaW5nIGhhbmRzaGFrZSB0byBjb21wbGV0ZS5cbiAgICAvL1xuICAgIHRoaXMuX2Nsb3NlVGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgdGhpcy5fc29ja2V0LmRlc3Ryb3kuYmluZCh0aGlzLl9zb2NrZXQpLFxuICAgICAgY2xvc2VUaW1lb3V0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgcGluZy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXNrIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIHRoZSBwaW5nIGlzIHNlbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcGluZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBkYXRhO1xuICAgICAgZGF0YSA9IG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBtYXNrO1xuICAgICAgbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHNlbmRBZnRlckNsb3NlKHRoaXMsIGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFzayA9PT0gdW5kZWZpbmVkKSBtYXNrID0gIXRoaXMuX2lzU2VydmVyO1xuICAgIHRoaXMuX3NlbmRlci5waW5nKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBtYXNrLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIHBvbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2sgd2hpY2ggaXMgZXhlY3V0ZWQgd2hlbiB0aGUgcG9uZyBpcyBzZW50XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBvbmcoZGF0YSwgbWFzaywgY2IpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgMCAoQ09OTkVDVElORyknKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gZGF0YTtcbiAgICAgIGRhdGEgPSBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hc2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gbWFzaztcbiAgICAgIG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICBzZW5kQWZ0ZXJDbG9zZSh0aGlzLCBkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1hc2sgPT09IHVuZGVmaW5lZCkgbWFzayA9ICF0aGlzLl9pc1NlcnZlcjtcbiAgICB0aGlzLl9zZW5kZXIucG9uZyhkYXRhIHx8IEVNUFRZX0JVRkZFUiwgbWFzaywgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBkYXRhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jb21wcmVzcyBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gY29tcHJlc3NcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuYmluYXJ5IFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBpcyBiaW5hcnkgb3IgdGV4dFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZmluIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBmcmFnbWVudCBpcyB0aGUgbGFzdCBvbmVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLm1hc2sgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrIHdoaWNoIGlzIGV4ZWN1dGVkIHdoZW4gZGF0YSBpcyB3cml0dGVuIG91dFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZW5kKGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlIDAgKENPTk5FQ1RJTkcpJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG9wdGlvbnM7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICBzZW5kQWZ0ZXJDbG9zZSh0aGlzLCBkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJpbmFyeTogdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnLFxuICAgICAgbWFzazogIXRoaXMuX2lzU2VydmVyLFxuICAgICAgY29tcHJlc3M6IHRydWUsXG4gICAgICBmaW46IHRydWUsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcblxuICAgIGlmICghdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbmRlci5zZW5kKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBvcHRzLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2libHkgY2xvc2UgdGhlIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRlcm1pbmF0ZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKSByZXR1cm47XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdXZWJTb2NrZXQgd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkJztcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZSh0aGlzLCB0aGlzLl9yZXEsIG1zZyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgICB0aGlzLl9zb2NrZXQuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxufVxuXG5yZWFkeVN0YXRlcy5mb3JFYWNoKChyZWFkeVN0YXRlLCBpKSA9PiB7XG4gIFdlYlNvY2tldFtyZWFkeVN0YXRlXSA9IGk7XG59KTtcblxuLy9cbi8vIEFkZCB0aGUgYG9ub3BlbmAsIGBvbmVycm9yYCwgYG9uY2xvc2VgLCBhbmQgYG9ubWVzc2FnZWAgYXR0cmlidXRlcy5cbi8vIFNlZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tcy5odG1sI3RoZS13ZWJzb2NrZXQtaW50ZXJmYWNlXG4vL1xuWydvcGVuJywgJ2Vycm9yJywgJ2Nsb3NlJywgJ21lc3NhZ2UnXS5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsIGBvbiR7bWV0aG9kfWAsIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxpc3RlbmVyIG9mIHRoZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4geyhGdW5jdGlvbnx1bmRlZmluZWQpfSBUaGUgZXZlbnQgbGlzdGVuZXIgb3IgYHVuZGVmaW5lZGBcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMobWV0aG9kKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uX2xpc3RlbmVyKSByZXR1cm4gbGlzdGVuZXJzW2ldLl9saXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEFkZCBhIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gYWRkXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNldChsaXN0ZW5lcikge1xuICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMobWV0aG9kKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFJlbW92ZSBvbmx5IHRoZSBsaXN0ZW5lcnMgYWRkZWQgdmlhIGBhZGRFdmVudExpc3RlbmVyYC5cbiAgICAgICAgLy9cbiAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5fbGlzdGVuZXIpIHRoaXMucmVtb3ZlTGlzdGVuZXIobWV0aG9kLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKG1ldGhvZCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuV2ViU29ja2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbldlYlNvY2tldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBXZWJTb2NrZXQgY2xpZW50LlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIGNsaWVudCB0byBpbml0aWFsaXplXG4gKiBAcGFyYW0geyhTdHJpbmd8dXJsLlVSTCl9IGFkZHJlc3MgVGhlIFVSTCB0byB3aGljaCB0byBjb25uZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2xzIFRoZSBzdWJwcm90b2NvbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHBhcmFtIHsoQm9vbGVhbnxPYmplY3QpfSBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlIEVuYWJsZS9kaXNhYmxlXG4gKiAgICAgcGVybWVzc2FnZS1kZWZsYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5oYW5kc2hha2VUaW1lb3V0IFRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGVcbiAqICAgICBoYW5kc2hha2UgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucHJvdG9jb2xWZXJzaW9uIFZhbHVlIG9mIHRoZSBgU2VjLVdlYlNvY2tldC1WZXJzaW9uYFxuICogICAgIGhlYWRlclxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMub3JpZ2luIFZhbHVlIG9mIHRoZSBgT3JpZ2luYCBvclxuICogICAgIGBTZWMtV2ViU29ja2V0LU9yaWdpbmAgaGVhZGVyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhQYXlsb2FkIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBzaXplXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZm9sbG93UmVkaXJlY3RzIFdoZXRoZXIgb3Igbm90IHRvIGZvbGxvdyByZWRpcmVjdHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heFJlZGlyZWN0cyBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVkaXJlY3RzIGFsbG93ZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluaXRBc0NsaWVudCh3ZWJzb2NrZXQsIGFkZHJlc3MsIHByb3RvY29scywgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0ge1xuICAgIHByb3RvY29sVmVyc2lvbjogcHJvdG9jb2xWZXJzaW9uc1sxXSxcbiAgICBtYXhQYXlsb2FkOiAxMDAgKiAxMDI0ICogMTAyNCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogdHJ1ZSxcbiAgICBmb2xsb3dSZWRpcmVjdHM6IGZhbHNlLFxuICAgIG1heFJlZGlyZWN0czogMTAsXG4gICAgLi4ub3B0aW9ucyxcbiAgICBjcmVhdGVDb25uZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgc29ja2V0UGF0aDogdW5kZWZpbmVkLFxuICAgIGhvc3RuYW1lOiB1bmRlZmluZWQsXG4gICAgcHJvdG9jb2w6IHVuZGVmaW5lZCxcbiAgICB0aW1lb3V0OiB1bmRlZmluZWQsXG4gICAgbWV0aG9kOiB1bmRlZmluZWQsXG4gICAgaG9zdDogdW5kZWZpbmVkLFxuICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICBwb3J0OiB1bmRlZmluZWRcbiAgfTtcblxuICBpZiAoIXByb3RvY29sVmVyc2lvbnMuaW5jbHVkZXMob3B0cy5wcm90b2NvbFZlcnNpb24pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICBgVW5zdXBwb3J0ZWQgcHJvdG9jb2wgdmVyc2lvbjogJHtvcHRzLnByb3RvY29sVmVyc2lvbn0gYCArXG4gICAgICAgIGAoc3VwcG9ydGVkIHZlcnNpb25zOiAke3Byb3RvY29sVmVyc2lvbnMuam9pbignLCAnKX0pYFxuICAgICk7XG4gIH1cblxuICBsZXQgcGFyc2VkVXJsO1xuXG4gIGlmIChhZGRyZXNzIGluc3RhbmNlb2YgVVJMKSB7XG4gICAgcGFyc2VkVXJsID0gYWRkcmVzcztcbiAgICB3ZWJzb2NrZXQudXJsID0gYWRkcmVzcy5ocmVmO1xuICB9IGVsc2Uge1xuICAgIHBhcnNlZFVybCA9IG5ldyBVUkwoYWRkcmVzcyk7XG4gICAgd2Vic29ja2V0LnVybCA9IGFkZHJlc3M7XG4gIH1cblxuICBjb25zdCBpc1VuaXhTb2NrZXQgPSBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICd3cyt1bml4Oic7XG5cbiAgaWYgKCFwYXJzZWRVcmwuaG9zdCAmJiAoIWlzVW5peFNvY2tldCB8fCAhcGFyc2VkVXJsLnBhdGhuYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBVUkw6ICR7d2Vic29ja2V0LnVybH1gKTtcbiAgfVxuXG4gIGNvbnN0IGlzU2VjdXJlID1cbiAgICBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICd3c3M6JyB8fCBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICBjb25zdCBkZWZhdWx0UG9ydCA9IGlzU2VjdXJlID8gNDQzIDogODA7XG4gIGNvbnN0IGtleSA9IHJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIGNvbnN0IGdldCA9IGlzU2VjdXJlID8gaHR0cHMuZ2V0IDogaHR0cC5nZXQ7XG4gIGxldCBwZXJNZXNzYWdlRGVmbGF0ZTtcblxuICBvcHRzLmNyZWF0ZUNvbm5lY3Rpb24gPSBpc1NlY3VyZSA/IHRsc0Nvbm5lY3QgOiBuZXRDb25uZWN0O1xuICBvcHRzLmRlZmF1bHRQb3J0ID0gb3B0cy5kZWZhdWx0UG9ydCB8fCBkZWZhdWx0UG9ydDtcbiAgb3B0cy5wb3J0ID0gcGFyc2VkVXJsLnBvcnQgfHwgZGVmYXVsdFBvcnQ7XG4gIG9wdHMuaG9zdCA9IHBhcnNlZFVybC5ob3N0bmFtZS5zdGFydHNXaXRoKCdbJylcbiAgICA/IHBhcnNlZFVybC5ob3N0bmFtZS5zbGljZSgxLCAtMSlcbiAgICA6IHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgb3B0cy5oZWFkZXJzID0ge1xuICAgICdTZWMtV2ViU29ja2V0LVZlcnNpb24nOiBvcHRzLnByb3RvY29sVmVyc2lvbixcbiAgICAnU2VjLVdlYlNvY2tldC1LZXknOiBrZXksXG4gICAgQ29ubmVjdGlvbjogJ1VwZ3JhZGUnLFxuICAgIFVwZ3JhZGU6ICd3ZWJzb2NrZXQnLFxuICAgIC4uLm9wdHMuaGVhZGVyc1xuICB9O1xuICBvcHRzLnBhdGggPSBwYXJzZWRVcmwucGF0aG5hbWUgKyBwYXJzZWRVcmwuc2VhcmNoO1xuICBvcHRzLnRpbWVvdXQgPSBvcHRzLmhhbmRzaGFrZVRpbWVvdXQ7XG5cbiAgaWYgKG9wdHMucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZSA9IG5ldyBQZXJNZXNzYWdlRGVmbGF0ZShcbiAgICAgIG9wdHMucGVyTWVzc2FnZURlZmxhdGUgIT09IHRydWUgPyBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIDoge30sXG4gICAgICBmYWxzZSxcbiAgICAgIG9wdHMubWF4UGF5bG9hZFxuICAgICk7XG4gICAgb3B0cy5oZWFkZXJzWydTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMnXSA9IGZvcm1hdCh7XG4gICAgICBbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV06IHBlck1lc3NhZ2VEZWZsYXRlLm9mZmVyKClcbiAgICB9KTtcbiAgfVxuICBpZiAocHJvdG9jb2xzKSB7XG4gICAgb3B0cy5oZWFkZXJzWydTZWMtV2ViU29ja2V0LVByb3RvY29sJ10gPSBwcm90b2NvbHM7XG4gIH1cbiAgaWYgKG9wdHMub3JpZ2luKSB7XG4gICAgaWYgKG9wdHMucHJvdG9jb2xWZXJzaW9uIDwgMTMpIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1PcmlnaW4nXSA9IG9wdHMub3JpZ2luO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzLmhlYWRlcnMuT3JpZ2luID0gb3B0cy5vcmlnaW47XG4gICAgfVxuICB9XG4gIGlmIChwYXJzZWRVcmwudXNlcm5hbWUgfHwgcGFyc2VkVXJsLnBhc3N3b3JkKSB7XG4gICAgb3B0cy5hdXRoID0gYCR7cGFyc2VkVXJsLnVzZXJuYW1lfToke3BhcnNlZFVybC5wYXNzd29yZH1gO1xuICB9XG5cbiAgaWYgKGlzVW5peFNvY2tldCkge1xuICAgIGNvbnN0IHBhcnRzID0gb3B0cy5wYXRoLnNwbGl0KCc6Jyk7XG5cbiAgICBvcHRzLnNvY2tldFBhdGggPSBwYXJ0c1swXTtcbiAgICBvcHRzLnBhdGggPSBwYXJ0c1sxXTtcbiAgfVxuXG4gIGxldCByZXEgPSAod2Vic29ja2V0Ll9yZXEgPSBnZXQob3B0cykpO1xuXG4gIGlmIChvcHRzLnRpbWVvdXQpIHtcbiAgICByZXEub24oJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHJlcSwgJ09wZW5pbmcgaGFuZHNoYWtlIGhhcyB0aW1lZCBvdXQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlcS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgaWYgKHdlYnNvY2tldC5fcmVxLmFib3J0ZWQpIHJldHVybjtcblxuICAgIHJlcSA9IHdlYnNvY2tldC5fcmVxID0gbnVsbDtcbiAgICB3ZWJzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIHdlYnNvY2tldC5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgd2Vic29ja2V0LmVtaXRDbG9zZSgpO1xuICB9KTtcblxuICByZXEub24oJ3Jlc3BvbnNlJywgKHJlcykgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IHJlcy5zdGF0dXNDb2RlO1xuXG4gICAgaWYgKFxuICAgICAgbG9jYXRpb24gJiZcbiAgICAgIG9wdHMuZm9sbG93UmVkaXJlY3RzICYmXG4gICAgICBzdGF0dXNDb2RlID49IDMwMCAmJlxuICAgICAgc3RhdHVzQ29kZSA8IDQwMFxuICAgICkge1xuICAgICAgaWYgKCsrd2Vic29ja2V0Ll9yZWRpcmVjdHMgPiBvcHRzLm1heFJlZGlyZWN0cykge1xuICAgICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHJlcSwgJ01heGltdW0gcmVkaXJlY3RzIGV4Y2VlZGVkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVxLmFib3J0KCk7XG5cbiAgICAgIGNvbnN0IGFkZHIgPSBuZXcgVVJMKGxvY2F0aW9uLCBhZGRyZXNzKTtcblxuICAgICAgaW5pdEFzQ2xpZW50KHdlYnNvY2tldCwgYWRkciwgcHJvdG9jb2xzLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKCF3ZWJzb2NrZXQuZW1pdCgndW5leHBlY3RlZC1yZXNwb25zZScsIHJlcSwgcmVzKSkge1xuICAgICAgYWJvcnRIYW5kc2hha2UoXG4gICAgICAgIHdlYnNvY2tldCxcbiAgICAgICAgcmVxLFxuICAgICAgICBgVW5leHBlY3RlZCBzZXJ2ZXIgcmVzcG9uc2U6ICR7cmVzLnN0YXR1c0NvZGV9YFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcS5vbigndXBncmFkZScsIChyZXMsIHNvY2tldCwgaGVhZCkgPT4ge1xuICAgIHdlYnNvY2tldC5lbWl0KCd1cGdyYWRlJywgcmVzKTtcblxuICAgIC8vXG4gICAgLy8gVGhlIHVzZXIgbWF5IGhhdmUgY2xvc2VkIHRoZSBjb25uZWN0aW9uIGZyb20gYSBsaXN0ZW5lciBvZiB0aGUgYHVwZ3JhZGVgXG4gICAgLy8gZXZlbnQuXG4gICAgLy9cbiAgICBpZiAod2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSByZXR1cm47XG5cbiAgICByZXEgPSB3ZWJzb2NrZXQuX3JlcSA9IG51bGw7XG5cbiAgICBjb25zdCBkaWdlc3QgPSBjcmVhdGVIYXNoKCdzaGExJylcbiAgICAgIC51cGRhdGUoa2V5ICsgR1VJRClcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgaWYgKHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWFjY2VwdCddICE9PSBkaWdlc3QpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCAnSW52YWxpZCBTZWMtV2ViU29ja2V0LUFjY2VwdCBoZWFkZXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZXJ2ZXJQcm90ID0gcmVzLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcbiAgICBjb25zdCBwcm90TGlzdCA9IChwcm90b2NvbHMgfHwgJycpLnNwbGl0KC8sICovKTtcbiAgICBsZXQgcHJvdEVycm9yO1xuXG4gICAgaWYgKCFwcm90b2NvbHMgJiYgc2VydmVyUHJvdCkge1xuICAgICAgcHJvdEVycm9yID0gJ1NlcnZlciBzZW50IGEgc3VicHJvdG9jb2wgYnV0IG5vbmUgd2FzIHJlcXVlc3RlZCc7XG4gICAgfSBlbHNlIGlmIChwcm90b2NvbHMgJiYgIXNlcnZlclByb3QpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBubyBzdWJwcm90b2NvbCc7XG4gICAgfSBlbHNlIGlmIChzZXJ2ZXJQcm90ICYmICFwcm90TGlzdC5pbmNsdWRlcyhzZXJ2ZXJQcm90KSkge1xuICAgICAgcHJvdEVycm9yID0gJ1NlcnZlciBzZW50IGFuIGludmFsaWQgc3VicHJvdG9jb2wnO1xuICAgIH1cblxuICAgIGlmIChwcm90RXJyb3IpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCBwcm90RXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzZXJ2ZXJQcm90KSB3ZWJzb2NrZXQucHJvdG9jb2wgPSBzZXJ2ZXJQcm90O1xuXG4gICAgaWYgKHBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zID0gcGFyc2UocmVzLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtZXh0ZW5zaW9ucyddKTtcblxuICAgICAgICBpZiAoZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLmFjY2VwdChleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKTtcbiAgICAgICAgICB3ZWJzb2NrZXQuX2V4dGVuc2lvbnNbXG4gICAgICAgICAgICBQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXG4gICAgICAgICAgXSA9IHBlck1lc3NhZ2VEZWZsYXRlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgYWJvcnRIYW5kc2hha2UoXG4gICAgICAgICAgd2Vic29ja2V0LFxuICAgICAgICAgIHNvY2tldCxcbiAgICAgICAgICAnSW52YWxpZCBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMgaGVhZGVyJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2Vic29ja2V0LnNldFNvY2tldChzb2NrZXQsIGhlYWQsIG9wdHMubWF4UGF5bG9hZCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBuZXQuU29ja2V0YCBhbmQgaW5pdGlhdGUgYSBjb25uZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHJldHVybiB7bmV0LlNvY2tldH0gVGhlIG5ld2x5IGNyZWF0ZWQgc29ja2V0IHVzZWQgdG8gc3RhcnQgdGhlIGNvbm5lY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG5ldENvbm5lY3Qob3B0aW9ucykge1xuICBvcHRpb25zLnBhdGggPSBvcHRpb25zLnNvY2tldFBhdGg7XG4gIHJldHVybiBuZXQuY29ubmVjdChvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgdGxzLlRMU1NvY2tldGAgYW5kIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4ge3Rscy5UTFNTb2NrZXR9IFRoZSBuZXdseSBjcmVhdGVkIHNvY2tldCB1c2VkIHRvIHN0YXJ0IHRoZSBjb25uZWN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0bHNDb25uZWN0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5wYXRoID0gdW5kZWZpbmVkO1xuXG4gIGlmICghb3B0aW9ucy5zZXJ2ZXJuYW1lICYmIG9wdGlvbnMuc2VydmVybmFtZSAhPT0gJycpIHtcbiAgICBvcHRpb25zLnNlcnZlcm5hbWUgPSBvcHRpb25zLmhvc3Q7XG4gIH1cblxuICByZXR1cm4gdGxzLmNvbm5lY3Qob3B0aW9ucyk7XG59XG5cbi8qKlxuICogQWJvcnQgdGhlIGhhbmRzaGFrZSBhbmQgZW1pdCBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBXZWJTb2NrZXQgaW5zdGFuY2VcbiAqIEBwYXJhbSB7KGh0dHAuQ2xpZW50UmVxdWVzdHxuZXQuU29ja2V0KX0gc3RyZWFtIFRoZSByZXF1ZXN0IHRvIGFib3J0IG9yIHRoZVxuICogICAgIHNvY2tldCB0byBkZXN0cm95XG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzdHJlYW0sIG1lc3NhZ2UpIHtcbiAgd2Vic29ja2V0LnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcblxuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgYWJvcnRIYW5kc2hha2UpO1xuXG4gIGlmIChzdHJlYW0uc2V0SGVhZGVyKSB7XG4gICAgc3RyZWFtLmFib3J0KCk7XG4gICAgc3RyZWFtLm9uY2UoJ2Fib3J0Jywgd2Vic29ja2V0LmVtaXRDbG9zZS5iaW5kKHdlYnNvY2tldCkpO1xuICAgIHdlYnNvY2tldC5lbWl0KCdlcnJvcicsIGVycik7XG4gIH0gZWxzZSB7XG4gICAgc3RyZWFtLmRlc3Ryb3koZXJyKTtcbiAgICBzdHJlYW0ub25jZSgnZXJyb3InLCB3ZWJzb2NrZXQuZW1pdC5iaW5kKHdlYnNvY2tldCwgJ2Vycm9yJykpO1xuICAgIHN0cmVhbS5vbmNlKCdjbG9zZScsIHdlYnNvY2tldC5lbWl0Q2xvc2UuYmluZCh3ZWJzb2NrZXQpKTtcbiAgfVxufVxuXG4vKipcbiAqIEhhbmRsZSBjYXNlcyB3aGVyZSB0aGUgYHBpbmcoKWAsIGBwb25nKClgLCBvciBgc2VuZCgpYCBtZXRob2RzIGFyZSBjYWxsZWRcbiAqIHdoZW4gdGhlIGByZWFkeVN0YXRlYCBhdHRyaWJ1dGUgaXMgYENMT1NJTkdgIG9yIGBDTE9TRURgLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIFdlYlNvY2tldCBpbnN0YW5jZVxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZW5kQWZ0ZXJDbG9zZSh3ZWJzb2NrZXQsIGRhdGEsIGNiKSB7XG4gIGlmIChkYXRhKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdG9CdWZmZXIoZGF0YSkubGVuZ3RoO1xuXG4gICAgLy9cbiAgICAvLyBUaGUgYF9idWZmZXJlZEFtb3VudGAgcHJvcGVydHkgaXMgdXNlZCBvbmx5IHdoZW4gdGhlIHBlZXIgaXMgYSBjbGllbnQgYW5kXG4gICAgLy8gdGhlIG9wZW5pbmcgaGFuZHNoYWtlIGZhaWxzLiBVbmRlciB0aGVzZSBjaXJjdW1zdGFuY2VzLCBpbiBmYWN0LCB0aGVcbiAgICAvLyBgc2V0U29ja2V0KClgIG1ldGhvZCBpcyBub3QgY2FsbGVkLCBzbyB0aGUgYF9zb2NrZXRgIGFuZCBgX3NlbmRlcmBcbiAgICAvLyBwcm9wZXJ0aWVzIGFyZSBzZXQgdG8gYG51bGxgLlxuICAgIC8vXG4gICAgaWYgKHdlYnNvY2tldC5fc29ja2V0KSB3ZWJzb2NrZXQuX3NlbmRlci5fYnVmZmVyZWRCeXRlcyArPSBsZW5ndGg7XG4gICAgZWxzZSB3ZWJzb2NrZXQuX2J1ZmZlcmVkQW1vdW50ICs9IGxlbmd0aDtcbiAgfVxuXG4gIGlmIChjYikge1xuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgIGBXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgJHt3ZWJzb2NrZXQucmVhZHlTdGF0ZX0gYCArXG4gICAgICAgIGAoJHtyZWFkeVN0YXRlc1t3ZWJzb2NrZXQucmVhZHlTdGF0ZV19KWBcbiAgICApO1xuICAgIGNiKGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdjb25jbHVkZSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvbiBUaGUgcmVhc29uIGZvciBjbG9zaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uQ29uY2x1ZGUoY29kZSwgcmVhc29uKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICB3ZWJzb2NrZXQuX3NvY2tldC5yZXN1bWUoKTtcblxuICB3ZWJzb2NrZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCA9IHRydWU7XG4gIHdlYnNvY2tldC5fY2xvc2VNZXNzYWdlID0gcmVhc29uO1xuICB3ZWJzb2NrZXQuX2Nsb3NlQ29kZSA9IGNvZGU7XG5cbiAgaWYgKGNvZGUgPT09IDEwMDUpIHdlYnNvY2tldC5jbG9zZSgpO1xuICBlbHNlIHdlYnNvY2tldC5jbG9zZShjb2RlLCByZWFzb24pO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2RyYWluJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkRyYWluKCkge1xuICB0aGlzW2tXZWJTb2NrZXRdLl9zb2NrZXQucmVzdW1lKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhSYW5nZUVycm9yfEVycm9yKX0gZXJyIFRoZSBlbWl0dGVkIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRXJyb3IoZXJyKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuXG4gIHdlYnNvY2tldC5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gIHdlYnNvY2tldC5fY2xvc2VDb2RlID0gZXJyW2tTdGF0dXNDb2RlXTtcbiAgd2Vic29ja2V0LmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgd2Vic29ja2V0Ll9zb2NrZXQuZGVzdHJveSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2ZpbmlzaCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25GaW5pc2goKSB7XG4gIHRoaXNba1dlYlNvY2tldF0uZW1pdENsb3NlKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnbWVzc2FnZSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xCdWZmZXJ8QXJyYXlCdWZmZXJ8QnVmZmVyW10pfSBkYXRhIFRoZSBtZXNzYWdlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uTWVzc2FnZShkYXRhKSB7XG4gIHRoaXNba1dlYlNvY2tldF0uZW1pdCgnbWVzc2FnZScsIGRhdGEpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ3BpbmcnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBUaGUgZGF0YSBpbmNsdWRlZCBpbiB0aGUgcGluZyBmcmFtZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPblBpbmcoZGF0YSkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5wb25nKGRhdGEsICF3ZWJzb2NrZXQuX2lzU2VydmVyLCBOT09QKTtcbiAgd2Vic29ja2V0LmVtaXQoJ3BpbmcnLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdwb25nJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgaW5jbHVkZWQgaW4gdGhlIHBvbmcgZnJhbWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25Qb25nKGRhdGEpIHtcbiAgdGhpc1trV2ViU29ja2V0XS5lbWl0KCdwb25nJywgZGF0YSk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgbmV0LlNvY2tldGAgYCdjbG9zZSdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uQ2xvc2UoKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBzb2NrZXRPbkNsb3NlKTtcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZW5kJywgc29ja2V0T25FbmQpO1xuXG4gIHdlYnNvY2tldC5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG5cbiAgLy9cbiAgLy8gVGhlIGNsb3NlIGZyYW1lIG1pZ2h0IG5vdCBoYXZlIGJlZW4gcmVjZWl2ZWQgb3IgdGhlIGAnZW5kJ2AgZXZlbnQgZW1pdHRlZCxcbiAgLy8gZm9yIGV4YW1wbGUsIGlmIHRoZSBzb2NrZXQgd2FzIGRlc3Ryb3llZCBkdWUgdG8gYW4gZXJyb3IuIEVuc3VyZSB0aGF0IHRoZVxuICAvLyBgcmVjZWl2ZXJgIHN0cmVhbSBpcyBjbG9zZWQgYWZ0ZXIgd3JpdGluZyBhbnkgcmVtYWluaW5nIGJ1ZmZlcmVkIGRhdGEgdG9cbiAgLy8gaXQuIElmIHRoZSByZWFkYWJsZSBzaWRlIG9mIHRoZSBzb2NrZXQgaXMgaW4gZmxvd2luZyBtb2RlIHRoZW4gdGhlcmUgaXMgbm9cbiAgLy8gYnVmZmVyZWQgZGF0YSBhcyBldmVyeXRoaW5nIGhhcyBiZWVuIGFscmVhZHkgd3JpdHRlbiBhbmQgYHJlYWRhYmxlLnJlYWQoKWBcbiAgLy8gd2lsbCByZXR1cm4gYG51bGxgLiBJZiBpbnN0ZWFkLCB0aGUgc29ja2V0IGlzIHBhdXNlZCwgYW55IHBvc3NpYmxlIGJ1ZmZlcmVkXG4gIC8vIGRhdGEgd2lsbCBiZSByZWFkIGFzIGEgc2luZ2xlIGNodW5rIGFuZCBlbWl0dGVkIHN5bmNocm9ub3VzbHkgaW4gYSBzaW5nbGVcbiAgLy8gYCdkYXRhJ2AgZXZlbnQuXG4gIC8vXG4gIHdlYnNvY2tldC5fc29ja2V0LnJlYWQoKTtcbiAgd2Vic29ja2V0Ll9yZWNlaXZlci5lbmQoKTtcblxuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgc29ja2V0T25EYXRhKTtcbiAgdGhpc1trV2ViU29ja2V0XSA9IHVuZGVmaW5lZDtcblxuICBjbGVhclRpbWVvdXQod2Vic29ja2V0Ll9jbG9zZVRpbWVyKTtcblxuICBpZiAoXG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5maW5pc2hlZCB8fFxuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkXG4gICkge1xuICAgIHdlYnNvY2tldC5lbWl0Q2xvc2UoKTtcbiAgfSBlbHNlIHtcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLm9uKCdlcnJvcicsIHJlY2VpdmVyT25GaW5pc2gpO1xuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIub24oJ2ZpbmlzaCcsIHJlY2VpdmVyT25GaW5pc2gpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgbmV0LlNvY2tldGAgYCdkYXRhJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIEEgY2h1bmsgb2YgZGF0YVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25EYXRhKGNodW5rKSB7XG4gIGlmICghdGhpc1trV2ViU29ja2V0XS5fcmVjZWl2ZXIud3JpdGUoY2h1bmspKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgbmV0LlNvY2tldGAgYCdlbmQnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkVuZCgpIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICB3ZWJzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuX3JlY2VpdmVyLmVuZCgpO1xuICB0aGlzLmVuZCgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkVycm9yKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG4gIHRoaXMub24oJ2Vycm9yJywgTk9PUCk7XG5cbiAgaWYgKHdlYnNvY2tldCkge1xuICAgIHdlYnNvY2tldC5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=