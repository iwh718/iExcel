'use strict';

var _Excel = require('./components/Excel');

var _Excel2 = _interopRequireDefault(_Excel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = ['姓名', '年龄', '性别', '爱好', '管理'];
var data = [['冬', '19', '男', 'reading'], ['姚', '19', '女', 'studying'], ['陈', '20', '男', 'playing']];

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { className: 'panel-body' },
  _react2.default.createElement(_Excel2.default, { headers: headers, initialData: data })
), document.getElementById('app'));