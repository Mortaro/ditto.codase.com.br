exports.ids = [1];
exports.modules = {

/***/ "./src/echo.js":
/*!*********************!*\
  !*** ./src/echo.js ***!
  \*********************/
/*! exports provided: echo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "echo", function() { return echo; });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "./node_modules/ws/index.js");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);

function echo(server) {
  function noop() {}

  function heartbeat() {
    this.isAlive = true;
  }

  const wss = new ws__WEBPACK_IMPORTED_MODULE_0___default.a.Server({
    server
  });
  wss.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('message', data => {
      wss.clients.forEach(function each(client) {
        client.send(data);
      });
    });
  });
  setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZWNoby5qcyJdLCJuYW1lcyI6WyJlY2hvIiwic2VydmVyIiwibm9vcCIsImhlYXJ0YmVhdCIsImlzQWxpdmUiLCJ3c3MiLCJXZWJTb2NrZXQiLCJTZXJ2ZXIiLCJvbiIsImNvbm5lY3Rpb24iLCJ3cyIsImRhdGEiLCJjbGllbnRzIiwiZm9yRWFjaCIsImVhY2giLCJjbGllbnQiLCJzZW5kIiwic2V0SW50ZXJ2YWwiLCJwaW5nIiwidGVybWluYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxTQUFTQSxJQUFULENBQWNDLE1BQWQsRUFBc0I7QUFFM0IsV0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQixXQUFTQyxTQUFULEdBQXFCO0FBQ25CLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBRUQsUUFBTUMsR0FBRyxHQUFHLElBQUlDLHlDQUFTLENBQUNDLE1BQWQsQ0FBcUI7QUFBQ047QUFBRCxHQUFyQixDQUFaO0FBRUFJLEtBQUcsQ0FBQ0csRUFBSixDQUFPLFlBQVAsRUFBcUIsU0FBU0MsVUFBVCxDQUFvQkMsRUFBcEIsRUFBd0I7QUFDM0NBLE1BQUUsQ0FBQ04sT0FBSCxHQUFhLElBQWI7QUFDQU0sTUFBRSxDQUFDRixFQUFILENBQU0sTUFBTixFQUFjTCxTQUFkO0FBQ0FPLE1BQUUsQ0FBQ0YsRUFBSCxDQUFNLFNBQU4sRUFBa0JHLElBQUQsSUFBVTtBQUN6Qk4sU0FBRyxDQUFDTyxPQUFKLENBQVlDLE9BQVosQ0FBb0IsU0FBU0MsSUFBVCxDQUFjQyxNQUFkLEVBQXNCO0FBQ3hDQSxjQUFNLENBQUNDLElBQVAsQ0FBWUwsSUFBWjtBQUNELE9BRkQ7QUFHRCxLQUpEO0FBS0QsR0FSRDtBQVVBTSxhQUFXLENBQUMsU0FBU0MsSUFBVCxHQUFnQjtBQUMxQmIsT0FBRyxDQUFDTyxPQUFKLENBQVlDLE9BQVosQ0FBb0IsU0FBU0MsSUFBVCxDQUFjSixFQUFkLEVBQWtCO0FBQ3BDLFVBQUlBLEVBQUUsQ0FBQ04sT0FBSCxLQUFlLEtBQW5CLEVBQTBCLE9BQU9NLEVBQUUsQ0FBQ1MsU0FBSCxFQUFQO0FBQzFCVCxRQUFFLENBQUNOLE9BQUgsR0FBYSxLQUFiO0FBQ0FNLFFBQUUsQ0FBQ1EsSUFBSCxDQUFRaEIsSUFBUjtBQUNELEtBSkQ7QUFLRCxHQU5VLEVBTVIsS0FOUSxDQUFYO0FBUUQsQyIsImZpbGUiOiIxLnNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJTb2NrZXQgZnJvbSAnd3MnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVjaG8oc2VydmVyKSB7XHJcblxyXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxuICBmdW5jdGlvbiBoZWFydGJlYXQoKSB7XHJcbiAgICB0aGlzLmlzQWxpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgd3NzID0gbmV3IFdlYlNvY2tldC5TZXJ2ZXIoe3NlcnZlcn0pO1xyXG5cclxuICB3c3Mub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbiBjb25uZWN0aW9uKHdzKSB7XHJcbiAgICB3cy5pc0FsaXZlID0gdHJ1ZTtcclxuICAgIHdzLm9uKCdwb25nJywgaGVhcnRiZWF0KTtcclxuICAgIHdzLm9uKCdtZXNzYWdlJywgKGRhdGEpID0+IHtcclxuICAgICAgd3NzLmNsaWVudHMuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGNsaWVudCkge1xyXG4gICAgICAgIGNsaWVudC5zZW5kKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBzZXRJbnRlcnZhbChmdW5jdGlvbiBwaW5nKCkge1xyXG4gICAgd3NzLmNsaWVudHMuZm9yRWFjaChmdW5jdGlvbiBlYWNoKHdzKSB7XHJcbiAgICAgIGlmICh3cy5pc0FsaXZlID09PSBmYWxzZSkgcmV0dXJuIHdzLnRlcm1pbmF0ZSgpO1xyXG4gICAgICB3cy5pc0FsaXZlID0gZmFsc2U7XHJcbiAgICAgIHdzLnBpbmcobm9vcCk7XHJcbiAgICB9KTtcclxuICB9LCAzMDAwMCk7XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==