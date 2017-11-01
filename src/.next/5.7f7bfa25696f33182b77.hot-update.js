webpackHotUpdate(5,{

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename, __resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandingPage = undefined;

var _regenerator = __webpack_require__(112);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(113);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(54);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(55);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(59);

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = __webpack_require__(560);

var _ = _interopRequireWildcard(_lodash);

var _react = __webpack_require__(27);

var React = _interopRequireWildcard(_react);

var _nextReduxWrapper = __webpack_require__(705);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _RaisedButton = __webpack_require__(730);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _index = __webpack_require__(130);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(555);

var _store = __webpack_require__(747);

var _Header = __webpack_require__(754);

var _App = __webpack_require__(755);

var _logger = __webpack_require__(702);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/vidimitrov/Development/ale/src/pages/index.js?entry';


var styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16
  },
  image: {
    marginTop: '40px',
    height: '70px',
    width: 'auto'
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 16,
    letterSpacing: 3.43,
    color: '#171717',
    marginBottom: '40px'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    height: 48,
    minWidth: 200,
    marginTop: 30,
    borderRadius: 4,
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2.0,
    color: '#ffffff'
  }
};

var LandingPage = exports.LandingPage = function (_React$Component) {
  (0, _inherits3.default)(LandingPage, _React$Component);

  function LandingPage() {
    (0, _classCallCheck3.default)(this, LandingPage);

    return (0, _possibleConstructorReturn3.default)(this, (LandingPage.__proto__ || (0, _getPrototypeOf2.default)(LandingPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(LandingPage, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          changeText = _props.changeText,
          query = _props.query,
          userAgent = _props.userAgent;

      return React.createElement(_App.App, { userAgent: userAgent, __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, React.createElement(_Header.Header, { title: 'Ale - Budget Planner', __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }), React.createElement('div', { className: 'login-page', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, React.createElement('div', { className: 'form', __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, React.createElement('img', { src: '/static/images/logo.png',
        alt: 'Ale logo',
        style: styles.image, __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }), React.createElement('h1', { style: styles.header, __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, 'Ale - Budget Planner'), React.createElement('form', { className: 'login-form', __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, React.createElement('input', { type: 'text', placeholder: 'Username', __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }), React.createElement('input', { type: 'password', placeholder: 'Password', __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }), React.createElement('button', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, 'login'), React.createElement('p', { className: 'message', __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, 'Not registered? ', React.createElement('a', { href: '#', __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, 'Create an account'))))));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _App.getInitialProps)(context);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return LandingPage;
}(React.Component);

LandingPage.Logger = (0, _logger.getLogger)({ loggerPath: __filename });
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

exports.default = (0, _nextReduxWrapper2.default)(_store.initStore, mapStateToProps, mapDispatchToProps)(LandingPage);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wYWdlcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJfIiwiUmVhY3QiLCJ3aXRoUmVkdXgiLCJSYWlzZWRCdXR0b24iLCJSb3V0ZXIiLCJiaW5kQWN0aW9uQ3JlYXRvcnMiLCJpbml0U3RvcmUiLCJIZWFkZXIiLCJBcHAiLCJnZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJnZXRMb2dnZXIiLCJzdHlsZXMiLCJ3cmFwcGVyIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsImltYWdlIiwibWFyZ2luVG9wIiwiaGVpZ2h0Iiwid2lkdGgiLCJoZWFkZXIiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsZXR0ZXJTcGFjaW5nIiwiY29sb3IiLCJtYXJnaW5Cb3R0b20iLCJmb3JtIiwiYnV0dG9uIiwibWluV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJhbGlnblNlbGYiLCJidXR0b25UZXh0IiwiZm9udFdlaWdodCIsIkxhbmRpbmdQYWdlIiwicHJvcHMiLCJjaGFuZ2VUZXh0IiwicXVlcnkiLCJ1c2VyQWdlbnQiLCJjb250ZXh0IiwiQ29tcG9uZW50IiwiTG9nZ2VyIiwibG9nZ2VyUGF0aCIsIl9fZmlsZW5hbWUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87O0lBQVAsQUFBWTs7QUFDWixBQUFPOztJQUFQLEFBQVk7O0FBQ1osQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFFVCxBQUFTOztBQUNULEFBQVM7O0FBQ1QsQUFBUyxBQUFLLEFBQW1COztBQUNqQyxBQUFTOzs7Ozs7Ozs7QUFFVCxJQUFNOzthQUNLLEFBQ0UsQUFDVDttQkFGTyxBQUVRLEFBQ2Y7Z0JBSE8sQUFHSyxBQUNaO2FBTFcsQUFD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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/vidimitrov/Development/ale/src/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/vidimitrov/Development/ale/src/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(109)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "pages/index.js?entry", "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS43ZjdiZmEyNTY5NmYzMzE4MmI3Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/ZjRiMTYwNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2l0aFJlZHV4IGZyb20gJ25leHQtcmVkdXgtd3JhcHBlcic7XG5pbXBvcnQgUmFpc2VkQnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL1JhaXNlZEJ1dHRvbic7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgaW5pdFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy91dGlscy9IZWFkZXInO1xuaW1wb3J0IHsgQXBwLCBnZXRJbml0aWFsUHJvcHMgYXMgYXBwR2V0SW5pdGlhbFByb3BzIH0gZnJvbSAnLi4vY29udGFpbmVycy9BcHAnO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMvbG9nZ2VyJztcblxuY29uc3Qgc3R5bGVzID0ge1xuICB3cmFwcGVyOiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIHBhZGRpbmc6IDE2LFxuICB9LFxuICBpbWFnZToge1xuICAgIG1hcmdpblRvcDogJzQwcHgnLFxuICAgIGhlaWdodDogJzcwcHgnLFxuICAgIHdpZHRoOiAnYXV0bycsXG4gIH0sXG4gIGhlYWRlcjoge1xuICAgIGZvbnRGYW1pbHk6ICdMYXRvJyxcbiAgICBmb250U2l6ZTogMTYsXG4gICAgbGV0dGVyU3BhY2luZzogMy40MyxcbiAgICBjb2xvcjogJyMxNzE3MTcnLFxuICAgIG1hcmdpbkJvdHRvbTogJzQwcHgnLFxuICB9LFxuICBmb3JtOiB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIH0sXG4gIGJ1dHRvbjoge1xuICAgIGhlaWdodDogNDgsXG4gICAgbWluV2lkdGg6IDIwMCxcbiAgICBtYXJnaW5Ub3A6IDMwLFxuICAgIGJvcmRlclJhZGl1czogNCxcbiAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICB9LFxuICBidXR0b25UZXh0OiB7XG4gICAgZm9udEZhbWlseTogJ0xhdG8nLFxuICAgIGZvbnRTaXplOiAxMixcbiAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgbGV0dGVyU3BhY2luZzogMi4wLFxuICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gIH0sXG59O1xuXG5leHBvcnQgY2xhc3MgTGFuZGluZ1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgTG9nZ2VyID0gZ2V0TG9nZ2VyKHsgbG9nZ2VyUGF0aDogX19maWxlbmFtZSB9KTtcblxuICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGNvbnRleHQpIHtcbiAgICByZXR1cm4gYXdhaXQgYXBwR2V0SW5pdGlhbFByb3BzKGNvbnRleHQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hhbmdlVGV4dCwgcXVlcnksIHVzZXJBZ2VudCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8QXBwIHVzZXJBZ2VudD17dXNlckFnZW50fT5cbiAgICAgICAgPEhlYWRlciB0aXRsZT0nQWxlIC0gQnVkZ2V0IFBsYW5uZXInIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW4tcGFnZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9Jy9zdGF0aWMvaW1hZ2VzL2xvZ28ucG5nJ1xuICAgICAgICAgICAgICBhbHQ9J0FsZSBsb2dvJ1xuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmltYWdlfSAvPlxuICAgICAgICAgICAgPGgxIHN0eWxlPXtzdHlsZXMuaGVhZGVyfT5BbGUgLSBCdWRnZXQgUGxhbm5lcjwvaDE+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJsb2dpbi1mb3JtXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgIDxidXR0b24+bG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZVwiPk5vdCByZWdpc3RlcmVkPyA8YSBocmVmPVwiI1wiPkNyZWF0ZSBhbiBhY2NvdW50PC9hPjwvcD5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0FwcD5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gIHJldHVybiB7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJlZHV4KGluaXRTdG9yZSwgbWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKExhbmRpbmdQYWdlKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7OztBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBTEE7O0FBT0E7QUFDQTtBQUVBO0FBSkE7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU5BOztBQVFBO0FBQ0E7QUFFQTtBQUpBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFOQTs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBUkE7QUEvQkE7QUFDQTtBQXNDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBREE7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFBQTtBQUZBO0FBR0E7QUFIQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBN0JBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQWdDQTtBQUdBO0FBSEE7QUFDQTtBQUlBO0FBR0E7QUFFQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==