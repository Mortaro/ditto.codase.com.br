/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script-491af7d773672ef4";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullsheet */ "./node_modules/nullsheet/index.css");
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nullsheet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nullstack */ "./node_modules/nullstack/nullstack.js");
/* harmony import */ var _src_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Application */ "./src/Application.njs");



nullstack__WEBPACK_IMPORTED_MODULE_1__["default"].start(_src_Application__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/nullsheet/index.css":
/*!******************************************!*\
  !*** ./node_modules/nullsheet/index.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/nullstack/client.js":
/*!******************************************!*\
  !*** ./node_modules/nullstack/client.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Nullstack; });
/* harmony import */ var _deserialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deserialize */ "./node_modules/nullstack/deserialize.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


window.representation = Object(_deserialize__WEBPACK_IMPORTED_MODULE_0__["default"])(JSON.stringify(window.representation));
window.instances = Object(_deserialize__WEBPACK_IMPORTED_MODULE_0__["default"])(JSON.stringify(window.instances));
window.addEventListener('popstate', () => {
  Nullstack.update();
});
const pageProxyHandler = {
  set(target, name, value) {
    if (name === 'title') {
      document.title = value;
    }

    const result = Reflect.set(...arguments);
    Nullstack.update();
    return result;
  }

};

class Router {
  set url(target) {
    history.pushState({}, document.title, target);
    window.dispatchEvent(new Event('popstate'));
    Nullstack.routeChanged = true;
  }

  get url() {
    return window.location.pathname + window.location.search;
  }

}

const environment = { ...window.environment,
  client: true,
  server: false
};
delete window.environment;
const page = new Proxy({ ...window.page
}, pageProxyHandler);
delete window.page;
const router = new Router();
const context = {
  environment,
  page,
  router
};
const contextProxyHandler = {
  set(target, name, value) {
    context[name] = value;
    Nullstack.update();
    return Reflect.set(...arguments);
  }

};
const instanceProxyHandler = {
  get(target, name) {
    if (target.attributes && target.attributes.proxy && target.attributes.proxy[name] !== undefined && target[name] !== undefined) {
      return target.attributes.proxy[name];
    }

    if (name !== 'prepare' && name !== 'initiate' && target[name] === undefined && target.constructor[name] === true) {
      const detour = async function (params = {}) {
        const url = `/${target.constructor.hash}/${name}.json`;
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(params)
        });
        const payload = await response.text();
        return Object(_deserialize__WEBPACK_IMPORTED_MODULE_0__["default"])(payload).result;
      };

      target[name] = detour.bind(this);
    }

    return Reflect.get(...arguments);
  },

  set(target, name, value) {
    if (target.attributes && target.attributes.proxy && target.attributes.proxy[name] !== undefined && target[name] !== undefined) {
      target.attributes.proxy[name] = value;
    }

    const result = Reflect.set(...arguments);
    Nullstack.update();
    return result;
  }

};
class Nullstack {
  render() {
    return false;
  }

  static start(Starter) {
    for (const [key, value] of Object.entries(window.context)) {
      context[key] = value;
    }

    Object.freeze(context.project);
    delete window.context;
    this.routes = {};
    const [path, query] = router.url.split('?');
    this.params = this.getQueryStringParams(query);
    this.currentInstance = null;

    this.initializer = () => Nullstack.element(Starter);

    this.selector = document.querySelector('#application');
    this.instancesMountedQueue = [];
    this.instancesRenewedQueue = [];
    this.virtualDom = window.representation;
    this.nextVirtualDom = this.initializer();
    this.rerender(this.selector, [0], []);
    this.virtualDom = this.nextVirtualDom;
    this.nextVirtualDom = null;
    delete window.representation;
    delete window.instances;
    this.processLifecycleQueues();
  }

  static generateKey(node, depth) {
    return depth.join('.');
  }

  static generateContext(temporary) {
    temporary.params = temporary.params ? { ...this.params,
      ...temporary.params
    } : this.params;
    return new Proxy({ ...context,
      ...temporary
    }, contextProxyHandler);
  }

  static getQueryStringParams(query) {
    if (query) {
      query = /^[?#]/.test(query) ? query.slice(1) : query;
      return query.split('&').reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = this.extractParamValue(value);
        return params;
      }, {});
    } else {
      return {};
    }
  }

  static extractParamValue(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
  }

  static routeMatches(url, route) {
    let [path, query] = url.split('?');
    const urlPaths = path.split('/');
    const routePaths = route.split('/');
    const params = {};
    const length = Math.max(urlPaths.length, routePaths.length);
    let catchall = false;

    for (let i = 0; i < length; i++) {
      if (catchall) {
        continue;
      } else if (routePaths[i] === '*') {
        catchall = true;
      } else if (routePaths[i] && routePaths[i].startsWith(':')) {
        const key = routePaths[i].replace(':', '');
        params[key] = this.extractParamValue(urlPaths[i]);
      } else if (routePaths[i] !== urlPaths[i]) {
        return false;
      }
    }

    return params;
  }

  static findParentInstance(depth) {
    for (let i = 0; i < depth.length; i++) {
      const key = depth.slice(0, i * -1).join('.');

      if (this.instances[key]) {
        return this.instances[key];
      }
    }
  }

  static rerender(parent, depth, vdepth) {
    if (!this.hydrated) {
      for (const element of parent.childNodes) {
        if (element.tagName && element.tagName.toLowerCase() == 'textarea' && element.childNodes.length == 0) {
          element.appendChild(document.createTextNode(''));
        }

        if (element.COMMENT_NODE === 8 && element.textContent === '#') {
          parent.removeChild(element);
        }
      }
    }

    const index = depth[depth.length - 1];
    const selector = parent.childNodes[index];
    let current = this.virtualDom;
    let next = this.nextVirtualDom;

    for (const level of vdepth) {
      current = current.children[level];
      next = next.children[level];
    }

    if (this.isFalse(current) && this.isFalse(next)) {
      return;
    }

    if ((this.isFalse(current) || this.isFalse(next)) && current != next) {
      const nextSelector = this.render(next, vdepth);
      return parent.replaceChild(nextSelector, selector);
    }

    if (next !== undefined && next.attributes !== undefined && next.attributes.bind) {
      const instance = this.findParentInstance([0, ...vdepth]);
      const target = next.attributes.source || instance;

      if (next.type === 'textarea') {
        next.children = [target[next.attributes.bind]];
      } else if (next.type === 'input' && next.attributes.type === 'checkbox') {
        next.attributes.checked = target[next.attributes.bind];
      } else {
        next.attributes.value = target[next.attributes.bind];
      }

      next.attributes.name = next.attributes.bind;
      let eventName = 'oninput';
      let valueName = 'value';

      if (next.attributes.type === 'checkbox' || next.attributes.type === 'radio') {
        eventName = 'onclick';
        valueName = 'checked';
      } else if (next.type !== 'input' && next.type !== 'textarea') {
        eventName = 'onchange';
      }

      const originalEvent = next.attributes[eventName];

      next.attributes[eventName] = ({
        event,
        value
      }) => {
        if (target[next.attributes.bind] === true || target[next.attributes.bind] === false) {
          target[next.attributes.bind] = event ? event.target[valueName] == 'true' : value;
        } else if (typeof target[next.attributes.bind] === 'number') {
          target[next.attributes.bind] = parseFloat(event ? event.target[valueName] : value) || 0;
        } else {
          target[next.attributes.bind] = event ? event.target[valueName] : value;
        }

        Nullstack.update();

        if (originalEvent !== undefined) {
          const context = this.generateContext({ ...instance.attributes,
            ...next.attributes,
            event,
            value
          });
          originalEvent(context);
        }
      };
    }

    if (this.isFunction(next)) {
      const instance = this.findParentInstance([0, ...vdepth]);
      const context = this.generateContext({ ...instance.attributes,
        ...next.attributes
      });
      const root = next.type(context);
      next.children = [root];
      return this.rerender(parent, depth, [...vdepth, 0]);
    }

    if (current !== undefined && /^[A-Z]/.test(current.type) && typeof next.type === 'function' && current.type === next.type.name) {
      const key = this.generateKey(next, [0, ...vdepth]);
      const instance = new next.type();
      instance.events = {};
      this.instances[key] = instance;
      const state = window.instances[key];

      for (const attribute in state) {
        instance[attribute] = state[attribute];
      }

      this.instancesMountedQueue.push(instance);
      const context = this.generateContext(next.attributes);
      instance.prepare && instance.prepare(context);
      instance.attributes = next.attributes;
      this.instancesRenewedQueue.push(instance);
      const root = instance.render(context);
      next.children = [root];
      const limit = Math.max(current.children.length, next.children.length);

      for (let i = 0; i < limit; i++) {
        this.rerender(parent, depth, [...vdepth, i]);
      }
    } else if (this.isClass(current) && current.type === next.type) {
      const key = this.generateKey(next, [0, ...vdepth]);
      let instance = null;

      if (!this.routeChanged) {
        instance = this.instances[key];
      } else if (this.routeChanged) {
        let shouldReinitiate = false;

        if (next.attributes._segments) {
          for (const segment of next.attributes._segments) {
            if (current.attributes.params[segment] !== next.attributes.params[segment]) {
              shouldReinitiate = true;
            }
          }

          delete next.attributes._segments;
        }

        if (!shouldReinitiate) {
          instance = this.instances[key];
        }
      }

      const context = this.generateContext(next.attributes);

      if (!instance) {
        instance = new next.type();
        instance.events = {};
        this.instances[key] = instance;
        this.instancesMountedQueue.push(instance);
        instance.prepare && instance.prepare(context);
      }

      instance.attributes = next.attributes;
      this.instancesRenewedQueue.push(instance);
      const root = instance.render(context);
      next.children = [root];
      const limit = Math.max(current.children.length, next.children.length);

      for (let i = 0; i < limit; i++) {
        this.rerender(parent, depth, [...vdepth, i]);
      }
    } else if (current.type !== next.type) {
      const nextSelector = this.render(next, vdepth);
      parent.replaceChild(nextSelector, selector);
    } else if (this.isText(current) && this.isText(next)) {
      if (current != next) {
        return selector.nodeValue = next;
      }
    } else if (current.type === next.type) {
      if (next.type === 'a' && next.attributes.href && next.attributes.href.startsWith('/') && !next.attributes.target) {
        next.attributes.onclick = ({
          event
        }) => {
          event.preventDefault();
          router.url = next.attributes.href;
          context.environment.prerendered = false;
        };
      }

      const attributeNames = Object.keys({ ...current.attributes,
        ...next.attributes
      });

      for (const name of attributeNames) {
        if (name === 'html') {
          if (next.attributes[name] !== current.attributes[name]) {
            selector.innerHTML = next.attributes[name];
          }

          const links = selector.querySelectorAll('a[href^="/"]:not([target])');

          for (const link of links) {
            link.onclick = event => {
              event.preventDefault();
              router.url = link.href;
              context.environment.prerendered = false;
            };
          }
        } else if (name === 'checked') {
          if (next.attributes[name] !== selector.value) {
            selector.checked = next.attributes[name];
          }
        } else if (name === 'value') {
          if (next.attributes[name] !== selector.value) {
            selector.value = next.attributes[name];
          }
        } else if (name.startsWith('on')) {
          const eventName = name.replace('on', '');
          const key = '0.' + vdepth.join('.') + '.' + eventName;
          const instance = this.findParentInstance([0, ...vdepth]);
          selector.removeEventListener(eventName, instance.events[key]);

          if (next.attributes[name]) {
            instance.events[key] = event => {
              if (next.attributes.default !== true) {
                event.preventDefault();
              }

              const context = this.generateContext({ ...instance.attributes,
                ...next.attributes,
                event
              });
              next.attributes[name](context);
            };

            selector.addEventListener(eventName, instance.events[key]);
          } else {
            delete instance.events[key];
          }
        } else if (typeof next.attributes[name] !== 'function' && typeof next.attributes[name] !== 'object') {
          if (current.attributes[name] === undefined && next.attributes[name] !== undefined) {
            selector.setAttribute(name, next.attributes[name]);
          } else if (current.attributes[name] !== undefined && next.attributes[name] === undefined) {
            selector.removeAttribute(name);
          } else if (current.attributes[name] !== next.attributes[name]) {
            if (name != 'value' && next.attributes[name] === false || next.attributes[name] === null || next.attributes[name] === undefined) {
              selector.removeAttribute(name);
            } else if (name != 'value' && next.attributes[name] === true) {
              selector.setAttribute(name, name);
            } else {
              selector.setAttribute(name, next.attributes[name]);
            }
          }
        }
      }

      if (next.attributes.html) return;
      const limit = Math.max(current.children.length, next.children.length);
      const routeDepth = depth.join('.');

      for (const child of next.children) {
        if (this.isRoutable(child)) {
          if (this.routes[routeDepth] !== undefined) {
            child.type = false;
            child.children = [];
          } else {
            const params = this.routeMatches(router.url, child.attributes.route);

            if (params) {
              this.routes[routeDepth] = true;
              child.attributes.params = params;
            } else {
              child.type = false;
              child.children = [];
            }
          }

          child.attributes._segments = child.attributes.route.split('/').filter(segment => {
            return segment[0] == ':';
          }).map(segment => {
            return segment.slice(1);
          });
          delete child.attributes.route;
        }
      }

      if (next.children.length > current.children.length) {
        for (let i = 0; i < current.children.length; i++) {
          this.rerender(selector, [...depth, i], [...vdepth, i]);
        }

        for (let i = current.children.length; i < next.children.length; i++) {
          const nextSelector = this.render(next.children[i], [...vdepth, i]);
          selector.appendChild(nextSelector);
        }
      } else if (current.children.length > next.children.length) {
        for (let i = 0; i < next.children.length; i++) {
          this.rerender(selector, [...depth, i], [...vdepth, i]);
        }

        for (let i = current.children.length - 1; i >= next.children.length; i--) {
          selector.removeChild(selector.childNodes[i]);
        }
      } else {
        for (let i = limit - 1; i > -1; i--) {
          this.rerender(selector, [...depth, i], [...vdepth, i]);
        }
      }

      if (next.type == 'textarea') {
        selector.value = next.children.join("");
      }

      if (next.type == 'select') {
        selector.value = next.attributes.value;
      }
    }
  }

  static update() {
    if (this.initialized) {
      clearInterval(this.renderQueue);
      this.renderQueue = setTimeout(() => {
        const [path, query] = router.url.split('?');
        this.params = this.getQueryStringParams(query);
        this.initialized = false;
        this.routes = {};
        this.instancesMountedQueue = [];
        this.instancesRenewedQueue = [];
        this.nextVirtualDom = this.initializer();
        this.rerender(this.selector, [0], []);
        this.virtualDom = this.nextVirtualDom;
        this.nextVirtualDom = null;
        this.processLifecycleQueues();
      }, 16);
    }
  }

  static async processLifecycleQueues() {
    if (!this.initialized) {
      this.initialized = true;
      this.hydrated = true;
    }

    for (const instance of this.instancesMountedQueue) {
      const context = this.generateContext(instance.attributes);
      instance.initiate && (await instance.initiate(context));
    }

    for (const [id, instance] of Object.entries(this.instances)) {
      if (!this.instancesRenewedQueue.includes(instance)) {
        const context = this.generateContext(instance.attributes);
        instance.terminate && (await instance.terminate(context));
        delete this.instances[id];
      }
    }

    this.routeChanged = false;
  }

  constructor() {
    _defineProperty(this, "routeChanged", false);

    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const proxy = new Proxy(this, instanceProxyHandler);

    for (const method of methods) {
      if (method !== 'constructor' && typeof this[method] === 'function') {
        this[method] = this[method].bind(proxy);
      }
    }

    return proxy;
  }

  static flattenChildren(children) {
    children = [].concat.apply([], children).map(child => {
      if (child === null || child === undefined) return false;
      if (child.type === 'Fragment') return this.flattenChildren(child.children);
      return child;
    });
    return [].concat.apply([], children);
  }

  static element(type, attributes = {}, ...children) {
    if (attributes === null) {
      attributes = {};
    }

    children = this.flattenChildren(children);

    if (type === 'textarea') {
      children = [children.join('')];
    }

    if (typeof type === 'function' && type.render !== undefined) {
      return {
        type,
        attributes,
        children: []
      };
    }

    return {
      type,
      attributes,
      children
    };
  }

  static isFalse(node) {
    return node === false || node.type === false;
  }

  static isBlank(node) {
    return node === null || node === undefined;
  }

  static isRoutable(node) {
    return node && node.attributes !== undefined && node.attributes.route !== undefined;
  }

  static isClass(node) {
    return typeof node.type === 'function' && typeof (node.type.prototype.render === 'function');
  }

  static isFunction(node) {
    return typeof node.type === 'function' && node.type.prototype === undefined;
  }

  static isText(node) {
    return node !== 'Fragment' && typeof node.children === 'undefined';
  }

  static render(node, depth) {
    if (this.isRoutable(node)) {
      const routeDepth = depth.slice(0, -1).join('.');

      if (this.routes[routeDepth] !== undefined) {
        node.type = false;
        node.children = [];
      }

      const params = this.routeMatches(router.url, node.attributes.route);

      if (params) {
        this.routes[routeDepth] = true;
        node.attributes.params = params;
      } else {
        node.type = false;
        node.children = [];
      }
    }

    if (this.isFalse(node)) {
      return document.createComment("");
    }

    if (node != undefined && node.attributes != undefined && node.attributes.bind) {
      const instance = this.findParentInstance([0, ...depth]);
      const target = node.attributes.source || instance;

      if (node.type === 'textarea') {
        node.children = [target[node.attributes.bind]];
      } else {
        node.attributes.value = target[node.attributes.bind];
      }

      node.attributes.name = node.attributes.bind;
      let eventName = 'oninput';
      let valueName = 'value';

      if (node.attributes.type === 'checkbox' || node.attributes.type === 'radio') {
        eventName = 'onclick';
        valueName = 'checked';
      } else if (node.type !== 'input' && node.type !== 'textarea') {
        eventName = 'onchange';
      }

      const originalEvent = node.attributes[eventName];

      node.attributes[eventName] = ({
        event,
        value
      }) => {
        if (target[node.attributes.bind] === true || target[node.attributes.bind] === false) {
          target[node.attributes.bind] = event ? event.target[valueName] == 'true' : value;
        } else if (typeof target[node.attributes.bind] === 'number') {
          target[node.attributes.bind] = parseFloat(event ? event.target[valueName] : value) || 0;
        } else {
          target[node.attributes.bind] = event ? event.target[valueName] : value;
        }

        target[node.attributes.bind] = event ? event.target[valueName] : value;
        Nullstack.update();

        if (originalEvent !== undefined) {
          const context = this.generateContext({ ...instance.attributes,
            ...node.attributes,
            event,
            value
          });
          originalEvent(context);
        }
      };
    }

    if (this.isFunction(node)) {
      const instance = this.findParentInstance([0, ...depth]);
      const context = this.generateContext({ ...instance.attributes,
        ...node.attributes
      });
      const root = node.type(context);
      node.children = [root];
      return this.render(node.children[0], [...depth, 0]);
    }

    if (this.isClass(node)) {
      const key = this.generateKey(node, [0, ...depth]);
      const instance = new node.type();
      instance.events = {};
      instance.attributes = node.attributes;
      this.instances[key] = instance;
      const context = this.generateContext(node.attributes);
      instance.prepare && instance.prepare(context);
      const root = instance.render(context);
      node.children = [root];
      this.instancesMountedQueue.push(instance);
      this.instancesRenewedQueue.push(instance);
      return this.render(node.children[0], [...depth, 0]);
    }

    if (this.isText(node)) {
      return document.createTextNode(node);
    }

    let element;
    let next = this.nextVirtualDom;
    let isSvg = false;

    for (const level of depth) {
      next = next.children[level];
      if (!next) break;

      if (next.type === 'svg') {
        isSvg = true;
        break;
      }
    }

    if (isSvg) {
      element = document.createElementNS("http://www.w3.org/2000/svg", node.type);
    } else {
      element = document.createElement(node.type);
    }

    if (node.type === 'a' && node.attributes.href && node.attributes.href.startsWith('/') && !node.attributes.target) {
      node.attributes.onclick = ({
        event
      }) => {
        event.preventDefault();
        router.url = node.attributes.href;
        context.environment.prerendered = false;
      };
    }

    for (let name in node.attributes) {
      if (name === 'html') {
        element.innerHTML = node.attributes[name];
        const links = element.querySelectorAll('a[href^="/"]:not([target])');

        for (const link of links) {
          link.onclick = event => {
            event.preventDefault();
            router.url = link.href;
            context.environment.prerendered = false;
          };
        }
      } else if (name.startsWith('on')) {
        const eventName = name.replace('on', '');
        const key = '0.' + depth.join('.') + '.' + eventName;
        const instance = this.findParentInstance([0, ...depth]);

        instance.events[key] = event => {
          if (node.attributes.default !== true) {
            event.preventDefault();
          }

          const context = this.generateContext({ ...instance.attributes,
            ...node.attributes,
            event
          });
          node.attributes[name](context);
        };

        element.addEventListener(eventName, instance.events[key]);
      } else if (typeof node.attributes[name] !== 'function' && typeof node.attributes[name] !== 'object') {
        if (name != 'value' && node.attributes[name] === true) {
          element.setAttribute(name, name);
        } else if (name == 'value' || node.attributes[name] !== false && node.attributes[name] !== null && node.attributes[name] !== undefined) {
          element.setAttribute(name, node.attributes[name]);
        }
      }
    }

    if (!node.attributes.html) {
      for (let i = 0; i < node.children.length; i++) {
        const dom = this.render(node.children[i], [...depth, i]);
        element.appendChild(dom);
      }

      if (node.type == 'select') {
        element.value = node.attributes.value;
      }
    }

    return element;
  }

}

_defineProperty(Nullstack, "initialized", false);

_defineProperty(Nullstack, "hydrated", false);

_defineProperty(Nullstack, "initializer", null);

_defineProperty(Nullstack, "instances", {});

_defineProperty(Nullstack, "instancesMountedQueue", []);

_defineProperty(Nullstack, "instancesRenewedQueue", []);

_defineProperty(Nullstack, "virtualDom", {});

_defineProperty(Nullstack, "selector", null);

_defineProperty(Nullstack, "routes", {});

_defineProperty(Nullstack, "params", {});

_defineProperty(Nullstack, "renderQueue", null);

/***/ }),

/***/ "./node_modules/nullstack/deserialize.js":
/*!***********************************************!*\
  !*** ./node_modules/nullstack/deserialize.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deserialize; });
const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

function dateParser(key, value) {
  if (typeof value === 'string') {
    let a = reISO.exec(value);
    if (a) return new Date(value);
    a = reMsAjax.exec(value);

    if (a) {
      const b = a[1].split(/[-+,.]/);
      return new Date(b[0] ? +b[0] : 0 - +b[1]);
    }
  }

  return value;
}

;
function deserialize(string) {
  return JSON.parse(string, dateParser);
}

/***/ }),

/***/ "./node_modules/nullstack/nullstack.js":
/*!*********************************************!*\
  !*** ./node_modules/nullstack/nullstack.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./node_modules/nullstack/client.js");

/* harmony default export */ __webpack_exports__["default"] = (_client__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/Application.css":
/*!*****************************!*\
  !*** ./src/Application.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/Application.njs":
/*!*****************************!*\
  !*** ./src/Application.njs ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullstack */ "./node_modules/nullstack/nullstack.js");
/* harmony import */ var _Application_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Application.css */ "./src/Application.css");
/* harmony import */ var _Application_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Application_css__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Application extends nullstack__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "room", "");

    _defineProperty(this, "command", "");

    _defineProperty(this, "socket", null);

    _defineProperty(this, "shortcuts", []);

    _defineProperty(this, "executing", false);
  }

  initiate({
    environment,
    page
  }) {
    page.title = "Ditto Server";

    if (environment.client) {
      this.connect();

      if (localStorage['shortcuts']) {
        this.shortcuts = JSON.parse(localStorage['shortcuts']);
      }
    }
  }

  connect() {
    this.socket = new WebSocket("wss://" + location.host, "protocolOne");

    this.socket.onclose = () => setTimeout(this.connect, 1000);

    this.socket.onerror = () => this.socket.close();
  }

  remove({
    shortcut
  }) {
    this.shortcuts = this.shortcuts.filter(s => s != shortcut);
    localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
  }

  execute({
    shortcut
  }) {
    if (this.executing) return;

    if (!shortcut) {
      if (!this.room || !this.command) return;
      shortcut = this.room + ' ' + this.command;
    }

    this.socket.send(shortcut);

    if (!this.shortcuts.includes(shortcut)) {
      this.shortcuts.push(shortcut);
      localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
    }

    this.room = '';
    this.command = '';
    this.executing = true;
    setTimeout(() => this.executing = false, 500);
  }

  renderShortcut({
    shortcut
  }) {
    return nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xsb x12 m2b bgm1 bgd p4x p2y"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "yy"
    }, " ", shortcut, " "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "yy"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "cm1 bgi2 p2x p1y m1r",
      onclick: this.remove,
      shortcut: shortcut,
      disabled: this.executing
    }, " x "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "cm1 bgi1 p2x p1y m1r",
      onclick: this.execute,
      shortcut: shortcut,
      disabled: this.executing
    }, " Execute ")));
  }

  render({
    page
  }) {
    const Shortcut = this.renderShortcut;
    return nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("main", {
      class: "x12 yy y12 yvh bgm1 bgd"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "x xx p4x"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("form", {
      class: "x12 bgm1 md+x6 s1",
      onsubmit: this.execute
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("h1", {
      class: "xx p3y bcm1b bcdb ci1"
    }, " ", page.title, " "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xx p4"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("input", {
      bind: "room",
      placeholder: "room",
      class: "x12 bcm1 bcd p4 m2b"
    }), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("input", {
      bind: "command",
      placeholder: "command",
      class: "x12 bcm1 bcd p4 m2b"
    }), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "x12 xx bgi1 cm1 p4",
      disabled: this.executing
    }, " Execute ")), this.shortcuts.length > 0 && nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "x12 p4x p4t p2b bcm1t bcdt"
    }, this.shortcuts.map(shortcut => nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element(Shortcut, {
      shortcut: shortcut
    }))))));
  }

}

_defineProperty(Application, "start", true);

/* harmony default export */ __webpack_exports__["default"] = (Application);
Application.hash = 'ceaf8ed409a76b068f17fb7065c79183';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzaGVldC9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzdGFjay9kZXNlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL251bGxzdGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwbGljYXRpb24uY3NzIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi5uanMiXSwibmFtZXMiOlsiTnVsbHN0YWNrIiwic3RhcnQiLCJBcHBsaWNhdGlvbiIsIndpbmRvdyIsInJlcHJlc2VudGF0aW9uIiwiZGVzZXJpYWxpemUiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5zdGFuY2VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwZGF0ZSIsInBhZ2VQcm94eUhhbmRsZXIiLCJzZXQiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJkb2N1bWVudCIsInRpdGxlIiwicmVzdWx0IiwiUmVmbGVjdCIsImFyZ3VtZW50cyIsIlJvdXRlciIsInVybCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJyb3V0ZUNoYW5nZWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic2VhcmNoIiwiZW52aXJvbm1lbnQiLCJjbGllbnQiLCJzZXJ2ZXIiLCJwYWdlIiwiUHJveHkiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY29udGV4dFByb3h5SGFuZGxlciIsImluc3RhbmNlUHJveHlIYW5kbGVyIiwiZ2V0IiwiYXR0cmlidXRlcyIsInByb3h5IiwidW5kZWZpbmVkIiwiY29uc3RydWN0b3IiLCJkZXRvdXIiLCJwYXJhbXMiLCJoYXNoIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsIm1vZGUiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwicmVkaXJlY3QiLCJyZWZlcnJlclBvbGljeSIsImJvZHkiLCJwYXlsb2FkIiwidGV4dCIsImJpbmQiLCJyZW5kZXIiLCJTdGFydGVyIiwia2V5IiwiT2JqZWN0IiwiZW50cmllcyIsImZyZWV6ZSIsInByb2plY3QiLCJyb3V0ZXMiLCJwYXRoIiwicXVlcnkiLCJzcGxpdCIsImdldFF1ZXJ5U3RyaW5nUGFyYW1zIiwiY3VycmVudEluc3RhbmNlIiwiaW5pdGlhbGl6ZXIiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwiaW5zdGFuY2VzTW91bnRlZFF1ZXVlIiwiaW5zdGFuY2VzUmVuZXdlZFF1ZXVlIiwidmlydHVhbERvbSIsIm5leHRWaXJ0dWFsRG9tIiwicmVyZW5kZXIiLCJwcm9jZXNzTGlmZWN5Y2xlUXVldWVzIiwiZ2VuZXJhdGVLZXkiLCJub2RlIiwiZGVwdGgiLCJqb2luIiwiZ2VuZXJhdGVDb250ZXh0IiwidGVtcG9yYXJ5IiwidGVzdCIsInNsaWNlIiwicmVkdWNlIiwicGFyYW0iLCJleHRyYWN0UGFyYW1WYWx1ZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJyb3V0ZU1hdGNoZXMiLCJyb3V0ZSIsInVybFBhdGhzIiwicm91dGVQYXRocyIsImxlbmd0aCIsIk1hdGgiLCJtYXgiLCJjYXRjaGFsbCIsImkiLCJzdGFydHNXaXRoIiwiZmluZFBhcmVudEluc3RhbmNlIiwicGFyZW50IiwidmRlcHRoIiwiaHlkcmF0ZWQiLCJjaGlsZE5vZGVzIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsIkNPTU1FTlRfTk9ERSIsInRleHRDb250ZW50IiwicmVtb3ZlQ2hpbGQiLCJpbmRleCIsImN1cnJlbnQiLCJuZXh0IiwibGV2ZWwiLCJjaGlsZHJlbiIsImlzRmFsc2UiLCJuZXh0U2VsZWN0b3IiLCJyZXBsYWNlQ2hpbGQiLCJpbnN0YW5jZSIsInNvdXJjZSIsInR5cGUiLCJjaGVja2VkIiwiZXZlbnROYW1lIiwidmFsdWVOYW1lIiwib3JpZ2luYWxFdmVudCIsImV2ZW50IiwicGFyc2VGbG9hdCIsImlzRnVuY3Rpb24iLCJyb290IiwiZXZlbnRzIiwic3RhdGUiLCJhdHRyaWJ1dGUiLCJwdXNoIiwicHJlcGFyZSIsImxpbWl0IiwiaXNDbGFzcyIsInNob3VsZFJlaW5pdGlhdGUiLCJfc2VnbWVudHMiLCJzZWdtZW50IiwiaXNUZXh0Iiwibm9kZVZhbHVlIiwiaHJlZiIsIm9uY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsInByZXJlbmRlcmVkIiwiYXR0cmlidXRlTmFtZXMiLCJrZXlzIiwiaW5uZXJIVE1MIiwibGlua3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGluayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZWZhdWx0Iiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaHRtbCIsInJvdXRlRGVwdGgiLCJjaGlsZCIsImlzUm91dGFibGUiLCJmaWx0ZXIiLCJtYXAiLCJpbml0aWFsaXplZCIsImNsZWFySW50ZXJ2YWwiLCJyZW5kZXJRdWV1ZSIsInNldFRpbWVvdXQiLCJpbml0aWF0ZSIsImlkIiwiaW5jbHVkZXMiLCJ0ZXJtaW5hdGUiLCJtZXRob2RzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldFByb3RvdHlwZU9mIiwiZmxhdHRlbkNoaWxkcmVuIiwiY29uY2F0IiwiYXBwbHkiLCJpc0JsYW5rIiwicHJvdG90eXBlIiwiY3JlYXRlQ29tbWVudCIsImlzU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiY3JlYXRlRWxlbWVudCIsImRvbSIsInJlSVNPIiwicmVNc0FqYXgiLCJkYXRlUGFyc2VyIiwiYSIsImV4ZWMiLCJEYXRlIiwiYiIsInN0cmluZyIsInBhcnNlIiwiY29ubmVjdCIsImxvY2FsU3RvcmFnZSIsInNob3J0Y3V0cyIsInNvY2tldCIsIldlYlNvY2tldCIsImhvc3QiLCJvbmNsb3NlIiwib25lcnJvciIsImNsb3NlIiwicmVtb3ZlIiwic2hvcnRjdXQiLCJzIiwiZXhlY3V0ZSIsImV4ZWN1dGluZyIsInJvb20iLCJjb21tYW5kIiwic2VuZCIsInJlbmRlclNob3J0Y3V0IiwiU2hvcnRjdXQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQSx3Q0FBd0M7UUFDeEM7UUFDQSxzQ0FBc0MsUUFBUTtRQUM5QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRztRQUNIO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBQSxpREFBUyxDQUFDQyxLQUFWLENBQWdCQyx3REFBaEIsRTs7Ozs7Ozs7Ozs7QUNKQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUVBQyxNQUFNLENBQUNDLGNBQVAsR0FBd0JDLDREQUFXLENBQUNDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixNQUFNLENBQUNDLGNBQXRCLENBQUQsQ0FBbkM7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QUFBbUMsY0FBUSxFQUFFLEtBQUttTTtBQUFsRCxtQkFIRixDQUZGLEVBT0csS0FBS1gsU0FBTCxDQUFlckcsTUFBZixHQUF3QixDQUF4QixJQUNDO0FBQUssV0FBSyxFQUFDO0FBQVgsT0FDRyxLQUFLcUcsU0FBTCxDQUFlakMsR0FBZixDQUFvQnlDLFFBQUQsSUFBYywwREFBQyxRQUFEO0FBQVUsY0FBUSxFQUFFQTtBQUFwQixNQUFqQyxDQURILENBUkosQ0FERixDQURGLENBREY7QUFtQkQ7O0FBakZpQzs7Z0JBQTlCL00sVyxXQUVXLEk7O0FBb0ZGQSwwRUFBZjtBQUNBQSxXQUFXLENBQUM2QyxJQUFaLEdBQW1CLGtDQUFuQixDIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gd2VicGFjay1saXZlcmVsb2FkLXBsdWdpblxuIFx0KGZ1bmN0aW9uKCkge1xuIFx0ICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgeyByZXR1cm4gfTtcbiBcdCAgdmFyIGlkID0gXCJ3ZWJwYWNrLWxpdmVyZWxvYWQtcGx1Z2luLXNjcmlwdC00OTFhZjdkNzczNjcyZWY0XCI7XG4gXHQgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gXHQgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHQgIGVsLmlkID0gaWQ7XG4gXHQgIGVsLmFzeW5jID0gdHJ1ZTtcbiBcdCAgZWwuc3JjID0gXCIvL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjozNTcyOS9saXZlcmVsb2FkLmpzXCI7XG4gXHQgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChlbCk7XG4gXHR9KCkpO1xuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJ251bGxzaGVldCc7XHJcbmltcG9ydCBOdWxsc3RhY2sgZnJvbSAnbnVsbHN0YWNrJztcclxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vc3JjL0FwcGxpY2F0aW9uJztcclxuXHJcbk51bGxzdGFjay5zdGFydChBcHBsaWNhdGlvbik7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGRlc2VyaWFsaXplIGZyb20gJy4vZGVzZXJpYWxpemUnO1xyXG5cclxud2luZG93LnJlcHJlc2VudGF0aW9uID0gZGVzZXJpYWxpemUoSlNPTi5zdHJpbmdpZnkod2luZG93LnJlcHJlc2VudGF0aW9uKSk7XHJcbndpbmRvdy5pbnN0YW5jZXMgPSBkZXNlcmlhbGl6ZShKU09OLnN0cmluZ2lmeSh3aW5kb3cuaW5zdGFuY2VzKSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XHJcbiAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG59KTtcclxuXHJcbmNvbnN0IHBhZ2VQcm94eUhhbmRsZXIgPSB7XHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGlmKG5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgZG9jdW1lbnQudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KC4uLmFyZ3VtZW50cyk7XHJcbiAgICBOdWxsc3RhY2sudXBkYXRlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUm91dGVyIHtcclxuXHJcbiAgc2V0IHVybCh0YXJnZXQpIHtcclxuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdGFyZ2V0KTtcclxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncG9wc3RhdGUnKSk7XHJcbiAgICBOdWxsc3RhY2sucm91dGVDaGFuZ2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1cmwoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lK3dpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgZW52aXJvbm1lbnQgPSB7Li4ud2luZG93LmVudmlyb25tZW50LCBjbGllbnQ6IHRydWUsIHNlcnZlcjogZmFsc2V9O1xyXG5kZWxldGUgd2luZG93LmVudmlyb25tZW50O1xyXG5jb25zdCBwYWdlID0gbmV3IFByb3h5KHsuLi53aW5kb3cucGFnZX0sIHBhZ2VQcm94eUhhbmRsZXIpO1xyXG5kZWxldGUgd2luZG93LnBhZ2U7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuY29uc3QgY29udGV4dCA9IHtlbnZpcm9ubWVudCwgcGFnZSwgcm91dGVyfTtcclxuXHJcbmNvbnN0IGNvbnRleHRQcm94eUhhbmRsZXIgPSB7XHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGNvbnRleHRbbmFtZV0gPSB2YWx1ZTtcclxuICAgIE51bGxzdGFjay51cGRhdGUoKTtcclxuICAgIHJldHVybiBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2VQcm94eUhhbmRsZXIgPSB7XHJcbiAgZ2V0KHRhcmdldCwgbmFtZSkge1xyXG4gICAgaWYodGFyZ2V0LmF0dHJpYnV0ZXMgJiYgdGFyZ2V0LmF0dHJpYnV0ZXMucHJveHkgJiYgdGFyZ2V0LmF0dHJpYnV0ZXMucHJveHlbbmFtZV0gIT09IHVuZGVmaW5lZCAmJiB0YXJnZXRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGFyZ2V0LmF0dHJpYnV0ZXMucHJveHlbbmFtZV07XHJcbiAgICB9XHJcbiAgICBpZihuYW1lICE9PSAncHJlcGFyZScgJiYgbmFtZSAhPT0gJ2luaXRpYXRlJyAmJiB0YXJnZXRbbmFtZV0gPT09IHVuZGVmaW5lZCAmJiB0YXJnZXQuY29uc3RydWN0b3JbbmFtZV0gPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgZGV0b3VyID0gYXN5bmMgZnVuY3Rpb24ocGFyYW1zID0ge30pIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBgLyR7dGFyZ2V0LmNvbnN0cnVjdG9yLmhhc2h9LyR7bmFtZX0uanNvbmA7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXHJcbiAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuICAgICAgICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcclxuICAgICAgICAgIHJlZmVycmVyUG9saWN5OiAnbm8tcmVmZXJyZXInLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIGRlc2VyaWFsaXplKHBheWxvYWQpLnJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgICB0YXJnZXRbbmFtZV0gPSBkZXRvdXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZWZsZWN0LmdldCguLi5hcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGlmKHRhcmdldC5hdHRyaWJ1dGVzICYmIHRhcmdldC5hdHRyaWJ1dGVzLnByb3h5ICYmIHRhcmdldC5hdHRyaWJ1dGVzLnByb3h5W25hbWVdICE9PSB1bmRlZmluZWQgJiYgdGFyZ2V0W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMucHJveHlbbmFtZV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KC4uLmFyZ3VtZW50cyk7XHJcbiAgICBOdWxsc3RhY2sudXBkYXRlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVsbHN0YWNrIHtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgc3RhdGljIGh5ZHJhdGVkID0gZmFsc2U7XHJcbiAgc3RhdGljIGluaXRpYWxpemVyID0gbnVsbDtcclxuICBcclxuICBzdGF0aWMgaW5zdGFuY2VzID0ge307XHJcbiAgc3RhdGljIGluc3RhbmNlc01vdW50ZWRRdWV1ZSA9IFtdO1xyXG4gIHN0YXRpYyBpbnN0YW5jZXNSZW5ld2VkUXVldWUgPSBbXTtcclxuICBzdGF0aWMgdmlydHVhbERvbSA9IHt9O1xyXG4gIHN0YXRpYyBzZWxlY3RvciA9IG51bGw7XHJcbiAgc3RhdGljIHJvdXRlcyA9IHt9O1xyXG4gIHN0YXRpYyBwYXJhbXMgPSB7fTtcclxuXHJcbiAgc3RhdGljIHJlbmRlclF1ZXVlID0gbnVsbDtcclxuXHJcbiAgc3RhdGljIHN0YXJ0KFN0YXJ0ZXIpIHtcclxuICAgIGZvcihjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmNvbnRleHQpKSB7XHJcbiAgICAgIGNvbnRleHRba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmZyZWV6ZShjb250ZXh0LnByb2plY3QpO1xyXG4gICAgZGVsZXRlIHdpbmRvdy5jb250ZXh0O1xyXG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcclxuICAgIGNvbnN0IFtwYXRoLCBxdWVyeV0gPSByb3V0ZXIudXJsLnNwbGl0KCc/Jyk7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuZ2V0UXVlcnlTdHJpbmdQYXJhbXMocXVlcnkpO1xyXG4gICAgdGhpcy5jdXJyZW50SW5zdGFuY2UgPSBudWxsO1xyXG4gICAgdGhpcy5pbml0aWFsaXplciA9ICgpID0+IE51bGxzdGFjay5lbGVtZW50KFN0YXJ0ZXIpO1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHBsaWNhdGlvbicpO1xyXG4gICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUgPSBbXTtcclxuICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlID0gW107XHJcbiAgICB0aGlzLnZpcnR1YWxEb20gPSB3aW5kb3cucmVwcmVzZW50YXRpb247XHJcbiAgICB0aGlzLm5leHRWaXJ0dWFsRG9tID0gdGhpcy5pbml0aWFsaXplcigpO1xyXG4gICAgdGhpcy5yZXJlbmRlcih0aGlzLnNlbGVjdG9yLCBbMF0sIFtdKTtcclxuICAgIHRoaXMudmlydHVhbERvbSA9IHRoaXMubmV4dFZpcnR1YWxEb207XHJcbiAgICB0aGlzLm5leHRWaXJ0dWFsRG9tID0gbnVsbDtcclxuICAgIGRlbGV0ZSB3aW5kb3cucmVwcmVzZW50YXRpb247XHJcbiAgICBkZWxldGUgd2luZG93Lmluc3RhbmNlcztcclxuICAgIHRoaXMucHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlS2V5KG5vZGUsIGRlcHRoKSB7XHJcbiAgICByZXR1cm4gZGVwdGguam9pbignLicpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlQ29udGV4dCh0ZW1wb3JhcnkpIHtcclxuICAgIHRlbXBvcmFyeS5wYXJhbXMgPSB0ZW1wb3JhcnkucGFyYW1zID8gey4uLnRoaXMucGFyYW1zLCAuLi50ZW1wb3JhcnkucGFyYW1zfSA6IHRoaXMucGFyYW1zO1xyXG4gICAgcmV0dXJuIG5ldyBQcm94eSh7Li4uY29udGV4dCwgLi4udGVtcG9yYXJ5fSwgY29udGV4dFByb3h5SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0UXVlcnlTdHJpbmdQYXJhbXMocXVlcnkpIHtcclxuICAgIGlmKHF1ZXJ5KSB7XHJcbiAgICAgIHF1ZXJ5ID0gKC9eWz8jXS8udGVzdChxdWVyeSkgPyBxdWVyeS5zbGljZSgxKSA6IHF1ZXJ5KTtcclxuICAgICAgcmV0dXJuIHF1ZXJ5LnNwbGl0KCcmJykucmVkdWNlKChwYXJhbXMsIHBhcmFtKSA9PiB7XHJcbiAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHBhcmFtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB0aGlzLmV4dHJhY3RQYXJhbVZhbHVlKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGV4dHJhY3RQYXJhbVZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZih2YWx1ZSA9PT0gJ3RydWUnKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHZhbHVlID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlLnJlcGxhY2UoL1xcKy9nLCAnICcpKSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdXRlTWF0Y2hlcyh1cmwsIHJvdXRlKSB7XHJcbiAgICBsZXQgW3BhdGgsIHF1ZXJ5XSA9IHVybC5zcGxpdCgnPycpO1xyXG4gICAgY29uc3QgdXJsUGF0aHMgPSBwYXRoLnNwbGl0KCcvJyk7XHJcbiAgICBjb25zdCByb3V0ZVBhdGhzID0gcm91dGUuc3BsaXQoJy8nKTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xyXG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgodXJsUGF0aHMubGVuZ3RoLCByb3V0ZVBhdGhzLmxlbmd0aCk7XHJcbiAgICBsZXQgY2F0Y2hhbGwgPSBmYWxzZTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZihjYXRjaGFsbCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHJvdXRlUGF0aHNbaV0gPT09ICcqJykge1xyXG4gICAgICAgIGNhdGNoYWxsID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmIChyb3V0ZVBhdGhzW2ldICYmIHJvdXRlUGF0aHNbaV0uc3RhcnRzV2l0aCgnOicpKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcm91dGVQYXRoc1tpXS5yZXBsYWNlKCc6JywgJycpXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB0aGlzLmV4dHJhY3RQYXJhbVZhbHVlKHVybFBhdGhzW2ldKTtcclxuICAgICAgfSBlbHNlIGlmIChyb3V0ZVBhdGhzW2ldICE9PSB1cmxQYXRoc1tpXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmFtcztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kUGFyZW50SW5zdGFuY2UoZGVwdGgpIHtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZXB0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBrZXkgPSBkZXB0aC5zbGljZSgwLCBpICogLTEpLmpvaW4oJy4nKTtcclxuICAgICAgaWYodGhpcy5pbnN0YW5jZXNba2V5XSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlc1trZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVyZW5kZXIocGFyZW50LCBkZXB0aCwgdmRlcHRoKSB7XHJcbiAgICBpZighdGhpcy5oeWRyYXRlZCkge1xyXG4gICAgICBmb3IoY29uc3QgZWxlbWVudCBvZiBwYXJlbnQuY2hpbGROb2Rlcykge1xyXG4gICAgICAgIGlmKGVsZW1lbnQudGFnTmFtZSAmJiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGV4dGFyZWEnICYmIGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbGVtZW50LkNPTU1FTlRfTk9ERSA9PT0gOCAmJiBlbGVtZW50LnRleHRDb250ZW50ID09PSAnIycpIHtcclxuICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gZGVwdGhbZGVwdGgubGVuZ3RoIC0gMV07XHJcbiAgICBjb25zdCBzZWxlY3RvciA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcclxuICAgIGxldCBjdXJyZW50ID0gdGhpcy52aXJ0dWFsRG9tO1xyXG4gICAgbGV0IG5leHQgPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgZm9yKGNvbnN0IGxldmVsIG9mIHZkZXB0aCkge1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudC5jaGlsZHJlbltsZXZlbF07XHJcbiAgICAgIG5leHQgPSBuZXh0LmNoaWxkcmVuW2xldmVsXTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNGYWxzZShjdXJyZW50KSAmJiB0aGlzLmlzRmFsc2UobmV4dCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoKHRoaXMuaXNGYWxzZShjdXJyZW50KSB8fCB0aGlzLmlzRmFsc2UobmV4dCkpICYmIGN1cnJlbnQgIT0gbmV4dCkge1xyXG4gICAgICBjb25zdCBuZXh0U2VsZWN0b3IgPSB0aGlzLnJlbmRlcihuZXh0LCB2ZGVwdGgpO1xyXG4gICAgICByZXR1cm4gcGFyZW50LnJlcGxhY2VDaGlsZChuZXh0U2VsZWN0b3IsIHNlbGVjdG9yKTtcclxuICAgIH1cclxuICAgIGlmKG5leHQgIT09IHVuZGVmaW5lZCAmJiBuZXh0LmF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCAmJiBuZXh0LmF0dHJpYnV0ZXMuYmluZCkge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZmluZFBhcmVudEluc3RhbmNlKFswLCAuLi52ZGVwdGhdKTtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gbmV4dC5hdHRyaWJ1dGVzLnNvdXJjZSB8fCBpbnN0YW5jZTtcclxuICAgICAgaWYobmV4dC50eXBlID09PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgbmV4dC5jaGlsZHJlbiA9IFt0YXJnZXRbbmV4dC5hdHRyaWJ1dGVzLmJpbmRdXTtcclxuICAgICAgfSBlbHNlIGlmKG5leHQudHlwZSA9PT0gJ2lucHV0JyAmJiBuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgIG5leHQuYXR0cmlidXRlcy5jaGVja2VkID0gdGFyZ2V0W25leHQuYXR0cmlidXRlcy5iaW5kXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0LmF0dHJpYnV0ZXMudmFsdWUgPSB0YXJnZXRbbmV4dC5hdHRyaWJ1dGVzLmJpbmRdO1xyXG4gICAgICB9XHJcbiAgICAgIG5leHQuYXR0cmlidXRlcy5uYW1lID0gbmV4dC5hdHRyaWJ1dGVzLmJpbmQ7XHJcbiAgICAgIGxldCBldmVudE5hbWUgPSAnb25pbnB1dCc7XHJcbiAgICAgIGxldCB2YWx1ZU5hbWUgPSAndmFsdWUnO1xyXG4gICAgICBpZihuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ3JhZGlvJykge1xyXG4gICAgICAgIGV2ZW50TmFtZSA9ICdvbmNsaWNrJztcclxuICAgICAgICB2YWx1ZU5hbWUgPSAnY2hlY2tlZCc7XHJcbiAgICAgIH0gZWxzZSBpZihuZXh0LnR5cGUgIT09ICdpbnB1dCcgJiYgbmV4dC50eXBlICE9PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgZXZlbnROYW1lID0gJ29uY2hhbmdlJztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gbmV4dC5hdHRyaWJ1dGVzW2V2ZW50TmFtZV07XHJcbiAgICAgIG5leHQuYXR0cmlidXRlc1tldmVudE5hbWVdID0gKHtldmVudCwgdmFsdWV9KSA9PiB7XHJcbiAgICAgICAgaWYodGFyZ2V0W25leHQuYXR0cmlidXRlcy5iaW5kXSA9PT0gdHJ1ZSB8fCB0YXJnZXRbbmV4dC5hdHRyaWJ1dGVzLmJpbmRdID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgdGFyZ2V0W25leHQuYXR0cmlidXRlcy5iaW5kXSA9IGV2ZW50ID8gKGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdID09ICd0cnVlJykgOiB2YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYodHlwZW9mIHRhcmdldFtuZXh0LmF0dHJpYnV0ZXMuYmluZF0gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICB0YXJnZXRbbmV4dC5hdHRyaWJ1dGVzLmJpbmRdID0gcGFyc2VGbG9hdChldmVudCA/IGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdIDogdmFsdWUpIHx8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhcmdldFtuZXh0LmF0dHJpYnV0ZXMuYmluZF0gPSBldmVudCA/IGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdIDogdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE51bGxzdGFjay51cGRhdGUoKTtcclxuICAgICAgICBpZihvcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubmV4dC5hdHRyaWJ1dGVzLCBldmVudCwgdmFsdWV9KTtcclxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzRnVuY3Rpb24obmV4dCkpIHtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubmV4dC5hdHRyaWJ1dGVzfSk7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBuZXh0LnR5cGUoY29udGV4dCk7XHJcbiAgICAgIG5leHQuY2hpbGRyZW4gPSBbcm9vdF07XHJcbiAgICAgIHJldHVybiB0aGlzLnJlcmVuZGVyKHBhcmVudCwgZGVwdGgsIFsuLi52ZGVwdGgsIDBdKTtcclxuICAgIH1cclxuICAgIGlmKGN1cnJlbnQgIT09IHVuZGVmaW5lZCAmJiAvXltBLVpdLy50ZXN0KGN1cnJlbnQudHlwZSkgJiYgdHlwZW9mKG5leHQudHlwZSkgPT09ICdmdW5jdGlvbicgJiYgY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUubmFtZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmdlbmVyYXRlS2V5KG5leHQsIFswLCAuLi52ZGVwdGhdKTtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgbmV4dC50eXBlKCk7XHJcbiAgICAgIGluc3RhbmNlLmV2ZW50cyA9IHt9O1xyXG4gICAgICB0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gd2luZG93Lmluc3RhbmNlc1trZXldO1xyXG4gICAgICBmb3IoY29uc3QgYXR0cmlidXRlIGluIHN0YXRlKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbYXR0cmlidXRlXSA9IHN0YXRlW2F0dHJpYnV0ZV07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpbnN0YW5jZS5wcmVwYXJlICYmIGluc3RhbmNlLnByZXBhcmUoY29udGV4dCk7XHJcbiAgICAgIGluc3RhbmNlLmF0dHJpYnV0ZXMgPSBuZXh0LmF0dHJpYnV0ZXM7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2UucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICBuZXh0LmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoLCBuZXh0LmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcihwYXJlbnQsIGRlcHRoLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZih0aGlzLmlzQ2xhc3MoY3VycmVudCkgJiYgY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZW5lcmF0ZUtleShuZXh0LCBbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgIGxldCBpbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIGlmKCF0aGlzLnJvdXRlQ2hhbmdlZCkge1xyXG4gICAgICAgIGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZXNba2V5XTtcclxuICAgICAgfSBlbHNlIGlmKHRoaXMucm91dGVDaGFuZ2VkKSB7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlaW5pdGlhdGUgPSBmYWxzZTtcclxuICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXMuX3NlZ21lbnRzKSB7XHJcbiAgICAgICAgICBmb3IoY29uc3Qgc2VnbWVudCBvZiBuZXh0LmF0dHJpYnV0ZXMuX3NlZ21lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnQuYXR0cmlidXRlcy5wYXJhbXNbc2VnbWVudF0gIT09IG5leHQuYXR0cmlidXRlcy5wYXJhbXNbc2VnbWVudF0pIHtcclxuICAgICAgICAgICAgICBzaG91bGRSZWluaXRpYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIG5leHQuYXR0cmlidXRlcy5fc2VnbWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzaG91bGRSZWluaXRpYXRlKSB7XHJcbiAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpZighaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBuZXh0LnR5cGUoKTtcclxuICAgICAgICBpbnN0YW5jZS5ldmVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2UucHJlcGFyZSAmJiBpbnN0YW5jZS5wcmVwYXJlKGNvbnRleHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGluc3RhbmNlLmF0dHJpYnV0ZXMgPSBuZXh0LmF0dHJpYnV0ZXM7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2UucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICBuZXh0LmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoLCBuZXh0LmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcihwYXJlbnQsIGRlcHRoLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY3VycmVudC50eXBlICE9PSBuZXh0LnR5cGUpIHtcclxuICAgICAgY29uc3QgbmV4dFNlbGVjdG9yID0gdGhpcy5yZW5kZXIobmV4dCwgdmRlcHRoKTtcclxuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXh0U2VsZWN0b3IsIHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc1RleHQoY3VycmVudCkgJiYgdGhpcy5pc1RleHQobmV4dCkpIHtcclxuICAgICAgaWYoY3VycmVudCAhPSBuZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLm5vZGVWYWx1ZSA9IG5leHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcclxuICAgICAgaWYobmV4dC50eXBlID09PSAnYScgJiYgbmV4dC5hdHRyaWJ1dGVzLmhyZWYgJiYgbmV4dC5hdHRyaWJ1dGVzLmhyZWYuc3RhcnRzV2l0aCgnLycpICYmICFuZXh0LmF0dHJpYnV0ZXMudGFyZ2V0KSB7XHJcbiAgICAgICAgbmV4dC5hdHRyaWJ1dGVzLm9uY2xpY2sgPSAoe2V2ZW50fSkgPT4ge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHJvdXRlci51cmwgPSBuZXh0LmF0dHJpYnV0ZXMuaHJlZjtcclxuICAgICAgICAgIGNvbnRleHQuZW52aXJvbm1lbnQucHJlcmVuZGVyZWQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoey4uLmN1cnJlbnQuYXR0cmlidXRlcywgLi4ubmV4dC5hdHRyaWJ1dGVzfSk7XHJcbiAgICAgIGZvcihjb25zdCBuYW1lIG9mIGF0dHJpYnV0ZU5hbWVzKSB7XHJcbiAgICAgICAgaWYobmFtZSA9PT0gJ2h0bWwnKSB7XHJcbiAgICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IGN1cnJlbnQuYXR0cmlidXRlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5pbm5lckhUTUwgPSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBsaW5rcyA9IHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIvXCJdOm5vdChbdGFyZ2V0XSknKTtcclxuICAgICAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtzKSB7XHJcbiAgICAgICAgICAgIGxpbmsub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgcm91dGVyLnVybCA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICBjb250ZXh0LmVudmlyb25tZW50LnByZXJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKG5hbWUgPT09ICdjaGVja2VkJykge1xyXG4gICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdICE9PSBzZWxlY3Rvci52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5jaGVja2VkID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihuYW1lID09PSAndmFsdWUnKSB7XHJcbiAgICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHNlbGVjdG9yLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLnZhbHVlID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihuYW1lLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZSgnb24nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBrZXkgPSAnMC4nICsgdmRlcHRoLmpvaW4oJy4nKSArICcuJyArIGV2ZW50TmFtZTtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLnZkZXB0aF0pO1xyXG4gICAgICAgICAgc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGluc3RhbmNlLmV2ZW50c1trZXldKTtcclxuICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5ldmVudHNba2V5XSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlcy5kZWZhdWx0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoey4uLmluc3RhbmNlLmF0dHJpYnV0ZXMsIC4uLm5leHQuYXR0cmlidXRlcywgZXZlbnR9KTtcclxuICAgICAgICAgICAgICBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0oY29udGV4dCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBpbnN0YW5jZS5ldmVudHNba2V5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWxldGUgaW5zdGFuY2UuZXZlbnRzW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgaWYoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3Iuc2V0QXR0cmlidXRlKG5hbWUsIG5leHQuYXR0cmlidXRlc1tuYW1lXSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnQuYXR0cmlidXRlc1tuYW1lXSAhPT0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIGlmKG5hbWUgIT0gJ3ZhbHVlJyAmJiBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IGZhbHNlIHx8IG5leHQuYXR0cmlidXRlc1tuYW1lXSA9PT0gbnVsbCB8fCBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHNlbGVjdG9yLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG5hbWUgIT0gJ3ZhbHVlJyAmJiBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICBzZWxlY3Rvci5zZXRBdHRyaWJ1dGUobmFtZSwgbmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0b3Iuc2V0QXR0cmlidXRlKG5hbWUsIG5leHQuYXR0cmlidXRlc1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzLmh0bWwpIHJldHVybjtcclxuICAgICAgY29uc3QgbGltaXQgPSBNYXRoLm1heChjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCwgbmV4dC5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgICBjb25zdCByb3V0ZURlcHRoID0gZGVwdGguam9pbignLicpO1xyXG4gICAgICBmb3IoY29uc3QgY2hpbGQgb2YgbmV4dC5jaGlsZHJlbikge1xyXG4gICAgICAgIGlmKHRoaXMuaXNSb3V0YWJsZShjaGlsZCkpIHtcclxuICAgICAgICAgIGlmKHRoaXMucm91dGVzW3JvdXRlRGVwdGhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hpbGQudHlwZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5yb3V0ZU1hdGNoZXMocm91dGVyLnVybCwgY2hpbGQuYXR0cmlidXRlcy5yb3V0ZSk7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVzW3JvdXRlRGVwdGhdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjaGlsZC5hdHRyaWJ1dGVzLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGlsZC50eXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgY2hpbGQuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hpbGQuYXR0cmlidXRlcy5fc2VnbWVudHMgPSBjaGlsZC5hdHRyaWJ1dGVzLnJvdXRlLnNwbGl0KCcvJykuZmlsdGVyKChzZWdtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50WzBdID09ICc6JztcclxuICAgICAgICAgIH0pLm1hcCgoc2VnbWVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5zbGljZSgxKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZGVsZXRlIGNoaWxkLmF0dHJpYnV0ZXMucm91dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG5leHQuY2hpbGRyZW4ubGVuZ3RoID4gY3VycmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3VycmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5yZXJlbmRlcihzZWxlY3RvciwgWy4uLmRlcHRoLCBpXSwgWy4uLnZkZXB0aCwgaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSBjdXJyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5leHQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnN0IG5leHRTZWxlY3RvciA9IHRoaXMucmVuZGVyKG5leHQuY2hpbGRyZW5baV0sIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgICAgIHNlbGVjdG9yLmFwcGVuZENoaWxkKG5leHRTZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYoY3VycmVudC5jaGlsZHJlbi5sZW5ndGggPiBuZXh0LmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuZXh0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcmVuZGVyKHNlbGVjdG9yLCBbLi4uZGVwdGgsIGldLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSBuZXh0LmNoaWxkcmVuLmxlbmd0aDsgaS0tKSB7XHJcbiAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVDaGlsZChzZWxlY3Rvci5jaGlsZE5vZGVzW2ldKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxpbWl0IC0gMTsgaSA+IC0xOyBpLS0pIHtcclxuICAgICAgICAgIHRoaXMucmVyZW5kZXIoc2VsZWN0b3IsIFsuLi5kZXB0aCwgaV0sIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV4dC50eXBlID09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICBzZWxlY3Rvci52YWx1ZSA9IG5leHQuY2hpbGRyZW4uam9pbihcIlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZihuZXh0LnR5cGUgPT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICBzZWxlY3Rvci52YWx1ZSA9IG5leHQuYXR0cmlidXRlcy52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm91dGVDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gIHN0YXRpYyB1cGRhdGUoKSB7XHJcbiAgICBpZih0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZW5kZXJRdWV1ZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyUXVldWUgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBbcGF0aCwgcXVlcnldID0gcm91dGVyLnVybC5zcGxpdCgnPycpO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gdGhpcy5nZXRRdWVyeVN0cmluZ1BhcmFtcyhxdWVyeSk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm91dGVzID0ge307XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlc1JlbmV3ZWRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSB0aGlzLmluaXRpYWxpemVyKCk7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcih0aGlzLnNlbGVjdG9yLCBbMF0sIFtdKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxEb20gPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpO1xyXG4gICAgICB9LCAxNik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgcHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpIHtcclxuICAgIGlmKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmh5ZHJhdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvcihjb25zdCBpbnN0YW5jZSBvZiB0aGlzLmluc3RhbmNlc01vdW50ZWRRdWV1ZSkge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoaW5zdGFuY2UuYXR0cmlidXRlcyk7XHJcbiAgICAgIGluc3RhbmNlLmluaXRpYXRlICYmIGF3YWl0IGluc3RhbmNlLmluaXRpYXRlKGNvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgZm9yKGNvbnN0IFtpZCwgaW5zdGFuY2VdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuaW5zdGFuY2VzKSkge1xyXG4gICAgICBpZighdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUuaW5jbHVkZXMoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KGluc3RhbmNlLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGluc3RhbmNlLnRlcm1pbmF0ZSAmJiBhd2FpdCBpbnN0YW5jZS50ZXJtaW5hdGUoY29udGV4dCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaW5zdGFuY2VzW2lkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0ZUNoYW5nZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgbWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSk7XHJcbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0aGlzLCBpbnN0YW5jZVByb3h5SGFuZGxlcik7XHJcbiAgICBmb3IoY29uc3QgbWV0aG9kIG9mIG1ldGhvZHMpIHtcclxuICAgICAgaWYobWV0aG9kICE9PSAnY29uc3RydWN0b3InICYmIHR5cGVvZih0aGlzW21ldGhvZF0pID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpc1ttZXRob2RdID0gdGhpc1ttZXRob2RdLmJpbmQocHJveHkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICBjaGlsZHJlbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZihjaGlsZC50eXBlID09PSAnRnJhZ21lbnQnKSByZXR1cm4gdGhpcy5mbGF0dGVuQ2hpbGRyZW4oY2hpbGQuY2hpbGRyZW4pO1xyXG4gICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBlbGVtZW50KHR5cGUsIGF0dHJpYnV0ZXMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGlmKGF0dHJpYnV0ZXMgPT09IG51bGwpIHtcclxuICAgICAgYXR0cmlidXRlcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgY2hpbGRyZW4gPSB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbik7XHJcbiAgICBpZih0eXBlID09PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgIGNoaWxkcmVuID0gW2NoaWxkcmVuLmpvaW4oJycpXTtcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZih0eXBlKSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlLnJlbmRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB7dHlwZSwgYXR0cmlidXRlcywgY2hpbGRyZW46IFtdfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt0eXBlLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbn07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNGYWxzZShub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUgPT09IGZhbHNlIHx8IG5vZGUudHlwZSA9PT0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzQmxhbmsobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNSb3V0YWJsZShub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUgJiYgbm9kZS5hdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQgJiYgbm9kZS5hdHRyaWJ1dGVzLnJvdXRlICE9PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzQ2xhc3Mobm9kZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZihub2RlLnR5cGUpID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZihub2RlLnR5cGUucHJvdG90eXBlLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNGdW5jdGlvbihub2RlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mKG5vZGUudHlwZSkgPT09ICdmdW5jdGlvbicgJiYgbm9kZS50eXBlLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzVGV4dChub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZSAhPT0gJ0ZyYWdtZW50JyAmJiB0eXBlb2Yobm9kZS5jaGlsZHJlbikgPT09ICd1bmRlZmluZWQnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbmRlcihub2RlLCBkZXB0aCkge1xyXG4gICAgaWYodGhpcy5pc1JvdXRhYmxlKG5vZGUpKSB7XHJcbiAgICAgIGNvbnN0IHJvdXRlRGVwdGggPSBkZXB0aC5zbGljZSgwLC0xKS5qb2luKCcuJyk7XHJcbiAgICAgIGlmKHRoaXMucm91dGVzW3JvdXRlRGVwdGhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBub2RlLnR5cGUgPSBmYWxzZTtcclxuICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5yb3V0ZU1hdGNoZXMocm91dGVyLnVybCwgbm9kZS5hdHRyaWJ1dGVzLnJvdXRlKTtcclxuICAgICAgaWYocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbcm91dGVEZXB0aF0gPSB0cnVlO1xyXG4gICAgICAgIG5vZGUuYXR0cmlidXRlcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS50eXBlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzRmFsc2Uobm9kZSkpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIik7XHJcbiAgICB9XHJcbiAgICBpZihub2RlICE9IHVuZGVmaW5lZCAmJiBub2RlLmF0dHJpYnV0ZXMgIT0gdW5kZWZpbmVkICYmIG5vZGUuYXR0cmlidXRlcy5iaW5kKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLmRlcHRoXSk7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IG5vZGUuYXR0cmlidXRlcy5zb3VyY2UgfHwgaW5zdGFuY2U7XHJcbiAgICAgIGlmKG5vZGUudHlwZSA9PT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBbdGFyZ2V0W25vZGUuYXR0cmlidXRlcy5iaW5kXV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5hdHRyaWJ1dGVzLnZhbHVlID0gdGFyZ2V0W25vZGUuYXR0cmlidXRlcy5iaW5kXTtcclxuICAgICAgfVxyXG4gICAgICBub2RlLmF0dHJpYnV0ZXMubmFtZSA9IG5vZGUuYXR0cmlidXRlcy5iaW5kO1xyXG4gICAgICBsZXQgZXZlbnROYW1lID0gJ29uaW5wdXQnO1xyXG4gICAgICBsZXQgdmFsdWVOYW1lID0gJ3ZhbHVlJztcclxuICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzLnR5cGUgPT09ICdjaGVja2JveCcgfHwgbm9kZS5hdHRyaWJ1dGVzLnR5cGUgPT09ICdyYWRpbycpIHtcclxuICAgICAgICBldmVudE5hbWUgPSAnb25jbGljayc7XHJcbiAgICAgICAgdmFsdWVOYW1lID0gJ2NoZWNrZWQnO1xyXG4gICAgICB9IGVsc2UgaWYobm9kZS50eXBlICE9PSAnaW5wdXQnICYmIG5vZGUudHlwZSAhPT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgIGV2ZW50TmFtZSA9ICdvbmNoYW5nZSc7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IG5vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdO1xyXG4gICAgICBub2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXSA9ICh7ZXZlbnQsIHZhbHVlfSkgPT4ge1xyXG4gICAgICAgIGlmKHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPT09IHRydWUgfHwgdGFyZ2V0W25vZGUuYXR0cmlidXRlcy5iaW5kXSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPSBldmVudCA/IChldmVudC50YXJnZXRbdmFsdWVOYW1lXSA9PSAndHJ1ZScpIDogdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgdGFyZ2V0W25vZGUuYXR0cmlidXRlcy5iaW5kXSA9IHBhcnNlRmxvYXQoZXZlbnQgPyBldmVudC50YXJnZXRbdmFsdWVOYW1lXSA6IHZhbHVlKSB8fCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gZXZlbnQgPyBldmVudC50YXJnZXRbdmFsdWVOYW1lXSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gZXZlbnQgPyBldmVudC50YXJnZXRbdmFsdWVOYW1lXSA6IHZhbHVlO1xyXG4gICAgICAgIE51bGxzdGFjay51cGRhdGUoKTtcclxuICAgICAgICBpZihvcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubm9kZS5hdHRyaWJ1dGVzLCBldmVudCwgdmFsdWV9KTtcclxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzRnVuY3Rpb24obm9kZSkpIHtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4uZGVwdGhdKTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KHsuLi5pbnN0YW5jZS5hdHRyaWJ1dGVzLCAuLi5ub2RlLmF0dHJpYnV0ZXN9KTtcclxuICAgICAgY29uc3Qgcm9vdCA9IG5vZGUudHlwZShjb250ZXh0KTtcclxuICAgICAgbm9kZS5jaGlsZHJlbiA9IFtyb290XTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKG5vZGUuY2hpbGRyZW5bMF0sIFsuLi5kZXB0aCwgMF0pO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5pc0NsYXNzKG5vZGUpKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2VuZXJhdGVLZXkobm9kZSwgWzAsIC4uLmRlcHRoXSk7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IG5vZGUudHlwZSgpO1xyXG4gICAgICBpbnN0YW5jZS5ldmVudHMgPSB7fTtcclxuICAgICAgaW5zdGFuY2UuYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcclxuICAgICAgdGhpcy5pbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQobm9kZS5hdHRyaWJ1dGVzKTtcclxuICAgICAgaW5zdGFuY2UucHJlcGFyZSAmJiBpbnN0YW5jZS5wcmVwYXJlKGNvbnRleHQpO1xyXG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2UucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICBub2RlLmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICB0aGlzLmluc3RhbmNlc01vdW50ZWRRdWV1ZS5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcihub2RlLmNoaWxkcmVuWzBdLCBbLi4uZGVwdGgsIDBdKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNUZXh0KG5vZGUpKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKTtcclxuICAgIH1cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IG5leHQgPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgbGV0IGlzU3ZnID0gZmFsc2U7XHJcbiAgICBmb3IoY29uc3QgbGV2ZWwgb2YgZGVwdGgpIHtcclxuICAgICAgbmV4dCA9IG5leHQuY2hpbGRyZW5bbGV2ZWxdO1xyXG4gICAgICBpZighbmV4dCkgYnJlYWs7XHJcbiAgICAgIGlmKG5leHQudHlwZSA9PT0gJ3N2ZycpIHtcclxuICAgICAgICBpc1N2ZyA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGlzU3ZnKSB7XHJcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBub2RlLnR5cGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS50eXBlKTtcclxuICAgIH1cclxuICAgIGlmKG5vZGUudHlwZSA9PT0gJ2EnICYmIG5vZGUuYXR0cmlidXRlcy5ocmVmICYmIG5vZGUuYXR0cmlidXRlcy5ocmVmLnN0YXJ0c1dpdGgoJy8nKSAmJiAhbm9kZS5hdHRyaWJ1dGVzLnRhcmdldCkge1xyXG4gICAgICBub2RlLmF0dHJpYnV0ZXMub25jbGljayA9ICh7ZXZlbnR9KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByb3V0ZXIudXJsID0gbm9kZS5hdHRyaWJ1dGVzLmhyZWY7XHJcbiAgICAgICAgY29udGV4dC5lbnZpcm9ubWVudC5wcmVyZW5kZXJlZCA9IGZhbHNlO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCBuYW1lIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG4gICAgICBpZihuYW1lID09PSAnaHRtbCcpIHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG5vZGUuYXR0cmlidXRlc1tuYW1lXTtcclxuICAgICAgICBjb25zdCBsaW5rcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIi9cIl06bm90KFt0YXJnZXRdKScpO1xyXG4gICAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtzKSB7XHJcbiAgICAgICAgICBsaW5rLm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcm91dGVyLnVybCA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgY29udGV4dC5lbnZpcm9ubWVudC5wcmVyZW5kZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZihuYW1lLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICBjb25zdCBldmVudE5hbWUgPSBuYW1lLnJlcGxhY2UoJ29uJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGtleSA9ICcwLicgKyBkZXB0aC5qb2luKCcuJykgKyAnLicgKyBldmVudE5hbWU7XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4uZGVwdGhdKTtcclxuICAgICAgICBpbnN0YW5jZS5ldmVudHNba2V5XSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzLmRlZmF1bHQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubm9kZS5hdHRyaWJ1dGVzLCBldmVudH0pO1xyXG4gICAgICAgICAgbm9kZS5hdHRyaWJ1dGVzW25hbWVdKGNvbnRleHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaW5zdGFuY2UuZXZlbnRzW2tleV0pO1xyXG4gICAgICB9IGVsc2UgaWYodHlwZW9mKG5vZGUuYXR0cmlidXRlc1tuYW1lXSkgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mKG5vZGUuYXR0cmlidXRlc1tuYW1lXSkgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgaWYobmFtZSAhPSAndmFsdWUnICYmIG5vZGUuYXR0cmlidXRlc1tuYW1lXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgbmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKG5hbWUgPT0gJ3ZhbHVlJyB8fCAobm9kZS5hdHRyaWJ1dGVzW25hbWVdICE9PSBmYWxzZSAmJiBub2RlLmF0dHJpYnV0ZXNbbmFtZV0gIT09IG51bGwgJiYgbm9kZS5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCBub2RlLmF0dHJpYnV0ZXNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIW5vZGUuYXR0cmlidXRlcy5odG1sKSB7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5yZW5kZXIobm9kZS5jaGlsZHJlbltpXSwgWy4uLmRlcHRoLCBpXSk7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG5vZGUudHlwZSA9PSAnc2VsZWN0Jykge1xyXG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBub2RlLmF0dHJpYnV0ZXMudmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbn0iLCJjb25zdCByZUlTTyA9IC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopKSg/Olp8KFxcK3wtKShbXFxkfDpdKikpPyQvO1xyXG5jb25zdCByZU1zQWpheCA9IC9eXFwvRGF0ZVxcKChkfC18LiopXFwpW1xcL3xcXFxcXSQvO1xyXG5cclxuZnVuY3Rpb24gZGF0ZVBhcnNlcihrZXksIHZhbHVlKSB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIGxldCBhID0gcmVJU08uZXhlYyh2YWx1ZSk7XHJcbiAgICBpZiAoYSkgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcclxuICAgIGEgPSByZU1zQWpheC5leGVjKHZhbHVlKTtcclxuICAgIGlmIChhKSB7XHJcbiAgICAgIGNvbnN0IGIgPSBhWzFdLnNwbGl0KC9bLSssLl0vKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKGJbMF0gPyArYlswXSA6IDAgLSArYlsxXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlc2VyaWFsaXplKHN0cmluZykge1xyXG4gIHJldHVybiBKU09OLnBhcnNlKHN0cmluZywgZGF0ZVBhcnNlcik7XHJcbn0iLCJpbXBvcnQgTnVsbHN0YWNrIGZyb20gXCIuL3t7RU5WSVJPTk1FTlR9fVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVsbHN0YWNrOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBOdWxsc3RhY2sgZnJvbSAnbnVsbHN0YWNrJztcclxuXHJcbmltcG9ydCAnLi9BcHBsaWNhdGlvbi5jc3MnO1xyXG5cclxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBOdWxsc3RhY2sge1xyXG5cclxuICBzdGF0aWMgc3RhcnQgPSB0cnVlO1xyXG5cclxuICByb29tID0gXCJcIjtcclxuICBjb21tYW5kID0gXCJcIjtcclxuICBzb2NrZXQgPSBudWxsO1xyXG4gIHNob3J0Y3V0cyA9IFtdO1xyXG4gIGV4ZWN1dGluZyA9IGZhbHNlO1xyXG5cclxuICBpbml0aWF0ZSh7ZW52aXJvbm1lbnQsIHBhZ2V9KSB7XHJcbiAgICBwYWdlLnRpdGxlID0gXCJEaXR0byBTZXJ2ZXJcIjtcclxuICAgIGlmKGVudmlyb25tZW50LmNsaWVudCkge1xyXG4gICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgICAgaWYobG9jYWxTdG9yYWdlWydzaG9ydGN1dHMnXSkge1xyXG4gICAgICAgIHRoaXMuc2hvcnRjdXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ3Nob3J0Y3V0cyddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29ubmVjdCgpIHtcclxuICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzczovL1wiICsgbG9jYXRpb24uaG9zdCwgXCJwcm90b2NvbE9uZVwiKTtcclxuICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSAoKSA9PiBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdCwgMTAwMCk7XHJcbiAgICB0aGlzLnNvY2tldC5vbmVycm9yID0gKCkgPT4gdGhpcy5zb2NrZXQuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZSh7c2hvcnRjdXR9KSB7XHJcbiAgICB0aGlzLnNob3J0Y3V0cyA9IHRoaXMuc2hvcnRjdXRzLmZpbHRlcigocykgPT4gcyAhPSBzaG9ydGN1dCk7XHJcbiAgICBsb2NhbFN0b3JhZ2VbJ3Nob3J0Y3V0cyddID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zaG9ydGN1dHMpO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZSh7c2hvcnRjdXR9KSB7XHJcbiAgICBpZih0aGlzLmV4ZWN1dGluZykgcmV0dXJuO1xyXG4gICAgaWYoIXNob3J0Y3V0KSB7XHJcbiAgICAgIGlmKCF0aGlzLnJvb20gfHwgIXRoaXMuY29tbWFuZCkgcmV0dXJuO1xyXG4gICAgICBzaG9ydGN1dCA9IHRoaXMucm9vbSArICcgJyArIHRoaXMuY29tbWFuZDtcclxuICAgIH1cclxuICAgIHRoaXMuc29ja2V0LnNlbmQoc2hvcnRjdXQpO1xyXG4gICAgaWYoIXRoaXMuc2hvcnRjdXRzLmluY2x1ZGVzKHNob3J0Y3V0KSkge1xyXG4gICAgICB0aGlzLnNob3J0Y3V0cy5wdXNoKHNob3J0Y3V0KTtcclxuICAgICAgbG9jYWxTdG9yYWdlWydzaG9ydGN1dHMnXSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc2hvcnRjdXRzKTtcclxuICAgIH1cclxuICAgIHRoaXMucm9vbSA9ICcnO1xyXG4gICAgdGhpcy5jb21tYW5kID0gJyc7XHJcbiAgICB0aGlzLmV4ZWN1dGluZyA9IHRydWU7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhlY3V0aW5nID0gZmFsc2UsIDUwMCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJTaG9ydGN1dCh7c2hvcnRjdXR9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzPVwieHNiIHgxMiBtMmIgYmdtMSBiZ2QgcDR4IHAyeVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5eVwiPiB7c2hvcnRjdXR9IDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5eVwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNtMSBiZ2kyIHAyeCBwMXkgbTFyXCIgb25jbGljaz17dGhpcy5yZW1vdmV9IHNob3J0Y3V0PXtzaG9ydGN1dH0gZGlzYWJsZWQ9e3RoaXMuZXhlY3V0aW5nfT4geCA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbTEgYmdpMSBwMnggcDF5IG0xclwiIG9uY2xpY2s9e3RoaXMuZXhlY3V0ZX0gc2hvcnRjdXQ9e3Nob3J0Y3V0fSBkaXNhYmxlZD17dGhpcy5leGVjdXRpbmd9PiBFeGVjdXRlIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcblxyXG4gIHJlbmRlcih7cGFnZX0pIHtcclxuICAgIGNvbnN0IFNob3J0Y3V0ID0gdGhpcy5yZW5kZXJTaG9ydGN1dDtcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bWFpbiBjbGFzcz1cIngxMiB5eSB5MTIgeXZoIGJnbTEgYmdkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInggeHggcDR4XCI+XHJcbiAgICAgICAgICA8Zm9ybSBjbGFzcz1cIngxMiBiZ20xIG1kK3g2IHMxXCIgb25zdWJtaXQ9e3RoaXMuZXhlY3V0ZX0+XHJcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cInh4IHAzeSBiY20xYiBiY2RiIGNpMVwiPiB7cGFnZS50aXRsZX0gPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInh4IHA0XCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IGJpbmQ9XCJyb29tXCIgcGxhY2Vob2xkZXI9XCJyb29tXCIgY2xhc3M9XCJ4MTIgYmNtMSBiY2QgcDQgbTJiXCIgLz5cclxuICAgICAgICAgICAgICA8aW5wdXQgYmluZD1cImNvbW1hbmRcIiBwbGFjZWhvbGRlcj1cImNvbW1hbmRcIiBjbGFzcz1cIngxMiBiY20xIGJjZCBwNCBtMmJcIiAvPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ4MTIgeHggYmdpMSBjbTEgcDRcIiBkaXNhYmxlZD17dGhpcy5leGVjdXRpbmd9PiBFeGVjdXRlIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge3RoaXMuc2hvcnRjdXRzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwieDEyIHA0eCBwNHQgcDJiIGJjbTF0IGJjZHRcIj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnNob3J0Y3V0cy5tYXAoKHNob3J0Y3V0KSA9PiA8U2hvcnRjdXQgc2hvcnRjdXQ9e3Nob3J0Y3V0fSAvPil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9tYWluPlxyXG4gICAgKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvblxuQXBwbGljYXRpb24uaGFzaCA9ICdjZWFmOGVkNDA5YTc2YjA2OGYxN2ZiNzA2NWM3OTE4Myc7Il0sInNvdXJjZVJvb3QiOiIifQ==