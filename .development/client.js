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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

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
const metadataProxyHandler = {
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
const metadata = new Proxy({ ...window.metadata
}, metadataProxyHandler);
delete window.metadata;
const router = new Router();
const context = {
  environment,
  metadata,
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
    if (name !== 'initialize' && name !== 'initiate' && target[name] === undefined && target.constructor[name] === true) {
      const detour = async function (params = {}) {
        const url = `/${target.constructor.name}/${name}.json`;
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
    const result = Reflect.set(...arguments);
    Nullstack.update();
    return result;
  }

};
class Nullstack {
  static initialize() {
    const Starter = this;
    Nullstack.start(() => Nullstack.element(Starter, null));
  }

  render() {
    return false;
  }

  static start(initializer, selector = '#application') {
    for (const [key, value] of Object.entries(window.context)) {
      context[key] = value;
    }

    delete window.context;
    this.routes = {};
    this.currentInstance = null;
    this.initializer = initializer;
    this.selector = document.querySelector(selector);
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
    if (/^\d+$/.test(value)) return parseInt(value);
    return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
  }

  static routeMatches(url, route) {
    let [path, query] = url.split('?');
    if (route === '*') return this.getQueryStringParams(query);
    const urlPaths = path.split('/');
    const routePaths = route.split('/');
    if (routePaths.length != urlPaths.length) return false;
    const params = {};

    for (let i = 0; i < routePaths.length; i++) {
      if (routePaths[i].startsWith(':')) {
        const key = routePaths[i].replace(':', '');
        params[key] = this.extractParamValue(urlPaths[i]);
      } else if (routePaths[i] !== urlPaths[i]) {
        return false;
      }
    }

    return { ...params,
      ...this.getQueryStringParams(query)
    };
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
      instance.initialize && instance.initialize(context);
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

      if (!next.attributes.params || !this.routeChanged) {
        instance = this.instances[key];
      }

      const context = this.generateContext(next.attributes);

      if (!instance) {
        instance = new next.type();
        instance.events = {};
        this.instances[key] = instance;
        this.instancesMountedQueue.push(instance);
        instance.initialize && instance.initialize(context);
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
      if (next.type === 'a' && next.attributes.href && next.attributes.href.startsWith('/')) {
        next.attributes.onclick = ({
          event
        }) => {
          event.preventDefault();
          router.url = next.attributes.href;
          context.environment.prerendered = false;
        };
      }

      if (next.attributes.bind) {
        const instance = this.findParentInstance([0, ...vdepth]);

        if (next.type === 'textarea') {
          next.children = [instance[next.attributes.bind]];
        } else if (next.type === 'input' && next.attributes.type === 'checkbox') {
          next.attributes.checked = instance[next.attributes.bind];
        } else {
          next.attributes.value = instance[next.attributes.bind];
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

        next.attributes[eventName] = ({
          event
        }) => {
          instance[next.attributes.bind] = event.target[valueName];
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

          const links = selector.querySelectorAll('a[href^="/"]');

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
            if (next.attributes[name] === false || next.attributes[name] === null || next.attributes[name] === undefined) {
              selector.removeAttribute(name);
            } else if (next.attributes[name] === true) {
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
    }
  }

  static update() {
    if (this.initialized) {
      clearInterval(this.renderQueue);
      this.renderQueue = setTimeout(() => {
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
      instance.initialize && instance.initialize(context);
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

    if (node.type === 'a' && node.attributes.href && node.attributes.href.startsWith('/')) {
      node.attributes.onclick = ({
        event
      }) => {
        event.preventDefault();
        router.url = node.attributes.href;
        context.environment.prerendered = false;
      };
    }

    if (node.attributes.bind) {
      const instance = this.findParentInstance([0, ...depth]);

      if (node.type === 'textarea') {
        node.children = [instance[node.attributes.bind]];
      } else {
        node.attributes.value = instance[node.attributes.bind];
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

      node.attributes[eventName] = ({
        event
      }) => {
        instance[node.attributes.bind] = event.target[valueName];
      };
    }

    for (let name in node.attributes) {
      if (name === 'html') {
        element.innerHTML = node.attributes[name];
        const links = element.querySelectorAll('a[href^="/"]');

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
        if (node.attributes[name] === true) {
          element.setAttribute(name, name);
        } else if (node.attributes[name] !== false && node.attributes[name] !== null && node.attributes[name] !== undefined) {
          element.setAttribute(name, node.attributes[name]);
        }
      }
    }

    if (!node.attributes.html) {
      for (let i = 0; i < node.children.length; i++) {
        const dom = this.render(node.children[i], [...depth, i]);
        element.appendChild(dom);
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

/***/ "./node_modules/nullstack/index.js":
/*!*****************************************!*\
  !*** ./node_modules/nullstack/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./node_modules/nullstack/client.js");

/* harmony default export */ __webpack_exports__["default"] = (_client__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/Application.js":
/*!****************************!*\
  !*** ./src/Application.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullstack */ "./node_modules/nullstack/index.js");
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
    metadata
  }) {
    metadata.title = "Ditto Server";

    if (environment.client) {
      this.connect();

      if (localStorage['shortcuts']) {
        this.shortcuts = JSON.parse(localStorage['shortcuts']);
      }
    }
  }

  connect() {
    this.socket = new WebSocket("ws://" + location.host, "protocolOne");

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
      class: "xl m2b bg1 p4x p2y"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xl x6 yy"
    }, " ", shortcut, " "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xr x6 yy"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "xx x0 c0 bg3 p2x p1y m1r",
      onclick: this.remove,
      shortcut: shortcut,
      disabled: this.executing
    }, " x "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "xx x0 c0 bg3 p2x p1y",
      onclick: this.execute,
      shortcut: shortcut,
      disabled: this.executing
    }, " Execute ")));
  }

  render({
    metadata
  }) {
    const Shortcut = this.renderShortcut;
    return nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("main", {
      class: "xx bg1"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xxx yy y12 p4x"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("form", {
      class: "xx bg0 md+x6 s1",
      onsubmit: this.execute
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("h1", {
      class: "xx p3y bc1b c3"
    }, " ", metadata.title, " "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xx p4"
    }, nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("input", {
      bind: "room",
      placeholder: "room",
      class: "bc1 p4 m2b"
    }), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("input", {
      bind: "command",
      placeholder: "command",
      class: "bc1 p4 m2b"
    }), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("button", {
      class: "xx bg3 c0 p4",
      disabled: this.executing
    }, " Execute ")), this.shortcuts.length > 0 && nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
      class: "xx p4x p4t p2b bc1t"
    }, this.shortcuts.map(shortcut => nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element(Shortcut, {
      shortcut: shortcut
    }))))));
  }

}

_defineProperty(Application, "initiate", true);

/* harmony default export */ __webpack_exports__["default"] = (Application);

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nullsheet */ "./node_modules/nullsheet/index.css");
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nullsheet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Application */ "./src/Application.js");



_Application__WEBPACK_IMPORTED_MODULE_2__["default"].initialize();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzaGVldC9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzdGFjay9kZXNlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJyZXByZXNlbnRhdGlvbiIsImRlc2VyaWFsaXplIiwiSlNPTiIsInN0cmluZ2lmeSIsImluc3RhbmNlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJOdWxsc3RhY2siLCJ1cGRhdGUiLCJtZXRhZGF0YVByb3h5SGFuZGxlciIsInNldCIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwidGl0bGUiLCJyZXN1bHQiLCJSZWZsZWN0IiwiYXJndW1lbnRzIiwiUm91dGVyIiwidXJsIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInJvdXRlQ2hhbmdlZCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzZWFyY2giLCJlbnZpcm9ubWVudCIsImNsaWVudCIsInNlcnZlciIsIm1ldGFkYXRhIiwiUHJveHkiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY29udGV4dFByb3h5SGFuZGxlciIsImluc3RhbmNlUHJveHlIYW5kbGVyIiwiZ2V0IiwidW5kZWZpbmVkIiwiY29uc3RydWN0b3IiLCJkZXRvdXIiLCJwYXJhbXMiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJyZWRpcmVjdCIsInJlZmVycmVyUG9saWN5IiwiYm9keSIsInBheWxvYWQiLCJ0ZXh0IiwiYmluZCIsImluaXRpYWxpemUiLCJTdGFydGVyIiwic3RhcnQiLCJyZW5kZXIiLCJpbml0aWFsaXplciIsInNlbGVjdG9yIiwia2V5IiwiT2JqZWN0IiwiZW50cmllcyIsInJvdXRlcyIsImN1cnJlbnRJbnN0YW5jZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbnN0YW5jZXNNb3VudGVkUXVldWUiLCJpbnN0YW5jZXNSZW5ld2VkUXVldWUiLCJ2aXJ0dWFsRG9tIiwibmV4dFZpcnR1YWxEb20iLCJyZXJlbmRlciIsInByb2Nlc3NMaWZlY3ljbGVRdWV1ZXMiLCJnZW5lcmF0ZUtleSIsIm5vZGUiLCJkZXB0aCIsImpvaW4iLCJnZW5lcmF0ZUNvbnRleHQiLCJ0ZW1wb3JhcnkiLCJnZXRRdWVyeVN0cmluZ1BhcmFtcyIsInF1ZXJ5IiwidGVzdCIsInNsaWNlIiwic3BsaXQiLCJyZWR1Y2UiLCJwYXJhbSIsImV4dHJhY3RQYXJhbVZhbHVlIiwicGFyc2VJbnQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwicm91dGVNYXRjaGVzIiwicm91dGUiLCJwYXRoIiwidXJsUGF0aHMiLCJyb3V0ZVBhdGhzIiwibGVuZ3RoIiwiaSIsInN0YXJ0c1dpdGgiLCJmaW5kUGFyZW50SW5zdGFuY2UiLCJwYXJlbnQiLCJ2ZGVwdGgiLCJoeWRyYXRlZCIsImVsZW1lbnQiLCJjaGlsZE5vZGVzIiwiQ09NTUVOVF9OT0RFIiwidGV4dENvbnRlbnQiLCJyZW1vdmVDaGlsZCIsImluZGV4IiwiY3VycmVudCIsIm5leHQiLCJsZXZlbCIsImNoaWxkcmVuIiwiaXNGYWxzZSIsIm5leHRTZWxlY3RvciIsInJlcGxhY2VDaGlsZCIsImlzRnVuY3Rpb24iLCJpbnN0YW5jZSIsImF0dHJpYnV0ZXMiLCJyb290IiwidHlwZSIsImV2ZW50cyIsInN0YXRlIiwiYXR0cmlidXRlIiwicHVzaCIsImxpbWl0IiwiTWF0aCIsIm1heCIsImlzQ2xhc3MiLCJpc1RleHQiLCJub2RlVmFsdWUiLCJocmVmIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJwcmVyZW5kZXJlZCIsImNoZWNrZWQiLCJldmVudE5hbWUiLCJ2YWx1ZU5hbWUiLCJhdHRyaWJ1dGVOYW1lcyIsImtleXMiLCJpbm5lckhUTUwiLCJsaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlZmF1bHQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJodG1sIiwicm91dGVEZXB0aCIsImNoaWxkIiwiaXNSb3V0YWJsZSIsImFwcGVuZENoaWxkIiwiaW5pdGlhbGl6ZWQiLCJjbGVhckludGVydmFsIiwicmVuZGVyUXVldWUiLCJzZXRUaW1lb3V0IiwiaW5pdGlhdGUiLCJpZCIsImluY2x1ZGVzIiwidGVybWluYXRlIiwibWV0aG9kcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRQcm90b3R5cGVPZiIsInByb3h5IiwiZmxhdHRlbkNoaWxkcmVuIiwiY29uY2F0IiwiYXBwbHkiLCJtYXAiLCJpc0JsYW5rIiwicHJvdG90eXBlIiwiY3JlYXRlQ29tbWVudCIsImNyZWF0ZVRleHROb2RlIiwiaXNTdmciLCJjcmVhdGVFbGVtZW50TlMiLCJjcmVhdGVFbGVtZW50IiwiZG9tIiwicmVJU08iLCJyZU1zQWpheCIsImRhdGVQYXJzZXIiLCJhIiwiZXhlYyIsIkRhdGUiLCJiIiwic3RyaW5nIiwicGFyc2UiLCJBcHBsaWNhdGlvbiIsImNvbm5lY3QiLCJsb2NhbFN0b3JhZ2UiLCJzaG9ydGN1dHMiLCJzb2NrZXQiLCJXZWJTb2NrZXQiLCJob3N0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJjbG9zZSIsInJlbW92ZSIsInNob3J0Y3V0IiwiZmlsdGVyIiwicyIsImV4ZWN1dGUiLCJleGVjdXRpbmciLCJyb29tIiwiY29tbWFuZCIsInNlbmQiLCJyZW5kZXJTaG9ydGN1dCIsIlNob3J0Y3V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGRlc2VyaWFsaXplIGZyb20gJy4vZGVzZXJpYWxpemUnO1xyXG5cclxud2luZG93LnJlcHJlc2VudGF0aW9uID0gZGVzZXJpYWxpemUoSlNPTi5zdHJpbmdpZnkod2luZG93LnJlcHJlc2VudGF0aW9uKSk7XHJcbndpbmRvdy5pbnN0YW5jZXMgPSBkZXNlcmlhbGl6ZShKU09OLnN0cmluZ2lmeSh3aW5kb3cuaW5zdGFuY2VzKSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XHJcbiAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG59KTtcclxuXHJcbmNvbnN0IG1ldGFkYXRhUHJveHlIYW5kbGVyID0ge1xyXG4gIHNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZihuYW1lID09PSAndGl0bGUnKSB7XHJcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gICAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvdXRlciB7XHJcblxyXG4gIHNldCB1cmwodGFyZ2V0KSB7XHJcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHRhcmdldCk7XHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3BvcHN0YXRlJykpO1xyXG4gICAgTnVsbHN0YWNrLnJvdXRlQ2hhbmdlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBnZXQgdXJsKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSt3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGVudmlyb25tZW50ID0gey4uLndpbmRvdy5lbnZpcm9ubWVudCwgY2xpZW50OiB0cnVlLCBzZXJ2ZXI6IGZhbHNlfTtcclxuZGVsZXRlIHdpbmRvdy5lbnZpcm9ubWVudDtcclxuY29uc3QgbWV0YWRhdGEgPSBuZXcgUHJveHkoey4uLndpbmRvdy5tZXRhZGF0YX0sIG1ldGFkYXRhUHJveHlIYW5kbGVyKTtcclxuZGVsZXRlIHdpbmRvdy5tZXRhZGF0YTtcclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG5jb25zdCBjb250ZXh0ID0ge2Vudmlyb25tZW50LCBtZXRhZGF0YSwgcm91dGVyfTtcclxuXHJcbmNvbnN0IGNvbnRleHRQcm94eUhhbmRsZXIgPSB7XHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGNvbnRleHRbbmFtZV0gPSB2YWx1ZTtcclxuICAgIE51bGxzdGFjay51cGRhdGUoKTtcclxuICAgIHJldHVybiBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2VQcm94eUhhbmRsZXIgPSB7XHJcbiAgZ2V0KHRhcmdldCwgbmFtZSkge1xyXG4gICAgaWYobmFtZSAhPT0gJ2luaXRpYWxpemUnICYmIG5hbWUgIT09ICdpbml0aWF0ZScgJiYgdGFyZ2V0W25hbWVdID09PSB1bmRlZmluZWQgJiYgdGFyZ2V0LmNvbnN0cnVjdG9yW25hbWVdID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IGRldG91ciA9IGFzeW5jIGZ1bmN0aW9uKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYC8ke3RhcmdldC5jb25zdHJ1Y3Rvci5uYW1lfS8ke25hbWV9Lmpzb25gO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxyXG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXHJcbiAgICAgICAgICByZWZlcnJlclBvbGljeTogJ25vLXJlZmVycmVyJyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgIHJldHVybiBkZXNlcmlhbGl6ZShwYXlsb2FkKS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgICAgdGFyZ2V0W25hbWVdID0gZGV0b3VyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXQoLi4uYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gICAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bGxzdGFjayB7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgY29uc3QgU3RhcnRlciA9IHRoaXM7XHJcbiAgICBOdWxsc3RhY2suc3RhcnQoKCkgPT4gPFN0YXJ0ZXIgLz4pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgc3RhdGljIGh5ZHJhdGVkID0gZmFsc2U7XHJcbiAgc3RhdGljIGluaXRpYWxpemVyID0gbnVsbDtcclxuICBcclxuICBzdGF0aWMgaW5zdGFuY2VzID0ge307XHJcbiAgc3RhdGljIGluc3RhbmNlc01vdW50ZWRRdWV1ZSA9IFtdO1xyXG4gIHN0YXRpYyBpbnN0YW5jZXNSZW5ld2VkUXVldWUgPSBbXTtcclxuICBzdGF0aWMgdmlydHVhbERvbSA9IHt9O1xyXG4gIHN0YXRpYyBzZWxlY3RvciA9IG51bGw7XHJcbiAgc3RhdGljIHJvdXRlcyA9IHt9O1xyXG5cclxuICBzdGF0aWMgcmVuZGVyUXVldWUgPSBudWxsO1xyXG5cclxuICBzdGF0aWMgc3RhcnQoaW5pdGlhbGl6ZXIsIHNlbGVjdG9yPScjYXBwbGljYXRpb24nKSB7XHJcbiAgICBmb3IoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5jb250ZXh0KSkge1xyXG4gICAgICBjb250ZXh0W2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGRlbGV0ZSB3aW5kb3cuY29udGV4dDtcclxuICAgIHRoaXMucm91dGVzID0ge307XHJcbiAgICB0aGlzLmN1cnJlbnRJbnN0YW5jZSA9IG51bGw7XHJcbiAgICB0aGlzLmluaXRpYWxpemVyID0gaW5pdGlhbGl6ZXI7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB0aGlzLmluc3RhbmNlc01vdW50ZWRRdWV1ZSA9IFtdO1xyXG4gICAgdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUgPSBbXTtcclxuICAgIHRoaXMudmlydHVhbERvbSA9IHdpbmRvdy5yZXByZXNlbnRhdGlvbjtcclxuICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSB0aGlzLmluaXRpYWxpemVyKCk7XHJcbiAgICB0aGlzLnJlcmVuZGVyKHRoaXMuc2VsZWN0b3IsIFswXSwgW10pO1xyXG4gICAgdGhpcy52aXJ0dWFsRG9tID0gdGhpcy5uZXh0VmlydHVhbERvbTtcclxuICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSBudWxsO1xyXG4gICAgZGVsZXRlIHdpbmRvdy5yZXByZXNlbnRhdGlvbjtcclxuICAgIGRlbGV0ZSB3aW5kb3cuaW5zdGFuY2VzO1xyXG4gICAgdGhpcy5wcm9jZXNzTGlmZWN5Y2xlUXVldWVzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2VuZXJhdGVLZXkobm9kZSwgZGVwdGgpIHtcclxuICAgIHJldHVybiBkZXB0aC5qb2luKCcuJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2VuZXJhdGVDb250ZXh0KHRlbXBvcmFyeSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm94eSh7Li4uY29udGV4dCwgLi4udGVtcG9yYXJ5fSwgY29udGV4dFByb3h5SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0UXVlcnlTdHJpbmdQYXJhbXMocXVlcnkpIHtcclxuICAgIGlmKHF1ZXJ5KSB7XHJcbiAgICAgIHF1ZXJ5ID0gKC9eWz8jXS8udGVzdChxdWVyeSkgPyBxdWVyeS5zbGljZSgxKSA6IHF1ZXJ5KTtcclxuICAgICAgcmV0dXJuIHF1ZXJ5LnNwbGl0KCcmJykucmVkdWNlKChwYXJhbXMsIHBhcmFtKSA9PiB7XHJcbiAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHBhcmFtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB0aGlzLmV4dHJhY3RQYXJhbVZhbHVlKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGV4dHJhY3RQYXJhbVZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZih2YWx1ZSA9PT0gJ3RydWUnKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHJldHVybiBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWUgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZSgvXFwrL2csICcgJykpIDogJyc7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm91dGVNYXRjaGVzKHVybCwgcm91dGUpIHtcclxuICAgIGxldCBbcGF0aCwgcXVlcnldID0gdXJsLnNwbGl0KCc/Jyk7XHJcbiAgICBpZihyb3V0ZSA9PT0gJyonKSByZXR1cm4gdGhpcy5nZXRRdWVyeVN0cmluZ1BhcmFtcyhxdWVyeSk7XHJcbiAgICBjb25zdCB1cmxQYXRocyA9IHBhdGguc3BsaXQoJy8nKTtcclxuICAgIGNvbnN0IHJvdXRlUGF0aHMgPSByb3V0ZS5zcGxpdCgnLycpO1xyXG4gICAgaWYocm91dGVQYXRocy5sZW5ndGggIT0gdXJsUGF0aHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb3V0ZVBhdGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmKHJvdXRlUGF0aHNbaV0uc3RhcnRzV2l0aCgnOicpKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcm91dGVQYXRoc1tpXS5yZXBsYWNlKCc6JywgJycpXHJcbiAgICAgICAgcGFyYW1zW2tleV0gPSB0aGlzLmV4dHJhY3RQYXJhbVZhbHVlKHVybFBhdGhzW2ldKTtcclxuICAgICAgfSBlbHNlIGlmKHJvdXRlUGF0aHNbaV0gIT09IHVybFBhdGhzW2ldKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gey4uLnBhcmFtcywgLi4udGhpcy5nZXRRdWVyeVN0cmluZ1BhcmFtcyhxdWVyeSl9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRQYXJlbnRJbnN0YW5jZShkZXB0aCkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlcHRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGRlcHRoLnNsaWNlKDAsIGkgKiAtMSkuam9pbignLicpO1xyXG4gICAgICBpZih0aGlzLmluc3RhbmNlc1trZXldKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyByZXJlbmRlcihwYXJlbnQsIGRlcHRoLCB2ZGVwdGgpIHtcclxuICAgIGlmKCF0aGlzLmh5ZHJhdGVkKSB7XHJcbiAgICAgIGZvcihjb25zdCBlbGVtZW50IG9mIHBhcmVudC5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgaWYoZWxlbWVudC5DT01NRU5UX05PREUgPT09IDggJiYgZWxlbWVudC50ZXh0Q29udGVudCA9PT0gJyMnKSB7XHJcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmRleCA9IGRlcHRoW2RlcHRoLmxlbmd0aCAtIDFdO1xyXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF07XHJcbiAgICBsZXQgY3VycmVudCA9IHRoaXMudmlydHVhbERvbTtcclxuICAgIGxldCBuZXh0ID0gdGhpcy5uZXh0VmlydHVhbERvbTtcclxuICAgIGZvcihjb25zdCBsZXZlbCBvZiB2ZGVwdGgpIHtcclxuICAgICAgY3VycmVudCA9IGN1cnJlbnQuY2hpbGRyZW5bbGV2ZWxdO1xyXG4gICAgICBuZXh0ID0gbmV4dC5jaGlsZHJlbltsZXZlbF07XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzRmFsc2UoY3VycmVudCkgJiYgdGhpcy5pc0ZhbHNlKG5leHQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmKCh0aGlzLmlzRmFsc2UoY3VycmVudCkgfHwgdGhpcy5pc0ZhbHNlKG5leHQpKSAmJiBjdXJyZW50ICE9IG5leHQpIHtcclxuICAgICAgY29uc3QgbmV4dFNlbGVjdG9yID0gdGhpcy5yZW5kZXIobmV4dCwgdmRlcHRoKTtcclxuICAgICAgcmV0dXJuIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV4dFNlbGVjdG9yLCBzZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzRnVuY3Rpb24obmV4dCkpIHtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubmV4dC5hdHRyaWJ1dGVzfSk7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBuZXh0LnR5cGUoY29udGV4dCk7XHJcbiAgICAgIG5leHQuY2hpbGRyZW4gPSBbcm9vdF07XHJcbiAgICAgIHJldHVybiB0aGlzLnJlcmVuZGVyKHBhcmVudCwgZGVwdGgsIFsuLi52ZGVwdGgsIDBdKTtcclxuICAgIH1cclxuICAgIGlmKGN1cnJlbnQgIT09IHVuZGVmaW5lZCAmJiAvXltBLVpdLy50ZXN0KGN1cnJlbnQudHlwZSkgJiYgdHlwZW9mKG5leHQudHlwZSkgPT09ICdmdW5jdGlvbicgJiYgY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUubmFtZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmdlbmVyYXRlS2V5KG5leHQsIFswLCAuLi52ZGVwdGhdKTtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgbmV4dC50eXBlKCk7XHJcbiAgICAgIGluc3RhbmNlLmV2ZW50cyA9IHt9O1xyXG4gICAgICB0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gd2luZG93Lmluc3RhbmNlc1trZXldO1xyXG4gICAgICBmb3IoY29uc3QgYXR0cmlidXRlIGluIHN0YXRlKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbYXR0cmlidXRlXSA9IHN0YXRlW2F0dHJpYnV0ZV07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpbnN0YW5jZS5pbml0aWFsaXplICYmIGluc3RhbmNlLmluaXRpYWxpemUoY29udGV4dCk7XHJcbiAgICAgIGluc3RhbmNlLmF0dHJpYnV0ZXMgPSBuZXh0LmF0dHJpYnV0ZXM7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2UucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICBuZXh0LmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoLCBuZXh0LmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcihwYXJlbnQsIGRlcHRoLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZih0aGlzLmlzQ2xhc3MoY3VycmVudCkgJiYgY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZW5lcmF0ZUtleShuZXh0LCBbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgIGxldCBpbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIGlmKCFuZXh0LmF0dHJpYnV0ZXMucGFyYW1zIHx8ICF0aGlzLnJvdXRlQ2hhbmdlZCkge1xyXG4gICAgICAgIGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZXNba2V5XTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQobmV4dC5hdHRyaWJ1dGVzKTtcclxuICAgICAgaWYoIWluc3RhbmNlKSB7XHJcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgbmV4dC50eXBlKCk7XHJcbiAgICAgICAgaW5zdGFuY2UuZXZlbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzTW91bnRlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgIGluc3RhbmNlLmluaXRpYWxpemUgJiYgaW5zdGFuY2UuaW5pdGlhbGl6ZShjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgICBpbnN0YW5jZS5hdHRyaWJ1dGVzID0gbmV4dC5hdHRyaWJ1dGVzO1xyXG4gICAgICB0aGlzLmluc3RhbmNlc1JlbmV3ZWRRdWV1ZS5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgY29uc3Qgcm9vdCA9IGluc3RhbmNlLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgbmV4dC5jaGlsZHJlbiA9IFtyb290XTtcclxuICAgICAgY29uc3QgbGltaXQgPSBNYXRoLm1heChjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCwgbmV4dC5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGltaXQ7IGkrKykge1xyXG4gICAgICAgIHRoaXMucmVyZW5kZXIocGFyZW50LCBkZXB0aCwgWy4uLnZkZXB0aCwgaV0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQudHlwZSAhPT0gbmV4dC50eXBlKSB7XHJcbiAgICAgIGNvbnN0IG5leHRTZWxlY3RvciA9IHRoaXMucmVuZGVyKG5leHQsIHZkZXB0aCk7XHJcbiAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV4dFNlbGVjdG9yLCBzZWxlY3Rvcik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNUZXh0KGN1cnJlbnQpICYmIHRoaXMuaXNUZXh0KG5leHQpKSB7XHJcbiAgICAgIGlmKGN1cnJlbnQgIT0gbmV4dCkge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rvci5ub2RlVmFsdWUgPSBuZXh0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQudHlwZSA9PT0gbmV4dC50eXBlKSB7XHJcbiAgICAgIGlmKG5leHQudHlwZSA9PT0gJ2EnICYmIG5leHQuYXR0cmlidXRlcy5ocmVmICYmIG5leHQuYXR0cmlidXRlcy5ocmVmLnN0YXJ0c1dpdGgoJy8nKSkge1xyXG4gICAgICAgIG5leHQuYXR0cmlidXRlcy5vbmNsaWNrID0gKHtldmVudH0pID0+IHtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICByb3V0ZXIudXJsID0gbmV4dC5hdHRyaWJ1dGVzLmhyZWY7XHJcbiAgICAgICAgICBjb250ZXh0LmVudmlyb25tZW50LnByZXJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICBpZihuZXh0LmF0dHJpYnV0ZXMuYmluZCkge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLnZkZXB0aF0pO1xyXG4gICAgICAgIGlmKG5leHQudHlwZSA9PT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgICAgbmV4dC5jaGlsZHJlbiA9IFtpbnN0YW5jZVtuZXh0LmF0dHJpYnV0ZXMuYmluZF1dO1xyXG4gICAgICAgIH0gZWxzZSBpZihuZXh0LnR5cGUgPT09ICdpbnB1dCcgJiYgbmV4dC5hdHRyaWJ1dGVzLnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgIG5leHQuYXR0cmlidXRlcy5jaGVja2VkID0gaW5zdGFuY2VbbmV4dC5hdHRyaWJ1dGVzLmJpbmRdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXh0LmF0dHJpYnV0ZXMudmFsdWUgPSBpbnN0YW5jZVtuZXh0LmF0dHJpYnV0ZXMuYmluZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHQuYXR0cmlidXRlcy5uYW1lID0gbmV4dC5hdHRyaWJ1dGVzLmJpbmQ7XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9ICdvbmlucHV0JztcclxuICAgICAgICBsZXQgdmFsdWVOYW1lID0gJ3ZhbHVlJztcclxuICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ3JhZGlvJykge1xyXG4gICAgICAgICAgZXZlbnROYW1lID0gJ29uY2xpY2snO1xyXG4gICAgICAgICAgdmFsdWVOYW1lID0gJ2NoZWNrZWQnO1xyXG4gICAgICAgIH0gZWxzZSBpZihuZXh0LnR5cGUgIT09ICdpbnB1dCcgJiYgbmV4dC50eXBlICE9PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgICBldmVudE5hbWUgPSAnb25jaGFuZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0LmF0dHJpYnV0ZXNbZXZlbnROYW1lXSA9ICh7ZXZlbnR9KSA9PiB7XHJcbiAgICAgICAgICBpbnN0YW5jZVtuZXh0LmF0dHJpYnV0ZXMuYmluZF0gPSBldmVudC50YXJnZXRbdmFsdWVOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyh7Li4uY3VycmVudC5hdHRyaWJ1dGVzLCAuLi5uZXh0LmF0dHJpYnV0ZXN9KTtcclxuICAgICAgZm9yKGNvbnN0IG5hbWUgb2YgYXR0cmlidXRlTmFtZXMpIHtcclxuICAgICAgICBpZihuYW1lID09PSAnaHRtbCcpIHtcclxuICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlc1tuYW1lXSAhPT0gY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLmlubmVySFRNTCA9IG5leHQuYXR0cmlidXRlc1tuYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGxpbmtzID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIi9cIl0nKTtcclxuICAgICAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtzKSB7XHJcbiAgICAgICAgICAgIGxpbmsub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgcm91dGVyLnVybCA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICBjb250ZXh0LmVudmlyb25tZW50LnByZXJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKG5hbWUgPT09ICdjaGVja2VkJykge1xyXG4gICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdICE9PSBzZWxlY3Rvci52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5jaGVja2VkID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihuYW1lID09PSAndmFsdWUnKSB7XHJcbiAgICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHNlbGVjdG9yLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLnZhbHVlID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihuYW1lLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZSgnb24nLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBrZXkgPSAnMC4nICsgdmRlcHRoLmpvaW4oJy4nKSArICcuJyArIGV2ZW50TmFtZTtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLnZkZXB0aF0pO1xyXG4gICAgICAgICAgc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGluc3RhbmNlLmV2ZW50c1trZXldKTtcclxuICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5ldmVudHNba2V5XSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlcy5kZWZhdWx0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoey4uLmluc3RhbmNlLmF0dHJpYnV0ZXMsIC4uLm5leHQuYXR0cmlidXRlcywgZXZlbnR9KTtcclxuICAgICAgICAgICAgICBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0oY29udGV4dCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBpbnN0YW5jZS5ldmVudHNba2V5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWxldGUgaW5zdGFuY2UuZXZlbnRzW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgaWYoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3Iuc2V0QXR0cmlidXRlKG5hbWUsIG5leHQuYXR0cmlidXRlc1tuYW1lXSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKGN1cnJlbnQuYXR0cmlidXRlc1tuYW1lXSAhPT0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlc1tuYW1lXSA9PT0gZmFsc2UgfHwgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSBudWxsIHx8IG5leHQuYXR0cmlidXRlc1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0b3Iuc2V0QXR0cmlidXRlKG5hbWUsIG5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNlbGVjdG9yLnNldEF0dHJpYnV0ZShuYW1lLCBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG5leHQuYXR0cmlidXRlcy5odG1sKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5tYXgoY3VycmVudC5jaGlsZHJlbi5sZW5ndGgsIG5leHQuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgICAgY29uc3Qgcm91dGVEZXB0aCA9IGRlcHRoLmpvaW4oJy4nKTtcclxuICAgICAgZm9yKGNvbnN0IGNoaWxkIG9mIG5leHQuY2hpbGRyZW4pIHtcclxuICAgICAgICBpZih0aGlzLmlzUm91dGFibGUoY2hpbGQpKSB7XHJcbiAgICAgICAgICBpZih0aGlzLnJvdXRlc1tyb3V0ZURlcHRoXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnR5cGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hpbGQuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucm91dGVNYXRjaGVzKHJvdXRlci51cmwsIGNoaWxkLmF0dHJpYnV0ZXMucm91dGUpO1xyXG4gICAgICAgICAgICBpZihwYXJhbXMpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlc1tyb3V0ZURlcHRoXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgY2hpbGQuYXR0cmlidXRlcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hpbGQudHlwZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSBjaGlsZC5hdHRyaWJ1dGVzLnJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihuZXh0LmNoaWxkcmVuLmxlbmd0aCA+IGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMucmVyZW5kZXIoc2VsZWN0b3IsIFsuLi5kZXB0aCwgaV0sIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gY3VycmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBuZXh0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zdCBuZXh0U2VsZWN0b3IgPSB0aGlzLnJlbmRlcihuZXh0LmNoaWxkcmVuW2ldLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgICAgICBzZWxlY3Rvci5hcHBlbmRDaGlsZChuZXh0U2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoID4gbmV4dC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmV4dC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5yZXJlbmRlcihzZWxlY3RvciwgWy4uLmRlcHRoLCBpXSwgWy4uLnZkZXB0aCwgaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSBjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gbmV4dC5jaGlsZHJlbi5sZW5ndGg7IGktLSkge1xyXG4gICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQ2hpbGQoc2VsZWN0b3IuY2hpbGROb2Rlc1tpXSk7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IobGV0IGkgPSBsaW1pdCAtIDE7IGkgPiAtMTsgaS0tKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcmVuZGVyKHNlbGVjdG9yLCBbLi4uZGVwdGgsIGldLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb3V0ZUNoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZSgpIHtcclxuICAgIGlmKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlbmRlclF1ZXVlKTtcclxuICAgICAgdGhpcy5yZW5kZXJRdWV1ZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvdXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzTW91bnRlZFF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLm5leHRWaXJ0dWFsRG9tID0gdGhpcy5pbml0aWFsaXplcigpO1xyXG4gICAgICAgIHRoaXMucmVyZW5kZXIodGhpcy5zZWxlY3RvciwgWzBdLCBbXSk7XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsRG9tID0gdGhpcy5uZXh0VmlydHVhbERvbTtcclxuICAgICAgICB0aGlzLm5leHRWaXJ0dWFsRG9tID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMaWZlY3ljbGVRdWV1ZXMoKTtcclxuICAgICAgfSwgMTYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHByb2Nlc3NMaWZlY3ljbGVRdWV1ZXMoKSB7XHJcbiAgICBpZighdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5oeWRyYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmb3IoY29uc3QgaW5zdGFuY2Ugb2YgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUpIHtcclxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KGluc3RhbmNlLmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpbnN0YW5jZS5pbml0aWF0ZSAmJiBhd2FpdCBpbnN0YW5jZS5pbml0aWF0ZShjb250ZXh0KTtcclxuICAgIH1cclxuICAgIGZvcihjb25zdCBbaWQsIGluc3RhbmNlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmluc3RhbmNlcykpIHtcclxuICAgICAgaWYoIXRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLmluY2x1ZGVzKGluc3RhbmNlKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChpbnN0YW5jZS5hdHRyaWJ1dGVzKTtcclxuICAgICAgICBpbnN0YW5jZS50ZXJtaW5hdGUgJiYgYXdhaXQgaW5zdGFuY2UudGVybWluYXRlKGNvbnRleHQpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmluc3RhbmNlc1tpZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucm91dGVDaGFuZ2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IG1ldGhvZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpO1xyXG4gICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGhpcywgaW5zdGFuY2VQcm94eUhhbmRsZXIpO1xyXG4gICAgZm9yKGNvbnN0IG1ldGhvZCBvZiBtZXRob2RzKSB7XHJcbiAgICAgIGlmKG1ldGhvZCAhPT0gJ2NvbnN0cnVjdG9yJyAmJiB0eXBlb2YodGhpc1ttZXRob2RdKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXNbbWV0aG9kXSA9IHRoaXNbbWV0aG9kXS5iaW5kKHByb3h5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgY2hpbGRyZW4gPSBbXS5jb25jYXQuYXBwbHkoW10sIGNoaWxkcmVuKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYoY2hpbGQudHlwZSA9PT0gJ0ZyYWdtZW50JykgcmV0dXJuIHRoaXMuZmxhdHRlbkNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuKTtcclxuICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZWxlbWVudCh0eXBlLCBhdHRyaWJ1dGVzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBpZihhdHRyaWJ1dGVzID09PSBudWxsKSB7XHJcbiAgICAgIGF0dHJpYnV0ZXMgPSB7fTtcclxuICAgIH1cclxuICAgIGNoaWxkcmVuID0gdGhpcy5mbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pO1xyXG4gICAgaWYodHlwZSA9PT0gJ3RleHRhcmVhJykge1xyXG4gICAgICBjaGlsZHJlbiA9IFtjaGlsZHJlbi5qb2luKCcnKV07XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YodHlwZSkgPT09ICdmdW5jdGlvbicgJiYgdHlwZS5yZW5kZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4ge3R5cGUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuOiBbXX1cclxuICAgIH1cclxuICAgIHJldHVybiB7dHlwZSwgYXR0cmlidXRlcywgY2hpbGRyZW59O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzRmFsc2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlID09PSBmYWxzZSB8fCBub2RlLnR5cGUgPT09IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0JsYW5rKG5vZGUpIHtcclxuICAgIHJldHVybiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzUm91dGFibGUobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlICYmIG5vZGUuYXR0cmlidXRlcyAhPT0gdW5kZWZpbmVkICYmIG5vZGUuYXR0cmlidXRlcy5yb3V0ZSAhPT0gdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0NsYXNzKG5vZGUpIHtcclxuICAgIHJldHVybiB0eXBlb2Yobm9kZS50eXBlKSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Yobm9kZS50eXBlLnByb3RvdHlwZS5yZW5kZXIgPT09ICdmdW5jdGlvbicpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzRnVuY3Rpb24obm9kZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZihub2RlLnR5cGUpID09PSAnZnVuY3Rpb24nICYmIG5vZGUudHlwZS5wcm90b3R5cGUgPT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc1RleHQobm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUgIT09ICdGcmFnbWVudCcgJiYgdHlwZW9mKG5vZGUuY2hpbGRyZW4pID09PSAndW5kZWZpbmVkJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZW5kZXIobm9kZSwgZGVwdGgpIHtcclxuICAgIGlmKHRoaXMuaXNSb3V0YWJsZShub2RlKSkge1xyXG4gICAgICBjb25zdCByb3V0ZURlcHRoID0gZGVwdGguc2xpY2UoMCwtMSkuam9pbignLicpO1xyXG4gICAgICBpZih0aGlzLnJvdXRlc1tyb3V0ZURlcHRoXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbm9kZS50eXBlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucm91dGVNYXRjaGVzKHJvdXRlci51cmwsIG5vZGUuYXR0cmlidXRlcy5yb3V0ZSk7XHJcbiAgICAgIGlmKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMucm91dGVzW3JvdXRlRGVwdGhdID0gdHJ1ZTtcclxuICAgICAgICBub2RlLmF0dHJpYnV0ZXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUudHlwZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNGYWxzZShub2RlKSkge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNGdW5jdGlvbihub2RlKSkge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZmluZFBhcmVudEluc3RhbmNlKFswLCAuLi5kZXB0aF0pO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoey4uLmluc3RhbmNlLmF0dHJpYnV0ZXMsIC4uLm5vZGUuYXR0cmlidXRlc30pO1xyXG4gICAgICBjb25zdCByb290ID0gbm9kZS50eXBlKGNvbnRleHQpO1xyXG4gICAgICBub2RlLmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIobm9kZS5jaGlsZHJlblswXSwgWy4uLmRlcHRoLCAwXSk7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzQ2xhc3Mobm9kZSkpIHtcclxuICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZW5lcmF0ZUtleShub2RlLCBbMCwgLi4uZGVwdGhdKTtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgbm9kZS50eXBlKCk7XHJcbiAgICAgIGluc3RhbmNlLmV2ZW50cyA9IHt9O1xyXG4gICAgICBpbnN0YW5jZS5hdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xyXG4gICAgICB0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChub2RlLmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpbnN0YW5jZS5pbml0aWFsaXplICYmIGluc3RhbmNlLmluaXRpYWxpemUoY29udGV4dCk7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBpbnN0YW5jZS5yZW5kZXIoY29udGV4dCk7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbcm9vdF07XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzTW91bnRlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLmluc3RhbmNlc1JlbmV3ZWRRdWV1ZS5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKG5vZGUuY2hpbGRyZW5bMF0sIFsuLi5kZXB0aCwgMF0pO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5pc1RleHQobm9kZSkpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBsZXQgbmV4dCA9IHRoaXMubmV4dFZpcnR1YWxEb207XHJcbiAgICBsZXQgaXNTdmcgPSBmYWxzZTtcclxuICAgIGZvcihjb25zdCBsZXZlbCBvZiBkZXB0aCkge1xyXG4gICAgICBuZXh0ID0gbmV4dC5jaGlsZHJlbltsZXZlbF07XHJcbiAgICAgIGlmKCFuZXh0KSBicmVhaztcclxuICAgICAgaWYobmV4dC50eXBlID09PSAnc3ZnJykge1xyXG4gICAgICAgIGlzU3ZnID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoaXNTdmcpIHtcclxuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIG5vZGUudHlwZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLnR5cGUpO1xyXG4gICAgfVxyXG4gICAgaWYobm9kZS50eXBlID09PSAnYScgJiYgbm9kZS5hdHRyaWJ1dGVzLmhyZWYgJiYgbm9kZS5hdHRyaWJ1dGVzLmhyZWYuc3RhcnRzV2l0aCgnLycpKSB7XHJcbiAgICAgIG5vZGUuYXR0cmlidXRlcy5vbmNsaWNrID0gKHtldmVudH0pID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJvdXRlci51cmwgPSBub2RlLmF0dHJpYnV0ZXMuaHJlZjtcclxuICAgICAgICBjb250ZXh0LmVudmlyb25tZW50LnByZXJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZihub2RlLmF0dHJpYnV0ZXMuYmluZCkge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZmluZFBhcmVudEluc3RhbmNlKFswLCAuLi5kZXB0aF0pO1xyXG4gICAgICBpZihub2RlLnR5cGUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICBub2RlLmNoaWxkcmVuID0gW2luc3RhbmNlW25vZGUuYXR0cmlidXRlcy5iaW5kXV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5hdHRyaWJ1dGVzLnZhbHVlID0gaW5zdGFuY2Vbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdO1xyXG4gICAgICB9XHJcbiAgICAgIG5vZGUuYXR0cmlidXRlcy5uYW1lID0gbm9kZS5hdHRyaWJ1dGVzLmJpbmQ7XHJcbiAgICAgIGxldCBldmVudE5hbWUgPSAnb25pbnB1dCc7XHJcbiAgICAgIGxldCB2YWx1ZU5hbWUgPSAndmFsdWUnO1xyXG4gICAgICBpZihub2RlLmF0dHJpYnV0ZXMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBub2RlLmF0dHJpYnV0ZXMudHlwZSA9PT0gJ3JhZGlvJykge1xyXG4gICAgICAgIGV2ZW50TmFtZSA9ICdvbmNsaWNrJztcclxuICAgICAgICB2YWx1ZU5hbWUgPSAnY2hlY2tlZCc7XHJcbiAgICAgIH0gZWxzZSBpZihub2RlLnR5cGUgIT09ICdpbnB1dCcgJiYgbm9kZS50eXBlICE9PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgZXZlbnROYW1lID0gJ29uY2hhbmdlJztcclxuICAgICAgfVxyXG4gICAgICBub2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXSA9ICh7ZXZlbnR9KSA9PiB7XHJcbiAgICAgICAgaW5zdGFuY2Vbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gZXZlbnQudGFyZ2V0W3ZhbHVlTmFtZV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgbmFtZSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcclxuICAgICAgaWYobmFtZSA9PT0gJ2h0bWwnKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBub2RlLmF0dHJpYnV0ZXNbbmFtZV07XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIvXCJdJyk7XHJcbiAgICAgICAgZm9yKGNvbnN0IGxpbmsgb2YgbGlua3MpIHtcclxuICAgICAgICAgIGxpbmsub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByb3V0ZXIudXJsID0gbGluay5ocmVmO1xyXG4gICAgICAgICAgICBjb250ZXh0LmVudmlyb25tZW50LnByZXJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmKG5hbWUuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZSgnb24nLCAnJyk7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gJzAuJyArIGRlcHRoLmpvaW4oJy4nKSArICcuJyArIGV2ZW50TmFtZTtcclxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZmluZFBhcmVudEluc3RhbmNlKFswLCAuLi5kZXB0aF0pO1xyXG4gICAgICAgIGluc3RhbmNlLmV2ZW50c1trZXldID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXMuZGVmYXVsdCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KHsuLi5pbnN0YW5jZS5hdHRyaWJ1dGVzLCAuLi5ub2RlLmF0dHJpYnV0ZXMsIGV2ZW50fSk7XHJcbiAgICAgICAgICBub2RlLmF0dHJpYnV0ZXNbbmFtZV0oY29udGV4dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBpbnN0YW5jZS5ldmVudHNba2V5XSk7XHJcbiAgICAgIH0gZWxzZSBpZih0eXBlb2Yobm9kZS5hdHRyaWJ1dGVzW25hbWVdKSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Yobm9kZS5hdHRyaWJ1dGVzW25hbWVdKSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXNbbmFtZV0gPT09IHRydWUpIHtcclxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZihub2RlLmF0dHJpYnV0ZXNbbmFtZV0gIT09IGZhbHNlICYmIG5vZGUuYXR0cmlidXRlc1tuYW1lXSAhPT0gbnVsbCAmJiBub2RlLmF0dHJpYnV0ZXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgbm9kZS5hdHRyaWJ1dGVzW25hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKCFub2RlLmF0dHJpYnV0ZXMuaHRtbCkge1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRvbSA9IHRoaXMucmVuZGVyKG5vZGUuY2hpbGRyZW5baV0sIFsuLi5kZXB0aCwgaV0pO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxufSIsImNvbnN0IHJlSVNPID0gL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKikpKD86WnwoXFwrfC0pKFtcXGR8Ol0qKSk/JC87XHJcbmNvbnN0IHJlTXNBamF4ID0gL15cXC9EYXRlXFwoKGR8LXwuKilcXClbXFwvfFxcXFxdJC87XHJcblxyXG5mdW5jdGlvbiBkYXRlUGFyc2VyKGtleSwgdmFsdWUpIHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgbGV0IGEgPSByZUlTTy5leGVjKHZhbHVlKTtcclxuICAgIGlmIChhKSByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgYSA9IHJlTXNBamF4LmV4ZWModmFsdWUpO1xyXG4gICAgaWYgKGEpIHtcclxuICAgICAgY29uc3QgYiA9IGFbMV0uc3BsaXQoL1stKywuXS8pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUoYlswXSA/ICtiWzBdIDogMCAtICtiWzFdKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVzZXJpYWxpemUoc3RyaW5nKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nLCBkYXRlUGFyc2VyKTtcclxufSIsImltcG9ydCBOdWxsc3RhY2sgZnJvbSBcIi4vY2xpZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdWxsc3RhY2s7IiwiaW1wb3J0IE51bGxzdGFjayBmcm9tICdudWxsc3RhY2snO1xyXG5cclxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBOdWxsc3RhY2sge1xyXG5cclxuICBzdGF0aWMgaW5pdGlhdGUgPSB0cnVlO1xyXG5cclxuICByb29tID0gXCJcIjtcclxuICBjb21tYW5kID0gXCJcIjtcclxuICBzb2NrZXQgPSBudWxsO1xyXG4gIHNob3J0Y3V0cyA9IFtdO1xyXG4gIGV4ZWN1dGluZyA9IGZhbHNlO1xyXG5cclxuICBpbml0aWF0ZSh7ZW52aXJvbm1lbnQsIG1ldGFkYXRhfSkge1xyXG4gICAgbWV0YWRhdGEudGl0bGUgPSBcIkRpdHRvIFNlcnZlclwiO1xyXG4gICAgaWYoZW52aXJvbm1lbnQuY2xpZW50KSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgICBpZihsb2NhbFN0b3JhZ2VbJ3Nob3J0Y3V0cyddKSB7XHJcbiAgICAgICAgdGhpcy5zaG9ydGN1dHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2hvcnRjdXRzJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9cIiArIGxvY2F0aW9uLmhvc3QsIFwicHJvdG9jb2xPbmVcIik7XHJcbiAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gKCkgPT4gc2V0VGltZW91dCh0aGlzLmNvbm5lY3QsIDEwMDApO1xyXG4gICAgdGhpcy5zb2NrZXQub25lcnJvciA9ICgpID0+IHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoe3Nob3J0Y3V0fSkge1xyXG4gICAgdGhpcy5zaG9ydGN1dHMgPSB0aGlzLnNob3J0Y3V0cy5maWx0ZXIoKHMpID0+IHMgIT0gc2hvcnRjdXQpO1xyXG4gICAgbG9jYWxTdG9yYWdlWydzaG9ydGN1dHMnXSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc2hvcnRjdXRzKTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUoe3Nob3J0Y3V0fSkge1xyXG4gICAgaWYodGhpcy5leGVjdXRpbmcpIHJldHVybjtcclxuICAgIGlmKCFzaG9ydGN1dCkge1xyXG4gICAgICBpZighdGhpcy5yb29tIHx8ICF0aGlzLmNvbW1hbmQpIHJldHVybjtcclxuICAgICAgc2hvcnRjdXQgPSB0aGlzLnJvb20gKyAnICcgKyB0aGlzLmNvbW1hbmQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNvY2tldC5zZW5kKHNob3J0Y3V0KTtcclxuICAgIGlmKCF0aGlzLnNob3J0Y3V0cy5pbmNsdWRlcyhzaG9ydGN1dCkpIHtcclxuICAgICAgdGhpcy5zaG9ydGN1dHMucHVzaChzaG9ydGN1dCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZVsnc2hvcnRjdXRzJ10gPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNob3J0Y3V0cyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvb20gPSAnJztcclxuICAgIHRoaXMuY29tbWFuZCA9ICcnO1xyXG4gICAgdGhpcy5leGVjdXRpbmcgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmV4ZWN1dGluZyA9IGZhbHNlLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyU2hvcnRjdXQoe3Nob3J0Y3V0fSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzcz1cInhsIG0yYiBiZzEgcDR4IHAyeVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ4bCB4NiB5eVwiPiB7c2hvcnRjdXR9IDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ4ciB4NiB5eVwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInh4IHgwIGMwIGJnMyBwMnggcDF5IG0xclwiIG9uY2xpY2s9e3RoaXMucmVtb3ZlfSBzaG9ydGN1dD17c2hvcnRjdXR9IGRpc2FibGVkPXt0aGlzLmV4ZWN1dGluZ30+IHggPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwieHggeDAgYzAgYmczIHAyeCBwMXlcIiBvbmNsaWNrPXt0aGlzLmV4ZWN1dGV9IHNob3J0Y3V0PXtzaG9ydGN1dH0gZGlzYWJsZWQ9e3RoaXMuZXhlY3V0aW5nfT4gRXhlY3V0ZSA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICByZW5kZXIoe21ldGFkYXRhfSkge1xyXG4gICAgY29uc3QgU2hvcnRjdXQgPSB0aGlzLnJlbmRlclNob3J0Y3V0O1xuICAgIHJldHVybiAoXHJcbiAgICAgIDxtYWluIGNsYXNzPVwieHggYmcxXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInh4eCB5eSB5MTIgcDR4XCI+XHJcbiAgICAgICAgICA8Zm9ybSBjbGFzcz1cInh4IGJnMCBtZCt4NiBzMVwiIG9uc3VibWl0PXt0aGlzLmV4ZWN1dGV9PlxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ4eCBwM3kgYmMxYiBjM1wiPiB7bWV0YWRhdGEudGl0bGV9IDwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ4eCBwNFwiPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCBiaW5kPVwicm9vbVwiIHBsYWNlaG9sZGVyPVwicm9vbVwiIGNsYXNzPVwiYmMxIHA0IG0yYlwiIC8+XHJcbiAgICAgICAgICAgICAgPGlucHV0IGJpbmQ9XCJjb21tYW5kXCIgcGxhY2Vob2xkZXI9XCJjb21tYW5kXCIgY2xhc3M9XCJiYzEgcDQgbTJiXCIgLz5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwieHggYmczIGMwIHA0XCIgZGlzYWJsZWQ9e3RoaXMuZXhlY3V0aW5nfT4gRXhlY3V0ZSA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHt0aGlzLnNob3J0Y3V0cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInh4IHA0eCBwNHQgcDJiIGJjMXRcIj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnNob3J0Y3V0cy5tYXAoKHNob3J0Y3V0KSA9PiA8U2hvcnRjdXQgc2hvcnRjdXQ9e3Nob3J0Y3V0fSAvPil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9tYWluPlxyXG4gICAgKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5pbXBvcnQgJ251bGxzaGVldCc7XHJcblxyXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9BcHBsaWNhdGlvbic7XHJcblxyXG5BcHBsaWNhdGlvbi5pbml0aWFsaXplKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==