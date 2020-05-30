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
/******/ 	  var id = "webpack-livereload-plugin-script-d6607f3f7d071956";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
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
  /*static initialize() {
    const Starter = this;
    Nullstack.start(() => <Starter />);
  }*/
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
    this.currentInstance = null;

    this.initializer = () => Nullstack.element(Starter, null);

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

/***/ "./src/Application.css":
/*!*****************************!*\
  !*** ./src/Application.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
    page
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
    }, " ", page.title, " "), nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
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

_defineProperty(Application, "start", true);

/* harmony default export */ __webpack_exports__["default"] = (Application);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullsheet */ "./node_modules/nullsheet/index.css");
/* harmony import */ var nullsheet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nullsheet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Application_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Application.css */ "./src/Application.css");
/* harmony import */ var _Application_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Application_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nullstack */ "./node_modules/nullstack/index.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Application */ "./src/Application.js");




nullstack__WEBPACK_IMPORTED_MODULE_2__["default"].start(_Application__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL251bGxzaGVldC9pbmRleC5jc3M/ODU5MSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2Rlc2VyaWFsaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9udWxsc3RhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uLmNzcz84YTFiIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsid2luZG93IiwicmVwcmVzZW50YXRpb24iLCJkZXNlcmlhbGl6ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbnN0YW5jZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiTnVsbHN0YWNrIiwidXBkYXRlIiwicGFnZVByb3h5SGFuZGxlciIsInNldCIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwidGl0bGUiLCJyZXN1bHQiLCJSZWZsZWN0IiwiYXJndW1lbnRzIiwiUm91dGVyIiwidXJsIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInJvdXRlQ2hhbmdlZCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzZWFyY2giLCJlbnZpcm9ubWVudCIsImNsaWVudCIsInNlcnZlciIsInBhZ2UiLCJQcm94eSIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0UHJveHlIYW5kbGVyIiwiaW5zdGFuY2VQcm94eUhhbmRsZXIiLCJnZXQiLCJ1bmRlZmluZWQiLCJjb25zdHJ1Y3RvciIsImRldG91ciIsInBhcmFtcyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsInJlZGlyZWN0IiwicmVmZXJyZXJQb2xpY3kiLCJib2R5IiwicGF5bG9hZCIsInRleHQiLCJiaW5kIiwicmVuZGVyIiwic3RhcnQiLCJTdGFydGVyIiwia2V5IiwiT2JqZWN0IiwiZW50cmllcyIsImZyZWV6ZSIsInByb2plY3QiLCJyb3V0ZXMiLCJjdXJyZW50SW5zdGFuY2UiLCJpbml0aWFsaXplciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImluc3RhbmNlc01vdW50ZWRRdWV1ZSIsImluc3RhbmNlc1JlbmV3ZWRRdWV1ZSIsInZpcnR1YWxEb20iLCJuZXh0VmlydHVhbERvbSIsInJlcmVuZGVyIiwicHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcyIsImdlbmVyYXRlS2V5Iiwibm9kZSIsImRlcHRoIiwiam9pbiIsImdlbmVyYXRlQ29udGV4dCIsInRlbXBvcmFyeSIsImdldFF1ZXJ5U3RyaW5nUGFyYW1zIiwicXVlcnkiLCJ0ZXN0Iiwic2xpY2UiLCJzcGxpdCIsInJlZHVjZSIsInBhcmFtIiwiZXh0cmFjdFBhcmFtVmFsdWUiLCJwYXJzZUludCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJyb3V0ZU1hdGNoZXMiLCJyb3V0ZSIsInBhdGgiLCJ1cmxQYXRocyIsInJvdXRlUGF0aHMiLCJsZW5ndGgiLCJpIiwic3RhcnRzV2l0aCIsImZpbmRQYXJlbnRJbnN0YW5jZSIsInBhcmVudCIsInZkZXB0aCIsImh5ZHJhdGVkIiwiZWxlbWVudCIsImNoaWxkTm9kZXMiLCJDT01NRU5UX05PREUiLCJ0ZXh0Q29udGVudCIsInJlbW92ZUNoaWxkIiwiaW5kZXgiLCJjdXJyZW50IiwibmV4dCIsImxldmVsIiwiY2hpbGRyZW4iLCJpc0ZhbHNlIiwibmV4dFNlbGVjdG9yIiwicmVwbGFjZUNoaWxkIiwiaXNGdW5jdGlvbiIsImluc3RhbmNlIiwiYXR0cmlidXRlcyIsInJvb3QiLCJ0eXBlIiwiZXZlbnRzIiwic3RhdGUiLCJhdHRyaWJ1dGUiLCJwdXNoIiwiaW5pdGlhbGl6ZSIsImxpbWl0IiwiTWF0aCIsIm1heCIsImlzQ2xhc3MiLCJpc1RleHQiLCJub2RlVmFsdWUiLCJocmVmIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJwcmVyZW5kZXJlZCIsImNoZWNrZWQiLCJldmVudE5hbWUiLCJ2YWx1ZU5hbWUiLCJhdHRyaWJ1dGVOYW1lcyIsImtleXMiLCJpbm5lckhUTUwiLCJsaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlZmF1bHQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJodG1sIiwicm91dGVEZXB0aCIsImNoaWxkIiwiaXNSb3V0YWJsZSIsImFwcGVuZENoaWxkIiwiaW5pdGlhbGl6ZWQiLCJjbGVhckludGVydmFsIiwicmVuZGVyUXVldWUiLCJzZXRUaW1lb3V0IiwiaW5pdGlhdGUiLCJpZCIsImluY2x1ZGVzIiwidGVybWluYXRlIiwibWV0aG9kcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRQcm90b3R5cGVPZiIsInByb3h5IiwiZmxhdHRlbkNoaWxkcmVuIiwiY29uY2F0IiwiYXBwbHkiLCJtYXAiLCJpc0JsYW5rIiwicHJvdG90eXBlIiwiY3JlYXRlQ29tbWVudCIsImNyZWF0ZVRleHROb2RlIiwiaXNTdmciLCJjcmVhdGVFbGVtZW50TlMiLCJjcmVhdGVFbGVtZW50IiwiZG9tIiwicmVJU08iLCJyZU1zQWpheCIsImRhdGVQYXJzZXIiLCJhIiwiZXhlYyIsIkRhdGUiLCJiIiwic3RyaW5nIiwicGFyc2UiLCJBcHBsaWNhdGlvbiIsImNvbm5lY3QiLCJsb2NhbFN0b3JhZ2UiLCJzaG9ydGN1dHMiLCJzb2NrZXQiLCJXZWJTb2NrZXQiLCJob3N0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJjbG9zZSIsInJlbW92ZSIsInNob3J0Y3V0IiwiZmlsdGVyIiwicyIsImV4ZWN1dGUiLCJleGVjdXRpbmciLCJyb29tIiwiY29tbWFuZCIsInNlbmQiLCJyZW5kZXJTaG9ydGN1dCIsIlNo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aUQsS0FBVixDQUFnQm9JLG9EQUFoQixFIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gd2VicGFjay1saXZlcmVsb2FkLXBsdWdpblxuIFx0KGZ1bmN0aW9uKCkge1xuIFx0ICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgeyByZXR1cm4gfTtcbiBcdCAgdmFyIGlkID0gXCJ3ZWJwYWNrLWxpdmVyZWxvYWQtcGx1Z2luLXNjcmlwdC1kNjYwN2YzZjdkMDcxOTU2XCI7XG4gXHQgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gXHQgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHQgIGVsLmlkID0gaWQ7XG4gXHQgIGVsLmFzeW5jID0gdHJ1ZTtcbiBcdCAgZWwuc3JjID0gXCIvL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjozNTcyOS9saXZlcmVsb2FkLmpzXCI7XG4gXHQgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChlbCk7XG4gXHR9KCkpO1xuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGRlc2VyaWFsaXplIGZyb20gJy4vZGVzZXJpYWxpemUnO1xyXG5cclxud2luZG93LnJlcHJlc2VudGF0aW9uID0gZGVzZXJpYWxpemUoSlNPTi5zdHJpbmdpZnkod2luZG93LnJlcHJlc2VudGF0aW9uKSk7XHJcbndpbmRvdy5pbnN0YW5jZXMgPSBkZXNlcmlhbGl6ZShKU09OLnN0cmluZ2lmeSh3aW5kb3cuaW5zdGFuY2VzKSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XHJcbiAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG59KTtcclxuXHJcbmNvbnN0IHBhZ2VQcm94eUhhbmRsZXIgPSB7XHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGlmKG5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgZG9jdW1lbnQudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KC4uLmFyZ3VtZW50cyk7XHJcbiAgICBOdWxsc3RhY2sudXBkYXRlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUm91dGVyIHtcclxuXHJcbiAgc2V0IHVybCh0YXJnZXQpIHtcclxuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdGFyZ2V0KTtcclxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncG9wc3RhdGUnKSk7XHJcbiAgICBOdWxsc3RhY2sucm91dGVDaGFuZ2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1cmwoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lK3dpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgZW52aXJvbm1lbnQgPSB7Li4ud2luZG93LmVudmlyb25tZW50LCBjbGllbnQ6IHRydWUsIHNlcnZlcjogZmFsc2V9O1xyXG5kZWxldGUgd2luZG93LmVudmlyb25tZW50O1xyXG5jb25zdCBwYWdlID0gbmV3IFByb3h5KHsuLi53aW5kb3cucGFnZX0sIHBhZ2VQcm94eUhhbmRsZXIpO1xyXG5kZWxldGUgd2luZG93LnBhZ2U7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuY29uc3QgY29udGV4dCA9IHtlbnZpcm9ubWVudCwgcGFnZSwgcm91dGVyfTtcclxuXHJcbmNvbnN0IGNvbnRleHRQcm94eUhhbmRsZXIgPSB7XHJcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcclxuICAgIGNvbnRleHRbbmFtZV0gPSB2YWx1ZTtcclxuICAgIE51bGxzdGFjay51cGRhdGUoKTtcclxuICAgIHJldHVybiBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5zdGFuY2VQcm94eUhhbmRsZXIgPSB7XHJcbiAgZ2V0KHRhcmdldCwgbmFtZSkge1xyXG4gICAgaWYobmFtZSAhPT0gJ2luaXRpYWxpemUnICYmIG5hbWUgIT09ICdpbml0aWF0ZScgJiYgdGFyZ2V0W25hbWVdID09PSB1bmRlZmluZWQgJiYgdGFyZ2V0LmNvbnN0cnVjdG9yW25hbWVdID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IGRldG91ciA9IGFzeW5jIGZ1bmN0aW9uKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYC8ke3RhcmdldC5jb25zdHJ1Y3Rvci5uYW1lfS8ke25hbWV9Lmpzb25gO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxyXG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXHJcbiAgICAgICAgICByZWZlcnJlclBvbGljeTogJ25vLXJlZmVycmVyJyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgIHJldHVybiBkZXNlcmlhbGl6ZShwYXlsb2FkKS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgICAgdGFyZ2V0W25hbWVdID0gZGV0b3VyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXQoLi4uYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LnNldCguLi5hcmd1bWVudHMpO1xyXG4gICAgTnVsbHN0YWNrLnVwZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bGxzdGFjayB7XHJcblxyXG4gIC8qc3RhdGljIGluaXRpYWxpemUoKSB7XHJcbiAgICBjb25zdCBTdGFydGVyID0gdGhpcztcclxuICAgIE51bGxzdGFjay5zdGFydCgoKSA9PiA8U3RhcnRlciAvPik7XHJcbiAgfSovXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHN0YXRpYyBoeWRyYXRlZCA9IGZhbHNlO1xyXG4gIHN0YXRpYyBpbml0aWFsaXplciA9IG51bGw7XHJcbiAgXHJcbiAgc3RhdGljIGluc3RhbmNlcyA9IHt9O1xyXG4gIHN0YXRpYyBpbnN0YW5jZXNNb3VudGVkUXVldWUgPSBbXTtcclxuICBzdGF0aWMgaW5zdGFuY2VzUmVuZXdlZFF1ZXVlID0gW107XHJcbiAgc3RhdGljIHZpcnR1YWxEb20gPSB7fTtcclxuICBzdGF0aWMgc2VsZWN0b3IgPSBudWxsO1xyXG4gIHN0YXRpYyByb3V0ZXMgPSB7fTtcclxuXHJcbiAgc3RhdGljIHJlbmRlclF1ZXVlID0gbnVsbDtcclxuXHJcbiAgc3RhdGljIHN0YXJ0KFN0YXJ0ZXIpIHtcclxuICAgIGZvcihjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmNvbnRleHQpKSB7XHJcbiAgICAgIGNvbnRleHRba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmZyZWV6ZShjb250ZXh0LnByb2plY3QpO1xyXG4gICAgZGVsZXRlIHdpbmRvdy5jb250ZXh0O1xyXG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcclxuICAgIHRoaXMuY3VycmVudEluc3RhbmNlID0gbnVsbDtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZXIgPSAoKSA9PiA8U3RhcnRlciAvPjtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwbGljYXRpb24nKTtcclxuICAgIHRoaXMuaW5zdGFuY2VzTW91bnRlZFF1ZXVlID0gW107XHJcbiAgICB0aGlzLmluc3RhbmNlc1JlbmV3ZWRRdWV1ZSA9IFtdO1xyXG4gICAgdGhpcy52aXJ0dWFsRG9tID0gd2luZG93LnJlcHJlc2VudGF0aW9uO1xyXG4gICAgdGhpcy5uZXh0VmlydHVhbERvbSA9IHRoaXMuaW5pdGlhbGl6ZXIoKTtcclxuICAgIHRoaXMucmVyZW5kZXIodGhpcy5zZWxlY3RvciwgWzBdLCBbXSk7XHJcbiAgICB0aGlzLnZpcnR1YWxEb20gPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgdGhpcy5uZXh0VmlydHVhbERvbSA9IG51bGw7XHJcbiAgICBkZWxldGUgd2luZG93LnJlcHJlc2VudGF0aW9uO1xyXG4gICAgZGVsZXRlIHdpbmRvdy5pbnN0YW5jZXM7XHJcbiAgICB0aGlzLnByb2Nlc3NMaWZlY3ljbGVRdWV1ZXMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZW5lcmF0ZUtleShub2RlLCBkZXB0aCkge1xyXG4gICAgcmV0dXJuIGRlcHRoLmpvaW4oJy4nKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZW5lcmF0ZUNvbnRleHQodGVtcG9yYXJ5KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb3h5KHsuLi5jb250ZXh0LCAuLi50ZW1wb3Jhcnl9LCBjb250ZXh0UHJveHlIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRRdWVyeVN0cmluZ1BhcmFtcyhxdWVyeSkge1xyXG4gICAgaWYocXVlcnkpIHtcclxuICAgICAgcXVlcnkgPSAoL15bPyNdLy50ZXN0KHF1ZXJ5KSA/IHF1ZXJ5LnNsaWNlKDEpIDogcXVlcnkpO1xyXG4gICAgICByZXR1cm4gcXVlcnkuc3BsaXQoJyYnKS5yZWR1Y2UoKHBhcmFtcywgcGFyYW0pID0+IHtcclxuICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gcGFyYW0uc3BsaXQoJz0nKTtcclxuICAgICAgICBwYXJhbXNba2V5XSA9IHRoaXMuZXh0cmFjdFBhcmFtVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgIH0sIHt9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZXh0cmFjdFBhcmFtVmFsdWUodmFsdWUpIHtcclxuICAgIGlmKHZhbHVlID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZigvXlxcZCskLy50ZXN0KHZhbHVlKSkgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZSA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZS5yZXBsYWNlKC9cXCsvZywgJyAnKSkgOiAnJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3V0ZU1hdGNoZXModXJsLCByb3V0ZSkge1xyXG4gICAgbGV0IFtwYXRoLCBxdWVyeV0gPSB1cmwuc3BsaXQoJz8nKTtcclxuICAgIGlmKHJvdXRlID09PSAnKicpIHJldHVybiB0aGlzLmdldFF1ZXJ5U3RyaW5nUGFyYW1zKHF1ZXJ5KTtcclxuICAgIGNvbnN0IHVybFBhdGhzID0gcGF0aC5zcGxpdCgnLycpO1xyXG4gICAgY29uc3Qgcm91dGVQYXRocyA9IHJvdXRlLnNwbGl0KCcvJyk7XHJcbiAgICBpZihyb3V0ZVBhdGhzLmxlbmd0aCAhPSB1cmxQYXRocy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHJvdXRlUGF0aHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYocm91dGVQYXRoc1tpXS5zdGFydHNXaXRoKCc6JykpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSByb3V0ZVBhdGhzW2ldLnJlcGxhY2UoJzonLCAnJylcclxuICAgICAgICBwYXJhbXNba2V5XSA9IHRoaXMuZXh0cmFjdFBhcmFtVmFsdWUodXJsUGF0aHNbaV0pO1xyXG4gICAgICB9IGVsc2UgaWYocm91dGVQYXRoc1tpXSAhPT0gdXJsUGF0aHNbaV0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7Li4ucGFyYW1zLCAuLi50aGlzLmdldFF1ZXJ5U3RyaW5nUGFyYW1zKHF1ZXJ5KX07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmluZFBhcmVudEluc3RhbmNlKGRlcHRoKSB7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVwdGgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3Qga2V5ID0gZGVwdGguc2xpY2UoMCwgaSAqIC0xKS5qb2luKCcuJyk7XHJcbiAgICAgIGlmKHRoaXMuaW5zdGFuY2VzW2tleV0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlcmVuZGVyKHBhcmVudCwgZGVwdGgsIHZkZXB0aCkge1xyXG4gICAgaWYoIXRoaXMuaHlkcmF0ZWQpIHtcclxuICAgICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgcGFyZW50LmNoaWxkTm9kZXMpIHtcclxuICAgICAgICBpZihlbGVtZW50LkNPTU1FTlRfTk9ERSA9PT0gOCAmJiBlbGVtZW50LnRleHRDb250ZW50ID09PSAnIycpIHtcclxuICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gZGVwdGhbZGVwdGgubGVuZ3RoIC0gMV07XHJcbiAgICBjb25zdCBzZWxlY3RvciA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcclxuICAgIGxldCBjdXJyZW50ID0gdGhpcy52aXJ0dWFsRG9tO1xyXG4gICAgbGV0IG5leHQgPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgZm9yKGNvbnN0IGxldmVsIG9mIHZkZXB0aCkge1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudC5jaGlsZHJlbltsZXZlbF07XHJcbiAgICAgIG5leHQgPSBuZXh0LmNoaWxkcmVuW2xldmVsXTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNGYWxzZShjdXJyZW50KSAmJiB0aGlzLmlzRmFsc2UobmV4dCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoKHRoaXMuaXNGYWxzZShjdXJyZW50KSB8fCB0aGlzLmlzRmFsc2UobmV4dCkpICYmIGN1cnJlbnQgIT0gbmV4dCkge1xyXG4gICAgICBjb25zdCBuZXh0U2VsZWN0b3IgPSB0aGlzLnJlbmRlcihuZXh0LCB2ZGVwdGgpO1xyXG4gICAgICByZXR1cm4gcGFyZW50LnJlcGxhY2VDaGlsZChuZXh0U2VsZWN0b3IsIHNlbGVjdG9yKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNGdW5jdGlvbihuZXh0KSkge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZmluZFBhcmVudEluc3RhbmNlKFswLCAuLi52ZGVwdGhdKTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KHsuLi5pbnN0YW5jZS5hdHRyaWJ1dGVzLCAuLi5uZXh0LmF0dHJpYnV0ZXN9KTtcclxuICAgICAgY29uc3Qgcm9vdCA9IG5leHQudHlwZShjb250ZXh0KTtcclxuICAgICAgbmV4dC5jaGlsZHJlbiA9IFtyb290XTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVyZW5kZXIocGFyZW50LCBkZXB0aCwgWy4uLnZkZXB0aCwgMF0pO1xyXG4gICAgfVxyXG4gICAgaWYoY3VycmVudCAhPT0gdW5kZWZpbmVkICYmIC9eW0EtWl0vLnRlc3QoY3VycmVudC50eXBlKSAmJiB0eXBlb2YobmV4dC50eXBlKSA9PT0gJ2Z1bmN0aW9uJyAmJiBjdXJyZW50LnR5cGUgPT09IG5leHQudHlwZS5uYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2VuZXJhdGVLZXkobmV4dCwgWzAsIC4uLnZkZXB0aF0pO1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBuZXh0LnR5cGUoKTtcclxuICAgICAgaW5zdGFuY2UuZXZlbnRzID0ge307XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuICAgICAgY29uc3Qgc3RhdGUgPSB3aW5kb3cuaW5zdGFuY2VzW2tleV07XHJcbiAgICAgIGZvcihjb25zdCBhdHRyaWJ1dGUgaW4gc3RhdGUpIHtcclxuICAgICAgICBpbnN0YW5jZVthdHRyaWJ1dGVdID0gc3RhdGVbYXR0cmlidXRlXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmluc3RhbmNlc01vdW50ZWRRdWV1ZS5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KG5leHQuYXR0cmlidXRlcyk7XHJcbiAgICAgIGluc3RhbmNlLmluaXRpYWxpemUgJiYgaW5zdGFuY2UuaW5pdGlhbGl6ZShjb250ZXh0KTtcclxuICAgICAgaW5zdGFuY2UuYXR0cmlidXRlcyA9IG5leHQuYXR0cmlidXRlcztcclxuICAgICAgdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBpbnN0YW5jZS5yZW5kZXIoY29udGV4dCk7XHJcbiAgICAgIG5leHQuY2hpbGRyZW4gPSBbcm9vdF07XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5tYXgoY3VycmVudC5jaGlsZHJlbi5sZW5ndGgsIG5leHQuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcclxuICAgICAgICB0aGlzLnJlcmVuZGVyKHBhcmVudCwgZGVwdGgsIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNDbGFzcyhjdXJyZW50KSAmJiBjdXJyZW50LnR5cGUgPT09IG5leHQudHlwZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmdlbmVyYXRlS2V5KG5leHQsIFswLCAuLi52ZGVwdGhdKTtcclxuICAgICAgbGV0IGluc3RhbmNlID0gbnVsbDtcclxuICAgICAgaWYoIW5leHQuYXR0cmlidXRlcy5wYXJhbXMgfHwgIXRoaXMucm91dGVDaGFuZ2VkKSB7XHJcbiAgICAgICAgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlc1trZXldO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dChuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICBpZighaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBuZXh0LnR5cGUoKTtcclxuICAgICAgICBpbnN0YW5jZS5ldmVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuaW5pdGlhbGl6ZSAmJiBpbnN0YW5jZS5pbml0aWFsaXplKGNvbnRleHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGluc3RhbmNlLmF0dHJpYnV0ZXMgPSBuZXh0LmF0dHJpYnV0ZXM7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2UucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICBuZXh0LmNoaWxkcmVuID0gW3Jvb3RdO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoLCBuZXh0LmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcihwYXJlbnQsIGRlcHRoLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY3VycmVudC50eXBlICE9PSBuZXh0LnR5cGUpIHtcclxuICAgICAgY29uc3QgbmV4dFNlbGVjdG9yID0gdGhpcy5yZW5kZXIobmV4dCwgdmRlcHRoKTtcclxuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXh0U2VsZWN0b3IsIHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc1RleHQoY3VycmVudCkgJiYgdGhpcy5pc1RleHQobmV4dCkpIHtcclxuICAgICAgaWYoY3VycmVudCAhPSBuZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLm5vZGVWYWx1ZSA9IG5leHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcclxuICAgICAgaWYobmV4dC50eXBlID09PSAnYScgJiYgbmV4dC5hdHRyaWJ1dGVzLmhyZWYgJiYgbmV4dC5hdHRyaWJ1dGVzLmhyZWYuc3RhcnRzV2l0aCgnLycpKSB7XHJcbiAgICAgICAgbmV4dC5hdHRyaWJ1dGVzLm9uY2xpY2sgPSAoe2V2ZW50fSkgPT4ge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHJvdXRlci51cmwgPSBuZXh0LmF0dHJpYnV0ZXMuaHJlZjtcclxuICAgICAgICAgIGNvbnRleHQuZW52aXJvbm1lbnQucHJlcmVuZGVyZWQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG5leHQuYXR0cmlidXRlcy5iaW5kKSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgICAgaWYobmV4dC50eXBlID09PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgICBuZXh0LmNoaWxkcmVuID0gW2luc3RhbmNlW25leHQuYXR0cmlidXRlcy5iaW5kXV07XHJcbiAgICAgICAgfSBlbHNlIGlmKG5leHQudHlwZSA9PT0gJ2lucHV0JyAmJiBuZXh0LmF0dHJpYnV0ZXMudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgbmV4dC5hdHRyaWJ1dGVzLmNoZWNrZWQgPSBpbnN0YW5jZVtuZXh0LmF0dHJpYnV0ZXMuYmluZF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5leHQuYXR0cmlidXRlcy52YWx1ZSA9IGluc3RhbmNlW25leHQuYXR0cmlidXRlcy5iaW5kXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dC5hdHRyaWJ1dGVzLm5hbWUgPSBuZXh0LmF0dHJpYnV0ZXMuYmluZDtcclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gJ29uaW5wdXQnO1xyXG4gICAgICAgIGxldCB2YWx1ZU5hbWUgPSAndmFsdWUnO1xyXG4gICAgICAgIGlmKG5leHQuYXR0cmlidXRlcy50eXBlID09PSAnY2hlY2tib3gnIHx8IG5leHQuYXR0cmlidXRlcy50eXBlID09PSAncmFkaW8nKSB7XHJcbiAgICAgICAgICBldmVudE5hbWUgPSAnb25jbGljayc7XHJcbiAgICAgICAgICB2YWx1ZU5hbWUgPSAnY2hlY2tlZCc7XHJcbiAgICAgICAgfSBlbHNlIGlmKG5leHQudHlwZSAhPT0gJ2lucHV0JyAmJiBuZXh0LnR5cGUgIT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbmNoYW5nZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHQuYXR0cmlidXRlc1tldmVudE5hbWVdID0gKHtldmVudH0pID0+IHtcclxuICAgICAgICAgIGluc3RhbmNlW25leHQuYXR0cmlidXRlcy5iaW5kXSA9IGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lcyA9IE9iamVjdC5rZXlzKHsuLi5jdXJyZW50LmF0dHJpYnV0ZXMsIC4uLm5leHQuYXR0cmlidXRlc30pO1xyXG4gICAgICBmb3IoY29uc3QgbmFtZSBvZiBhdHRyaWJ1dGVOYW1lcykge1xyXG4gICAgICAgIGlmKG5hbWUgPT09ICdodG1sJykge1xyXG4gICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdICE9PSBjdXJyZW50LmF0dHJpYnV0ZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IuaW5uZXJIVE1MID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgbGlua3MgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiL1wiXScpO1xyXG4gICAgICAgICAgZm9yKGNvbnN0IGxpbmsgb2YgbGlua3MpIHtcclxuICAgICAgICAgICAgbGluay5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICByb3V0ZXIudXJsID0gbGluay5ocmVmO1xyXG4gICAgICAgICAgICAgIGNvbnRleHQuZW52aXJvbm1lbnQucHJlcmVuZGVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYobmFtZSA9PT0gJ2NoZWNrZWQnKSB7XHJcbiAgICAgICAgICBpZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHNlbGVjdG9yLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLmNoZWNrZWQgPSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKG5hbWUgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICAgIGlmKG5leHQuYXR0cmlidXRlc1tuYW1lXSAhPT0gc2VsZWN0b3IudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IudmFsdWUgPSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKG5hbWUuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKCdvbicsICcnKTtcclxuICAgICAgICAgIGNvbnN0IGtleSA9ICcwLicgKyB2ZGVwdGguam9pbignLicpICsgJy4nICsgZXZlbnROYW1lO1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZpbmRQYXJlbnRJbnN0YW5jZShbMCwgLi4udmRlcHRoXSk7XHJcbiAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaW5zdGFuY2UuZXZlbnRzW2tleV0pO1xyXG4gICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmV2ZW50c1trZXldID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzLmRlZmF1bHQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubmV4dC5hdHRyaWJ1dGVzLCBldmVudH0pO1xyXG4gICAgICAgICAgICAgIG5leHQuYXR0cmlidXRlc1tuYW1lXShjb250ZXh0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGluc3RhbmNlLmV2ZW50c1trZXldKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpbnN0YW5jZS5ldmVudHNba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYodHlwZW9mKG5leHQuYXR0cmlidXRlc1tuYW1lXSkgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mKG5leHQuYXR0cmlidXRlc1tuYW1lXSkgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBpZihjdXJyZW50LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHVuZGVmaW5lZCAmJiBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5zZXRBdHRyaWJ1dGUobmFtZSwgbmV4dC5hdHRyaWJ1dGVzW25hbWVdKTtcclxuICAgICAgICAgIH0gZWxzZSBpZihjdXJyZW50LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHVuZGVmaW5lZCAmJiBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdICE9PSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSBmYWxzZSB8fCBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IG51bGwgfHwgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICBzZWxlY3Rvci5zZXRBdHRyaWJ1dGUobmFtZSwgbmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0b3Iuc2V0QXR0cmlidXRlKG5hbWUsIG5leHQuYXR0cmlidXRlc1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV4dC5hdHRyaWJ1dGVzLmh0bWwpIHJldHVybjtcclxuICAgICAgY29uc3QgbGltaXQgPSBNYXRoLm1heChjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCwgbmV4dC5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgICBjb25zdCByb3V0ZURlcHRoID0gZGVwdGguam9pbignLicpO1xyXG4gICAgICBmb3IoY29uc3QgY2hpbGQgb2YgbmV4dC5jaGlsZHJlbikge1xyXG4gICAgICAgIGlmKHRoaXMuaXNSb3V0YWJsZShjaGlsZCkpIHtcclxuICAgICAgICAgIGlmKHRoaXMucm91dGVzW3JvdXRlRGVwdGhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hpbGQudHlwZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5yb3V0ZU1hdGNoZXMocm91dGVyLnVybCwgY2hpbGQuYXR0cmlidXRlcy5yb3V0ZSk7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVzW3JvdXRlRGVwdGhdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjaGlsZC5hdHRyaWJ1dGVzLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGlsZC50eXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgY2hpbGQuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIGNoaWxkLmF0dHJpYnV0ZXMucm91dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG5leHQuY2hpbGRyZW4ubGVuZ3RoID4gY3VycmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3VycmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5yZXJlbmRlcihzZWxlY3RvciwgWy4uLmRlcHRoLCBpXSwgWy4uLnZkZXB0aCwgaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSBjdXJyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5leHQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnN0IG5leHRTZWxlY3RvciA9IHRoaXMucmVuZGVyKG5leHQuY2hpbGRyZW5baV0sIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgICAgIHNlbGVjdG9yLmFwcGVuZENoaWxkKG5leHRTZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYoY3VycmVudC5jaGlsZHJlbi5sZW5ndGggPiBuZXh0LmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuZXh0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLnJlcmVuZGVyKHNlbGVjdG9yLCBbLi4uZGVwdGgsIGldLCBbLi4udmRlcHRoLCBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSBuZXh0LmNoaWxkcmVuLmxlbmd0aDsgaS0tKSB7XHJcbiAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVDaGlsZChzZWxlY3Rvci5jaGlsZE5vZGVzW2ldKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxpbWl0IC0gMTsgaSA+IC0xOyBpLS0pIHtcclxuICAgICAgICAgIHRoaXMucmVyZW5kZXIoc2VsZWN0b3IsIFsuLi5kZXB0aCwgaV0sIFsuLi52ZGVwdGgsIGldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvdXRlQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICBzdGF0aWMgdXBkYXRlKCkge1xyXG4gICAgaWYodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucmVuZGVyUXVldWUpO1xyXG4gICAgICB0aGlzLnJlbmRlclF1ZXVlID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm91dGVzID0ge307XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlc1JlbmV3ZWRRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSB0aGlzLmluaXRpYWxpemVyKCk7XHJcbiAgICAgICAgdGhpcy5yZXJlbmRlcih0aGlzLnNlbGVjdG9yLCBbMF0sIFtdKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxEb20gPSB0aGlzLm5leHRWaXJ0dWFsRG9tO1xyXG4gICAgICAgIHRoaXMubmV4dFZpcnR1YWxEb20gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpO1xyXG4gICAgICB9LCAxNik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgcHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpIHtcclxuICAgIGlmKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmh5ZHJhdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvcihjb25zdCBpbnN0YW5jZSBvZiB0aGlzLmluc3RhbmNlc01vdW50ZWRRdWV1ZSkge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoaW5zdGFuY2UuYXR0cmlidXRlcyk7XHJcbiAgICAgIGluc3RhbmNlLmluaXRpYXRlICYmIGF3YWl0IGluc3RhbmNlLmluaXRpYXRlKGNvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgZm9yKGNvbnN0IFtpZCwgaW5zdGFuY2VdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuaW5zdGFuY2VzKSkge1xyXG4gICAgICBpZighdGhpcy5pbnN0YW5jZXNSZW5ld2VkUXVldWUuaW5jbHVkZXMoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KGluc3RhbmNlLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIGluc3RhbmNlLnRlcm1pbmF0ZSAmJiBhd2FpdCBpbnN0YW5jZS50ZXJtaW5hdGUoY29udGV4dCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaW5zdGFuY2VzW2lkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0ZUNoYW5nZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgbWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSk7XHJcbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0aGlzLCBpbnN0YW5jZVByb3h5SGFuZGxlcik7XHJcbiAgICBmb3IoY29uc3QgbWV0aG9kIG9mIG1ldGhvZHMpIHtcclxuICAgICAgaWYobWV0aG9kICE9PSAnY29uc3RydWN0b3InICYmIHR5cGVvZih0aGlzW21ldGhvZF0pID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhpc1ttZXRob2RdID0gdGhpc1ttZXRob2RdLmJpbmQocHJveHkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICBjaGlsZHJlbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZihjaGlsZC50eXBlID09PSAnRnJhZ21lbnQnKSByZXR1cm4gdGhpcy5mbGF0dGVuQ2hpbGRyZW4oY2hpbGQuY2hpbGRyZW4pO1xyXG4gICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBlbGVtZW50KHR5cGUsIGF0dHJpYnV0ZXMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGlmKGF0dHJpYnV0ZXMgPT09IG51bGwpIHtcclxuICAgICAgYXR0cmlidXRlcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgY2hpbGRyZW4gPSB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbik7XHJcbiAgICBpZih0eXBlID09PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgIGNoaWxkcmVuID0gW2NoaWxkcmVuLmpvaW4oJycpXTtcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZih0eXBlKSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlLnJlbmRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB7dHlwZSwgYXR0cmlidXRlcywgY2hpbGRyZW46IFtdfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt0eXBlLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbn07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNGYWxzZShub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUgPT09IGZhbHNlIHx8IG5vZGUudHlwZSA9PT0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzQmxhbmsobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNSb3V0YWJsZShub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUgJiYgbm9kZS5hdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQgJiYgbm9kZS5hdHRyaWJ1dGVzLnJvdXRlICE9PSB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzQ2xhc3Mobm9kZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZihub2RlLnR5cGUpID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZihub2RlLnR5cGUucHJvdG90eXBlLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNGdW5jdGlvbihub2RlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mKG5vZGUudHlwZSkgPT09ICdmdW5jdGlvbicgJiYgbm9kZS50eXBlLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzVGV4dChub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZSAhPT0gJ0ZyYWdtZW50JyAmJiB0eXBlb2Yobm9kZS5jaGlsZHJlbikgPT09ICd1bmRlZmluZWQnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbmRlcihub2RlLCBkZXB0aCkge1xyXG4gICAgaWYodGhpcy5pc1JvdXRhYmxlKG5vZGUpKSB7XHJcbiAgICAgIGNvbnN0IHJvdXRlRGVwdGggPSBkZXB0aC5zbGljZSgwLC0xKS5qb2luKCcuJyk7XHJcbiAgICAgIGlmKHRoaXMucm91dGVzW3JvdXRlRGVwdGhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBub2RlLnR5cGUgPSBmYWxzZTtcclxuICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5yb3V0ZU1hdGNoZXMocm91dGVyLnVybCwgbm9kZS5hdHRyaWJ1dGVzLnJvdXRlKTtcclxuICAgICAgaWYocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbcm91dGVEZXB0aF0gPSB0cnVlO1xyXG4gICAgICAgIG5vZGUuYXR0cmlidXRlcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS50eXBlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYodGhpcy5pc0ZhbHNlKG5vZGUpKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5pc0Z1bmN0aW9uKG5vZGUpKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLmRlcHRoXSk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlQ29udGV4dCh7Li4uaW5zdGFuY2UuYXR0cmlidXRlcywgLi4ubm9kZS5hdHRyaWJ1dGVzfSk7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBub2RlLnR5cGUoY29udGV4dCk7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbcm9vdF07XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcihub2RlLmNoaWxkcmVuWzBdLCBbLi4uZGVwdGgsIDBdKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuaXNDbGFzcyhub2RlKSkge1xyXG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmdlbmVyYXRlS2V5KG5vZGUsIFswLCAuLi5kZXB0aF0pO1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBub2RlLnR5cGUoKTtcclxuICAgICAgaW5zdGFuY2UuZXZlbnRzID0ge307XHJcbiAgICAgIGluc3RhbmNlLmF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVDb250ZXh0KG5vZGUuYXR0cmlidXRlcyk7XHJcbiAgICAgIGluc3RhbmNlLmluaXRpYWxpemUgJiYgaW5zdGFuY2UuaW5pdGlhbGl6ZShjb250ZXh0KTtcclxuICAgICAgY29uc3Qgcm9vdCA9IGluc3RhbmNlLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgbm9kZS5jaGlsZHJlbiA9IFtyb290XTtcclxuICAgICAgdGhpcy5pbnN0YW5jZXNNb3VudGVkUXVldWUucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2VzUmVuZXdlZFF1ZXVlLnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIobm9kZS5jaGlsZHJlblswXSwgWy4uLmRlcHRoLCAwXSk7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmlzVGV4dChub2RlKSkge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIGxldCBuZXh0ID0gdGhpcy5uZXh0VmlydHVhbERvbTtcclxuICAgIGxldCBpc1N2ZyA9IGZhbHNlO1xyXG4gICAgZm9yKGNvbnN0IGxldmVsIG9mIGRlcHRoKSB7XHJcbiAgICAgIG5leHQgPSBuZXh0LmNoaWxkcmVuW2xldmVsXTtcclxuICAgICAgaWYoIW5leHQpIGJyZWFrO1xyXG4gICAgICBpZihuZXh0LnR5cGUgPT09ICdzdmcnKSB7XHJcbiAgICAgICAgaXNTdmcgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihpc1N2Zykge1xyXG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgbm9kZS50eXBlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUudHlwZSk7XHJcbiAgICB9XHJcbiAgICBpZihub2RlLnR5cGUgPT09ICdhJyAmJiBub2RlLmF0dHJpYnV0ZXMuaHJlZiAmJiBub2RlLmF0dHJpYnV0ZXMuaHJlZi5zdGFydHNXaXRoKCcvJykpIHtcclxuICAgICAgbm9kZS5hdHRyaWJ1dGVzLm9uY2xpY2sgPSAoe2V2ZW50fSkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcm91dGVyLnVybCA9IG5vZGUuYXR0cmlidXRlcy5ocmVmO1xyXG4gICAgICAgIGNvbnRleHQuZW52aXJvbm1lbnQucHJlcmVuZGVyZWQgPSBmYWxzZTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmKG5vZGUuYXR0cmlidXRlcy5iaW5kKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLmRlcHRoXSk7XHJcbiAgICAgIGlmKG5vZGUudHlwZSA9PT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBbaW5zdGFuY2Vbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmF0dHJpYnV0ZXMudmFsdWUgPSBpbnN0YW5jZVtub2RlLmF0dHJpYnV0ZXMuYmluZF07XHJcbiAgICAgIH1cclxuICAgICAgbm9kZS5hdHRyaWJ1dGVzLm5hbWUgPSBub2RlLmF0dHJpYnV0ZXMuYmluZDtcclxuICAgICAgbGV0IGV2ZW50TmFtZSA9ICdvbmlucHV0JztcclxuICAgICAgbGV0IHZhbHVlTmFtZSA9ICd2YWx1ZSc7XHJcbiAgICAgIGlmKG5vZGUuYXR0cmlidXRlcy50eXBlID09PSAnY2hlY2tib3gnIHx8IG5vZGUuYXR0cmlidXRlcy50eXBlID09PSAncmFkaW8nKSB7XHJcbiAgICAgICAgZXZlbnROYW1lID0gJ29uY2xpY2snO1xyXG4gICAgICAgIHZhbHVlTmFtZSA9ICdjaGVja2VkJztcclxuICAgICAgfSBlbHNlIGlmKG5vZGUudHlwZSAhPT0gJ2lucHV0JyAmJiBub2RlLnR5cGUgIT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICBldmVudE5hbWUgPSAnb25jaGFuZ2UnO1xyXG4gICAgICB9XHJcbiAgICAgIG5vZGUuYXR0cmlidXRlc1tldmVudE5hbWVdID0gKHtldmVudH0pID0+IHtcclxuICAgICAgICBpbnN0YW5jZVtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPSBldmVudC50YXJnZXRbdmFsdWVOYW1lXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBuYW1lIGluIG5vZGUuYXR0cmlidXRlcykge1xyXG4gICAgICBpZihuYW1lID09PSAnaHRtbCcpIHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG5vZGUuYXR0cmlidXRlc1tuYW1lXTtcclxuICAgICAgICBjb25zdCBsaW5rcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIi9cIl0nKTtcclxuICAgICAgICBmb3IoY29uc3QgbGluayBvZiBsaW5rcykge1xyXG4gICAgICAgICAgbGluay5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJvdXRlci51cmwgPSBsaW5rLmhyZWY7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZW52aXJvbm1lbnQucHJlcmVuZGVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYobmFtZS5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKCdvbicsICcnKTtcclxuICAgICAgICBjb25zdCBrZXkgPSAnMC4nICsgZGVwdGguam9pbignLicpICsgJy4nICsgZXZlbnROYW1lO1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5maW5kUGFyZW50SW5zdGFuY2UoWzAsIC4uLmRlcHRoXSk7XHJcbiAgICAgICAgaW5zdGFuY2UuZXZlbnRzW2tleV0gPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmKG5vZGUuYXR0cmlidXRlcy5kZWZhdWx0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZUNvbnRleHQoey4uLmluc3RhbmNlLmF0dHJpYnV0ZXMsIC4uLm5vZGUuYXR0cmlidXRlcywgZXZlbnR9KTtcclxuICAgICAgICAgIG5vZGUuYXR0cmlidXRlc1tuYW1lXShjb250ZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGluc3RhbmNlLmV2ZW50c1trZXldKTtcclxuICAgICAgfSBlbHNlIGlmKHR5cGVvZihub2RlLmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZihub2RlLmF0dHJpYnV0ZXNbbmFtZV0pICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGlmKG5vZGUuYXR0cmlidXRlc1tuYW1lXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgbmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKG5vZGUuYXR0cmlidXRlc1tuYW1lXSAhPT0gZmFsc2UgJiYgbm9kZS5hdHRyaWJ1dGVzW25hbWVdICE9PSBudWxsICYmIG5vZGUuYXR0cmlidXRlc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCBub2RlLmF0dHJpYnV0ZXNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIW5vZGUuYXR0cmlidXRlcy5odG1sKSB7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5yZW5kZXIobm9kZS5jaGlsZHJlbltpXSwgWy4uLmRlcHRoLCBpXSk7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG59IiwiY29uc3QgcmVJU08gPSAvXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKSkoPzpafChcXCt8LSkoW1xcZHw6XSopKT8kLztcclxuY29uc3QgcmVNc0FqYXggPSAvXlxcL0RhdGVcXCgoZHwtfC4qKVxcKVtcXC98XFxcXF0kLztcclxuXHJcbmZ1bmN0aW9uIGRhdGVQYXJzZXIoa2V5LCB2YWx1ZSkge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBsZXQgYSA9IHJlSVNPLmV4ZWModmFsdWUpO1xyXG4gICAgaWYgKGEpIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICBhID0gcmVNc0FqYXguZXhlYyh2YWx1ZSk7XHJcbiAgICBpZiAoYSkge1xyXG4gICAgICBjb25zdCBiID0gYVsxXS5zcGxpdCgvWy0rLC5dLyk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZShiWzBdID8gK2JbMF0gOiAwIC0gK2JbMV0pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXNlcmlhbGl6ZShzdHJpbmcpIHtcclxuICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcsIGRhdGVQYXJzZXIpO1xyXG59IiwiaW1wb3J0IE51bGxzdGFjayBmcm9tIFwiLi9jbGllbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bGxzdGFjazsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgTnVsbHN0YWNrIGZyb20gJ251bGxzdGFjayc7XHJcblxyXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE51bGxzdGFjayB7XHJcblxyXG4gIHN0YXRpYyBzdGFydCA9IHRydWU7XHJcblxyXG4gIHJvb20gPSBcIlwiO1xyXG4gIGNvbW1hbmQgPSBcIlwiO1xyXG4gIHNvY2tldCA9IG51bGw7XHJcbiAgc2hvcnRjdXRzID0gW107XHJcbiAgZXhlY3V0aW5nID0gZmFsc2U7XHJcblxyXG4gIGluaXRpYXRlKHtlbnZpcm9ubWVudCwgcGFnZX0pIHtcclxuICAgIHBhZ2UudGl0bGUgPSBcIkRpdHRvIFNlcnZlclwiO1xyXG4gICAgaWYoZW52aXJvbm1lbnQuY2xpZW50KSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgICBpZihsb2NhbFN0b3JhZ2VbJ3Nob3J0Y3V0cyddKSB7XHJcbiAgICAgICAgdGhpcy5zaG9ydGN1dHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2hvcnRjdXRzJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3NzOi8vXCIgKyBsb2NhdGlvbi5ob3N0LCBcInByb3RvY29sT25lXCIpO1xyXG4gICAgdGhpcy5zb2NrZXQub25jbG9zZSA9ICgpID0+IHNldFRpbWVvdXQodGhpcy5jb25uZWN0LCAxMDAwKTtcclxuICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNvY2tldC5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKHtzaG9ydGN1dH0pIHtcclxuICAgIHRoaXMuc2hvcnRjdXRzID0gdGhpcy5zaG9ydGN1dHMuZmlsdGVyKChzKSA9PiBzICE9IHNob3J0Y3V0KTtcclxuICAgIGxvY2FsU3RvcmFnZVsnc2hvcnRjdXRzJ10gPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNob3J0Y3V0cyk7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHtzaG9ydGN1dH0pIHtcclxuICAgIGlmKHRoaXMuZXhlY3V0aW5nKSByZXR1cm47XHJcbiAgICBpZighc2hvcnRjdXQpIHtcclxuICAgICAgaWYoIXRoaXMucm9vbSB8fCAhdGhpcy5jb21tYW5kKSByZXR1cm47XHJcbiAgICAgIHNob3J0Y3V0ID0gdGhpcy5yb29tICsgJyAnICsgdGhpcy5jb21tYW5kO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb2NrZXQuc2VuZChzaG9ydGN1dCk7XHJcbiAgICBpZighdGhpcy5zaG9ydGN1dHMuaW5jbHVkZXMoc2hvcnRjdXQpKSB7XHJcbiAgICAgIHRoaXMuc2hvcnRjdXRzLnB1c2goc2hvcnRjdXQpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2VbJ3Nob3J0Y3V0cyddID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zaG9ydGN1dHMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb29tID0gJyc7XHJcbiAgICB0aGlzLmNvbW1hbmQgPSAnJztcclxuICAgIHRoaXMuZXhlY3V0aW5nID0gdHJ1ZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leGVjdXRpbmcgPSBmYWxzZSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHJlbmRlclNob3J0Y3V0KHtzaG9ydGN1dH0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ4bCBtMmIgYmcxIHA0eCBwMnlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwieGwgeDYgeXlcIj4ge3Nob3J0Y3V0fSA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwieHIgeDYgeXlcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ4eCB4MCBjMCBiZzMgcDJ4IHAxeSBtMXJcIiBvbmNsaWNrPXt0aGlzLnJlbW92ZX0gc2hvcnRjdXQ9e3Nob3J0Y3V0fSBkaXNhYmxlZD17dGhpcy5leGVjdXRpbmd9PiB4IDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInh4IHgwIGMwIGJnMyBwMnggcDF5XCIgb25jbGljaz17dGhpcy5leGVjdXRlfSBzaG9ydGN1dD17c2hvcnRjdXR9IGRpc2FibGVkPXt0aGlzLmV4ZWN1dGluZ30+IEV4ZWN1dGUgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKHtwYWdlfSkge1xyXG4gICAgY29uc3QgU2hvcnRjdXQgPSB0aGlzLnJlbmRlclNob3J0Y3V0O1xuICAgIHJldHVybiAoXHJcbiAgICAgIDxtYWluIGNsYXNzPVwieHggYmcxXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInh4eCB5eSB5MTIgcDR4XCI+XHJcbiAgICAgICAgICA8Zm9ybSBjbGFzcz1cInh4IGJnMCBtZCt4NiBzMVwiIG9uc3VibWl0PXt0aGlzLmV4ZWN1dGV9PlxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ4eCBwM3kgYmMxYiBjM1wiPiB7cGFnZS50aXRsZX0gPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInh4IHA0XCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IGJpbmQ9XCJyb29tXCIgcGxhY2Vob2xkZXI9XCJyb29tXCIgY2xhc3M9XCJiYzEgcDQgbTJiXCIgLz5cclxuICAgICAgICAgICAgICA8aW5wdXQgYmluZD1cImNvbW1hbmRcIiBwbGFjZWhvbGRlcj1cImNvbW1hbmRcIiBjbGFzcz1cImJjMSBwNCBtMmJcIiAvPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ4eCBiZzMgYzAgcDRcIiBkaXNhYmxlZD17dGhpcy5leGVjdXRpbmd9PiBFeGVjdXRlIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge3RoaXMuc2hvcnRjdXRzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwieHggcDR4IHA0dCBwMmIgYmMxdFwiPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc2hvcnRjdXRzLm1hcCgoc2hvcnRjdXQpID0+IDxTaG9ydGN1dCBzaG9ydGN1dD17c2hvcnRjdXR9IC8+KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L21haW4+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uIiwiaW1wb3J0ICdudWxsc2hlZXQnO1xyXG5pbXBvcnQgJy4vQXBwbGljYXRpb24uY3NzJztcclxuXHJcbmltcG9ydCBOdWxsc3RhY2sgZnJvbSAnbnVsbHN0YWNrJztcclxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vQXBwbGljYXRpb24nO1xyXG5cclxuTnVsbHN0YWNrLnN0YXJ0KEFwcGxpY2F0aW9uKTsiXSwic291cmNlUm9vdCI6IiJ9